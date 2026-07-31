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
      // POST: the write succeeds but the response is opaque and cannot be read.
      // Treat a resolved fetch as success and a rejected one as failure.
      fetch(endpoint, { method: "POST", mode: "no-cors", body: body })
        .then(function () {
          form.reset();
          say("You're on the list. We'll be in touch when new pieces land.", true);
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
