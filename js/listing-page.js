const listings = [
  {id:"KQ-1001",deal:"sale",vip:3,type:"Căn hộ",title:"Căn hộ 2 phòng ngủ view sông tại Vinhomes Central Park",price:3200000000,area:72,city:"Hồ Chí Minh",ward:"Phường 22",address:"Phường 22, Bình Thạnh, TP. Hồ Chí Minh",beds:2,baths:2,direction:"Đông Nam",furnishing:"basic",legal:"ownership",posted:"2026-11-12",image:"photo-1600607687939-ce8a6c25118c"},
  {id:"KQ-1002",deal:"sale",vip:3,type:"Biệt thự / liền kề",title:"Biệt thự compound Thảo Điền, sân vườn và hồ bơi riêng",price:45000000000,area:320,city:"Hồ Chí Minh",ward:"Thảo Điền",address:"Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",beds:5,baths:5,direction:"Đông",furnishing:"full",legal:"ownership",posted:"2026-11-10",image:"photo-1600607687920-4e2a09cf159d"},
  {id:"KQ-1003",deal:"sale",vip:2,type:"Nhà mặt phố",title:"Nhà phố mặt tiền Lê Văn Sỹ, Quận 3, kinh doanh tốt",price:18500000000,area:95,city:"Hồ Chí Minh",ward:"Phường 12",address:"Phường 12, Quận 3, TP. Hồ Chí Minh",beds:4,baths:4,direction:"Nam",furnishing:"basic",legal:"ownership",posted:"2026-11-08",image:"photo-1600566753086-00f18fb6b3ea"},
  {id:"KQ-1004",deal:"sale",vip:2,type:"Nhà riêng",title:"Nhà hẻm xe hơi Bình Thạnh, 3 tầng mới xây",price:5200000000,area:60,city:"Hồ Chí Minh",ward:"Phường 25",address:"Phường 25, Bình Thạnh, TP. Hồ Chí Minh",beds:3,baths:3,direction:"Tây Bắc",furnishing:"full",legal:"ownership",posted:"2026-11-07",image:"photo-1600047509807-ba8f99d2cdde"},
  {id:"KQ-1005",deal:"sale",vip:1,type:"Đất",title:"Đất gần biển Mỹ An, đường rộng, sổ đỏ chính chủ",price:1900000000,area:90,city:"Đà Nẵng",ward:"Mỹ An",address:"Mỹ An, Ngũ Hành Sơn, Đà Nẵng",beds:0,baths:0,direction:"Đông",furnishing:"none",legal:"ownership",posted:"2026-11-05",image:"photo-1500382017468-9049fed747ef"},
  {id:"KQ-1006",deal:"sale",vip:0,type:"Nhà riêng",title:"Nhà liền kề Vinhomes Ocean Park, hướng Đông Nam",price:7800000000,area:75,city:"Hà Nội",ward:"Đa Tốn",address:"Đa Tốn, Gia Lâm, Hà Nội",beds:4,baths:3,direction:"Đông Nam",furnishing:"basic",legal:"contract",posted:"2026-11-03",image:"photo-1600566753190-17f0baa2a6c3"},
  {id:"KQ-2001",deal:"rent",vip:3,type:"Căn hộ",title:"Cho thuê căn hộ 2PN Landmark 81, full nội thất",price:28000000,area:75,city:"Hồ Chí Minh",ward:"Phường 22",address:"Phường 22, Bình Thạnh, TP. Hồ Chí Minh",beds:2,baths:2,direction:"Đông Nam",furnishing:"full",legal:"ownership",posted:"2026-11-12",image:"photo-1600607687939-ce8a6c25118c"},
  {id:"KQ-2002",deal:"rent",vip:2,type:"Căn hộ mini",title:"Căn hộ mini đầy đủ tiện nghi gần sân bay",price:9000000,area:35,city:"Hồ Chí Minh",ward:"Phường 2",address:"Phường 2, Tân Bình, TP. Hồ Chí Minh",beds:1,baths:1,direction:"Bắc",furnishing:"full",legal:"contract",posted:"2026-11-11",image:"photo-1600210492486-724fe5c67fb0"},
  {id:"KQ-2003",deal:"rent",vip:2,type:"Nhà mặt phố",title:"Cho thuê nhà mặt tiền Quận 3, phù hợp mở văn phòng",price:75000000,area:95,city:"Hồ Chí Minh",ward:"Phường 12",address:"Phường 12, Quận 3, TP. Hồ Chí Minh",beds:4,baths:3,direction:"Nam",furnishing:"basic",legal:"ownership",posted:"2026-11-09",image:"photo-1600566753086-00f18fb6b3ea"},
  {id:"KQ-2004",deal:"rent",vip:1,type:"Phòng trọ",title:"Phòng trọ có gác, máy lạnh, gần sân bay Tân Sơn Nhất",price:3500000,area:20,city:"Hồ Chí Minh",ward:"Phường 2",address:"Phường 2, Tân Bình, TP. Hồ Chí Minh",beds:1,baths:1,direction:"Tây",furnishing:"basic",legal:"other",posted:"2026-11-06",image:"photo-1522708323590-d24dbb6b0267"},
  {id:"KQ-2005",deal:"rent",vip:1,type:"Căn hộ",title:"Căn hộ 2PN Sunrise Riverside, Quận 7, view sông",price:16000000,area:70,city:"Hồ Chí Minh",ward:"Phước Kiển",address:"Phước Kiển, Nhà Bè, TP. Hồ Chí Minh",beds:2,baths:2,direction:"Đông",furnishing:"basic",legal:"contract",posted:"2026-11-04",image:"photo-1600607687920-4e2a09cf159d"},
  {id:"KQ-2006",deal:"rent",vip:0,type:"Căn hộ",title:"Căn hộ studio Cầu Giấy, đầy đủ tiện nghi",price:9000000,area:35,city:"Hà Nội",ward:"Dịch Vọng Hậu",address:"Dịch Vọng Hậu, Cầu Giấy, Hà Nội",beds:1,baths:1,direction:"Đông Bắc",furnishing:"full",legal:"contract",posted:"2026-11-02",image:"photo-1600210492486-724fe5c67fb0"}
].map(item => ({...item, photo:`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=960&q=80`}));

