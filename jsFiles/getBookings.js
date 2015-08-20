/**
 * Created by rreyes on 8/20/15.
 */

var Bookings = (function (){
    var pub = {};
    var booked = [];
    var rooms = [];
    
    function getRooms() {
        $.ajax({
            type: "GET",
            url: "../xmlFiles/hotelRooms.xml",
            cache: false,
            success: function (data) {
                if ($(data).find("number").length) {
                    storeRooms(data);
                    getDates();
                }
            },
            error: function () {
                console.log("error");
            }
        });
    }
    
    function storeRooms(data){
        console.log("Storing Rooms");
        $(data).find("hotelRoom").each(function () {
            var existingRooms = {};
            existingRooms.number = $(this).find("number").html();
            existingRooms.roomType = $(this).find("roomType").html();
            existingRooms.desc = $(this).find("description").html();
            existingRooms.price= $(this).find("pricePerNight").html();

            rooms.push(existingRooms);
        });

        var i;
        for(i = 0; i < rooms.length; i += 1){
            console.log(rooms[i]);
        }

    }
    
    function getBooked(){
        //var target = $(".availRooms").children("table")[0];

        $.ajax({
            type: "GET",
            url: "../xmlFiles/roomBookings.xml",
            cache: false,
            success: function (data) {
                //if($(target).is(":empty")) {

                    if ($(data).find("number").length) {
                        storeBookings(data);
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

    function storeBookings(data) {
        console.log("Storing Bookings");
        $(data).find("booking").each(function () {
            var existingBookings = {};
            var checkIn = $(this).find("checkin");
            var checkOut = $(this).find("checkout");
            //var checkInDay = $(checkIn).children.find("day")[0].textContent;
            //var checkInMonth = $(checkIn).children.find("month")[0].textContent;
            existingBookings.number = $(this).find("number").html();
            existingBookings.name = $(this).find("name").html();
            existingBookings.checkIn = checkIn.find("day").html() + "-" + checkIn.find("month").html() +
            "-" + checkIn.find("year").html();

            /*
            existingBookings.checkInMonth = checkIn.find("month").html();
            existingBookings.checkInYear = checkIn.find("year").html();
            existingBookings.checkOutDay = checkOut.find("day").html();
            existingBookings.checkOutMonth = checkOut.find("month").html();
            existingBookings.checkOutYear = checkOut.find("year").html();
            */

            existingBookings.checkOut = checkOut.find("day").html() + "-" + checkOut.find("month").html() +
            "-" + checkOut.find("year").html();

            booked.push(existingBookings);

        });
        //console.log(booked[0]);

    }

    function getDates() {
        var checkIn = $("#checkIn").val();
        var checkOut = $("#checkOut").val();
        console.log(checkIn);
        console.log(booked[0]);

    }

    pub.setup = function () {
        $("#findButton").css("cursor","pointer");
        $("#findButton").click(getBooked);


    };
    return pub;
}());

$(document).ready(Bookings.setup);