import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import axios from "axios";

function HomePage({ products }) {
  const router = useRouter();

  const handleGetProduct = async (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <Layout>
      <div className="mb-[32px] w-full text-center">
        <h1 className="text-3xl">Product list</h1>
      </div>
      <div className="bg-white p-8 rounded-md w-[80%] mx-auto">
        <table className="min-w-full border leading-normal">
          <thead>
            <tr className="">
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {product.name}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {product.price}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {product.description}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => handleGetProduct(product.id)}
                    className="mx-4 px-4 py-2 text-gray-800 bg-gray-300 rounded"
                  >
                    See it
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get("http://localhost:3000/api/products");

  return {
    props: { products: data },
  };
}

export default HomePage;
