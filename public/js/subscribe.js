/* Grimsley Mineral Co. — footer email signup.
   Posts the address to the Google Apps Script endpoint set in consts.ts. If no
   endpoint is configured yet, it opens a pre-filled email instead so the form
   still does something. No library, no tracker, no cookie. */
(function () {
  document.querySelectorAll("form.js-subscribe").forEach(function (form) {
    var endpoint = form.dataset.endpoint || "";
    var fallback = form.dataset.email || "";
    var input = form.querySelector('input[name="email"]');
    var button = form.querySelector('button[type="submit"]');
    var msg = form.parentElement.querySelector(".signup-msg");

    function say(text, ok) {
      if (!msg) return;
      msg.textContent = text;
      msg.className = "signup-msg" + (ok ? " ok" : " err");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input.value || "").trim();
      if (!email) return;

      // No endpoint configured yet — hand it to the mail client so the address
      // still reaches an inbox rather than vanishing.
      if (!endpoint) {
        window.location.href =
          "mailto:" + fallback +
          "?subject=" + encodeURIComponent("Add me to the list") +
          "&body=" + encodeURIComponent("Please add " + email + " to the new-pieces list.");
        say("Opening your email app to finish.", true);
        return;
      }

      button.disabled = true;
      var original = button.textContent;
      button.textContent = "Adding…";

      var body = new FormData();
      body.append("email", email);
      body.append("source", window.location.pathname);

      // Apps Script web apps do not return CORS headers, so this is a no-cors
      // POST and the response is OPAQUE. A resolved fetch means the request left
      // the browser. It does NOT mean the row landed in the sheet, so the message
      // below must not claim it did: a broken endpoint would otherwise show every
      // visitor a confident "you're on the list" forever. Say what is known, and
      // give them a way out.
      fetch(endpoint, { method: "POST", mode: "no-cors", body: body })
        .then(function () {
          form.reset();
          say("Sent. If you don't hear from us when new pieces land, email " + fallback + " and we'll add you.", true);
        })
        .catch(function () {
          say("That didn't go through. Email " + fallback + " and we'll add you.", false);
        })
        .then(function () {
          button.disabled = false;
          button.textContent = original;
        });
    });
  });
})();
