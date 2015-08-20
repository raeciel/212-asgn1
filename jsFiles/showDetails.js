/**
 * Created by rreyes on 8/10/15.
 */

var Details = (function() {
    "use strict";
    var pub = {};


    function showDetails() {

        /**///var target = $(this).parent().find(".description").children("dl")[0];

        /**///var title = $(this).parent().find("h3").html();

        var target = $(this).parent().find(".description").children("table")[0];
        var target2 =$(this).parent().find(".description").children("dl")[0];
        var title = $(this).parent().find("h3").html();
        var desc = $(this).parent().find(".description");



        console.log(title);

        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomTypes.xml",
            cache: false,
            success: function (data) {
                if($(target2).is(":empty")) {

                    if ($(data).find("id").length) {
                        showType(data,target2,title);


                    } else {
                        $(target2).append("<p>Sorry there are no reviews for this detail.</p>");
                    }
                }
            },
            error: function () {
                $(target2).append("<p>Sorry there are no files for this detail.</p>");
                //error: function(jqXHR, textStatus, errorThrown ) {
                //   console.log(jqXHR.response);
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


                    } else {
                        $(target).append("<p>Sorry there are no reviews for this detail.</p>");
                    }
                }
            },
            error: function () {
                $(target).append("<p>Sorry there are no files for this detail.</p>");
                //error: function(jqXHR, textStatus, errorThrown ) {
                //   console.log(jqXHR.response);
            }
        });



    }

    function showType(data, target2, title){
        $(data).find("roomType").each(function (){
            var id = $(this).find("id")[0].textContent;
            var description = $(this).find("description")[0].textContent;
            var maxGuests = $(this).find("maxGuests")[0].textContent;
            if(id === title){
                $(target2).append( "<dt>"+ description + "</dt>"+ "<dd>" + " " + " Max Guests: " + maxGuests + "</dd>");
                $(target2).css({
                    //border : "1px solid #723941",
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

    function parseReviews(data, target, title){
        $(target).append("<tr><th>Room No.</th><th>Description</th><th>Price</th></tr>");
        $(data).find("hotelRoom").each(function () {
            var roomType = $(this).find("roomType")[0].textContent;
            var number = $(this).find("number")[0].textContent;
            var content = $(this).find("description")[0].textContent;
            var price = $(this).find("pricePerNight")[0].textContent;
            //var user = $(this).find("user")[0].textContent;

            if(roomType === title) {
                //var text = "<dt>" + number + ": " + "</dt><br>";

                //$(target).append( "<dt>" + number + " " + ":" + "</dt><br>");
                //$(target).css('border', '3px solid #723941');

                $(target).append("<tr><td>" + number + "</td>" + "<td>" + content + "</td>" +
                "<td>" + "$" + price + "</td></tr>" );
                $(target).css({
                    //border : "1px solid #723941",
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


        console.log(title);

    }

    pub.setup = function() {
        var detailsButton = $(".detailsButton");
        //$(".details").click(showReviews);
        $(detailsButton).css("cursor","pointer");
        $(detailsButton).click(function() {

            //$(this).parent().find(".description").slideToggle("2000",showReviews);
            $(this).parent().parent().find(".description").slideToggle("3000",showDetails);

        });
        /*
        $(".detailsButton").mouseenter(function() {

            //$(this).parent().find(".description").slideToggle("2000",showReviews);
            $(this).parent().parent().find(".description").slideToggle("3000",showDetails);
        });
        /*
        $(".detailsButton").mouseleave(function() {

            //$(this).parent().find(".description").slideToggle("2000",showReviews);
            $(this).parent().parent().find(".description").slideUp("3000");
        });*/

    };

    return pub;

}());

$(document).ready(Details.setup);