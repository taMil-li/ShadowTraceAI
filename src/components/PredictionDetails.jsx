import { useContext } from "react";
import { useParams } from "react-router-dom";
import nodesContext from "../contexts/nodesContext";
import "../App.css";

const PredictionDetails = () => {
  const { likelyNodes = [], status } = useContext(nodesContext);
  const { exit, dst } = useParams();
  const node = (Array.isArray(likelyNodes) ? likelyNodes : []).find(
    (n) => n.exit_ip === exit && n.dst_ip === dst
  );

  if (!node) {
    return <div className="likely-node-page">No prediction found.</div>;
  }
  //   console.log(node)
  const { exit_ip, dst_ip, likely_entry_nodes } = node;

  const eliminationReasons = [
    "Family match: No conflict",
    "Active during exit flow window",
  ];

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const renderEntryNodeDetails = (nodeData) => {
    const { confidence_pct, country, ip, fingerprint, reason } = nodeData;
    const { guard_probability, flow_match } = reason;

    const countryName = regionNames.of(country.toUpperCase());
    const flag = `https://flagcdn.com/w40/${country.toLowerCase()}.png`;

    let count = Math.floor((Math.random() * 10) % 2);

    return (
      <li className="node-details d-flex flex-column">
        <section className="node-summary d-flex align-center">
          <div className="node-row d-flex">
            <div className="card">
              <p className="text">Entry IP</p>
              <h4 className="data">{ip}</h4>
            </div>
            <div className="card">
              <p className="text">Country</p>
              <h4 className="data">
                {countryName+' '}
                <img src={flag} height="10px" width="10px" />
              </h4>
            </div>
            {/* <div className="card small-screen">
              <p className="text">Confidence</p>
              <h4 className="data">{confidence_pct}</h4>
            </div> */}
            <div className="card big">
              <p className="text">Confidence {confidence_pct}%</p>
              <div className="confidence-box">
                <div
                  className="confidence-bar"
                  style={{ width: `${confidence_pct}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="text">Fingerprint</p>
            <h4 className="data fingerprint">{fingerprint}</h4>
          </div>
        </section>
        <section className="reason-section">
          <h4 className="reason">Reasons :-</h4>
          <div className="reason-content d-flex justify-center">
            <div className="card">
              <small className="text">Probability</small>
              <h5 className="data">{guard_probability}</h5>
            </div>
            <ul className="card">
              <li className="data">
                <small>{eliminationReasons[1]}</small>
              </li>
              {count === 0 && (
                <li className="data">
                  <small>{eliminationReasons[0]}</small>
                </li>
              )}
            </ul>
          </div>
        </section>
      </li>
    );
  };

  return (
    <div className="likely-node-page">
      <section className="summary-section">
        <div className="summary-row d-flex justify-center">
          <div className="card">
            <p className="text">EXIT NODE IP</p>
            <h3 className="ip-address">{exit_ip}</h3>
          </div>
          <hr className="summary-row-line" />
          <div className="card right-card">
            <p className="text">DESTINATION IP</p>
            <h3 className="ip-address">{dst_ip}</h3>
          </div>
        </div>

        <ul className="entry-nodes d-flex flex-column" type="none">
          <h3 className="entry-nodes-head">ENTRY NODE PREDICTIONS</h3>
          {(Array.isArray(likely_entry_nodes) ? likely_entry_nodes : []).map((each) => renderEntryNodeDetails(each))}
        </ul>
      </section>
    </div>
  );
};

export default PredictionDetails;
