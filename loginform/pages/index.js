import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Notfound(){
    const router = useRouter()
    useEffect(()=>{   
       router.push('/login')
    },[])
}