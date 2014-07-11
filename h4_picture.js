// JavaScript Document
//下面为计时器参数
var start;
var tick = 0;
var mytimer;

$(document).ready(myready);
//下面为页面信息存储
var xmlhttp;
var mycommentpage = new Array(3);
var nowpage = 1;

function myready()
{
	$("#mousetest").mouseenter(function()  //评论栏的出现函数
	{
		$("#m_comment").attr("style","right:0px");
		window.clearInterval(mytimer);
	});
	$("#m_comment").mouseenter(function()  
	{
		$("#m_comment").attr("style","right:-300px");
		window.clearInterval(mytimer);
	});
	$("#m_comment").mouseleave(function()  //评论栏的消失函数
	{
		$("#m_comment").attr("style","right:-300px");
		timer();
	});
	loadjson("/h4_json1.txt",1);             //图片获取
	$("[name = 'myradio']").change(function()    //点击小条切换函数
	{
		start = new Date;
		tick = 0;
		localStorage.currentpicture=$("input:checked").prevAll('input').length+1;
	});
	$('#imgleft').click(precomment);          
	$('#imgright').click(nextcomment);
}

function timer()    //计时器函数
{
	start = new Date;
	mytimer=setInterval(function()
	{
		tick = new Date - start;
		if(tick >= 4800) 
		{
			tick = 0;
			timer();
			start = new Date;
			nextpicture();
		}
	},500)
}

function nextpicture()   //下一张图片
{
	if($("input:checked").next('input').length == 0) {$("input:first")[0].checked = true;}
	else {$("input:checked").next('input')[0].checked = true;}
	start = new Date;	
	tick = 0;
	localStorage.currentpicture=$("input:checked").prevAll('input').length+1;//本地存储
}

function prepicture()  //上一张图片
{
	if($("input:checked").prev('input').length == 0) {$("input:last")[0].checked = true;}
	else {$("input:checked").prev('input')[0].checked = true;}
	start = new Date;
	tick = 0	;
	localStorage.currentpicture=$("input:checked").prevAll('input').length+1;
}

function loadjson(url,check)  //发送请求函数
{
	xmlhttp = null;
	if (window.XMLHttpRequest)
	{// code for IE7, Firefox, Opera, etc
	xmlhttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null)
	{
		if(check == 1) {xmlhttp.onreadystatechange = state_Change_picture;}   //获取图片
		else if(check == 2) { xmlhttp . onreadystatechange = state_Change_comment;}   //获取评论
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);
	}
	else
	{
		alert("Your browser does not support XMLHTTP.");
	}
}

function state_Change_picture()   //获取图片
{
	if (xmlhttp.readyState == 4)
	{
		if (xmlhttp.status == 200) { showpicture();}
		else
		{ alert("Problem retrieving XML data:" + xmlhttp.statusText); }
	}
}

function showpicture()    //显示图片
{
	var pictureJson = JSON.parse(xmlhttp.responseText);
	for(var i = 0 ; i < pictureJson.picture.length; i++)
	{
		var thispicture = '<div class = "one_picture"><div class = "picture_info"><a href = "'
		               + pictureJson.picture[i].link + '">' + pictureJson.picture[i].title	 
					   +'</a></div><img src="' + pictureJson.picture[i].address +'"  ></div>';
		$('#pictures').append(thispicture);
	}
	$('#pictures').find("img").click(function(e)   //图片点击切换
	{
		var x = e.offsetX;
        if(x < $("img").width()/2) {prepicture();}
		else { nextpicture();}
    });
	$('#pictures').find(".picture_info").mouseenter(function(){     //图片信息的悬停
		$('#pictures').find(".picture_info").attr('style','opacity:.9;');
		window.clearInterval(mytimer);
	})
	$('#pictures').find(".picture_info").mouseleave(function(){
		$('#pictures').find(".picture_info").attr('style','opacity:.3;');
		timer();
	})
	if(localStorage.currentpicture) {$("input")[localStorage.currentpicture-1].checked = true;}  //获取本地信息并加载评论
	if(!localStorage.currentcomment) {loadjson('/h4_json2/page1.txt',2);}  
	else 
	{
		loadjson('/h4_json2/page'+localStorage.currentcomment+'.txt',2);
		nowpage = localStorage.currentcomment;
		$('.commentbuttomtext').text(nowpage + '/3'); 
	}
	timer();
}

function state_Change_comment()  //获取评论
{
	if (xmlhttp.readyState == 4)
	{
		if (xmlhttp.status == 200) {showcomment();}
		else {alert("Problem retrieving XML data:" + xmlhttp.statusText);}
	}
}

function showcomment()   // 显示评论
{
	$('#comments').empty();
	var commentJson = JSON.parse(xmlhttp.responseText);
	for(var i = 0 ; i < commentJson.comment.length; i++)
	{
		var thetime=commentJson.comment[i].time.slice(0,4)+'年'+commentJson.comment[i].time.slice(5,7)+'月'
		           +commentJson.comment[i].time.slice(8,10)+'日';
		var thiscomment= '<div class = "one_comment"><div class = "comment-left"><img src="'
		               + commentJson.comment[i].headportrait +'" ><p class = "comment-name">' 
					   + commentJson.comment[i].name + '</p></div><div class = "comment-right"><p class = "comment-info">'
					   + commentJson.comment[i].floor + '楼    ' + thetime+'</p><p class="comment-text">' 
					   + commentJson.comment[i].comment + '</p></div>';
		$('#comments').append(thiscomment);
	}
}

function precomment()  //评论上一页
{
	if(nowpage > 1)
	{
		nowpage--;
		if(!mycommentpage[nowpage - 1]) {loadjson('/h4_json2/page'+nowpage+'.txt',2);} //异步刷新
		$('.commentbuttomtext').text(nowpage + '/3');
		localStorage.currentcomment=nowpage;
	}
}

function nextcomment() //评论下一页
{
	if(nowpage < 3)
	{
		nowpage++;
		if(!mycommentpage[nowpage - 1]) {loadjson('/h4_json2/page'+nowpage+'.txt',2);}
		$('.commentbuttomtext').text(nowpage + '/3');
		localStorage.currentcomment=nowpage;
	}
}

