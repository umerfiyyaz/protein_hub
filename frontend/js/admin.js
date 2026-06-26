// ============================================================
// PROTEIN HUB — ADMIN PANEL JS
// ============================================================

// ---- AUTH GUARD ----
function adminLogout() {
  localStorage.removeItem("ph_current_user");
  window.location.href = "login.html";
}

// Check if admin is logged in
const currentUser = JSON.parse(
  localStorage.getItem("ph_current_user") || "null",
);
if (!currentUser || currentUser.role !== "admin") {
  // Allow access for demo purposes but show warning
  console.warn(
    "Not logged in as admin. For full security, login as admin first.",
  );
}

// Set admin name in topbar
if (currentUser) {
  document.getElementById("adminName").textContent =
    currentUser.name || "Admin";
  document.querySelector(".topbar-avatar").textContent = (currentUser.name ||
    "A")[0].toUpperCase();
}

// ---- SIDEBAR TOGGLE (mobile) ----
document.getElementById("sidebarToggle")?.addEventListener("click", () => {
  document.getElementById("adminSidebar").classList.toggle("open");
});

// ---- TOAST ----
function showToast(msg, type = "dark") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.style.background =
    type === "success" ? "#22C55E" : type === "error" ? "#EF4444" : "#1A1000";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---- SEED DEMO DATA ----
function seedDemoData() {
  // Seed demo orders if none exist
  if (!localStorage.getItem("ph_orders")) {
    const products = getProducts();
    const demoOrders = [
      {
        id: "ORD-001",
        customer: "Ahmad Khan",
        email: "ahmad@email.com",
        phone: "0300-1234567",
        address: "F-7, Islamabad",
        items: [{ name: "Classic Crunch", qty: 2, price: 1299 }],
        total: 2598,
        status: "delivered",
        date: "2025-06-10T10:30:00Z",
      },
      {
        id: "ORD-002",
        customer: "Sara Raza",
        email: "sara@email.com",
        phone: "0301-7654321",
        address: "DHA Phase 2, Islamabad",
        items: [
          { name: "Chocolate Whey Crunch", qty: 1, price: 1799 },
          { name: "Smooth Velvet", qty: 1, price: 1299 },
        ],
        total: 3098,
        status: "shipped",
        date: "2025-06-15T14:00:00Z",
      },
      {
        id: "ORD-003",
        customer: "Usman Farooq",
        email: "usman@email.com",
        phone: "0333-9876543",
        address: "Gulshan, Karachi",
        items: [{ name: "Gym Bundle Pack", qty: 1, price: 3999 }],
        total: 3999,
        status: "confirmed",
        date: "2025-06-20T09:00:00Z",
      },
      {
        id: "ORD-004",
        customer: "Fatima Malik",
        email: "fatima@email.com",
        phone: "0312-1122334",
        address: "Model Town, Lahore",
        items: [{ name: "Honey Almond Twist", qty: 2, price: 1499 }],
        total: 2998,
        status: "pending",
        date: "2025-06-25T16:45:00Z",
      },
      {
        id: "ORD-005",
        customer: "Bilal Ahmed",
        email: "bilal@email.com",
        phone: "0321-5566778",
        address: "Bahria Town, Rawalpindi",
        items: [
          { name: "Dark Cocoa Smooth", qty: 1, price: 1549 },
          { name: "Classic Crunch", qty: 1, price: 1299 },
        ],
        total: 2848,
        status: "pending",
        date: "2025-06-26T08:20:00Z",
      },
    ];
    localStorage.setItem("ph_orders", JSON.stringify(demoOrders));
  }

  // Seed demo users if only admin exists
  const users = JSON.parse(localStorage.getItem("ph_users") || "[]");
  if (users.length <= 1) {
    const demoUsers = [
      {
        id: "user-001",
        name: "Ahmad Khan",
        email: "ahmad@email.com",
        password: "pass123",
        role: "customer",
        joinedAt: "2025-05-01T10:00:00Z",
        lastLogin: "2025-06-10T10:30:00Z",
      },
      {
        id: "user-002",
        name: "Sara Raza",
        email: "sara@email.com",
        password: "pass123",
        role: "customer",
        joinedAt: "2025-05-15T09:00:00Z",
        lastLogin: "2025-06-15T14:00:00Z",
      },
      {
        id: "user-003",
        name: "Usman Farooq",
        email: "usman@email.com",
        password: "pass123",
        role: "customer",
        joinedAt: "2025-06-01T11:00:00Z",
        lastLogin: "2025-06-20T09:00:00Z",
      },
      {
        id: "user-004",
        name: "Fatima Malik",
        email: "fatima@email.com",
        password: "pass123",
        role: "customer",
        joinedAt: "2025-06-10T08:00:00Z",
        lastLogin: "2025-06-25T16:45:00Z",
      },
    ];
    const existing = users.find((u) => u.role === "admin");
    const merged = existing ? [existing, ...demoUsers] : demoUsers;
    localStorage.setItem("ph_users", JSON.stringify(merged));
  }
}

