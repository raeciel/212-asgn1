/**
 * Created by rreyes on 7/24/15.
 */
var ShoppingCart = (function (){
    var pub = {};
    var items = [];

    function showCart() {
        var i, totalPrice, title, price, currItem, itemTotal;
        currItem = Cookie.get("items");
        //showCookie =  document.getElementById("shoppingCart");


        if (currItem !== null) {
            itemTotal = JSON.parse(currItem).length;
            totalPrice = 0;
            items = JSON.parse(currItem);
            for (i = 0; i < itemTotal; i += 1) {
                title = JSON.stringify(items[i].title);
                price = JSON.stringify(items[i].price);

                $("#shoppingCart").append("<p>" + title.substring(1, title.length - 1) + " - $" +
                    price.substring(1, price.length - 1) + "</p>");

                /*showCookie.innerHTML += "<p>" + title.substring(1, title.length - 1) + " - $" +
                    price.substring(1, price.length - 1) + "</p>";*/


                totalPrice += JSON.parse(items[i].price);
            }
            $("#shoppingCart").append("<p>Total: $" + totalPrice.toFixed(2) + "</p>");
            //showCookie.innerHTML += "<p>Total: $" + totalPrice.toFixed(2) + "</p>";
        } else {
            $("#shoppingCart").append("<p>Your shopping cart is empty.</p>");
            //showCookie.innerHTML = "<p>Your shopping cart is empty.</p>";
        }
    }

    function clearCart() {
        //var showCookie = document.getElementById("shoppingCart");
        Cookie.clear("items");
        //showCookie.innerHTML = "<p>Your cart is now empty.</p>";
        $("#shoppingCart").empty().html("<p>Your cart is now empty.</p>");
        hideForm();
    }

    function hideForm(){
        var cookie = Cookie.get("items");
        //var form = document.getElementById("checkoutForm");
        if(cookie === null) {
            //form.style.display = "none";
            $("#checkoutForm").css("display","none");
        }
    }

    pub.setup = function () {
        //var clear;

        showCart();
        hideForm();

        $("#clear").click(clearCart);
        /*
        clear = document.getElementById("clear");
        clear.onclick = clearCart;
        */

    };
    return pub;
}());

$(document).ready(ShoppingCart.setup);
/*
if (window.addEventListener) {
    window.addEventListener('load', ShoppingCart.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', ShoppingCart.setup);
} else {
    alert("Could not attach 'ShowCart.setup' to the 'window.onload' event");
}*/
