/**
 * Created by Rae on 8/15/2015.
 *
 * Carousel displays the images on index page by fading in and out.
 *
 */

/*jslint*/
/*browser:true, this: true, messy white space: true*/
/*global window, $ */

/**
 * Module pattern for Carousel functions
 */
var Carousel = (function(){
    "use strict";
    var pub ={};
    var categoryList = [];
    var categoryIndex = 0;

    /**
     * This function displays an array of images by fading in and out
     */
    function nextImage() {
        var element = document.getElementById("carousel");
        element.innerHTML = categoryList[categoryIndex].makeHTML();
        var image = $("#carousel").children();
        image.fadeTo(3000,1);

        categoryIndex += 1;

        if (categoryIndex >= categoryList.length) {
            categoryIndex = 0;
        }

        image.fadeTo(3000,0,nextImage);
    }

    /**
     * A constructor which stores the images in a correct format to add to html
     * @param title - name of the image
     * @param image - source of the image
     */
    function MovieCategory(title, image) { this.title = title;
        this.image = image;
        //this.page = page;/*
        this.makeHTML = function() {
            return '<figure>' + '<img src=' + this.image + '>' + '<figcaption>' +
                this.title + '</figcaption>' + '</figure>';
        };
    }

    /**
     * Set up function for Carousel
     *
     * Adds images into an array using MovieCategory constructor then
     * calls nextImage function to display the images.
     *
     */
    pub.setup = function() {
        categoryList.push(new MovieCategory("Restaurant",
            "images/index1.jpg"));
        categoryList.push(new MovieCategory("King Room",
            "images/index2.jpg"));
        categoryList.push(new MovieCategory("Triple Room",
            "images/index3.jpg"));
        nextImage();
    };

    return pub;

}());

$(document).ready(Carousel.setup);
