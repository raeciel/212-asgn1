/**
 * Created by rreyes on 7/24/15.
 */

var Cart = (function () {

    var pub = {};
    var items = [];

    function addToCart() {
        //alert("working");
        var curr;
        var movies = {};

        movies.title = $(this).parent().parent().find("h3").html();
        movies.price = $(this).parent().find(".price").html();

        /*
        movies.title = this.parentNode.parentNode.getElementsByTagName("h3")[0].innerHTML;
        movies.price = this.parentNode.getElementsByClassName("price")[0].innerHTML;

        */


        //var str = JSON.stringify(movies);
        //alert(str);

        curr = Cookie.get("items");
        //console.log(curr);
        if(curr !== null){
            items = JSON.parse(curr);
        }

        items.push(movies);
        Cookie.set("items", JSON.stringify(items), 20);
        console.log(JSON.stringify(items));

    }

    pub.setup = function() {
        $(".buy").click(addToCart);
        /*
        var buttons, b;
        buttons = document.getElementsByClassName("buy");
        for(b = 0; b < buttons.length; b += 1 ){
            buttons[b].onclick = addToCart;
        }*/
    };
    return pub;

}());

$(document).ready(Cart.setup);

/*
if (window.addEventListener) {
    window.addEventListener('load', Cart.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Cart.setup);
} else {
    alert("Could not attach ’Cart.setup’ to the ’window.onload’ event");
}*/
