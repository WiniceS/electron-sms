const rds = require('ali-rds');

const db = rds({
  host: 'localhost',
  user: 'root',
  password: 'Qaz10plm.29',
  port: '3306',
  database: 'sms'
})

export default db
