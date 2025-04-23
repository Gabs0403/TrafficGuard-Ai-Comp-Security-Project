import React, { useEffect, useState } from 'react';

function RouterDisplay()  {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/router-info')
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success") {
             
          setInfo(data);
        }
      });
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">📡 Router Information</h5>
        {info ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Router Model:</strong> {info.router_name}</li>
            <li className="list-group-item"><strong>Router IP:</strong> {info.router_ip}</li>
          </ul>
        ) : (
          <p>Loading router info...</p>
        )}
      </div>
    </div>
  );
};

export default RouterDisplay;
