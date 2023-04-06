import { get_blogs } from "./api/auth";
import styles from '../styles/postpage.module.css'
import { parse, serialize } from 'cookie';
import { useState } from "react";
import { update_content } from "./api/auth";
import { delete_blog } from "./api/auth";
import { useRouter } from "next/router";


export async function getServerSideProps(context) {
  


  context.res.setHeader(
     'Cache-Control',
     'public, s-maxage=10800, stale-while-revalidate=10800'
 )


 
 let {id} = context.query;
 if(id) {
 
      let postData = await get_blogs('id='+id)
      postData=postData.data.result
      if(postData=="post not found"){
        return {
          notFound:true
      }
      }
      return { props: { postData } };
      
 }  
}
const postPage = ({postData})=>{
  
  const [editcontent,setEditcontent]=useState('');
  const parsedCookie = parse(document.cookie);
  const uname=parsedCookie.username;
  const urole=parsedCookie.role;
  const router=useRouter();

  
  
  let auth=postData.author_id;
  auth=auth.substring(0,auth.indexOf('@'));

  async function editContent(event){
     event.preventDefault();
     let content=postData.content + " "+editcontent;
     //console.log("ediit k lye "+edited)
     let id=postData.id;
     const data={id,content}
     console.log("edit  "+data);
    const res=update_content(data);
    alert('content inserted');
    setEditcontent('');
    router.push('../../postPage?id='+postData.id)

  }

  async function deleteBlog(event){
    event.preventDefault();

    let id=postData.id;
    console.log("for delete "+id);
    const res=await delete_blog("id="+id);
    if(res.result=='post deleted'){
      alert("blog delete by admin");
      router.push("/home");
    }


  }

  
  return(
        <div className={styles.post_page_body}>
         
             <h1>{postData.title} </h1>
              
              <p>{postData.content}</p>
              <div style={{display:(uname==auth || urole=='Admin')?'block':'none'}}>
                  
                  <form onSubmit={editContent}><div className={styles.formClass}>
                  <textarea placeholder="  Enter content" value={editcontent} onChange={e=>setEditcontent(e.target.value)} style={{marginTop:"30vh"}} required></textarea>
                  <button className={"btn btn-outline-warning "+styles.buttonEdit} > Add views </button>
                  
                 </div></form>
                 <button className={"btn btn-outline-danger "+styles.delete}  style={{display:(urole=='Admin')?'block':'none'}}  onClick={deleteBlog}> Delete Blog </button>
                  {/* <button  className={"btn btn-outline-warning "+styles.buttonEdit}>Delete</button> */}
              </div>
              
        </div>
    )
}
export default postPage;