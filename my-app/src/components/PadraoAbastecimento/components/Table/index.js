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
    const {dadosTabela,setButtonPopup,buttonPopup,setDadosForm,dadosForm,setDadosTabela} = React.useContext(IndexContext);
    const [sortBy, setSortBy] = React.useState({ key: "qtd_litros_abastec_padrao", order: "asc" });
    const [content, setContent] = React.useState([]);




    const handleOnColumnSort = (dadosTabela, setContent, setSortBy) => ({
      key,
      order
    }) => {
      
      const dataSorted = [...dadosTabela].sort((a, b) =>
        order === "desc" ? a[key] - b[key] : b[key] - a[key]
      );
      setSortBy({ key, order });
      setDadosTabela([...dataSorted]);
    };



    const onRowSelect = (row) => {
      setButtonPopup(true);
      let qtdLitros = row.qtd_litros_abastec_padrao
      let mediaAbastecimento = row.media_padrao
      let idCdaAbastecimento =  row.id_cda_padrao_abastec
      let idCda =  row.id_cda
      let idModelo =  row.id_modelo_veiculo
      let veiculoDescricao = row.veiculo_descricao
      let cdaDescricao = row.cda_descricao
      setDadosForm({...dadosForm,qtdLitros,mediaAbastecimento,idCdaAbastecimento,idCda,idModelo,veiculoDescricao,cdaDescricao})
    };

    const addClassNameRow = selectedRow => (e) => {
      const { id_modelo_veiculo, id_cda } = e.rowData;
      const hasEqualRow = selectedRow?.id_modelo_veiculo === id_modelo_veiculo && selectedRow.id_cda === id_cda;
      return hasEqualRow && "active";
    };


    
    return (
      <>
        <Table
        data={dadosTabela}
        rowKey="linhas"
        headerHeight={30}
        rowHeight={30}
        onRowSelect={onRowSelect}
        onClickRow={handleOnClickRow(setSelectedRow)}
        rowClassName={addClassNameRow(selectedRow)}
        sortBy={sortBy}
        onColumnSort={handleOnColumnSort(dadosTabela, setContent, setSortBy)}
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