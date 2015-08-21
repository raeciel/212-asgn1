/**
 * Created by Rae on 8/20/2015.
 *
 * This javaScript file formats the display of the dates
 * by using the jquery ui date picker framework.
 *
 */

/*jslint*/
/*browser:true, messy white space: true*/
/*global window, $ */

/**
 * Module pattern for Dates
 */
var Dates = (function () {
    "use strict";
    var pub = {};

    /**
     * This function configures on how the dates are going to be
     * shown on the date's box.
     */
    function dateDisplay(){
        $("#checkIn").datepicker({
            defaultDate: "+1w",
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1,

            onSelect: function (date) {
                var currDate =  $("#checkIn").datepicker('getDate');
                date = new Date(Date.parse(currDate));
                date.setDate(date.getDate() + 1);
                var newDate = date.toDateString();
                newDate = new Date(Date.parse(newDate));
                $("#checkOut").datepicker("option", "minDate", newDate);
            }
        });
        $("#checkOut").datepicker({
            defaultDate: "+1w",
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1

        });
    }

    /**
     * Set up function for Dates.
     */
    pub.setup = function () {
        dateDisplay();


    };

    return pub;

}());

$(document).ready(Dates.setup);