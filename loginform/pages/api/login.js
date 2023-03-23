import axios from "axios";
import nc from "next-connect"
import session from "../session";

const handler = nc({
  onError:(err, req, res,next)=>{
    res.status(500).end("Something")
  }
})
handler.use(session)
handler.post(async (req, res)=>{
  console.log('testing in server')
  const { email, password } = req.body;
  const response = await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });  
  if(response.status.toString().startsWith('20')){  
      req.session.user = response.data.data
      req.session.token = response.data.data
      res.status(200).send({ status: "success", message: "SignUp Successfully" });
  } else {
      res.status(400).send({ status: "failed", message: "Failed To Register The User" });
  }
})
export default handler;
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { email, password } = req.body;
//     const response = await axios.post("http://localhost:3000/auth/login", {
//       email,
//       password,
//     });
//     if(response.status.toString().startsWith('20')){  
//         res.status(200).send({ status: "success", message: "SignUp Successfully" });
//     } else {
//         res.status(400).send({ status: "failed", message: "Failed To Register The User" });
//     }
//   }

// }
