import { pool } from "@/config/db";

export default async function handler(req, res) {
  const [rows] = await pool.query("SELECT NOW()");
  console.log("Database connected at: " + rows[0]["NOW()"]);

  switch (req.method) {
    case "GET":
      const [data] = await pool.query("SELECT * FROM product");
      return res.status(200).json(data);
    case "POST":
      const { name, price, description } = req.body;
      const [result] = await pool.query("INSERT INTO product SET ?", {
        name,
        price,
        description,
      });
      return res
        .status(200)
        .json({ name, price, description, id: result.insertId });
  }
}
