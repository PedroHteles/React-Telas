import React, { useState, memo } from "react";
import 'reactjs-popup/dist/index.css';
import api from "../services/api";
import Popup from '../components/Componentes/Popup/popup';
import { IndexContext } from '../components/context/indexContext'
import Filtros from '../components/Select/select'
import { Table, Column } from "../components/Componentes/Table";
import columnDefinition from "../components/Componentes/Table/column-definition";
const TableBase = () => {
  const {filter,  CDAS , Veiculo } = React.useContext(IndexContext);
  
  //front
  const [Post, setPost] = useState([]);
  const [formlitros,  setFormLitros] = useState([]);
  const [formedia, setFormMedia] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);


  async function EnviaFormularioEditar(e){
    e.preventDefault()
    const editarformulario = { id_CdaPadrao:Post.id_cda_padrao_abastec, id_cda:Post.id_cda, id_modelo:Post.id_modelo_veiculo, media:formedia , litros:formlitros}
    await api.post('editar',editarformulario)
    
  }

  const onRowSelect = (row) => {
    setButtonPopup(true);  
    setPost(row)

  };

  const onSelectedRowsChange = (rows) => {
    //console.log(rows, "teste");
  };


  return (
    <>
      <Filtros cda={CDAS} veiculo={Veiculo}/>

      <Table
        data={filter}
        rowKey="id"
        headerHeight={30}
        rowHeight={30}
        onRowSelect={onRowSelect}
        onSelectedRowsChange={onSelectedRowsChange}
        selectable
      >
        {columnDefinition.map(({ dataKey,id, ...restProps }) => (
          <Column key={dataKey} dataKey={dataKey} {...restProps} />
        ))}
      </Table>

      <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
        <h1 className="text-center">{Post.cda_descricao}</h1>
        <h1 className="text-center">{Post.veiculo_descricao}</h1>
          <form className="form-center"  onSubmit={EnviaFormularioEditar}>
            <h3 className="text-center">Qtd. de Litros</h3>
            <input type="number" min="1" className="input just-name" value={formlitros} onChange={(e) => setFormLitros(e.target.value)}></input >
            <h3 className="text-center">Média Padrão</h3>
            <input type="number" step="0.01" min="1" max="99.99" className="input just-name" value={formedia} onChange={(e) => setFormMedia(e.target.value)}></input>
            <input type="submit" className="enviar"></input>
          </form>
      </Popup>
    </>
  );
};

export default memo(TableBase);
