(function () {
  "use strict";

  var CART_KEY = "RasaGrid_cart";
  var WISHLIST_KEY = "RasaGrid_wishlist";

  function safeParse(json, fallback) {
    try {
      var v = JSON.parse(json);
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }

  function getCart() {
    return safeParse(localStorage.getItem(CART_KEY), []);
  }

  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    notify();
  }

  function getWishlist() {
    return safeParse(localStorage.getItem(WISHLIST_KEY), []);
  }

  function setWishlist(ids) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    notify();
  }

  function cartCount() {
    var items = getCart();
    var total = 0;
    for (var i = 0; i < items.length; i++) total += items[i].qty;
    return total;
  }

  function wishlistCount() {
    return getWishlist().length;
  }

  function addToCart(productId, qty) {
    var items = getCart();
    var amount = typeof qty === "number" && qty > 0 ? qty : 1;

    for (var i = 0; i < items.length; i++) {
      if (items[i].id === productId) {
        items[i].qty += amount;
        setCart(items);
        return;
      }
    }

    items.push({ id: productId, qty: amount });
    setCart(items);
  }

  function updateQty(productId, qty) {
    var items = getCart();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === productId) {
        items[i].qty = Math.max(1, qty);
        setCart(items);
        return;
      }
    }
  }

  function removeFromCart(productId) {
    var items = getCart().filter(function (x) {
      return x.id !== productId;
    });
    setCart(items);
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(productId) {
    var ids = getWishlist();
    var idx = ids.indexOf(productId);
    if (idx >= 0) ids.splice(idx, 1);
    else ids.push(productId);

    setWishlist(ids);
    return ids.indexOf(productId) >= 0;
  }

  function isWishlisted(productId) {
    return getWishlist().indexOf(productId) >= 0;
  }

  function notify() {
    document.dispatchEvent(new CustomEvent("RasaGrid:statechange"));
  }

  window.RasaGridCart = {
    getCart: getCart,
    setCart: setCart,
    cartCount: cartCount,

    getWishlist: getWishlist,
    setWishlist: setWishlist,
    wishlistCount: wishlistCount,

    addToCart: addToCart,
    updateQty: updateQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,

    toggleWishlist: toggleWishlist,
    isWishlisted: isWishlisted
  };
})();
