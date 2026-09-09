/**
 * ==============================================================================================
 * DESAFIO EXTRA: Explicação da diferença entre res.send() e res.render()
 * ==============================================================================================
 * 
 * 1. res.send([body]):
 *    - Envia uma resposta HTTP diretamente para o cliente com o corpo informado (texto, HTML
 *      puro, Buffer, objeto ou array JSON).
 *    - O Express define automaticamente o Content-Type adequado com base no tipo de dado enviado:
 *      * Para strings contendo marcação HTML, infere 'text/html'.
 *      * Para objetos ou arrays, serializa como JSON e infere 'application/json'.
 *    - NÃO utiliza nem compila nenhum mecanismo de template (View Engine).
 * 
 * 2. res.render(view [, locals] [, callback]):
 *    - Responsável por processar, compilar e renderizar um arquivo de template (ex: EJS, Pug).
 *    - Localiza o arquivo de view no diretório configurado em `app.set('views', ...)` com a
 *      extensão do motor configurado em `app.set('view engine', ...)`.
 *    - Permite passar dados dinâmicos através do parâmetro `locals` (ex: { titulo: "Semana Tech" }).
 *    - O motor de template interpreta as tags dinâmicas (<%= %>, <% %>), gera o HTML estático
 *      final e o Express envia esse HTML ao cliente com Content-Type 'text/html'.
 * ==============================================================================================
 */

module.exports = function(app) {
    app.get('/novidades', function(req, res) {
        // Exemplo utilizando res.send() com marcação HTML direta
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Novidades - Semana de Tecnologia</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                        color: #f8fafc;
                        margin: 0;
                        padding: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                    .card {
                        background: rgba(30, 41, 59, 0.85);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        padding: 2.5rem;
                        max-width: 600px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                    }
                    h1 { color: #38bdf8; margin-top: 0; }
                    .tag {
                        display: inline-block;
                        background: #0284c7;
                        color: #fff;
                        padding: 0.25rem 0.75rem;
                        border-radius: 999px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                    }
                    ul { line-height: 1.8; padding-left: 1.2rem; }
                    a {
                        display: inline-block;
                        margin-top: 1.5rem;
                        color: #38bdf8;
                        text-decoration: none;
                        font-weight: 600;
                        border: 1px solid #38bdf8;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        transition: all 0.2s ease;
                    }
                    a:hover {
                        background: #38bdf8;
                        color: #0f172a;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <span class="tag">Desafio Extra: res.send()</span>
                    <h1>Novidades de Última Hora!</h1>
                    <p>Confira os últimos comunicados da organização da Semana de Tecnologia:</p>
                    <ul>
                        <li><strong>Credenciamento Antecipado:</strong> Liberação de crachás virtuais a partir de 18/10.</li>
                        <li><strong>Palestrante Internacional Confirmado:</strong> Painel especial sobre Engenharia de Prompt e LLMs.</li>
                        <li><strong>Hackathon de Encerramento:</strong> Premiação total de R$ 10.000 para as melhores soluções.</li>
                    </ul>
                    <a href="/">← Voltar para a Página Inicial</a>
                </div>
            </body>
            </html>
        `);
    });
};
