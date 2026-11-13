const params = new URLSearchParams(location.search);
const view = ["profile","security","listings","payments","saved","admin"].includes(params.get("view")) ? params.get("view") : "profile";
const viewMeta = {
  profile:["Hồ sơ","Quản lý thông tin tài khoản của bạn."],
  security:["Bảo mật","Quản lý mật khẩu và xác minh đăng nhập."],
  listings:["Tin của tôi","Theo dõi trạng thái các tin đã đăng."],
  payments:["Lịch sử thanh toán","Xem các giao dịch và hóa đơn của bạn."],
  saved:["Tin đã lưu","Các bất động sản bạn đang quan tâm."],
  admin:["Quản trị","Bảng điều khiển dữ liệu demo của Kim Quy Land."]
};
const readUser = () => {
  try { return JSON.parse(localStorage.getItem("kq.auth.user") || "null"); }
  catch { return null; }
};
const user = readUser() || {name:"Tài khoản demo",phone:""};
const toast = document.createElement("div");
toast.className = "account-page-toast";
toast.setAttribute("role", "status");
toast.setAttribute("aria-live", "polite");
document.body.append(toast);
let toastTimer;
function announce(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

const [title, subtitle] = viewMeta[view];
document.title = `${title} | Tài khoản Kim Quy Land`;
document.getElementById("accountPageTitle").textContent = title;
document.getElementById("accountPageSub").textContent = subtitle;
document.getElementById("sideName").textContent = user.name || user.phone || "Tài khoản demo";
document.getElementById("sidePhone").textContent = user.phone || "Phiên dùng thử";
document.getElementById("sideInitial").textContent = [...(user.name || user.phone || "K")][0].toLocaleUpperCase("vi");
document.querySelectorAll("[data-account-panel]").forEach((panel) => { panel.hidden = panel.dataset.accountPanel !== view; });
document.querySelectorAll("[data-account-view-link]").forEach((link) => {
  link.classList.toggle("is-active", link.dataset.accountViewLink === view);
  link.href = `tai-khoan.html?view=${link.dataset.accountViewLink}`;
});

const profileForm = document.getElementById("profileForm");
profileForm.elements.name.value = user.name || "";
profileForm.elements.phone.value = user.phone || "";
profileForm.elements.email.value = user.email || "";
profileForm.elements.city.value = user.city || "";
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!profileForm.reportValidity()) return;
  const updated = {...user,name:profileForm.elements.name.value.trim(),phone:profileForm.elements.phone.value.trim(),email:profileForm.elements.email.value.trim(),city:profileForm.elements.city.value};
  try { localStorage.setItem("kq.auth.user", JSON.stringify(updated)); } catch { }
  document.getElementById("sideName").textContent = updated.name;
  document.getElementById("sidePhone").textContent = updated.phone;
  document.getElementById("sideInitial").textContent = [...updated.name][0].toLocaleUpperCase("vi");
  window.parent.postMessage({type:"kq-auth-updated"}, "*");
  announce("Đã lưu thông tin hồ sơ (demo).");
});

document.getElementById("securityForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  if (form.elements.newPassword.value !== form.elements.confirmPassword.value) {
    form.elements.confirmPassword.setCustomValidity("Mật khẩu xác nhận chưa trùng khớp.");
    form.reportValidity();
    form.elements.confirmPassword.setCustomValidity("");
    return;
  }
  document.getElementById("securityFeedback").textContent = "Đã cập nhật bảo mật (demo).";
  form.reset();
});

document.getElementById("accountLogout").addEventListener("click", () => {
  try { localStorage.removeItem("kq.auth.user"); } catch { }
  window.location.href = "trang-chu.html";
});
document.addEventListener("click", (event) => {
  const notice = event.target.closest("[data-notice]");
  if (notice) announce(notice.dataset.notice);
});
