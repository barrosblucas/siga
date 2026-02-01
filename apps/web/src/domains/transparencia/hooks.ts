import { useQuery } from '@tanstack/react-query'
import api from '@/shared/api/client'
import { z } from 'zod'
import {
  TransparenciaDespesaSchema,
  TransparenciaReceitaSchema,
  TransparenciaContratoSchema,
} from '@siga/contracts'

const DespesasResponseSchema = z.array(TransparenciaDespesaSchema)
const ReceitasResponseSchema = z.array(TransparenciaReceitaSchema)
const ContratosResponseSchema = z.array(TransparenciaContratoSchema)

export const useDespesas = (params?: {
  ano?: number
  mes?: number
  categoria?: string
  limit?: number
  offset?: number
}, options?: any) => {
  return useQuery<z.infer<typeof DespesasResponseSchema>>({
    queryKey: ['transparencia', 'despesas', params],
    queryFn: async () => {
      const { data } = await api.get('/transparencia/despesas', { params })
      return DespesasResponseSchema.parse(data)
    },
    ...options,
  })
}

export const useReceitas = (params?: {
  ano?: number
  mes?: number
  fonte?: string
  limit?: number
  offset?: number
}, options?: any) => {
  return useQuery<z.infer<typeof ReceitasResponseSchema>>({
    queryKey: ['transparencia', 'receitas', params],
    queryFn: async () => {
      const { data } = await api.get('/transparencia/receitas', { params })
      return ReceitasResponseSchema.parse(data)
    },
    ...options,
  })
}

export const useContratos = (params?: {
  status?: string
  fornecedor?: string
  limit?: number
  offset?: number
}, options?: any) => {
  return useQuery<z.infer<typeof ContratosResponseSchema>>({
    queryKey: ['transparencia', 'contratos', params],
    queryFn: async () => {
      const { data } = await api.get('/transparencia/contratos', { params })
      return ContratosResponseSchema.parse(data)
    },
    ...options,
  })
}
