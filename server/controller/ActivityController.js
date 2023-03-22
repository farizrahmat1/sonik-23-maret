import { db } from "../connect.js";

export const getAllActivity = (req, res) => {
    const q = "SELECT * FROM connector_status INNER JOIN connector ON connector_status.connector_pk = connector.connector_pk INNER JOIN mdb_cs ON connector.charge_box_id = mdb_cs.charge_box_id INNER JOIN mdb_connector ON connector.connector_id = mdb_connector.connector_id";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  };
  

export const getActivity = (req, res) => {
  const activityId = req.params.id;
  const q = "SELECT * FROM connector_status WHERE id = ?";

  db.query(q, [activityId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

// export const addWarning = (req, res) => {
//   const q =
//     "INSERT INTO mdb_cs(`NAME`,`CHARGE_BOX_PK`,`CITY`,`OVERALL_STATUS`) VALUES (?)";
//   const values = [
//     req.body.NAME,
//     req.body.CHARGE_BOX_PK,
//     req.body.CITY,
//     req.body.OVERALL_STATUS,
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// };

// export const deleteWarning = (req, res) => {
//   const csId = req.params.id;
//   const q = " DELETE FROM mdb_cs WHERE id = ? ";

//   db.query(q, [csId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// };

// export const updateWarning = (req, res) => {
//   const csId = req.params.id;
//   const q =
//     "UPDATE mdb_cs SET `NAME`= ?, `CHARGE_BOX_PK`= ?, `CITY`= ?, `OVERALL_STATUS`= ? WHERE id = ?";

//   const values = [
//     req.body.NAME,
//     req.body.CHARGE_BOX_PK,
//     req.body.CITY,
//     req.body.OVERALL_STATUS,
//   ];

//   db.query(q, [...values, csId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// };
