// import { SiTicktick } from "react-icons/si";
import { MdOutlineSecurity } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import nodesContext from "../contexts/nodesContext";

import "../App.css";

import EliminationSummary from "./EliminationSummary";

const apiStatus = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  PENDING: "PENDING",
  FAILED: "FAILED",
};

const Dashboard = () => {
  const { likelyNodes = [], status } = useContext(nodesContext);

  const renderHeader = () => (
    <nav className="header d-flex">
      <h1 className="title d-flex align-center">
        <MdOutlineSecurity />
        SHADOWTRACE
      </h1>
      <button className="download-btn small-screen" onClick={onClickDownload}>
        <IoMdDownload />
      </button>
      <button
        className="download-btn big-screen d-flex"
        onClick={onClickDownload}
      >
        <IoMdDownload /> Predictions
      </button>
    </nav>
  );

  const onClickDownload = () => {
    fetch("../../backend/data/entry_node_predictions.json").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "EntryNodePredictions.json";
        alink.click();
      });
    });
  };

  const renderPredictionSummary = (nodeData) => {
    const { exit_ip, dst_ip } = nodeData;
    return (
      <Link to={`/${exit_ip}/${dst_ip}`} className="no-discolor">
        <li className="row d-flex">
          <div className="card">
            <p className="text">Exit Node IP</p>
            <h4 className="ip-address">{exit_ip}</h4>
          </div>
          <div className="card right-card">
            <p className="text">Destination IP</p>
            <h4 className="ip-address">{dst_ip}</h4>
          </div>
        </li>
      </Link>
    );
  };

  return (
    <>
      <EliminationSummary />
      
      <ul className="predicted-nodes-section d-flex flex-column" type="none">
        {/* <input className="file-input" type="file" /> */}
        {(Array.isArray(likelyNodes) ? likelyNodes : []).map((each) => renderPredictionSummary(each))}
      </ul>
    </>
  );
};

export default Dashboard;
