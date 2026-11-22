const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const NUM = '237675066547', wa = t => window.open('https://wa.me/' + NUM + '?text=' + encodeURIComponent(t), '_blank');
const SB_URL = 'https://tcqwsbwywjpxmkstmtry.supabase.co', SB_KEY = 'sb_publishable_shF-H67k6MTAwldRcuvc_Q_mwjZaYWD';
const sb = (window.supabase && window.supabase.createClient) ? window.supabase.createClient(SB_URL, SB_KEY) : null;

(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) { document.documentElement.setAttribute('data-theme', savedTheme); }
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { document.documentElement.setAttribute('data-theme', 'dark'); }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  icon.innerHTML = isDark
    ? '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/></svg>'
    : '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
}

const NAV = [
  ['index.html', 'Home'],
  ['explore.html', 'Find food'],
  ['order.html', 'Order food'],
  ['order.html#hire', 'Hire a chef'],
  ['reviews.html', 'Reviews'],
  ['vendors.html', 'Sell on ChopNearMe']
];
$('hdr').outerHTML = `<header class="site"><div class="wrap bar"><a class="logo" href="index.html">Chop<b>NearMe</b></a><button class="burger" id="bg" aria-expanded="false">Menu</button><nav class="menu" id="mn">${NAV.map(n => `<a href="${n[0]}">${n[1]}</a>`).join('')}</nav><button class="theme-toggle" id="theme-btn" aria-label="Toggle dark mode"><span id="theme-icon"></span></button></div></header>`;
$('bg').onclick = () => { const o = $('mn').classList.toggle('open'); $('bg').setAttribute('aria-expanded', o) };
$('theme-btn').onclick = toggleTheme;
updateThemeIcon();

const bottomNavHTML = `
<nav class="bottom-nav">
  <a href="index.html" class="${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'active' : ''}"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</a>
  <a href="explore.html" class="${window.location.pathname.endsWith('explore.html') ? 'active' : ''}"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Explore</a>
  <a href="explore.html?view=search" class="${window.location.pathname.endsWith('explore.html') && window.location.search.includes('search') ? 'active' : ''}"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>Search</a>
  <a href="explore.html?saved=true" class="${window.location.search.includes('saved') ? 'active' : ''}"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>Saved</a>
</nav>`;
document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

$('ftr').outerHTML = `<footer class="site"><div class="wrap"><div class="cols"><div><b style="color:#fff;font-size:1.2rem">ChopNearMe</b><p>Food from kitchens, vendors, and chefs near you in Buea, Kumba, Limbe, and Tiko.</p></div><div><h4>Explore</h4>${NAV.map(n => `<a href="${n[0]}">${n[1]}</a>`).join('')}</div><div><h4>Contact</h4><a href="tel:+237675066547">+237 675 066 547</a><a href="mailto:izzykash007@gmail.com">izzykash007@gmail.com</a></div></div><p style="margin-top:22px;font-size:.85rem">Independent restaurant directory. Payments and escrow are simulated.</p></div></footer>`;

