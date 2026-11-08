const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shown = new WeakMap();
const io = new IntersectionObserver(es => es.forEach(e => shown.set(e.target, e.isIntersecting)), { threshold: 0.3 });
const onScreen = async n => { while (!shown.get(n)) await sleep(250); };

// Trading chart draws itself once, so you watch the bot pull away from the S&P
async function chart(svg) {
  const bot = svg.querySelector('.bot'), spy = svg.querySelector('.spy');
  if (still) return;
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('r', 5); dot.classList.add('dot'); svg.append(dot);
  const L = bot.getTotalLength(), LS = spy.getTotalLength();
  const draw = p => {
    bot.style.strokeDasharray = L; bot.style.strokeDashoffset = L * (1 - p);
    spy.style.strokeDasharray = LS; spy.style.strokeDashoffset = LS * (1 - p);
    const pt = bot.getPointAtLength(L * p); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
  };
  draw(0); await onScreen(svg);
  const t0 = performance.now();
  const f = t => { const p = Math.min(1, (t - t0) / 3500); draw(1 - (1 - p) ** 2); if (p < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}

// Super tic-tac-toe: bot vs bot under the real rules; the lit board is where the next move must go
function ttt(big) {
  const boards = [...Array(9)].map(() => { const b = document.createElement('div'); b.className = 'sb'; big.append(b); return [...Array(9)].map(() => b.appendChild(document.createElement('i'))); });
  const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const winner = a => { for (const [x, y, z] of LINES) if (a[x] && a[x] !== 'T' && a[x] === a[y] && a[x] === a[z]) return a[x]; return a.every(Boolean) ? 'T' : null; };
  async function game() {
    const g = [...Array(9)].map(() => Array(9).fill(null)), won = Array(9).fill(null);
    boards.flat().forEach(c => { c.textContent = ''; c.className = ''; });
    [...big.children].forEach(b => b.className = 'sb');
    let p = 'X', target = -1;
    for (;;) {
      const bs = target >= 0 && !won[target] ? [target] : [...Array(9).keys()].filter(b => !won[b]);
      [...big.children].forEach((b, i) => b.classList.toggle('on', bs.includes(i)));
      if (!bs.length) break;
      const moves = bs.flatMap(b => g[b].map((v, c) => v ? null : [b, c]).filter(Boolean));
      const wins = moves.filter(([b, c]) => { const t = [...g[b]]; t[c] = p; return winner(t) === p; });
      const [b, c] = wins.length && Math.random() < 0.8 ? pick(wins) : pick(moves);
      await onScreen(big); await sleep(450);
      g[b][c] = p; boards[b][c].textContent = p; boards[b][c].className = 'new ' + p.toLowerCase();
      const w = winner(g[b]); if (w) { won[b] = w; big.children[b].classList.add('w-' + w.toLowerCase()); }
      const W = winner(won);
      if (W && W !== 'T') { big.dataset.win = W; big.classList.add('over'); await sleep(2600); big.classList.remove('over'); return; }
      target = c; p = p === 'X' ? 'O' : 'X';
    }
    await sleep(2000);
  }
  if (!still) (async () => { for (;;) await game(); })();
}

// Pokémon: the Team Rocket set drifting past; now and then one gets identified
function cards(n) {
  const names = { 1: 'Dark Alakazam', 2: 'Dark Arbok', 3: 'Dark Blastoise', 4: 'Dark Charizard', 5: 'Dark Dragonite', 6: 'Dark Dugtrio', 7: 'Dark Golbat', 8: 'Dark Gyarados', 9: 'Dark Hypno', 10: 'Dark Machamp', 11: 'Dark Magneton', 12: 'Dark Slowbro', 13: 'Dark Vileplume', 14: 'Dark Weezing', 83: 'Dark Raichu' };
  const ids = Object.keys(names);
  const row = (list, rev) => {
    const r = document.createElement('div'); r.className = 'row' + (rev ? ' rev' : '');
    const t = r.appendChild(document.createElement('div')); t.className = 'track';
    [...list, ...list].forEach((id, i) => { const im = t.appendChild(document.createElement('img')); im.src = `/assets/images/cards/${id}.webp`; im.alt = i < list.length ? names[id] : ''; im.dataset.id = id; im.loading = 'lazy'; im.width = 200; im.height = 279; });
    return r;
  };
  const tag = document.createElement('span'); tag.className = 'id-tag';
  n.append(row(ids.slice(0, 8)), row(ids.slice(7), true), tag);
  if (still) return;
  (async () => { for (;;) {
    await onScreen(n); await sleep(2400);
    const box = n.getBoundingClientRect();
    const inView = [...n.querySelectorAll('img')].filter(i => { const r = i.getBoundingClientRect(); return r.left > box.left + 20 && r.right < box.right - 20; });
    if (!inView.length) continue;
    const im = pick(inView); im.classList.add('hit'); tag.textContent = `${names[im.dataset.id]} · Team Rocket`; tag.classList.add('on');
    await sleep(2200); tag.classList.remove('on'); im.classList.remove('hit');
  } })();
}

// Address is assembled in the browser so it never appears in the HTML that scrapers read
const address = ['gmail.com', 'mshik3'].reverse().join('@');
document.querySelectorAll('a.mail').forEach(a => { a.href = 'mailto:' + address; });

document.querySelectorAll('.chart').forEach(n => { io.observe(n); chart(n); });
document.querySelectorAll('.live-ttt').forEach(n => { io.observe(n); ttt(n); });
document.querySelectorAll('.live-cards').forEach(n => { io.observe(n); cards(n); });
