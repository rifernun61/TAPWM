const TOTAL = 45;
let respostas = [
    { idade: 22, sexo: 'masculino', opiniao: 4 },
    { idade: 35, sexo: 'feminino', opiniao: 3 },
    { idade: 19, sexo: 'masculino', opiniao: 2 },
    { idade: 41, sexo: 'feminino', opiniao: 4 },
    { idade: 28, sexo: 'outros', opiniao: 1 },
    { idade: 17, sexo: 'feminino', opiniao: 3 },
    { idade: 55, sexo: 'masculino', opiniao: 4 },
    { idade: 30, sexo: 'feminino', opiniao: 2 },
    { idade: 24, sexo: 'masculino', opiniao: 1 },
    { idade: 38, sexo: 'outros', opiniao: 3 }
];

const form = document.getElementById('form');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');

// Atualizar barra de progresso
function atualizarProgresso() {
    const pct = (respostas.length / TOTAL) * 100;
    progressFill.style.width = pct + '%';
    progressLabel.textContent = `${respostas.length} / ${TOTAL}`;
}

// Calcular e exibir resultados (atualiza sempre)
function calcularResultados() {
    if (respostas.length === 0) return;

    const idades = respostas.map(r => r.idade);

    // Média de idade
    const media = (idades.reduce((a, b) => a + b, 0) / respostas.length).toFixed(1);
    document.getElementById('mediaIdade').textContent = media + ' anos';

    // Mais velha e mais nova
    document.getElementById('maisVelha').textContent = Math.max(...idades) + ' anos';
    document.getElementById('maisNova').textContent = Math.min(...idades) + ' anos';

    // Quantidade péssimo (opinião = 1)
    const qtdPessimo = respostas.filter(r => r.opiniao === 1).length;
    document.getElementById('qtdPessimo').textContent = qtdPessimo + ' pessoas';

    // Porcentagem ótimo (4) + bom (3)
    const qtdBom = respostas.filter(r => r.opiniao >= 3).length;
    const pct = ((qtdBom / respostas.length) * 100).toFixed(1);
    document.getElementById('pctBom').textContent = pct + '%';

    // Contagem por gênero
    const masc = respostas.filter(r => r.sexo === 'masculino').length;
    const fem = respostas.filter(r => r.sexo === 'feminino').length;
    const outros = respostas.filter(r => r.sexo === 'outros').length;
    document.getElementById('generos').textContent = `${masc} / ${fem} / ${outros}`;
}

// Envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (respostas.length >= TOTAL) return alert('Todas as 45 respostas já foram coletadas!');

    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.querySelector('input[name="sexo"]:checked');
    const opiniao = document.querySelector('input[name="opiniao"]:checked');

    if (!idade || idade < 1) return alert('Informe uma idade válida!');
    if (!sexo) return alert('Selecione o sexo!');
    if (!opiniao) return alert('Selecione a opinião!');

    respostas.push({
        idade: idade,
        sexo: sexo.value,
        opiniao: parseInt(opiniao.value)
    });

    atualizarProgresso();
    calcularResultados();
    form.reset();
    document.getElementById('idade').focus();

    if (respostas.length >= TOTAL) {
        document.getElementById('btnEnviar').disabled = true;
        document.getElementById('btnEnviar').textContent = '✅ Pesquisa completa!';
    }
});

// Reiniciar
document.getElementById('btnReset').addEventListener('click', function () {
    respostas = [];
    atualizarProgresso();
    calcularResultados();
    document.getElementById('btnEnviar').disabled = false;
    document.getElementById('btnEnviar').textContent = 'Registrar Resposta →';
});

// Inicializar com os dados pré-cadastrados
atualizarProgresso();
calcularResultados();