const form = document.getElementById("filters");
const params = new URLSearchParams(location.search);
const deal = document.body.dataset.deal;
const pageSize = 4;
let activePage = 1;
let activeResults = [];
const $ = (selector) => document.querySelector(selector);
const normalize = (value) => value.toLocaleLowerCase("vi").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
const formatPrice = (value, isRent) => isRent ? `${(value / 1e6).toLocaleString("vi-VN")} <small>triệu/tháng</small>` : `${(value / 1e9).toLocaleString("vi-VN", {maximumFractionDigits:2})} <small>tỷ</small>`;
const rank = (value) => Number(value);

function initializeLocations() {
  const cities = [...new Set(listings.map((item) => item.city))];
  const city = $("#city");
  city.insertAdjacentHTML("beforeend", cities.map((value) => `<option>${value}</option>`).join(""));
  city.value = params.get("city") || "";
  updateWards();
  if (params.get("ward")) $("#ward").value = params.get("ward");
}
function updateWards() {
  const city = $("#city").value;
  const options = [...new Set(listings.filter((item) => !city || item.city === city).map((item) => item.ward))];
  const ward = $("#ward");
  ward.innerHTML = '<option value="">Tất cả phường / xã</option>' + options.map((value) => `<option>${value}</option>`).join("");
  ward.disabled = !city;
}
function getFiltered() {
  const data = new FormData(form);
  const query = normalize(String(data.get("q") || "").trim());
  const type = String(data.get("type") || "");
  const minPrice = Number(data.get("minPrice")) || 0;
  const maxPrice = Number(data.get("maxPrice")) || Infinity;
  const minArea = Number(data.get("minArea")) || 0;
  const maxUnit = Number(data.get("maxUnit")) || Infinity;
  const beds = Number(data.get("beds")) || 0;
  const baths = Number(data.get("baths")) || 0;
  const direction = String(data.get("direction") || "");
  const furnishing = String(data.get("furnishing") || "");
  const legal = String(data.get("legal") || "");
  return listings.filter((item) => {
    const haystack = normalize(`${item.id} ${item.title} ${item.address}`);
    return item.deal === deal && (!query || haystack.includes(query)) && (!type || item.type === type) &&
      (!data.get("city") || item.city === data.get("city")) && (!data.get("ward") || item.ward === data.get("ward")) &&
      item.price >= minPrice && item.price <= maxPrice && item.area >= minArea && item.price / item.area <= maxUnit &&
      item.beds >= beds && item.baths >= baths && (!direction || item.direction === direction) &&
      (!furnishing || item.furnishing === furnishing) && (!legal || item.legal === legal);
  });
}
function sortedResults(results) {
  const sort = $("#sort").value;
  return results.sort((a, b) => rank(b.vip) - rank(a.vip) || (sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "area-desc" ? b.area - a.area : b.posted.localeCompare(a.posted)));
}
function useHomepageCardStyle() {
  document.querySelectorAll("#cards .listing-card").forEach((card) => {
    card.className = "card";
    const item = listings.find((listing) => listing.id === card.querySelector(".listing-id")?.textContent);
    const imageLink = card.querySelector(".listing-photo");
    imageLink.className = "media";
    imageLink.querySelector(".listing-id").remove();
    const vip = imageLink.querySelector(".vip-badge");
    if (vip) {
      vip.className = `badge vip ${item.vip === 3 ? "diamond" : item.vip === 2 ? "gold" : "silver"}`;
      vip.textContent = `VIP ${item.vip === 3 ? "Kim Cương" : item.vip === 2 ? "Vàng" : "Bạc"}`;
    }
    const dealBadge = document.createElement("span");
    dealBadge.className = `badge deal ${deal === "rent" ? "rent" : "sale"}`;
    dealBadge.textContent = deal === "rent" ? "Cho thuê" : "Bán";
    imageLink.append(dealBadge);
    const copy = card.querySelector(".listing-copy");
    copy.className = "body";
    const type = copy.querySelector(".listing-type").textContent.split("·")[0].trim();
    const title = copy.querySelector(".listing-title");
    const heading = document.createElement("h3");
    heading.className = "ttl";
    heading.innerHTML = `<span class="tp">${type}</span> – ${title.textContent}`;
    title.replaceWith(heading);
    copy.querySelector(".listing-type").remove();
    copy.querySelector(".listing-price").className = "price";
    const unit = document.createElement("div");
    unit.className = "unit";
    unit.textContent = `${(item.price / item.area / 1e6).toLocaleString("vi-VN", {maximumFractionDigits:1})} triệu/m² · ${item.area} m²`;
    copy.querySelector(".price").after(unit);
    const specs = document.createElement("div");
    specs.className = "specs";
    specs.innerHTML = `<span title="Phòng ngủ"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19v-7m0 4h18v3M3 16v-5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3v4m-9-3h18a2 2 0 0 1 2 2v4"/></svg>${item.beds||"—"} PN</span><span title="Phòng vệ sinh"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12V6a2 2 0 0 1 4 0v2m-5 4h18l-1.6 6.4a2 2 0 0 1-1.9 1.6H6.5a2 2 0 0 1-1.9-1.6L3 12Zm3 8v2m12-2v2"/></svg>${item.baths||"—"} WC</span><span title="Hướng nhà"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/></svg>${item.direction||"—"}</span>`;
    unit.after(specs);
    const meta = copy.querySelector(".listing-meta");
    const description = document.createElement("p");
    description.className = "desc";
    description.textContent = meta.children[3] ? `Đăng ${meta.children[3].textContent}` : "";
    meta.replaceWith(description);
    copy.querySelector(".listing-address").className = "addr";
    const footer = document.createElement("div");
    footer.className = "foot";
    footer.innerHTML = `<div class="l"><span class="agent">Mã tin ${item.id}</span></div><button class="save" type="button" aria-pressed="false">Lưu</button>`;
    card.append(footer);
  });
}
function render() {
  activeResults = sortedResults(getFiltered());
  const totalPages = Math.max(1, Math.ceil(activeResults.length / pageSize));
  activePage = Math.min(activePage, totalPages);
  const start = (activePage - 1) * pageSize;
  const shown = activeResults.slice(start, start + pageSize);
  $("#count").textContent = `${activeResults.length} tin phù hợp`;
  $("#cards").innerHTML = shown.length ? shown.map((item) => `<article class="listing-card"><a class="listing-photo" href="#" data-card="${item.id}" aria-label="Xem ${item.title}"><img src="${item.photo}" alt="${item.title}" loading="lazy"><span class="listing-id">${item.id}</span>${item.vip ? `<span class="vip-badge">VIP ${item.vip === 3 ? "Kim Cương" : item.vip === 2 ? "Vàng" : "Bạc"}</span>` : ""}</a><div class="listing-copy"><div class="listing-type">${item.type} <span>· ${item.area} m²</span></div><a href="#" data-card="${item.id}" class="listing-title">${item.title}</a><div class="listing-price">${formatPrice(item.price, deal === "rent")}</div><div class="listing-address">${item.address}</div><div class="listing-meta"><span>${item.beds || "--"} PN</span><span>${item.baths || "--"} WC</span><span>${item.direction}</span><span>${new Date(`${item.posted}T12:00:00`).toLocaleDateString("vi-VN")}</span></div></div></article>`).join("") : '<div class="listing-empty"><b>Chưa tìm thấy tin phù hợp</b><span>Thử nới rộng khoảng giá hoặc xóa bớt bộ lọc.</span></div>';
  useHomepageCardStyle();
  const pagination = $("#pagination");
  pagination.innerHTML = totalPages > 1 ? `<button type="button" data-page="${activePage - 1}" ${activePage === 1 ? "disabled" : ""}>Trước</button>${Array.from({length:totalPages},(_,i)=>`<button type="button" data-page="${i+1}" ${activePage === i+1 ? 'aria-current="page"' : ""}>${i+1}</button>`).join("")}<button type="button" data-page="${activePage + 1}" ${activePage === totalPages ? "disabled" : ""}>Sau</button>` : "";
}

