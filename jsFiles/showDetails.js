/**
 * Created by rreyes on 8/10/15.
 */

var Details = (function() {
    "use strict";
    var pub = {};



    function showReviews() {
        var target = $(this).parent().find(".description").children("dl")[0];
        //var title = $(this).find("h3");

        var title = $(this).parent().find("h3").html();
        //var title = $(this).html();

        //title = title.slice(0, title.indexOf(" "));


        //var xmlSource = $(this).parent().parent().find('img').attr('src');
        //xmlSource = xmlSource.replace("images/","reviews/");
        //xmlSource = xmlSource.replace(".jpg",".xml");
        //console.log(xmlSource);

        console.log(title);

        $.ajax({
            type: "GET",
            url: "../xmlFiles/hotelRooms.xml",
            cache: false,
            success: function (data) {
                if($(target).is(":empty")) {

                    if ($(data).find("number").length) {
                        parseReviews(data, target,title);
                        $(target).parent(".description").slideToggle("1000");

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

    function parseReviews(data, target, title){
        $(data).find("hotelRoom").each(function () {
            var roomType = $(this).find("roomType")[0].textContent;
            var number = $(this).find("number")[0].textContent;
            //var user = $(this).find("user")[0].textContent;

            if(roomType === title) {
                //var text = "<dt>" + number + ": " + "</dt><br>";

                $(target).append( "<dt>" + number + ": " + "</dt><br>");
                //$(target).css('border', '3px solid #723941');
                $(target).css({
                    border : "3px solid #723941",
                    width : "400px",
                    margin: "0"
                });
            }
        });
        $("dt").css({
            display: "table-cell",
            margin: "0"
        });
        $("dd").css({
            display: "table-cell"
        });

        console.log(title);

    }

    pub.setup = function() {

        //$(".details").click(showReviews);

        $(".details").click(function() {

           $(this).parent().find(".description").slideToggle("2000",showReviews);
        });

    };

    return pub;

}());

$(document).ready(Details.setup);