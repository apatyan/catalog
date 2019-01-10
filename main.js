class Item {
  constructor(productId, amount, priceInCents) {
    this.productId = productId;
    this.amount = amount;
    this.priceInCents = priceInCents;
  }
  increaseAmount(increaseBy) {
    this.amount += increaseBy;
  }
  decreaseAmount(decreaseBy) {
    if (this.amount > decreaseBy) {
      this.amount -= decreaseBy;
    } else {
      this.amount = 0;
    }
  }
  getAmount() {
    return this.amount;
  }

}

class Cart {
  constructor() {
    this.productItems = [];
  }
  increaseProductAmount(id, increaseBy, priceInCents) {
    for (let i = 0; i < this.productItems.length; i++) {
      if (id === this.productItems[i].productId) {
        this.productItems[i].increaseAmount(increaseBy);
        return;
      }
    }
    this.productItems.push(new Item(id, increaseBy, priceInCents));
  }

  updateProductAmount(index, amount) {
    if (amount >= 0) {
      this.productItems[index].amount = amount;
    }  else {
      this.removeProduct(index);
    } 
      this.displayCart();
  }

  removeProduct(index) {
    this.productItems.splice(index, 1);
    this.displayCart();
  }

  displayCart() {
    this.cleanDisplayedItems();
    let cart = document.getElementById('cart-name');

    for (let i = 0; i < this.productItems.length; i++) {

      for (let j = 0; j < catalog.length; j++) {
        if (catalog[j].id === this.productItems[i].productId) {

          let productDiv = document.createElement('div');
          productDiv.setAttribute('id', this.productItems[i].productId);
          cart.appendChild(productDiv);

          createImage(productDiv, j);
          createProductName(productDiv, j);
          createPrice(productDiv, j);
          createCounter(productDiv, i, this.productItems[i].amount);

          createRemoveButton(productDiv, i);
          break;
        }
      }
    }
    document.getElementById('total').innerHTML = this.calculateTotal();
  }

  cleanDisplayedItems() {
    let cart = document.getElementById('cart-name');
    while (cart.firstChild) {
      cart.removeChild(cart.firstChild);
    }
  }
  calculateTotal() {
    let sum = 0;
    for (let i = 0; i < this.productItems.length; i++) {
      sum += parseInt(this.productItems[i].amount) * parseInt(this.productItems[i].priceInCents);
    }
    sum = sum / 100;
    return '$' + sum;
  }
}

var cart = new Cart();
var container = document.getElementById('items-name');

for (let i = 0; i < catalog.length; i++) {
  let div = document.createElement('div');
  container.appendChild(div);

  createImage(div, i);
  createProductName(div, i);
  createPrice(div, i);

  let addProduct = document.createElement('button');
  addProduct.setAttribute('class', 'addProductButton');

  addProduct.addEventListener('click', function () { cart.increaseProductAmount(catalog[i].id, 1, catalog[i].priceInCents) });
  addProduct.addEventListener('click', function () { cart.displayCart() });

  let addProductNode = document.createTextNode('Add');
  addProduct.appendChild(addProductNode);
  div.appendChild(addProduct);
}

function createImage(divToAdd, index) {
  let image = document.createElement('img');
  image.setAttribute('class', 'productImage');
  image.setAttribute('src', catalog[index].imageUrl);
  divToAdd.appendChild(image);
}

function createProductName(divToAdd, index) {
  let productName = document.createElement("p");
  productName.setAttribute('class', 'productName');
  let productNameNode = document.createTextNode(catalog[index].name);
  productName.appendChild(productNameNode);
  divToAdd.appendChild(productName);
}

function createPrice(divToAdd, index) {
  let price = document.createElement('p');
  price.setAttribute('class', 'price');
  let priceNode = document.createTextNode("$" + (catalog[index].priceInCents * 0.01));
  price.appendChild(priceNode);
  divToAdd.appendChild(price);
}

function createCounter(divToAdd, index, amount) {
  let inputText = document.createElement('input');
  inputText.setAttribute('class', 'createCounter');
  inputText.setAttribute('type', 'number');
  inputText.setAttribute('value', amount);
  inputText.addEventListener('change', function() {cart.updateProductAmount(index, inputText.value)});
  divToAdd.appendChild(inputText);
}

function createRemoveButton(divToAdd, index) {
  let removeButton = document.createElement('span');
  removeButton.setAttribute('class', 'removeButton');
  removeButton.addEventListener('click', function () { cart.removeProduct(index) });
  let removeButtonNode = document.createTextNode("x");
  removeButton.appendChild(removeButtonNode);
  divToAdd.appendChild(removeButton);
}
