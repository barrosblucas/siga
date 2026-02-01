import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import api from '@/shared/api/client'
import { z } from 'zod'
import {
  IniciativaSchema,
  MetaSchema,
  CreateIniciativaSchema,
  CreateMetaSchema,
} from '@siga/contracts'

const IniciativaResponseSchema = IniciativaSchema
const IniciativasResponseSchema = z.array(IniciativaSchema)
const MetaResponseSchema = MetaSchema
const MetasResponseSchema = z.array(MetaSchema)

export const useIniciativas = (params?: {
  status?: string
  limit?: number
  offset?: number
}, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['iniciativas', params],
    queryFn: async () => {
      const { data } = await api.get('/iniciativas', { params })
      return IniciativasResponseSchema.parse(data)
    },
    ...options,
  })
}

export const useIniciativa = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['iniciativas', id],
    queryFn: async () => {
      const { data } = await api.get(`/iniciativas/${id}`)
      return IniciativaResponseSchema.parse(data)
    },
    enabled: !!id,
    ...options,
  })
}

export const useCreateIniciativa = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: z.infer<typeof CreateIniciativaSchema>) => {
      const response = await api.post('/iniciativas', data)
      return IniciativaResponseSchema.parse(response.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iniciativas'] })
    },
  })
}

export const useMetas = (iniciativaId: string, params?: {
  status?: string
}, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['iniciativas', iniciativaId, 'metas', params],
    queryFn: async () => {
      const { data } = await api.get(`/iniciativas/${iniciativaId}/metas`, { params })
      return MetasResponseSchema.parse(data)
    },
    enabled: !!iniciativaId,
    ...options,
  })
}

export const useCreateMeta = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ iniciativaId, data }: { iniciativaId: string; data: z.infer<typeof CreateMetaSchema> }) => {
      const response = await api.post(`/iniciativas/${iniciativaId}/metas`, data)
      return MetaResponseSchema.parse(response.data)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['iniciativas', variables.iniciativaId, 'metas'] })
      queryClient.invalidateQueries({ queryKey: ['iniciativas', variables.iniciativaId] })
    },
  })
}
