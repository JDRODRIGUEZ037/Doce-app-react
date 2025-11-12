import { z } from 'zod';
import {
  createPublication,
  deletePublicationById,
  exportPublicationsToExcel,
  listPublications,
  updatePublicationById
} from '../services/publicationService.js';

const publicationSchema = z.object({
  content: z.string().min(3),
  imageUrl: z.string().url().nullable().optional(),
  totalLikes: z.number().int().nonnegative().optional(),
  totalComments: z.number().int().nonnegative().optional(),
  totalShares: z.number().int().nonnegative().optional()
});

// Recupera el listado de publicaciones con filtros opcionales
export async function listPublicationsController(req, res, next) {
  try {
    const data = await listPublications(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

// Crea una nueva publicación en base a los datos validados
export async function createPublicationController(req, res, next) {
  try {
    const payload = publicationSchema.parse({
      ...req.body,
      totalLikes: Number(req.body.totalLikes ?? 0),
      totalComments: Number(req.body.totalComments ?? 0),
      totalShares: Number(req.body.totalShares ?? 0)
    });
    const id = await createPublication(payload, req.user.id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

// Actualiza una publicación existente
export async function updatePublicationController(req, res, next) {
  try {
    const payload = publicationSchema.parse({
      ...req.body,
      totalLikes: Number(req.body.totalLikes ?? 0),
      totalComments: Number(req.body.totalComments ?? 0),
      totalShares: Number(req.body.totalShares ?? 0)
    });
    await updatePublicationById(Number(req.params.id), payload, req.user.id);
    res.json({ message: 'Actualizado' });
  } catch (error) {
    next(error);
  }
}

// Elimina una publicación utilizando su identificador
export async function deletePublicationController(req, res, next) {
  try {
    await deletePublicationById(Number(req.params.id), req.user.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    next(error);
  }
}

// Genera y responde un archivo Excel con las publicaciones filtradas
export async function exportPublicationsController(req, res, next) {
  try {
    const buffer = await exportPublicationsToExcel(req.query);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="publicaciones.xlsx"');
    res.send(Buffer.from(buffer));
  } catch (error) {
    next(error);
  }
}
