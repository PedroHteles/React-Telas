  
import React, { createContext, useState} from "react";
export const IndexContext = createContext();
import { TranspApi } from 'Api/TranspApi';


const DADOS = {
  cdas: [],
  modelos: []
};


const CdaAbastecimentoApi = TranspApi.CdaAbastecimento;

export default function IndexProvider({ children }) {
  const [dadosForm, setDadosForm] = useState(null);
  const [dadosSelect, setDadosSelect] = useState(DADOS);
  const [dados, setDados] = useState([]);

  const buscar = async () => {
    const values = await CdaAbastecimentoApi.buscar() || [];
    const modelos = new Set(values?.map(x => { return {'nomeModeloVeiculo':x.nomeModeloVeiculo,'idModeloVeiculo':x.idModeloVeiculo}}) || []);
    const cdas = new Set(values?.map(x => { return {'nomeCda':x.nomeCda,'idCda':x.idCda}}) || []);

    values?.forEach(function (o, index) {o.linhas = index});
    setDadosSelect({...dadosSelect,modelos,cdas});
    setDados(values);
  }

  const editar = async (dadosForm, cb = ()=>{}) => {
    try {
        await CdaAbastecimentoApi.editar(dadosForm) || [];
        cb({msgAviso: 'Registro salvo com sucesso!'});
    } catch ( e ) {
        cb({msgErro: e});
    }
  };

  return (
    <IndexContext.Provider
      value={{dadosForm,dados,dadosSelect, editar, buscar, setDadosSelect,setDadosForm}}
    >{children}
    </IndexContext.Provider>
  );
}




