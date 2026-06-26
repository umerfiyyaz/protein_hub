// ============================================================
// PROTEIN HUB — CONTACT PAGE JS
// ============================================================

document.getElementById("navToggle")?.addEventListener("click", () => {
  document.getElementById("navLinks")?.classList.toggle("open");
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---- CONTACT FORM ----
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    function validate(id, errId, condition, msg) {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      if (condition) {
        el?.classList.add("error");
        if (err) {
          err.textContent = msg;
          err.classList.add("show");
        }
        valid = false;
      } else {
        el?.classList.remove("error");
        err?.classList.remove("show");
      }
    }

    const name = document.getElementById("cName")?.value.trim();
    const email = document.getElementById("cEmail")?.value;
    const subject = document.getElementById("cSubject")?.value;
    const message = document.getElementById("cMessage")?.value.trim();

    validate("cName", "cNameError", !name, "Name is required.");
    validate(
      "cEmail",
      "cEmailError",
      !email || !/\S+@\S+\.\S+/.test(email),
      "Valid email is required.",
    );
    validate("cSubject", "cSubjectError", !subject, "Please select a subject.");
    validate(
      "cMessage",
      "cMessageError",
      !message || message.length < 20,
      "Message must be at least 20 characters.",
    );

    if (!valid) return;

    // Save message to localStorage (for admin to view)
    const messages = JSON.parse(localStorage.getItem("ph_messages") || "[]");
    messages.push({
      id: "msg-" + Date.now(),
      name,
      email,
      subject,
      message,
      sentAt: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem("ph_messages", JSON.stringify(messages));

    document.getElementById("contactSuccess").classList.remove("hidden");
    document.getElementById("contactForm").reset();
    showToast("✅ Message sent successfully!");
    setTimeout(
      () => document.getElementById("contactSuccess").classList.add("hidden"),
      5000,
    );
  });

// ---- FAQ ACCORDION ----
const faqs = [
  {
    q: "What are the ingredients in your peanut butter?",
    a: "Our classic range uses 100% dry-roasted peanuts with no additives. Our whey blends add whey protein isolate and natural sweeteners. Full ingredient lists are on each product page.",
  },
  {
    q: "Is your peanut butter suitable for vegans?",
    a: "Our classic range and flavoured varieties are 100% vegan. Our whey protein blends contain dairy (whey), so they are not suitable for vegans but are vegetarian-friendly.",
  },
  {
    q: "How long does shipping take?",
    a: "We dispatch all orders within 24 hours on business days. Delivery within Islamabad and Rawalpindi takes 1–2 days. Other cities take 2–4 business days.",
  },
  {
    q: "Do you offer wholesale or bulk pricing?",
    a: "Yes! We offer special pricing for gyms, supplement stores, and bulk buyers. Contact us via the form above or WhatsApp us directly to discuss your requirements.",
  },
  {
    q: "How should I store peanut butter?",
    a: "Store in a cool, dry place away from direct sunlight. Once opened, refrigerate to extend shelf life to 3 months. Natural separation is normal — just stir it back in.",
  },
  {
    q: "What is your return policy?",
    a: "If you receive a damaged or incorrect product, contact us within 48 hours of delivery. We'll arrange a replacement or full refund. We don't accept returns on opened food products.",
  },
];

const faqList = document.getElementById("faqList");
if (faqList) {
  faqList.innerHTML = faqs
    .map(
      (f, i) => `
    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(${i})" id="faqQ-${i}">
        ${f.q}
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-answer" id="faqA-${i}">${f.a}</div>
    </div>`,
    )
    .join("");
}

function toggleFaq(i) {
  const q = document.getElementById(`faqQ-${i}`);
  const a = document.getElementById(`faqA-${i}`);
  const isOpen = a.classList.contains("open");

  // Close all
  document
    .querySelectorAll(".faq-question")
    .forEach((el) => el.classList.remove("open"));
  document
    .querySelectorAll(".faq-answer")
    .forEach((el) => el.classList.remove("open"));

  if (!isOpen) {
    q.classList.add("open");
    a.classList.add("open");
  }
}
