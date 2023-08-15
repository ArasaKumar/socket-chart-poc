import sql from 'mssql'

const sqlConfig = {
    user: "arasakumar_SQLLogin_1",
    password: "r19huesoxn",
    database: "chart_poc",
    server: 'chart_poc.mssql.somee.com',
    pool: {
        max: 1,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

sql.on('error', err => {
    console.error("❌ db server error", err)
})

export const getNodes = () => {
    return sql.connect(sqlConfig).then(pool => {
        return pool.request()
            .query('select * from Nodes')
    })
}
//workstation id=chart_poc.mssql.somee.com;packet size=4096;user id=arasakumar_SQLLogin_1;
// pwd=r19huesoxn;data source=chart_poc.mssql.somee.com;persist security info=False;initial catalog=chart_poc