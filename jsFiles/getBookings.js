/**
 * Created by rreyes on 8/20/15.
 */

var Bookings = (function (){
    var booked, rooms, roomTypes;
    var pub = {};

    function getBooked(){

        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomBookings.xml",
            cache: false,
            success: function (data) {
                if ($(data).find("number").length) {
                    storeBookedRooms(data);
                    getRooms();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.response, textStatus, errorThrown);
            }
        });
    }

    function storeBookedRooms(data) {
        booked = [];
        //console.log("Storing Bookings");
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
        //console.log(booked[0]);

    }

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

    function storeRooms(data){
        rooms = [];
        //console.log("Storing Rooms");
        $(data).find("hotelRoom").each(function () {
            var existingRooms = {};
            existingRooms.number = $(this).find("number").html();
            existingRooms.roomType = $(this).find("roomType").html();
            existingRooms.desc = $(this).find("description").html();
            existingRooms.price= $(this).find("pricePerNight").html();
            rooms.push(existingRooms);
        });
    }

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

    function storeRoomTypes(data){
        $(data).find("roomType").each(function () {
            var roomType = $(this).find("id").html();
            var maxGuest= $(this).find("maxGuests").html();
            var k;
            for( k = 0; k < rooms.length; k+= 1) {
                var availRoom = rooms[k];
                if (availRoom.roomType === roomType){
                    availRoom.maxGuest= maxGuest;
                }
            }
        });
    }

    function availableRooms(){
        var checkIn, checkOut, i;
        var checkInVal = $("#checkIn").val();
        var checkOutVal = $("#checkOut").val();
        var name = $("#name").val();

        checkIn = new Date(checkInVal);
        checkOut = new Date(checkOutVal);

        var validateTarget = $("#validate").children("ul")[0];
        var paragraph = $(validateTarget).parent().find("p")[0];


        var re = /^[a-zA-Z/\-' ]+$/; //regular expression to check if name has special characters

        if(checkInVal.length > 0 && checkOutVal.length > 0 && name.length > 0 && (re.test(name))) {
            for (i = 0; i < booked.length; i += 1) {
                var bookedDates = booked[i];
                var isBooked = false;
                if (checkIn >= bookedDates.checkIn && checkIn < bookedDates.checkOut) {
                    isBooked = true;
                } else if (checkOut > bookedDates.checkIn && checkOut < bookedDates.checkOut) {
                    isBooked = true;
                }
                if (isBooked) {
                    //console.log("isBooked getting called");
                    var j;
                    for (j = 0; j < rooms.length; j += 1) {
                        var room = rooms[j];
                        if (room.number === bookedDates.number) {
                            rooms.splice(j, 1);
                        }
                    }
                }
            }

            var target = $("#availRooms").children("table")[0];
            $(target).html("");
            $(validateTarget).html("");
            $(paragraph).html("");
            $(target).append("<caption>Available Rooms</caption><tr><th>Room No.</th>" +
                "<th>Room Type</th><th>Description</th><th>Max Guests</th><th>Price</th><th>&nbsp;</th></tr>");
            var k;
            for (k = 0; k < rooms.length; k += 1) {
                var availRoom = rooms[k];

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
        //console.log(rooms[0]);
        //console.log("Rooms after: " + rooms.length);

    }

    function bookIt() {
        //alert("book it");

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

        currList.push(new getCurrentBooking(roomNum, roomType, roomPrice));
        //console.log(currList[currList.length-1]);

        $(this).parent().html("Added");
        Cookie.set("items", JSON.stringify(currList));

        Pending.setup();


    }

    /**
     * Constructor to save the booking details to cookie list
     * @param roomNum - room number from the table
     * @param roomType - room type from the table
     * @param roomPrice - room price from the table
     */
    function getCurrentBooking (roomNum, roomType, roomPrice) {
        this.name = $("#name").val();
        this.number = roomNum;
        this.roomType = roomType;
        this.price = roomPrice;
        this.checkIn = $("#checkIn").val();
        this.checkOut = $("#checkOut").val();
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
        var re = /^[a-zA-Z/\-' ]+$/; //regular expression to check if name has special characters
        //console.log("Clearing");
        Cookie.clear("items");

        availableRooms();
        if(checkInVal.length <= 0 && checkOutVal.length <= 0 && name.length <= 0 && (!re.test(name))) {
            $("#validate").hide();
        }
        Pending.setup();
    }

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