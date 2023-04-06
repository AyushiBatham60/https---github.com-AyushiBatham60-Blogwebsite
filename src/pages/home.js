import styles from '../styles/home.module.css';
import PostList from '../../components/PostList'
import Link from 'next/link';
import {useState} from 'react';
import withLoading from '../../components/withLoading';
import { parse, serialize } from 'cookie';
import "bootstrap/dist/css/bootstrap.min.css";



export default function home({dataArray}){
    const [searchQuery, setSearchQuery] = useState('')
    const parsedCookie = parse(document.cookie);
    const uname=parsedCookie.username;
    const urole=parsedCookie.role;
  console.log("home p n"+urole);
    return <>
        <div className={styles.home_header}>
            <h1>Blog Website</h1>
            
            <form className="d-flex" role="search">
                 <input className="form-control me-2" type="search" placeholder="Search" ></input>
                 <button className={"btn btn-outline-light "+styles.searchbut} type="submit">Search</button>
                  {/* <Link href={'../createPost'} className={styles.createButton}>+</Link> */}
                  {/* <FontAwesomeIcon icon="fa-solid fa-user" style={{color: "#d1d3d6",}} /> */}
                  
            </form>
            
            <h6>me-{uname}</h6>
        </div>
        <div className={styles.home_body}>
           <PostList  dataArray={dataArray} />
        </div>
    </>
}
 
export async function getServerSideProps() {
    //Fetch data from external API
    const res = await fetch(`http://127.0.0.1:8000/blogs/get_all_blog`)
    const dataArray = await res.json()
    return { props: { dataArray, }, };
    
  }

