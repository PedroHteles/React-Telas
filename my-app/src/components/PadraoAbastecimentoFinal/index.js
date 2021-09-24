import React from "react";
import Filtro from "./components/Edit/index"
import {Tabela} from "../PadraoAbastecimento/components/Tabela/index"
import Edit from "../PadraoAbastecimento/components/Edit/index"
import IndexProvider from './context/index'
import "../PadraoAbastecimento/App.css"

const Page = () => (
  
  <>
    <Filtro />
    <Tabela/>
    <Edit/> 
  </>
);

const  App = () => (
  <IndexProvider>
    <Page/>
  </IndexProvider>
);

export default (App)
