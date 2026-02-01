import { z } from 'zod';

export const TransparenciaDespesaSchema = z.object({
  id: z.string().uuid(),
  ano: z.number().int().min(2000).max(2100),
  mes: z.number().int().min(1).max(12),
  categoria: z.string().max(100),
  subcategoria: z.string().max(100).optional(),
  valor: z.number().nonnegative(),
  descricao: z.string().max(500).optional(),
  data_registro: z.coerce.date(),
});

export const TransparenciaReceitaSchema = z.object({
  id: z.string().uuid(),
  ano: z.number().int().min(2000).max(2100),
  mes: z.number().int().min(1).max(12),
  fonte: z.string().max(100),
  valor: z.number().nonnegative(),
  descricao: z.string().max(500).optional(),
  data_registro: z.coerce.date(),
});

export const TransparenciaContratoSchema = z.object({
  id: z.string().uuid(),
  numero: z.string().max(50),
  fornecedor: z.string().max(200),
  objeto: z.string().max(500),
  valor: z.number().nonnegative(),
  data_inicio: z.coerce.date(),
  data_fim: z.coerce.date().optional(),
  status: z.enum(['ativo', 'concluido', 'suspenso', 'cancelado']),
});

export const GetDespesasQuerySchema = z.object({
  ano: z.coerce.number().int().optional(),
  mes: z.coerce.number().int().optional(),
  categoria: z.string().optional(),
  limit: z.coerce.number().int().max(100).default(20),
  offset: z.coerce.number().int().default(0),
});

export const GetReceitasQuerySchema = z.object({
  ano: z.coerce.number().int().optional(),
  mes: z.coerce.number().int().optional(),
  fonte: z.string().optional(),
  limit: z.coerce.number().int().max(100).default(20),
  offset: z.coerce.number().int().default(0),
});

export const GetContratosQuerySchema = z.object({
  status: z.enum(['ativo', 'concluido', 'suspenso', 'cancelado']).optional(),
  fornecedor: z.string().optional(),
  limit: z.coerce.number().int().max(100).default(20),
  offset: z.coerce.number().int().default(0),
});

export type TransparenciaDespesa = z.infer<typeof TransparenciaDespesaSchema>;
export type TransparenciaReceita = z.infer<typeof TransparenciaReceitaSchema>;
export type TransparenciaContrato = z.infer<typeof TransparenciaContratoSchema>;
export type GetDespesasQuery = z.infer<typeof GetDespesasQuerySchema>;
export type GetReceitasQuery = z.infer<typeof GetReceitasQuerySchema>;
export type GetContratosQuery = z.infer<typeof GetContratosQuerySchema>;
