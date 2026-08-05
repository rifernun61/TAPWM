/* ============================================================
   script.js – Fatec Sorocaba | Atividade 15
   ============================================================ */

// Dados dos cursos (sem banco de dados)
var cursos = {
  ads: {
    nome:     "Análise e Desenvolvimento de Sistemas",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Tecnologia da Informação",
    vagas:    "80 vagas por semestre",
    descricao: "Forma profissionais para desenvolver e gerenciar sistemas de informação. Abrange programação, banco de dados, engenharia de software e segurança."
  },
  automacao: {
    nome:     "Automação Industrial",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Engenharia e Produção",
    vagas:    "40 vagas por semestre",
    descricao: "Capacita profissionais para projetar e manter sistemas automatizados. Abrange CLP, robótica, pneumática e sistemas SCADA."
  },
  eletronicaaut: {
    nome:     "Eletrônica Automotiva",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Eletrônica e Automotivo",
    vagas:    "40 vagas por semestre",
    descricao: "Forma especialistas em sistemas eletrônicos de veículos. Cobre diagnose automotiva, módulos ECU, sensores e veículos elétricos."
  },
  fabricacaomec: {
    nome:     "Fabricação Mecânica",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Mecânica e Manufatura",
    vagas:    "40 vagas por semestre",
    descricao: "Prepara para planejar e executar processos de usinagem e conformação de peças. Inclui CAD/CAM, CNC e metrologia."
  },
  gestaoqualidade: {
    nome:     "Gestão da Qualidade",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Gestão e Negócios",
    vagas:    "40 vagas por semestre",
    descricao: "Forma profissionais para implementar sistemas de qualidade. Conteúdo: ISO 9001, Six Sigma, ferramentas estatísticas e auditoria."
  },
  gestaoempresarial: {
    nome:     "Gestão Empresarial (EAD)",
    duracao:  "3 anos",
    periodo:  "EAD – a distância",
    area:     "Gestão e Negócios",
    vagas:    "50 vagas por semestre",
    descricao: "Modalidade 100% online. Desenvolve competências em administração, finanças, marketing e recursos humanos."
  },
  logistica: {
    nome:     "Logística",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Operações e Supply Chain",
    vagas:    "40 vagas por semestre",
    descricao: "Capacita para gestão de cadeia de suprimentos, transporte, estoque e distribuição. Inclui WMS, TMS e comércio exterior."
  },
  manufaturaav: {
    nome:     "Manufatura Avançada",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Mecânica e Inovação",
    vagas:    "40 vagas por semestre",
    descricao: "Aborda tecnologias da Indústria 4.0: impressão 3D, manufatura aditiva, IoT industrial e inteligência artificial na produção."
  },
  manutencaoaeronaves: {
    nome:     "Manutenção de Aeronaves",
    duracao:  "3 anos",
    periodo:  "Integral",
    area:     "Aeronáutica e Engenharia",
    vagas:    "40 vagas por semestre",
    descricao: "Forma técnicos para inspecionar e reparar aeronaves conforme normas ANAC/EASA/FAA. Laboratórios com aeronaves reais."
  },
  polimeros: {
    nome:     "Polímeros",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Química e Materiais",
    vagas:    "40 vagas por semestre",
    descricao: "Forma tecnólogos para processar e controlar materiais poliméricos (plásticos e borrachas). Inclui injeção, extrusão e reciclagem."
  },
  processosmet: {
    nome:     "Processos Metalúrgicos",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Metalurgia e Materiais",
    vagas:    "40 vagas por semestre",
    descricao: "Prepara para atuar na transformação de metais. Cobre siderurgia, fundição, soldagem e tratamentos térmicos."
  },
  projetosmec: {
    nome:     "Projetos Mecânicos",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Engenharia e Design",
    vagas:    "40 vagas por semestre",
    descricao: "Forma tecnólogos para projetar máquinas e sistemas mecânicos. Abrange CAD 3D, análise de elementos finitos e normas ABNT."
  },
  sistemasbiomed: {
    nome:     "Sistemas Biomédicos",
    duracao:  "3 anos",
    periodo:  "Noturno",
    area:     "Saúde e Tecnologia",
    vagas:    "40 vagas por semestre",
    descricao: "Integra eletrônica e saúde para desenvolver e manter equipamentos médico-hospitalares. Inclui imageologia e regulação ANVISA."
  }
};

// Função chamada pelo onchange do select
function abrirCurso(selectEl) {
  var chave = selectEl.value;
  if (!chave) return;

  var curso = cursos[chave];
  if (!curso) return;

  // Confirmação antes de abrir
  var confirmado = confirm('Deseja abrir informações sobre o curso:\n\n"' + curso.nome + '"?');

  if (!confirmado) {
    selectEl.value = "";
    return;
  }

  // Monta o HTML da janela de detalhes
  var html =
    '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +
    '<head>' +
      '<meta charset="UTF-8"/>' +
      '<title>' + curso.nome + '</title>' +
      '<link rel="stylesheet" href="curso.css"/>' +
    '</head>' +
    '<body>' +
      '<div class="topo">' +
        '<strong>' + curso.nome + '</strong>' +
      '</div>' +
      '<div class="conteudo">' +
        '<table>' +
          '<tr><td class="rotulo">Área:</td><td>' + curso.area + '</td></tr>' +
          '<tr><td class="rotulo">Duração:</td><td>' + curso.duracao + '</td></tr>' +
          '<tr><td class="rotulo">Período:</td><td>' + curso.periodo + '</td></tr>' +
          '<tr><td class="rotulo">Vagas:</td><td>' + curso.vagas + '</td></tr>' +
        '</table>' +
        '<p class="descricao">' + curso.descricao + '</p>' +
      '</div>' +
      '<div class="rodape">' +
        '<span>FATEC Sorocaba</span>' +
        '<button onclick="window.close()">Fechar</button>' +
      '</div>' +
    '</body>' +
    '</html>';

  // Abre nova janela 600 x 300
  var janela = window.open(
    "",
    "janelaCurso",
    "width=600,height=300,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no"
  );

  if (janela) {
    janela.document.open();
    janela.document.write(html);
    janela.document.close();
  } else {
    alert("O navegador bloqueou o popup. Permita popups para este site e tente novamente.");
  }

  selectEl.value = "";
}
