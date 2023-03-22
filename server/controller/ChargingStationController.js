import { db } from "../connect.js";

export const getAllCS = (req, res) => {
  // const q = "SELECT * FROM mdb_cs  INNER JOIN connector ON mdb_cs.charge_box_id = connector.charge_box_id";
  // SELECT mdb_cs.ID,mdb_cs.NAME,mdb_cs.charge_box_id,mdb_cs.ENDPOINT_ADDRESS,mdb_cs.CITY,mdb_cs.LOCATION,mdb_cs.LATITUDE,mdb_cs.LONGITUDE,connector.connector_pk,connector.connector_id,connector_status.status,mdb_connector.connector_name FROM (((mdb_cs INNER JOIN connector ON mdb_cs.charge_box_id = connector.charge_box_id) INNER JOIN connector_status ON connector_status.connector_pk = connector_status.connector_pk) INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id);
  // SELECT * FROM mdb_cs INNER JOIN charge_box ON mdb_cs.charge_box_id = charge_box.charge_box_id INNER JOIN connector ON mdb_cs.charge_box_id = connector.charge_box_id INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id;
  const q =
  "SELECT * FROM mdb_cs INNER JOIN charge_box ON mdb_cs.charge_box_id = charge_box.charge_box_id"
  // "SELECT * FROM mdb_cs INNER JOIN charge_box ON mdb_cs.charge_box_id = charge_box.charge_box_id INNER JOIN connector ON ";
    // "SELECT * FROM mdb_cs INNER JOIN charge_box ON mdb_cs.charge_box_id = charge_box.charge_box_id INNER JOIN connector ON mdb_cs.charge_box_id = connector.charge_box_id INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id";
  // "SELECT * FROM mdb_cs INNER JOIN charge_box ON mdb_cs.charge_box_id = charge_box.charge_box_id INNER JOIN connector ON mdb_cs.charge_box_id = connector.charge_box_id INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id INNER JOIN connector_status ON connector.connector_pk = connector_status.connector_pk";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getAllConnector = (req, res) => {
  const q =
    "SELECT mdb_cs.NAME, mdb_cs.charge_box_id, connector.connector_pk, connector.connector_id, connector_status.status, mdb_connector.connector_name FROM ((( mdb_cs INNER JOIN connector ON connector.charge_box_id = mdb_cs.charge_box_id) INNER JOIN connector_status ON connector.connector_pk = connector_status.connector_pk) INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id)";
  // "SELECT * FROM connector INNER JOIN connector_status ON connector.connector_pk = connector_status.connector_pk INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getCS = (req, res) => {
  const csId = req.params.id;
  const q =
    "SELECT * FROM mdb_cs INNER JOIN charge_box ON mdb_cs.charge_box_id = charge_box.charge_box_id WHERE id = ?";

  db.query(q, [csId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addChargeBoxID = async (inputData) => {
  try {
    // console.log("test");
    const q =
      "INSERT INTO charge_box(`charge_box_id`,`ocpp_protocol`,`registration_status`,`insert_connector_status_after_transaction_msg`) VALUES (?)";
    const values = [
      inputData.charge_box_id,
      inputData.ocpp_protocol,
      inputData.registration_status,
      inputData.insert_connector_status_after_transaction_msg,
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

export const selectConnector = async (inputData) => {
  // console.log("inputData", inputData);
  let dataConnector = [];
  const q = `SELECT * FROM connector INNER JOIN connector_status ON connector.connector_pk = connector_status.connector_pk INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id WHERE charge_box_id = "${inputData}" ORDER BY connector_status.connector_status_id DESC LIMIT 1`;
  // console.log(q);
  const h = await new Promise((resolve) => {
    db.query(q, (err, data) => {
      if (err) {
        console.log("error");
        return;
      }
      // console.log("data", data);
      resolve(data);
    });
  });
  return h;
};

export const addConnectorStatus = async (req, res) => {
  try {
    const q =
      "INSERT INTO connector_status (`connector_pk`,`status_timestamp`,`status`,`error_code`,`error_info`,`vendor_id`,`vendor_error_code`) VALUES (?)";

    const values = [
      req.body.connector_pk,
      new Date(),
      req.body.status,
      req.body.error_code,
      req.body.error_info,
      req.body.vendor_id,
      req.body.vendor_error_code,
    ];
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
export const addCS = async (req, res) => {
  try {
    const q =
      "INSERT INTO mdb_cs(`NAME`,`charge_box_id`,`ENDPOINT_ADDRESS`,`CITY`,`LOCATION`,`LONGITUDE`,`LATITUDE`,`connector`) VALUES (?)";
    const inputData = {
      charge_box_id: req.body.charge_box_id,
      ocpp_protocol: req.body.ocpp_protocol,
      registration_status: req.body.registration_status,
      insert_connector_status_after_transaction_msg:
        req.body.insert_connector_status_after_transaction_msg,
    };
    const test = await selectConnector(inputData.charge_box_id);
    // console.log(test[10]);
    // console.log("connector", test.length);
    let values = [
      req.body.NAME,
      req.body.charge_box_id,
      req.body.ENDPOINT_ADDRESS,
      req.body.CITY,
      req.body.LOCATION,
      req.body.LONGITUDE,
      req.body.LATITUDE,
      JSON.stringify(test),
    ];

    await addChargeBoxID(inputData);
    // values = await [...values, test];
    // console.log("values", values);
    await db.query(q, [values], (err, data) => {
      if (err) return res.send(err);

      return res.json(data);
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
    });
  }
};

export const deleteCS = (req, res) => {
  const csId = req.params.id;
  const q = " DELETE FROM mdb_cs WHERE id = ? ";

  db.query(q, [csId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const UpdateChargeBoxID = async (updateData) => {
  try {
    const chargeboxPKId = req.params.charge_box_pk;
    const q =
      "UPDATE charge_box SET `charge_box_id` = ?,`ocpp_protocol` = ?,`registration_status` = ?,`insert_connector_status_after_transaction_msg = ?` WHERE ID = ?";

    const values = [
      updateData.charge_box_id,
      updateData.ocpp_protocol,
      updateData.registration_status,
      updateData.insert_connector_status_after_transaction_msg,
    ];
    await db.query(q, [...values, chargeboxPKId], (err, data) => {
      if (err) {
        console.log("error");
        return;
      }
      // console.log("data", data);
      return;
    });
  } catch (error) {
    console.log("error");
    return;
  }
};

// export const updateCS = async (req, res) => {
//   try {
//     const csId = req.params.id;
//     const q =
//       "UPDATE mdb_cs SET `NAME`= ?,`charge_box_id` = ?,`ENDPOINT_ADDRESS`= ?,`CITY`= ?,`LOCATION`= ?,`LONGITUDE`= ?,`LATITUDE`= ?) WHERE id = ?";

//     const values = [
//       req.body.NAME,
//       req.body.charge_box_id,
//       req.body.ENDPOINT_ADDRESS,
//       req.body.CITY,
//       req.body.LOCATION,
//       req.body.LONGITUDE,
//       req.body.LATITUDE,
//     ];
//     const updateData = {
//       charge_box_id: req.body.charge_box_id,
//       ocpp_protocol: req.body.ocpp_protocol,
//       registration_status: req.body.registration_status,
//       insert_connector_status_after_transaction_msg:
//         req.body.insert_connector_status_after_transaction_msg,
//     };
//     await UpdateChargeBoxID(updateData);
//     db.query(q, [...values, csId], (err, data) => {
//       if (err) return res.send(err);

//       return res.json(data);
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "error",
//     });
//   }
// };

export const updateCS = (req, res) => {
  const csId = req.params.id;
  const q =
    "UPDATE mdb_cs SET `NAME`= ?, `charge_box_id`= ?,`ENDPOINT_ADDRESS`= ?, `CITY`= ?, `LOCATION`= ?, `LONGITUDE` = ?, `LATITUDE`= ? WHERE ID = ?";

  const values = [
    req.body.NAME,
    req.body.charge_box_id,
    req.body.ENDPOINT_ADDRESS,
    req.body.CITY,
    req.body.LOCATION,
    req.body.LONGITUDE,
    req.body.LATITUDE,
  ];

  db.query(q, [...values, csId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

// # "ocpp_protocol" : "ocpp1.6J",
// # "registration_status" : "Accepted",
// # "insert_connector_status_after_transaction_msg" : 1
