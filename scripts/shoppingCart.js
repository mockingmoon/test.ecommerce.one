let srno = 1;
let cartTable = document.querySelector("#cart-body");
let myCartContent = sessionStorage.getItem("mycart");
let myProd = myCartContent.split("").sort();
console.log(myProd);
let tempz = {};
let shops = {}; //stores which shops we are buying from to calculate delivery charges
myProd.forEach((prod) => {
    if (prod !== '$') {
        if (tempz[prod]) {
            tempz[prod] += 1;
        }
        else {
            tempz[prod] = 1;
        }
    }
});
console.log(tempz);
let deliv = 0.0; //delivery total amount initializing
for (prod in tempz) {
    console.log(typeof(prod));
    let newrow = document.createElement("tr");
    let p = {};
    if (prod == 0) {
        p["name"] = "Sample product";
        p["price"] = 20.50;
        p["shopid"] = 3;
    }
    else {
        p = productsdb.filter(product => product.id == prod)[0];
    }
    //sr no-
    console.log(p);
    srno += 1;
    let newtdsr = document.createElement("td");
    newtdsr.innerHTML = srno;
    newrow.appendChild(newtdsr);
    console.log(newrow);
    //item-
    let newtdname = document.createElement("td");
    newtdname.innerHTML = p["name"];
    newrow.appendChild(newtdname);
    console.log(newrow);
    //rate-
    let newtdprice = document.createElement("td");
    newtdprice.innerHTML = p["price"];
    newrow.appendChild(newtdprice);
    console.log(newrow);
    //quantity-
    let newtdquant = document.createElement("td");
    newtdquant.innerHTML = tempz[prod];
    newrow.appendChild(newtdquant);
    console.log(newrow);
    //total-
    let newtdtotal = document.createElement("td");
    newtdtotal.innerHTML = p["price"] * tempz[prod];
    newrow.appendChild(newtdtotal);
    //append row to table
    cartTable.appendChild(newrow);
    //initial setup to calculate delivery charges
    currShop = shopsdb.filter(shop => shop.id === p.shopid)[0];
    if (shops[p.shopid]) {
        shops[p.shopid] += p.price;
        if (shops[p.shopid] >= currShop["min_free_delivery"]) {
            deliv -= currShop["delivery_charge_amount"];
        }
    }
    else {
        shops[p.shopid] = p.price;
        deliv += currShop["delivery_charge_amount"];
    }
}

let itemsTotal = parseFloat(sessionStorage.getItem("total"));
document.querySelector("#items-total").innerHTML = itemsTotal;
document.querySelector("#delivery-charges-total").innerHTML = deliv;
document.querySelector("#grand-total").innerHTML = deliv + itemsTotal;
