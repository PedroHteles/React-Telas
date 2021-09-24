import React from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { IndexContext } from '../../context/index'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cssselect } from "../../components/Table/styles";



function Select() {
  const { dadosSelect,dadosTabela,setSearch,setSearchCdas,setSearchVeiculos,select,setSelect} = React.useContext(IndexContext);



  React.useEffect(() => {
    let newList = []
    let dadosPesquisaSelect = []

    if(select.abastecimentoZerado == false){
      newList = dadosTabela.filter(function(el) {
        if(el.mediaPadrao > 0 && el.qtdLitrosAbastecPadrao > 0){
          return el
        }})
      setSearch(newList)
    }
    else if (select.abastecimentoZerado == true){
      newList =  dadosTabela.filter(function(el) {
        if(el.mediaPadrao == 0 && el.qtdLitrosAbastecPadrao == 0){
          return el
        }})
      setSearch(newList)
    }
    if(select.idCdaSelec !== 0){
      dadosPesquisaSelect = newList.filter(function(el) {
        if(el.idCda == select.idCdaSelec){
          return el
        }})
        setSearchCdas(dadosPesquisaSelect)
    }else{
      setSearchCdas(null)
    }
    if(select.idVeiculoSelec !== 0){
      if(select.idCdaSelec !== 0){
        dadosPesquisaSelect = newList.filter(function(el) {
          if(el.idModeloVeiculo == select.idVeiculoSelec && el.idCda == select.idCdaSelec){
            return el
          }})
          setSearchVeiculos(dadosPesquisaSelect)
      }
      else if(select.idCdaSelec == 0){
        dadosPesquisaSelect = newList.filter(function(el) {
          if(el.idModeloVeiculo == select.idVeiculoSelec){
            return el
          }})
          setSearchVeiculos(dadosPesquisaSelect)
      }
    }else{
      setSearchVeiculos(null)
    }
  },[dadosTabela,select,setSelect]); 

  return (
  <div className="corpo" >{
    dadosSelect?.idCdaSelec && dadosSelect?.idVeiculoSelec ? 
    (
    <Cssselect className="">
      <FormControl>
        <Autocomplete
        id="combo-cdas"
        options={dadosSelect?.idCdaSelec}
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
          options={dadosSelect?.idVeiculoSelec}
          getOptionLabel={(option) => option.nomeModeloVeiculo}
          style={{ width: 300 }}
          onChange={(event, newValue) => {
            let idVeiculoSelec = newValue?.idModeloVeiculo ? newValue?.idModeloVeiculo : 0
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