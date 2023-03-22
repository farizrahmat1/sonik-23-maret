import { db } from "../connect.js";

export const getAllWarning = (req, res) => {
  const q = "SELECT * FROM connector_status INNER JOIN connector ON connector_status.connector_pk = connector.connector_pk INNER JOIN mdb_cs ON connector.charge_box_id = mdb_cs.charge_box_id INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getWarning = (req, res) => {
  const alertId = req.params.id;
  const q = "SELECT * FROM connector_status WHERE id = ?";

  db.query(q, [alertId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

