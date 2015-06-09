$(".empname").on('keypress', function (e) {
    if (e.keyCode >= 48 && e.keyCode <=57) {
        $('.empname').css({
        	"border":"1px solid red"
        });
    }
});