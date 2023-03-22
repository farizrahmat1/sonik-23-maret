import { db } from "../connect.js";

export const getAllTransactionsStart = (req, res) => {
  const q =
    "SELECT mdb_cs.NAME, mdb_connector.connector_name, transaction_start.transaction_pk, transaction_start.id_tag, transaction_start.start_timestamp, transaction_start.start_value,transaction_stop.stop_timestamp, transaction_stop.stop_value FROM ((((transaction_start INNER JOIN connector ON transaction_start.connector_pk = connector.connector_pk)  INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id)INNER JOIN mdb_cs ON connector.charge_box_id = mdb_cs.charge_box_id)INNER JOIN transaction_stop ON transaction_start.transaction_pk =  transaction_stop.transaction_pk)";

  // "SELECT * FROM transaction_start INNER JOIN connector ON transaction_start.connector_pk = connector.connector_pk INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id INNER JOIN mdb_cs ON connector.charge_box_id = mdb_cs.charge_box_id INNER JOIN transaction_stop ON transaction_start.transaction_pk =  transaction_stop.transaction_pk";F
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const addTransaction = (req, res) => {
  const q =
    "INSERT INTO mdb_transaction(`transaction_pk`,`NAME`,`connector_name`,`id_tag`,`start_timestamp`, 'start_value', 'stop_timestamp', 'stop_value', 'energy_consumption', 'energy_cost', 'duration') VALUES (?)";
  const values = [
    req.body.transaction_pk,
    req.body.NAME,
    req.body.connector_name,
    req.body.id_tag,
    req.body.start_timestamp,
    req.body.start_value,
    req.body.stop_timestamp,
    req.body.stop_value,
    req.body.energy_consumption,
    req.body.energy_cost,
    req.body.duration,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const deleteTransaction = (req, res) => {
  const transactionId = req.params.id;
  const q = " DELETE FROM mdb_transaction WHERE id = ? ";

  db.query(q, [transactionId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const updateTransaction = (req, res) => {
  const transactionId = req.params.id;
  const q =
    "UPDATE mdb_transaction SET `ID_CS` =?,`CS_NAME`=?,`CONNECTOR_TYPE`=?,`ID_TAG`=?,`ENERGY_CONSUMPTION`=? WHERE id = ?";

  const values = [
    req.body.ID_CS,
    req.body.CS_NAME,
    req.body.CONNECTOR_TYPE,
    req.body.ID_TAG,
    req.body.ENERGY_CONSUMPTION,
  ];

  db.query(q, [...values, transactionId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};
