const mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'sms'
})
// function(sql, callback) {
//   pool.getConnection(function(connErr, conn) {
//     if (connErr) {
//       callback(connErr, null, null)
//     } else {
//       conn.query(sql, function(queryErr, rows, fields) {
//         conn.release()
//         callback(queryErr, rows, fields)
//       })
//     }
//   })
// }

// 统一连接数据库的方法
let allServies = {
  query: function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
}

export default allServies
