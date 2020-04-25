const mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'sms'
})
module.exports = function(sql, callback) {
  pool.getConnection(function(connErr, conn) {
    if (connErr) {
      callback(connErr, null, null)
    } else {
      conn.query(sql, function(queryErr, rows, fields) {
        conn.release()
        callback(queryErr, rows, fields)
      })
    }
  })
}
