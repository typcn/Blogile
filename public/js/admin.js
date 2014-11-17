/* 
    MD5 Script 
Thanks for myersdaily.org
*/
function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a=ff(a,b,c,d,k[0],7,-680876936);d=ff(d,a,b,c,k[1],12,-389564586);c=ff(c,d,a,b,k[2],17,606105819);b=ff(b,c,d,a,k[3],22,-1044525330);a=ff(a,b,c,d,k[4],7,-176418897);d=ff(d,a,b,c,k[5],12,1200080426);c=ff(c,d,a,b,k[6],17,-1473231341);b=ff(b,c,d,a,k[7],22,-45705983);a=ff(a,b,c,d,k[8],7,1770035416);d=ff(d,a,b,c,k[9],12,-1958414417);c=ff(c,d,a,b,k[10],17,-42063);b=ff(b,c,d,a,k[11],22,-1990404162);a=ff(a,b,c,d,k[12],7,1804603682);d=ff(d,a,b,c,k[13],12,-40341101);c=ff(c,d,a,b,k[14],17,-1502002290);b=ff(b,c,d,a,k[15],22,1236535329);a=gg(a,b,c,d,k[1],5,-165796510);d=gg(d,a,b,c,k[6],9,-1069501632);c=gg(c,d,a,b,k[11],14,643717713);b=gg(b,c,d,a,k[0],20,-373897302);a=gg(a,b,c,d,k[5],5,-701558691);d=gg(d,a,b,c,k[10],9,38016083);c=gg(c,d,a,b,k[15],14,-660478335);b=gg(b,c,d,a,k[4],20,-405537848);a=gg(a,b,c,d,k[9],5,568446438);d=gg(d,a,b,c,k[14],9,-1019803690);c=gg(c,d,a,b,k[3],14,-187363961);b=gg(b,c,d,a,k[8],20,1163531501);a=gg(a,b,c,d,k[13],5,-1444681467);d=gg(d,a,b,c,k[2],9,-51403784);c=gg(c,d,a,b,k[7],14,1735328473);b=gg(b,c,d,a,k[12],20,-1926607734);a=hh(a,b,c,d,k[5],4,-378558);d=hh(d,a,b,c,k[8],11,-2022574463);c=hh(c,d,a,b,k[11],16,1839030562);b=hh(b,c,d,a,k[14],23,-35309556);a=hh(a,b,c,d,k[1],4,-1530992060);d=hh(d,a,b,c,k[4],11,1272893353);c=hh(c,d,a,b,k[7],16,-155497632);b=hh(b,c,d,a,k[10],23,-1094730640);a=hh(a,b,c,d,k[13],4,681279174);d=hh(d,a,b,c,k[0],11,-358537222);c=hh(c,d,a,b,k[3],16,-722521979);b=hh(b,c,d,a,k[6],23,76029189);a=hh(a,b,c,d,k[9],4,-640364487);d=hh(d,a,b,c,k[12],11,-421815835);c=hh(c,d,a,b,k[15],16,530742520);b=hh(b,c,d,a,k[2],23,-995338651);a=ii(a,b,c,d,k[0],6,-198630844);d=ii(d,a,b,c,k[7],10,1126891415);c=ii(c,d,a,b,k[14],15,-1416354905);b=ii(b,c,d,a,k[5],21,-57434055);a=ii(a,b,c,d,k[12],6,1700485571);d=ii(d,a,b,c,k[3],10,-1894986606);c=ii(c,d,a,b,k[10],15,-1051523);b=ii(b,c,d,a,k[1],21,-2054922799);a=ii(a,b,c,d,k[8],6,1873313359);d=ii(d,a,b,c,k[15],10,-30611744);c=ii(c,d,a,b,k[6],15,-1560198380);b=ii(b,c,d,a,k[13],21,1309151649);a=ii(a,b,c,d,k[4],6,-145523070);d=ii(d,a,b,c,k[11],10,-1120210379);c=ii(c,d,a,b,k[2],15,718787259);b=ii(b,c,d,a,k[9],21,-343485551);x[0]=add32(a,x[0]);x[1]=add32(b,x[1]);x[2]=add32(c,x[2]);x[3]=add32(d,x[3])}function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>>(32-s)),b)}function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t)}function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)}function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t)}function md51(s){txt="";var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=s.length;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)))}s=s.substring(i-64);var tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<s.length;i++){tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3)}tail[i>>2]|=128<<((i%4)<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i++){tail[i]=0}}tail[14]=n*8;md5cycle(state,tail);return state}function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks}var hex_chr="0123456789abcdef".split("");function rhex(n){var s="",j=0;for(;j<4;j++){s+=hex_chr[(n>>(j*8+4))&15]+hex_chr[(n>>(j*8))&15]}return s}function hex(x){for(var i=0;i<x.length;i++){x[i]=rhex(x[i])}return x.join("")}function md5(s){return hex(md51(s))}function add32(a,b){return(a+b)&4294967295}if(md5("hello")!="5d41402abc4b2a76b9719d911017c592"){function add32(x,y){var lsw=(x&65535)+(y&65535),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&65535)}};
/*
    SHA1 Script
Thaks for phpjs.org
*/
function sha1(str){var rotate_left=function(n,s){var t4=(n<<s)|(n>>>(32-s));return t4};var cvt_hex=function(val){var str="";var i;var v;for(i=7;i>=0;i--){v=(val>>>(i*4))&15;str+=v.toString(16)}return str};var blockstart;var i,j;var W=new Array(80);var H0=1732584193;var H1=4023233417;var H2=2562383102;var H3=271733878;var H4=3285377520;var A,B,C,D,E;var temp;str=unescape(encodeURIComponent(str));var str_len=str.length;var word_array=[];for(i=0;i<str_len-3;i+=4){j=str.charCodeAt(i)<<24|str.charCodeAt(i+1)<<16|str.charCodeAt(i+2)<<8|str.charCodeAt(i+3);word_array.push(j)}switch(str_len%4){case 0:i=2147483648;break;case 1:i=str.charCodeAt(str_len-1)<<24|8388608;break;case 2:i=str.charCodeAt(str_len-2)<<24|str.charCodeAt(str_len-1)<<16|32768;break;case 3:i=str.charCodeAt(str_len-3)<<24|str.charCodeAt(str_len-2)<<16|str.charCodeAt(str_len-1)<<8|128;break}word_array.push(i);while((word_array.length%16)!=14){word_array.push(0)}word_array.push(str_len>>>29);word_array.push((str_len<<3)&4294967295);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++){W[i]=word_array[blockstart+i]}for(i=16;i<=79;i++){W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1)}A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=(rotate_left(A,5)+((B&C)|(~B&D))+E+W[i]+1518500249)&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=20;i<=39;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+1859775393)&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=40;i<=59;i++){temp=(rotate_left(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+2400959708)&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=60;i<=79;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+3395469782)&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}H0=(H0+A)&4294967295;H1=(H1+B)&4294967295;H2=(H2+C)&4294967295;H3=(H3+D)&4294967295;H4=(H4+E)&4294967295}temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);return temp.toLowerCase()};

