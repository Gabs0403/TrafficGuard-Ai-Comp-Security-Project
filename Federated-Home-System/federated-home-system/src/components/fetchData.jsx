import React, { useState } from "react";

function FetchDataWithDB() {
  const [apiResponse, setApiResponse] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token"); // 🔐 Retrieve JWT token

    try {
      // Fetch data from Flask API
      const response = await fetch("http://127.0.0.1:5000/api/data", {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      });

      const data = await response.json();
      console.log("Received from Flask:", data);

      // Update state
      setApiResponse(data);

      // Send data to Flask backend to save in the database
      const dbResponse = await fetch("http://127.0.0.1:5000/api/save_to_db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(data),
      });

      if (dbResponse.ok) {
        console.log("Data sent to the database!");
      } else {
        console.error("Failed to send data to DB.");
      }
    } catch (error) {
      console.error("Error fetching or saving data:", error);
    }
  };

  return (
    <div>
      <h1>Fetch Data and Store in Database</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        <h2>API Response:</h2>
        <pre>{apiResponse ? JSON.stringify(apiResponse, null, 2) : "No data yet"}</pre>
      </div>
    </div>
  );
}

export default FetchDataWithDB;
