import Link from "next/link";

function Product({ productid = 100 }) {
  return (
    <div>
      <Link href="/">
        <h3>Home</h3>
      </Link>
      <Link href="/product/1">
        <h1>product 1</h1>
      </Link>
      <br />
      <Link href="/product/2">
        <h1>product 2</h1>
      </Link>
      <br />
      <Link href="/product/3">
        <h1>product 3</h1>
      </Link>
      <br />
      <Link href={`/product/${productid}`}>
        <h1>product {productid}</h1>
      </Link>
    </div>
  );
}

export default Product;
