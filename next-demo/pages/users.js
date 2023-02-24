import User from "../components/user";

function Userslist({ users }) {
  return (
    <>
      <h1>list of User</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
}
export default Userslist;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
