const express = require("express");
const mysql = require("mysql");

app.use(express.static("public"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "arkademy",
});

connection.connect((err) => {
  if (err) {
    console.log("database tidak terkoneksi");
    return;
  }
  console.log("success");
});

const app = express();

app.get("/", (req, res) => {
  connection.query("SELECT * FROM produk", (err, results) => {
    console.log(results);
    res.render("produk.ejs");
  });
});

app.listen(3000);
