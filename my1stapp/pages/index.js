import Link from "next/link";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const handleClick = () => {
    console.log("order got placed");
    router.push("/product");
  };
  return (
    <div>
      <h1>Home page</h1>
      <Link href="/docs">Docs</Link>
      <br />
      <Link href="/product">Products</Link>
      <br />
      <button onClick={handleClick}>Place order</button>
    </div>
  );
}

export default Home;
