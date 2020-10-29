let categoriesdb = [
    {
        "id":1,
        "name":"Grocery essential"
    },
    {
        "id":2,
        "name":"fruits and veggies"
    },
    {
        "id":3,
        "name":"food outlets and restaurant"
    },
    {
        "id":4,
        "name":"stationery and books"
    },
    {
        "id":5,
        "name":"fashion and personal care"
    },
    {
        "id":6,
        "name":"electrical and electronic"
    },
    {
        "id":7,
        "name":"dairy products"
    },
    {
        "id":8,
        "name":"nogozo specials"
    }
]

let shopsdb = [
    {
        "id":1,
        "category":1,
        "name":"Shop one",
        "address": "Shop one lane one",
        "phone": "+91 11111 11111",
        "open": true,
        "delivers": false,
        "delivery_charges":"Delivery charges of Rs. 50 for order amount under 150.",
        "delivery_charge_amount":50.00,
        "min_free_delivery":150.00
    },
    {
        "id":2,
        "category":1,
        "name":"Shop two",
        "address": "Shop two lane two",
        "phone": "+91 22222 22222",
        "open": true,
        "delivers": false,
        "delivery_charges":"Delivery charges of Rs. 20 for order amount under 100.",
        "delivery_charge_amount":20.00,
        "min_free_delivery":100.00
    },
    {
        "id":3,
        "category":2,
        "name":"Shop three",
        "address": "Shop three lane three",
        "phone": "+91 33333 33333",
        "open": true,
        "delivers": true,
        "delivery_charges":"Delivery charges of Rs. 150 for order amount under 500.",
        "delivery_charge_amount":150.00,
        "min_free_delivery":500.00
    },
    {
        "id":4,
        "category":2,
        "name":"Shop four",
        "address": "Shop four lane four",
        "phone": "+91 44444 44444",
        "open": false,
        "delivers": false,
        "delivery_charges":"Delivery charges of Rs. 90 for order amount under 800.",
        "delivery_charge_amount":90.00,
        "min_free_delivery":800.00
    }
];

let productsdb = [
    {
        "id":1,
        "name":"Product one",
        "description":"this is all about product one",
        "shopid": 3,
        "price": 25.50,
        "instock": false
    },
    {
        "id":2,
        "name":"Product two",
        "description":"this is all about product two",
        "shopid": 3,
        "price": 699.99,
        "instock": false
    },
    {
        "id":3,
        "name":"Product three",
        "description":"this is all about product three",
        "shopid": 1,
        "price": 1245.00,
        "instock": true
    },
    {
        "id":4,
        "name":"Product four",
        "description":"this is all about product four",
        "shopid": 1,
        "phone": "+91 44444 44444",
        "price": 100.24,
        "instock":true
    }
];

let currentShop = [];
let currentProduct = [];

if (!sessionStorage.getItem("total")) {
    sessionStorage.setItem("total","0");    
}

if (!sessionStorage.getItem("mycart")) {
    sessionStorage.setItem("mycart","$"); //$ denotes start of my cart string
}

function shopRouter(catId) {
    currentShop = shopsdb.filter(shop => shop.category === catId);
    console.log(currentShop);
    return currentShop;
}

function getShop(shopid) {
    return shopsdb.filter(shop => shop.id === shopid);
}

function productRouter(shopid) {
    currentProduct = productsdb.filter(prod => prod.shopid === shopid);
    console.log(currentProduct);
    return currentProduct;
}