(() => {
  const STORAGE_KEY = "gyep-maintenance-notice-seen";

  function hasSeenNotice() {
    try { return sessionStorage.getItem(STORAGE_KEY) === "1"; }
    catch { return false; }
  }

  function rememberNotice() {
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* Storage may be unavailable in private/file contexts. */ }
  }

  function initMaintenanceNotice() {
    if (hasSeenNotice()) return;

    const overlay = document.createElement("div");
    overlay.className = "maintenance-overlay";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `
      <section class="maintenance-dialog" role="dialog" aria-modal="true" aria-labelledby="maintenanceTitle" aria-describedby="maintenanceDescription" tabindex="-1">
        <div class="maintenance-dialog-inner">
          <div class="maintenance-topline">
            <div class="maintenance-brand"><span class="maintenance-brand-mark">GS</span><span>GYEP</span></div>
            <button class="maintenance-close" type="button" aria-label="Close maintenance notice">×</button>
          </div>
          <div class="maintenance-status"><span class="maintenance-status-dot" aria-hidden="true"></span>Maintenance in progress</div>
          <span class="maintenance-eyebrow">A quick update from GYEP</span>
          <h2 class="maintenance-title" id="maintenanceTitle">Website under <em>maintenance.</em></h2>
          <p class="maintenance-copy" id="maintenanceDescription">
            Kami sedang melakukan pembaruan dan penyempurnaan website GYEP agar pengalaman menjelajah jadi lebih baik. Beberapa tampilan atau informasi mungkin masih berubah selama proses ini.
          </p>
          <div class="maintenance-note">
            <span class="maintenance-note-icon" aria-hidden="true">✓</span>
            <span><strong>Good news:</strong> katalog tetap bisa dijelajahi dan pemesanan tetap dibuka. Hubungi kami melalui WhatsApp untuk mulai order.</span>
          </div>
          <div class="maintenance-actions">
            <a class="maintenance-primary" href="shop.html">Explore products <span aria-hidden="true">→</span></a>
            <a class="maintenance-secondary" href="contact.html#connect">Order via WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
          <p class="maintenance-footnote">THANK YOU FOR YOUR PATIENCE · MADE PERSONAL BY GYEP</p>
        </div>
      </section>`;

    document.body.appendChild(overlay);
    const dialog = overlay.querySelector(".maintenance-dialog");
    const closeButton = overlay.querySelector(".maintenance-close");
    const focusable = () => [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    const previousFocus = document.activeElement;

    function closeNotice() {
      rememberNotice();
      overlay.classList.remove("is-visible");
      document.body.classList.remove("maintenance-modal-open");
      document.removeEventListener("keydown", onKeydown);
      window.setTimeout(() => overlay.remove(), 300);
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    }

    function onKeydown(event) {
      if (event.key === "Escape") {
        closeNotice();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    closeButton.addEventListener("click", closeNotice);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeNotice();
    });
    overlay.querySelectorAll("a").forEach((link) => link.addEventListener("click", rememberNotice));
    document.addEventListener("keydown", onKeydown);
    document.body.classList.add("maintenance-modal-open");

    requestAnimationFrame(() => {
      overlay.classList.add("is-visible");
      closeButton.focus();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMaintenanceNotice, { once: true });
  } else {
    initMaintenanceNotice();
  }
})();
