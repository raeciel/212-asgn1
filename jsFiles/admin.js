/**
 * Created by rreyes on 8/21/15.
 * Admin displays the room bookings data from the server to the admin page
 */


/*jslint*/
/*this: true, messy white space: true*/
/*global window, $ */

/**
 * Module pattern for Admin functions
 */
var Admin = (function() {
    "use strict";
    var pub = {};

    /**
     * Displays the data to the target div of the html.
     * @param data - data from xml file.
     * @param target - an html div target for where to display the data.
     */
    function showType(data, target){
        $(data).find("booking").each(function () {
            var number = $(this).find("number").html();
            var name = $(this).find("name").html();
            var checkIn = new Date($(this).find("month").html() + "/" + $(this).find("day").html() +
                "/" + $(this).find("year").html());
            var checkOut = new Date($(this).find("month").html() + "/" + $(this).find("day").html() +
                "/" + $(this).find("year").html());

            $(target).append("<li>" + number + ": " + name + " booked from " + checkIn.toDateString() + " to " +
                checkOut.toDateString() + "</li>");


        });


        $(target).css({
            textAlign: "left",
            lineHeight: "200%",
            fontSize: "13pt"
        });
    }

    /**
     * This function uses ajax to get the data from its file and then Calls
     * showType function to display the data to html.
     */
    function showBooked() {
        var target = $("#currBookings").children("ul")[0];
        $.ajax({
            type: "GET",
            url: "xmlFiles/roomBookings.xml",
            cache: false,
            success: function (data) {
                showType(data,target);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.response, textStatus,errorThrown);
            }
        });
    }

    /**
     * Setup function for the Admin
     *
     * Calls the showBooked function to retrieve the booked data from the xml file.
     */
    pub.setup = function() {
        showBooked();

    };

    return pub;

}());

$(document).ready(Admin.setup);