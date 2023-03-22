import * as React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import chargingStation from "../chargingstation/chargingStation.json";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const position = [-6.358623, 106.666833];

const Home = () => {
  const [cs, setCS] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [totalKWH, setTotalKWH] = React.useState([0]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataCS = async () => {
      try {
        const resCS = await axios.get("http://localhost:8800/cs");
        const resTransaction = await axios.get(
          "http://localhost:8800/transaction"
        );
        setCS(resCS.data);
        setTransaction(resTransaction.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataCS();
  }, []);

  const activeCS = !cs
    ? 0
    : cs.filter((item) => item.IS_ACTIVE === "Active").length;
  // const transactiontoday = !cs ? 0 : cs.filter((item) => item.IS_ACTIVE === "Active").length
  useEffect(() => {
    if (transaction.length) {
      // console.log("report", transaction);
      let total_energy_consumption = 0;
      const countedArray = transaction.map((item) => {
        // console.log(Number(item.stop_value));
        total_energy_consumption +=
          Number(item.stop_value) - Number(item.start_value);
      });
      setTotalKWH(total_energy_consumption);
      // console.log("counted array >> ", total_energy_consumption);
    }
  }, [transaction]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="csData">Charging Station Data</div>
        <MapContainer
          className="map"
          center={position}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: "60vh", width: "100wh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {chargingStation.map((cs, idx) => (
            <Marker position={[cs.lat, cs.lng]} key={idx}>
              <Popup>
                <b>
                  {cs.chargingstation}, <br /> {cs.location}
                </b>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="widgets">
          <Widget type="activeCs" activecs={activeCS} />
          <Widget type="charge" chargestoday={transaction.length} />
          <Widget type="transaction" transactiontoday={transaction.length} />
          <Widget type="kwh" kwhdata={totalKWH} />
        </div>
      </div>
    </div>
  );
};

export default Home;
