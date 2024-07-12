module.exports =
{ 
    HOST: "localhost", 
    USER: "postgres", 
    PASSWORD: "wartam7317",
    DB: "vifoca", 
    dialect: "postgres", 
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    };
    