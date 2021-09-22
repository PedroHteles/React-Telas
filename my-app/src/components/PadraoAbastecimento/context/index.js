  
import React, { createContext, useState} from "react";
import api from "../services/api";

export const IndexContext = createContext();

const EDIT_INITIAL = {
  qtdLitros: null,
  mediaAbastecimento: null,
  idCdaAbastecimento: null,
  idCda: null,
  idModelo: null,
  veiculoDescricao: null,
  cdaDescricao : null
};
const SEARCH_INITIAL = {
  idCdaSelec: 0,
  idVeiculoSelec: 0,
  abastecimentoZerado: false
};
const DADOS = {
  cda: null,
  veiculos: null
};

export default function IndexProvider({ children }) {
  const [dadosForm, setDadosForm] = useState(EDIT_INITIAL);
  const [select, setSelect] = useState(SEARCH_INITIAL);
  const [dadosSelect, setDadosSelect] = useState(DADOS);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [status, setStatus] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(null);


  React.useEffect(async() => {
    const  res = await api.get('cdas');
    const  res1 = await api.get('modelos');
    let idCdaSelec = res.data
    let idVeiculoSelec =  res1.data
    setDadosSelect({...dadosSelect,idVeiculoSelec,idCdaSelec})
  }, []);
  React.useEffect(async() =>{
    let idCdaSelecc = typeof select.idCdaSelec !== 'number' ? 0 : select.idCdaSelec
    let idVeiculoSelecc =  typeof select.idVeiculoSelec !== 'number' ? 0 : select.idVeiculoSelec
    const  res = await api.post('pesquisa',{idCdaSelec:idCdaSelecc,idVeiculoSelec:idVeiculoSelecc,abastecimentoZerado:select.abastecimentoZerado})
    setDadosTabela(res.data)
  },[select,setSelect])

  const enviaForm = async() =>{
    console.log(dadosForm)
    try {
      if(dadosForm.idCdaAbastecimento == null){
        const res = await api.post('criar',dadosForm);
        var enviado = 2
        setStatus(enviado)
        setButtonPopup(false)
        setTimeout(function(){ setStatus(false); }, 3000);
      }else if (dadosForm.idCdaAbastecimento != null){
        const res = await api.post('editar',dadosForm);
        var enviado = 2
        setStatus(enviado)
        setButtonPopup(false)
        setTimeout(function(){ setStatus(false); window.location.reload(false); }, 3000);
      }
    } 
    catch (error) {
      var erro = 1
      setStatus(erro)
    } 
  }
  return (
    <IndexContext.Provider
      value={{ select,dadosForm,status,buttonPopup,dadosTabela,dadosSelect,
      setSelect,enviaForm,setStatus,setButtonPopup,setDadosSelect,setDadosForm }}
    >{children}
    </IndexContext.Provider>
  );
}




