import React from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { IndexContext } from '../context/indexContext'
import api from "../../services/api";
function Filtros(props) {
    const [indexCDAS, setindexCDAS] = React.useState("0");
    const [indexVEICULOS, setindexVEICULOS] = React.useState("0");
    const [CDA0, setindexCDA0] = React.useState("0");
    const { setFilter } = React.useContext(IndexContext);


    React.useEffect( () =>{
    async function getCda0(){
      if(CDA0 !== '0'){
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
  }, [CDA0,indexCDAS,indexVEICULOS,setFilter])



  return (
    <div >
      <FormControl>
        <NativeSelect id="demo-customized-select-native" value={indexCDAS}  onChange={(e) => setindexCDAS(e.target.value)}>
          <option value="0">CDAS</option>
            {props?.cda.map((posts, index) => ( <option key={index} value={posts.id_cda}>{posts.descricao}</option> ))}
        </NativeSelect>
      </FormControl>
      <FormControl>
        <NativeSelect id="demo-customized-select-native" value={indexVEICULOS} onChange={(e) => setindexVEICULOS(e.target.value)} >
          <option value="0">VEICULOS</option>
            {props?.veiculo.map((posts, index) => ( <option key={index} value={posts.id_modelo}>{posts.descricao}</option>))}
        </NativeSelect>
      </FormControl>
      <FormControl>
        <NativeSelect id="demo-customized-select-native" value={CDA0} onChange={(e) => setindexCDA0(e.target.value)}>
          <option value="0">Qtd. Litros</option>
          <option value="1">0</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
export default Filtros;