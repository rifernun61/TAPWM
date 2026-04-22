// ===== State =====
const historico = [];

// ===== DOM helpers =====
const $ = (id) => document.getElementById(id);
const show = (el) => el.classList.remove('hidden');
const hide = (el) => el.classList.add('hidden');

// ===== Scroll Reveal (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .shell').forEach(el => {
  revealObserver.observe(el);
});

// Helper: observe newly shown elements
function observeReveal(el) {
  el.classList.add('shell');
  el.classList.remove('visible');
  // Force reflow then observe
  void el.offsetWidth;
  revealObserver.observe(el);
  // Trigger visible after a tick
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add('visible');
    });
  });
}

// ===== Validação com isNaN =====
function lerValores() {
  const inputs = [$('side-a'), $('side-b'), $('side-c')];
  inputs.forEach(i => i.classList.remove('input-error'));

  const vals = inputs.map(i => i.value.trim().replace(',', '.'));
  let ok = true;

  vals.forEach((v, idx) => {
    if (v === '' || isNaN(Number(v)) || Number(v) <= 0) {
      inputs[idx].classList.add('input-error');
      ok = false;
    }
  });

  if (!ok) return null;
  return vals.map(Number);
}

// ===== Regra do triângulo =====
function ehTriangulo(a, b, c) {
  return (
    Math.abs(b - c) < a && a < b + c &&
    Math.abs(a - c) < b && b < a + c &&
    Math.abs(a - b) < c && c < a + b
  );
}

// ===== Tipo do triângulo =====
function tipoTriangulo(a, b, c) {
  if (a === b && b === c) return 'equilatero';
  if (a === b || b === c || a === c) return 'isosceles';
  return 'escaleno';
}

// ===== Labels =====
const tipoLabel = { equilatero: 'Equilátero', isosceles: 'Isósceles', escaleno: 'Escaleno' };

// ===== Classificação angular =====
function classificacaoAngular(a, b, c) {
  const lados = [a, b, c].sort((x, y) => x - y);
  const sq = lados.map(l => l * l);
  if (Math.abs(sq[0] + sq[1] - sq[2]) < 1e-9) return 'Retângulo';
  if (sq[0] + sq[1] > sq[2]) return 'Acutângulo';
  return 'Obtusângulo';
}

// ===== Ângulos via lei dos cossenos =====
function calcAngulo(opp, adj1, adj2) {
  const cos = (adj1 * adj1 + adj2 * adj2 - opp * opp) / (2 * adj1 * adj2);
  return Math.acos(Math.min(1, Math.max(-1, cos))) * (180 / Math.PI);
}

