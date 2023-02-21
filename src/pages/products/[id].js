import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import axios from "axios";

function ProductById({ product }) {
  const router = useRouter();

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/api/products/${id}`);
    router.push("/products");
  };

  const handleUpdateProduct = async (id) => {
    router.push(`/products/edit/${id}`);
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="mx-auto p-10 w-[50%] bg-slate-800">
          <header className="mb-5">
            <strong>Product: </strong>
            {product.name}
          </header>
          <p className="mb-5">
            <strong>Price: </strong>
            {product.price}
          </p>
          <p>
            <strong>Description: </strong>
            {product.description}
          </p>
          <div className="mt-5">
            <button
              onClick={(e) => handleUpdateProduct(product.id)}
              className="mx-4 ml-0 px-4 py-2 bg-blue-400 rounded"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProduct(product.id);
              }}
              className="mx-4 px-4 py-2 dark:bg-red-400 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { data: product } = await axios.get(
    `http://localhost:3000/api/products/${query.id}`
  );

  return {
    props: {
      product: product[0],
    },
  };
};

export default ProductById;
