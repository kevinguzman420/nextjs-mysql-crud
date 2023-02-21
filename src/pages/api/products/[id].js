import { pool } from "@/config/db";

export default async function handler(req, res) {
  //   req.method : allow to get the request method
  //   req.query.id : allows to get the url query
  const { id } = req.query;

  let result = null;
  switch (req.method) {
    case "GET":
      result = await pool.query("SELECT * FROM product WHERE id = ?", id);
      return res.status(200).json(result[0]);
    case "DELETE":
      await pool.query("DELETE FROM product WHERE id = ?", id);
      return res.status(200).json("Product deleted!");
    case "PUT":
      await pool.query("UPDATE product SET ? WHERE id = ?", [req.body, id]);
      return res.status(200).json("Product updated!");
    default:
      return res.status(400).json({ message: "bad request" });
  }
}
