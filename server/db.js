var mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Neon2023..",
  database:"biblioteca"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  // Create libri
  let create_libri = "CREATE TABLE IF NOT EXISTS Libri (idLibro INT NOT NULL AUTO_INCREMENT PRIMARY KEY , titolo VARCHAR(64) UNIQUE, autore VARCHAR(64), isbn VARCHAR(16), trama TEXT(255))";
  con.query(create_libri, function (err, result) {
    if (err) throw err;
    console.log("Table Libri created");
  });
  
  // Create users
  let create_users = "CREATE TABLE IF NOT EXISTS Utenti (idUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY , nome VARCHAR (64), cognome VARCHAR (64), mail VARCHAR(64));";
  con.query(create_users, function (err, result) {
  if (err) throw err;
    console.log("Table Utenti created");
  });

  // Create users
  let create_read = "CREATE TABLE IF NOT EXISTS Library (utente INT, libro INT, numlett SMALLINT DEFAULT 0, dataadd DATE, datadel DATE, FOREIGN KEY (utente) REFERENCES Utenti(idUser), FOREIGN KEY (libro) REFERENCES Libri(idLibro), PRIMARY KEY(utente, libro))";
  con.query(create_read, function (err, result) {
  if (err) throw err;
    console.log(create_read);
  });

  // Insert some users
  let ins_user = "INSERT INTO Utenti (nome, cognome, mail) VALUES ?";
  let users = [
    ['Mario', 'Rossi', 'mariorossi@gmail.com'],
    ['Luca', 'Neri', 'lucaneri@mail.me'],
    ['Giacomo', 'Verdi', 'giacomoverdi@libero.com'],
  ];
  con.query(ins_user, [users], function (err, result) {
    if (err) throw err;
    console.log("3 record inserted, ID: " + result.insertId);
  });

  // Insert some books
	let ins_book = "INSERT INTO Libri (titolo, autore, isbn, trama) VALUES ?";
  let books = [
    ['Mastering Bitcoin', 'Andreas M. Antonopoulos', '978-1491954386', 'Un libro che tratta la storia di bitcoin'],
    ['c#7', 'A. Pelleriti', '978-886895', 'Una guida per iniziare C#'],
  ];
  con.query(ins_book, [books], function (err, result) {
    if (err) throw err;
    console.log("2 record inserted, ID: " + result.insertId);
  });
});