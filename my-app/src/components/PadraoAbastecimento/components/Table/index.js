import { Column } from "react-base-table";
import React from "react";
import Table from "./table";
import { IndexContext }  from '../../context/index'
import columnDefinition from './column-definition'
import Popup from '../Popup/index'

const handleOnClickRow = setSelectedRow => (e) => {
  setSelectedRow(e.rowData)
};


const TabelaMontada = () => {
    const [selectedRow, setSelectedRow] = React.useState(null);
    const {dadosTabela,setButtonPopup,buttonPopup,setDadosForm,dadosForm,setDadosTabela,search,searchcdas,searchveiculos,select,setSearch} = React.useContext(IndexContext);
    const [sortBy, setSortBy] = React.useState({ key: "qtdLitrosAbastecPadrao", order: "asc" });
    const [content, setContent] = React.useState([]);
    const [ asdasas , setADASOMDASO] = React.useState([]);
    const [ aopa, setAopa] = React.useState([]);
    const [ searchFinal, setSearchFinal] = React.useState([]);




  React.useEffect(() =>{
    let searchTable = search.length > 0 ? search : dadosTabela 
    let searchCdas = searchcdas ? searchcdas : searchTable
    setSearchFinal(searchveiculos ? searchveiculos : searchCdas)
    setContent(searchveiculos ? searchveiculos : searchCdas)
    
  },[search,searchcdas,searchveiculos,dadosTabela])

    const handleOnColumnSort = (searchFinal, setContent, setSortBy) => ({
      key,
      order
    }) => {
      const dataSorted = [...searchFinal].sort((a, b) =>
        order === "desc" ? a[key] - b[key] : b[key] - a[key]
      );
      setSortBy({ key, order });
      setContent([...dataSorted]);
    };   

    const onRowSelect = (row) => {
      setButtonPopup(true);
      console.log(row)
      setDadosForm(row)
    };

    const addClassNameRow = selectedRow => (e) => {
      const { idModeloVeiculo, idCda } = e.rowData;
      const hasEqualRow = selectedRow?.idModeloVeiculo === idModeloVeiculo && selectedRow.idCda === idCda;
      return hasEqualRow && "active";
    };

    const alterData = content.length !== 0 ? content : searchFinal;

    return (
      <>
        <Table
        data={alterData}
        rowKey="linhas"
        headerHeight={30}
        rowHeight={30}
        onRowSelect={onRowSelect}
        onClickRow={handleOnClickRow(setSelectedRow)}
        rowClassName={addClassNameRow(selectedRow)}
        sortBy={sortBy}
        onColumnSort={handleOnColumnSort(searchFinal, setContent, setSortBy)}
        selectable>
        {columnDefinition.map(({ dataKey, ...restProps }) => {
        return (
          <Column key={dataKey} dataKey={dataKey} {...restProps} />
        )})}
      </Table>
      <Popup trigger={buttonPopup} setTriger={setButtonPopup}></Popup>
      </>

)
}
export { Table, Column,TabelaMontada};