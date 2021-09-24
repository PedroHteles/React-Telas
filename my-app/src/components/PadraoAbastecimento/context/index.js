  
import React, { createContext, useState} from "react";
import api from "../services/api";
export const IndexContext = createContext();


const DADOS = {
  cda: null,
  veiculos: null
};

const SEARCH_INITIAL = {
  idCdaSelec: 0,
  idVeiculoSelec: 0,
  abastecimentoZerado: false
};



export default function IndexProvider({ children }) {
  const [dadosForm, setDadosForm] = useState(null);
  const [dadosSelect, setDadosSelect] = useState(DADOS);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [status, setStatus] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(null);
  const [search, setSearch] = React.useState([]);
  const [searchcdas, setSearchCdas] = React.useState([])
  const [searchveiculos, setSearchVeiculos] = React.useState([])
  const [select, setSelect] = React.useState(SEARCH_INITIAL);
  React.useEffect(async() => {
    const  res = await api.get('dadosPadraoAbastec');

    var idVeiculoSelec = [];
    var aux = []
    var aux1 = []
    let idCdaSelec = [];

    res.data?.Tabela.map((x) => {
      if(aux.find(e => e == x.idModeloVeiculo) == null){
        aux.push(x.idModeloVeiculo)
        idVeiculoSelec.push({'nomeModeloVeiculo':x.nomeModeloVeiculo,'idModeloVeiculo':x.idModeloVeiculo});
      }
    })

    res.data?.Tabela.map((x) => {
      if(aux1.find(e => e == x.idCda) == null){
        aux1.push(x.idCda)
        idCdaSelec.push({'nomeCda':x.nomeCda,'idCda':x.idCda});
      }
    })
    res.data?.Tabela?.forEach(function (o, index) {o.linhas = index});
    setDadosSelect({...dadosSelect,idVeiculoSelec,idCdaSelec})
    setDadosTabela(res.data.Tabela)
  }, []);


  const enviaForm = async() =>{

    const  res = await api.patch('editar', dadosForm);
    res?.data?.dadosForm?.forEach(function (o, index) {o.linhas = index});
    setDadosTabela(res?.data?.dadosForm)
    setButtonPopup(false)
    setStatus(true)
    setTimeout(function(){ setStatus(null); }, 3000);   

  }
  return (
    <IndexContext.Provider
      value={{dadosForm,status,buttonPopup,dadosTabela,dadosSelect,search,searchcdas,searchveiculos,select,
      setSearch,enviaForm,setStatus,setButtonPopup,setDadosSelect,setDadosForm,setSearchCdas,setSearchVeiculos,setSelect}}
    >{children}
    </IndexContext.Provider>
  );
}




