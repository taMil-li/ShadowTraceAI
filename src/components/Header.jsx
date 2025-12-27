import { MdOutlineSecurity } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

const Header = () => {
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
  
  return (
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
};

export default Header;
