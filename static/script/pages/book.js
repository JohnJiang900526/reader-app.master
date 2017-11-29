var getLocaArg = function() {
    var name;

    if (arguments.length === 0 || arguments.length >= 2) {
        throw Error("arguments.length = 1");
    } else {
        name = arguments[0];
    }

    var pattern = new RegExp("[\?\&]" + name + "=([^\&]+)", "i"),
        result = location.search.match(pattern);

    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
};

$.get("/ajax/book?id=" + getLocaArg("id"), function(data) {
    var result = JSON.parse(data);
    console.log(result);
    new Vue({
        el: "#book",
        data: {
            item: result.item,
            relateds: result.related,
            author_books: result.author_books
        }
    });
});