const reference = {"Hồ Chí Minh":150000000,"Hà Nội":130000000,"Đà Nẵng":85000000};
const form = document.getElementById("valuationForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const area = Number(data.get("area"));
  const city = String(data.get("city"));
  const property = Number(data.get("property"));
  const legal = Number(data.get("legal"));
  const condition = Number(data.get("condition"));
  const estimated = reference[city] * property * legal * condition * area;
  const low = estimated * .93;
  const high = estimated * 1.07;
  document.getElementById("estimate").textContent = `${(low / 1e9).toLocaleString("vi-VN", {maximumFractionDigits:2})} – ${(high / 1e9).toLocaleString("vi-VN", {maximumFractionDigits:2})} tỷ đồng`;
  document.getElementById("estimateUnit").textContent = `Khoảng ${(estimated / area / 1e6).toLocaleString("vi-VN", {maximumFractionDigits:1})} triệu đồng/m² · ${area} m² · ${city}`;
  document.getElementById("estimateResult").classList.add("has-estimate");
});
