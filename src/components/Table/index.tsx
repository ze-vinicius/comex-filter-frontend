import React from 'react';
import './style.css';

interface TableItem {
  import_id?: number;
  import_ano?: number;
  import_mes?: number;
  import_kg_liquido?: number;
  import_valor_fob?: number;
  municipios_cod_geo?: number;
  municipios_nome_cap?: string;
  municipios_sigla_uf?: string;
  paises_cod?: number;
  pais_origem?: string;
  sh_cod_sh4?: number;
  sh_nome_sh4?: string;

  exoprt_id?: number;
  exoprt_ano?: number;
  exoprt_mes?: number;
  pais_destino?: number;

  total_import_kg_liquido?: number;
  total_import_valor_fob?: number;
  total_export_kg_liquido?: number;
  total_export_valor_fob?: number;
}

type TableProps = {
  data: TableItem[]
}

export default function Table({ data }: TableProps) {
  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map(item => <th key={item}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return (
              <tr>
                {Object.values(item).map(val => <td>{val}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return renderTable()
}