initializeLocations();
for (const control of form.elements) {
  if (control.name && params.has(control.name) && control.name !== "city" && control.name !== "ward") control.value = params.get(control.name);
}
if (params.get("q")) $("#keyword").value = params.get("q");
$("#city").addEventListener("change", () => { updateWards(); $("#ward").value = ""; });
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const selectedDeal = String(data.get("deal"));
  if (selectedDeal !== deal) {
    const query = new URLSearchParams(data);
    location.href = `${selectedDeal === "rent" ? "nha-dat-cho-thue.html" : "nha-dat-ban.html"}?${query}`;
    return;
  }
  activePage = 1;
  render();
  document.querySelector(".results-heading").scrollIntoView({behavior:"smooth",block:"start"});
});
form.addEventListener("reset", () => setTimeout(() => { $("#city").value = ""; updateWards(); $("#keyword").value = ""; activePage = 1; render(); }, 0));
$("#sort").addEventListener("change", () => { activePage = 1; render(); });
$("#pagination").addEventListener("click", (event) => { const button = event.target.closest("[data-page]"); if (button && !button.disabled) { activePage = Number(button.dataset.page); render(); document.querySelector(".results-heading").scrollIntoView({behavior:"smooth",block:"start"}); } });
document.addEventListener("click", (event) => {
  const saveButton = event.target.closest(".save");
  if (saveButton) {
    const saved = saveButton.getAttribute("aria-pressed") === "true";
    saveButton.setAttribute("aria-pressed", String(!saved));
    saveButton.classList.toggle("on", !saved);
    saveButton.textContent = saved ? "Lưu" : "Đã lưu";
  }
  const cardLink = event.target.closest("[data-card]");
  if (cardLink) {
    event.preventDefault();
    const item = listings.find((listing) => listing.id === cardLink.dataset.card);
    window.alert(`${item.title}\nMã tin: ${item.id}\n${item.address}`);
  }
});
render();
