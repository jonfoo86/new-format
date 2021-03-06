/**
 * Module dependencies.
 */

var express = require('express');
var log4js = require('log4js');

log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/visit.log'), 'visit');


var app = module.exports = express();

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/app'));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');


var des = {
    json_format: {
        keywords: "json format,json online format,json decode,json online decode, json在线解析,json格式化,json格式,json解析,在线json解析器,在线解析json数据,在线json解析,在线json格式化,在线格式化json,格式化json数据",
        des: "本网站在线提供友好的界面高亮格式化以及解析json文本",
        title: "json在线解析_json格式化",
        name: "json解析及格式化"
    },
    js_format: {
        keywords: "javascript在线解析, javascript在线工具,javascript格式化,javascript高亮显示,javascript缩进",
        des: "本网站在线提供友好的界面高亮格式化以及解析javascript代码",
        title: "javascript 在线解析 格式化",
        name: "javascript(js)解析格式化"
    },
    xml_format: {
        keywords: "xml在线解析, xml在线工具, xml格式化, xml高亮显示, xml缩进",
        des: "本网站在线提供友好的界面高亮格式化以及解析xml文本",
        title: "xml  在线解析 格式化",
        name: "xml解析格式化"
    },
    html_format: {
        keywords: "html在线解析,html在线工具,html格式化,html高亮显示,html缩进",
        des: "本网站在线提供友好的界面高亮格式化以及解析xml文本",
        title: "html  在线解析 格式化",
        name: "html解析格式化"
    },
    auto_format: {
        keywords: "代码在线格式化,代码在线解析,代码在线工具,代码高亮显示,代码缩进",
        des: "本网站在线提供友好的界面自动高亮格式化以及解析代码以及文本",
        title: "万能代码 在线格式化",
        name: "万能解析格式化"
    }
};
app.get('/', function (req, res) {
    res.redirect('/json_format');
});

app.get('/:page_type', function (req, res) {
    var logger = log4js.getLogger('visit');
    logger.setLevel('DEBUG');
    logger.debug(req.hostname + "/" + req.params.page_type + " <<------- " + req.ip + " : " + req.get('User-Agent'));

    if (!des[req.params.page_type]) {
        res.status(404);
        res.send("not found!!!");
        return;
    }
    res.render('app', {
        title: "EJS example",
        header: "Some users",
        alltype: des,
        pagetype: req.params.page_type
    });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(80);
    console.log('Express started on port 80');
}
