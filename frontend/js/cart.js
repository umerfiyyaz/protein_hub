// ============================================================
// PROTEIN HUB — CART LOGIC (Shared)
// ============================================================

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("ph_cart") || "[]");
    this.init();
  }

  init() {
    this.updateBadge();
    document
      .getElementById("cartIcon")
      ?.addEventListener("click", () => this.openCart());
    document
      .getElementById("closeCart")
      ?.addEventListener("click", () => this.closeCart());
    document
      .getElementById("cartOverlay")
      ?.addEventListener("click", () => this.closeCart());
    this.renderCartItems();
  }

  save() {
    localStorage.setItem("ph_cart", JSON.stringify(this.items));
    this.updateBadge();
    this.renderCartItems();
  }

  add(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
    showToast(`✅ ${product.name} added to cart!`);
    this.openCart();
  }

  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.save();
  }

  updateQty(id, delta) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.remove(id);
    else this.save();
  }

  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  updateBadge() {
    const badge = document.getElementById("cartBadge");
    if (badge) badge.textContent = this.count;
  }

  openCart() {
    document.getElementById("cartSidebar")?.classList.add("open");
    document.getElementById("cartOverlay")?.classList.add("active");
  }

  closeCart() {
    document.getElementById("cartSidebar")?.classList.remove("open");
    document.getElementById("cartOverlay")?.classList.remove("active");
  }

  renderCartItems() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div style="font-size:3rem">🛒</div>
          <p>Your cart is empty</p>
        </div>`;
    } else {
      container.innerHTML = this.items
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item__emoji">${item.emoji}</div>
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">Rs. ${(item.price * item.qty).toLocaleString()}</div>
          </div>
          <div class="cart-item__qty">
            <button class="qty-btn" onclick="cart.updateQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="cart.updateQty(${item.id}, 1)">+</button>
          </div>
        </div>`,
        )
        .join("");
    }

    if (totalEl) totalEl.textContent = `Rs. ${this.total.toLocaleString()}`;
  }
}

// Global toast helper
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// Init cart globally
const cart = new Cart();
