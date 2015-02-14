var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var jade = require('jade');
var cache = require('memory-cache');
var mysql = require('mysql');
var marked = require('marked');
var wait =require('wait.for');
var fs = require("fs");
var http = require('http');
app.use(bodyParser({limit: '10mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

/* Config */
var CACHE_ENABLE = 1; /* Use Memory Cache */
app.locals.title = 'BlogName'; /* Your Blog Name */
app.locals.postperpage = 10; /* How much posts display per page */
app.locals.AdminUsername = 'admin'; /* admin username */
var sqlconf = {
  host     : '127.0.0.1', /* Database IP */
  port     : 3306,   /* Database Port */
  user     : 'root',/* Database Username */
  password : '',/* Database Password */
  database: 'blogile'/* Database Name */
};

var connection;
var cache_miss = 0;
var cache_hit = 0;
function ConnDB(){
   connection = mysql.createConnection(sqlconf);
   connection.connect(function(err) {
     if(err != null){
        log("Mysql Connect error:" + err,3);
        connection.end();
        setTimeout(ConnDB,2000);
     }else{
        log("Mysql Connected!");
        BuildCache();
     }
   });
   connection.on('error', function(err) {
      log(err,3);
      ConnDB();
   });
}

ConnDB();


marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

app.use(function (req, res, next) {
  res.set('X-Blogile-Version', '0.14');
  next();
});

app.get('/', function(req, res) {
   var loadStart = Date.now();
   var cachePage = cache.get('index');
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      res.set('X-Server-Load-Time', Date.now() - loadStart);
      cache_hit++;
      res.send(cachePage);
   }else{
      wait.launchFiber(getNav, 1, false);
      //Get Data from Database
      connection.query('SELECT * FROM bi_posts order by time desc LIMIT 0 , ' + app.locals.postperpage , function(err, rows) {
         if(err){ log("Please run 'node install.js IP PORT USERNAME PASSWORD DBName' to install blogile."); connection.end();ConnDB();}
         var pageContent = jade.renderFile(__dirname + '/views/index.jade', {
               PageTitle: app.locals.title,
               BlogTitle: app.locals.title,
               PostData: rows,
               getimg: getFirstImage,
               memory:cache,
               nav:cache.get("nav-1")
            });
         if(CACHE_ENABLE == 1){
            cache.put('index', pageContent);
            res.set('X-Builtin-Cache', 'miss');
            cache_miss++;
            log(req.path + " Cached");
         }
         res.set('X-Server-Load-Time', Date.now() - loadStart);
         res.send(pageContent);
      });
   }
});

app.get('/page/:num', function(req, res) {
   var loadStart = Date.now();
   var cachePage = cache.get('page' + req.params.num);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      res.set('X-Server-Load-Time', Date.now() - loadStart);
      cache_hit++;
      res.send(cachePage);
   }else{
      var docnum = req.params.num*app.locals.postperpage - app.locals.postperpage;
      var pagedoc = docnum + app.locals.postperpage;
      //Get Data from Database
      wait.launchFiber(getNav, req.params.num, true);

      connection.query('SELECT * FROM bi_posts order by time desc LIMIT '+ docnum + ' , 10', function(err, rows) {
         if(err){ log("Please run 'node install.js IP PORT USERNAME PASSWORD DBName' to install blogile."); connection.end(); ConnDB();}
         var pageContent = jade.renderFile(__dirname + '/views/index.jade', {
               PageTitle: 'Page ' + req.params.num + " - " + app.locals.title,
               BlogTitle: app.locals.title,
               PostData: rows,
               memory:cache,
               getimg: getFirstImage,
               subdir:true,
               nav:cache.get("nav-" + req.params.num)
            });
         if(CACHE_ENABLE == 1){
            cache.put('page' + req.params.num, pageContent);
            res.set('X-Builtin-Cache', 'miss');
            cache_miss++;
            log(req.path + " Cached");
         }
         res.set('X-Server-Load-Time', Date.now() - loadStart);
         res.send(pageContent);
      });
   }
});

app.get('/posts/:shortname.html', function(req, res) {
   var loadStart = Date.now();
   var cachePage = cache.get('post-' + req.params.shortname);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      res.set('X-Server-Load-Time', Date.now() - loadStart);
      cache_hit++;
      res.send(cachePage);
   }else{
      //Get Data from Database
      connection.query('SELECT * FROM bi_posts where shortname = ' + connection.escape(req.params.shortname), function(err, rows) {
         if(err){ log(err,3);}
         if(rows[0] === undefined){
            res.set('X-Builtin-Cache', 'hit');
            res.set('X-Server-Load-Time', Date.now() - loadStart);
            res.status(404);
            res.send(cache.get('E404'));
            return;
         }

         var pageContent = jade.renderFile(__dirname + '/views/post.jade', {
               BlogTitle: app.locals.title,
               PostData: rows,
               Category: cache.get("categorydata-" + rows[0].category),
               marked : marked,
               ds_url:"http://" + req.hostname + req.path
            });
         if(CACHE_ENABLE == 1){
            cache.put('post-' + req.params.shortname, pageContent);
            res.set('X-Builtin-Cache', 'miss');
            log(req.path + " Cached");
            cache_miss++;
         }
         res.set('X-Server-Load-Time', Date.now() - loadStart);
         res.send(pageContent);
      });
   }
});

