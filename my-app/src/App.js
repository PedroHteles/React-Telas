import React from 'react';
import IndexProvider from "./context/index";
import TableBase from './components/Pages/index'
import './App.css';
function App() {

  return (
    <IndexProvider>
      <TableBase/>
    </IndexProvider>
  );
}

export default App;