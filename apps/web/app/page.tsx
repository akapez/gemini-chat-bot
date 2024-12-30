import CreateProduct from "./components/create-products";
import ViewProducts from "./components/view-products";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <CreateProduct />
      <ViewProducts />
    </>
  );
}
