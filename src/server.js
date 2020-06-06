//npm init -y
//npm install
//npm install nodemon -D -> reiniciar node sempre que um arquivo for alterado

//template engine - nunjucks
const express = require("express");
const server = express();
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"));

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//caminhos da app
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  //query strings da url
  console.log(req.query);

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //corpo do formulario
  console.log("BODY --->>", req.body);

  const query = `
  INSERT INTO places (
    name,
    image,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.name,
    req.body.img,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro!")
    }
    console.log("Cadastrado com sucesso");
    console.log(this); // referência a resposta do run

    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search

  if (search == "") {
    return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log(rows);

    const total = rows.length;

    //mostrar a pg html com os dados do BD
    return res.render("search-results.html", { places: rows, total });
  });
});

//executar na porta 3000
server.listen(3000);
