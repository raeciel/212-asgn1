$(function () {
    $("#checkIn").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/m/yy',
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        minDate: 4,
        onSelect: function (date) {
            //set #checkOut date +4 days in the future, starting from #checkIn date

            var currDate =  $("#checkIn").datepicker('getDate');
            var date = new Date(Date.parse(currDate) +1);
            var newDate = date.toDateString();
            newDate = new Date(Date.parse(newDate));
            $("#checkOut").datepicker("option", "minDate", newDate);



            //var fromDate = new Date(selectedDate);
            //var minDate  = new Date(fromDate.setDate(fromDate.getDate() + 1));

            //$("#checkOut").datepicker("option", "minDate", minDate);
        },

    });
    $("#checkOut").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/m/yy',
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        minDate: 4,

    });



});