$(document).ready(function(){
    $.fn.tabOverride.tabSize(4);
    $('textarea').tabOverride();
    $('textarea').autosize();
    Navigate();
    $.ajax({
        url: "admin/check",
        timeout: 30000,

        success:function(data, textStatus) {
            console.log("Received response HTTP "+textStatus+" (admin/check)");
            if(data == 0){
                window.location = "#dash";
            }else{
                window.location = "#";
                $(".postlist li").hide();
                $(".loginform").show();
                $("body").keydown(function() {
                    if (event.keyCode == "13") {
                        $('#login').click();
                    }
                 });
            }
        },
    
        error:function(jqXHR, textStatus, errorThrown) {
            console.log("Error during request "+textStatus+" (admin/check)");
            console.log(errorThrown);
        },
    });
	$("#editor").bind({
		dragover: function (ev) {
			$(this).addClass('hover');
			ev.preventDefault();
			return false;
		},
		dragend: function () {
			$(this).removeClass('hover');
			return false;
		},
		dragleave: function () {
			$(this).removeClass('hover');
			return false;
		},
		drop: function (ev) {
			ev.preventDefault();
			var file = ev.originalEvent.dataTransfer.files[0];
			var reader = new FileReader();
			reader.onloadend = function () {
			
				$(ev.currentTarget).val($(ev.currentTarget).val() + "\n [ 正在为您上传 ]");
				$.ajax({
					url: 'admin/upload/base64',
					type: 'POST',
					success: function(data){
						var str = $(ev.currentTarget).val();
						if(window.location.hostname == "blog.eqoe.cn"){
							var img = '<img src="http://blog-cdn.eqoe.cn/' + data + '!mini">';
							var href = '<a target="_blank" href="http://blog-cdn.eqoe.cn/' + data + '">' + img + '</a>';
							str = str.replace("[ 正在为您上传 ]", href);
						}else{
							str = str.replace("[ 正在为您上传 ]", "<img src=\"../" + data + "\">");
						}
						$(ev.currentTarget).val(str);
					},
					error: function(){
						var str = $(ev.currentTarget).val();
						str = str.replace("[ 正在为您上传 ]", "[ 图片上传失败 ]");
						$(ev.currentTarget).val(str);
					},
					// Form data
					data:{
						"imgstr":reader.result
					},
				});
			}
			
			reader.readAsDataURL(file);
			return false;
		}
	});
});
$("#login").click(function(){
    var pw = $("#password").val();
    var pwa = md5(pw).substr(0,8);
    var pwb = sha1(pw.substr(0,4) + pwa);
    var uname = $("#username").val();
    $.ajax({
    	url: "admin/login",
    	type: "POST",
    	timeout: 30000,
    
    	// Request Body: admin/login
    
    	data:{
    		"username":uname,
    		"password":pwb
    	},
    
    	// Success Callback: admin/login
    
    	success:function(data, textStatus) {
    		console.log("Received response HTTP "+textStatus+" (admin/login)");
    		if(data == 0){
                $("body").unbind("keydown");
                window.location = "#dash";
            }else if (data == -1){
                $("#login").text("Username or password error");
            }else if(data == -2){
                $(".postitle").text("Password not set. Please run 'node setpw.js yourpassword' to set admin password.");
            }
    	},
    
    	// Error Callback: admin/login
    
    	error:function(jqXHR, textStatus, errorThrown) {
    		console.log("Error during request "+textStatus+" (admin/login)");
    		console.log(errorThrown);
    	},
    });
});



