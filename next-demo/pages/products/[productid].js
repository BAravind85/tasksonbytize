import { useRouter } from "next/router";

function Product({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>{product.id} </h1>
      <br />
      <h1>{product.name}</h1>
      <br />
      <h1> {product.price} $</h1>
      <br />
      <h1>{product.description}</h1>
    </>
  );
}
export default Product;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { productid: "1" },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:4000/products/${params.productid}`);
  const data = await res.json();
  return {
    props: {
      product: data,
    },
    revalidate: 5,
  };
}