// ===== Área (Heron) =====
function areaHeron(a, b, c) {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// ===== Formatar número =====
function fmt(n, d = 2) {
  return Number.isInteger(n) ? n.toString() : n.toFixed(d);
}

// ===== Desenhar triângulo no canvas (Ethereal Glass style) =====
function desenharTriangulo(a, b, c) {
  const canvas = $('triangle-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, W, H);

  // Subtle dot grid
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let x = 20; x < W; x += 30) {
    for (let y = 20; y < H; y += 30) {
      ctx.beginPath();
      ctx.arc(x, y, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Compute triangle vertices
  const angA = calcAngulo(a, b, c) * (Math.PI / 180);
  const Ax = 0, Ay = 0;
  const Bx = c, By = 0;
  const Cx = b * Math.cos(angA);
  const Cy = -b * Math.sin(angA);

  const xs = [Ax, Bx, Cx];
  const ys = [Ay, By, Cy];
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);

  const pad = 52;
  const scaleX = (W - 2 * pad) / (maxX - minX || 1);
  const scaleY = (H - 2 * pad) / (maxY - minY || 1);
  const scale = Math.min(scaleX, scaleY);

  const tx = (x) => pad + (x - minX) * scale + ((W - 2 * pad) - (maxX - minX) * scale) / 2;
  const ty = (y) => pad + (maxY - y) * scale + ((H - 2 * pad) - (maxY - minY) * scale) / 2;

  const pts = [[tx(Ax), ty(Ay)], [tx(Bx), ty(By)], [tx(Cx), ty(Cy)]];
  const centroid = [(pts[0][0] + pts[1][0] + pts[2][0]) / 3, (pts[0][1] + pts[1][1] + pts[2][1]) / 3];

  // Gradient fill from centroid
  const grad = ctx.createRadialGradient(centroid[0], centroid[1], 0, centroid[0], centroid[1], 120);
  grad.addColorStop(0, 'rgba(167, 139, 250, 0.08)');
  grad.addColorStop(1, 'rgba(167, 139, 250, 0.01)');

  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  ctx.lineTo(pts[1][0], pts[1][1]);
  ctx.lineTo(pts[2][0], pts[2][1]);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Stroke — soft accent
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Vertex dots
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(167, 139, 250, 0.7)';
    ctx.fill();

    // Glow ring
    ctx.beginPath();
    ctx.arc(p[0], p[1], 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Side labels
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const mid = (p1, p2) => [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  const labels = [
    { pos: mid(pts[0], pts[1]), text: 'c = ' + fmt(c) },
    { pos: mid(pts[1], pts[2]), text: 'a = ' + fmt(a) },
    { pos: mid(pts[2], pts[0]), text: 'b = ' + fmt(b) },
  ];

  labels.forEach(l => {
    const dx = l.pos[0] - centroid[0];
    const dy = l.pos[1] - centroid[1];
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const off = 20;
    ctx.fillText(l.text, l.pos[0] + (dx / d) * off, l.pos[1] + (dy / d) * off);
  });
}

// ===== Mostrar estatísticas =====
function mostrarStats(a, b, c) {
  const perimetro = a + b + c;
  const s = perimetro / 2;
  const area = areaHeron(a, b, c);

  $('stat-perimeter').textContent = fmt(perimetro);
  $('stat-semiperimeter').textContent = fmt(s);
  $('stat-area').textContent = fmt(area, 4);
  $('stat-max').textContent = fmt(Math.max(a, b, c));
  $('stat-min').textContent = fmt(Math.min(a, b, c));
  $('stat-angle-a').textContent = fmt(calcAngulo(a, b, c)) + '°';
  $('stat-angle-b').textContent = fmt(calcAngulo(b, a, c)) + '°';
  $('stat-angle-c').textContent = fmt(calcAngulo(c, a, b)) + '°';
  $('stat-angle-class').textContent = classificacaoAngular(a, b, c);

  const el = $('stats-section');
  show(el);
  observeReveal(el);
}

// ===== Histórico =====
function adicionarHistorico(a, b, c, valido, tipo) {
  historico.push({ a, b, c, valido, tipo });
  renderHistorico();
}

function renderHistorico() {
  const list = $('history-list');
  const empty = $('history-empty');

  if (historico.length === 0) {
    list.innerHTML = '';
    list.appendChild(empty);
    show(empty);
    hide($('history-stats'));
    return;
  }

  hide(empty);
  list.innerHTML = '';

  const recentes = historico.slice().reverse().slice(0, 20);
  recentes.forEach(h => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    const badgeClass = h.valido ? 'valid' : 'invalid';
    const badgeText = h.valido ? tipoLabel[h.tipo] : 'Inválido';
    div.innerHTML = `<span class="sides">(${fmt(h.a)}, ${fmt(h.b)}, ${fmt(h.c)})</span><span class="badge ${badgeClass}">${badgeText}</span>`;
    list.appendChild(div);
  });

  const total = historico.length;
  const validos = historico.filter(h => h.valido).length;
  const invalidos = total - validos;
  const eq = historico.filter(h => h.tipo === 'equilatero').length;
  const iso = historico.filter(h => h.tipo === 'isosceles').length;
  const esc = historico.filter(h => h.tipo === 'escaleno').length;

  $('hs-total').textContent = total;
  $('hs-valid').textContent = validos;
  $('hs-invalid').textContent = invalidos;
  $('hs-equilatero').textContent = eq;
  $('hs-isosceles').textContent = iso;
  $('hs-escaleno').textContent = esc;

  show($('history-stats'));
}

// ===== Ação principal =====
function verificar() {
  const vals = lerValores();
  if (!vals) {
    const rs = $('result-section');
    rs.className = 'shell result-shell fail';
    show(rs);
    observeReveal(rs);
    $('result-icon').textContent = '⚠';
    $('result-title').textContent = 'Valores Inválidos';
    $('result-message').textContent = 'Informe números positivos válidos para os três lados.';
    hide($('result-type'));
    hide($('preview-section'));
    hide($('stats-section'));
    return;
  }

  const [a, b, c] = vals;
  const rs = $('result-section');

  if (!ehTriangulo(a, b, c)) {
    rs.className = 'shell result-shell fail';
    show(rs);
    observeReveal(rs);
    $('result-icon').textContent = '✗';
    $('result-title').textContent = 'Não é um Triângulo';
    $('result-message').textContent = `Os lados (${fmt(a)}, ${fmt(b)}, ${fmt(c)}) não satisfazem a desigualdade triangular.`;
    hide($('result-type'));
    hide($('preview-section'));
    hide($('stats-section'));
    adicionarHistorico(a, b, c, false, null);
    return;
  }

  const tipo = tipoTriangulo(a, b, c);

  rs.className = 'shell result-shell success';
  show(rs);
  observeReveal(rs);
  $('result-icon').textContent = '△';
  $('result-title').textContent = 'É um Triângulo!';
  $('result-message').textContent = `Os lados (${fmt(a)}, ${fmt(b)}, ${fmt(c)}) formam um triângulo válido.`;

  const rt = $('result-type');
  rt.className = 'result-badge ' + tipo;
  rt.textContent = tipoLabel[tipo];
  show(rt);

  const ps = $('preview-section');
  show(ps);
  observeReveal(ps);
  desenharTriangulo(a, b, c);
  mostrarStats(a, b, c);
  adicionarHistorico(a, b, c, true, tipo);
}

// ===== Limpar =====
function limpar() {
  $('side-a').value = '';
  $('side-b').value = '';
  $('side-c').value = '';
  [$('side-a'), $('side-b'), $('side-c')].forEach(i => i.classList.remove('input-error'));
  hide($('result-section'));
  hide($('preview-section'));
  hide($('stats-section'));
  $('side-a').focus();
}

function limparHistorico() {
  historico.length = 0;
  renderHistorico();
}

// ===== Enter key =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') verificar();
});
