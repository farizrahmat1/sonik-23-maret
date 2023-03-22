import express from "express";
import cors from "cors";
import csRoutes from "./routes/chargingstation.js";
import customerRoutes from "./routes/customerdata.js";
import transactionRoutes from "./routes/transactiondata.js";
import transactionCustomerRoutes from "./routes/transactionCustomerData.js";
import warningRoutes from "./routes/warningdata.js";
import activityRoutes from "./routes/activity.js";
import reportRoutes from "./routes/ReportData.js";
import connectorStatusRoutes from "./routes/connectorStatus.js"
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json("hello");
// });

app.use("/cs", csRoutes);
app.use("/customer", customerRoutes);
app.use("/transaction", transactionRoutes);
app.use("/transactionCustomer", transactionCustomerRoutes);
app.use("/warning", warningRoutes);
app.use("/auth", authRoutes);
app.use("/activity", activityRoutes);
app.use("/reportData", reportRoutes);
app.use("/connectorStatus", connectorStatusRoutes);

app.listen(8800, () => {
  console.log("Connected to backend.");
});
