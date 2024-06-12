import "./Content.css";
import "./SerchForm.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Content() {
  const [trips, setTrips] = useState([]);
  const [serchText, setSerchText] = useState([]);

  const getTripsData = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${serchText}`
    );
    setTrips(result.data.data);
  };

  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const handleSerch = (event) => {
    setSerchText(event.target.value);
  };

  const handleClickTag = (data) => {
    setSerchText(serchText + " " + data);
  };

  /*copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };*/

  useEffect(() => getTripsData, [handleSerch]);
  return (
    <div>
      <div className="serchComponent">
        <label htmlFor="serchText" className="serchLabel">
          ค้นหาที่เที่ยว
        </label>
        <input
          className="serchInput"
          id="serchText"
          name="serchText"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          onChange={handleSerch}
          value={serchText}
        />
        <div className="lineUnderInput"> </div>
      </div>
      {trips.map((item) => {
        return (
          <div className="content-container" key={item.eid}>
            <div className="mainImgContainer">
              <img src={item.photos[0]} className="mainImg" />
            </div>
            <div className="mainContent">
              <a href={item.url} target="_blank" className="headTitle">
                {item.title}
              </a>
              <h2 className="contentText">
                {limitText(item.description, 100)}
              </h2>
              <a href={item.url} target="_blank" className="readMore">
                อ่านต่อ
              </a>
              <h3>
                หมวด
                {item.tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="tripsTag"
                      onClick={() => {
                        handleClickTag(tag);
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </h3>
              <div className="imgContainer">
                <img className="smallImg" src={item.photos[1]} />
                <img className="smallImg" src={item.photos[2]} />
                <img className="smallImg" src={item.photos[3]} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Content;
