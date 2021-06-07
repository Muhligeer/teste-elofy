const fs = require("fs")
const Pool = require("pg").Pool
const fastcsv = require("fast-csv")

let stream = fs.createReadStream("./resources/arquivo_lanches.csv")
let csvData = []
const headers = [
  'Identificador', 
  'nome_usuario', 
  'altura', 
  'lactose', 
  'peso', 
  'atleta', 
  undefined
]
// let csvStream = fastcsv.format({ headers: headers, writeHeaders: false })

let csvStream = fastcsv
  .parse({ delimiter: ';'})
  
  .on("data", function(data) {
    csvData.push(data)
  })
  .on("end", function() {
    csvData.shift()
    
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "lanches",
      password: "1234",
      port: 5432
    })

    const query = `INSERT INTO "users" ("Identificador", nome_usuario, altura, lactose, peso, atleta) VALUES ($1, $2, $3, $4, $5, $6)`
    pool.connect((err, client, done) => {
      if (err) throw err

      try {
        csvData.forEach(row => {
          row.pop()
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          })
        })
      } finally {
        done()
      }
    })
  })
  
  stream.pipe(csvStream)