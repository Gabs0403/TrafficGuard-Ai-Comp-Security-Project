import React, {useState} from "react";

const RouterInformation = ({ onFormSubmit }) => {

  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [router, setRouter] = useState("mango");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/send_router_information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 👈 Needed for Flask to parse JSON
        },
        body: JSON.stringify({
          username: username,
          password: password,
          ip_address: ipAddress,
          router: router,
        }),
      });
  
      const data = await response.json();
      if (data.message === "success") {
        onFormSubmit();
      }

      if (response.status === 401) {
        alert("Invalid username or password.");
        return;
      }
      
    } catch (error) {
      console.error("Error sending router information:", error);
    }
  };

    const handleIpChange = (e) => {

      const value = e.target.value;
      const maskedValue = value.replace(/[^0-9.]/g, "");
      
      const parts = maskedValue.split(".");
      if (parts.length <= 4) {
        setIpAddress(parts.join(".").substring(0, 15)); // Limit length to 15 (xxx.xxx.xxx.xxx)
      }
    };

    const handleUsernameChange = (e) => {
      const value = e.target.value;
      setUsername(value);
    }

    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setPassword(value);
    }

    const handleRouterChange = (e) => {
      const value = e.target.value;
      setRouter(value);
    }

    return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="form-container p-4 bg-white rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input type="text" id="username" name="username" className="form-control" required 
                    onChange={handleUsernameChange} value = {username}/>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input type="password" id="password" name="password" className="form-control" required 
                    onChange={handlePasswordChange} value={password}/>
          </div>

          <div className="mb-3">
            <label htmlFor="ip_address" className="form-label">
              IP Address:
            </label>
            <input type="text" id="ip_address" name="ip_address" className="form-control" required 
              onChange = {handleIpChange}  value = {ipAddress} placeholder="000.000.000.000"/>
          </div>

          <div className="mb-3">
            <label htmlFor="router" className="form-label">
              Choose a router:
            </label>
            <select id="router" name="router" className="form-select" onChange={handleRouterChange}>
              <option value="mango">Mango Router</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
    );
}

export default RouterInformation;
