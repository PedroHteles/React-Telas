import React from 'react';
import IndexProvider from "./components/context/indexContext";
import TableBase from './Pages/index'
import './App.css';
function App() {

  return (
    <IndexProvider>
      <TableBase/>
    </IndexProvider>
  );
}

export default App;