/**
 * Created by Rae on 8/15/2015.
 */

var Carousel = (function(){
    var pub ={};

    var categoryList = [];
    var categoryIndex = 0;
    function nextCategory() {
        /*
        var element = document.getElementById("carousel");
        element.innerHTML = categoryList[categoryIndex].makeHTML();

        categoryIndex += 1;

        if (categoryIndex >= categoryList.length) {
            categoryIndex = 0;
        }*/ //old

        //var image = $("#carousel").children().find("img");
        //image.animate({paddingLeft: 100, opacity: 0}, 3500, "swing",nextCategory);
        //image.fadeTo(3000,0.7,nextCategory);

        //var carousel = $("#carousel").append(categoryList[i].makeHTML());




        var element = document.getElementById("carousel");
        element.innerHTML = categoryList[categoryIndex].makeHTML();
        var image = $("#carousel").children();
        image.fadeTo(3000,1,function(){

        });


        categoryIndex += 1;

        if (categoryIndex >= categoryList.length) {
            categoryIndex = 0;
        }


        //image.animate({paddingLeft: 100, opacity: 0}, 3500, "swing",nextCategory);
        image.fadeTo(3000,0,nextCategory);



    }
    function MovieCategory(title, image) { this.title = title;
        this.image = image;
        //this.page = page;/*
        this.makeHTML = function() {
            return '<figure>' + '<img src=' + this.image + '>' + '<figcaption>' +
                this.title + '</figcaption>' + '</figure>';

        };
    }

    pub.setup = function() {
        categoryList.push(new MovieCategory("Restaurant",
            "images/index1.jpg"));
        categoryList.push(new MovieCategory("King Room",
            "images/index2.jpg"));
        categoryList.push(new MovieCategory("Triple Room",
            "images/index3.jpg"));


        nextCategory();

        //setInterval(nextCategory, 3000);
    };

    return pub;
}());

$(document).ready(Carousel.setup);
