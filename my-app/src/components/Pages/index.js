import React, { memo } from "react";
import 'reactjs-popup/dist/index.css';
import Popup from '../Popup/index';
import { IndexContext } from '../../context/index'
import Filtros from '../Select/index'
import { Table, Column } from "../Table";
import columnDefinition from "../Table/column-definition";
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';


const onSelectedRowsChange = (rows) => {
  //console.log(rows, "teste");
};
const handleOnClickRow = setSelectedRow => (e) => {
  setSelectedRow(e.rowData)
};


const TableBase = () => {
  const { filter } = React.useContext(IndexContext);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const { enviaFormularioEditar, formlitros, setFormlitros, formedia, setFormMedia, Post, setPost, status, buttonPopup, setButtonpopup } = React.useContext(IndexContext);


  const onRowSelect = (row) => {
    setButtonpopup(true);
    setFormlitros(row?.qtd_litros_abastec_padrao);
    setFormMedia(row?.media_padrao);
    setPost(row);
  };


  //adiciono o valor do index em aca array  
  filter?.forEach(function (o, index) {
    o.linhas = index
  });
  const addClassNameRow = selectedRow => (e) => {
    const { id_modelo_veiculo, id_cda } = e.rowData;

    console.log(selectedRow?.id_modelo_veiculo, selectedRow?.id_cda, 'b')
    console.log(Post?.id_modelo_veiculo, Post?.id_cda, 'a')
    const hasEqualRow = selectedRow?.id_modelo_veiculo === id_modelo_veiculo && selectedRow.id_cda === id_cda;
    return hasEqualRow && "active";
  };




  return (

    <div className="div1">
      <header><img src="https://cdn.discordapp.com/attachments/866746914036645908/885261787535143003/1519864734798_2.png" width="50" height="50" className="logo" alt="website logo" /></header>
      <div className="ata">
        <Filtros />
      </div>
      <Table
        data={filter}
        rowKey="linhas"
        headerHeight={30}
        rowHeight={30}
        onRowSelect={onRowSelect}
        onSelectedRowsChange={onSelectedRowsChange}
        onClickRow={handleOnClickRow(setSelectedRow)}
        rowClassName={addClassNameRow(selectedRow)}
        selectable
      >
        {columnDefinition.map(({ dataKey, ...restProps }) => {
          return (
            <Column key={dataKey} dataKey={dataKey} {...restProps} />
          )
        })}
      </Table>

      <Popup trigger={buttonPopup} setTriger={setButtonpopup} >
        <h1 className="text-center">{Post?.cda_descricao}</h1>
        <h1 className="text-center">{Post?.veiculo_descricao}</h1>
        <form className="form-center" onSubmit={enviaFormularioEditar}>
          <div className="inputs">
            <div className="litros">
              <h3 className="text-center">Qtd. de Litros</h3>
              <FilledInput
                type="number"
                inputProps={{ min: 0, max: 9999 }}
                value={formlitros}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setFormlitros(e.target.value);
                  }
                }} />
            </div>
            <div className="media">
              <h3 className="text-center">Média Padrão</h3>
              <FilledInput
                type="number"
                inputProps={{ min: 0.0, max: 99.99, step: 0.01}}
                value={formedia}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setFormMedia(e.target.value);
                  }

                }} />
            </div>
          </div>
          <div className="botoes">
            <Button type="submit" variant="contained" color="success" className="">Enviar</Button>
          </div>
        </form>
        {status === 1 ? <div className="alterado">
        <div className="corzinha2">⠀</div>
        <h3 className="marginText">Erro!</h3>
      </div> : <></>}
      </Popup>
      {status === true ? <div className="alterado">
        <div className="corzinha">⠀</div>
        <h3 className="marginText">Valor alterado!</h3>
      </div> : <></>}



    </div>
  );


};

export default memo(TableBase);
