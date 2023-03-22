import { db } from "../connect.js";

export const getAllReport = (req, res) => {
    const q = "SELECT * FROM mdb_cs INNER JOIN connector ON mdb_cs.charge_box_id = connector.charge_box_id INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  };