$("#rindex").click(function(){
    $.get("admin/delcache/index");
	alert("成功");
});
$("#rall").click(function(){
    $.get("admin/delcache/all");
	alert("成功");
    window.location = "admin.html";
});

$("textarea").blur(autosave);

$("#nav ul li a").click(function(){
    $("#nav ul li a").removeClass("current");
    $(this).addClass("current");
});

$("#postnow").click(function(){
    $.ajax({
    	url: "admin/post/new",
    	type: "POST",
    	timeout: 30000,
    
    	data:{
    		"title":$("input#title").val(),
    		"url":$("input#url").val(),
			"content":$("#editor").val(),
			"category":$("input#cate").val()
    	},

    
    	success:function(data, textStatus) {
    		console.log("Received response HTTP "+textStatus+" (admin/post/new)");
    		if(data == 0){
                localStorage.unsavecontent = "";
				alert("Success");
                window.location = "./";
            }else if (data == -1){
                alert("Please refresh the page to re-login ! Content will save to your LocalStorage.");
            }else if(data == -2){
                alert("Database error ! Please check server !");
            }else if(data == 1){
				alert("Please fill all filed.");
			}
    	},
    
    	// Error Callback: admin/login
    
    	error:function(jqXHR, textStatus, errorThrown) {
    		console.log("Error during request "+textStatus+" (admin/post/new)");
    		console.log(errorThrown);
    	},
    });
});


