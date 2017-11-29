var koa = require("koa");
var controller = require("koa-route");

var app = koa();
var view = require("co-views");
var render = view("./view", {
    map: {
        html: "ejs"
    }
});

var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));

var querystring = require('querystring');

//测试接口是否返回数据
app.use(controller.get('/route_test', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = 'Hello koa';
}));

//测试是否返回html是否渲染
app.use(controller.get('/ejs_test', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', { title: 'title_test' });
}));

//设置默认路由index.html
app.use(controller.get("/", function*() {
    this.set("Cache-Control", "no-cache");
    this.body = yield render("index");
}));

app.use(controller.get('/ajax/index', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

app.use(controller.get('/male', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', { nav: '男生频道' });
}));

app.use(controller.get("/female", function*() {
    this.set("Cache-Control", "no-cache");
    this.body = yield render("female", { nav: "女生频道" });
}));

app.use(controller.get("/rank", function*() {
    this.set("Cache-Control", "no-cache");
    this.body = yield render("rank", { nav: "排行" });
}));

app.use(controller.get("/category", function*() {
    this.set("Cache-Control", "no-cache");
    this.body = yield render("category", { nav: "分类" });
}));

app.use(controller.get("/search", function*() {
    this.set("Cache-Control", "no-cache");
    this.body = yield render("search", { nav: "搜索" });
}));

app.use(controller.get("/book", function*() {
    this.set("Cache-Control", "no-cache");
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render("book", { nav: "书籍详情", bookId: bookId });
}));

app.use(controller.get('/ajax/book', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/chapter', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_chapter_content_data(id);

}));

app.use(controller.get('/reader', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render("reader", { nav: "阅读", bookId: bookId });
}));

app.listen(3001);