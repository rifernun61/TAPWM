const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('<h1>Site da Fatec Sorocaba</h1>');
});

app.get('/professores', (req, res) => {
    res.render('secao/professores');
});

app.get('/cursos', (req, res) => {
    res.render('secao/cursos');
});

app.get('/historia', (req, res) => {
    res.render("secao/historia");
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});