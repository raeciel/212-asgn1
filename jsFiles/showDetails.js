/**
 * Created by rreyes on 8/10/15.
 */

var Details = (function() {
    var pub = {};



    function showReviews() {
        var target = $(this).parent().find(".description").children("dl")[0];
        //var title = $(this).find("h3");

        var title = $(this).html();
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
                    } else {
                        $(target).append("<p>Sorry there are no reviews for this film.</p>");
                    }
                }
            },
            error: function () {
                $(target).append("<p>Sorry there are no reviews for this film.</p>");
            }
        });
    }

    function parseReviews(data, target,title){

        $(data).find("hotelRoom").each(function () {

            var roomType = $(this).find("roomType")[0].textContent;
            var number = $(this).find("number")[0].textContent;
            //var user = $(this).find("user")[0].textContent;

            if(roomType === title) {
                $(target).append( "<dt>" + number + ": " + "</dt><br>");
                //$(target).css('border', '3px solid #723941');
                $(target).css({
                    'border' : "3px solid #723941",
                    'width' : "400px",
                    'margin': "0"
                })

            }


        });
        $("dt").css({
            display: "table-cell",
            margin: "0"
        });
        $("dd").css({
            display: "table-cell"
        });
        //$(target).css({
        //    marginTop: "40px"
        //});

        console.log(title);
        //target.style.marginTop = "40px";
        //}
        //var isEmpty = $(this).find("review");


        /*
        if($(data).find("rating").length){
            console.log("// it exists.");
        }else {
            console.log("no");
        }*/
    }

    pub.setup = function() {

        $("h3").click(showReviews);
    };

    return pub;

}());

$(document).ready(Details.setup);