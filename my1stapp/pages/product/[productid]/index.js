import { useRouter } from "next/router";

function ProductDetails() {
  const router = useRouter();
  const productid = router.query.productid;
  return <h1>Details about product {productid}</h1>;
}

export default ProductDetails;
