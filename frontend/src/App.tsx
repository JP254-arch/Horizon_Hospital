import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    api.get("/test")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>{message || "Connected"}</h1>
    </div>
  );
}

export default App;
