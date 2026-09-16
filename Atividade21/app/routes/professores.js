module.exports = function (app) {
    app.get('/informacao/professores', function (req, res) {
        const sql = require('mssql');

        const sqlConfig = {
            user: 'DS2612024', //7 últimos dígitos do seu RA
            password: '16082007Ri#',
            database: 'LP2',
            server: 'APOLO',
            options: {
                encrypt: false,
                trustServerCertificate: true,
            }
        }

        // 
        async function getProfessores() {
            try {
                const pool = await sql.connect(sqlConfig);

                const results = await pool.request().query('SELECT * from PROFESSORES')

                // res.json(results.recordset);

                res.render('informacoes/professores', { profs: results.recordset })

            } catch (err) {
                console.log(err)
            }
        }
        getProfessores();
    });
}