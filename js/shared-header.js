const header = document.querySelector(".shared-hdr");
const headerForm = document.getElementById("headerSearch");
const searchToggle = document.querySelector(".search-toggle");
const searchInput = headerForm.elements.q;
const authDialog = document.getElementById("authDialog");
const accountWrap = document.getElementById("accountWrap");
const accountDropdown = document.getElementById("accountDropdown");
const avatarTrigger = document.getElementById("avatarTrigger");
const authMobileTrigger = document.getElementById("authMobileTrigger");
const toast = document.createElement("div");
toast.className = "toast";
toast.setAttribute("role", "status");
toast.setAttribute("aria-live", "polite");
header.append(toast);
let toastTimer;
let sentOtpPhone = "";

function announce(message) {
  toast.textContent = message;
  toast.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("on"), 2400);
}

function readUser() {
  try { return JSON.parse(localStorage.getItem("kq.auth.user") || "null"); }
  catch { return null; }
}

function updateAccount() {
  const user = readUser();
  document.querySelectorAll("[data-auth-open]").forEach((link) => { link.hidden = Boolean(user); });
  authMobileTrigger.hidden = Boolean(user);
  accountWrap.hidden = !user;
  if (user) {
    const name = user.name || user.phone || "Tài khoản";
    document.getElementById("avatarInitial").textContent = [...name.trim()][0]?.toLocaleUpperCase("vi") || "K";
    document.getElementById("accountName").textContent = name;
    document.getElementById("accountPhone").textContent = user.phone || "Tài khoản demo";
  }
}

function setAuthView(view) {
  document.querySelectorAll("[data-auth-view]").forEach((panel) => { panel.hidden = panel.dataset.authView !== view; });
  document.getElementById("authTitle").textContent = view === "register" ? "Tạo tài khoản" : "Chào mừng bạn";
  if (view === "login") setAuthTab("password");
}

function setAuthTab(tab) {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    const active = button.dataset.authTab === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-auth-panel]").forEach((panel) => { panel.hidden = panel.dataset.authPanel !== tab; });
}

function openAuth(view = "login") {
  setAuthView(view);
  if (!authDialog.open) authDialog.showModal();
  window.parent.postMessage({type:"kq-auth-dialog",open:true}, "*");
}

function finishLogin(user, message) {
  try { localStorage.setItem("kq.auth.user", JSON.stringify(user)); }
  catch { announce("Không lưu được phiên đăng nhập trong trình duyệt này."); }
  updateAccount();
  accountDropdown.hidden = true;
  avatarTrigger.setAttribute("aria-expanded", "false");
  authDialog.close();
  announce(message);
}

function normalizedPhone(phone) {
  return String(phone || "").replace(/[^\d+]/g, "");
}

headerForm.addEventListener("submit", () => {
  const query = headerForm.elements.q.value;
  headerForm.action = /thue|thuê/i.test(query) ? "nha-dat-cho-thue.html" : "nha-dat-ban.html";
});
headerForm.addEventListener("focusin", () => {
  window.parent.postMessage({type:"kq-header-suggestions",open:true}, "*");
});
document.addEventListener("pointerdown", (event) => {
  if (!headerForm.contains(event.target) && !searchToggle.contains(event.target)) {
    window.parent.postMessage({type:"kq-header-suggestions",open:false}, "*");
  }
  if (!accountWrap.contains(event.target)) {
    accountDropdown.hidden = true;
    avatarTrigger.setAttribute("aria-expanded", "false");
    window.parent.postMessage({type:"kq-account-menu",open:false}, "*");
  }
});
document.querySelector(".hs-drop").addEventListener("click", (event) => {
  const suggestion = event.target.closest("button");
  if (!suggestion) return;
  headerForm.elements.q.value = suggestion.textContent;
  headerForm.requestSubmit();
});
document.querySelector(".notification-button").addEventListener("click", () => announce("Bạn chưa có thông báo mới."));
document.querySelectorAll("[data-auth-open]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  openAuth(link.dataset.authOpen);
}));
authMobileTrigger.addEventListener("click", () => openAuth("login"));
document.querySelectorAll("[data-auth-view-open]").forEach((button) => button.addEventListener("click", () => setAuthView(button.dataset.authViewOpen)));
document.querySelectorAll("[data-auth-tab]").forEach((button) => button.addEventListener("click", () => setAuthTab(button.dataset.authTab)));
document.getElementById("authClose").addEventListener("click", () => authDialog.close());
authDialog.addEventListener("click", (event) => { if (event.target === authDialog) authDialog.close(); });
authDialog.addEventListener("close", () => window.parent.postMessage({type:"kq-auth-dialog",open:false}, "*"));

