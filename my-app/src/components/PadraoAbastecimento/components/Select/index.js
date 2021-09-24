import React from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { IndexContext } from '../../context/index'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cssselect } from "../../components/Table/styles";
import { fabClasses } from "@mui/material";

function Select() {
  const { select,dadosSelect,setSelect,dadosTabela} = React.useContext(IndexContext);



  function filterItems(dadosSelect) {
    return dadosTabela.filter(function(el) {
      if(el.media_padrao > 0 && el.qtd_litros_abastec_padrao > 0)
        return el
    })
  }
  let tsst = filterItems();


  return (
  <div className="corpo" >{
    dadosSelect?.idCdaSelec && dadosSelect?.idVeiculoSelec ? 
    (
    <Cssselect className="">
      <FormControl>
        <Autocomplete
        id="combo-cdas"
        options={dadosSelect?.idCdaSelec}
        getOptionLabel={(option) => option.descricao}
        style={{ width: 300 }}
        onChange={(event, newValue) => {
          let idCdaSelec = newValue?.id_cda ? newValue?.id_cda : 0
          setSelect({...select, idCdaSelec});
        }} renderInput={(params) => <TextField {...params} label="CDAS" variant="outlined" />}/>
      </FormControl>
      <FormControl>
        <Autocomplete
          id="combo-veiculos"
          options={dadosSelect?.idVeiculoSelec}
          getOptionLabel={(option) => option.descricao}
          style={{ width: 300 }}
          onChange={(event, newValue) => {
            let idVeiculoSelec = newValue?.id_modelo ? newValue?.id_modelo : 0
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