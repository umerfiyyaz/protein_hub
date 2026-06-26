// ============================================================
// PROTEIN HUB — HOME PAGE JS
// ============================================================

// Mobile nav toggle
document.getElementById("navToggle")?.addEventListener("click", () => {
  document.getElementById("navLinks")?.classList.toggle("open");
});

// Sticky header shadow
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) {
    header.style.boxShadow =
      window.scrollY > 10
        ? "0 4px 20px rgba(0,0,0,.15)"
        : "0 2px 16px rgba(0,0,0,.08)";
  }
});

// ---- COUNTDOWN TIMER ----
(function startTimer() {
  const end =
    new Date().getTime() + 12 * 60 * 60 * 1000 + 34 * 60 * 1000 + 56 * 1000;
  const tick = setInterval(() => {
    const now = new Date().getTime();
    const diff = end - now;
    if (diff <= 0) {
      clearInterval(tick);
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("hours").textContent = String(h).padStart(2, "0");
    document.getElementById("minutes").textContent = String(m).padStart(2, "0");
    document.getElementById("seconds").textContent = String(s).padStart(2, "0");
  }, 1000);
})();

// ---- PRODUCTS GRID ----
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const products = getProducts();
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (p) => `
    <div class="product-card" data-id="${p.id}" onclick="goToProduct(${p.id})">
      <div class="product-card__img">
        ${p.badgeType ? `<span class="product-card__badge product-card__badge--${p.badgeType}">${p.badge}</span>` : ""}
        <span style="font-size:5rem">${p.emoji}</span>
      </div>
      <div class="product-card__body">
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__desc">${p.tagline}</div>
        <div class="product-card__meta">
          <div class="product-card__price">
            Rs. ${p.price.toLocaleString()}
            ${p.oldPrice ? `<span class="old-price">Rs. ${p.oldPrice.toLocaleString()}</span>` : ""}
          </div>
          <div class="product-card__rating">★ ${p.rating} (${p.reviews})</div>
        </div>
        <div style="font-size:.82rem;color:var(--gray);margin-bottom:14px;">
          💪 ${p.protein} protein | 📦 ${p.weight}
        </div>
        <div class="product-card__actions">
          <button class="btn btn--outline btn--sm" onclick="event.stopPropagation(); goToProduct(${p.id})">Details</button>
          <button class="btn btn--primary btn--sm" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>`,
    )
    .join("");
}

function goToProduct(id) {
  window.location.href = `pages/product.html?id=${id}`;
}

function addToCart(id) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  if (product) cart.add(product);
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// Initial render
renderProducts();

// ---- INTERSECTION OBSERVER (Fade-in on scroll) ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".feature-card, .testi-card, .promo-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
    observer.observe(el);
  });
