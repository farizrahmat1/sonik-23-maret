import React, { useState, useEffect } from "react";
import axios from "axios";

const ListConnectorStatus = (props) => {
  const [infoData, setInfoData] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    if (props.chargeBoxID) {
      const fetchData = async () => {
        try {
          // console.log("chagebox", props.chargeBoxID);
          const data = await axios.get(
            `http://localhost:8800/connectorStatus/${props.chargeBoxID}`
          );
          // console.log("data", data);
          setData(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = data.reduce((acc, current) => {
        const existing = acc.find(
          (item) => item.connector_name === current.connector_name
        );
        if (!existing) {
          acc.push(current);
        } else if (current.status_timestamp > existing.status_timestamp) {
          existing.status_timestamp = current.status_timestamp;
          existing.connector_status_id = current.connector_status_id;
          existing.status = current.status;
        }
        return acc;
      }, []);
      // console.log("filteredData", filteredData);
      setInfoData(filteredData);
    }
  }, [data]);
  return (
    <>
      {infoData &&
        infoData.map((item) => {
          return <p className={`connectorStatus ${item.status === "Available" ? "availableColour" : "unavailableColour"}`}>{item.status}</p>;
        })}
    </>
  );
};

export default ListConnectorStatus;
