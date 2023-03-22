import { db } from "../connect.js";

export const getAllCustomer = (req, res) => {
  const q =
    "SELECT * FROM mdb_customer INNER JOIN ocpp_tag ON mdb_customer.id_tag = ocpp_tag.id_tag";
  // const q = "SELECT * FROM mdb_customer INNER JOIN transaction_start ON mdb_customer.id_tag = transaction_start.id_tag INNER JOIN transaction_stop ON transaction_start.transaction_pk = transaction_stop.transaction_pk INNER JOIN connector ON transaction_start.connector_pk = connector.connector_pk INNER JOIN connector_status ON connector.connector_pk = connector_status.connector_pk";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getCustomer = (req, res) => {
  const customerId = req.params.id;
  const q = "SELECT * FROM mdb_customer WHERE id = ?";

  db.query(q, [customerId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};
export const addOcpp = async (inputData) => {
  try {
    // console.log("test");
    const q =
      "INSERT INTO ocpp_tag(`ocpp_tag_pk`,`id_tag`,`expiry_date`,`max_active_transaction_count`) VALUES (?)";
    const values = [
      inputData.ocpp_tag_pk,
      inputData.id_tag,
      inputData.expiry_date,
      inputData.max_active_transaction_count,
    ];
    await db.query(q, [values], (err, data) => {
      if (err) {
        console.log("error");
        return;
      }
      console.log("data", data);
      return;
    });
  } catch (error) {
    console.log("error");
    return;
  }
};
export const addCustomer = async (req, res) => {
  try {
    const q =
      "INSERT INTO mdb_customer(`NAME`,`id_tag`,`EMAIL`,`ADDRESS`,`PHONE_NUMBER`) VALUES (?)";

    const values = [
      req.body.NAME,
      req.body.id_tag,
      req.body.EMAIL,
      req.body.ADDRESS,
      req.body.PHONE_NUMBER,
    ];
    const inputData = {
      ocpp_tag_pk : req.body.ocpp_tag_pk,
      id_tag : req.body.id_tag,
      expiry_date : req.body.expiry_date,
      max_active_transaction_count : req.body.max_active_transaction_count
    }
    await addOcpp(inputData);
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);

      return res.json(data);
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
    });
  }
};

export const deleteCustomer = (req, res) => {
  const customerId = req.params.id;
  const q = " DELETE FROM mdb_customer WHERE id = ? ";

  db.query(q, [customerId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const q =
    "UPDATE mdb_customer SET `NAME`= ?, `ID_TAG`= ?, `EMAIL`= ?, `KTP`= ? WHERE id = ?";

  const values = [req.body.NAME, req.body.ID_TAG, req.body.EMAIL, req.body.KTP];

  db.query(q, [...values, customerId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};
