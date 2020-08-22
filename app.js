const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.post("/add", (req, res) => {
  let name = req.body.nama;
  let keterangan = req.body.keterangan;
  let harga = req.body.harga;
  let jumlah = req.body.jumlah;
  connection.query(
    "INSERT INTO produk(nama_produk,keterangan,harga,jumlah) VALUES(?, ?, ?, ?)",
    [name, keterangan, harga, jumlah],
    (err, results) => {
      if (!err) {
        res.redirect("/");
      }
    }
  );
});

app.get("/edit/:id", (req, res) => {
  const ID = req.params.id;
  connection.query(
    "SELECT * FROM produk WHERE id = ?",
    [ID],
    (err, results) => {
      res.render("edit.ejs", { item: results[0] });
    }
  );
});

app.post("/update/:id", (req, res) => {
  let ID = req.params.id;
  let nama = req.body.nama;
  let keterangan = req.body.keterangan;
  let harga = req.body.harga;
  let jumlah = req.body.jumlah;

  connection.query(
    "UPDATE produk SET nama_produk = ?, keterangan = ?, harga = ?, jumlah = ? WHERE id = ?",
    [nama, keterangan, harga, jumlah, ID],
    (err, results) => {
      if (!err) {
        res.redirect("/");
      }
    }
  );
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
