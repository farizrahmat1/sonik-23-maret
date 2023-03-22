import { db } from "../connect.js";

export const getAllCustomerTransaction = (req, res) => {
  //   const q = "SELECT * FROM mdb_customer";
  const q =
    "SELECT mdb_customer.NAME, transaction_start.id_tag, transaction_start.transaction_pk, transaction_start.start_value, transaction_stop.stop_value, transaction_stop.event_timestamp FROM ((mdb_customer INNER JOIN transaction_start ON mdb_customer.id_tag = transaction_start.id_tag ) INNER JOIN transaction_stop ON transaction_start.transaction_pk = transaction_stop.transaction_pk)";
  
    // const q = "SELECT * FROM connector INNER JOIN transaction_start ON connector.connector_pk = transaction_start.connector_pk INNER JOIN mdb_customer ON transaction_start.id_tag = mdb_customer.id_tag";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};
