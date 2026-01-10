(function () {
  "use strict";

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function basePath() {
    // If current file is inside /pages, we need to go one level up for Assets/, css/, js/, docs/.
    return window.location.pathname.indexOf("/pages/") >= 0 ? "../" : "";
  }

  function resolvePath(path) {
    if (!path) return path;
    if (path.indexOf("http://") === 0 || path.indexOf("https://") === 0) return path;
    if (path.indexOf("mailto:") === 0) return path;
    if (path.charAt(0) === "#") return path;
    return basePath() + path;
  }

  function getPageName() {
    var main = $("main[data-page]");
    return main ? main.getAttribute("data-page") : "";
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function formatPricePKR(value) {
    if (typeof value !== "number") return "";
    return "PKR " + value.toString();
  }

  function categoryLabel(category) {
    if (category === "journals") return "Journals";
    if (category === "calendars") return "Calendars";
    if (category === "diaries") return "Diaries";
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  }

  function iconSvg(name) {
    // Minimal inline SVG icons (no external libraries).
    if (name === "moon") {
      return (
        '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M21 14.8A8.5 8.5 0 0 1 9.2 3a7 7 0 1 0 11.8 11.8Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
        "</svg>"
      );
    }
    if (name === "sun") {
      return (
        '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="1.8" />' +
        '<path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4M19.1 19.1l-1.4-1.4M6.3 6.3 4.9 4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />' +
        "</svg>"
      );
    }
    if (name === "cart") {
      return (
        '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M6 6h15l-1.5 8.5H7.2L6 6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
        '<path d="M6 6 5.4 3.5H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />' +
        '<path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />' +
        "</svg>"
      );
    }
    if (name === "heart") {
      return (
        '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M12 21s-7-4.7-9.3-9A5.7 5.7 0 0 1 12 6.6 5.7 5.7 0 0 1 21.3 12c-2.3 4.3-9.3 9-9.3 9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
        "</svg>"
      );
    }
    if (name === "user") {
      return (
        '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />' +
        '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="1.8" />' +
        "</svg>"
      );
    }
    return "";
  }

  function renderHeaderFooter() {
    var headerHost = $("[data-site-header]");
    var footerHost = $("[data-site-footer]");

    if (headerHost) {
      headerHost.innerHTML =
        '<div class="site-header" id="site-header">' +
        '<div class="container header-inner">' +
        '<a class="brand" href="' +
        resolvePath("index.html") +
        '" aria-label="RasaGrid Calendars">' +
        '<img class="brand-mark" src="' +
        resolvePath("Assets/weblogo.png") +
        '" alt="RasaGrid Calendars logo" width="36" height="36" />' +
        '<span class="brand-name">RasaGrid Calendars</span>' +
        "</a>" +
        '<button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false">' +
        '<span class="nav-toggle__label">Menu</span>' +
        "</button>" +
        '<nav class="site-nav" id="site-nav" aria-label="Primary">' +
        '<a class="nav-link" data-nav="home" href="' +
        resolvePath("index.html") +
        '">Home</a>' +
        '<a class="nav-link" data-nav="products" href="' +
        resolvePath("pages/products.html") +
        '">Products</a>' +
        '<a class="nav-link" data-nav="categories" href="' +
        resolvePath("pages/categories.html") +
        '">Categories</a>' +
        '<a class="nav-link" data-nav="offers" href="' +
        resolvePath("pages/offers.html") +
        '">Offers</a>' +
        '<a class="nav-link" data-nav="new" href="' +
        resolvePath("pages/new.html") +
        '">New</a>' +
        '<a class="nav-link" data-nav="blog" href="' +
        resolvePath("pages/blog.html") +
        '">Blog</a>' +
        '<a class="nav-link" data-nav="contact" href="' +
        resolvePath("pages/contact.html") +
        '">Contact</a>' +
        "</nav>" +
        '<div class="header-actions">' +
        '<button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle theme">' +
        iconSvg("moon") +
        "</button>" +
        '<a class="icon-btn" href="' +
        resolvePath("pages/wishlist.html") +
        '" aria-label="Wishlist">' +
        iconSvg("heart") +
        '<span class="count-dot" data-wishlist-count>0</span>' +
        "</a>" +
        '<a class="icon-btn" href="' +
        resolvePath("pages/cart.html") +
        '" aria-label="Cart">' +
        iconSvg("cart") +
        '<span class="count-dot" data-cart-count>0</span>' +
        "</a>" +
        '<a class="icon-btn" href="' +
        resolvePath("pages/account.html") +
        '" aria-label="Account">' +
        iconSvg("user") +
        "</a>" +
        "</div>" +
        "</div>" +
        "</div>";
    }

    if (footerHost) {
      footerHost.innerHTML =
        '<footer class="site-footer">' +
        '<div class="container footer-grid">' +
        '<div class="footer-brand-block">' +
        '<div class="footer-brand">RasaGrid Calendars</div>' +
        '<div class="footer-muted">Premium calendars, diaries and journals.</div>' +
        '<div class="footer-muted">Email: <a class="footer-link" href="mailto:info@RasaGridcalendars.com">info@RasaGridcalendars.com</a></div>' +
        "</div>" +
        '<div class="footer-col">' +
        '<div class="footer-title">Shop</div>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/products.html") +
        '">Products</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/categories.html") +
        '">Categories</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/offers.html") +
        '">Offers</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/new.html") +
        '">New</a>' +
        "</div>" +
        '<div class="footer-col">' +
        '<div class="footer-title">Account</div>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/account.html") +
        '">Account</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/cart.html") +
        '">Cart</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/wishlist.html") +
        '">Wishlist</a>' +
        "</div>" +
        '<div class="footer-col">' +
        '<div class="footer-title">Company</div>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/about.html") +
        '">About</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/blog.html") +
        '">Blog</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/contact.html") +
        '">Contact</a>' +
        "</div>" +
        '<div class="footer-col">' +
        '<div class="footer-title">Legal</div>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/faq.html") +
        '">FAQ</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/terms.html") +
        '">Terms</a>' +
        '<a class="footer-link" href="' +
        resolvePath("pages/privacy.html") +
        '">Privacy</a>' +
        "</div>" +
        "</div>" +
        '<div class="container footer-bottom">' +
        '<div class="footer-muted">© ' +
        new Date().getFullYear() +
        ' RasaGrid Calendars. Academic demo site.</div>' +
        '<a class="back-to-top" href="#top">Back to top</a>' +
        "</div>" +
        "</footer>";
    }
  }

  function setActiveNav() {
    var page = getPageName();
    var map = {
      home: "home",
      products: "products",
      categories: "categories",
      calendars: "categories",
      diaries: "categories",
      journals: "categories",
      offers: "offers",
      "new-arrivals": "new",
      new: "new",
      blog: "blog",
      "blog-detail": "blog",
      contact: "contact",
      cart: null,
      wishlist: null,
      checkout: null,
      login: null,
      account: null
    };

    var active = map[page] || null;
    $all(".nav-link[data-nav]").forEach(function (a) {
      a.classList.toggle("is-active", active && a.getAttribute("data-nav") === active);
    });
  }

  function ensureBreadcrumbFallback() {
    var host = $("[data-breadcrumbs]");
    if (!host) return;
    if (host.children && host.children.length) return;

    var titleEl = $(".page-title");
    var title = titleEl ? titleEl.textContent.trim() : "";
    if (!title) title = "Page";

    renderBreadcrumbs([{ label: "Home", href: "index.html" }, { label: title }]);
  }

  function setupMobileNav() {
    var toggle = $(".nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      var target = e.target;
      if (!nav.classList.contains("is-open")) return;

      var clickedToggle = toggle.contains(target);
      var clickedNav = nav.contains(target);
      if (!clickedToggle && !clickedNav) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function updateHeaderCounts() {
    if (!window.RasaGridCart) return;
    var cart = $("[data-cart-count]");
    var wish = $("[data-wishlist-count]");
    if (cart) cart.textContent = String(window.RasaGridCart.cartCount());
    if (wish) wish.textContent = String(window.RasaGridCart.wishlistCount());
  }

  function buildProductCard(product, options) {
    var opts = options || {};
    var card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-category", product.category);

    var media = document.createElement("div");
    media.className = "product-card__media";

    var img = document.createElement("img");
    img.className = "product-card__image";
    img.src = resolvePath(product.image);
    img.alt = product.name;
    img.loading = "lazy";

    var badge = document.createElement("div");
    badge.className = "product-card__badge";
    badge.textContent = categoryLabel(product.category);

    media.appendChild(img);
    media.appendChild(badge);

    var body = document.createElement("div");
    body.className = "product-card__body";

    var title = document.createElement("h3");
    title.className = "product-card__title";
    title.textContent = product.name;

    var summary = document.createElement("p");
    summary.className = "product-card__summary";
    summary.textContent = product.summary;

    var meta = document.createElement("div");
    meta.className = "product-meta";
    meta.textContent = formatPricePKR(product.price);

    body.appendChild(title);
    body.appendChild(summary);
    body.appendChild(meta);

    var actions = document.createElement("div");
    actions.className = "product-card__actions";

    var detailsLink = document.createElement("a");
    detailsLink.className = "btn btn-primary";
    detailsLink.href = resolvePath("pages/product-detail.html?id=" + encodeURIComponent(product.id));
    detailsLink.textContent = "View Details";

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn btn-ghost";
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", function () {
      if (window.RasaGridCart) window.RasaGridCart.addToCart(product.id, 1);
      updateHeaderCounts();
    });

    var wishBtn = document.createElement("button");
    wishBtn.type = "button";
    wishBtn.className = "btn btn-ghost";
    wishBtn.textContent = opts.mode === "wishlist" ? "Remove" : "Wishlist";
    wishBtn.addEventListener("click", function () {
      if (!window.RasaGridCart) return;
      window.RasaGridCart.toggleWishlist(product.id);
      updateHeaderCounts();
      if (typeof opts.onWishlistToggle === "function") opts.onWishlistToggle();
    });

    actions.appendChild(detailsLink);
    actions.appendChild(addBtn);
    actions.appendChild(wishBtn);

    card.appendChild(media);
    card.appendChild(body);
    card.appendChild(actions);

    return card;
  }

  function setActiveFilterButton(activeCategory) {
    $all(".filter-btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-filter") === activeCategory;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function renderProductsIntoGrid(filter, gridSelector) {
    var grid = $(gridSelector || "#products-grid");
    if (!grid || !window.RasaGridData) return;

    grid.innerHTML = "";
    var list = window.RasaGridData.products;

    var visible = list.filter(function (p) {
      return filter === "all" ? true : p.category === filter;
    });

    visible.forEach(function (product) {
      grid.appendChild(buildProductCard(product));
    });
  }

  function setupFilterBar(defaultFilter, gridSelector) {
    var buttons = $all(".filter-btn");
    if (!buttons.length) return;

    var initial = defaultFilter || "all";
    setActiveFilterButton(initial);
    renderProductsIntoGrid(initial, gridSelector);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter") || "all";
        setActiveFilterButton(filter);
        renderProductsIntoGrid(filter, gridSelector);
      });
    });
  }

  function renderBreadcrumbs(items) {
    var host = $("[data-breadcrumbs]");
    if (!host) return;
    host.innerHTML = "";

    items.forEach(function (item, idx) {
      if (idx > 0) {
        var sep = document.createElement("span");
        sep.className = "breadcrumbs__sep";
        sep.textContent = "/";
        host.appendChild(sep);
      }

      if (item.href) {
        var a = document.createElement("a");
        a.href = resolvePath(item.href);
        a.textContent = item.label;
        host.appendChild(a);
      } else {
        var span = document.createElement("span");
        span.textContent = item.label;
        host.appendChild(span);
      }
    });
  }

  function mountProductDetail() {
    if (!window.RasaGridData) return;
    var id = getQueryParam("id");
    var product = window.RasaGridData.findProduct(id);

    var title = $("[data-product-title]");
    var img = $("[data-product-image]");
    var cat = $("[data-product-category]");
    var desc = $("[data-product-description]");
    var price = $("[data-product-price]");
    var doc = $("[data-product-doc]");

    if (!product) {
      if (title) title.textContent = "Product not found";
      return;
    }

    document.title = product.name + " | RasaGrid Calendars";

    if (title) title.textContent = product.name;
    if (img) {
      img.src = resolvePath(product.image);
      img.alt = product.name;
    }
    if (cat) cat.textContent = categoryLabel(product.category);
    if (desc) desc.textContent = product.description;
    if (price) price.textContent = formatPricePKR(product.price);
    if (doc) doc.href = resolvePath(product.doc);

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Products", href: "pages/products.html" },
      { label: product.name }
    ]);

    var addBtn = $("[data-add-to-cart]");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        if (window.RasaGridCart) window.RasaGridCart.addToCart(product.id, 1);
        updateHeaderCounts();
      });
    }

    var wishBtn = $("[data-toggle-wishlist]");
    if (wishBtn) {
      wishBtn.addEventListener("click", function () {
        if (window.RasaGridCart) window.RasaGridCart.toggleWishlist(product.id);
        updateHeaderCounts();
      });
    }

    // Similar products
    var similarHost = $("[data-similar-grid]");
    if (similarHost && window.RasaGridData) {
      var list = window.RasaGridData.products
        .filter(function (p) {
          return p.id !== product.id;
        })
        .filter(function (p) {
          return p.category === product.category;
        });

      if (list.length < 4) {
        var extra = window.RasaGridData.products.filter(function (p) {
          return p.id !== product.id && p.category !== product.category;
        });
        list = list.concat(extra);
      }

      similarHost.innerHTML = "";
      list.slice(0, 6).forEach(function (p) {
        similarHost.appendChild(buildProductCard(p));
      });
    }
  }

  function mountCart() {
    if (!window.RasaGridCart || !window.RasaGridData) return;

    var host = $("[data-cart-items]");
    var totalHost = $("[data-cart-total]");
    if (!host) return;

    function render() {
      host.innerHTML = "";
      var items = window.RasaGridCart.getCart();
      var total = 0;

      if (!items.length) {
        var empty = document.createElement("div");
        empty.className = "card card--padded";
        empty.textContent = "Your cart is empty.";
        host.appendChild(empty);
        if (totalHost) totalHost.textContent = "PKR 0";
        return;
      }

      items.forEach(function (line) {
        var p = window.RasaGridData.findProduct(line.id);
        if (!p) return;

        total += p.price * line.qty;

        var row = document.createElement("div");
        row.className = "card card--padded cart-row";

        row.innerHTML =
          '<div class="cart-row__left">' +
          '<img class="cart-row__img" src="' +
          resolvePath(p.image) +
          '" alt="' +
          p.name.replace(/"/g, "&quot;") +
          '" />' +
          '<div class="cart-row__meta">' +
          '<div class="cart-row__title">' +
          p.name +
          "</div>" +
          '<div class="muted">' +
          formatPricePKR(p.price) +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="cart-row__right">' +
          '<input class="input cart-row__qty" type="number" min="1" value="' +
          line.qty +
          '" />' +
          '<button class="btn btn-ghost" type="button" data-remove>Remove</button>' +
          "</div>";

        var qtyInput = $(".cart-row__qty", row);
        qtyInput.addEventListener("change", function () {
          window.RasaGridCart.updateQty(line.id, Number(qtyInput.value || 1));
          updateHeaderCounts();
          render();
        });

        var removeBtn = $("[data-remove]", row);
        removeBtn.addEventListener("click", function () {
          window.RasaGridCart.removeFromCart(line.id);
          updateHeaderCounts();
          render();
        });

        host.appendChild(row);
      });

      if (totalHost) totalHost.textContent = formatPricePKR(total);
    }

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Cart" }
    ]);

    render();
  }

  function mountWishlist() {
    if (!window.RasaGridCart || !window.RasaGridData) return;

    var host = $("[data-wishlist-items]");
    if (!host) return;

    function render() {
      host.innerHTML = "";
      var ids = window.RasaGridCart.getWishlist();
      if (!ids.length) {
        var empty = document.createElement("div");
        empty.className = "card card--padded";
        empty.textContent = "Your wishlist is empty.";
        host.appendChild(empty);
        return;
      }

      ids.forEach(function (id) {
        var p = window.RasaGridData.findProduct(id);
        if (!p) return;
        host.appendChild(
          buildProductCard(p, {
            mode: "wishlist",
            onWishlistToggle: function () {
              render();
            }
          })
        );
      });
    }

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Wishlist" }
    ]);

    render();
  }

  function mountLogin() {
    if (!window.RasaGridAuth) return;
    var hint = $("[data-login-hint]");
    if (hint) {
      hint.textContent = "Demo login: use any email and any password.";
    }

    var form = $("[data-login-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = $("[name=email]", form).value;
      var password = $("[name=password]", form).value;

      var ok = window.RasaGridAuth.login(email, password);
      var error = $("[data-login-error]");
      if (!ok) {
        if (error) error.textContent = "Please enter an email and password.";
        return;
      }

      var redirect = getQueryParam("redirect") || "account.html";
      window.location.href = resolvePath("pages/" + redirect);
    });

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Login" }
    ]);
  }

  function mountAccount() {
    if (!window.RasaGridAuth) return;
    window.RasaGridAuth.requireAuth("account.html");

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Account" }
    ]);

    var logoutBtn = $("[data-logout]");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        window.RasaGridAuth.logout();
        window.location.href = resolvePath("pages/login.html");
      });
    }
  }

  function initHome() {
    setupFilterBar("all", "#products-grid");
  }

  function initProducts() {
    var initial = getQueryParam("category") || "all";
    setupFilterBar(initial, "#products-grid");
    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Products" }
    ]);
  }

  function initCategoryPage(category) {
    // Category pages may not have filter buttons; always render the grid.
    renderProductsIntoGrid(category, "#products-grid");
    // If a filter bar exists on the page, keep it in sync.
    setupFilterBar(category, "#products-grid");
    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Categories", href: "pages/categories.html" },
      { label: categoryLabel(category) }
    ]);
  }

  function mountCategories() {
    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Categories" }
    ]);
  }

  function mountShowcase(pageName) {
    // Lightweight pages: Offers / New Arrivals.
    if (!window.RasaGridData) return;

    var list = window.RasaGridData.products.slice();
    if (pageName === "offers") {
      list = list.slice(0, 6);
      renderBreadcrumbs([
        { label: "Home", href: "index.html" },
        { label: "Offers" }
      ]);
    }

    if (pageName === "new-arrivals") {
      list = list.slice(Math.max(0, list.length - 6));
      renderBreadcrumbs([
        { label: "Home", href: "index.html" },
        { label: "New Arrivals" }
      ]);
    }

    var grid = $("#products-grid");
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach(function (p) {
      grid.appendChild(buildProductCard(p));
    });
  }

  function mountBlogList() {
    if (!window.RasaGridData) return;

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Blog" }
    ]);

    var host = $("[data-blog-list]");
    if (!host) return;

    host.innerHTML = "";
    window.RasaGridData.blogs.forEach(function (post) {
      var card = document.createElement("article");
      card.className = "card card--padded";
      card.innerHTML =
        '<div class="blog-card__date">' +
        post.date +
        "</div>" +
        '<h3 class="blog-card__title">' +
        post.title +
        "</h3>" +
        '<p class="blog-card__excerpt">' +
        post.excerpt +
        "</p>" +
        '<a class="btn btn-primary" href="' +
        resolvePath("pages/blog-detail.html?id=" + encodeURIComponent(post.id)) +
        '">Read More</a>';
      host.appendChild(card);
    });
  }

  function mountBlogDetail() {
    if (!window.RasaGridData) return;

    var id = getQueryParam("id");
    var post = window.RasaGridData.findBlog(id);

    var title = $("[data-blog-title]");
    var date = $("[data-blog-date]");
    var content = $("[data-blog-content]");

    if (!post) {
      if (title) title.textContent = "Post not found";
      return;
    }

    document.title = post.title + " | RasaGrid Blog";
    if (title) title.textContent = post.title;
    if (date) date.textContent = post.date;
    if (content) content.textContent = post.content;

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Blog", href: "pages/blog.html" },
      { label: post.title }
    ]);
  }

  function mountCheckout() {
    if (!window.RasaGridCart || !window.RasaGridData) return;

    renderBreadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Cart", href: "pages/cart.html" },
      { label: "Checkout" }
    ]);

    var host = $("[data-checkout-summary]");
    var totalHost = $("[data-checkout-total]");
    if (!host) return;

    var items = window.RasaGridCart.getCart();
    var total = 0;
    host.innerHTML = "";

    if (!items.length) {
      var empty = document.createElement("div");
      empty.className = "card card--padded";
      empty.textContent = "Your cart is empty. Add products before checkout.";
      host.appendChild(empty);
      if (totalHost) totalHost.textContent = "PKR 0";
      return;
    }

    items.forEach(function (line) {
      var p = window.RasaGridData.findProduct(line.id);
      if (!p) return;
      var lineTotal = p.price * line.qty;
      total += lineTotal;

      var row = document.createElement("div");
      row.className = "card card--padded";
      row.innerHTML =
        '<div class="checkout-line">' +
        '<div>' +
        '<div class="checkout-line__name">' +
        p.name +
        "</div>" +
        '<div class="checkout-line__qty">Qty: ' +
        line.qty +
        "</div>" +
        "</div>" +
        '<div class="checkout-line__price">' +
        formatPricePKR(lineTotal) +
        "</div>" +
        "</div>";
      host.appendChild(row);
    });

    if (totalHost) totalHost.textContent = formatPricePKR(total);

    var form = $("[data-checkout-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        window.RasaGridCart.clearCart();
        updateHeaderCounts();
        window.location.href = resolvePath("pages/products.html");
      });
    }
  }

  function init() {
    window.RasaGridUI = {
      basePath: basePath,
      resolvePath: resolvePath
    };

    renderHeaderFooter();
    setupMobileNav();
    setActiveNav();
    updateHeaderCounts();

    document.addEventListener("RasaGrid:statechange", updateHeaderCounts);

    var page = getPageName();
    if (page === "home") initHome();
    if (page === "products") initProducts();
    if (page === "categories") mountCategories();
    if (page === "calendars") initCategoryPage("calendars");
    if (page === "diaries") initCategoryPage("diaries");
    if (page === "journals") initCategoryPage("journals");
    if (page === "offers") mountShowcase("offers");
    if (page === "new-arrivals") mountShowcase("new-arrivals");
    if (page === "new") mountShowcase("new-arrivals");
    if (page === "blog") mountBlogList();
    if (page === "blog-detail") mountBlogDetail();
    if (page === "product-detail") mountProductDetail();
    if (page === "cart") mountCart();
    if (page === "wishlist") mountWishlist();
    if (page === "checkout") mountCheckout();
    if (page === "login") mountLogin();
    if (page === "account") mountAccount();

    // Pages like about/faq/terms/privacy/contact/new can rely on this.
    ensureBreadcrumbFallback();

    var contactForm = document.querySelector("[data-contact-form]");
    if (contactForm) {
      var status = document.querySelector("[data-contact-form-status]");
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (status) {
          status.textContent = "Thanks! Your message has been saved (demo). We'll get back to you soon.";
        }
        contactForm.reset();
      });
    }

    // Theme icon swaps based on current theme.
    var themeBtn = $("[data-theme-toggle]");
    if (themeBtn) {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      themeBtn.innerHTML = current === "dark" ? iconSvg("sun") : iconSvg("moon");
      document.addEventListener("click", function (e) {
        var target = e.target;
        var btn = target && target.closest ? target.closest("[data-theme-toggle]") : null;
        if (!btn) return;
        setTimeout(function () {
          var now = document.documentElement.getAttribute("data-theme") || "light";
          btn.innerHTML = now === "dark" ? iconSvg("sun") : iconSvg("moon");
        }, 0);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
