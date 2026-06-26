// ============================================================
// PROTEIN HUB — PRODUCT DETAIL PAGE JS
// ============================================================

document.getElementById("navToggle")?.addEventListener("click", () => {
  document.getElementById("navLinks")?.classList.toggle("open");
});

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

let qty = 1;

function render() {
  const products = getProducts();
  const p = products.find((pr) => pr.id === productId);

  if (!p) {
    document.getElementById("productMain").innerHTML = `
      <div class="container" style="padding:80px 0;text-align:center">
        <h2>Product not found 😔</h2>
        <a href="../index.html" class="btn btn--primary mt-24">Go Home</a>
      </div>`;
    return;
  }

  document.title = `${p.name} – Protein Hub`;

  const savings = p.oldPrice ? p.oldPrice - p.price : 0;
  const related = products
    .filter((pr) => pr.category === p.category && pr.id !== p.id)
    .slice(0, 3);

  document.getElementById("productMain").innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a> › <a href="../index.html#products">Products</a> › ${p.name}
      </div>
    </div>

    <section class="product-detail">
      <div class="container">
        <div class="product-detail__grid">
          <!-- Visual -->
          <div class="product-visual">${p.emoji}</div>

          <!-- Info -->
          <div class="product-info">
            ${p.badge ? `<span class="product-info__badge product-info__badge--${p.badgeType}">${p.badge}</span>` : ""}
            <h1 class="product-info__name">${p.name}</h1>
            <p class="product-info__tagline">${p.tagline}</p>
            <div class="product-info__rating">
              <span class="stars">${"★".repeat(Math.floor(p.rating))}${p.rating % 1 ? "☆" : ""}</span>
              <span style="font-weight:700">${p.rating}</span>
              <span class="review-count">(${p.reviews} reviews)</span>
            </div>

            <div class="product-info__price">
              Rs. ${p.price.toLocaleString()}
              ${p.oldPrice ? `<span class="old-price">Rs. ${p.oldPrice.toLocaleString()}</span>` : ""}
            </div>
            ${savings > 0 ? `<div class="product-info__savings">🎉 You save Rs. ${savings.toLocaleString()}!</div>` : ""}

            <p class="product-info__desc">${p.description}</p>

            <!-- Macros -->
            <div class="macros">
              <div class="macro-item"><div class="macro-item__val">${p.protein}</div><div class="macro-item__label">Protein</div></div>
              <div class="macro-item"><div class="macro-item__val">${p.calories}</div><div class="macro-item__label">Calories</div></div>
              <div class="macro-item"><div class="macro-item__val">${p.fat}</div><div class="macro-item__label">Fat</div></div>
              <div class="macro-item"><div class="macro-item__val">${p.carbs}</div><div class="macro-item__label">Carbs</div></div>
            </div>

            <!-- Features -->
            <div class="product-features">
              ${p.features.map((f) => `<span class="feature-tag">✓ ${f}</span>`).join("")}
              <span class="feature-tag">📦 ${p.weight}</span>
            </div>

            <!-- Quantity + CTA -->
            <div class="product-purchase">
              <div class="qty-control">
                <button onclick="changeQty(-1)">−</button>
                <span id="qtyDisplay">1</span>
                <button onclick="changeQty(1)">+</button>
              </div>
              <button class="btn btn--primary btn--lg" onclick="addCurrentToCart()">
                <i class="fas fa-cart-plus"></i> Add to Cart
              </button>
            </div>

            <div class="stock-info ${p.stock < 20 ? "low" : ""}">
              ${p.stock < 20 ? `⚠️ Only ${p.stock} left in stock!` : `✅ In Stock (${p.stock} available)`}
            </div>

            <!-- Ingredients -->
            <div class="ingredients-box">
              <h4>Ingredients</h4>
              <p>${p.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    ${
      related.length
        ? `
    <section class="related-products">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">You May Also Like</span>
          <h2 class="section-title">More <span class="highlight">Great</span> Products</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px">
          ${related
            .map(
              (rp) => `
            <div class="product-card" onclick="window.location.href='product.html?id=${rp.id}'" style="cursor:pointer">
              <div class="product-card__img" style="height:160px;font-size:4rem">
                ${rp.emoji}
              </div>
              <div class="product-card__body">
                <div class="product-card__name">${rp.name}</div>
                <div class="product-card__desc">${rp.tagline}</div>
                <div class="product-card__meta">
                  <div class="product-card__price">Rs. ${rp.price.toLocaleString()}</div>
                  <div class="product-card__rating">★ ${rp.rating}</div>
                </div>
                <button class="btn btn--primary btn--sm" style="width:100%" onclick="event.stopPropagation();addRelatedToCart(${rp.id})">
                  Add to Cart
                </button>
              </div>
            </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`
        : ""
    }
  `;
}

function changeQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById("qtyDisplay").textContent = qty;
}

function addCurrentToCart() {
  const products = getProducts();
  const p = products.find((pr) => pr.id === productId);
  if (!p) return;
  for (let i = 0; i < qty; i++) cart.add(p);
}

function addRelatedToCart(id) {
  const products = getProducts();
  const p = products.find((pr) => pr.id === id);
  if (p) cart.add(p);
}

render();
