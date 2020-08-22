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
  let i = 1;
  connection.query("SELECT * FROM produk", (err, results) => {
    res.render("produk.ejs", { items: results, number: i });
  });
});

app.get("/add", (req, res) => {
  res.render("tambah.ejs");
});

app.get("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM produk WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (!err) {
        res.redirect("/");
      }
    }
  );
});

app.listen(3000);
