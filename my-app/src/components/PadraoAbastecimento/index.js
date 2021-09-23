import React from "react";
import Select from "../PadraoAbastecimento/components/Select/index"
import {TabelaMontada} from "../PadraoAbastecimento/components/Table/index"
import Popup from "../PadraoAbastecimento/components/Popup/index"
import IndexProvider from './context/index'
import Header from "./components/Header/header"
import Alert from "../PadraoAbastecimento/components/StatusAlert/status"
import "../PadraoAbastecimento/App.css"

const Page = () => (
  
  <>
    <Header/>
    <Select />
    <TabelaMontada/>
    <Popup/> 
    <Alert/>
  </>
);

const  App = () => (
  <IndexProvider>
    <Page/>
  </IndexProvider>
);

export default (App)