$(window).bind("hashchange",Navigate);

function Navigate(){
    var hash = (location.href.split("#")[1] || "");
    $("#nav ul").hide();
    if(hash == "dash"){
        $(".postlist li").hide();
        $(".dash").show();
        $.getJSON( "admin/status", function( data ) {
            $("#uptime").text(data.uptime);
            $("#memory").text(data.memory);
            $("#postnum").text(data.docnum);
            var cachenum = data.cachehit + data.cachemiss;
            var hitrate = data.cachehit/cachenum;
            $("#hitrate").text(hitrate*100);
            $("#hitrate").parent().attr("title","Hit:" + data.cachehit + "  Miss:" + data.cachemiss);
        });
    }else if(hash == "postnew"){
        $(".postlist li").hide();
        $(".postnew").show();
        setTimeout(function(){ $("#editor").focus(); },0);
        if(typeof(Storage) !== "undefined") {
            setTimeout(autosave, 30000);
            var unsavec = localStorage.getItem("unsavecontent");
            if(unsavec != null){
                $("#editor").val(unsavec);
            }
        }
        
    }
}

function autosave(){
    localStorage.unsavecontent= $("#editor").val();
}
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:cap[1]==="pre"||cap[1]==="script"||cap[1]==="style",text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=escape(this.smartypants(cap[0]));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