app.get('/archives/:shortname.html', function(req, res) {
   res.redirect(301, '../posts/' + req.params.shortname + '.html');
});

app.get('/donate', function(req, res) {
   res.redirect(301, '/donate.html');
});

app.get('/categorys/:shortname.html', function(req, res) {
   var loadStart = Date.now();
   var cachePage = cache.get('category-' + req.params.shortname);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      res.set('X-Server-Load-Time', Date.now() - loadStart);
      cache_hit++;
      res.send(cachePage);
   }else{
      var cat = cache.get("categorydata-" + req.params.shortname);
      if(cat === undefined){
         res.set('X-Builtin-Cache', 'hit');
         res.set('X-Server-Load-Time', Date.now() - loadStart);
         res.status(404);
         res.send(cache.get('E404'));
         return;
      }
      //Get Data from Database
      connection.query('SELECT * FROM bi_posts where category = ' + connection.escape(cat.id) + ' order by time desc', function(err, rows) {
         if(err){ log(err,3);}
         var pageContent = jade.renderFile(__dirname + '/views/index.jade', {
               PageTitle: cat.name+' - '+app.locals.title,
               BlogTitle: app.locals.title,
               PostData: rows,
               getimg: getFirstImage,
               memory:cache,
               subdir:true,
               nav:""
            });
         if(CACHE_ENABLE == 1){
            cache.put('category-' + req.params.shortname, pageContent);
            res.set('X-Builtin-Cache', 'miss');
            log(req.path + " Cached");
            cache_miss++;
         }
         res.set('X-Server-Load-Time', Date.now() - loadStart);
         res.send(pageContent);
      });
   }
});


// Blog Admin
app.post('/admin/login', function(req, res) {
   if(req.param('username') != app.locals.AdminUsername){
      res.send("-1");
      log(Date.now() + " Username Error from " + req.ip,2);
   }else{
      var file = __dirname + '/.blogilepassword';
      if(fs.existsSync(file)){
         var sha1 = require('sha1');
         var pwb = req.param('password');
         var pwc = md5(pwb + pwb.substr(3,11) + "Poweredbytypcn");
         var pwd = sha1(pwc+pwc+pwb);
         var localpw = fs.readFileSync(file);
         if(pwd==localpw){
            var session = sha1(Math.random());
            cache.put(session,true);
            res.cookie('ADMINSESSION', session, { expires: new Date(Date.now() + 9999999999), httpOnly: true })
            res.send("0");
            log(Date.now() + " Login Success from " + req.ip,2);
         }else{
            res.send("-1");
            log(Date.now() + " Password Error from " + req.ip,2);
         }
      }else{
         res.send("-2");
      }
   }
});

app.get('/admin/check', function(req, res) {
   if(cache.get(req.cookies.ADMINSESSION) != true){
      res.send("-1");
   }else{
      res.send("0");
   }
});

app.get('/admin/status', function(req, res) {
   if(cache.get(req.cookies.ADMINSESSION) != true){
      res.send("-1");
   }else{
      connection.query('SELECT COUNT(*) AS namesCount FROM bi_posts', function(err, rows) {   
         var result = {};
         var memoryUsage = process.memoryUsage();
         result['uptime'] = process.uptime();
         result['memory'] = memoryUsage.rss / 1024 / 1024;
         result['cachehit'] = cache_hit;
         result['cachemiss'] = cache_miss;
         result['docnum'] = rows[0].namesCount;
         res.contentType('application/json');
         res.send(JSON.stringify(result));
      });
   }
});

app.get('/admin/delcache/:name', function(req, res) {
   if(cache.get(req.cookies.ADMINSESSION) != true){
      res.send("-1");
   }else{
      if(req.params.name == "all"){
         cache.clear();
         BuildCache();
         res.send("0");
      }else{
         cache.del(req.params.name);
         res.send("0");
      }
   }
});

