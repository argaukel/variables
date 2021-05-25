$.get("/api/all", function(data) {
    if (data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
            var row = $("<div>");
            row.addClass("chrip");
            row.append("<p>" + data[i].author + " chirped.. </p>");
            row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

            $("#chirp-area").prepend(row);
        }
    }
});

$("#chirp-submit").on("click", function(event) {
    event.preventDefault();

    var newChirp = {
        author: $("#author").val().trim(),
        body: $("#chirp-box").val().trim(),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    console.log(newChirp);

    $.post("/api/new", newChirp)

        .then(function() {
            var row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + newChirp.author + " chirped: </p>");
            row.append("<p>" + newChirp.body + "</p>");
            row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

            $("#chirp-area").prepend(row);
        });
    
    $("#author").val("");
    $("#chirp-box").val("");
})