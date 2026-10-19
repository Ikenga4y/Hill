
const grid = document.getElementById('posts');
const search = document.getElementById('search');
const filters = document.getElementById('filters');

const SUPABASE_URL = 'https://urypsodamgpsutdpsdqz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MaNeb6j9p2l0vSfZaqLEcQ_2a-5EHHO';

let data = [];
let filter = 'all';

const esc = s =>
  String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

const categoryKey = category =>
  String(category || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function render() {
  const q = search.value.toLowerCase().trim();

  const shown = data.filter(p =>
    (filter === 'all' || p.categoryKey === filter) &&
    (!q || [
      p.title, p.category, p.excerpt, p.body
    ].join(' ').toLowerCase().includes(q))
  );

  grid.innerHTML = shown.map(p => `
    <article class="card">
      <a href="article.html?id=${encodeURIComponent(p.id)}">
        <img
          src="${esc(p.image)}"
          alt="${esc(p.category)} cover"
          loading="lazy"
        >
      </a>
      <div class="card-content">
        <div class="meta">
          ${esc(p.category)} · ${esc(p.readTime)}
        </div>
        <h3>
          <a href="article.html?id=${encodeURIComponent(p.id)}">
            ${esc(p.title)}
          </a>
        </h3>
        <p>${esc(p.excerpt)}</p>
        <a href="article.html?id=${encodeURIComponent(p.id)}">
          Read story ↗
        </a>
      </div>
    </article>
  `).join('');

  document.getElementById('empty').hidden = shown.length > 0;
}

search.addEventListener('input', render);

filters.addEventListener('click', e => {
  const b = e.target.closest('[data-filter]');
  if (!b) return;

  filter = b.dataset.filter;

  filters.querySelectorAll('button').forEach(x =>
    x.classList.toggle('active', x === b)
  );

  render();
});

document.querySelectorAll('[data-category]').forEach(b =>
  b.addEventListener('click', () => {
    filter = b.dataset.category;

    filters.querySelectorAll('button').forEach(x =>
      x.classList.toggle('active', x.dataset.filter === filter)
    );

    document.getElementById('latest')
      .scrollIntoView({ behavior: 'smooth' });

    render();
  })
);

document.getElementById('year').textContent =
  new Date().getFullYear();

async function loadPosts() {
  try {
    if (
      SUPABASE_URL.includes('PASTE_YOUR') ||
      SUPABASE_KEY.includes('PASTE_YOUR')
    ) {
      throw new Error('Add your Supabase URL and public key in script.js.');
    }

    const columns = [
      'id', 'title', 'slug', 'excerpt', 'content',
      'image_url', 'category', 'author', 'status',
      'published_at'
    ].join(',');

    const endpoint =
      `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/articles` +
      `?select=${columns}` +
      '&status=eq.published' +
      '&order=published_at.desc.nullslast';

    const response = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}. Check the public key, table permissions and status value.`
      );
    }

    const posts = await response.json();

    data = posts.map(p => {
      const words = String(p.content || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        body: p.content,
        image: p.image_url,
        category: p.category,
        categoryKey: categoryKey(p.category),
        author: p.author,
        readTime: `${Math.max(1, Math.ceil(words / 200))} min read`
      };
    });

    render();
  } catch (error) {
    console.error('TrendNova loading error:', error);
    grid.textContent =
      'Could not load articles. Check the Supabase connection and permissions.';
  }
}

loadPosts();
