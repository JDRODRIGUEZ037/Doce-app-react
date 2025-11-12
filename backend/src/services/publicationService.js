import ExcelJS from 'exceljs';
import { pool, query } from '../config/database.js';
import { HttpError } from '../utils/httpError.js';

// Construye la cláusula WHERE dinamicamente según los filtros recibidos
function buildFilters({ search, minLikes, maxLikes }) {
  const conditions = [];
  const params = {};

  if (search) {
    conditions.push('p.content LIKE :search');
    params.search = `%${search}%`;
  }
  if (minLikes) {
    conditions.push('p.total_likes >= :minLikes');
    params.minLikes = Number(minLikes);
  }
  if (maxLikes) {
    conditions.push('p.total_likes <= :maxLikes');
    params.maxLikes = Number(maxLikes);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereClause, params };
}

export async function listPublications(filters) {
  const { whereClause, params } = buildFilters(filters);
  const items = await query(
    `SELECT p.* FROM publications p ${whereClause} ORDER BY p.updated_at DESC`,
    params
  );
  const meta = { total: items.length };
  return { items, meta };
}

export async function createPublication(payload, actorUserId) {
  const result = await query(
    `INSERT INTO publications (content, image_url, total_likes, total_comments, total_shares)
     VALUES (:content, :imageUrl, :totalLikes, :totalComments, :totalShares)`,
    {
      content: payload.content,
      imageUrl: payload.imageUrl,
      totalLikes: payload.totalLikes || 0,
      totalComments: payload.totalComments || 0,
      totalShares: payload.totalShares || 0
    }
  );

  await query(
    `INSERT INTO audit_log (actor_user_id, entity, entity_id, action, details)
     VALUES (:actor, 'publication', :entityId, 'create', JSON_OBJECT('payload', :details))`,
    {
      actor: actorUserId,
      entityId: result.insertId,
      details: JSON.stringify(payload)
    }
  );

  return result.insertId;
}

export async function updatePublicationById(id, payload, actorUserId) {
  const connection = await pool.getConnection();
  try {
    await connection.query('SET @audit_actor_id := ?', [actorUserId]);
    const [result] = await connection.execute(
      `UPDATE publications SET content = :content, image_url = :imageUrl,
        total_likes = :totalLikes, total_comments = :totalComments, total_shares = :totalShares
       WHERE publication_id = :id`,
      {
        id,
        content: payload.content,
        imageUrl: payload.imageUrl,
        totalLikes: payload.totalLikes || 0,
        totalComments: payload.totalComments || 0,
        totalShares: payload.totalShares || 0
      }
    );

    if (result.affectedRows === 0) {
      throw new HttpError(404, 'Publicación no encontrada');
    }
  } finally {
    connection.release();
  }
}

export async function deletePublicationById(id, actorUserId) {
  const result = await query(
    'DELETE FROM publications WHERE publication_id = :id',
    { id }
  );
  if (result.affectedRows === 0) {
    throw new HttpError(404, 'Publicación no encontrada');
  }

  await query(
    `INSERT INTO audit_log (actor_user_id, entity, entity_id, action)
     VALUES (:actor, 'publication', :entityId, 'delete')`,
    {
      actor: actorUserId,
      entityId: id
    }
  );
}

export async function exportPublicationsToExcel(filters) {
  const { items } = await listPublications(filters);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Publicaciones');

  sheet.columns = [
    { header: 'ID', key: 'publication_id', width: 10 },
    { header: 'Contenido', key: 'content', width: 60 },
    { header: 'Imagen', key: 'image_url', width: 40 },
    { header: 'Likes', key: 'total_likes', width: 10 },
    { header: 'Comentarios', key: 'total_comments', width: 15 },
    { header: 'Compartidos', key: 'total_shares', width: 15 },
    { header: 'Actualizado', key: 'updated_at', width: 22 }
  ];

  items.forEach((item) => {
    sheet.addRow(item);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
