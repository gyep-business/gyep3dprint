document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("shopGrid");
  const resultCount = document.getElementById("resultCount");
  const sortSelect = document.getElementById("shopSort");
  const emptyState = document.getElementById("emptyState");
  const categoryButtons = [...document.querySelectorAll("[data-category]")];

  const catalog = Array.isArray(window.GYEP_PRODUCTS) ? window.GYEP_PRODUCTS : [];
  if (!grid || !catalog.length) return;

  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("category") || "all";

  function formatPrice(value) {
    if (!value) return "Rp xxx.xxx";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function matches(product) {
    return activeCategory === "all" || product.category === activeCategory;
  }

  function getResults() {
    let results = catalog.filter((product) => product.active && matches(product));

    switch (sortSelect.value) {
      case "price-asc":
        results.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
        break;
      case "price-desc":
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name, "id"));
        break;
      default:
        results.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return results;
  }

  function render() {
    const results = getResults();
    resultCount.textContent = `${results.length} product${results.length === 1 ? "" : "s"}`;

    grid.innerHTML = results.map((product) => `
      <article class="shop-product-card">
        <a class="shop-product-image" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="${product.name}">
          ${product.featured ? '<span class="shop-badge">FEATURED</span>' : ""}
          <div class="catalog-art" data-type="${product.category}">
            <span>${product.categoryLabel.toUpperCase()}</span>
            <strong>${product.name}</strong>
          </div>
        </a>
        <div class="shop-product-info">
          <span class="eyebrow">${product.categoryLabel}</span>
          <h3>${product.name}</h3>
          <div class="shop-product-bottom">
            <strong>${formatPrice(product.price)}</strong>
            <a href="product.html?id=${encodeURIComponent(product.id)}">View Product →</a>
          </div>
          ${product.minimumOrder > 1 ? `<small>Min. order ${product.minimumOrder}</small>` : ""}
        </div>
      </article>
    `).join("");

    emptyState.hidden = results.length !== 0;
  }

  categoryButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === activeCategory);
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      const next = new URL(window.location.href);
      if (activeCategory === "all") next.searchParams.delete("category");
      else next.searchParams.set("category", activeCategory);
      history.replaceState({}, "", next);

      categoryButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });



  sortSelect.addEventListener("change", render);
  render();
});
