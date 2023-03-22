import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //check user if exist

  const q = "SELECT * FROM mdb_user WHERE EMAIL = ?";

  db.query(q, [req.body.EMAIL], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //create new user
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.PASSWORD, salt);

    const q =
      "INSERT INTO mdb_user(`NAME`,`EMAIL`,`PASSWORD`) VALUES (?)";
    const values = [
      req.body.NAME,
      req.body.EMAIL,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const registerAdmin = (req, res) => {
  //check user if exist

  const q = "SELECT * FROM mdb_user WHERE EMAIL = ?";

  db.query(q, [req.body.EMAIL], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //create new user
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.PASSWORD, salt);

    const q =
      "INSERT INTO mdb_user(`NAME`,`EMAIL`,`PASSWORD`,`role`) VALUES (?)";
    const values = [
      req.body.NAME,
      req.body.EMAIL,
      hashedPassword,
      req.body.role,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM mdb_user WHERE EMAIL=?";

  db.query(q, [req.body.EMAIL], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("user not found");

    const checkPassword = bcrypt.compareSync(
      req.body.PASSWORD,
      data[0].PASSWORD
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { PASSWORD, ...others } = data[0];

    //   res
    //     .cookie("accessToken", token, {
    //       httpOnly: true,
    //     })
    //     .status(200)
    //     .json(others);
    return res.json({
      token: token,
      role: data[0].role,
    });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out!");
};
