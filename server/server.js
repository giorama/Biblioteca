// server/index.js

const express = require("express");
const app = express();

var mysql = require('mysql');
app.use(express.json());

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Neon2023..",
  database:"biblioteca"
});

app.post("/auth", (req, res) => {
  let fields = Object.values(req.body);
  con.query("SELECT * FROM Utenti WHERE nome='"+fields[0]+"' AND cognome='"+fields[1]+"'", function (err, result, fields) {
    if (err) res.send(JSON.stringify({message: err}))
    ;    
    // Handle return
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({users: result}))
  })
})

// Get all user in db
app.get("/users", (req, res) => {
  con.query("SELECT * FROM Utenti", function (err, result, fields) {
    if (err) res.send(JSON.stringify({message: err}));    
    // Handle return
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({users: result}))
  })
});

// Get all user in db
app.get("/books", (req, res) => {
  con.query("SELECT * FROM Libri", function (err, result, fields) {
    if (err) res.send(JSON.stringify({message: err}));    
    // Handle return
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({books: result}))
  })
});

// Get all library
app.get("/library/:iduser", (req, res) => {
  let userbook = 'SELECT idLibro FROM Library INNER JOIN Libri ON Libri.idLibro=Library.libro WHERE Library.utente='+req.params.iduser;
  
  con.query(userbook, function (err, result, fields) {
    if (!result.length){
      // No book insert for user, return all book insert
      let allbook = 'SELECT * FROM Libri';
      con.query(allbook, function (err_all, allbook, fields) {
        if (err_all) res.send(JSON.stringify({message: err_all}));    
        res.header('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify({books: allbook}))
      })
    } else {
      let allbook = 'SELECT * FROM Library RIGHT JOIN Libri ON Libri.idLibro=Library.libro WHERE idLibro NOT IN ('+userbook+')';
      let sqlstatement = allbook+' UNION '+'SELECT * FROM Library INNER JOIN Libri ON Libri.idLibro=Library.libro WHERE Library.utente='+req.params.iduser;

      console.log('Executing sqlstatement:'+sqlstatement);
      con.query( sqlstatement, function (err, result, fields) {
          if (!result.length){
            let sqlbook = 'SELECT * FROM Library';
            con.query( sqlbook, function (err1, dbbooks, fields) {
              res.header('Access-Control-Allow-Origin', '*');
              res.send(JSON.stringify({books: dbbooks}));
              if (err1) throw err1;
    
            })
          } else {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(JSON.stringify({books: result}));
          }
          if (err) throw err;
        }
      )

    }
  })
});

// Insert data
app.post("/insert/:table", (req,res) => {
  // Insert in req.body.table
  let fields = '('+Object.keys(req.body)+')';
  let ins = 'INSERT INTO '+req.params.table+' '+fields+' VALUES ?';
  con.query(ins, [[Object.values(req.body)]], function (err, result) {
    if (err) throw err;
    console.log(ins);
    console.log(Object.values(req.body));

    console.log("Record inserted, ID: " + result.affectedRows);
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({message: "Record inserted, ID: " + result.affectedRows}));
  });
})


// Insert data
app.post("/generic/Library", (req,res) => {
  // Insert in req.body.table
  console.log('field to be update');
  let paramset = '';
  let utente,libro;
  for (const [key, value] of Object.entries(req.body)) {
    if (key==='utente'){
      utente = value;
      continue;
    } else if (key==='libro') {
      libro = value;
      continue;
    };
    if (paramset) {
      paramset = paramset+', ';
    }
    if (typeof value === 'string' || value instanceof String){
      // Handle string value
      paramset = paramset + `${key} = '${value}'`;
    } else {
      paramset = paramset + `${key} = ${value}`;
    }

  }
  if (!paramset) {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({message: "0 Row affected, empty fields"}));
  }
  let updatesql = 'UPDATE Library SET '+paramset+' WHERE Library.utente='+utente+' AND Library.libro='+libro;
  console.log(updatesql);
  con.query(updatesql, function (err, result) {
    if (err) res.send(JSON.stringify({error: err}));
    console.log();
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({message: result.changedRows + " record(s) updated"}));
    
  });
})

app.get("/api", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({message: "Hello from server!"}));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});