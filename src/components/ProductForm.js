import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function ProductForm() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!router.query.id) {
      await axios.post("/api/products", {
        name: product.name,
        description: product.description,
        price: product.price,
      });
    } else {
      await axios.put(`/api/products/${router.query.id}`, {
        name: product.name,
        description: product.description,
        price: product.price,
      });
    }
    router.push("/");
  };

  useEffect(() => {
    const getProductById = async (id) => {
      const { data } = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      setProduct(data[0]);
    };
    if (router.query.id) {
      getProductById(router.query.id);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-900">
      <h1 className="mb-3 text-3xl">Add new product</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 w-[500px] dark:bg-slate-800 rounded"
      >
        <div className="mb-5">
          <label htmlFor="name">Name:</label> <br />
          <input
            value={product.name}
            onChange={handleChange}
            type="text"
            name="name"
            className="w-full text-white bg-slate-600 outline-none h-8"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="price">Price:</label> <br />
          <input
            value={product.price}
            onChange={handleChange}
            type="text"
            name="price"
            className="w-full text-white bg-slate-600 outline-none h-8"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description">Description:</label> <br />
          <textarea
            value={product.description}
            onChange={handleChange}
            name="description"
            rows="2"
            className="w-full text-white bg-slate-600 outline-none h-8"
          ></textarea>
        </div>
        <button className="w-[200px] px-4 py-2 bg-blue-900 rounded">
          {router.query.id ? "Update" : "Create"} Product
        </button>
      </form>
    </div>
  );
}
