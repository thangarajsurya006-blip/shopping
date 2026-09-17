const btncart = document.querySelector("#cart-icon")
const cart = document.querySelector(".cart")
const btnclose = document.querySelector('#cart-close')

btncart.addEventListener('click',()=>
{
  cart.classList.add("cart-active")  
})

btnclose.addEventListener('click',()=>
{
  cart.classList.remove("cart-active")  
})

document.addEventListener('DOMContentLoaded',loadfood);

function loadfood()
{
  // remove food items
    let btnremove = document.querySelectorAll('.cart-remove')
    btnremove.forEach((btn)=>{
      btn.addEventListener('click',RemoveItem);
    })

    // product item quantity change
    let btnqty = document.querySelectorAll('.cart-quantity')
    btnqty.forEach((input)=>{
      input.addEventListener('change',changeqty);
    })

    // product cart
    let cartbtns = document.querySelectorAll('#cart-icon1');
    cartbtns.forEach((btn)=>{
      btn.addEventListener('click',AddCart)
    })

    updatetotal();
}

function RemoveItem()
{
  let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
itemlist = itemlist.filter((el)=>el.title!=title);
  if(confirm("Are you sure to remove "+`${title}`))
  this.parentElement.remove()
loadfood();
}

function changeqty()
{
  if(isNaN(this.value) || this.value<1)
  {
    this.value = 1;
  }
  loadfood();
}

let itemlist=[];
function AddCart()
{
  let food = this.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let image = food.querySelector('.food-image').src;

  let newspro = {title,price,image};

  if(itemlist.find((el)=>
    el.title == newspro.title)){
      alert(`${title}`+" is already purchased")
      return;
  }
  else{
    itemlist.push(newspro);
  }

  let newproduct = createcartproduct(title,price,image);
  let element = document.createElement('div');
  element.innerHTML = newproduct;
  let basket = document.querySelector(".cart-content");
  basket.append(element);
  loadfood();
}


function createcartproduct(title,price,image)
{
  return`
  <div class="cart-box">
        <img src="${image}" class="cart-img">
        <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
  `;
}

function updatetotal()
{
const cartItems=document.querySelectorAll('.cart-box');
const totalValue=document.querySelector('.total-price');

let total=0;

cartItems.forEach(product=>{
let priceElement=product.querySelector('.cart-price');
let price=parseFloat(priceElement. innerHTML.replace("Rs.",""));
let qty=product.querySelector('.cart-quantity').value;
total+=(price*qty);
product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

});

totalValue.innerHTML='Rs.'+total;
}