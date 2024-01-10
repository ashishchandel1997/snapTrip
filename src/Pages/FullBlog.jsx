
import React from 'react'
import NavBar from '../NavBar'
import { useParams } from 'react-router-dom';
import { Parser } from "html-to-react";


const FullBlog = ({ data,user,setUser }) => {
  const htmlParser = new Parser();
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const post = data.find((blog) => blog.id == postId);
  const htmlData=post?.details

  const baseUrl="https://argosmob.uk/snaptrip/admin/uploads/blogs/"  
  if (!post) {
    return <div>Blog post not found.</div>;
  }
  return (
    <div className='mb-5'>
        <NavBar user={user} setUser={setUser}/>
        <div className='container mt-5'>
          <h1 className='text-center my-5'>{post?.title}</h1>
        <img className='imgfullWidth'   src={`${baseUrl}${post?.thumbnail}`}/>
        </div>
        <div className='w-100'>
             <div className='w-75 m-auto pt-5' style={{textAlign:"justify"}}>
             <p>{post?.details}</p>
             {htmlParser.parse(post?.details)}
             </div>
        </div>
    </div>
  )
}

export default FullBlog