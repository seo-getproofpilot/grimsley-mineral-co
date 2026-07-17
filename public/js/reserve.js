/* Grimsley Mineral Co. — reserve list.
   A local hold list for the Aug 6-9 booth. A visitor marks the pieces they want
   to hold, then sends the whole list in one message. Everything lives in
   localStorage; there is no account and no server. Base-aware so it works both
   in local dev ('/') and on GitHub Pages ('/grimsley-mineral-co/'). */
(function () {
  var KEY = "grimsley-reserve-v1";
  var base = (document.documentElement.dataset.base || "/").replace(/\/+$/, "");
  var url = function (p) { return base + "/" + String(p).replace(/^\/+/, ""); };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
    document.dispatchEvent(new CustomEvent("reserve:change"));
  }
  function has(slug) { return load().some(function (i) { return i.slug === slug; }); }
  function add(item) {
    var list = load();
    if (!list.some(function (i) { return i.slug === item.slug; })) list.push(item);
    save(list);
  }
  function remove(slug) {
    save(load().filter(function (i) { return i.slug !== slug; }));
  }

  /* ---- floating pill (all pages) ---- */
  var pill = document.createElement("a");
  pill.className = "reserve-pill";
  pill.href = url("reserve");
  document.body.appendChild(pill);
  function paintPill() {
    var n = load().length;
    pill.style.display = n ? "flex" : "none";
    pill.innerHTML = '<span class="rp-ico">◆</span> Reserve list <span class="rp-n">' + n + "</span>";
  }

  /* ---- add/remove buttons on specimen pages ---- */
  function paintButtons() {
    document.querySelectorAll(".js-reserve").forEach(function (btn) {
      var slug = btn.dataset.slug;
      var inList = has(slug);
      var lava = btn.dataset.line === "lava";
      btn.classList.toggle("in-list", inList);
      btn.textContent = inList
        ? "✓ On your reserve list"
        : (btn.dataset.addLabel || "Reserve this piece");
    });
  }
  document.querySelectorAll(".js-reserve").forEach(function (btn) {
    btn.dataset.addLabel = btn.textContent.trim();
    btn.addEventListener("click", function () {
      var slug = btn.dataset.slug;
      if (has(slug)) remove(slug);
      else add({ slug: slug, name: btn.dataset.name, price: Number(btn.dataset.price) || 0 });
    });
  });

  /* ---- /reserve page render ---- */
  var box = document.getElementById("reserve-list");
  function paintPage() {
    if (!box) return;
    var list = load();
    var email = box.dataset.email || "";
    if (!list.length) {
      box.innerHTML =
        '<div class="rl-empty"><p>Your reserve list is empty.</p>' +
        '<p><a class="btn btn-dark" href="' + url("minerals") + '">Browse the collection</a></p></div>';
      return;
    }
    var total = list.reduce(function (a, i) { return a + (i.price || 0); }, 0);
    var rows = list.map(function (i) {
      return '<div class="rl-row" data-slug="' + i.slug + '">' +
        '<a class="rl-name" href="' + url("specimen/" + i.slug) + '">' + i.name + "</a>" +
        '<span class="rl-price">$' + (i.price || 0) + ".00</span>" +
        '<button class="rl-x" data-remove="' + i.slug + '" aria-label="Remove">Remove</button>' +
        "</div>";
    }).join("");
    box.innerHTML =
      '<div class="rl-rows">' + rows + "</div>" +
      '<div class="rl-total"><span>' + list.length + " piece" + (list.length > 1 ? "s" : "") +
      " held</span><span>Estimated $" + total + ".00</span></div>" +
      '<div class="rl-actions">' +
      '<button class="btn btn-dark" id="rl-send">Send this list to hold the pieces</button>' +
      '<button class="btn btn-ghost" id="rl-clear">Clear list</button></div>' +
      '<p class="rl-note">This holds the pieces for booth pickup at the Highway 127 Yard Sale, ' +
      "Aug 6 through 9. Prices are confirmed in person; cash at the booth.</p>";

    box.querySelectorAll("[data-remove]").forEach(function (b) {
      b.addEventListener("click", function () { remove(b.dataset.remove); });
    });
    var clear = document.getElementById("rl-clear");
    if (clear) clear.addEventListener("click", function () { save([]); });
    var send = document.getElementById("rl-send");
    if (send) send.addEventListener("click", function () {
      var lines = list.map(function (i) { return "• " + i.name + " ($" + (i.price || 0) + ")"; }).join("\n");
      var subject = "Reserve list — " + list.length + " piece" + (list.length > 1 ? "s" : "") + " for the 127";
      var body = "I would like to hold these pieces for pickup at the booth:\n\n" + lines +
        "\n\nEstimated total: $" + total + "\n\nName:\nBest way to reach me:\n";
      window.location.href = "mailto:" + email +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  function paintAll() { paintPill(); paintButtons(); paintPage(); }
  document.addEventListener("reserve:change", paintAll);
  paintAll();
})();
