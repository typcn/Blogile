 --------------------------------------------------------------------------
                   ll                                  ii      ll              
     BBBBBBB       ll                                  ii      ll              
     BB   BBB      ll                                          ll              
     BB    BB      ll                                          ll              
     BB    BB      ll        oooo          gggggg      ii      ll        eeee  
     BB   BB       ll       oo  oo        gg  ggg      ii      ll       ee   ee
     BBBBBBB       ll      oo    oo      gg    gg      ii      ll      ee    ee
     BB    BB      ll      oo    oo      gg    gg      ii      ll      eeeeeeee
     BB     BB     ll      oo    oo      gg    gg      ii      ll      ee      
     BB     BB     ll      oo    oo      gg    gg      ii      ll      ee      
     BB    BB      ll       oo  oo        gg  ggg      ii      ll       ee   e 
     BBBBBBB       ll        oooo         gggg gg      ii      ll        eeeee 
                                               gg                              
                                               gg                              
                                          g   gg                               
                                          ggggg      
--------------------------------------------------------------------------

[![NPM](https://nodei.co/npm/blogile.png?mini=true)](https://www.npmjs.org/package/blogile)


WARN: The project is not completed.

注意: 项目尚未完成，可能有各种bug & 点不了，不建议用于正式使用。

##  Feature

* Use memory cache , High performance
* Support for Markdown , Code highlight , Drag & Drop upload image
* Only 1 css and js file
* Full-width Simple Theme , HTML5 Responsive.

## 特性

* 使用内存缓存 加载速度飞快
* 支持 Markdown 写作 代码高亮 拖拽传图
* 仅一个 css 和 js 文件
* 全宽度简洁主题，响应式 HTML5 设计

##  HOWTO

1. Download . 
2. Setup "node install.js \<Mysql IP\> \<Port\> \<Username\> \<Password\> \<Database Name\> [Engine]". If password empty input "no".
3. Set admin password "node setpw.js \<Your Password\>".
4. Edit /public/js/scripts.js
 
   Line 7: Fill your [DuoShuo](http://duoshuo.com) Subdomain

   Line 26:Fill your copyright info  
5. Edit /views/*.jade , put your nav and modify page modules.
6. Edit server.js , Line 17-27 and Line 615 .
7. Use software ( like supervisor ) to run it background .
   
## 如何安装

1. 下载
2. 运行 "node install.js \<Mysql IP\> <端口> <用户名> <密码> <数据库名> [存储引擎]" 如果密码为空，输入 "no"
3. 设置后台登陆密码 "node setpw.js \<密码\>"
4. 编辑 /public/js/scripts.js ， 第7行 和 第26行。
5. 编辑 /views/*.jade ， 修改你的导航和页面模块。
6. 编辑 server.js ， 17行到27行，以及到615行修改监听端口。
7. 使用类似 Supervisor 的软件来后台运行


## Known problems

* Web Manager only can view dashboard or post new ,can't edit. You can use Database manage software ( like PHPMyAdmin ).
* Maybe unstable , Far as possible timing restart it 
* Post list can't get Markdown Image, please use \<img\> tag

## 已知问题

* 后台未开发完毕，只能发表文章，要管理请使用数据库管理软件，比如phpmyadmin 。
* 可能不稳定，最好定时重启它
* 文章列表无法抓取 Markdown 图片，请使用 \<img\> 标签。
