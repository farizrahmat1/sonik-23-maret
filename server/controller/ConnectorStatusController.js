import { db } from "../connect.js";

export const getConnectorStatus = async (req, res) => {
  try {
    const {id}= req.params
    // console.log("chargebox", id);
    const q = `SELECT * FROM connector_status INNER JOIN connector ON connector_status.connector_pk = connector.connector_pk INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id  WHERE charge_box_id = ? `;
    // console.log("q", q);
    const values = [id];
    db.query(q, [values], (err, data) => {
      if (err) {
        console.log("error");
        return;
      }
      // console.log("data", data);
      return res.json(data);
    });
  } catch (error) {
    console.log("error");
    return;
  }
};
