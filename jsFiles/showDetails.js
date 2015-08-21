/**
 * Created by rreyes on 8/10/15.
 *
 * Details shows the details of each rooms for rooms.html page
 */

/*jslint*/
/*browser:true, messy white space: true, for: true, this:true*/
/*global window, console, Pending $ */

/**
 * Module pattern for Details
 */
var Details = (function() {
    "use strict";
    var pub = {};

    /**
     * Displays the room's type and max guests.
     * @param data - roomTypes.xml
     * @param target2 - each room's section
     * @param title - heading of each room types
     */
    function showType(data, target2, title){
        $(data).find("roomType").each(function (){
            var id = $(this).find("id")[0].textContent;
            var description = $(this).find("description")[0].textContent;
            var maxGuests = $(this).find("maxGuests")[0].textContent;
            if(id === title){
                $(target2).append( "<dt>"+ description + "</dt>"+ "<dd>" + " " + " Max Guests: " + maxGuests + "</dd>");
                $(target2).css({
                    padding: "10px 0 10px 0",
                    backgroundColor: "#8D4253",
                    color: "#fbebcf",
                    width : "402px",
                    margin: "0",
                    textAlign : "center"
                });
            }
        });

        $("dt").css({
            display: "table-cell",
            width: "250px"

        });
        $("dd").css({
            display: "table-cell",
            width: "150px"

        });

    }

    /**
     * Displays the room's description, number and price to each room section.
     * @param data - hotelRooms.xml
     * @param target - each room's section
     * @param title - heading of each room types
     */
    function parseReviews(data, target, title){
        $(target).append("<tr><th>Room No.</th><th>Description</th><th>Price</th></tr>");
        $(data).find("hotelRoom").each(function () {
            var roomType = $(this).find("roomType")[0].textContent;
            var number = $(this).find("number")[0].textContent;
            var content = $(this).find("description")[0].textContent;
            var price = $(this).find("pricePerNight")[0].textContent;

            if(roomType === title) {

                $(target).append("<tr><td>" + number + "</td>" + "<td>" + content + "</td>" +
                    "<td>" + "$" + price + "</td></tr>" );
                $(target).css({
                    backgroundColor: "#8D4253",
                    color: "#fbebcf",
                    marginTop:"20px",
                    width : "402px"

                });
            }
        });

        $("table").css({
            textAlign : "left",

            padding : "15px 10px 10px 10px"
        });

    }

    /**
     * This function uses ajax functions to retrieve two xml files,
     * roomTypes.xml and hotelRooms.xml and then calls parseReviews & show type
     * function to display them on the web page.
     */
    function showDetails() {
        var target = $(this).parent().find(".description").children("table")[0];
        var target2 =$(this).parent().find(".description").children("dl")[0];
        var title = $(this).parent().find("h3").html();
        var desc = $(this).parent().find(".description");

        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomTypes.xml",
            cache: false,
            success: function (data) {
                if($(target2).is(":empty")) {

                    if ($(data).find("id").length) {
                        showType(data,target2,title);

                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                   console.log(jqXHR.response, textStatus,errorThrown);
            }
        });


        $.ajax({
            type: "GET",
            url: "../xmlFiles/hotelRooms.xml",
            cache: false,
            success: function (data) {
                if($(target).is(":empty")) {

                    if ($(data).find("number").length) {
                        parseReviews(data, target,title);
                        $(desc).slideToggle("1000");


                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.response, textStatus, errorThrown);
            }
        });
    }

    /**
     * Set up function for Details.
     *
     * Runs the showDetails function when find button is clicked and slide toggles it.
     */
    pub.setup = function() {
        var detailsButton = $(".detailsButton");
        $(detailsButton).css("cursor","pointer");
        $(detailsButton).click(function() {
            $(this).parent().parent().find(".description").slideToggle("3000",showDetails);
        });
    };

    return pub;

}());

$(document).ready(Details.setup);