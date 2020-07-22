import React, { useEffect, ReactElement } from 'react';
import { Location } from 'history';
import { StaticContext, useHistory } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Table from '../../components/Table';
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

type LocationState = {
  from: Location;
  tableData: TableItem[];
}

export default function TableView(props: RouteComponentProps<{}, StaticContext, LocationState>,): ReactElement {

  const [tableData, setTableData] = React.useState<TableItem[]>()
  const history = useHistory();

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state.tableData);
      setTableData(props.location.state.tableData)
    } else {
      history.push("/");
    }
  }, [])

  return (
    <div className="tableContainer">
      {tableData && <Table data={tableData} />}
    </div>
  )
}