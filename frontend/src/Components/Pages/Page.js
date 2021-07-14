  
import React,{useState, useEffect} from  'react';
import { getPosts, getPosts1, getPosts2 }  from '../services/Post.services';
function Page() {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [posts2, setPosts2] = useState([]);

    function fetchPosts() {
      getPosts()
        .then(obj => setPosts(obj))
    }

    function fetchPosts1() {
      getPosts1()
      .then(obj => setPosts1(obj))
    }
    function fetchPosts2() {
      getPosts2()
      .then(obj => setPosts2(obj))
    }


    useEffect(() =>{
      fetchPosts()
      fetchPosts1()
      fetchPosts2()
    }, [])

    useEffect(() =>{
      console.log(posts,posts1,posts2)
    }, [posts])

    function sayHello() {
      console.log(posts);
    }


    return(
      <section>
        <ul>
          {posts.map((posts) => (
            <li key={posts.id_cda}>
              <p>descricao:{posts.descricao}</p>
              <p>qtd_litros_abastec_padrao:{posts.qtd_litros_abastec_padrao}</p>
              <p>media_padrao:{posts.media_padrao}</p>
              <p>descricaocda:{posts.descricaocda}</p>
              <button onClick ={() => console.log(posts.descricaocda,posts.descricao)} ></button>
            </li>
          ))}

      </ul>
      <ul>
        <h1>CDA</h1>
      {posts1.map((posts) => (
            <li key={posts.id_cda}>
              <p>descricao:{posts.descricao}</p>
            </li>
          ))}

      </ul>
      <ul>
        <h1>VEICULOS</h1>
        {posts2.map((posts) => (
            <li key={posts.id_modelo_veiculo}>
              <p>descricao:{posts.descricao}</p>
            </li>
          ))}
      </ul>
      <button onClick={() => setPosts([...posts, {

          "descricao": "SaoPaulo - sp", 
          "id_cda": 3

      }])}>add post</button>
      </section>

    )
  
}
export default Page;