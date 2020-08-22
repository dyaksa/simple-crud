const express = require("express");
const mysql = require("mysql");
const app = express();

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

app.get("/", (req, res) => {
  connection.query("SELECT * FROM produk", (err, results) => {
    res.render("produk.ejs", { items: results });
  });
});

app.listen(3000);
