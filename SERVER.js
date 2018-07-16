var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUser = ["AAA"];

io.on("connection", function(socket) {
    console.log('da ket noi voi ' + socket.id);
    socket.on("client-send-username",function(data) {
    if (mangUser.indexOf(data) >= 0 || data=="" ) {
        socket.emit("server-send-dangky-thatbai");
    }
    else {
        mangUser.push(data);
        socket.Username = data;
        socket.emit("server-send-dangky-thanhcong",data);
        io.sockets.emit("danh-sach-dang-online", mangUser);
    
    }  
    });

    socket.on("logout", function () {
        mangUser.splice(mangUser.indexOf(socket.Username), 1);
        socket.broadcast.emit("danh-sach-dang-online",mangUser);

    });

    /*socket.on("user-send-message", function (tinnhan) {
        var tinnhan_daydu = [socket.Username,tinnhan];
        io.sockets.emit("tin-nhan-chung",tinnhan_daydu);
    });*/
    socket.on("user-send-message", function (tinnhan) { 
        io.sockets.emit("tin-nhan-chung",{ un:socket.Username, mes:tinnhan });
    });

    socket.on("dang-go-chu", function () { 
        socket.broadcast.emit("no-dang-go-chu",socket.Username);
    });
    socket.on("dung-go-chu", function () { 
        socket.broadcast.emit("no-dung-go-chu",socket.Username);
    });


    socket.on('disconnect', function () {
        socket.broadcast.emit("no-dung-go-chu",socket.Username);
    });



});

app.get("/", function(req,res) {
    res.render("trangchu");
});