let nav = document.querySelector(".navbar");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("header_scrolled");
  } else {
    nav.classList.remove("header_scrolled");
  }
};

// INDEX.HTML
// Ketika tombol nav untuk qoute diklik
$(".nav-qoute .nav-link").on("click", function () {
  $(".nav-qoute .nav-link").removeClass("active");
  $(this).addClass("active");

  let nama = $(this).html();

  $.getJSON("json/homepage.json", function (data) {
    let qoutes = data.qoutes;
    let contentQoute = "";

    $.each(qoutes, function (i, data) {
      if (data.nama == nama) {
        console.log(data.nama);
        contentQoute += `<p>"${data.qoute}"</p>`;
      }
    });
    $("#qoute").html(contentQoute);
  });
});

// MENU.HTML
function tampilSemuaMenu() {
  $("#daftar-menu").empty();
  $.getJSON("json/menu.json", function (result) {
    let menu = result.menu;
    $.each(menu, function (i, result) {
      $("#daftar-menu").append(`<div class="col-md-3">
      <div class="card mt-4">
      <img src="${result.gambar}" class="card-img-top" alt="" />
      <div class="card-body">
      <h5 class="card-title">${result.nama}</h5>
      <p class="card-text">Rp. ${result.harga}</p>
      <a href="#" class="btn btn-primary">Order Now</a>
      </div>
      </div>
      </div>`);
    });
  });
}

tampilSemuaMenu();

// ketika nav tabs diklik
$(".nav-tabs .nav-link").on("click", function () {
  $(".nav-tabs .nav-link").removeClass("active");
  $(this).addClass("active");

  let kategori = $(this).html();

  if (kategori == "All Menu") {
    tampilSemuaMenu();
    return;
  }

  $.getJSON("json/menu.json", function (result) {
    let menu = result.menu;
    let content = "";

    $.each(menu, function (i, result) {
      if (result.kategori == kategori.toLowerCase()) {
        content += `<div class="col-md-3">
                      <div class="card mt-4">
                        <img src="${result.gambar}" class="card-img-top" alt="" />
                        <div class="card-body">
                          <h5 class="card-title">${result.nama}</h5>
                          <p class="card-text">Rp. ${result.harga}</p>
                          <a href="#" class="btn btn-primary">Order Now</a>
                        </div>
                      </div>
                    </div>`;
      }
    });
    $("#daftar-menu").html(content);
  });
});
