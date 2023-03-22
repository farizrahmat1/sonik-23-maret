import mysql from "mysql";

export const db = mysql.createConnection({
  host:"localhost",
  user:"steve",
  password:"changeme",
  database:"stevedb"
})

