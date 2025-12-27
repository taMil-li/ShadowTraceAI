import { useEffect, useState } from "react";

import "../App.css";

const apiStatus = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  PENDING: "PENDING",
  FAILED: "FAILED",
};

const EliminationSummary = () => {
  const [summary, setSummary] = useState({});
  const [status, setStatus] = useState(apiStatus.INITIAL);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const resp = await fetch("https://shadowtraceaibackend-2.onrender.com/elimination-summary");
        const res = await resp.json();
        if (resp.ok) {
          const elimSummary = {
            final_guards: 3,
            removed_by_bandwidth: 56,
            removed_by_probability: 18,
            removed_by_uptime: 123,
            total_guards: 200,
          };

          setSummary(elimSummary);
          setStatus(apiStatus.SUCCESS);
          console.log(res);
        } else {
          console.log("failed to fetch");
          setStatus(apiStatus.FAILED);
        }
      } catch (err) {
        setStatus(apiStatus.FAILED);
      }
    };
    getSummary();
  }, []);

  const renderLoader = () => (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );

  const renderSummary = () => {
    const {final_guards, total_guards, removed_by_bandwidth, removed_by_probability, removed_by_uptime} = summary

    return (
        <>
            {/* <b className="data">Total Guards: {total_guards}</b>
            <b className="data">Final Guards: {final_guards}</b>
            <b className="data">Removed by Uptime: {removed_by_uptime}</b>
            <b className="data">Removed by Probability: {removed_by_probability}</b>
            <b className="data">Removed by Bandwidth: {removed_by_bandwidth}</b> */}
            <table className="table">
                <tr>
                    <th>Total Guards:</th>
                    <td>{total_guards}</td>
                </tr>
                <tr>
                    <th>Final Guards:</th>
                    <td>{final_guards}</td>
                </tr>
                <tr>
                    <th>Removed by Uptime:</th>
                    <td>{removed_by_uptime}</td>
                </tr>
                <tr>
                    <th>Removed by Probability:</th>
                    <td>{removed_by_probability}</td>
                </tr>
                <tr>
                    <th>Removed by Bandwidth: </th>
                    <td>{removed_by_bandwidth}</td>
                </tr>
            </table>
        </>
    )
  };

  return (
    <div className="elim-summary">
      {status === apiStatus.PENDING && renderLoader()}
      {status === apiStatus.SUCCESS && renderSummary()}
    </div>
  );
};

export default EliminationSummary;
