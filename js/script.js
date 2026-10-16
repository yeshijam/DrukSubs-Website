// DrukSubs website interactions.
// Update BUSINESS_WHATSAPP to the business number in international format, digits only.
// Example: Bhutan +975 number => 975XXXXXXXX (do not include +, spaces, or dashes).
const BUSINESS_WHATSAPP = "REPLACE_WITH_WHATSAPP_NUMBER";
const BUSINESS_EMAIL = "hello@druksubs.example"; // Replace before launch.

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const orderDialog = document.querySelector("#orderDialog");
const orderProduct = document.querySelector("#orderProduct");
const orderForm = document.querySelector("#orderForm");
const orderStatus = document.querySelector("#orderStatus");
const formStatus = document.querySelector("#formStatus");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelectorAll(".filter-pill").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

function openOrder(product) {
  orderForm.reset();
  orderStatus.textContent = "";
  orderProduct.value = product;
  if (typeof orderDialog.showModal === "function") {
    orderDialog.showModal();
  } else {
    orderDialog.setAttribute("open", "");
  }
  document.querySelector("#orderName").focus();
}

document.querySelectorAll(".product-order").forEach(button => {
  button.addEventListener("click", () => openOrder(button.dataset.product));
});

document.querySelector("#closeDialog").addEventListener("click", () => orderDialog.close());
orderDialog.addEventListener("click", event => {
  if (event.target === orderDialog) orderDialog.close();
});

function whatsappUrl(message) {
  const number = BUSINESS_WHATSAPP.replace(/\D/g, "");
  if (!number || number === "REPLACE_WITH_WHATSAPP_NUMBER") return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function launchWhatsApp(message, statusNode) {
  const url = whatsappUrl(message);
  if (!url) {
    statusNode.textContent = "WhatsApp is not configured yet. Add your business number in js/script.js, then try again. Your message has not been sent.";
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
  statusNode.textContent = "WhatsApp opened with your message prepared. Please review and press Send in WhatsApp.";
}

orderForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!orderForm.reportValidity()) return;
  const data = new FormData(orderForm);
  const message = [
    "Hello DrukSubs! I would like to request a subscription.",
    `Service: ${data.get("product")}`,
    `Plan/duration: ${data.get("plan") || "Not specified"}`,
    `Name: ${data.get("name")}`,
    `Contact: ${data.get("contact")}`,
    `Additional details: ${data.get("notes") || "None"}`,
    "",
    "I understand this is a request and is not confirmed until availability, pricing, and details are verified."
  ].join("\n");
  const url = whatsappUrl(message);
  if (!url) {
    orderStatus.textContent = "WhatsApp is not configured yet. Add your business number in js/script.js. No order has been sent.";
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
  orderStatus.textContent = "WhatsApp opened with your order request prepared. Review it and press Send to contact DrukSubs.";
});

document.querySelector("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Hello DrukSubs! I have an enquiry.",
    `Name: ${data.get("name")}`,
    `Contact: ${data.get("contact")}`,
    `Service: ${data.get("service") || "Not specified"}`,
    `Message: ${data.get("message")}`
  ].join("\n");
  launchWhatsApp(message, formStatus);
});

document.querySelector("#whatsappContact").addEventListener("click", () => {
  launchWhatsApp("Hello DrukSubs! I have a question about your subscriptions.", formStatus);
});

// Avoid implying a backend exists. Email is a placeholder until replaced with a real address.
document.querySelectorAll('a[href="mailto:hello@druksubs.example"]').forEach(link => {
  link.addEventListener("click", event => {
    if (BUSINESS_EMAIL.endsWith(".example")) {
      event.preventDefault();
      formStatus.textContent = "The business email is a placeholder. Please use the contact form after WhatsApp is configured.";
    }
  });
});
