const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "prabesh",
  database: "musicapp",
  multipleStatements: true, //enable multiple queriesin sql but may be vulnerable to injection attacks.
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const SQLCOMMAND = `CREATE TABLE IF NOT EXISTS userinfos(userid varchar(100) primary key,name varchar(30) not null,username varchar(15) not null unique,password varchar(255) not null,DOB date not null,bio varchar(255),country varchar(20) not null);
CREATE TABLE IF NOT EXISTS refreshtoken (tokenid varchar(50) primary key,refreshToken varchar(255));
CREATE TABLE songcollection (s_id varchar(150) unique primary key,songName varchar(255) not null,songPath varchar(255) not null,songDuration integer not null,Date date);
CREATE TABLE artists (artistid varchar(150) primary key,artistname varchar(100) unique not null,bio varchar(255),artistPhoto varchar(255),year integer not null,status boolean not null);
CREATE TABLE genre (genreid varchar(150) primary key,genreName varchar(100) unique not null,genreDescription varchar(255));`;

function createTable() {
  return new Promise((resolve, reject) => {
    connection.query(SQLCOMMAND, (err, result) => {
      if (!err) {
        return resolve({ status: "success" });
      }
      console.log(err);
      return reject(err);
    });
  });
}

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB.");
  try {
    createTable();
  } catch (error) {
    console.log(error);
  }
});

module.exports = connection;

// CREATE TABLE artists (artistid varchar(150) primary key,artistname varchar(100) unique not null,bio varchar(255),artistPhoto varchar(255),year integer not null,status boolean not null);
