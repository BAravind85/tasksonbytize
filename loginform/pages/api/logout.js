import { users } from "../../data/users";
import nc from "next-connect"
import session from "../session";

const handler = nc()
handler.use(session)

export default handler.post((req, res)=>{
    console.log("request is testing", req.session)
    try{
        req.session.destroy()
            console.log('res redirecting')
            // res.redirect('/login')
            res.status(200).send("Logout")
    }catch(error){
        console.log(error)
    }
 
})