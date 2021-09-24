  
import React, { createContext, useState} from "react";
import api from "../services/api";
export const IndexContext = createContext();


const EDIT_FORM = {
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
  const [dadosForm, setDadosForm] = useState(EDIT_FORM);
  const [select, setSelect] = useState(SEARCH_INITIAL);
  const [dadosSelect, setDadosSelect] = useState(DADOS);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [status, setStatus] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(null);

  React.useEffect(async() => {
    const  res = await api.get('dadosPadraoAbastec');
    console.log(res)
    let idCdaSelec = res.data.cdas
    let idVeiculoSelec =  res.data.veiculos
    res.data?.Tabela?.forEach(function (o, index) {o.linhas = index});
    setDadosSelect({...dadosSelect,idVeiculoSelec,idCdaSelec})
    console.log(res.data.Tabela)
    setDadosTabela(res.data.Tabela)
  }, []);



  const enviaForm = async() =>{
    try{
      if(dadosForm.idCdaAbastecimento !== null){
        const  res = await api.patch('editar',{dadosForm,select});
        res?.data?.dadosForm?.forEach(function (o, index) {o.linhas = index});
        setDadosTabela(res?.data?.dadosForm)
        setButtonPopup(false)
        setStatus(true)
        setTimeout(function(){ setStatus(null); }, 3000);
      }
      else if (dadosForm.idCdaAbastecimento == null){
        const  res = await api.patch('criar',{dadosForm,select});
        res?.data?.dadosForm?.forEach(function (o, index) {o.linhas = index});
        setDadosTabela(res?.data?.dadosForm)
        setButtonPopup(false)
        setStatus(true)
        setTimeout(function(){ setStatus(null); }, 3000);
      }
      
    }catch(error){setStatus(false); setTimeout(function(){ setStatus(null); }, 8000);} 
  }
  return (
    <IndexContext.Provider
      value={{select,dadosForm,status,buttonPopup,dadosTabela,dadosSelect,
      setSelect,enviaForm,setStatus,setButtonPopup,setDadosSelect,setDadosForm,setDadosTabela}}
    >{children}
    </IndexContext.Provider>
  );
}




