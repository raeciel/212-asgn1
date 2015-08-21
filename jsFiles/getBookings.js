/**
 * Created by rreyes on 8/20/15.
 * Bookings checks the dates and find and displays available rooms.
 */


/*jslint*/
/*browser:true, messy white space: true, for: true, this:true*/
/*global window, Cookie, Pending, $, console*/

/**
 * Module pattern for Bookings
 */
var Bookings = (function (){
    "use strict";
    var booked, rooms;
    var pub = {};

    /**
     * Stores booked rooms' details from roomBookings.xml to an object and then
     * adds them to the global array 'booked'.
     * @param data - data from roomBookings.xml
     */
    function storeBookedRooms(data) {
        booked = [];
        $(data).find("booking").each(function () {
            var existingBookings = {};
            var checkIn = $(this).find("checkin");
            var checkOut = $(this).find("checkout");
            existingBookings.number = $(this).find("number").html();
            existingBookings.name = $(this).find("name").html();
            existingBookings.checkIn = new Date(checkIn.find("month").html() + "/" + checkIn.find("day").html() +
                "/" + checkIn.find("year").html());
            existingBookings.checkOut = new Date(checkOut.find("month").html() + "/" + checkOut.find("day").html() +
                "/" + checkOut.find("year").html());

            booked.push(existingBookings);

        });

    }

    /**
     * Stores hotel rooms' details from hotelRoom.xml to an object and then adds
     * them to the global array 'rooms'.
     * @param data - data from hotelRooms.xml
     */
    function storeRooms(data){
        rooms = [];
        $(data).find("hotelRoom").each(function () {
            var existingRooms = {};
            existingRooms.number = $(this).find("number").html();
            existingRooms.roomType = $(this).find("roomType").html();
            existingRooms.desc = $(this).find("description").html();
            existingRooms.price= $(this).find("pricePerNight").html();
            rooms.push(existingRooms);
        });
    }

    /**
     * Stores hotel rooms' types and max guests from roomTypes.xml to an object and then adds
     * them to the global array 'rooms'.
     * @param data - data from roomTypes.xml
     */
    function storeRoomTypes(data){
        $(data).find("roomType").each(function () {
            var roomType = $(this).find("id").html();
            var maxGuest= $(this).find("maxGuests").html();
            var k, availRoom;
            for( k = 0; k < rooms.length; k+= 1) {
                availRoom = rooms[k];
                if (availRoom.roomType === roomType){
                    availRoom.maxGuest= maxGuest;
                }
            }
        });
    }

    /**
     * Constructor to save the booking details to the cookie list
     * @param roomNum - room number from the table
     * @param roomType - room type from the table
     * @param roomPrice - room price from the table
     */
    function GetCurrentBooking (roomNum, roomType, roomPrice) {
        this.name = $("#name").val();
        this.number = roomNum;
        this.roomType = roomType;
        this.price = roomPrice;
        this.checkIn = $("#checkIn").val();
        this.checkOut = $("#checkOut").val();
    }

    /**
     * Adds the selected room, name of the guest and its details to cookie.
     */
    function bookIt() {
        var roomBooking = $(this).parent().parent();
        var roomNum = "Room No.";
        var roomType = "Room Type";
        var roomPrice = "Price";

        var currList;
        currList = Cookie.get("items");
        if(currList !== null){
            currList = JSON.parse(currList);
        } else {
            currList = [];
        }

        $(roomBooking).each(function () {
            $(this).find(".num").each(function (){
                roomNum = $(this).text();
            });
            $(this).find(".type").each(function (){
                roomType = $(this).text();
            });
            $(this).find(".price").each(function (){
                roomPrice = $(this).text();
            });
        });

        currList.push(new GetCurrentBooking(roomNum, roomType, roomPrice));

        $(this).parent().html("Added");
        Cookie.set("items", JSON.stringify(currList));

        Pending.setup();


    }

    /**
     * Validates name and checkIn/checkOut dates.
     * If it passes the validation, it will proceed to finding rooms at a given date range.
     */
    function availableRooms(){
        var checkIn, checkOut, i;
        var checkInVal = $("#checkIn").val();
        var checkOutVal = $("#checkOut").val();
        var name = $("#name").val();
        var target = $("#availRooms").children("table")[0];

        checkIn = new Date(checkInVal);
        checkOut = new Date(checkOutVal);

        var validateTarget = $("#validate").children("ul")[0];
        var paragraph = $(validateTarget).parent().find("p")[0];

        var re = /^[a-zA-Z\-\ ']+$/; //regular expression to check if name has special characters

        if(checkInVal.length > 0 && checkOutVal.length > 0 && name.length > 0 && (re.test(name))) {
            var bookedDates, isBooked,j, room;
            for (i = 0; i < booked.length; i += 1) {
                bookedDates = booked[i];
                isBooked = false;
                if (checkIn >= bookedDates.checkIn && checkIn < bookedDates.checkOut) {
                    isBooked = true;
                } else if (checkOut > bookedDates.checkIn && checkOut < bookedDates.checkOut) {
                    isBooked = true;
                }
                if (isBooked) {
                    for (j = 0; j < rooms.length; j += 1) {
                        room = rooms[j];
                        if (room.number === bookedDates.number) {
                            rooms.splice(j, 1);
                        }
                    }
                }
            }
            $(target).html("");
            $(validateTarget).html("");
            $(paragraph).html("");
            $(target).append("<caption>Available Rooms</caption><tr><th>Room No.</th>" +
                "<th>Room Type</th><th>Description</th><th>Max Guests</th><th>Price</th><th>&nbsp;</th></tr>");
            var k, availRoom;
            for (k = 0; k < rooms.length; k += 1) {
                availRoom = rooms[k];

                $(target).append("<tr class='row'>" +
                    "<td class='num'>" + availRoom.number +
                    "</td><td class='type'>" + availRoom.roomType +
                    "</td><td>" + availRoom.desc +
                    "</td><td>" + availRoom.maxGuest +
                    "</td><td class='price'>" + "$" + availRoom.price +
                    "</td><td>" + '<input type="button" value="Book Now" class="bookButton">' +
                    "</td></tr>");
            }

            $(target).css({
                border: "1px solid #723941",
                marginTop: "20px",
                textAlign: "left"
            });

            $(".bookButton").click(bookIt);

        } else {

            $(validateTarget).html("");
            $(paragraph).html("");
            $(paragraph).append("<strong>There were errors processing your form:</strong>");



            if(name.length <= 0){
                $(validateTarget).append("<li>You must enter your name</li>");
            }else if (!re.test(name)){
                $(validateTarget).append("<li>You cannot enter a number or other special characters on your name</li>");
            }
            if(checkInVal.length <= 0){
                $(validateTarget).append("<li>Select a Check In date</li>");
            }
            if(checkOutVal.length <= 0){
                $(validateTarget).append("<li>Select a Check Out date</li>");
            }

            $(validateTarget).parent().css({
                color: "red",
                margin: "50px auto 0",
                width: "470px",
                textAlign: "left"
            });

        }
    }

    /**
     * A function that uses ajax to retrieve data from roomTypes.xml
     * Calls storeRoomTypes and when it finishes storing, it calls
     * availableRooms function to check for availability.
     */
    function getRoomTypes() {
        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomTypes.xml",
            cache: false,
            success: function (data) {
                if ($(data).find("id").length) {
                    storeRoomTypes(data);
                    availableRooms();

                }
            },
            error: function () {
                console.log("error");
            }
        });
    }

    /**
     * A function that uses ajax to retrieve data from hotelRooms.xml
     * Calls storeRooms and when it finishes storing, it calls
     * getRoomTypes function to retrieve room type's data.
     */
    function getRooms() {
        $.ajax({
            type: "GET",
            url: "../xmlFiles/hotelRooms.xml",
            cache: false,
            success: function (data) {
                if ($(data).find("number").length) {
                    storeRooms(data);
                    getRoomTypes();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.response, textStatus, errorThrown);
            }
        });
    }

    /**
     * A function that uses ajax to retrieve data from roomBookings.xml
     * Calls storeBookedRooms and when it finishes storing, it calls
     * getRooms function to retrieve the hotel room's data.
     *
     */
    function getBooked(){

        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomBookings.xml",
            cache: false,
            success: function (data) {
                    storeBookedRooms(data);
                    getRooms();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.response, textStatus, errorThrown);
            }
        });
    }



    /**
     * This function clears the cookie items and
     * hides the validation if the customer have not
     * started filling up the form
     */
    function clear(){
        var checkInVal = $("#checkIn").val();
        var checkOutVal = $("#checkOut").val();
        var name = $("#name").val();
        var re = /^[a-zA-Z\-\ ']+$/; //regular expression to check if name has special characters
        Cookie.clear("items");
        availableRooms();
        if(checkInVal.length <= 0 && checkOutVal.length <= 0 && name.length <= 0 && (!re.test(name))) {
            $("#validate").hide();
        }
        Pending.setup();
    }


    /**
     * Set up function for Bookings.
     * Runs the getBooked function when find button is clicked.
     * Also runs the clear function to clear cookies when clear button is clicked.
     */
    pub.setup = function () {
        var findButton = $("#findButton");
        var clearButton = $("#clearButton");
        findButton.css("cursor","pointer");
        findButton.click(getBooked);
        clearButton.click(clear);

    };
    return pub;
}());

$(document).ready(Bookings.setup);