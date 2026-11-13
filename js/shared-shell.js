function makeFrame(src, className, title) {
  const frame = document.createElement("iframe");
  frame.className = className;
  frame.src = src;
  frame.title = title;
  frame.setAttribute("scrolling", "no");
  return frame;
}

const headerFrame = makeFrame("header.html", "shared-header-frame", "Điều hướng Kim Quy Land");
const footerFrame = makeFrame("footer.html", "shared-footer-frame", "Thông tin cuối trang Kim Quy Land");
const headerSlot = document.getElementById("siteHeader");
const footerSlot = document.getElementById("siteFooter");
const oldHeader = document.querySelector("body > header.hdr");
const oldFooter = document.querySelector("body > footer.ftr");

if (headerSlot) headerSlot.replaceWith(headerFrame);
else {
  if (oldHeader) oldHeader.hidden = true;
  document.body.insertBefore(headerFrame, document.body.firstChild);
}
if (footerSlot) footerSlot.replaceWith(footerFrame);
else {
  if (oldFooter) oldFooter.hidden = true;
  document.body.append(footerFrame);
}

window.addEventListener("message", (event) => {
  if (event.data?.type === "kq-auth-updated" && event.source === window) {
    headerFrame.contentWindow.postMessage({type:"kq-auth-refresh"}, "*");
    return;
  }
  if (event.source !== headerFrame.contentWindow) return;
  if (event.data?.type === "kq-account-navigation") {
    const views = new Set(["profile","security","listings","payments","saved","admin"]);
    if (views.has(event.data.view)) location.href = `tai-khoan.html?view=${event.data.view}`;
  }
  if (event.data?.type === "kq-header-search") {
    headerFrame.style.height = event.data.open ? "170px" : "";
  }
  if (event.data?.type === "kq-header-suggestions") {
    headerFrame.style.height = event.data.open ? (window.innerWidth <= 820 ? "310px" : "270px") : "";
  }
  if (event.data?.type === "kq-auth-dialog") {
    headerFrame.classList.toggle("is-auth-open", event.data.open);
    headerFrame.style.height = event.data.open ? `${window.innerHeight}px` : "";
  }
  if (event.data?.type === "kq-account-menu") {
    headerFrame.style.height = event.data.open ? (window.innerWidth <= 820 ? "450px" : "470px") : "";
  }
});
