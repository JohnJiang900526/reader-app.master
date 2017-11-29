var fs = require('fs');

//返回首页面使用的数据
exports.get_index_data = function() {
    var content = fs.readFileSync('./mock/home.json', 'utf-8');
    return content;
};

exports.get_chapter_data = function() {
    var content = fs.readFileSync("./mock/reader/chapter.json", "utf-8");
    return content;
};

exports.get_chapter_content_data = function(id) {
    if (!id) {
        id = "1";
    }
    var content = fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
    return content;
}

exports.get_book_data = function(id) {
    if (!id) {
        id = "18218";
    }
    if (fs.existsSync('./mock/book/' + id + '.json')) {
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    } else {
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
}