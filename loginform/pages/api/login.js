import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    if(response.status.toString().startsWith('20')){  
        res.status(200).send({ status: "success", message: "SignUp Successfully" });
    } else {
        res.status(400).send({ status: "failed", message: "Failed To Register The User" });
    }
  }

}
