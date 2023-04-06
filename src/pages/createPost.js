import { useState } from 'react'
import { useRouter } from 'next/router'
// import { createPost } from '../lib/posts'
// import ReactQuill from 'react-quill'
import styles from '../styles/createPost.module.css'
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { add_post } from './api/auth';

export default function createPosts() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author,setAuthor]=useState('')
  const [image, setImage] = useState('')
  const router = useRouter()
  

  async function handleSubmit(event) {
    
    event.preventDefault();
    // const formData = new FormData()
    // formData.append('title', title)
    // formData.append('content', content)
    // formData.append('image', image)
    // await createPosts(formData)

    // router.push('/')
    
    console.log("--"+title)
    const data={title,image,content,author}
    const response=add_post(data);
    if(response){
      alert("Post Added Succesfully")
      router.push("/home")
    }
    else{
      alert(response);
    }
    
  }

  return (
    <div className={styles.bodyy}>
      <h1 className={styles.post_heading}>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.details}>
            <label className={styles.labelsClass}><h2>Title </h2></label><br></br>
            <input  className="form-control" type='text' placeholder="Enter title name" name="postTitle" value={title} onChange={e => setTitle(e.target.value)}style={{width:"85vh"}}></input>
        </div>
        <br></br>
        <div className={styles.details}>
            <label className={styles.labelsClass}><h2>Author </h2></label><br></br>
            <input  className="form-control" type='text' placeholder="Enter your name" name="postAuthor" value={author} onChange={e => setAuthor(e.target.value)}style={{width:"85vh"}}></input>
        </div>
        <br></br>
        <div className={styles.details}>
            <label className={styles.labelsClass}><h2>Content</h2></label><br></br>
            <textarea value={content} onChange={e => setContent(e.target.value)}  ></textarea>
        </div>
        <br></br>
        
        <div className={styles.details}>
          <div className="form-group">
              <label for="exampleFormControlFile1" className={styles.labelsClass}><h4>Display picture of Blog :  </h4></label>
              <input type="file" class="form-control-file" id="exampleFormControlFile1" value={image} onChange={e => setImage(e.target.value)}></input>
          </div>
        </div>
        <br></br>
        
        <div className={styles.details}>
            <input className={"btn btn-outline-warning " + styles.button_class}type='submit' placeholder='Submit' ></input>
        </div>
      </form>
    </div>
  )
}