app.get('/admin/post/list/:ppp/:pid', function(req, res) {
   if(cache.get(req.cookies.ADMINSESSION) != true){
      res.send("-1");
   }else{
      if(req.params.name == "all"){
         cache.clear();
         BuildCache();
         res.send("0");
      }else{
         cache.del(req.params.name);
         res.send("0");
      }
   }
});

app.post('/admin/post/new', function(req, res) {
    if(cache.get(req.cookies.ADMINSESSION) != true){
      res.send("-1");
   }else{
        if(req.param('url')){
            var time = Math.round(+new Date()/1000);
            var category = req.param('category');
            if(!category){
                category = 0;
            }
            var q = 'INSERT INTO `bi_posts`(`time`, `content`, `title`, `shortname`, `category`) VALUES (' + time + ',' +  connection.escape(req.param('content')) + ',' + connection.escape(req.param('title')) + ',' +  connection.escape(req.param('url')) + ',' + category + ')';
            connection.query(q, function(err, rows) {
                if(err) { 
                    log(err,3); 
                    res.send("-2"); 
                }else{
                    res.send("0");
                    cache.del("index");
                    cache.del("api-page-1");
                }
            });
        }else{
            res.send("1");
        }
   }
});

app.post('/admin/upload/base64', function(req, res) {
   if(cache.get(req.cookies.ADMINSESSION) != true){
      res.send("-1");
   }else{
      var str = req.param('imgstr');
      var matches = str.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);

      if (matches.length !== 3) {
        res.status(500);
        res.send("-2");
      }

      var filetype = matches[1].replace("x-icon","ico");
      filetype = filetype.replace("jpeg","jpg");
      
      var data = new Buffer(matches[2], 'base64');
      
      var filename = Date.now() + '.' + filetype;
      
      fs.writeFile(__dirname + '/public/images/' + filename, data, function(err) { 
            if(err){
                res.status(500);
                res.send("-3");
            }
            res.send("images/" + filename);
      });
   }
});

// API
app.get('/api/post/:postid.json', function(req, res) {
   var cachePage = cache.get('api-post-' + req.params.postid);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      cache_hit++;
      res.send(cachePage);
   }else{
      //Get Data from Database
      connection.query('SELECT * FROM bi_posts where id = ' + connection.escape(req.params.postid), function(err, rows) {
         if(err){ log(err,3);}
         if(rows[0] === undefined){
            res.contentType('application/json');
            res.send('{"error":1}');
            return;
         }
         var result = {
            "error":0,
            "results":{
                0:{
                    "id":rows[0].id,
                    "time":rows[0].time,
                    "title":rows[0].title,
                    "category":cache.get("categorydata-" + rows[0].category),
                    "content":marked(rows[0].content)
                }
            }
         };
         
         if(CACHE_ENABLE == 1){
            cache.put('api-post-' + req.params.postid, result);
            res.set('X-Builtin-Cache', 'miss');
            log(req.path + " Cached");
            cache_miss++;
         }

         res.contentType('application/json');
         res.send(JSON.stringify(result));
      });
   }
});

app.get('/api/categorys/:shortname.json', function(req, res) {
   var cachePage = cache.get('api-category-' + req.params.shortname);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      cache_hit++;
      res.send(cachePage);
   }else{
      var info = cache.get('categorydata-' + req.params.shortname);
      if(!info){
        res.contentType('application/json');
        res.send('{"error":1}');
        return;
      }
      connection.query('SELECT * FROM bi_posts where category = ' + connection.escape(info.id) + ' order by time desc', function(err, rows) {
         if(err){ log(err,3);}
         if(rows[0] === undefined){
            res.contentType('application/json');
            res.send('{"error":1}');
            return;
         }
         var result = {
            "error":0,
            "results":{}
         };
         
        for (var i = 0, len = rows.length; i < len; i++) {
            result['results'][i] = {
                "id":rows[i].id,
                "time":rows[i].time,
                "title":rows[i].title,
                "category":info,
                "shortname":rows[i].shortname,
                "content":rows[i].content.replace(/(<([^>]+)>)/ig,"").replace(/\r?\n|\r/g, " ").substr(0,200),
                "firstimg":getFirstImage(rows[i].content)
            }            
        }
      
         if(CACHE_ENABLE == 1){
            cache.put('api-category-' + req.params.shortname, result);
            res.set('X-Builtin-Cache', 'miss');
            log(req.path + " Cached");
            cache_miss++;
         }

         res.contentType('application/json');
         res.send(JSON.stringify(result));
      });
   }
});