/*! taboverride v4.0.2 | https://github.com/wjbryant/taboverride
Copyright (c) 2014 Bill Bryant | http://opensource.org/licenses/mit */
!function(a){"use strict";var b;"object"==typeof exports?a(exports):"function"==typeof define&&define.amd?define(["exports"],a):(b=window.tabOverride={},a(b))}(function(a){"use strict";function b(a,b){var c,d,e,f=["alt","ctrl","meta","shift"],g=a.length,h=!0;for(c=0;g>c;c+=1)if(!b[a[c]]){h=!1;break}if(h)for(c=0;c<f.length;c+=1){if(e=f[c]+"Key",b[e])if(g){for(h=!1,d=0;g>d;d+=1)if(e===a[d]){h=!0;break}}else h=!1;if(!h)break}return h}function c(a,c){return a===q&&b(s,c)}function d(a,c){return a===r&&b(t,c)}function e(a,b){return function(c,d){var e,f="";if(arguments.length){if("number"==typeof c&&(a(c),b.length=0,d&&d.length))for(e=0;e<d.length;e+=1)b.push(d[e]+"Key");return this}for(e=0;e<b.length;e+=1)f+=b[e].slice(0,-3)+"+";return f+a()}}function f(a){a=a||event;var b,e,f,g,h,i,j,k,l,s,t,w,x,y,z,A,B,C,D=a.currentTarget||a.srcElement,E=a.keyCode,F="character";if((!D.nodeName||"textarea"===D.nodeName.toLowerCase())&&(E===q||E===r||13===E&&u)){if(v=!1,f=D.value,k=D.scrollTop,"number"==typeof D.selectionStart)l=D.selectionStart,s=D.selectionEnd,t=f.slice(l,s);else{if(!o.selection)return;g=o.selection.createRange(),t=g.text,h=g.duplicate(),h.moveToElementText(D),h.setEndPoint("EndToEnd",g),s=h.text.length,l=s-t.length,n>1?(i=f.slice(0,l).split(m).length-1,j=t.split(m).length-1):i=j=0}if(E===q||E===r)if(b=p,e=b.length,y=0,z=0,A=0,l!==s&&-1!==t.indexOf("\n"))if(w=0===l||"\n"===f.charAt(l-1)?l:f.lastIndexOf("\n",l-1)+1,s===f.length||"\n"===f.charAt(s)?x=s:"\n"===f.charAt(s-1)?x=s-1:(x=f.indexOf("\n",s),-1===x&&(x=f.length)),c(E,a))y=1,D.value=f.slice(0,w)+b+f.slice(w,x).replace(/\n/g,function(){return y+=1,"\n"+b})+f.slice(x),g?(g.collapse(),g.moveEnd(F,s+y*e-j-i),g.moveStart(F,l+e-i),g.select()):(D.selectionStart=l+e,D.selectionEnd=s+y*e,D.scrollTop=k);else{if(!d(E,a))return;0===f.slice(w).indexOf(b)&&(w===l?t=t.slice(e):A=e,z=e),D.value=f.slice(0,w)+f.slice(w+A,l)+t.replace(new RegExp("\n"+b,"g"),function(){return y+=1,"\n"})+f.slice(s),g?(g.collapse(),g.moveEnd(F,s-z-y*e-j-i),g.moveStart(F,l-A-i),g.select()):(D.selectionStart=l-A,D.selectionEnd=s-z-y*e)}else if(c(E,a))g?(g.text=b,g.select()):(D.value=f.slice(0,l)+b+f.slice(s),D.selectionEnd=D.selectionStart=l+e,D.scrollTop=k);else{if(!d(E,a))return;0===f.slice(l-e).indexOf(b)&&(D.value=f.slice(0,l-e)+f.slice(l),g?(g.move(F,l-e-i),g.select()):(D.selectionEnd=D.selectionStart=l-e,D.scrollTop=k))}else if(u){if(0===l||"\n"===f.charAt(l-1))return void(v=!0);if(w=f.lastIndexOf("\n",l-1)+1,x=f.indexOf("\n",l),-1===x&&(x=f.length),B=f.slice(w,x).match(/^[ \t]*/)[0],C=B.length,w+C>l)return void(v=!0);g?(g.text="\n"+B,g.select()):(D.value=f.slice(0,l)+"\n"+B+f.slice(s),D.selectionEnd=D.selectionStart=l+n+C,D.scrollTop=k)}return a.preventDefault?void a.preventDefault():(a.returnValue=!1,!1)}}function g(a){a=a||event;var b=a.keyCode;if(c(b,a)||d(b,a)||13===b&&u&&!v){if(!a.preventDefault)return a.returnValue=!1,!1;a.preventDefault()}}function h(a,b){var c,d=x[a]||[],e=d.length;for(c=0;e>c;c+=1)d[c].apply(null,b)}function i(a){function b(b){for(c=0;f>c;c+=1)b(a[c].type,a[c].handler)}var c,d,e,f=a.length;return o.addEventListener?(d=function(a){b(function(b,c){a.removeEventListener(b,c,!1)})},e=function(a){d(a),b(function(b,c){a.addEventListener(b,c,!1)})}):o.attachEvent&&(d=function(a){b(function(b,c){a.detachEvent("on"+b,c)})},e=function(a){d(a),b(function(b,c){a.attachEvent("on"+b,c)})}),{add:e,remove:d}}function j(a){h("addListeners",[a]),l.add(a)}function k(a){h("removeListeners",[a]),l.remove(a)}var l,m,n,o=window.document,p=" ",q=9,r=9,s=[],t=["shiftKey"],u=!0,v=!1,w=o.createElement("textarea"),x={};l=i([{type:"keydown",handler:f},{type:"keypress",handler:g}]),w.value="\n",m=w.value,n=m.length,w=null,a.utils={executeExtensions:h,isValidModifierKeyCombo:b,createListeners:i,addListeners:j,removeListeners:k},a.handlers={keydown:f,keypress:g},a.addExtension=function(a,b){return a&&"string"==typeof a&&"function"==typeof b&&(x[a]||(x[a]=[]),x[a].push(b)),this},a.set=function(a,b){var c,d,e,f,g,i,l;if(a)for(c=arguments.length<2||b,d=a,e=d.length,"number"!=typeof e&&(d=[d],e=1),c?(f=j,g="true"):(f=k,g=""),i=0;e>i;i+=1)l=d[i],l&&l.nodeName&&"textarea"===l.nodeName.toLowerCase()&&(h("set",[l,c]),l.setAttribute("data-taboverride-enabled",g),f(l));return this},a.tabSize=function(a){var b;if(arguments.length){if(a&&"number"==typeof a&&a>0)for(p="",b=0;a>b;b+=1)p+=" ";else p="   ";return this}return"   "===p?0:p.length},a.autoIndent=function(a){return arguments.length?(u=a?!0:!1,this):u},a.tabKey=e(function(a){return arguments.length?void(q=a):q},s),a.untabKey=e(function(a){return arguments.length?void(r=a):r},t)});
/*! jquery.taboverride v4.0.0 | https://github.com/wjbryant/jquery.taboverride
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */
!function(a){"use strict";"object"==typeof exports&&"function"==typeof require?a(require("jquery"),require("taboverride")):"function"==typeof define&&define.amd?define(["jquery","taboverride"],a):a(jQuery,tabOverride)}(function(a,b){"use strict";function c(a,c){a.off({"keydown.tabOverride":b.handlers.keydown,"keypress.tabOverride":b.handlers.keypress},c)}function d(a,d){b.utils.executeExtensions("removeDelegatedListeners",[a,d]),c(a,d)}function e(a,d){b.utils.executeExtensions("addDelegatedListeners",[a,d]),c(a,d),a.on({"keydown.tabOverride":b.handlers.keydown,"keypress.tabOverride":b.handlers.keypress},d)}var f;f=a.fn.tabOverride=function(a,c){var f,g=!arguments.length||a,h="string"==typeof c;return h?(f=this,b.utils.executeExtensions("setDelegated",[f,c,a]),g?e(f,c):d(f,c)):b.set(this,g),this},f.utils={addDelegatedListeners:e,removeDelegatedListeners:d},f.tabSize=b.tabSize,f.autoIndent=b.autoIndent,f.tabKey=b.tabKey,f.untabKey=b.untabKey});
/*!
    Autosize 1.18.15
    license: MIT
    http://www.jacklmoore.com/autosize
*/
!function(e){var t,o={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],a=e(i).data("autosize",!0)[0];a.style.lineHeight="99px","99px"===e(a).css("lineHeight")&&n.push("lineHeight"),a.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),a.parentNode!==document.body&&e(document.body).append(a),this.each(function(){function o(){var t,o=window.getComputedStyle?window.getComputedStyle(u,null):!1;o?(t=u.getBoundingClientRect().width,(0===t||"number"!=typeof t)&&(t=parseFloat(o.width)),e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){t-=parseFloat(o[i])})):t=p.width(),a.style.width=Math.max(t,0)+"px"}function s(){var s={};if(t=u,a.className=i.className,a.id=i.id,d=parseFloat(p.css("maxHeight")),e.each(n,function(e,t){s[t]=p.css(t)}),e(a).css(s).attr("wrap",p.attr("wrap")),o(),window.chrome){var r=u.style.width;u.style.width="0px";{u.offsetWidth}u.style.width=r}}function r(){var e,n;t!==u?s():o(),a.value=!u.value&&i.placeholder?p.attr("placeholder")||"":u.value,a.value+=i.append||"",a.style.overflowY=u.style.overflowY,n=parseFloat(u.style.height),a.scrollTop=0,a.scrollTop=9e4,e=a.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",a.className=a.className,f&&i.callback.call(u,u),p.trigger("autosize.resized"))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width(),y=p.css("resize");p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseFloat(p.css("minHeight"))-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===y?p.css("resize","none"):"both"===y&&p.css("resize","horizontal"),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}}(jQuery||$);