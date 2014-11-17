var mysql      = require('mysql');
var pw;
if(process.argv[5]!="no"){
    pw = process.argv[5];
}
var connection = mysql.createConnection({
  host     : process.argv[2],
  port     : process.argv[3],
  user     : process.argv[4],
  password : pw,
  database : process.argv[6]
});

var dbengine = "InnoDB";
if(process.argv[7]){
    dbengine = process.argv[7];
}
connection.connect(function(err) {
  if(err != null){
     console.log("Mysql Connect error:");
     console.log(err);
     process.exit(0);
  }else{
     console.log("Mysql Connected!");
     runsql("SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO'");
     runsql("CREATE TABLE IF NOT EXISTS `bi_categorys` ( `id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(50) NOT NULL,`url_short` varchar(50) NOT NULL,PRIMARY KEY (`id`)) ENGINE="+ dbengine +" DEFAULT CHARSET=utf8 AUTO_INCREMENT=1");
     runsql("CREATE TABLE IF NOT EXISTS `bi_links` (  `id` int(11) NOT NULL AUTO_INCREMENT,  `name` varchar(50) NOT NULL,  `url` varchar(200) NOT NULL,  `rel` varchar(20) NOT NULL,  PRIMARY KEY (`id`)) ENGINE="+ dbengine +" DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ");
     runsql("CREATE TABLE IF NOT EXISTS `bi_posts` (  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,  `time` int(10) NOT NULL,  `title` text NOT NULL,  `content` longtext NOT NULL, `shortname` VARCHAR(50) NOT NULL ,  `category` int(11) NOT NULL,  PRIMARY KEY (`id`),  KEY `category` (`category`)) ENGINE="+ dbengine +"  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2");
     runsql("ALTER TABLE  `bi_posts` ADD UNIQUE (`shortname`);");
     runsql("INSERT INTO `bi_posts` (`id`, `time`, `title`, `content`, `shortname`,`category`) VALUES(1, 1415303515, 'Sample Post', 'This is a sample post generate by system. Delete or Edit it now !','sample-post', 0)");
     
     console.log("Install Success!");
     process.exit(0);
  }
});

function runsql(sql){
    connection.query(sql, function(err) {
        if(err) throw err;
    });
}