seedDemoData();

// ---- HELPER: Get data ----
function getOrders() {
  return JSON.parse(localStorage.getItem("ph_orders") || "[]");
}
function saveOrders(orders) {
  localStorage.setItem("ph_orders", JSON.stringify(orders));
}
function getUsers() {
  return JSON.parse(localStorage.getItem("ph_users") || "[]");
}
function getMessages() {
  return JSON.parse(localStorage.getItem("ph_messages") || "[]");
}
function saveMessages(msgs) {
  localStorage.setItem("ph_messages", JSON.stringify(msgs));
}

// ---- UPDATE MESSAGE BADGE ----
function updateMsgBadge() {
  const unread = getMessages().filter((m) => !m.read).length;
  const badge = document.getElementById("msgBadge");
  if (badge) badge.textContent = unread > 0 ? unread : "";
}
updateMsgBadge();

// ---- FORMAT DATE ----
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ============================================================
// TAB NAVIGATION
// ============================================================
let currentTab = "dashboard";

function switchTab(tab) {
  currentTab = tab;

  // Update nav items
  document.querySelectorAll(".admin-nav__item").forEach((item) => {
    item.classList.toggle("active", item.dataset.tab === tab);
  });

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    users: "Users",
    messages: "Messages",
  };
  document.getElementById("pageTitle").textContent = titles[tab] || tab;

  // Render tab
  const main = document.getElementById("adminMain");
  switch (tab) {
    case "dashboard":
      main.innerHTML = renderDashboard();
      break;
    case "products":
      main.innerHTML = renderProducts();
      attachProductSearch();
      break;
    case "orders":
      main.innerHTML = renderOrders();
      attachOrderActions();
      break;
    case "users":
      main.innerHTML = renderUsers();
      break;
    case "messages":
      main.innerHTML = renderMessages();
      attachMessageActions();
      break;
  }
}

document.querySelectorAll(".admin-nav__item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab(item.dataset.tab);
    // Close sidebar on mobile after clicking
    document.getElementById("adminSidebar").classList.remove("open");
  });
});

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const orders = getOrders();
  const users = getUsers().filter((u) => u.role !== "admin");
  const products = getProducts();
  const messages = getMessages();

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const unreadMsgs = messages.filter((m) => !m.read).length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return `
    <!-- Stat Cards -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-card__icon">💰</div>
        <div class="stat-card__label">Total Revenue</div>
        <div class="stat-card__value">Rs. ${totalRevenue.toLocaleString()}</div>
        <div class="stat-card__change">↑ From delivered orders</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon">📦</div>
        <div class="stat-card__label">Total Orders</div>
        <div class="stat-card__value">${orders.length}</div>
        <div class="stat-card__change">${pendingOrders} pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon">👥</div>
        <div class="stat-card__label">Total Users</div>
        <div class="stat-card__value">${users.length}</div>
        <div class="stat-card__change">Registered customers</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon">🥜</div>
        <div class="stat-card__label">Products</div>
        <div class="stat-card__value">${products.length}</div>
        <div class="stat-card__change">${unreadMsgs} unread messages</div>
      </div>
    </div>

    <!-- Order Status Summary -->
    <div class="admin-section" style="margin-bottom:24px">
      <div class="admin-section__header"><h3>📊 Order Status Overview</h3></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px">
        ${["pending", "confirmed", "shipped", "delivered", "cancelled"]
          .map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            return `
            <div style="text-align:center;padding:16px;background:var(--gray-light);border-radius:var(--radius)">
              <div style="font-size:1.6rem;font-weight:900;color:var(--dark)">${count}</div>
              <div class="status-badge status-badge--${status}" style="margin-top:6px">${status.charAt(0).toUpperCase() + status.slice(1)}</div>
            </div>`;
          })
          .join("")}
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="admin-section">
      <div class="admin-section__header">
        <h3>🕐 Recent Orders</h3>
        <button class="btn btn--outline btn--sm" onclick="switchTab('orders')">View All</button>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${recentOrders
              .map(
                (o) => `
              <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.customer}</td>
                <td>${o.items.map((i) => i.name).join(", ")}</td>
                <td><strong>Rs. ${o.total.toLocaleString()}</strong></td>
                <td><span class="status-badge status-badge--${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
                <td>${formatDate(o.date)}</td>
              </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ============================================================
