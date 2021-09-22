import React from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { IndexContext } from '../../context/index'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cssselect } from "../../components/Table/styles";

function Select() {
  const { select,dadosSelect,setSelect} = React.useContext(IndexContext);

  return (
  <div className="corpo" >
    <Cssselect className="">
      <FormControl>
        <Autocomplete
        id="combo-cdas"
        options={dadosSelect.idCdaSelec}
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
          options={dadosSelect.idVeiculoSelec}
          getOptionLabel={(option) => option.descricao}
          style={{ width: 300 }}
          onChange={(event, newValue) => {
            let idVeiculoSelec = newValue?.id_modelo ? newValue?.id_modelo : 0
            setSelect({...select, idVeiculoSelec});
          }} renderInput={(params) => <TextField {...params} label="Veiculos" variant="outlined" />}/>
        </FormControl>
        <FormControl>
          <NativeSelect disableUnderline = "true" id="demo-customized-select-native" value={JSON.parse(select.abastecimentoZerado)} onChange={(e) => {
            let abastecimentoZerado = JSON.parse(e.target.value); 
            setSelect({...select,abastecimentoZerado});
            
            }}>
            <option value={false} selected>Registrados</option>
            <option value={true}>Não registrados</option>
          </NativeSelect>
        </FormControl>
    </Cssselect>
  </div>
  );
}
export default Select;