import * as React from "react";
import Select from 'react-select';
import "./App.css";

interface TableItem {
  import_id: number;
  import_ano: number;
  import_kg_liquido: number;
  municipios_cod_geo: number;
  municipios_nome_cap: string;
  municipios_sigle_uf: string;
  paises_cod: number;
  pais_destino: string;
  sh_cod_sh4: number;
  sh_nome_sh4: string;
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


function App() {
  const [regUnitOptions, setRegUnitOptionss] = React.useState<Option[]>();
  const [shOptions, setShOptions] = React.useState<Option[]>();
  const [tableOptions, setTableOptions] = React.useState<Option[]>(
    [
      {value : 1, label : 'Importação'},
      {value : 2, label : 'Exportação'}
    ]
  );
  
  React.useEffect(() => {
    fetch("http://localhost:8000/regional_unit")
      .then(response => response.json())
      .then(data => {
          const formatedData = data.map((item : RegUnit) => { 
            return {value : item.municipios_cod_geo , label: item.municipios_nome_cap }
            });

          setRegUnitOptionss(formatedData);
        })
  }, []);
  
  React.useEffect(() => {
    fetch("http://localhost:8000/harmonized_system")
      .then(response => response.json())
      .then(data => {
        const formatedData = data.map((item : HamonizedItem) => { 
            return {value : item.sh_cod_sh4 , label: item.sh_nome_sh4 }
            });
        setShOptions(formatedData)
        })
  }, []);

  return (
    <div className="App">
    
      <select>
        {tableOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      <select multiple>
        {regUnitOptions && regUnitOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      <select multiple>
        {shOptions && shOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
    </div>
  );
}

export default App;
