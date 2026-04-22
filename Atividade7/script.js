/* ═══════════════════════════════════════════════════
   JS Toolkit — Atividade 7  ·  script.js
   Cinco funções de JavaScript
   ═══════════════════════════════════════════════════ */

// ─── Scroll Reveal (IntersectionObserver) ───
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
});

// ─── Hamburger Menu ───
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobile-overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Helpers ───
function showResult(id, type, icon, text, sub) {
  const box = document.getElementById(id);
  const iconEl = document.getElementById(id + '-icon');
  const textEl = document.getElementById(id + '-text');
  const subEl = document.getElementById(id + '-sub');

  box.className = 'result-box ' + type;
  iconEl.textContent = icon;
  textEl.textContent = text;
  if (subEl) subEl.textContent = sub || '';

  // Re-trigger animation
  box.style.animation = 'none';
  box.offsetHeight; // reflow
  box.style.animation = '';
}

function isValidNumber(val) {
  const n = Number(val);
  return val !== '' && !isNaN(n) && isFinite(n);
}

// ═══════════════════════════════════════════
// EXERCÍCIO 1 — Maior Número
// ═══════════════════════════════════════════
function maiorNumero(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= a && b >= c) return b;
  return c;
}

function exercicio1() {
  const a = document.getElementById('ex1-a').value.trim();
  const b = document.getElementById('ex1-b').value.trim();
  const c = document.getElementById('ex1-c').value.trim();

  if (!isValidNumber(a) || !isValidNumber(b) || !isValidNumber(c)) {
    showResult('res1', 'error', '✕', 'Informe três números válidos.');
    return;
  }

  const na = Number(a), nb = Number(b), nc = Number(c);
  const maior = maiorNumero(na, nb, nc);

  showResult(
    'res1',
    'success',
    '↑',
    `O maior número é ${maior}`
  );
}

// ═══════════════════════════════════════════
// EXERCÍCIO 2 — Ordem Crescente
// ═══════════════════════════════════════════
function ordemCrescente(a, b, c) {
  return [a, b, c].sort((x, y) => x - y);
}

function exercicio2() {
  const a = document.getElementById('ex2-a').value.trim();
  const b = document.getElementById('ex2-b').value.trim();
  const c = document.getElementById('ex2-c').value.trim();

  if (!isValidNumber(a) || !isValidNumber(b) || !isValidNumber(c)) {
    showResult('res2', 'error', '✕', 'Informe três números válidos.');
    document.getElementById('res2-pills').innerHTML = '';
    return;
  }

  const sorted = ordemCrescente(Number(a), Number(b), Number(c));

  const box = document.getElementById('res2');
  const iconEl = document.getElementById('res2-icon');
  const pillsEl = document.getElementById('res2-pills');
  const textEl = document.getElementById('res2-text');

  box.className = 'result-box success';
  iconEl.textContent = '⇡';

  pillsEl.innerHTML = sorted
    .map(
      (n, i) =>
        `<span class="order-pill"><span class="pill-label">${i + 1}º</span>${n}</span>`
    )
    .join('');

  textEl.textContent = '';

  // Re-trigger animation
  box.style.animation = 'none';
  box.offsetHeight;
  box.style.animation = '';
}

// ═══════════════════════════════════════════
// EXERCÍCIO 3 — Palíndromo
// ═══════════════════════════════════════════
function ehPalindromo(str) {
  const limpo = str.toLowerCase().replace(/\s+/g, '');
  const invertido = limpo.split('').reverse().join('');
  return { isPalindrome: limpo === invertido, cleaned: limpo, reversed: invertido };
}

function exercicio3() {
  const input = document.getElementById('ex3-input').value.trim();

  if (!input) {
    showResult('res3', 'error', '✕', 'Informe um texto para verificar.');
    return;
  }

  const { isPalindrome, cleaned, reversed } = ehPalindromo(input);

  if (isPalindrome) {
    showResult(
      'res3',
      'success',
      '◎',
      `"${input}" é um palíndromo!`,
      `Normalizado: "${cleaned}" ↔ "${reversed}"`
    );
  } else {
    showResult(
      'res3',
      'warning',
      '◌',
      `"${input}" não é um palíndromo.`,
      `Normalizado: "${cleaned}" ≠ "${reversed}"`
    );
  }
}

// ═══════════════════════════════════════════
// EXERCÍCIO 4 — Verificação de Subconjunto
// ═══════════════════════════════════════════
function verificarSubconjunto(principal, sub) {
  if (!principal || !sub || principal.trim() === '' || sub.trim() === '') {
    return 'erro';
  }

  const p = principal.toLowerCase().trim();
  const s = sub.toLowerCase().trim();

  if (p.includes(s)) {
    return 'é um subconjunto';
  }
  return 'não é um subconjunto';
}

function exercicio4() {
  const a = document.getElementById('ex4-a').value;
  const b = document.getElementById('ex4-b').value;

  const resultado = verificarSubconjunto(a, b);

  if (resultado === 'erro') {
    showResult('res4', 'error', '✕', 'Erro: uma ou ambas as palavras estão vazias.');
    return;
  }

  if (resultado === 'é um subconjunto') {
    showResult(
      'res4',
      'success',
      '⊂',
      `"${b.trim()}" é um subconjunto de "${a.trim()}"`
    );
  } else {
    showResult(
      'res4',
      'warning',
      '⊄',
      `"${b.trim()}" não é um subconjunto de "${a.trim()}"`
    );
  }
}

// ═══════════════════════════════════════════
// EXERCÍCIO 5 — Dia da Semana
// ═══════════════════════════════════════════
function diaDaSemana(dataStr) {
  const dias = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  // Parse yyyy-mm-dd (from date input)
  const parts = dataStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) {
    return null;
  }

  return {
    dayName: dias[date.getDay()],
    dayIndex: date.getDay(),
    formatted: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`,
  };
}

function exercicio5() {
  const input = document.getElementById('ex5-input').value;

  if (!input) {
    showResult('res5', 'error', '✕', 'Selecione uma data válida.');
    return;
  }

  const result = diaDaSemana(input);

  if (!result) {
    showResult('res5', 'error', '✕', 'Data inválida.');
    return;
  }

  const emojis = ['☀️', '🌙', '🔥', '💧', '⚡', '💎', '🪐'];

  showResult(
    'res5',
    'info',
    emojis[result.dayIndex],
    result.dayName,
    `Data: ${result.formatted}`
  );
}
