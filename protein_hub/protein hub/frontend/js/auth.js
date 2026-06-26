// ============================================================
// PROTEIN HUB — AUTH JS (Login & Signup)
// ============================================================

// Simple user storage helpers
function getUsers() {
  return JSON.parse(localStorage.getItem("ph_users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("ph_users", JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem("ph_current_user", JSON.stringify(user));
}

// Seed an admin user on first load
(function seedAdmin() {
  const users = getUsers();
  if (!users.find((u) => u.email === "admin@proteinhub.pk")) {
    users.push({
      id: "admin-001",
      name: "Admin",
      email: "admin@proteinhub.pk",
      password: "admin123",
      role: "admin",
      joinedAt: new Date().toISOString(),
    });
    saveUsers(users);
  }
})();

// Toast helper for auth pages (no cart on these pages)
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---- PASSWORD TOGGLE ----
document.querySelectorAll('[id^="togglePw"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.closest(".input-icon-wrap").querySelector("input");
    const icon = btn.querySelector("i");
    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});

// ============================================================
// LOGIN FORM
// ============================================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Validate email
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      email.classList.add("error");
      document.getElementById("emailError").classList.add("show");
      valid = false;
    } else {
      email.classList.remove("error");
      document.getElementById("emailError").classList.remove("show");
    }

    // Validate password
    if (!password.value) {
      password.classList.add("error");
      document.getElementById("passwordError").classList.add("show");
      valid = false;
    } else {
      password.classList.remove("error");
      document.getElementById("passwordError").classList.remove("show");
    }

    if (!valid) return;

    const users = getUsers();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.value.toLowerCase() &&
        u.password === password.value,
    );

    if (!user) {
      document.getElementById("loginError").classList.remove("hidden");
      document.getElementById("loginErrorMsg").textContent =
        "Invalid email or password.";
      return;
    }

    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("loginSuccess").classList.remove("hidden");
    setCurrentUser(user);

    // Track login for admin dashboard
    const users2 = getUsers();
    const idx = users2.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users2[idx].lastLogin = new Date().toISOString();
      saveUsers(users2);
    }

    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "../index.html";
      }
    }, 1200);
  });
}

// ============================================================
// SIGNUP FORM
// ============================================================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  const pwInput = document.getElementById("signupPassword");

  // Password strength meter
  if (pwInput) {
    pwInput.addEventListener("input", function () {
      const val = this.value;
      let strength = 0;
      if (val.length >= 6) strength++;
      if (val.length >= 10) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      const fill = document.getElementById("pwStrengthFill");
      const label = document.getElementById("pwStrengthLabel");
      const colors = [
        "",
        "#EF4444",
        "#F97316",
        "#F5C800",
        "#22C55E",
        "#16A34A",
      ];
      const labels = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

      if (fill && label) {
        fill.style.width = strength * 20 + "%";
        fill.style.background = colors[strength] || "#E5E7EB";
        label.textContent = labels[strength] || "";
      }
    });
  }

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("signupName");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const confirm = document.getElementById("signupConfirm");
    const terms = document.getElementById("terms");

    function setErr(input, errId, msg, show) {
      if (show) {
        input.classList.add("error");
        const el = document.getElementById(errId);
        if (el) {
          el.textContent = msg;
          el.classList.add("show");
        }
        valid = false;
      } else {
        input.classList.remove("error");
        const el = document.getElementById(errId);
        if (el) el.classList.remove("show");
      }
    }

    setErr(name, "nameError", "Please enter your name.", !name?.value.trim());
    setErr(
      email,
      "signupEmailError",
      "Please enter a valid email.",
      !email?.value || !/\S+@\S+\.\S+/.test(email.value),
    );
    setErr(
      password,
      "signupPasswordError",
      "Password must be at least 6 characters.",
      !password?.value || password.value.length < 6,
    );
    setErr(
      confirm,
      "signupConfirmError",
      "Passwords do not match.",
      !confirm?.value || confirm.value !== password?.value,
    );

    if (terms && !terms.checked) {
      document.getElementById("termsError")?.classList.add("show");
      valid = false;
    } else {
      document.getElementById("termsError")?.classList.remove("show");
    }

    if (!valid) return;

    const users = getUsers();
    if (
      users.find((u) => u.email.toLowerCase() === email.value.toLowerCase())
    ) {
      document.getElementById("signupEmailError").textContent =
        "This email is already registered.";
      document.getElementById("signupEmailError").classList.add("show");
      email.classList.add("error");
      return;
    }

    const newUser = {
      id: "user-" + Date.now(),
      name: name.value.trim(),
      email: email.value.toLowerCase(),
      password: password.value,
      role: "customer",
      joinedAt: new Date().toISOString(),
      orders: [],
    };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);

    document.getElementById("signupSuccess")?.classList.remove("hidden");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1200);
  });
}
