let queryString = location.search.substring(6);
let shopId = parseInt(queryString);
console.log(shopId);
let shopDetails = getShop(shopId)[0];
console.log(shopDetails.open);
//add details of the shop to the card heading -
let spanOpen = document.createElement("span");
if (shopDetails.open) {
    spanOpen.setAttribute("class","badge badge-success");
    spanOpen.innerText = "OPEN";
}
else {
    spanOpen.setAttribute("class","badge badge-danger");
    spanOpen.innerText = "CLOSED";
}
let spanDelivery = document.createElement("span");
if (shopDetails.delivers) {
    spanDelivery.setAttribute("class","badge badge-success");
    spanDelivery.innerText = "DELIVERY";
}
else {
    spanDelivery.setAttribute("class","badge badge-danger");
    spanDelivery.innerText = "NO DELIVERY";
}
let shopname = document.createTextNode(shopDetails.name + " | ");
let cardHeading = document.getElementById("shop-title");
cardHeading.appendChild(shopname);
cardHeading.appendChild(spanOpen);
cardHeading.appendChild(spanDelivery);
// adding details to card body
document.getElementById("shop-address").innerHTML = shopDetails.address;
document.getElementById("shop-contact").innerHTML = shopDetails.phone;
document.getElementById("delivery-charges").innerHTML = shopDetails.delivery_charges;

//now loading the products
let products = productRouter(shopId);
let cartCounterMain = document.getElementById("cart-counter");
let productsList = document.getElementById("products-list");
products.forEach(prod => {
    let innerdivnew = document.createElement("div");
    innerdivnew.setAttribute("class","media-body");
    //div -> name h5
    let newh5 = document.createElement("h5");
    newh5.innerText = prod.name;
    //div -> description p
    let newp = document.createElement("p");
    newp.innerText = prod.description;
    //div -> price p
    let newp2 = document.createElement("p");
    newp2.innerText = prod.price;
    //append to div
    innerdivnew.appendChild(newh5);
    innerdivnew.appendChild(newp);
    innerdivnew.appendChild(newp2);
    //img tag
    let newimg = document.createElement("img");
    newimg.setAttribute("class","mr-3 img-thumbnail");
    newimg.setAttribute("src","http://via.placeholder.com/120x120");
    newimg.setAttribute("alt",prod.name);
    //new list element
    let newli = document.createElement("li");
    newli.setAttribute("class","media list-card");
    //append child img, divnew and clone of cart counter
    newli.appendChild(newimg);
    newli.appendChild(innerdivnew);
    newli.appendChild(cartCounterMain.cloneNode(true));
    //append list to ul
    productsList.appendChild(newli);
});

let allProducts = document.querySelectorAll(".list-card");
let allPluses = document.querySelectorAll("#increase");
let allMinuses = document.querySelectorAll("#decrease");
let allCounts = document.querySelectorAll("#cart-counter-input");
let checkoutButton = document.querySelector("#checkout-button");
checkoutButton.innerText = "TOTAL PRICE: ₹" + sessionStorage.getItem("total") + " | GO TO CART >";
let currTotal;
$.map(allPluses, (plus,plusId) => {
    $(plus).click(() => {
        tempx = sessionStorage.getItem("mycart");
        if (plusId===0) {
            tempx += 0;
            sessionStorage.setItem("mycart",tempx);

            currTotal = parseFloat(sessionStorage.getItem("total")) + 25.00;
            sessionStorage.setItem("total",currTotal);
        }
        else {
            tempx += products[plusId - 1].id;
            sessionStorage.setItem("mycart",tempx);

            currTotal = parseFloat(sessionStorage.getItem("total")) + products[plusId - 1].price;
            sessionStorage.setItem("total",currTotal);
        }
        allCounts[plusId].value = tempx.split(plusId.toString()).length - 1;
        checkoutButton.innerText = "TOTAL PRICE: ₹" + currTotal + " | GO TO CART >";
        console.log(tempx);
    });
});

$.map(allMinuses, (minus,minusId) => {
    $(minus).click(() => {
        tempx = sessionStorage.getItem("mycart");
        if (tempx.indexOf(minusId.toString()) > -1 ) {
            tempy = tempx.replace(minusId.toString(),"");
            sessionStorage.setItem("mycart",tempy);
            if (minusId===0) {
                currTotal = parseFloat(sessionStorage.getItem("total")) - 25.00;
            }
            else {
                currTotal = parseFloat(sessionStorage.getItem("total")) - products[minusId - 1].price;
            }
            sessionStorage.setItem("total",currTotal);
            allCounts[minusId].value = tempy.split(minusId.toString()).length - 1;
        }
        checkoutButton.innerText = "TOTAL PRICE: ₹" + currTotal + " | GO TO CART >";
    });
});

