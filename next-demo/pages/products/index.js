import Link from "next/link";

function ProductList({ products }) {
  return (
    <>
      <h1>Product list</h1>
      <br />
      {products.map((item) => {
        return (
          <div key={item.id}>
            <Link href={`products/${item.id}`}>
              <h1>{item.name}</h1>
            </Link>
            <h2>{item.price}$</h2>
            <h3>{item.description}</h3>
          </div>
        );
      })}
    </>
  );
}
export default ProductList;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/products");
  const data = await res.json();
  return {
    props: {
      products: data,
    },
    revalidate: 5,
  };
}
