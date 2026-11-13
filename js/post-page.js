const postForm = document.getElementById("postForm");
const citySelect = document.getElementById("postCity");
const wardSelect = document.getElementById("postWard");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const mapFrame = document.getElementById("postMap");
const imageInput = document.getElementById("postImages");
const imageGrid = document.getElementById("postImageGrid");
const imageError = document.getElementById("postImageError");
const imageCount = document.getElementById("imageCount");
const postStatus = document.getElementById("postStatus");
const locations = {
  "TP. Hồ Chí Minh":{wards:["Bến Nghé","Bến Thành","Thảo Điền","Phường 22","Phường 25"],lat:10.7756,lon:106.7019},
  "Hà Nội":{wards:["Tràng Tiền","Cửa Nam","Ba Đình","Cầu Giấy","Tây Hồ"],lat:21.0285,lon:105.8542},
  "Đà Nẵng":{wards:["Hải Châu","Thanh Bình","Mỹ An","An Hải"],lat:16.0544,lon:108.2022}
};
const packages = {normal:"Tin thường",silver:"VIP Bạc",gold:"VIP Vàng",diamond:"VIP Kim Cương"};
let photos = [];
let photoId = 0;

function renderWards() {
  const place = locations[citySelect.value];
  wardSelect.innerHTML = '<option value="">Chọn phường / xã</option>';
  wardSelect.disabled = !place;
  if (!place) return;
  wardSelect.insertAdjacentHTML("beforeend", place.wards.map((ward) => `<option>${ward}</option>`).join(""));
  latitudeInput.value = place.lat;
  longitudeInput.value = place.lon;
  updateMap();
}

function updateMap() {
  const lat = Number(latitudeInput.value);
  const lon = Number(longitudeInput.value);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
  const bounds = `${lon-.025}%2C${lat-.015}%2C${lon+.025}%2C${lat+.015}`;
  mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bounds}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function updatePackageTotal() {
  const selected = postForm.querySelector('input[name="package"]:checked');
  const days = Number(document.getElementById("postDays").value);
  const total = Number(selected?.dataset.price || 0) * days;
  const price = `${total.toLocaleString("vi-VN")} đ`;
  document.getElementById("postTotal").textContent = `${price} · ${packages[selected?.value] || packages.normal} · ${days} ngày`;
  document.getElementById("asidePackage").textContent = packages[selected?.value] || packages.normal;
  document.getElementById("asideTotal").textContent = price;
}

function drawPhotos() {
  imageCount.textContent = `${photos.length}/12 ảnh`;
  imageGrid.innerHTML = photos.map((photo, index) => `<article class="post-image-card ${index===0?"is-cover":""}"><img src="${photo.url}" alt="Ảnh tin đăng ${index+1}"><span class="post-image-badge">${index===0?"Ảnh bìa":`Ảnh ${index+1}`}</span><div class="post-image-tools">${index===0?"":`<button type="button" data-cover="${photo.id}">Làm bìa</button>`}<button type="button" data-remove="${photo.id}">Xóa</button></div></article>`).join("");
}

citySelect.addEventListener("change", renderWards);
latitudeInput.addEventListener("change", updateMap);
longitudeInput.addEventListener("change", updateMap);
document.getElementById("mapSearch").addEventListener("click", () => {
  const query = document.getElementById("mapAddress").value.trim() || `${wardSelect.value}, ${citySelect.value}`;
  if (query.trim()) window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`, "_blank", "noopener");
});
document.getElementById("mapLocate").addEventListener("click", () => {
  if (!navigator.geolocation) {
    postStatus.textContent = "Thiết bị chưa hỗ trợ lấy vị trí.";
    return;
  }
  navigator.geolocation.getCurrentPosition(({coords}) => {
    latitudeInput.value = coords.latitude.toFixed(6);
    longitudeInput.value = coords.longitude.toFixed(6);
    updateMap();
    postStatus.textContent = "Đã cập nhật tọa độ từ vị trí thiết bị.";
  }, () => { postStatus.textContent = "Không thể lấy vị trí. Bạn có thể nhập tọa độ thủ công."; });
});
document.getElementById("uploadTrigger").addEventListener("click", () => imageInput.click());
imageInput.addEventListener("change", () => {
  imageError.textContent = "";
  const remaining = 12 - photos.length;
  const accepted = [...imageInput.files].filter((file) => {
    if (!file.type.startsWith("image/")) {
      imageError.textContent = "Chỉ hỗ trợ tệp hình ảnh.";
      return false;
    }
    if (file.size >= 5 * 1024 * 1024) {
      imageError.textContent = `${file.name} vượt quá giới hạn 5 MB.`;
      return false;
    }
    return true;
  });
  if (accepted.length > remaining) imageError.textContent = "Mỗi tin đăng có thể chứa tối đa 12 ảnh.";
  accepted.slice(0, remaining).forEach((file) => photos.push({id:++photoId,url:URL.createObjectURL(file)}));
  drawPhotos();
  imageInput.value = "";
});
imageGrid.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove]");
  const cover = event.target.closest("[data-cover]");
  if (remove) {
    const index = photos.findIndex((photo) => photo.id === Number(remove.dataset.remove));
    if (index >= 0) URL.revokeObjectURL(photos.splice(index,1)[0].url);
  }
  if (cover) {
    const index = photos.findIndex((photo) => photo.id === Number(cover.dataset.cover));
    if (index > 0) photos.unshift(photos.splice(index,1)[0]);
  }
  drawPhotos();
});
postForm.querySelectorAll('input[name="package"], #postDays').forEach((control) => control.addEventListener("change", updatePackageTotal));
postForm.querySelectorAll('input[name="deal"]').forEach((control) => control.addEventListener("change", () => {
  const renting = postForm.elements.deal.value === "rent";
  document.getElementById("priceLabel").textContent = renting ? "Giá thuê (triệu đồng/tháng)" : "Giá bán (tỷ đồng)";
}));
drawPhotos();
updatePackageTotal();

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  postStatus.textContent = "";
  if (!postForm.reportValidity()) return;
  if (photos.length === 0) {
    imageError.textContent = "Vui lòng thêm ít nhất một ảnh cho tin đăng.";
    document.getElementById("postImagesTitle").scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  postStatus.textContent = "Tin đăng mẫu đã được chuẩn bị trên trình duyệt này.";
  postStatus.scrollIntoView({behavior:"smooth",block:"center"});
});