app.post('/api/search/:query.json', function(req, res) {
  res.contentType('application/json');
  res.set('Access-Control-Allow-Origin', '*');
   var cachePage = cache.get('api-search-' + req.params.query);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      cache_hit++;
      res.send(cachePage);
   }else{
      if(!req.param('TK') || !req.param('ua')){
        res.setHeader('Cache-Control', 'max-age=0');
        res.send('{"error":1,"msg":"No access token!"}');
        return;
      }
      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      var purl = "/hash/verify/" + req.param('TK') + "/" + req.param('ua') + "?cfip=" + ip;


      http.get({
          host: 'antispam.eqoe.cn',
          path: purl
      }, function(response) {
          // Continuously update stream with data
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
              var parsed = JSON.parse(body);
              if(parsed.success == 0){
                res.contentType('application/json');
                res.send('{"error":1,"msg":"Access token error"}');
                return;
              }else{
                searchkey(req.params.query,res);
              }
          });
      });

   }
});

app.get('/api/search/:query.json', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.contentType('application/json');
   var cachePage = cache.get('api-search-' + req.params.query);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      cache_hit++;
      res.send(cachePage);
   }else{
      res.setHeader('Cache-Control', 'max-age=0');
      res.send('{"error":1}');
   }
});

app.get('/api/page/:num.json', function(req, res) {
  res.contentType('application/json');
  res.set('Access-Control-Allow-Origin', '*');
   var cachePage = cache.get('api-page-' + req.params.num);
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      cache_hit++;
      res.send(cachePage);
   }else{
      var docnum = req.params.num*app.locals.postperpage - app.locals.postperpage;
      var pagedoc = docnum + app.locals.postperpage;
      //Get Data from Database
      if(req.params.num == 1){
        wait.launchFiber(getNav, req.params.num, false);
      }else{
        wait.launchFiber(getNav, req.params.num, true);
      }
      
      connection.query('SELECT * FROM bi_posts order by time desc LIMIT '+ docnum + ' , 10', function(err, rows) {
         if(err){ log(err,3);}
         if(rows[0] === undefined){
            res.contentType('application/json');
            res.send('{"error":1}');
            return;
         }
         var result = {
            "error":0,
            "results":{},
            "nav":cache.get("nav-" + req.params.num)
         };
         
        for (var i = 0, len = rows.length; i < len; i++) {
            result['results'][i] = {
                "id":rows[i].id,
                "time":rows[i].time,
                "title":rows[i].title,
                "shortname":rows[i].shortname,
                "category":cache.get('categorydata-' + rows[i].category),
                "content":rows[i].content.replace(/(<([^>]+)>)/ig,"").replace(/\r?\n|\r/g, " ").substr(0,200),
                "firstimg":getFirstImage(rows[i].content)
            }            
        }
      
         if(CACHE_ENABLE == 1){
            cache.put('api-page-' + req.params.num, result);
            res.set('X-Builtin-Cache', 'miss');
            log(req.path + " Cached");
            cache_miss++;
         }

         res.contentType('application/json');
         res.send(JSON.stringify(result));
      });
   }
});

app.get('/feed.xml', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.contentType('application/xml');
   var cachePage = cache.get('feed');
   if(cachePage){
      res.set('X-Builtin-Cache', 'hit');
      cache_hit++;
      res.send(cachePage);
   }else{

      var currPath = req.protocol + '://' + req.get('host') + req.originalUrl;
      currPath = currPath.replace("feed.xml","");

      var outXML = '<?xml version="1.0" encoding="utf-8"?> <feed xmlns="http://www.w3.org/2005/Atom"><title>' + app.locals.title +'</title><link href="' + currPath + '"/>';

      connection.query('SELECT * FROM bi_posts order by time desc LIMIT 0,10', function(err, rows) {
         if(err){ log(err,3);}
         if(rows[0] === undefined){
            res.contentType('application/json');
            res.send('{"error":1}');
            return;
         }


        var lastupdate = new Date(rows[0].time*1000).toJSON().toString();
        outXML += '<updated>' + lastupdate + '</updated>';
         
        for (var i = 0, len = rows.length; i < len; i++) {

          var t = new Date(rows[i].time*1000).toJSON().toString();
          outXML += '<entry><title> ' + rows[i].title + ' </title><link href="'+ currPath + 'posts/' + rows[i].shortname + '.html"/><updated>' + t + '</updated><content type="html">' + htmlEscape(marked(rows[i].content)) + '</content></entry>'

        }
        outXML += '</feed>';
         if(CACHE_ENABLE == 1){
            cache.put('feed', outXML);
            res.set('X-Builtin-Cache', 'miss');
            log(req.path + " Cached");
            cache_miss++;
         }

         res.send(outXML);
      });
   }
});

