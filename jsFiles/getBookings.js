/**
 * Created by rreyes on 8/20/15.
 */

var Bookings = (function (){
    var booked, rooms;
    var pub = {};

    
    function getBooked(){
        //var target = $(".availRooms").children("table")[0];

        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomBookings.xml",
            cache: false,
            success: function (data) {
                //if($(target).is(":empty")) {

                    if ($(data).find("number").length) {
                        storeBookedRooms(data);
                        getRooms();

                    //} else {
                        //$(target).append("<p>Sorry there are no reviews for this detail.</p>");
                    //}
                }
            },
            error: function () {
                //$(target).append("<p>Sorry there are no files for this detail.</p>");
                //error: function(jqXHR, textStatus, errorThrown ) {
                //   console.log(jqXHR.response);
                console.log("error");
            }
        });
    }

    function storeBookedRooms(data) {
        booked = [];
        console.log("Storing Bookings");
        $(data).find("booking").each(function () {
            var existingBookings = {};
            var checkIn = $(this).find("checkin");
            var checkOut = $(this).find("checkout");
            //var checkInDay = $(checkIn).children.find("day")[0].textContent;
            //var checkInMonth = $(checkIn).children.find("month")[0].textContent;
            existingBookings.number = $(this).find("number").html();
            existingBookings.name = $(this).find("name").html();
            existingBookings.checkIn = new Date(checkIn.find("month").html() + "/" + checkIn.find("day").html() +
            "/" + checkIn.find("year").html());

            /*
            existingBookings.checkInMonth = checkIn.find("month").html();
            existingBookings.checkInYear = checkIn.find("year").html();
            existingBookings.checkOutDay = checkOut.find("day").html();
            existingBookings.checkOutMonth = checkOut.find("month").html();
            existingBookings.checkOutYear = checkOut.find("year").html();
            */

            existingBookings.checkOut = new Date(checkOut.find("month").html() + "/" + checkOut.find("day").html() +
            "/" + checkOut.find("year").html());

            booked.push(existingBookings);

        });
        console.log(booked[0]);

    }



    function getRooms() {
        $.ajax({
            type: "GET",
            url: "../xmlFiles/hotelRooms.xml",
            cache: false,
            success: function (data) {
                if ($(data).find("number").length) {
                    storeRooms(data);
                    availableRooms();
                }
            },
            error: function () {
                console.log("error");
            }
        });
    }

    function storeRooms(data){
        rooms = [];
        console.log("Storing Rooms");
        $(data).find("hotelRoom").each(function () {
            var existingRooms = {};
            existingRooms.number = $(this).find("number").html();
            existingRooms.roomType = $(this).find("roomType").html();
            existingRooms.desc = $(this).find("description").html();
            existingRooms.price= $(this).find("pricePerNight").html();
            rooms.push(existingRooms);
        });
    }

    function availableRooms(){
        var checkIn, checkOut, i;
        checkIn = new Date($("#checkIn").val());
        checkOut = new Date($("#checkOut").val());
        console.log("Rooms before: " + rooms.length);
        for (i = 0; i < booked.length; i += 1){
            var bookedDates = booked[i];
            var isBooked = false;

            if (checkIn > bookedDates.checkIn && checkIn < bookedDates.checkOut){
                isBooked = true;
            } else if (checkOut > bookedDates.checkIn && checkOut < bookedDates.checkOut){
                isBooked = true;
            }

            if (isBooked){
                //console.log("isBooked getting called");
                var j;
                for ( j = 0; j < rooms.length; j += 1) {
                    var room = rooms[j];
                    if (room.number === bookedDates.number) {
                        rooms.splice(j,1);
                    }
                }
            }
        }
        console.log("Rooms after: " + rooms.length);
    }

    /*function getDates() {
        var checkIn = $("#checkIn").val();
        var checkOut = $("#checkOut").val();
        console.log(checkIn);
        console.log(booked[0]);

    }*/

    pub.setup = function () {
        $("#findButton").css("cursor","pointer");
        $("#findButton").click(getBooked);


    };
    return pub;
}());

$(document).ready(Bookings.setup);