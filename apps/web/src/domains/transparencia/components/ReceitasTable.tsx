import { TransparenciaReceita } from '@siga/contracts'

interface ReceitasTableProps {
  receitas: TransparenciaReceita[]
  loading?: boolean
}

export function ReceitasTable({ receitas, loading }: ReceitasTableProps) {
  if (loading) {
    return <div className="animate-pulse">Carregando...</div>
  }

  if (receitas.length === 0) {
    return <div className="text-ink-500">Nenhuma receita encontrada</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-line">
        <thead className="bg-surface-2">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Fonte
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Valor
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-line">
          {receitas.map((receita) => (
            <tr key={receita.id} className="hover:bg-surface-2">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-900">
                {receita.mes.toString().padStart(2, '0')}/{receita.ano}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-900">
                {receita.fonte}
              </td>
              <td className="px-6 py-4 text-sm text-ink-900">
                {receita.descricao || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-ink-900 text-right font-semibold text-emerald-600">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(receita.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
