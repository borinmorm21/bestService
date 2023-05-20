const card = document.querySelector(".container");
const searchInput = document.getElementById("search");
const cartButton = document.getElementById("cart");
const cartCountElement = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartItemsContainer = document.getElementById("cartItems");
let cartCount = 0;
let cartItems = [];

function filterCards(searchTerm) {
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  renderCards(filteredData);
}

function renderCards(cards) {
  card.innerHTML = cards
    .map(
      (card, i) => `
        <div class="card">
          <img src="${card.image}" alt="image">
          <div class="card-info">
            <h2>${card.price} USD</h2>
            <h4>${card.title}</h4>
            <p>${card.description}</p>
          </div>
          <button class="add-to-cart" onclick="addToCart(${i})">Add to Cart</button>
        </div>
      `
    )
    .join("");
}

function addToCart(index) {
    const selectedItem = data[index];
    const existingCartItem = cartItems.find((item) => item.title === selectedItem.title);
  
    if (existingCartItem) {
      // If the item already exists in the cart, show a message or perform any desired action
      alert("Item already added to cart");
      return;
    }
  
    selectedItem.count = 1;
    cartItems.push(selectedItem);
  
    cartCount++;
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = "block";
  
    if (cartPanel.classList.contains("show")) {
      renderCartItems();
    }
  }
  

function decreaseCount(index) {
  const selectedItem = data[index];
  const existingCartItem = cartItems.find((item) => item.title === selectedItem.title);

  if (existingCartItem && existingCartItem.count > 0) {
    existingCartItem.count--;
    renderCartItems();
  } else if (existingCartItem && existingCartItem.count === 0) {
    // If count reaches 0, remove the item from the cart
    const itemIndex = cartItems.indexOf(existingCartItem);
    cartItems.splice(itemIndex, 1);
    renderCartItems();
  }
}
  
  function increaseCount(index) {
    const selectedItem = data[index];
    const existingCartItem = cartItems.find((item) => item.title === selectedItem.title);
  
    if (existingCartItem) {
      existingCartItem.count++;
    }
  
    renderCartItems();
  }
  

function toggleCartPanel() {
    cartPanel.classList.toggle("show");
    renderCartItems(); // Render cart items whenever the panel is toggled
  }
  

  function renderCartItems() {
    cartItemsContainer.innerHTML = cartItems
      .map(
        (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="image">
            <div class="cart-item-info">
              <h4>${item.title}</h4>
              <h2>${item.price} USD</h2>
              <div class="count-buttons">
                <button onclick="decreaseItemCount('${item.title}')">-</button>
                <span>${item.count}</span>
                <button onclick="increaseItemCount('${item.title}')">+</button>
                <button onclick="removeItemFromCart('${item.title}')">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  
    const countButtons = document.querySelectorAll(".count-buttons");
  
    countButtons.forEach((countButton) => {
      const count = countButton.querySelector("span").textContent;
  
      if (count <= 0) {
        countButton.style.display = "none";
      } else {
        countButton.style.display = "flex";
      }
    });
  
    if (cartItems.length === 0) {
      cartPanel.classList.remove("show");
      cartCount = 0;
      cartCountElement.textContent = cartCount;
      cartCountElement.style.display = "none";
    }
  }

  function removeItemFromCart(title) {
    const existingCartItem = cartItems.find((item) => item.title === title);
  
    if (existingCartItem) {
      const itemIndex = cartItems.indexOf(existingCartItem);
      cartItems.splice(itemIndex, 1);
      renderCartItems();
    }
  }
  
  

function decreaseItemCount(title) {
  const existingCartItem = cartItems.find((item) => item.title === title);

  if (existingCartItem && existingCartItem.count > 0) {
    existingCartItem.count--;
    renderCartItems();
  }
}

function increaseItemCount(title) {
  const existingCartItem = cartItems.find((item) => item.title === title);

  if (existingCartItem) {
    existingCartItem.count++;
    renderCartItems();
  }
}

renderCards(data);
