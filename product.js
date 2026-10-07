document.addEventListener("DOMContentLoaded", () => {
  const catalog = Array.isArray(window.GYEP_PRODUCTS) ? window.GYEP_PRODUCTS : [];
  const productionOptions = window.GYEP_PRODUCTION_OPTIONS || {
    regular: { label: "REGULER", days: "7–10 hari kerja", extra: 0 },
    fast: { label: "CEPAT", days: "4–6 hari kerja", extra: 125000 },
    express: { label: "KILAT", days: "2–3 hari kerja", extra: 200000 }
  };

  const params = new URLSearchParams(window.location.search);
  const productId = (params.get("id") || window.location.hash.replace(/^#/, ""))
    .trim()
    .toLowerCase();

  const page = {
    content: document.getElementById("productContent"),
    generic: document.getElementById("productGeneric"),
    title: document.getElementById("productTitle"),
    category: document.getElementById("productCategory"),
    breadcrumbCategory: document.getElementById("breadcrumbCategory"),
    breadcrumbProduct: document.getElementById("breadcrumbProduct"),
    description: document.getElementById("productDescription"),
    price: document.getElementById("productPrice"),
    intro: document.getElementById("productIntro"),
    productImage: document.getElementById("productImage"),
    imageLabel: document.getElementById("productImageLabel"),
    thumbs: document.getElementById("productThumbs"),
    specs: document.getElementById("productSpecs"),
    customFields: document.getElementById("customFields"),
    variants: document.getElementById("variants"),
    quantity: document.getElementById("quantity"),
    qtyMinus: document.getElementById("qtyMinus"),
    qtyPlus: document.getElementById("qtyPlus"),
    qtyMin: document.getElementById("qtyMin"),
    total: document.getElementById("productTotal"),
    summaryProduct: document.getElementById("summaryProduct"),
    summaryProduction: document.getElementById("summaryProduction"),
    summaryOptions: document.getElementById("summaryOptions"),
    regular: document.getElementById("speedRegular"),
    fast: document.getElementById("speedFast"),
    express: document.getElementById("speedExpress"),
    productionNote: document.getElementById("productionNote"),
    marketplace: document.getElementById("marketplaceButton"),
    whatsapp: document.getElementById("whatsappButton"),
    related: document.getElementById("relatedProducts"),
    relatedGrid: document.getElementById("relatedGrid"),
    notFound: document.getElementById("productNotFound")
  };

  function money(value) {
    if (!Number(value)) return "Rp xxx.xxx";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderGenericState() {
    page.content.hidden = true;
    page.notFound.hidden = true;
    page.generic.hidden = false;

    const featured = catalog.filter((item) => item.active && item.featured).slice(0, 4);
    const suggestions = featured.length ? featured : catalog.filter((item) => item.active).slice(0, 4);

    const grid = document.getElementById("genericProductGrid");
    if (!grid) return;

    grid.innerHTML = suggestions.map((item) => `
      <a class="generic-product-card" href="product.html?id=${encodeURIComponent(item.id)}">
        <div class="generic-product-art"><span>${escapeHtml(item.categoryLabel)}</span></div>
        <div>
          <span class="eyebrow">${escapeHtml(item.categoryLabel)}</span>
          <h3>${escapeHtml(item.name)}</h3>
          <span class="generic-product-link">View detail →</span>
        </div>
      </a>
    `).join("");
  }

  const product = catalog.find(
    (item) => item.active && String(item.id).trim().toLowerCase() === productId
  );

  if (!productId) {
    renderGenericState();
    return;
  }

  if (!product) {
    document.title = "Product Not Found — GYEP";
    page.content.hidden = true;
    page.generic.hidden = true;
    page.notFound.hidden = false;
    return;
  }

  page.content.hidden = false;
  page.generic.hidden = true;
  page.notFound.hidden = true;

  document.title = `${product.name} — GYEP`;
  page.title.textContent = product.name;
  page.category.textContent = product.categoryLabel;
  page.breadcrumbCategory.textContent = product.categoryLabel;
  page.breadcrumbProduct.textContent = product.name;
  page.description.textContent = product.description;
  page.intro.textContent = product.intro || "Choose the options that fit your idea, then send your brief to GYEP.";

  const minQty = Math.max(1, Number(product.minimumOrder) || 1);
  let quantity = minQty;
  let selectedSpeed = "regular";
  let selectedVariants = {};
  let activeImage = product.image || "";

  page.qtyMin.textContent = `Minimum order: ${minQty} pcs`;
  page.quantity.min = String(minQty);
  page.quantity.value = String(minQty);

  function setMainImage(path, indexLabel = "01") {
    activeImage = path || "";
    page.productImage.classList.remove("has-real-image", "is-loading");
    page.productImage.innerHTML = `
      <div class="gallery-label">GYEP / PRODUCT</div>
      <span id="productImageLabel">${escapeHtml(product.categoryLabel.toUpperCase())}</span>
    `;

    if (!path) return;

    page.productImage.classList.add("is-loading");
    const img = new Image();
    img.src = path;
    img.alt = product.name;
    img.loading = "eager";
    img.decoding = "async";
    img.onload = () => {
      page.productImage.innerHTML = "";
      const label = document.createElement("div");
      label.className = "gallery-label";
      label.textContent = `GYEP / ${String(indexLabel).padStart(2, "0")}`;
      page.productImage.append(label, img);
      page.productImage.classList.add("has-real-image");
    };
  }

  function renderGallery() {
    const gallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
    const images = [...new Set([product.image, ...gallery].filter(Boolean))];
    page.thumbs.innerHTML = "";

    if (!images.length) {
      setMainImage("");
      page.thumbs.hidden = true;
      return;
    }

    page.thumbs.hidden = false;
    images.forEach((src, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `gallery-thumb ${index === 0 ? "is-active" : ""}`;
      button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>`;
      button.addEventListener("click", () => {
        page.thumbs.querySelectorAll(".gallery-thumb").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        setMainImage(src, String(index + 1));
      });
      page.thumbs.appendChild(button);
    });

    setMainImage(images[0], "01");
  }

  const fieldDefinitions = {
    photo: { label: "Upload Photo", type: "file", accept: "image/*", help: "Gunakan foto yang jelas. File tidak diunggah ke server; nama file akan ikut terkirim ke WhatsApp." },
    notes: { label: "Additional Notes", type: "textarea", help: "Tambahkan detail, pose, teks, warna, atau catatan lain yang perlu kami tahu.", placeholder: "Tulis brief atau catatan..." },
    qrLink: { label: "QR Link", type: "url", placeholder: "https://example.com" },
    location: { label: "Location / Place", type: "text", placeholder: "Contoh: Jakarta, Indonesia" },
    initial: { label: "Initial", type: "text", placeholder: "J" },
    name: { label: "Name", type: "text", placeholder: "Nama yang ingin dicetak" },
    style: { label: "Style Direction", type: "text", placeholder: "Contoh: minimal / playful / bold" },
    text: { label: "Text", type: "text", placeholder: "Tuliskan teks yang diinginkan" },
    number: { label: "Number", type: "text", placeholder: "Nomor" },
    audioLink: { label: "Audio / Sound Link", type: "url", placeholder: "https://..." },
    size: { label: "Preferred Size", type: "text", placeholder: "Contoh: 10 cm / mengikuti drawer" },
    compartments: { label: "Jumlah Sekat", type: "number", min: "1", placeholder: "Contoh: 4" }
  };

  const customInputNodes = [];

  function renderCustomFields() {
    page.customFields.innerHTML = "";
    const keys = Array.isArray(product.customFields) ? product.customFields : [];
    keys.forEach((fieldKey) => {
      const definition = fieldDefinitions[fieldKey];
      if (!definition) return;

      const wrapper = document.createElement("div");
      wrapper.className = "custom-field";

      const label = document.createElement("label");
      label.textContent = definition.label;
      label.setAttribute("for", `field-${fieldKey}`);

      const control = definition.type === "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

      control.id = `field-${fieldKey}`;
      control.name = fieldKey;
      control.placeholder = definition.placeholder || "";
      control.className = "custom-control";
      if (definition.type === "textarea") control.rows = 4;
      else control.type = definition.type;
      if (definition.accept) control.accept = definition.accept;
      if (definition.min) control.min = definition.min;

      wrapper.append(label, control);

      if (definition.help) {
        const help = document.createElement("small");
        help.textContent = definition.help;
        wrapper.appendChild(help);
      }

      page.customFields.appendChild(wrapper);
      customInputNodes.push({ key: fieldKey, control });
    });
  }

  function renderVariants() {
    const groups = Object.entries(product.variants || {}).filter(
      ([, options]) => Array.isArray(options) && options.length
    );

    page.variants.innerHTML = "";
    if (!groups.length) {
      page.variants.hidden = true;
      return;
    }

    page.variants.hidden = false;
    selectedVariants = {};

    groups.forEach(([groupKey, options]) => {
      const group = document.createElement("div");
      group.className = "variant-group";

      const label = document.createElement("div");
      label.className = "field-label";
      label.textContent = groupKey.replace(/[-_]/g, " ").toUpperCase();
      group.appendChild(label);

      const optionWrap = document.createElement("div");
      optionWrap.className = "variant-options";

      options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `variant-option ${index === 0 ? "is-selected" : ""}`;
        button.innerHTML = `<span>${escapeHtml(option.label)}</span>${Number(option.extra) ? `<small>${option.extra > 0 ? "+" : "−"}${money(Math.abs(option.extra))}</small>` : ""}`;

        button.addEventListener("click", () => {
          optionWrap.querySelectorAll(".variant-option").forEach((item) => item.classList.remove("is-selected"));
          button.classList.add("is-selected");
          selectedVariants[groupKey] = option;
          updateSummary();
        });

        optionWrap.appendChild(button);
        if (index === 0) selectedVariants[groupKey] = option;
      });

      group.appendChild(optionWrap);
      page.variants.appendChild(group);
    });
  }

  function variantExtra() {
    return Object.values(selectedVariants).reduce((sum, option) => sum + (Number(option?.extra) || 0), 0);
  }

  function speedExtra() {
    return Number(productionOptions[selectedSpeed]?.extra) || 0;
  }

  function unitPrice() {
    return (Number(product.price) || 0) + variantExtra() + speedExtra();
  }

  function totalPrice() {
    return unitPrice() * quantity;
  }

  function selectedOptionLines() {
    const lines = [];
    Object.entries(selectedVariants).forEach(([group, option]) => {
      if (option?.label) lines.push(`${group.toUpperCase()}: ${option.label}`);
    });
    customInputNodes.forEach(({ key, control }) => {
      if (control.type === "file") {
        if (control.files?.length) lines.push(`${key.toUpperCase()}: ${control.files[0].name}`);
      } else if (String(control.value || "").trim()) {
        lines.push(`${key.toUpperCase()}: ${control.value.trim()}`);
      }
    });
    return lines;
  }

  function updateSummary() {
    quantity = Math.max(minQty, Number(page.quantity.value) || minQty);
    page.quantity.value = String(quantity);

    const displayPrice = (Number(product.price) || 0) + variantExtra();
    page.price.textContent = money(displayPrice);
    page.total.textContent = money(totalPrice());
    page.summaryProduct.textContent = `${product.name} × ${quantity}`;
    page.summaryProduction.textContent = productionOptions[selectedSpeed]?.label || "REGULER";

    const options = selectedOptionLines().filter((line) => line.includes(":"));
    page.summaryOptions.innerHTML = options.length
      ? options.map((line) => `<span>${escapeHtml(line)}</span>`).join("")
      : `<span>No extra customization selected.</span>`;

    page.productionNote.textContent = `Estimasi ${productionOptions[selectedSpeed].days}. Waktu produksi dihitung setelah desain disetujui. Minggu libur produksi.`;

    [page.regular, page.fast, page.express].forEach((button) => button?.classList.remove("is-selected"));
    const active = { regular: page.regular, fast: page.fast, express: page.express }[selectedSpeed];
    active?.classList.add("is-selected");
  }

  function renderSpecs() {
    const configDetails = Array.isArray(product.details) ? product.details : [];
    const specs = [
      ...configDetails,
      ["Payment", "DP 50%"],
      ["Shipping", "Paid by customer"]
    ];

    page.specs.innerHTML = specs.map(([label, value]) => `
      <div class="spec-row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `).join("");
  }

  function buildWhatsAppMessage() {
    const lines = [
      "Halo GYEP, saya ingin memesan:",
      "",
      `Produk: ${product.name}`,
      `Kategori: ${product.categoryLabel}`,
      `Jumlah: ${quantity} pcs`,
      `Produksi: ${productionOptions[selectedSpeed].label} (${productionOptions[selectedSpeed].days})`
    ];

    selectedOptionLines().forEach((line) => lines.push(line));

    lines.push(
      "",
      `Estimasi total produk: ${money(totalPrice())}`,
      `DP 50%: ${money(totalPrice() * 0.5)}`,
      "Ongkir ditanggung customer.",
      "DP 50% dibayarkan di awal untuk memulai produksi. Pelunasan 50% mengikuti konfirmasi GYEP.",
      "",
      "Mohon info langkah selanjutnya. Terima kasih!"
    );

    return lines.join("\n");
  }

  function openWhatsApp() {
    const phone = "6280000000000"; // Ganti dengan nomor WhatsApp GYEP.
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(url, "_blank", "noopener");
  }

  page.whatsapp.addEventListener("click", openWhatsApp);

  page.marketplace.addEventListener("click", () => {
    if (!product.marketplaceUrl) {
      alert("Link marketplace produk ini belum diisi di products.js.");
      return;
    }
    window.open(product.marketplaceUrl, "_blank", "noopener");
  });

  page.qtyMinus.addEventListener("click", () => {
    page.quantity.value = String(Math.max(minQty, Number(page.quantity.value || minQty) - 1));
    updateSummary();
  });

  page.qtyPlus.addEventListener("click", () => {
    page.quantity.value = String(Math.max(minQty, Number(page.quantity.value || minQty) + 1));
    updateSummary();
  });

  page.quantity.addEventListener("input", updateSummary);

  [page.regular, page.fast, page.express].forEach((button) => {
    button?.addEventListener("click", () => {
      selectedSpeed = button.dataset.speed;
      updateSummary();
    });
  });

  // Live image preview for customer-uploaded photo inputs.
  page.customFields.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "file" || !input.files?.length) return;

    const file = input.files[0];
    const preview = input.closest(".custom-field")?.querySelector(".file-preview");
    if (!preview || !file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    preview.querySelector("img")?.remove();
    preview.hidden = false;
    preview.innerHTML = `<img src="${url}" alt="Preview upload">`;
  });

  function renderRelatedProducts() {
    const related = catalog
      .filter((item) => item.active && item.id !== product.id && item.category === product.category)
      .slice(0, 4);

    if (!related.length) {
      page.related.hidden = true;
      return;
    }

    page.related.hidden = false;
    page.relatedGrid.innerHTML = related.map((item) => `
      <a class="related-card" href="product.html?id=${encodeURIComponent(item.id)}">
        <div class="related-image">
          <span>${escapeHtml(item.categoryLabel)}</span>
          <strong>${escapeHtml(item.name)}</strong>
        </div>
        <div>
          <span class="eyebrow">${escapeHtml(item.categoryLabel)}</span>
          <h3>${escapeHtml(item.name)}</h3>
          <strong>${money(item.price)}</strong>
        </div>
      </a>
    `).join("");
  }

  renderGallery();
  renderVariants();
  renderCustomFields();

  // Add file preview blocks after controls have been created.
  customInputNodes.forEach(({ control }) => {
    if (control.type !== "file") return;
    const preview = document.createElement("div");
    preview.className = "file-preview";
    preview.hidden = true;
    control.closest(".custom-field")?.appendChild(preview);
  });

  renderSpecs();
  renderRelatedProducts();
  updateSummary();
});
