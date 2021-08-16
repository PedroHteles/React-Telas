  
import React, { createContext, useState} from "react";
import api from "../../services/api";


export const IndexContext = createContext();

export default function IndexProvider({ children }) {
  
    const [CDAS, setCDAS] = useState([]);
    const [Veiculo, setVeiculo] = useState([]);
    const [filter, setFilter] = useState([]);

    React.useEffect(() => {
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
    }, []);

  return (
    <IndexContext.Provider
      value={{ CDAS, Veiculo, setCDAS, setVeiculo,filter,setFilter }}
    >{children}
    </IndexContext.Provider>
  );
}




