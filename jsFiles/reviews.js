/**
 * Created by rreyes on 8/10/15.
 */

var Reviews = (function() {
    var pub = {};



    function showReviews() {
        var target = $(this).parent().find(".review").children("dl")[0];
        var xmlSource = $(this).parent().parent().find('img').attr('src');
        xmlSource = xmlSource.replace("images/","reviews/");
        xmlSource = xmlSource.replace(".jpg",".xml");
        console.log(xmlSource);

        $.ajax({
            type: "GET",
            url: xmlSource,
            cache: false,
            success: function (data) {
                if($(target).is(":empty")) {
                    if ($(data).find("rating").length) {
                        parseReviews(data, target);
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

    function parseReviews(data, target){

        $(data).find("review").each(function () {
            var rating = $(this).find("rating")[0].textContent;
            var user = $(this).find("user")[0].textContent;
            $(target).append("<dt>" + user + ": " + "</dt>" +
            " <dd>" + rating + "</dd><br>");
            //console.log(rating + " " + user);
        });
        $("dt").css({
            display: "table-cell"
        });
        $("dd").css({
            display: "table-cell"
        });
        $(target).css({
            marginTop: "40px"
        });
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

        $(".showReviews").click(showReviews);
    };

    return pub;

}());

$(document).ready(Reviews.setup);