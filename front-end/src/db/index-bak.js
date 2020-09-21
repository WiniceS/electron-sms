const mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'sms'
})

// 统一连接数据库的方法
let allServies = {
  pool: pool,
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
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
  },
  trans: async function (fn) {
    let conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
      await fn(conn)
      await conn.commit()
    } catch (err) {
      await conn.rollback()
    } finally {
      conn.release()
    }
  }

}

export default allServies
