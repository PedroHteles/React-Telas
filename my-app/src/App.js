import React from 'react';
import IndexProvider from "./components/context/indexContext";
import TableBase from './Pages/index'

function App() {

  return (
    <IndexProvider>
      <TableBase/>
    </IndexProvider>
  );
}

export default App;