// PRODUCTS
// ============================================================
function renderProducts(search = "") {
  let products = getProducts();
  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return `
    <div class="admin-toolbar">
      <div>
        <h2 style="font-family:var(--font-display);font-weight:900;font-size:1.4rem">All Products</h2>
        <p style="color:var(--gray);font-size:.85rem">${products.length} product(s) found</p>
      </div>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <input type="text" class="admin-search" id="productSearch" placeholder="🔍  Search products..." value="${search}"/>
        <button class="btn btn--primary" onclick="openAddProduct()">
          <i class="fas fa-plus"></i> Add Product
        </button>
      </div>
    </div>

    <div class="admin-section">
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Emoji</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Protein</th>
              <th>Weight</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${
              products.length === 0
                ? `
              <tr><td colspan="9">
                <div class="empty-state">
                  <div class="empty-icon">📦</div>
                  <h3>No products found</h3>
                  <p>Try a different search or add a new product.</p>
                </div>
              </td></tr>`
                : products
                    .map(
                      (p) => `
                <tr>
                  <td class="product-emoji-cell">${p.emoji}</td>
                  <td><strong>${p.name}</strong><br/><span style="font-size:.78rem;color:var(--gray)">${p.tagline}</span></td>
                  <td><span style="text-transform:capitalize">${p.category}</span></td>
                  <td>
                    <strong>Rs. ${p.price.toLocaleString()}</strong>
                    ${p.oldPrice ? `<br/><span style="color:var(--gray);text-decoration:line-through;font-size:.8rem">Rs. ${p.oldPrice.toLocaleString()}</span>` : ""}
                  </td>
                  <td>${p.protein || "—"}</td>
                  <td>${p.weight || "—"}</td>
                  <td>
                    <span style="color:${(p.stock || 0) < 20 ? "var(--red)" : "var(--green)"};font-weight:700">
                      ${p.stock || 0}
                    </span>
                  </td>
                  <td>★ ${p.rating} <span style="color:var(--gray);font-size:.78rem">(${p.reviews})</span></td>
                  <td>
                    <div class="action-btns">
                      <button class="btn btn--outline btn--sm" onclick="openEditProduct(${p.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn--danger btn--sm" onclick="openDeleteProduct(${p.id}, '${p.name.replace(/'/g, "\\'")}')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>`,
                    )
                    .join("")
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function attachProductSearch() {
  const input = document.getElementById("productSearch");
  if (input) {
    input.addEventListener("input", () => {
      document.getElementById("adminMain").innerHTML = renderProducts(
        input.value,
      );
      attachProductSearch();
    });
  }
}

// ============================================================
// ORDERS
// ============================================================
function renderOrders(filter = "all") {
  let orders = getOrders();
  if (filter !== "all") orders = orders.filter((o) => o.status === filter);
  orders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return `
    <div class="admin-toolbar">
      <div>
        <h2 style="font-family:var(--font-display);font-weight:900;font-size:1.4rem">All Orders</h2>
        <p style="color:var(--gray);font-size:.85rem">${orders.length} order(s)</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${["all", "pending", "confirmed", "shipped", "delivered", "cancelled"]
          .map(
            (s) => `
          <button class="filter-btn ${filter === s ? "active" : ""}" onclick="filterOrders('${s}')" style="padding:7px 14px;font-size:.82rem">
            ${s.charAt(0).toUpperCase() + s.slice(1)}
          </button>`,
          )
          .join("")}
      </div>
    </div>

    <div class="admin-section">
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${
              orders.length === 0
                ? `
              <tr><td colspan="8">
                <div class="empty-state">
                  <div class="empty-icon">🛒</div>
                  <h3>No orders found</h3>
                </div>
              </td></tr>`
                : orders
                    .map(
                      (o) => `
                <tr>
                  <td><strong style="color:var(--yellow-dark)">${o.id}</strong></td>
                  <td>
                    <strong>${o.customer}</strong><br/>
                    <span style="font-size:.78rem;color:var(--gray)">${o.address}</span>
                  </td>
                  <td style="font-size:.82rem">
                    ${o.email}<br/>${o.phone || "—"}
                  </td>
                  <td style="font-size:.82rem">
                    ${o.items.map((i) => `${i.name} ×${i.qty}`).join("<br/>")}
                  </td>
                  <td><strong>Rs. ${o.total.toLocaleString()}</strong></td>
                  <td>
                    <select class="form-control" style="padding:5px 10px;font-size:.82rem;border-radius:8px;min-width:120px"
                      onchange="updateOrderStatus('${o.id}', this.value)">
                      ${[
                        "pending",
                        "confirmed",
                        "shipped",
                        "delivered",
                        "cancelled",
                      ]
                        .map(
                          (s) =>
                            `<option value="${s}" ${o.status === s ? "selected" : ""}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`,
                        )
                        .join("")}
                    </select>
                  </td>
                  <td style="font-size:.82rem">${formatDateTime(o.date)}</td>
                  <td>
                    <button class="btn btn--danger btn--sm" onclick="deleteOrder('${o.id}')">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>`,
                    )
                    .join("")
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

let currentOrderFilter = "all";

function filterOrders(filter) {
  currentOrderFilter = filter;
  document.getElementById("adminMain").innerHTML = renderOrders(filter);
  attachOrderActions();
}

function attachOrderActions() {
  // Already handled by inline onclick
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = newStatus;
    saveOrders(orders);
    showToast(`✅ Order ${orderId} updated to "${newStatus}"`, "success");
  }
}

