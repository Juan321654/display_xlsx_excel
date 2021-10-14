const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const localFiles = fs.readdirSync(path.join(__dirname, "../uploads"), (err, files) => {
  // files.forEach(file => {
  //   console.log(file);
  // });
  return files;
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // this is the folder of where to upload it
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    // this gives the uploaded file an unique name
    // if(file.originalname.includes('xlsx' || 'jpeg')) return cb(null, file.originalname)
    // else return
    cb(null, file.originalname);
    // cb(null, Date.now() + "-" + file.originalname);
  },
});

// uploadStorage is the middleware which accepts a storage engine
const uploadStorage = multer({ storage: storage });

app.get("/show-files", async (req, res) => {
  res.send(localFiles);
});

// Single file
app.post("/upload/single", uploadStorage.single("myFile"), (req, res) => {
  // "myFile" is the key we have to put in postman in the body, it has to match exactly
  // if we put uploadStorage.single("image") then in postman the key would be "image"
  // console.log(req.file);
  return res.send("Single file");
});
//Multiple files
app.post("/upload/multiple", uploadStorage.array("files", 10), (req, res) => {
  // 10 is up to how many files it will accept at the time
  console.log(req.files);
  return res.send("Multiple files");
});

app.listen(5000 || process.env.PORT, () => {
  console.log("Server on...");
});
