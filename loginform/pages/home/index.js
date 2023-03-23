import axios from 'axios';
import nc from 'next-connect'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import session from '../session';
// import { useEffect } from 'react';
function Home({session}) {
  const router = useRouter()

  console.log('sess',session)
  
  // useEffect(()=>{
  //     if(logout===true){
  //       router.push('/login')
  //     }      
  //     // context.req.session.destroy()
  //   },[logout])
  
  // console.log(logout)

  const handleLogout = async () => {
    const response = await axios.post('http://localhost:3001/api/logout')
    if(response.status.toString().startsWith('20')){
      router.push('/login')
    }
    console.log("response", response)
  }

  return (
    <div >
      <div className="flex justify-end h-16 w-full mr-10 drop-shadow-2xl bg-slate-300 rounded-b-lg pt-2 ">
      <button className='mr-10 rounded hover:underline underline-offset-8' onClick={handleLogout}>Logout</button>
      </div>  
    <div className="flex justify-center mt-48">
      <h1 className="font-extrabold text-8xl text-emerald-400">Welcome </h1><h1 className="ml-3 mt-16">to Home page</h1>
    </div>
    </div>
  );
}
export default Home;

export async function getServerSideProps(context){
  // const router = useRouter()
  await nc().use(session).run(context.req,context.res)
  const req = context.req.session
  console.log('req',req)

  //  context.req.session.destroy()
  // return {
  //   props:{
    
  //   }
  // }
 
 
  if(req.user || req.token){
    console.log('success')
    return{
      props:{
        logout:false,
      },
    }
  }else{
    console.log('failed')
    // context.req.session.destroy()
    return{
      props:{
        logout:true,
        session:context.req.session
      },
      redirect:{
          destination:'/login'
      }
    }
  }
}