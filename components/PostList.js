import Link from 'next/link';
import styles from '../src/styles/postlist.module.css';


import { parse, serialize } from 'cookie';

export default function PostList({dataArray}) {

  const parsedCookie = parse(document.cookie);
  const uname=parsedCookie.username;

    return (
      <div>
      <Link href={'../../createPost'} className={styles.create}>+ create post</Link>
      <div className={styles.all_post}>
        
        {dataArray.map((post,i) => (
          <div key={post.id} className={styles.individual_post}>
          
            <h4>{post.title}</h4>
            
            <p>{post.content.slice(0,250)} <Link href={`../../postPage?id=${post.id}`} className={styles.my_link} ><b>...Read more</b></Link></p>
            <h5>by:-<b>{post.author_id.substring(0, post.author_id.indexOf('@'))}</b></h5>
             <div className={styles.buttons}><Link href={`../../postPage?id=${post.id}`}><button className="btn btn-outline-success ">View</button></Link></div>
          </div>
        ))}
        
      </div>
      
      </div>
    )
  }