app.listen(8023);



function BuildCache(){
   //404 Page
   cache.put('E404', jade.renderFile( __dirname + '/views/404.jade',{ BlogTitle:app.locals.title }));
   //Categorys
   connection.query('SELECT * FROM bi_categorys', function(err, rows) {
      for (var i = 0, len = rows.length; i < len; i++) {
        cache.put('categorydata-' + rows[i].id,rows[i]);
        cache.put('categorydata-' + rows[i].url_short,rows[i]);
      }
      var category = {};
      category.id = 0;
      category.name = "Uncategorized";
      category.url_short = "uncategorized";
      cache.put("categorydata-0",category);
      cache.put("categorydata-uncategorized",category);
      log("Category Cache Built");
   });
}
var getFirstImage = function(content){
   var regex = /<img.*?src="(.*?)"/;
   var src = regex.exec(content);
   if(src){
      return src[1];
   }else{
      return false;
   }
};


function md5(name){
   var crypto = require('crypto');
   return crypto.createHash('md5').update(name).digest('hex');
}

function getNav(currpage,subdir){
   var rows = wait.forMethod(connection,'query','SELECT COUNT(*) AS namesCount FROM bi_posts');
   var DOM = '<div id="pageNav">';
   var postnum = rows[0].namesCount;
   var pagenum = Math.ceil(postnum/app.locals.postperpage);
   if(currpage != 1){
      var lastpage = currpage - 1;
      DOM += '<a href="'+ lastpage +'" class="button pagenav">上一页</a>';
   }
   for(var i=0 ; i < pagenum ; i++ ){
      var num = i + 1;
      var url = "page/" + num;
      if(subdir){
         url = num;
      }
      if(currpage == num){
         DOM += '<a href="'+ url +'" class="button pagenav current">' + num + '</a>';
      }else{
         DOM += '<a href="'+ url +'" class="button pagenav">' + num + '</a>';
      }
   }
   if(currpage != pagenum){
      var nextpage = parseInt(currpage) + 1;
      if(subdir){
         DOM += '<a href="'+ nextpage +'" class="button pagenav">下一页</a>';
      }else{
         DOM += '<a href="page/'+ nextpage +'" class="button pagenav">下一页</a>';
      }
   }
   DOM += '</div>';
   cache.put("nav-" + currpage,DOM);
}

function searchkey(query,res){
  var qr = "%" + query + "%";
  connection.query('select * from bi_posts where concat(title,content) like ? order by time desc', qr ,function(err, rows) {
    if(err){ log(err,3);}
    if(rows[0] === undefined){
      res.contentType('application/json');
      res.send('{"error":2}');
      return;
    }


    var result = {
      "error":0,
      "results":{}
    };

    for (var i = 0, len = rows.length; i < len; i++) {
        result['results'][i] = {
            "id":rows[i].id,
            "time":rows[i].time,
            "title":rows[i].title,
            "category":cache.get('categorydata-' + rows[i].category),
            "shortname":rows[i].shortname,
            "content":rows[i].content.replace(/(<([^>]+)>)/ig,"").replace(/\r?\n|\r/g, " ").substr(0,200),
            "firstimg":getFirstImage(rows[i].content)
        }            
    }

    if(CACHE_ENABLE == 1){
      cache.put('api-search-' + query, result);
      res.set('X-Builtin-Cache', 'miss');
      cache_miss++;
    }

    res.contentType('application/json');
    res.send(JSON.stringify(result));
  });
}

setInterval(logStat,60000);
logStat();

function logStat(){
   var memoryUsage = process.memoryUsage();
   log("Uptime: " + process.uptime() + "  Memory Usage: " + memoryUsage.rss / 1024 / 1024);
   var cachenum = cache_hit + cache_miss;
   var hitrate = cache_hit/cachenum;
   log("Cache hit: " + cache_hit + " Cache miss: " + cache_miss + " Hit rate: " + hitrate*100 + "%");
}

process.on('uncaughtException', function(err) {
  log('Caught exception: ' + err,3);
});

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

function log(str,level){
   var msg = "INFO";
   var file = "./blogile.log";
   if(level == 2){ msg = "WARN"; }
   else if(level == 3){ msg="ERR";file="./error.log"; }
   var str2 = msg + " [" + Date().toLocaleString() + "] " + str;
   console.log(str2);

   fs.appendFile(file, str2 + "\n", function (err) {
     if(err){
         console.log("Log Write Failed");
     }
   });
}
