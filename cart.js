const cart = document.querySelectorAll(".addToCart");
console.log(cart);

const products = [
    { name: 'Product 1', price: '1000', image: 'https://imagizer.imageshack.com/img924/5833/FbZiAG.jpg',inCart: 0 },
    { name: 'Product 2', price: '2000', image: 'https://imagizer.imageshack.com/img924/5833/FbZiAG.jpg',inCart: 0 },
    { name: 'Product 3', price: '3000', image: 'https://imagizer.imageshack.com/img924/5833/FbZiAG.jpg',inCart: 0 },
    { name: 'Product 4', price: '4000', image: 'https://imagizer.imageshack.com/img924/5833/FbZiAG.jpg',inCart: 0 },

    
];



function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + parseInt(product.price));
    } else {
        localStorage.setItem('totalCost', parseInt(product.price));
    }
}

function cartCount() {
    let productCount = localStorage.getItem('cartCount');

    if (productCount) {
        localStorage.setItem('cartCount', parseInt(productCount) + 1);
    } else {
        localStorage.setItem('cartCount', 1);
    }

    document.querySelector('.countItem.white-icon').textContent = localStorage.getItem('cartCount');
}

function storeProduct(product) {
    let selectedItems = localStorage.getItem('selectedItems');

    if (selectedItems) {
        selectedItems = JSON.parse(selectedItems);
    } else {
        selectedItems = [];
    }

    selectedItems.push(product);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
}

cart.forEach((item, index) => {
    item.addEventListener('click', () => {
        totalCost(products[index]);
        cartCount();
        storeProduct(products[index]);
        displayOrderData();
    });
});

function displayOrderData() {
    const orderData = localStorage.getItem('selectedItems');
    const selectedItems = JSON.parse(orderData);

    // Display order data on the page
    if (selectedItems && selectedItems.length > 0) {
        const orderDetailsContainer = document.querySelector('#orderDetailsContainer');
        orderDetailsContainer.innerHTML = ''; // Clear previous data

        selectedItems.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card', 'mx-2'); // Add Bootstrap card classes
            card.style.width = '10rem'; // Set card width as per your requirement

            const imageElement = document.createElement('img');
            imageElement.src = item.image;
            imageElement.classList.add('card-img-top');
            imageElement.alt = 'Product Image';

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const itemName = document.createElement('h5');
            itemName.classList.add('card-title');
            itemName.textContent = item.name;

            const itemPrice = document.createElement('p');
            itemPrice.classList.add('card-text');
            itemPrice.textContent = 'Product Price: R' + item.price;

            cardBody.appendChild(itemName);
            cardBody.appendChild(itemPrice);

            card.appendChild(imageElement);
            card.appendChild(cardBody);

            orderDetailsContainer.appendChild(card);

        })
        } else {
        // Handle the case when there are no selected items in Local Storage
        const orderDetailsContainer = document.querySelector('#orderDetails');
        orderDetailsContainer.textContent = "No items selected for the order.";
    }
}

function clearOrderData() {
    // Clear the order data from Local Storage
    localStorage.removeItem('selectedItems');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartCount');


    // Clear the order details from the page
    const orderDetailsContainer = document.querySelector('#orderDetailsContainer');
    orderDetailsContainer.innerHTML = "No items selected for the order.";
}


// Call the displayOrderData function initially to display the data on page load.
displayOrderData();

const myModal = document.getElementById('myModal');
const stayBtn = document.getElementById('stayBtn');
const leaveBtn = document.getElementById('leaveBtn');

function showModal() {
  myModal.style.display = 'block';
}

function hideModal() {
  myModal.style.display = 'none';
}

function leavePage() {
  console.log('Leaving the page...');
  // You can redirect the user or do other actions here
  window.location.assign('https://www.google.com');
  // For demonstration purposes, let's simply close the modal
  hideModal();
}

document.addEventListener('mouseleave', (e) => {
  // Show the modal when the mouse leaves the page area
  if (e.clientY <= 0) {
    showModal();
  }
});

stayBtn.addEventListener('click', hideModal);

leaveBtn.addEventListener('click', leavePage);