function deleteOrder(orderId) {
  if (!confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
  const orders = getOrders().filter((o) => o.id !== orderId);
  saveOrders(orders);
  showToast(`🗑️ Order ${orderId} deleted`, "error");
  document.getElementById("adminMain").innerHTML =
    renderOrders(currentOrderFilter);
  attachOrderActions();
}

// ============================================================
// USERS
// ============================================================
function renderUsers() {
  const users = getUsers().filter((u) => u.role !== "admin");

  return `
    <div class="admin-toolbar">
      <div>
        <h2 style="font-family:var(--font-display);font-weight:900;font-size:1.4rem">All Users</h2>
        <p style="color:var(--gray);font-size:.85rem">${users.length} registered customer(s)</p>
      </div>
    </div>

    <div class="admin-section">
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Last Login</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            ${
              users.length === 0
                ? `
              <tr><td colspan="6">
                <div class="empty-state">
                  <div class="empty-icon">👥</div>
                  <h3>No users yet</h3>
                  <p>Users will appear here after they sign up.</p>
                </div>
              </td></tr>`
                : users
                    .map((u) => {
                      const orders = getOrders().filter(
                        (o) => o.email === u.email,
                      );
                      return `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:10px">
                        <div class="user-avatar">${(u.name || "U")[0].toUpperCase()}</div>
                        <strong>${u.name}</strong>
                      </div>
                    </td>
                    <td>${u.email}</td>
                    <td><span class="status-badge status-badge--confirmed">Customer</span></td>
                    <td>${formatDate(u.joinedAt)}</td>
                    <td>${u.lastLogin ? formatDateTime(u.lastLogin) : "—"}</td>
                    <td><strong>${orders.length}</strong> order(s)</td>
                  </tr>`;
                    })
                    .join("")
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ============================================================
// MESSAGES
// ============================================================
function renderMessages() {
  const messages = getMessages().sort(
    (a, b) => new Date(b.sentAt) - new Date(a.sentAt),
  );
  const unread = messages.filter((m) => !m.read).length;

  return `
    <div class="admin-toolbar">
      <div>
        <h2 style="font-family:var(--font-display);font-weight:900;font-size:1.4rem">Contact Messages</h2>
        <p style="color:var(--gray);font-size:.85rem">${messages.length} message(s) — ${unread} unread</p>
      </div>
      ${unread > 0 ? `<button class="btn btn--outline btn--sm" onclick="markAllRead()">Mark All Read</button>` : ""}
    </div>

    <div class="admin-section">
      ${
        messages.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-icon">📬</div>
          <h3>No messages yet</h3>
          <p>Messages from the contact form will appear here.</p>
        </div>`
          : messages
              .map(
                (m) => `
          <div class="message-card ${m.read ? "" : "unread"}" id="msg-${m.id}">
            <div class="message-card__header">
              <div>
                <span class="message-card__from">${m.name}</span>
                ${!m.read ? '<span class="status-badge status-badge--pending" style="margin-left:8px;font-size:.7rem">NEW</span>' : ""}
              </div>
              <div style="display:flex;align-items:center;gap:10px">
                <span class="message-card__date">${formatDateTime(m.sentAt)}</span>
                ${!m.read ? `<button class="btn btn--success btn--sm" onclick="markRead('${m.id}')">Mark Read</button>` : ""}
                <button class="btn btn--danger btn--sm" onclick="deleteMessage('${m.id}')"><i class="fas fa-trash"></i></button>
              </div>
            </div>
            <div class="message-card__subject">📌 ${m.subject} | ✉️ ${m.email}</div>
            <div class="message-card__body">${m.message}</div>
          </div>`,
              )
              .join("")
      }
    </div>
  `;
}

function attachMessageActions() {
  // inline onclick handles it
}

function markRead(id) {
  const msgs = getMessages();
  const idx = msgs.findIndex((m) => m.id === id);
  if (idx !== -1) {
    msgs[idx].read = true;
    saveMessages(msgs);
  }
  updateMsgBadge();
  document.getElementById("adminMain").innerHTML = renderMessages();
}

function markAllRead() {
  const msgs = getMessages().map((m) => ({ ...m, read: true }));
  saveMessages(msgs);
  updateMsgBadge();
  document.getElementById("adminMain").innerHTML = renderMessages();
  showToast("✅ All messages marked as read", "success");
}

function deleteMessage(id) {
  const msgs = getMessages().filter((m) => m.id !== id);
  saveMessages(msgs);
  updateMsgBadge();
  document.getElementById("adminMain").innerHTML = renderMessages();
  showToast("🗑️ Message deleted", "error");
}

// ============================================================
// PRODUCT MODAL (Add / Edit)
// ============================================================
let editingProductId = null;

function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("productModal").classList.add("active");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.getElementById("productModal").classList.remove("active");
  document.getElementById("productForm").reset();
  editingProductId = null;
}

function openAddProduct() {
  editingProductId = null;
  document.getElementById("modalTitle").textContent = "➕ Add New Product";
  document.getElementById("saveProductBtn").textContent = "Add Product";
  document.getElementById("productForm").reset();
  openModal();
}

function openEditProduct(id) {
  const products = getProducts();
  const p = products.find((pr) => pr.id === id);
  if (!p) return;
  editingProductId = id;

  document.getElementById("modalTitle").textContent = "✏️ Edit Product";
  document.getElementById("saveProductBtn").textContent = "Save Changes";

  // Fill form
  document.getElementById("pName").value = p.name || "";
  document.getElementById("pEmoji").value = p.emoji || "";
  document.getElementById("pTagline").value = p.tagline || "";
  document.getElementById("pDesc").value = p.description || "";
  document.getElementById("pPrice").value = p.price || "";
  document.getElementById("pOldPrice").value = p.oldPrice || "";
  document.getElementById("pCategory").value = p.category || "classic";
  document.getElementById("pWeight").value = p.weight || "";
  document.getElementById("pProtein").value = p.protein || "";
  document.getElementById("pCalories").value = p.calories || "";
  document.getElementById("pStock").value = p.stock || "";
  document.getElementById("pBadge").value = p.badge || "";
  document.getElementById("pFeatures").value = (p.features || []).join(", ");
  document.getElementById("pIngredients").value = p.ingredients || "";

  openModal();
}

function saveProduct() {
  const name = document.getElementById("pName").value.trim();
  const emoji = document.getElementById("pEmoji").value.trim();
  const price = parseFloat(document.getElementById("pPrice").value);

  if (!name || !emoji || !price) {
    showToast("❌ Please fill in Name, Emoji, and Price", "error");
    return;
  }

  const badge = document.getElementById("pBadge").value.trim();
  const featuresRaw = document.getElementById("pFeatures").value;
  const features = featuresRaw
    ? featuresRaw
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];
  const oldPriceVal = parseFloat(document.getElementById("pOldPrice").value);

  const productData = {
    name,
    emoji,
    tagline: document.getElementById("pTagline").value.trim() || name,
    description: document.getElementById("pDesc").value.trim() || "",
    price,
    oldPrice: isNaN(oldPriceVal) || oldPriceVal <= 0 ? null : oldPriceVal,
    category: document.getElementById("pCategory").value,
    weight: document.getElementById("pWeight").value.trim() || "500g",
    protein: document.getElementById("pProtein").value.trim() || "—",
    calories: document.getElementById("pCalories").value.trim() || "—",
    fat: "—",
    carbs: "—",
    stock: parseInt(document.getElementById("pStock").value) || 50,
    badge: badge || null,
    badgeType: badge
      ? badge.toLowerCase().includes("new")
        ? "new"
        : "hot"
      : null,
    rating: 4.5,
    reviews: 0,
    features,
    ingredients: document.getElementById("pIngredients").value.trim() || name,
  };

  const products = getProducts();

  if (editingProductId) {
    // Edit
    const idx = products.findIndex((p) => p.id === editingProductId);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...productData };
      showToast(`✅ "${name}" updated successfully!`, "success");
    }
  } else {
    // Add
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    products.push({ id: maxId + 1, ...productData });
    showToast(`✅ "${name}" added successfully!`, "success");
  }

  saveProducts(products);
  closeModal();
  document.getElementById("adminMain").innerHTML = renderProducts();
  attachProductSearch();
}

