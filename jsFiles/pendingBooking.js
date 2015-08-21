/**
 * Created by rreyes on 8/20/15.
 *
 * Checkout display functions for the Classic Cinema site
 *
 */

/*jslint browser: true, devel: true */
/*global Cookie, window */

/**
 * Module pattern for Checkout functions
 */
var Pending = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Create a HTML table representing the current items
     *
     * @param itemList an array of items to display
     * @return HTML representing itemList as a table
     */
    function makeItemHTML(itemList) {
        var html, totalPrice;
        html = "<table><caption>Pending Bookings</caption>";
        html += "<tr class='text-muted'><th>Name</th><th>Room Number</th><th>Room Type</th><th>Check In Date</th>" +
            "<th>Check Out Date<th>Price</th></tr>";
        totalPrice = 0;
        itemList.forEach(function (item) {
            html += "<tr><td>" + item.name + "</td> <td>" + item.number + "</td>" +
                "<td>" + item.roomType + "</td> <td>" + item.checkIn + "</td>" +
                "<td>" + item.checkOut + "</td>" +
                "<td class='money'>" + item.price + "</td></tr>";
            var price= item.price.replace("$","");
            totalPrice += parseFloat(price);
        });
        // Fix rounding errors
        totalPrice = Math.round(totalPrice * 100) / 100;
        html += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>" +
            "<td>Total Price:</td><td class='money'>$" + totalPrice + "</td></tr>";
        html += '</table>';



        return html;
    }

    /**
     * Setup function for the Checkout
     *
     * Fetches the current items from the cookie, and displays it.
     * If there is no current items, display a message to say so.
     */
    pub.setup = function () {
        var itemList, pending, clear;
        pending = $("#pending");
        clear = $("#clearButton");
        itemList = Cookie.get("items");
        if (itemList) {


            itemList = JSON.parse(itemList);
            pending.html(makeItemHTML(itemList));
            pending.show();
            clear.show();
        } else {
            pending.hide();
            clear.hide();

        }
    };

    // Expose public interface
    return pub;
}());
$(document).ready(Pending.setup);