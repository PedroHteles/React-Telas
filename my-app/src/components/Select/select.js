import React from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { IndexContext } from '../context/indexContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cssselect } from "../../components/Componentes/Table/styles";


function Filtros() {
  const { cdas , veiculos, setIndexveiculos, setIndexcdas,cda0, setIndexcda0 } = React.useContext(IndexContext);

  return (
  <div className="corpo" >
    <Cssselect>
      <FormControl>
        <Autocomplete
        id="combo-cdas"
        options={cdas}
        getOptionLabel={(option) => option.descricao}
        style={{ width: 300 }}
        onChange={(event, newValue) => {
          setIndexcdas(newValue?.id_cda ? newValue?.id_cda : 0);
        }} renderInput={(params) => <TextField {...params} label="CDAS" variant="outlined" />}/>
      </FormControl>
      <FormControl>
        <Autocomplete
          id="combo-veiculos"
          options={veiculos}
          getOptionLabel={(option) => option.descricao}
          style={{ width: 300 }}
          onChange={(event, newValue) => {
            setIndexveiculos(newValue?.id_modelo ? newValue?.id_modelo : 0);
          }} renderInput={(params) => <TextField {...params} label="Veiculos" variant="outlined" />}/>
        </FormControl>
        <FormControl>
          <NativeSelect disableUnderline = "true" id="demo-customized-select-native" value={cda0} onChange={(e) => setIndexcda0(parseInt(e.target.value))}>
            <option value={0}>Registrados</option>
            <option value={1}>Não registrados</option>
          </NativeSelect>
        </FormControl>
    </Cssselect>
  </div>
  );
}
export default Filtros;