import { Sequelize } from "sequelize-typescript";


const connection = new Sequelize({
    dialect:"mysql",
    host: process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    logging:false
})

export default connection;