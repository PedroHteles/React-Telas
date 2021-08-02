import React, { useState, useEffect, memo } from "react";
import { Table, Column } from "./Table";
import 'reactjs-popup/dist/index.css';
import api from './services/api';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Popup from '../src/Popup/popup';


import columnDefinition from "./column-definition";
const TableBase = () => {
  const [CDAS, setCDAS] = useState([]);
  const [Veiculo, setVeiculo] = useState([]);
  const [Filter, setFilter] = useState([]);





  //front
  const [Post, setPost] = useState([]);
  const [formlitros,  setFormLitros] = useState([]);
  const [formedia, setFormMedia] = useState([]);
  const [indexCDAS, setindexCDAS] = React.useState("0");
  const [indexVEICULOS, setindexVEICULOS] = React.useState("0");
  const [CDA0, setindexCDA0] = React.useState("0");
  const [buttonPopup, setButtonPopup] = useState(false);
  const handleChangeMedia = (e) => {
    setFormMedia(e.target.value);
  }
  const handleChangeLitros = (e) => {
    setFormLitros(e.target.value);
  }
  async function handleChangeVeiculo(e){
    setindexVEICULOS(e.target.value)
  }
  async function handleChangeCDA0(e){
    setindexCDA0(e.target.value)
  }


  useEffect( () =>{
    async function getCda0(){
    if(CDA0 != 0){
      const dados = {indexcda:indexCDAS, indexveiculos:indexVEICULOS}
      const res = await api.post('CDA0',dados)
      setFilter(res.data)
  
    }
    else{
      const dados = {indexcda:indexCDAS, indexveiculos:indexVEICULOS}
      const  res = await api.post('pesquisa',dados)
      setFilter(res.data)
    }

  }
  getCda0()
  }, [CDA0,indexCDAS,indexVEICULOS])

  
  useEffect( () =>{
    async function getcda(){
      const  res = await api.get('cdas');
      setCDAS(res.data)
    }

    async function getveiculos(){
      const  res = await api.get('modelos');
      setVeiculo(res.data)
    }

    getveiculos()
    getcda()
  }, [])





 

    // console.log(rowKey);



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


  async function handleChangeCDA(e){
    setindexCDAS(e.target.value)
  }

  return (
    <>
          
          <FormControl>
            <NativeSelect id="demo-customized-select-native" value={indexCDAS} onChange={handleChangeCDA}>
              <option value="0">CDAS</option>
                {CDAS.map((posts, index) => ( <option key={index} value={posts.id_cda}>{posts.descricao}</option> ))}
            </NativeSelect>
          </FormControl>

          <FormControl>
            <NativeSelect id="demo-customized-select-native" value={indexVEICULOS} onChange={handleChangeVeiculo} >
              <option value="0">VEICULOS</option>
                {Veiculo.map((posts, index) => ( <option key={index} value={posts.id_modelo}>{posts.descricao}</option>))}
            </NativeSelect>
          </FormControl>

          <FormControl>
            <NativeSelect id="demo-customized-select-native" value={CDA0} onChange={handleChangeCDA0}>
              <option value="0">Qtd. Litros</option>
              <option value="1">0</option>
            </NativeSelect>
          </FormControl>


      <Table
        data={Filter}
        rowKey="id"
        headerHeight={30}
        rowHeight={30}
        onRowSelect={onRowSelect}
        onSelectedRowsChange={onSelectedRowsChange}
        selectable
      >
        {columnDefinition.map(({ dataKey, ...restProps }) => (
          <Column key={dataKey} dataKey={dataKey} {...restProps} />
        ))}
      </Table>
      <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
        <h1 className="text-center">{Post.cda_descricao}</h1>
        <h1 className="text-center">{Post.veiculo_descricao}</h1>
          <form className="form-center"  onSubmit={EnviaFormularioEditar}>
            <h3 className="text-center">Qtd. de Litros</h3>
            <input type="number" min="1" className="input just-name" value={formlitros} onChange={handleChangeLitros}></input >
            <h3 className="text-center">Média Padrão</h3>
            <input type="number" step="0.01" min="1" max="99.99" className="input just-name" value={formedia} onChange={handleChangeMedia}></input>
            <input type="submit" className="enviar"></input>
          </form>
      </Popup>
    </>
  );
};

export default memo(TableBase);
