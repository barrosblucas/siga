import { Iniciativa } from '@siga/contracts'

interface IniciativasListProps {
  iniciativas: Iniciativa[]
  loading?: boolean
  onSelect: (id: string) => void
}

const statusColors = {
  planejado: 'bg-blue-100 text-blue-800',
  em_andamento: 'bg-yellow-100 text-yellow-800',
  concluido: 'bg-green-100 text-green-800',
  suspenso: 'bg-red-100 text-red-800',
} as const

export function IniciativasList({ iniciativas, loading, onSelect }: IniciativasListProps) {
  if (loading) {
    return <div className="animate-pulse">Carregando...</div>
  }

  if (iniciativas.length === 0) {
    return <div className="text-gray-500">Nenhuma iniciativa encontrada</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {iniciativas.map((iniciativa) => (
        <div
          key={iniciativa.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelect(iniciativa.id)}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{iniciativa.titulo}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[iniciativa.status as keyof typeof statusColors]}`}>
                {iniciativa.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{iniciativa.descricao}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progresso</span>
                <span className="font-medium text-gray-900">{iniciativa.progresso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${iniciativa.progresso}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
