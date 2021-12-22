const Pool = require('pg').Pool;

const pool = new Pool({
    user: '09506776_warehouse_web',
    password: '9n^ar*Ghm794K3tS',
    host: 'sql.abcfirany.home.pl',
    port: 5432,
    database: '09506776_warehouse_web'
});

module.exports = pool;
