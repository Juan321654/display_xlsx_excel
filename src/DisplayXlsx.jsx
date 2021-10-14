import React, { useState, useEffect } from "react";
import "./App.css";
import * as XLSX from "xlsx";

const DisplayXlsx = () => {
  const [items, setItems] = useState([]);
  const [sheetNames, setSheetNames] = useState();
  const [readFile, setReadFile] = useState();
  const [sheetIndex, setSheetIndex] = useState({ idx: 0 });

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (readFile) {
        fileReader.readAsArrayBuffer(readFile);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          setSheetNames(wb.SheetNames);
          const wsname = wb.SheetNames[sheetIndex.idx];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });

    promise.then((d) => {
      setItems(d);
    });
  }, [readFile, sheetIndex]);

  let style = {
    activeColor: {
      backgroundColor: "lightgray",
    },
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setReadFile(file);
        }}
      />
      <div>(click on the sheet to display)</div>
      {sheetNames?.map((e, idx) => (
        <div
          style={idx === sheetIndex.idx ? style.activeColor : null}
          className="sheetName"
          onClick={() => setSheetIndex({ idx: idx })}
        >{`Id:${idx} - ${e}`}</div>
      ))}
      <table
        className="table table-sm table-dark table-responsive"
        style={{ maxHeight: "600px" }}
      >
        <thead>
          <tr>
            {items.length > 0
              ? Object.keys(items[0]).map((e, idx) => <th key={idx}>{e}</th>)
              : null}
          </tr>
        </thead>
        <tbody>
          {items.map((d, idx) => {
            let headers = Object.keys(d);
            return (
              <tr>
                {headers.map((e) => (
                  <td>{d[e]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayXlsx;
