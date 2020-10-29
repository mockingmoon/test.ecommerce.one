let homeBody = document.querySelector(".homepage-body");
let categories = categoriesdb.forEach((cat) => {
    let newouterdiv = document.createElement("div");
    newouterdiv.setAttribute("class","col-6 col-sm-4 col-md-3");
    let newinnerdiv = document.createElement("div");
    newinnerdiv.setAttribute("class","card");
    let newimg = document.createElement("img");
    newimg.setAttribute("class","card-img-top");
    newimg.setAttribute("src","http://via.placeholder.com/150x150");
    newinnerdiv.appendChild(newimg);
    newouterdiv.appendChild(newinnerdiv);
    homeBody.appendChild(newouterdiv);
})

let cards = document.querySelectorAll(".card");
$.map(cards, (card, i) => {
    $(card).click(() => {
        window.location = "shops.html?cat="+(i+1);
    });
});
$(".carousel").carousel({
    interval:2000
});