document.getElementById("passwordLogin").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const phone = normalizedPhone(form.elements.phone.value);
  if (phone.replace(/\D/g, "").length < 9) {
    form.elements.phone.setCustomValidity("Nhập số điện thoại hợp lệ.");
    form.reportValidity();
    form.elements.phone.setCustomValidity("");
    return;
  }
  finishLogin({name:phone,phone}, "Đăng nhập demo thành công.");
});

document.getElementById("sendOtp").addEventListener("click", () => {
  const form = document.getElementById("otpLogin");
  const phoneInput = form.elements.phone;
  const phone = normalizedPhone(phoneInput.value);
  if (phone.replace(/\D/g, "").length < 9) {
    phoneInput.setCustomValidity("Nhập số điện thoại hợp lệ trước khi gửi OTP.");
    form.reportValidity();
    phoneInput.setCustomValidity("");
    return;
  }
  sentOtpPhone = phone;
  document.getElementById("otpNote").textContent = "Mã OTP demo: 123456 (không gửi SMS thật).";
  form.elements.otp.focus();
});

document.getElementById("otpLogin").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const phone = normalizedPhone(form.elements.phone.value);
  if (!sentOtpPhone || phone !== sentOtpPhone || form.elements.otp.value !== "123456") {
    document.getElementById("otpNote").textContent = "OTP không hợp lệ hoặc đã hết hạn. Gửi lại mã demo để thử lại.";
    return;
  }
  finishLogin({name:phone,phone}, "Đăng nhập OTP demo thành công.");
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const phone = normalizedPhone(form.elements.phone.value);
  if (phone.replace(/\D/g, "").length < 9) {
    form.elements.phone.setCustomValidity("Nhập số điện thoại hợp lệ.");
    form.reportValidity();
    form.elements.phone.setCustomValidity("");
    return;
  }
  finishLogin({name:form.elements.name.value.trim(),phone}, "Tài khoản demo đã được tạo.");
});

document.querySelectorAll("[data-social]").forEach((button) => button.addEventListener("click", () => {
  const provider = button.dataset.social;
  finishLogin({name:`${provider} demo`,provider}, `Đăng nhập ${provider} đang ở chế độ demo, chưa kết nối OAuth.`);
}));

avatarTrigger.addEventListener("click", () => {
  const open = accountDropdown.hidden;
  accountDropdown.hidden = !open;
  avatarTrigger.setAttribute("aria-expanded", String(open));
  window.parent.postMessage({type:"kq-account-menu",open}, "*");
});
const accountViewByAction = {"Hồ sơ":"profile","Bảo mật":"security","Tin của tôi":"listings","Lịch sử thanh toán":"payments","Tin đã lưu":"saved","Quản trị":"admin"};
accountDropdown.querySelectorAll("[data-account-action]").forEach((button) => button.addEventListener("click", () => {
  accountDropdown.hidden = true;
  avatarTrigger.setAttribute("aria-expanded", "false");
  window.parent.postMessage({type:"kq-account-navigation",view:accountViewByAction[button.dataset.accountAction]}, "*");
}));
document.getElementById("logoutButton").addEventListener("click", () => {
  try { localStorage.removeItem("kq.auth.user"); } catch { }
  updateAccount();
  window.parent.postMessage({type:"kq-account-menu",open:false}, "*");
  announce("Bạn đã đăng xuất.");
});

searchToggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("search-open");
  searchToggle.setAttribute("aria-expanded", String(open));
  window.parent.postMessage({type:"kq-header-search",open}, "*");
  if (open) setTimeout(() => searchInput.focus(), 0);
});
window.addEventListener("message", (event) => {
  if (event.data?.type === "kq-auth-refresh") updateAccount();
});
updateAccount();
