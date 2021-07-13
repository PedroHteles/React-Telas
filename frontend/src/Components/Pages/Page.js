import React,{useState, useEffect} from  'react';
import { getPosts } from '../services/Post.services';
function Page() {


  const[posts, setPosts] = useState([]);
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];
  
    async function fetchPosts () {
      getPosts().then(setPosts);
      console.log(posts);
    }

    useEffect(() => {
      fetchPosts();
    }, []);

    useEffect(() => {
      console.log(posts,);
    }, [posts])



    console.log(posts)


    return (
        <div className="users">
        </div>
      );

}


export default Page;