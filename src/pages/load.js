import { useReducer } from "react";
import withLoading from "../../components/withLoading";
import { useRouter } from "next/router";



function load(){
    const router=useRouter();


    return router.push("/home")
}

export default withLoading(load);