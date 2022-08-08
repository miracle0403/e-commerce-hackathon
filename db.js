var sql = require ('mysql');
var server = require ('./app.js');
const PoolManager = require('mysql-connection-pool-manager');

const options = {
  idleCheckInterval: 1000,
  maxConnextionTimeout: 30000,
  idlePoolTimeout: 3000,
  errorLimit: 5,
  preInitDelay: 50,
  sessionTimeout: 60000,
  onConnectionAcquire: () => { console.log("Acquire"); },
  onConnectionConnect: () => { console.log("Connect"); },
  onConnectionEnqueue: () => { console.log("Enqueue"); },
  onConnectionRelease: () => { console.log("Release"); },
  mySQLSettings: {
	host: "localhost",
  user: "root",
  password: '',
  database: "ecom",
    port: '3306',
    socketPath: '/var/run/mysqld/mysqld.sock',
    charset: 'utf8',
    multipleStatements: true,
    connectTimeout: 15000,
    acquireTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 5000,
    debug: false
  }
}

const mySQL = PoolManager(options);



var pool  = mySQL.raw.createConnection({
	host: "localhost",
  user: "root",
  password: '',
  database: "ecom"
});
pool.connect();

pool.query( 'SELECT 1 + 4 AS solution', function ( err, results, fields ){
	if ( err ) throw err;
	console.log( 'solution is ' + results[0].solution);
});

module.exports = pool
