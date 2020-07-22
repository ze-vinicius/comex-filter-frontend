import React from 'react';
import Select from 'react-select';
import ReactModal from 'react-modal';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { CSVLink } from "react-csv";

import MenuList from '../../components/MenuList';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./style.css";
import Link from 'react-csv/components/Link';
import Download from 'react-csv/components/Download';

ReactModal.setAppElement("#root");

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

interface RegUnit {
  municipios_cod_geo: number;
  municipios_nome_cap: string;
  municipios_sigla_uf: string;
}

interface HamonizedItem {
  sh_cod_sh4: number;
  sh_nome_sh4: string;
}

type Option = {
  value: number;
  label: string;
}

export default function Home() {
  let history = useHistory();

  const [tableData, setTableData] = React.useState<TableItem[]>([]);

  const [regUnitOptions, setRegUnitOptionss] = React.useState<Option[]>();
  const [shOptions, setShOptions] = React.useState<Option[]>();
  const [tableOptions, setTableOptions] = React.useState<Option[]>(
    [
      { value: 1, label: 'Importação' },
      { value: 2, label: 'Exportação' }
    ]
  );
  const [yearRefOptions, setYearRefOptions] = React.useState<Option[]>([
    { value: 2017, label: '2017' },
  ]);
  const [aggOptions, setAggOptions] = React.useState<Option[]>(
    [
      { value: 1, label: 'Desagregado' },
      { value: 2, label: 'Total exportado de cada produto de determinado(s) municípios' },
      { value: 3, label: 'Total exportado de cada produto daquela região' },
      { value: 4, label: 'Total exportado de cada produto de determinado(s) municípios, separados por país (origem ou destino)' },
      { value: 5, label: 'Total exportado de cada produto daquela região, separados por país (origem ou destino)' },
    ]
  );

  const [selectedRegUnitOptions, setSelectedRegUnitOptions] = React.useState<Option[]>([]);
  const [selectedShOptions, setSelectedShOptions] = React.useState<Option[]>();
  const [selectedTableOptions, setSelectedTableOptions] = React.useState<Option>();
  const [selectedYearRefOptions, setSelectedYearRefOptions] = React.useState<Option>();
  const [selectedAggOptions, setSelectedAggOptions] = React.useState<Option>();

  const [showModal, setShowModal] = React.useState<boolean>(false);

  // const [csvLink, setCsvLink] = React.useState<RefObject<T>>();
  const csvLinkRef = React.useRef<CSVLink>(null);

  const handleOpenModal = () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }

  React.useEffect(() => {
    fetch("http://localhost:8000/regional_unit")
      .then(response => response.json())
      .then(data => {
        const formatedData = data.map((item: RegUnit) => {
          return { value: item.municipios_cod_geo, label: item.municipios_nome_cap }
        });

        setRegUnitOptionss(formatedData);
      })
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:8000/harmonized_system")
      .then(response => response.json())
      .then(data => {
        const formatedData = data.map((item: HamonizedItem) => {
          return { value: item.sh_cod_sh4, label: item.sh_nome_sh4 }
        });
        setShOptions(formatedData)
      })
  }, []);

  React.useEffect(() => {
    setSelectedTableOptions(tableOptions[0]);
    setSelectedYearRefOptions(yearRefOptions[0]);
    setSelectedAggOptions(aggOptions[0])
  }, [])


  const handleChangeSelectedTable = (newValue: any) => {
    setSelectedTableOptions(newValue)
  }
  const handleChangeSelectedRegUnit = (newValue: any) => {
    setSelectedRegUnitOptions(newValue)
  }
  const handleChangeSelectedSh = (newValue: any) => {
    setSelectedShOptions(newValue)
  }
  const handleChangeSelectedYearRef = (newValue: any) => {
    setSelectedYearRefOptions(newValue)
  }
  const handleChangeSelectedAgg = (newValue: any) => {
    setSelectedAggOptions(newValue)
  }

  const fetchDataTable = async () => {
    let tableName = '';
    console.log(selectedRegUnitOptions)
    if (selectedTableOptions && selectedTableOptions.value == 1) tableName = 'imports';
    else if (selectedTableOptions && selectedTableOptions.value == 2) tableName = 'exports';
    else return;

    // let yearRef = selectedYearRefOptions ? `year_ref=${selectedYearRefOptions}` : ``;

    let query = []
    query.push(`year_ref=${selectedYearRefOptions?.value}`)

    if (selectedRegUnitOptions.length) {
      selectedRegUnitOptions.map((item) => query.push(`reg_unit=${item.value}`))
    } else {
      query.push(`reg_unit=15`)
    }

    query.push(`mode=${selectedAggOptions?.value}`)

    // if   (selectedRegUnitOptions && selectedRegUnitOptions.length == 1) 
    let uri = `http://127.0.0.1:8000/${tableName}?${query.join('&')}`
    console.log(uri)

    return fetch(uri).then(resp => resp.json()).then(data => {
      // setTableData(data)
      // setTableData(data)
      return data;
      // handleCloseModal();
    })
  }

  const handleSubmitShow = async () => {
    handleOpenModal();
    const dataTable = await fetchDataTable();
    history.push({ pathname: "/table/view", state: { tableData: dataTable } })
    // setTimeout(() => {
    // }, 2000)
  }

  const handleSubmitDownload = () => {
    handleOpenModal();
    fetchDataTable();
  }


  return (
    <div className="home">
      <ReactModal
        isOpen={showModal}
        className="modal"
        overlayClassName="overlay"
      >
        <Loader
          type="Oval"
          color="#0C3B20"
          height={100}
          width={100}
        />
        <p className="modalDescription">Fazendo a requisição dos dados, aguarde um momento</p>
      </ReactModal>
      <div className="groupFilterContainer">
        <div className="filterContainer">
          <h2 className="filterTitle">Base de dados</h2>
          <Select
            value={selectedTableOptions}
            options={tableOptions}
            onChange={handleChangeSelectedTable}
          />
        </div>
        <div className="filterContainer">
          <h2 className="filterTitle">Unidade regional</h2>
          <p className="filterSubtitle">Para pesquisar todos os registros disponíveis, deixe esse campo vazio</p>
          <Select
            isMulti
            value={selectedRegUnitOptions}
            closeMenuOnSelect={false}
            components={{ MenuList }}
            options={regUnitOptions}
            onChange={handleChangeSelectedRegUnit}
          />
        </div>
        {/* <div className="filterContainer">
          <h2 className="filterTitle">Sistema Harmonizado</h2>
          <p className="filterSubtitle">Para pesquisar todos os registros disponíveis, deixe esse campo vazio</p>
          <Select
            isMulti
            value={selectedShOptions}
            closeMenuOnSelect={false}
            components={{ MenuList }}
            options={shOptions}
            onChange={handleChangeSelectedSh}
          />
        </div> */}
        <div className="filterContainer">
          <h2 className="filterTitle">Ano de referência</h2>
          <Select
            options={yearRefOptions}
            value={selectedYearRefOptions}
            onChange={handleChangeSelectedYearRef}
          />
        </div>
        <div className="filterContainer">
          <h2 className="filterTitle">Modo de agregação</h2>
          <Select
            options={aggOptions}
            value={selectedAggOptions}
            onChange={handleChangeSelectedAgg}
          />
        </div>
        <div className="toolbar">
          <button className="btn" onClick={handleSubmitShow}>Visualizar</button>

          <button className="btn" onClick={handleSubmitDownload}>Download</button>

          {/* {tableData &&
            <CSVDownloader
              datas={[]}
              filename=";"
              wrapColumnChar={`""`}
            />} */}
        </div>
      </div>
    </div>
  );
}