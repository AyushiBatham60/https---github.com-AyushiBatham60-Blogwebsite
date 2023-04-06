import { add_user_data } from "./api/auth";
import { useReducer, useState } from "react";
import styles from '../styles/signup.module.css'
import { user_exist } from "./api/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { parse, serialize } from 'cookie';

export default function signup(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router=useRouter();
    
    async function handleSubmit(event){
        event.preventDefault();

        const data={name,email,password}
         
        let exist=await user_exist("email="+email)
        console.log(exist.result);
        
        if(exist.result=="user exits"){
            alert("user with same mail  exist please login");
            router.push('/login')
        }
        else{
            const response=add_user_data(data);
            console.log(response)
            if(response){
                 alert("account created")
                const parsedCookie = parse(document.cookie);
                parsedCookie.username = email.substring(0,email.indexOf('@'));
                document.cookie = serialize('username', parsedCookie.username);
                 router.push('/login');
            }
        }
        
    }

    return <div className={styles.bodyy}>
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}> 
          <div className={styles.each_field}>
          <label><h5>Name</h5></label>
          <input type="text" placeholder=" Enter your name" value={name} onChange={e => setName(e.target.value)} style={{width:"30vh"}} required></input><br></br>
          </div>
          <div className={styles.each_field}>
          <label ><h5>Email</h5></label>
          <input type="email"  placeholder=" Enter your email" value={email} onChange={e => setEmail(e.target.value)} style={{width:"30vh"}} required></input><br></br>
          </div>
          <div className={styles.each_field}>
          <label><h5>Password</h5></label>
          <input type="password" placeholder="enter password" value={password} onChange={e => setPassword(e.target.value)} style={{width:"30vh"}} required></input><br></br>
          </div>
          <button className={"btn btn-outline-light "+styles.buttonEdit} >Add user</button><br></br>
          <p>Already have account ? <Link href={'../login'} >Login</Link></p>
        </form>
    </div>

}