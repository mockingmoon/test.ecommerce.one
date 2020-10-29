let querycategory = location.search.substring(5);
catId = parseInt(querycategory);
if (catId){
    currentShops = shopRouter(catId);
}
let ulparent = document.getElementById("shops-list");
console.log(currentShop);
currentShop.forEach(shop => {
    let newshop = document.createElement("li");
    newshop.setAttribute("class","media list-card");
    newshop.setAttribute("id","shop-"+shop.id);
    let newimg = document.createElement("img");
    newimg.setAttribute("src","http://via.placeholder.com/120x120");
    newimg.setAttribute("alt",shop.name);
    newimg.setAttribute("class","mr-3 img-thumbnail");
    newshop.appendChild(newimg);
    let newdiv = document.createElement("div");
    newdiv.setAttribute("class","media-body");
    let newh5 = document.createElement("h5");
    newh5.innerText = shop.name + " | ";
    let newspan = document.createElement("span");
    if (shop.open) {
        newspan.setAttribute("class","badge badge-success");
        newspan.innerText = "OPEN";
    }
    else {
        newspan.setAttribute("class","badge badge-danger");
        newspan.innerText = "CLOSED";
    }
    newh5.appendChild(newspan);
    let newp = document.createElement("p");
    let spanmap = document.createElement("span");
    spanmap.setAttribute("class","fa fa-map-marker");
    newp.appendChild(spanmap);
    newp.appendChild(document.createTextNode(" "+shop.address));
    newdiv.appendChild(newh5);
    newdiv.appendChild(newp);
    newshop.appendChild(newdiv);
    ulparent.appendChild(newshop);
});
let shops = document.querySelectorAll(".list-card");
$.map(shops, (shop, i) => {
    $(shop).click(() => {
        window.location = "shop-profile.html?shop="+shop.attributes[1].value.slice(-1);
    });
});