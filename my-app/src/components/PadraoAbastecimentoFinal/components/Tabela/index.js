import { Column } from "react-base-table";
import React from "react";
import Table from "./table";
import { IndexContext }  from '../../context/index'
import columnDefinition from './column-definition'
import Popup from '../Edit/index'

const handleOnClickRow = setSelectedRow => (e) => {
  setSelectedRow(e.rowData)
};


const TabelaMontada = () => {
    const [selectedRow, setSelectedRow] = React.useState(null);
    const {dadosTabela,setDadosForm,search,select,setSearch} = React.useContext(IndexContext);
    const [sortBy, setSortBy] = React.useState({ key: "qtdLitrosAbastecPadrao", order: "asc" });
    const [openPopup, setOpenPopup] = React.useState(false);

    React.useEffect(() => {
      let newList = select.abastecimentoZerado ? 
                dadosTabela.filter(el => el.mediaPadrao == 0 && el.qtdLitrosAbastecPadrao == 0)
          :     dadosTabela.filter(el => el.mediaPadrao > 0 && el.qtdLitrosAbastecPadrao > 0);
      newList = select.idCdaSelec > 0 ? newList.filter( el => el.idCda == select.idCdaSelec ) : newList;
      newList = select.idVeiculoSelec > 0 ? newList.filter( el => el.idModeloVeiculo == select.idVeiculoSelec ) : newList;

      setSearch(newList);
    },[dadosTabela, select]); 

    const handleOnColumnSort = () => ({
      key,
      order
    }) => {
      const dataSorted = [...search].sort((a, b) =>
        order === "desc" ? a[key] - b[key] : b[key] - a[key]
      );
      setSortBy({ key, order });
      setSearch([...dataSorted]);
    };   

    const onRowSelect = (row) => {
      setOpenPopup(true);
      setDadosForm(row)
    };

    const addClassNameRow = selectedRow => (e) => {
      const { idModeloVeiculo, idCda } = e.rowData;
      const hasEqualRow = selectedRow?.idModeloVeiculo === idModeloVeiculo && selectedRow.idCda === idCda;
      return hasEqualRow && "active";
    };


    return (
      <>
        <Table
        data={search}
        rowKey="linhas"
        headerHeight={30}
        rowHeight={30}
        onRowSelect={onRowSelect}
        onClickRow={handleOnClickRow(setSelectedRow)}
        rowClassName={addClassNameRow(selectedRow)}
        sortBy={sortBy}
        onColumnSort={handleOnColumnSort}
        selectable>
        {columnDefinition.map(({ dataKey, ...restProps }) => {
        return (
          <Column key={dataKey} dataKey={dataKey} {...restProps} />
        )})}
      </Table>
      <Popup trigger={openPopup} setTriger={setOpenPopup}></Popup>
      </>

)
}
export { Table, Column,TabelaMontada};