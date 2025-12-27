import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import nodesContext from "./contexts/nodesContext";

import "./App.css";

import Dashboard from "./components/Dashboard.jsx";
import Header from "./components/Header.jsx";
import PredictionDetails from "./components/PredictionDetails.jsx";
// import PcapUpload  from "./components/PCAPUpload.jsx";

const apiStatus = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  PENDING: "PENDING",
  FAILED: "FAILED",
};

function App() {
  const [likelyNodes, setLikelyNodes] = useState([]);
  const [status, setStatus] = useState(apiStatus.INITIAL);

  useEffect(() => {
    const fetchEntryNodes = async () => {
      setStatus(apiStatus.PENDING);
      try {
        const resp = await fetch("https://shadowtraceaibackend-2.onrender.com/get-predictions");
        const res = await resp.json();

        if (resp.ok) {
          console.log(res);
          setStatus(apiStatus.SUCCESS);
          setLikelyNodes(res);
        } else {
          setStatus(apiStatus.FAILED);
          console.log("req denied");
        }
      } catch (err) {
        setStatus(apiStatus.FAILED);
        console.log("failed");
      }
    };
    fetchEntryNodes();
  }, []);

  const renderLoader = () => (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );

  return (
    <nodesContext.Provider value={{ likelyNodes, status }}>
      <div className="dashboard-container">
        {/* <PcapUpload /> */}
        {status === apiStatus.SUCCESS && (
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/:exit/:dst" element={<PredictionDetails />} />
            </Routes>
          </BrowserRouter>
        )}
        {status === apiStatus.PENDING && renderLoader()}
      </div>
    </nodesContext.Provider>
  );
}

export default App;
