import { users } from "../../../data/users";
export default function handler(req, res) {
  //   console.log(req.body);
  if (req.method === "GET") {
    const user = users.find(
      (user) =>
        user.email === req.body.email && user.password === req.body.password
    );
    if (user) {
      res.status(200).json({ users });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } 
}
