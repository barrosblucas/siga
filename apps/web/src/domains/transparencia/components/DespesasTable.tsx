import { TransparenciaDespesa } from '@siga/contracts'

interface DespesasTableProps {
  despesas: TransparenciaDespesa[]
  loading?: boolean
}

export function DespesasTable({ despesas, loading }: DespesasTableProps) {
  if (loading) {
    return <div className="animate-pulse">Carregando...</div>
  }

  if (despesas.length === 0) {
    return <div className="text-gray-500">Nenhuma despesa encontrada</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {despesas.map((despesa) => (
            <tr key={despesa.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {despesa.mes.toString().padStart(2, '0')}/{despesa.ano}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {despesa.categoria}
                {despesa.subcategoria && (
                  <span className="ml-2 text-gray-500 text-xs">
                    - {despesa.subcategoria}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {despesa.descricao || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(despesa.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
