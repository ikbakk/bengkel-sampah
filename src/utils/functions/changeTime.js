export function konversiTanggalIndonesia(tanggalISO) {
  const tanggalObj = new Date(tanggalISO);

  const tahun = tanggalObj.getUTCFullYear();
  const bulan = String(tanggalObj.getUTCMonth() + 1).padStart(2, "0"); // Ingat bahwa bulan dimulai dari 0
  const tanggal = String(tanggalObj.getUTCDate()).padStart(2, "0");

  const tanggalIndonesia = `${tanggal}/${bulan}/${tahun}`;

  return tanggalIndonesia;
}

// Contoh penggunaan:
const tanggalISO = "2023-11-13T08:21:15.793Z";
const tanggalIndonesia = konversiTanggalIndonesia(tanggalISO);

console.log("Tanggal Indonesia:", tanggalIndonesia);
