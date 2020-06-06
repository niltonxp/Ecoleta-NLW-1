const sqlite3 = require("sqlite3").verbose();

//objeto que irá fazer operações no bd (cria o arq)
const db = new sqlite3.Database("./src/database/database.db");

//executa comandos terminal: node src/database/db.js
db.serialize(() => {
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     image TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `);
  // const query = `
  // INSERT INTO places (
  //   name,
  //   image,
  //   address,
  //   address2,
  //   state,
  //   city,
  //   items
  // ) VALUES (?,?,?,?,?,?,?);
  // `;
  // const values = [
  //   "Colectoria",
  //   "https://images.unsplash.com/photo-1586951655049-547f3e00807a?ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
  //   "Guilherme Gemballa, Jardim América",
  //   "N° 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Resíduos Eletrônicos, Lâmpadas",
  // ];
  // function afterInsertData(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Cadastrado com sucesso");
  //   console.log(this); // referência a resposta do run
  // }
  // db.run(query, values, afterInsertData);
  // db.all(`SELECT * FROM places`, function (err, rows) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Aqui estão seus registros");
  //   console.log(rows);
  // });
  // db.run(`DELETE FROM places WHERE id = ?`, [11], function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Registro deletado com sucesso");
  // });
});

module.exports = db;
