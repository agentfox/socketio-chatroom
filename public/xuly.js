
var socket = io("http://localhost:3000");


$(document).ready(function() {
    $(".loginForm").show();
    $(".chatForm").hide();
    $("#btnRegister").click(function() {
        socket.emit("client-send-username", $("#txtUsername").val() );
    });
    socket.on("server-send-dangky-thanhcong", function(data) {
        $(".loginForm").hide(2000);
        $(".chatForm").show(1000);
        $("#currentUser").html(data);
    });

    $("#btnLogout").click(function() {
        socket.emit("logout");
        $(".loginForm").show(2000);
        $(".chatForm").hide(1000);
        

    });

    $("#txtMessage").focusin(function (params) {
        socket.emit("dang-go-chu");
    });
    $("#txtMessage").focusout(function (params) {
        socket.emit("dung-go-chu");
    });


    $("#btnSend").click(function() {
        socket.emit("user-send-message", $("#txtMessage").val() );
        $("#txtMessage").val("");
    });


});
socket.on("server-send-dangky-thatbai", function() {
    alert('Ten dang nhap da ton tai.');
});

socket.on("danh-sach-dang-online", function(mangUser) {
    $("#boxContent").html("");
    mangUser.forEach(i => {
        $("#boxContent").append("<div class='userOnline'>"+ i + "</div>");
    });
});

//socket.on("tin-nhan-chung", function(fulltinnhan) {
 //   $("#listMessage").append("<p>"+fulltinnhan[0]+" :"+fulltinnhan[1] +"</p>");
//});

socket.on("tin-nhan-chung", function(data) {
   $("#listMessage").append("<p>"+data.un+" :"+data.mes +"</p>");
   
});

socket.on("no-dang-go-chu", function(gochu) {
    $("#"+gochu).remove(); 
    $("#listMessage").append("<p  class='bacham' id ="+gochu+" >"+gochu+ " : " +"<span></span><span></span><span></span></p>");
    
});

socket.on("no-dung-go-chu", function(gochu) {
    $("#"+gochu).remove();   
});



//<div class="userOnline">Teo Nguyen</div>