export const config = { amp: "hybrid" };

setTimeout(function () {
  function loadProvinsi() {
    fetch("/api/provinsi")
      .then((res) => res.json())
      .then((data) => {
        let temp =
          '<option value="" selected="" disabled="">-- Pilih Provinsi --</option>';
        data.rajaongkir.results.forEach((rs) => {
          temp += `<option value="${rs.province_id}">${rs.province}</option>`;
        });
        document.getElementById("prov1").innerHTML = temp;
        document.getElementById("prov2").innerHTML = temp;
      })
      .catch((err) => alert(err));
  }

  function loadKota(id, el) {
    fetch(`/api/kota/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let temp =
          '<option value="" selected="" disabled="">-- Pilih Kota --</option>';
        data.rajaongkir.results.forEach((rs) => {
          temp += `<option value="${rs.city_id}">${rs.city_name}</option>`;
        });
        document.getElementById(el).innerHTML = temp;
      })
      .catch((err) => alert(err));
  }

  function cekOngkir() {
    const asal = document.getElementById("kot1").value,
      tujuan = document.getElementById("kot2").value,
      berat = document.getElementById("berat").value;

    if (asal != "" && tujuan != "" && berat != "") {
      const kurirs = ["jne", "tiki", "pos"]; // Tambahkan lebih banyak kurir jika diperlukan
      let tableHTML = "";

      // Objek dengan nama layanan yang sesuai
      const serviceNames = {
        jne: "Standard Shipping",
        tiki: "Freight Shipping",
        pos: "Express Shipping",
      };

      kurirs.forEach((kurir) => {
        fetch(`/api/ongkos/${asal}/${tujuan}/${berat}/${kurir}`)
          .then((res) => res.json())
          .then((data) => {
            const ro = data.rajaongkir;
            if (ro.status.code == 200) {
              tableHTML += `<tr>
                <td><b>${serviceNames[kurir]}</b></td>
                <td>${ro.results[0].costs[0].cost[0].value.toLocaleString()}</td>
                <td>IDR</td>
                <td>${ro.results[0].costs[0].cost[0].value.toLocaleString()}</td>
              </tr>`;
              document.getElementById("hasil").innerHTML = `
                <table cellpadding="5" style="border-collapse: collapse;">
                  <tr>
                    <th>Services Type</th>
                    <th>Shipping Rates</th>
                    <th>Insurance</th>
                    <th>Total Fee</th>
                  </tr>
                  ${tableHTML}
                </table>`;
            } else {
              alert(
                "Terdapat masalah dari rajaongkir atau koneksi internet Anda, silakan coba lagi"
              );
            }
          })
          .catch((err) => alert(err));
      });
    } else {
      alert("Mohon lengkapi data terlebih dahulu!");
    }
  }

  function loadCSSFile() {
    var link = document.createElement("link");
    link.href = "css/styles.css"; // Gunakan path relatif ke file CSS
    link.rel = "stylesheet";
    link.type = "text/css";

    // Sisipkan elemen link ke dalam head dokumen
    document.head.appendChild(link);
  }

  // Panggil fungsi untuk memuat file CSS
  loadCSSFile();
}, 10000);
