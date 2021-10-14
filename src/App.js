import "./App.css";
import { useState } from "react";
import DisplayXlsx from "./DisplayXlsx";

function App() {
  const [fileData, setFileData] = useState();

  const fileChangeHandler = (e) => setFileData(e.target.files[0]);

  const obSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    
    data.append("myFile", fileData);

    fetch("http://localhost:5000/upload/single", {
      method: "POST",
      body: data,
    })
      .then((res) => console.log("File sent successfully"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <h1>File uploaded</h1>
      <form onSubmit={obSubmitHandler}>
        <input type="file" onChange={fileChangeHandler} />
        <br />
        <br />
        <button>Submit file to backend</button>
      </form>
      <hr />
      <DisplayXlsx />
    </div>
  );
}

export default App;
