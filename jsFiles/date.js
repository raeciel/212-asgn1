
var Dates = (function () {

    var pub = {};

    function checkDateRange(){
        $("#checkIn").datepicker({
            defaultDate: "+1w",
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1,
            //minDate: 0

            onSelect: function (date) {

                var currDate =  $("#checkIn").datepicker('getDate');
               // var date = new Date(Date.parse(currDate) + 1);
                date = new Date(Date.parse(currDate));
                date.setDate(date.getDate() + 1);
                var newDate = date.toDateString();
                newDate = new Date(Date.parse(newDate));
                $("#checkOut").datepicker("option", "minDate", newDate);



                //var fromDate = new Date(selectedDate);
                //var minDate  = new Date(fromDate.setDate(fromDate.getDate() + 1));

                //$("#checkOut").datepicker("option", "minDate", minDate);
            }
        });
        $("#checkOut").datepicker({
            defaultDate: "+1w",
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1
            //minDate: 0

        });
    }

    pub.setup = function () {
        checkDateRange();


    };

    return pub;

}());

$(document).ready(Dates.setup);
