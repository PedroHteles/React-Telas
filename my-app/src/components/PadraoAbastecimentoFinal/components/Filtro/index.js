import React from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { IndexContext } from '../../context/index'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cssselect } from "../Table/styles";

const SEARCH_INITIAL = {
  idCdaSelec: 0,
  idVeiculoSelec: 0,
  abastecimentoZerado: false
};

function Select() {
  const { dadosSelect,select,setSelect} = React.useContext(IndexContext);

  return (
  <div className="corpo" >{
    dadosSelect?.idCdaSelec && dadosSelect?.idVeiculoSelec ? 
    (
    <Cssselect className="">
      <FormControl>
        <Autocomplete
        id="combo-cdas"
        options={dadosSelect?.cdas}
        getOptionLabel={(option) => option.nomeCda}
        style={{ width: 300 }}
        onChange={(event, newValue) => {
          let idCdaSelec = newValue?.idCda ? newValue?.idCda : 0
          setSelect({...select, idCdaSelec});
        }} renderInput={(params) => <TextField {...params} label="CDAS" variant="outlined" />}/>
      </FormControl>
      <FormControl>
        <Autocomplete
          id="combo-veiculos"
          options={dadosSelect?.modelos}
          getOptionLabel={(option) => option.nomeModeloVeiculo}
          style={{ width: 300 }}
          onChange={(event, newValue) => {
            let idVeiculoSelec = newValue?.idModeloVeiculo?.[0]
            setSelect({...select, idVeiculoSelec});
          }} renderInput={(params) => <TextField {...params} label="Veiculos" variant="outlined" />}/>
        </FormControl>
        <FormControl>
          <NativeSelect  id="demo-customized-select-native" onChange={(e) => {
            let abastecimentoZerado = JSON.parse(e.target.value);
            setSelect({...select,abastecimentoZerado});
          }}>
              <option value={false}>Registrados</option>
              <option value={true}>Não registrados</option>
          </NativeSelect>
        </FormControl>  

    </Cssselect>): (<></>)
  }
    
  </div>
  );
}
export default Select;