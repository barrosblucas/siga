import { Iniciativa } from '@siga/contracts'

interface IniciativasListProps {
  iniciativas: Iniciativa[]
  loading?: boolean
  onSelect: (id: string) => void
}

const statusColors = {
  planejado: 'bg-accent-50 text-accent-700',
  em_andamento: 'bg-amber-50 text-amber-700',
  concluido: 'bg-emerald-50 text-emerald-700',
  suspenso: 'bg-rose-50 text-rose-700',
} as const

export function IniciativasList({ iniciativas, loading, onSelect }: IniciativasListProps) {
  if (loading) {
    return <div className="animate-pulse">Carregando...</div>
  }

  if (iniciativas.length === 0) {
    return <div className="text-ink-500">Nenhuma iniciativa encontrada</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {iniciativas.map((iniciativa) => (
        <div
          key={iniciativa.id}
          className="card p-6 cursor-pointer hover:shadow-[var(--shadow-soft)] transition-shadow"
          onClick={() => onSelect(iniciativa.id)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-ink-900">{iniciativa.titulo}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[iniciativa.status as keyof typeof statusColors]}`}>
              {iniciativa.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-ink-500 mb-4 line-clamp-2">{iniciativa.descricao}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink-500">Progresso</span>
              <span className="font-semibold text-ink-900">{iniciativa.progresso}%</span>
            </div>
            <div className="w-full bg-surface-2 rounded-full h-2">
              <div
                className="bg-accent-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${iniciativa.progresso}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
