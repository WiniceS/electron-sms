const rds = require('ali-rds');

const db = rds({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'sms'
})

export default db
