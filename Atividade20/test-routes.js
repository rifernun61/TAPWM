const http = require('http');

const routesToTest = [
    {
        path: '/',
        name: 'Home (/)',
        assertions: [
            'Semana de Tecnologia',
            'Sobre',
            'Programação',
            'Contato',
            'Inscrição',
            'Novidades'
        ]
    },
    {
        path: '/sobre',
        name: 'Sobre (/sobre)',
        assertions: [
            'Sobre a Semana de Tecnologia',
            'Objetivo do Evento',
            '19 a 23 de Outubro de 2026',
            'Auditório Central'
        ]
    },
    {
        path: '/programacao',
        name: 'Programação (/programacao)',
        assertions: [
            'Grade de Programação',
            'Inteligência Artificial no Desenvolvimento Moderno',
            'Arquitetura Limpa e Modularização',
            'Carreira em TI',
            'Infraestrutura em Nuvem',
            'Construindo APIs RESTful Seguras',
            'Lightning Talks de Projetos'
        ]
    },
    {
        path: '/contato',
        name: 'Contato (/contato)',
        assertions: [
            'Fale Conosco',
            'contato@semanatecnologia.com.br',
            '(11) 3456-7890',
            'Hall de Entrada do Bloco B'
        ]
    },
    {
        path: '/admin/inscricao',
        name: 'Inscrição (/admin/inscricao)',
        assertions: [
            'Formulário de Inscrição',
            'name="nome"',
            'name="email"',
            'name="categoria"',
            'Confirmar Inscrição'
        ]
    },
    {
        path: '/novidades',
        name: 'Novidades (/novidades - res.send)',
        assertions: [
            'Novidades de Última Hora!',
            'Desafio Extra: res.send()',
            'Credenciamento Antecipado'
        ]
    }
];

function fetchRoute(path) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        }).on('error', reject);
    });
}

async function runTests() {
    console.log('==================================================');
    console.log('INICIANDO BATERIA DE TESTES AUTOMATIZADOS (E2E HTTP)');
    console.log('==================================================\n');

    let allPassed = true;

    for (const test of routesToTest) {
        try {
            const res = await fetchRoute(test.path);
            const statusOk = res.statusCode === 200;
            const missingAssertions = test.assertions.filter(a => !res.body.includes(a));

            if (statusOk && missingAssertions.length === 0) {
                console.log(`✅ [PASS] ${test.name}`);
                console.log(`   Status: ${res.statusCode} | Content-Type: ${res.headers['content-type']}`);
                console.log(`   Verificações de conteúdo: Todas as ${test.assertions.length} asserções validadas com sucesso.\n`);
            } else {
                allPassed = false;
                console.log(`❌ [FAIL] ${test.name}`);
                console.log(`   Status: ${res.statusCode}`);
                if (missingAssertions.length > 0) {
                    console.log(`   Asserções não encontradas:`, missingAssertions);
                }
                console.log('');
            }
        } catch (err) {
            allPassed = false;
            console.log(`❌ [ERROR] ${test.name} - Erro de conexão: ${err.message}\n`);
        }
    }

    console.log('==================================================');
    if (allPassed) {
        console.log('🎉 RESULTADO: TODOS OS 6 TESTES PASSARAM COM SUCESSO (100% OK)!');
    } else {
        console.log('⚠️ RESULTADO: ALGUNS TESTES FALHARAM.');
    }
    console.log('==================================================');
}

runTests();
