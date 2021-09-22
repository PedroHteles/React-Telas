import React from "react";
import Select from "../PadraoAbastecimento/components/Select/index"
import {TabelaMontada} from "../PadraoAbastecimento/components/Table/index"
import Popup from "../PadraoAbastecimento/components/Popup/index"
import IndexProvider from './context/index'
import Header from "./components/Header/header"
import "../PadraoAbastecimento/App.css"

const Page = () => (
  
  <>
    <Header/>
    <Select />
    <TabelaMontada/>
    <Popup/> 
  </>
);

const  App = () => (
  <IndexProvider>
    <Page/>
  </IndexProvider>
);

export default (App)
