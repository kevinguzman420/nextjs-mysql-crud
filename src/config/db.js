import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "kevinguzman",
  port: 3306,
  database: "productsdb",
});
console.log(pool);

export { pool };
