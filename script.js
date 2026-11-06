
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Pilihan anonim
const anonim = document.getElementById("anonim");
const identitas = document.getElementById("identitas");

anonim.addEventListener("change", function() {
  identitas.classList.toggle("hidden", anonim.checked);
});

// Penghitung karakter
const isi = document.getElementById("isi");
const counter = document.getElementById("counter");

isi.addEventListener("input", function() {
  counter.textContent = isi.value.length + "/2000 karakter";
});

// Form pengaduan
const form = document.getElementById("reportForm");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const jenis = document.getElementById("jenis").value;
  const kategori = document.getElementById("kategori").value;
  const judul = document.getElementById("judul").value.trim();
  const isiLaporan = isi.value.trim();

  if (isiLaporan.length < 15) {
    alert("Isi laporan minimal 15 karakter!");
    return;
  }

  const kode = "SS-" + Date.now().toString(36).toUpperCase();

  const laporan = {
    kode: kode,
    jenis: jenis,
    kategori: kategori,
    judul: judul,
    isi: isiLaporan,
    anonim: anonim.checked,
    nama: anonim.checked ? "" :
      document.getElementById("nama").value.trim(),
    kelas: anonim.checked ? "" :
      document.getElementById("kelas").value.trim(),
    tanggal: new Date().toLocaleString("id-ID")
  };

  // Penyimpanan demo di browser
  const data = JSON.parse(
    localStorage.getItem("laporanSiswa") || "[]"
  );

  data.push(laporan);

  localStorage.setItem(
    "laporanSiswa",
    JSON.stringify(data)
  );

  hasil.classList.remove("hidden");
  hasil.innerHTML = `
    <strong>✓ Laporan berhasil disimpan!</strong><br>
    Kode laporan: <b>${kode}</b><br>
    Simpan kode ini sebagai bukti pengiriman.
    <br><button type="button" id="copyCode">Salin Kode</button>
  `;

  document.getElementById("copyCode").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(kode);
      document.getElementById("copyCode").textContent = "Tersalin!";
    } catch {
      alert("Kode laporan: " + kode);
    }
  });

  form.reset();
  anonim.checked = true;
  identitas.classList.add("hidden");
  counter.textContent = "0/2000 karakter";
});
