import Link from "next/link";
function Home() {
  return (
    <>
      <h1>Home next js</h1>
      <Link href="/users">users</Link>
      <br />
      <Link href="/posts">posts</Link>
    </>
  );
}

export default Home;
