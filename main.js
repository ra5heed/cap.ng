

// Hamburger Menu Toggle
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Example product data 
const products = [
  {
    id: 1,
    name: "Classic Black Cap",
    image: "image/IMG_5772.png",
    price: 25,
    description: "A timeless black cap for every occasion.",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"],
    reviews: [
      { user: "Jane", rating: 5, comment: "Love the fit and style!" },
      { user: "Mike", rating: 4, comment: "Great quality, fast shipping." }
    ]
  },
  {
    id: 2,
    name: "Street Style Cap",
    image: "image/IMG_5773.png",
    price: 30,
    description: "Urban-inspired cap for a bold look.",
    colors: ["Red", "Black"],
    sizes: ["M", "L"],
    reviews: [
      { user: "Alex", rating: 5, comment: "Super stylish!" }
    ]
  },
  {
    id: 3,
    name: "Sporty Snapback",
    image: "image/IMG_5774.png",
    price: 28,
    description: "Perfect for workouts and casual wear.",
    colors: ["Blue", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      { user: "Sam", rating: 4, comment: "Very comfortable." }
    ]
  }
];

// Utility: Save/load cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
  const cart = getCart();
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = cart.length);
}

// Product Catalog Page
function renderProductList() {
  const list = document.getElementById('product-list');
  if (!list) return;
  list.innerHTML = products.map(product => `
    <div class="product-card">
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
      </a>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  `).join('');
  // Add to cart listeners
  list.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id);
    });
  });
}

// Product Detail Page
function renderProductDetail() {
  const detail = document.getElementById('product-detail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if (!product) {
    detail.innerHTML = '<p>Product not found.</p>';
    return;
  }
  detail.innerHTML = `
    <div class="product-detail-img">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-info">
      <h1>${product.name}</h1>
      <p class="price">$${product.price}</p>
      <p>${product.description}</p>
      <form id="add-to-cart-form">
        <label>Color:
          <select name="color">
            ${product.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </label>
        <label>Size:
          <select name="size">
            ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </label>
        <button type="submit">Add to Cart</button>
      </form>
      <div class="reviews">
        <h3>Reviews</h3>
        ${product.reviews.map(r => `<div class="review"><strong>${r.user}</strong> <span>★${r.rating}</span><p>${r.comment}</p></div>`).join('')}
      </div>
    </div>
  `;
  document.getElementById('add-to-cart-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addToCart(product.id);
  });
}

// Add to Cart
function addToCart(productId) {
  const cart = getCart();
  cart.push(productId);
  setCart(cart);
  updateCartCount();
  alert('Added to cart!');
}

// Cart Page
function renderCart() {
  const itemsDiv = document.getElementById('cart-items');
  const summaryDiv = document.getElementById('cart-summary');
  if (!itemsDiv || !summaryDiv) return;
  const cart = getCart();
  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    summaryDiv.innerHTML = '';
    return;
  }
  let total = 0;
  itemsDiv.innerHTML = cart.map(id => {
    const product = products.find(p => p.id === id);
    if (!product) return '';
    total += product.price;
    return `<div class="cart-item">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h2>${product.name}</h2>
        <p class="price">$${product.price}</p>
        <button class="remove-from-cart" data-id="${product.id}">Remove</button>
      </div>
    </div>`;
  }).join('');
  summaryDiv.innerHTML = `<div class="cart-total">
    <p>Total: <strong>$${total}</strong></p>
    <button id="checkout-btn">Checkout</button>
  </div>`;
  // Remove from cart
  itemsDiv.querySelectorAll('.remove-from-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.getAttribute('data-id')));
      renderCart();
    });
  });
  // Checkout
  document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    setCart([]);
    renderCart();
    updateCartCount();
  });
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(id => id !== productId);
  setCart(cart);
  updateCartCount();
}

// Newsletter Signup
function setupNewsletter() {
  document.querySelectorAll('#newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for subscribing!');
      form.reset();
    });
  });
}

// Contact Form
function setupContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    form.reset();
  });
}

// On page load
window.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  updateCartCount();
  renderProductList();
  renderProductDetail();
  renderCart();
  setupNewsletter();
  setupContactForm();
});
