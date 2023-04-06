import { useState } from 'react'
import styles from '../styles/login.module.css'
import { user_exist } from './api/auth';
import { check_password } from './api/auth';
import { useRouter } from 'next/router';
import signup from './signup';
import cookie from 'cookie';
import Link from 'next/link';
import { parse, serialize } from 'cookie';
import { get_role } from './api/auth';

export default function login(){
    const [email,setEmail]=useState();
    const [password,setPassword]=useState()
    const router=useRouter()

     async function userLogin(event){
        event.preventDefault();
        let exist=await user_exist("email="+email);
        if(exist.result=="user does not exist"){
            alert("no account with this email please login")
            router.push("/signup")
        }else{
            let res=await check_password("email="+email+"&password="+password);
            if(res.result=="succesfully loged in"){
                const parsedCookie = parse(document.cookie);
                parsedCookie.username = email.substring(0,email.indexOf('@'));
                let res=await get_role("email="+email);
                // console.log("--role "+res.role);
                parsedCookie.role=res.role;
                 console.log("login p h "+parsedCookie.role);
                document.cookie = serialize('username', parsedCookie.username);
                document.cookie = serialize('role', parsedCookie.role);
                router.push("/home");
            }
            else{
                console.log(password);
                alert("wrong password");

            }
        }
     }


    return <div className={styles.outer_bodyy}> 
        <div className={styles.bodyy}>
            <h2>Login</h2>
            <form onSubmit={userLogin}>
                <div className={styles.each_field}>
                    <label style={{'margin-right':'6.5vh'}}><h5>Email</h5></label>
                    <input type='email' placeholder=' Enter Your Email ' value={email} onChange={e=>setEmail(e.target.value)} required></input><br></br>
                </div>
                <div className={styles.each_field}>
                    <label><h5>Password</h5></label>
                    <input type='password' placeholder=' Enter Your password ' value={password} onChange={e=>setPassword(e.target.value)} required></input><br></br>
                </div>
                <input type='submit' value="login" className={styles.buttonEdit}></input>
                <p>Don't have account ? <Link href={'../signup'}>Create account</Link></p>
            </form>
        </div>
    </div>
}

export const getServerSideProps = (context) => {
    // Set the cookie
  const cookies = parse(context.req.headers.cookie || '');
  const username = cookies.myCookieName || 'default cookie value';
  const role= cookies.myCookieName || 'default cookie value';

  return {
    props: {
      username,
      role,
    },
  };
   
  };