import knex from 'knex'

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/db/database.sqlite'
  }
})


connection.schema.hasTable('users').then((exists) => {
  if(!exists){
    return connection.schema.createTable('users', t => {
      t.integer('id').primary()
      t.string('name', 100)
      t.string('email', 100)
      t.integer('age')
      t.json('roles')
      t.date('birth_year')
      t.string('password_hash')
    })
  }
})

export default connection