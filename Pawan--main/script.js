// Cart Management
const STORAGE_KEY = 'saanjh_cart';
const BUSINESS_PHONE = '+918349206021'; // WhatsApp number
const BUSINESS_NAME = 'The Saanjh Vibe';

// Initialize cart from localStorage
function initializeCart() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

// Get cart items
function getCartItems() {
  initializeCart();
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Add item to cart
function addToCart(name, price) {
  const cart = getCartItems();
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  showNotification(`${name} added to cart!`);
  return cart;
}

// Remove item from cart
function removeFromCart(name) {
  let cart = getCartItems();
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  displayCart();
}

// Update quantity
function updateQuantity(name, quantity) {
  const cart = getCartItems();
  const item = cart.find(item => item.name === name);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(name);
    } else {
      item.quantity = quantity;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      displayCart();
    }
  }
}

// Calculate total
function calculateTotal() {
  const cart = getCartItems();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Display cart on cart.html
function displayCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItemsEl) return; // Not on cart page

  const cart = getCartItems();

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li>Your cart is empty</li>';
    if (totalEl) totalEl.textContent = 'Total: ₹0';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    return;
  }

  if (checkoutBtn) checkoutBtn.style.display = 'block';

  cartItemsEl.innerHTML = cart.map(item => `
    <li class="cart-item">
      <div class="item-details">
        <strong>${item.name}</strong>
        <span class="item-price">₹${item.price}</span>
      </div>
      <div class="item-controls">
        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" class="qty-btn">−</button>
        <span class="quantity">${item.quantity}</span>
        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" class="qty-btn">+</button>
        <span class="item-total">₹${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart('${item.name}')" class="remove-btn">Remove</button>
      </div>
    </li>
  `).join('');

  const total = calculateTotal();
  if (totalEl) totalEl.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Format message for WhatsApp
function formatWhatsAppMessage() {
  const cart = getCartItems();

  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before checkout.');
    return null;
  }

  let message = `*${BUSINESS_NAME} - Order Request*\n\n`;
  message += `Hello! I would like to place an order:\n\n`;
  message += `*Items:*\n`;

  cart.forEach(item => {
    message += `• ${item.name}\n`;
    message += `  Quantity: ${item.quantity} × ₹${item.price} = ₹${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const total = calculateTotal();
  message += `\n*Total Amount: ₹${total.toFixed(2)}*\n\n`;
  message += `Please share the delivery address and confirm the order.\n`;
  message += `Thank you!`;

  return message;
}

// Checkout via WhatsApp
function checkoutViaWhatsApp() {
  const message = formatWhatsAppMessage();

  if (!message) return;

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${BUSINESS_PHONE.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  // Open WhatsApp in new tab
  window.open(whatsappLink, '_blank');

  // Clear cart after opening WhatsApp (optional - comment out if you want to keep items)
  // localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  // displayCart();
}

// Open checkout form
function openCheckoutForm() {
  const cart = getCartItems();
  
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before checkout.');
    return;
  }

  document.getElementById('checkoutModal').classList.add('show');
}

// Close checkout form
function closeCheckoutForm() {
  document.getElementById('checkoutModal').classList.remove('show');
}

// Submit order to backend
async function submitOrder() {
  const cart = getCartItems();
  
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById('submitOrderBtn');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        items: cart,
        totalAmount: calculateTotal()
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showNotification('✅ Order placed successfully! Order #' + data.orderId);
      
      // Clear form
      document.getElementById('checkoutForm').reset();
      
      // Close modal
      closeCheckoutForm();
      
      // Clear cart
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      displayCart();
      
      // Show success message with order ID
      setTimeout(() => {
        alert(`Your order has been placed!\n\nOrder ID: #${data.orderId}\n\nWe will contact you soon at ${phone}`);
      }, 500);
    } else {
      alert('Error: ' + (data.error || 'Failed to place order'));
    }
  } catch (error) {
    console.error('Order submission error:', error);
    alert('Error submitting order. Make sure the backend server is running on http://localhost:3000');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);

  // Hide and remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeCart();

  // If on cart page, display cart
  if (document.getElementById('cart-items')) {
    displayCart();
  }

  // Add click handlers to all "Shop" buttons on index.html
  attachShopButtonHandlers();
});

// Attach handlers to shop buttons
function attachShopButtonHandlers() {
  // Products data
  const products = {
    'Daisy Daydreamer': 350,
    'Champagne Candle': 450,
    'Cocktail Candle': 350,
    'Vanilla Blush': 450,
    'Velvet Ember': 1300,
    'Amber Horizon': 1300,
    'Silk Ember': 1350,
    'Heirloom Bloom': 1100,
    'Signature Oud Gift': 1900,
    'Moonlit Muse': 1350,
    'Golden Aura': 1450,
    'Noir Glow': 1650,
    'Velvet Bloom': 1550
  };

  // Find all product cards and add click handlers to shop buttons
  document.querySelectorAll('.product-card').forEach(card => {
    const h3 = card.querySelector('h3');
    if (h3) {
      const productName = h3.textContent.trim();
      const shopBtn = card.querySelector('.button.small');
      
      if (shopBtn && products[productName]) {
        // Update button text
        shopBtn.textContent = 'Add to Cart';
        
        // Add click handler to the link
        shopBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(productName, products[productName]);
        });
      }
    }
  });
}
