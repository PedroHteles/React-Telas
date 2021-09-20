  
import React, { createContext, useState} from "react";
import api from "../../services/api";

export const IndexContext = createContext();

export default function IndexProvider({ children }) {
  const [cdas, setCdas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [filter, setFilter] = useState([]);
  const [medias, setMedias] = useState([]);
  const [indexveiculos, setIndexveiculos] = React.useState(0);
  const [indexCDAS, setIndexcdas] = React.useState(0);
  const [cda0, setIndexcda0] = React.useState(0);
  const [Post, setPost] = useState([]);
  const [formlitros,  setFormlitros] = useState(0);
  const [formedia, setFormMedia] = useState(0);
  const [status, setStatus] = useState(null);
  const [statuscode, setStatuscode] = useState();
  const [buttonPopup, setButtonpopup] = useState(false);

    React.useEffect(() => {
      async function getcda(){
        const  res = await api.get('cdas');
        setCdas(res.data)
      }
      async function getveiculoss(){
        const  res = await api.get('modelos');
        setVeiculos(res.data)
      }
      getveiculoss()
      getcda()
    }, []);
    React.useEffect( () =>{
      async function getcda0(){
        const dados = {indexcda:indexCDAS, indexveiculos:indexveiculos,cda0:cda0}
        const  res = await api.post('pesquisa',dados)
        setFilter(res.data)
        }
      getcda0()
    }, [cda0,indexCDAS,indexveiculos,setFilter])

    async function enviaFormularioEditar(e){
      e.preventDefault()
      try {
        if(Post.id_cda_padrao_abastec == null){
          const editarformulario = { id_CdaPadrao: Post.id_cda_padrao_abastec, id_cda:parseInt(Post.id_cda), id_modelo:Post.id_modelo_veiculo, media:parseFloat(formedia) , litros:parseInt(formlitros),indexcda:indexCDAS, indexveiculos:indexveiculos,cda0:cda0}
          const res = await api.post('criar',editarformulario);
          setFilter(res?.data?.criado)
          setPost(res?.data?.valor_alterado)
          setStatus(true)
          setButtonpopup(false)
          setTimeout(function(){ setStatus(false); }, 3000);
          
        }else if (Post.id_cda_padrao_abastec != null){
          const editarformulario = { id_CdaPadrao: Post.id_cda_padrao_abastec, id_cda:parseInt(Post.id_cda), id_modelo:Post.id_modelo_veiculo, media:parseFloat(formedia) , litros:parseInt(formlitros),indexcda:indexCDAS, indexveiculos:indexveiculos,cda0:cda0}
          const res = await api.post('editar',editarformulario);
          setFilter(res?.data?.alterado)
          setPost(res?.data?.valor_alterado)
          setStatus(true)
          setButtonpopup(false)
          setTimeout(function(){ setStatus(false); }, 3000);
        }
      } catch (error) {
        var teste = 1
        setStatus(teste)
        
        setTimeout(function(){ setStatus(false); }, 2900);
      }
    }

  return (
    <IndexContext.Provider
      value={{ cdas, veiculos,filter,medias,indexveiculos,indexCDAS,cda0,Post,formlitros,formedia,status,statuscode,buttonPopup,
        setCdas, setVeiculos,setFilter,setMedias,setIndexveiculos,setIndexcdas,setIndexcda0,enviaFormularioEditar,setPost,setFormlitros,setFormMedia,setStatus,setButtonpopup }}
    >{children}
    </IndexContext.Provider>
  );
}