const S = (bg, x) => `<svg viewBox="0 0 200 150" role="img" aria-hidden="true"><rect width="200" height="150" fill="${bg}"/>${x}</svg>`;
const DISH = {
  ndole: S('#cfe8c4', '<ellipse cx="100" cy="98" rx="72" ry="36" fill="#fff"/><ellipse cx="100" cy="92" rx="58" ry="29" fill="#2f6b34"/><circle cx="80" cy="86" r="7" fill="#8a4b2a"/><circle cx="106" cy="97" r="6" fill="#8a4b2a"/><circle cx="126" cy="85" r="7" fill="#8a4b2a"/><rect x="146" y="104" width="30" height="12" rx="6" fill="#ff8ab4"/>'),
  suya: S('#ffe3c2', '<rect x="30" y="70" width="140" height="56" rx="8" fill="#f7efe0"/><g stroke="#6b4a2b" stroke-width="3"><path d="M40 80l120 6M40 98l120 6M40 114l120 4"/></g><g fill="#a8542a"><rect x="55" y="78" width="16" height="12" rx="4"/><rect x="82" y="80" width="16" height="12" rx="4"/><rect x="110" y="82" width="16" height="12" rx="4"/><rect x="60" y="96" width="16" height="12" rx="4"/><rect x="90" y="98" width="16" height="12" rx="4"/><rect x="118" y="100" width="16" height="12" rx="4"/></g><path d="M70 40q8-14 0-22M100 44q8-14 0-22M130 40q8-14 0-22" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>'),
  pepper: S('#ffd9d1', '<ellipse cx="100" cy="100" rx="70" ry="32" fill="#fff"/><ellipse cx="100" cy="94" rx="58" ry="26" fill="#c8411b"/><circle cx="85" cy="92" r="6" fill="#ff8ab4"/><circle cx="112" cy="98" r="5" fill="#ff8ab4"/><ellipse cx="102" cy="88" rx="12" ry="6" fill="#7a2a12"/><path d="M80 60q8-14 0-24M105 60q8-14 0-24M130 60q8-14 0-24" stroke="#fff" stroke-width="3" fill="none"/>'),
  fish: S('#cfe5f2', '<ellipse cx="96" cy="82" rx="58" ry="28" fill="#c9843a"/><path d="M150 82l32-24v48z" fill="#b06f2c"/><circle cx="62" cy="76" r="5" fill="#fff"/><circle cx="62" cy="76" r="2.5" fill="#2a0f45"/><path d="M80 66q6 16 0 32M104 62q6 20 0 40M128 66q6 16 0 32" stroke="#8a5420" stroke-width="3" fill="none"/><ellipse cx="100" cy="124" rx="70" ry="10" fill="#fff" opacity=".6"/>'),
  plantain: S('#fff1b8', '<g fill="#e0a02a" stroke="#a86a12" stroke-width="3"><ellipse cx="62" cy="70" rx="22" ry="13" transform="rotate(-20 62 70)"/><ellipse cx="108" cy="62" rx="22" ry="13" transform="rotate(10 108 62)"/><ellipse cx="146" cy="88" rx="22" ry="13" transform="rotate(-10 146 88)"/><ellipse cx="86" cy="104" rx="22" ry="13" transform="rotate(15 86 104)"/></g>'),
  eru: S('#dff0d8', '<ellipse cx="100" cy="100" rx="72" ry="34" fill="#fff"/><ellipse cx="86" cy="94" rx="44" ry="22" fill="#1f5a28"/><circle cx="82" cy="90" r="5" fill="#8a4b2a"/><circle cx="100" cy="96" r="5" fill="#8a4b2a"/><circle cx="144" cy="84" r="26" fill="#f7f1e2" stroke="#d9c6ec" stroke-width="3"/>'),
  scene: '<svg viewBox="0 0 320 240" role="img" aria-label="Illustration of a roadside suya stand"><rect width="320" height="240" fill="#ff8ab4"/><circle cx="260" cy="50" r="28" fill="#fdf6fb"/><path d="M30 80h260l-22-40H52z" fill="#d81b60"/><path d="M52 40h32l-8 40H30zM116 40h32l-4 40h-40zM180 40h32l4 40h-40zM244 40h24l22 40h-44z" fill="#fdf6fb"/><rect x="60" y="80" width="6" height="110" fill="#2a0f45"/><rect x="254" y="80" width="6" height="110" fill="#2a0f45"/><rect x="40" y="150" width="240" height="14" rx="4" fill="#2a0f45"/><rect x="60" y="164" width="200" height="40" fill="#3d1a5c"/><g stroke="#6b4a2b" stroke-width="3"><path d="M90 140l60-6M110 148l70-4"/></g><g fill="#a8542a"><rect x="98" y="134" width="14" height="10" rx="3"/><rect x="124" y="132" width="14" height="10" rx="3"/><rect x="128" y="142" width="14" height="10" rx="3"/><rect x="156" y="140" width="14" height="10" rx="3"/></g><circle cx="205" cy="118" r="13" fill="#7a4a2a"/><rect x="192" y="130" width="26" height="40" rx="12" fill="#5a189a"/><circle cx="238" cy="124" r="11" fill="#5a3520"/><rect x="227" y="134" width="22" height="34" rx="10" fill="#d81b60"/></svg>'
};

function hydrateArt() {
  document.querySelectorAll('.art[data-k]').forEach(el => {
    const k = el.dataset.k;
    el.innerHTML = DISH[k] || '';
    const src = (typeof PHOTOS !== 'undefined') && PHOTOS[k];
    if (!src) return;
    const im = new Image();
    im.alt = el.dataset.alt || '';
    im.onload = () => { el.innerHTML = ''; el.appendChild(im); };
    im.src = src;
  });
}
hydrateArt();
/* Make sure the splash screen shows up */
try { sessionStorage.removeItem('splash'); } catch (e) {}
(function () {
  try { if (sessionStorage.getItem('splash')) return; sessionStorage.setItem('splash', '1') } catch (e) {}
  const red = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const d = document.createElement('div');
  d.id = 'splash';
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-label', 'ChopNearMe');
  d.innerHTML = '<div class="sp-in"><svg viewBox="0 0 124 124" width="100" height="100" aria-hidden="true"><g fill="#fff"><circle cx="40" cy="38" r="16"/><circle cx="62" cy="30" r="18"/><circle cx="84" cy="38" r="16"/><rect x="38" y="42" width="48" height="16" rx="5"/></g><path d="M62 119c-13-15-19-23-19-31a19 19 0 0 1 38 0c0 8-6 16-19 31z" fill="#ff4f93"/><circle cx="62" cy="88" r="7" fill="#fff"/></svg><div class="sp-t">ChopNear<b>Me</b></div><p>Find food near you.</p><small>Tap to skip</small></div>';
  document.body.appendChild(d);
  const done = () => { d.classList.add('out'); setTimeout(() => d.remove(), 500) };
  d.onclick = done;
  setTimeout(done, red ? 1200 : 3000);
})();
