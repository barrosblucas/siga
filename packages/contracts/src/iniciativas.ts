import { z } from 'zod';

export const IniciativaSchema = z.object({
  id: z.string().uuid(),
  titulo: z.string().max(200),
  descricao: z.string().max(1000),
  status: z.enum(['planejado', 'em_andamento', 'concluido', 'suspenso']),
  data_inicio: z.coerce.date().optional(),
  data_fim_prevista: z.coerce.date().optional(),
  progresso: z.number().int().min(0).max(100).default(0),
  metas: z.array(z.lazy(() => MetaSchema)).optional(),
});

export const MetaSchema = z.object({
  id: z.string().uuid(),
  iniciativa_id: z.string().uuid(),
  titulo: z.string().max(200),
  descricao: z.string().max(500),
  valor_alvo: z.number().nonnegative(),
  valor_atual: z.number().nonnegative().default(0),
  unidade_medida: z.string().max(50),
  prazo: z.coerce.date().optional(),
  status: z.enum(['pendente', 'em_progresso', 'concluida', 'atrasada']),
});

export const IndicadorSchema = z.object({
  id: z.string().uuid(),
  meta_id: z.string().uuid(),
  nome: z.string().max(200),
  descricao: z.string().max(500),
  valor: z.number(),
  data_registro: z.coerce.date(),
});

export const CreateIniciativaSchema = IniciativaSchema.omit({ id: true });
export const UpdateIniciativaSchema = IniciativaSchema.partial().required({ id: true });

export const CreateMetaSchema = MetaSchema.omit({ id: true });
export const UpdateMetaSchema = MetaSchema.partial().required({ id: true });

export type Iniciativa = z.infer<typeof IniciativaSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Indicador = z.infer<typeof IndicadorSchema>;
export type CreateIniciativa = z.infer<typeof CreateIniciativaSchema>;
export type UpdateIniciativa = z.infer<typeof UpdateIniciativaSchema>;
export type CreateMeta = z.infer<typeof CreateMetaSchema>;
export type UpdateMeta = z.infer<typeof UpdateMetaSchema>;