// ============================================================
// DELETE PRODUCT
// ============================================================
let deleteTargetId = null;

function openDeleteProduct(id, name) {
  deleteTargetId = id;
  document.getElementById("deleteProductName").textContent = name;
  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("deleteModal").classList.add("active");
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById("modalOverlay").classList.remove("active");
  document.getElementById("deleteModal").classList.remove("active");
}

function confirmDelete() {
  if (!deleteTargetId) return;
  const products = getProducts().filter((p) => p.id !== deleteTargetId);
  saveProducts(products);
  showToast("🗑️ Product deleted successfully", "error");
  closeDeleteModal();
  document.getElementById("adminMain").innerHTML = renderProducts();
  attachProductSearch();
}

// Click overlay to close any modal
document.getElementById("modalOverlay")?.addEventListener("click", () => {
  closeModal();
  closeDeleteModal();
});

// ---- FILTER BUTTON STYLES (reuse from main) ----
const style = document.createElement("style");
style.textContent = `
  .filter-btn {
    padding: 7px 16px;
    border-radius: 50px;
    border: 2px solid var(--yellow-dark);
    background: transparent;
    color: var(--yellow-dark);
    font-weight: 600;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: .82rem;
    transition: .25s ease;
  }
  .filter-btn.active, .filter-btn:hover {
    background: var(--yellow);
    border-color: var(--yellow);
    color: var(--dark);
  }
`;
document.head.appendChild(style);

// ---- INIT: Load Dashboard ----
switchTab("dashboard");
