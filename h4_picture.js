// JavaScript Document
var start;
var tick = 0;
var mytimer;
$(document).ready(myready);
var xmlhttp;
var mycommentpage = new Array(20);
var nowpage = 1;

function myready()
{
	$("#mousetest").mouseenter(function()
	{
		$("#m_comment").attr("style","right:0px");
		window.clearInterval(mytimer) ;
	});
	$("#m_comment").mouseleave(function()
	{
		$("#m_comment").attr("style","right:-300px");
		timer();
	});
	loadjson("/h4_json1.txt",1);
	$("[name = 'myradio']").change(function() 
	{
		start = new Date;
		tick = 0;
	});
	$('#imgleft').click(precomment);
	$('#imgright').click(nextcomment);
}

function timer()
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

function nextpicture()
{
	if($("input:checked").next('input').length == 0) {$("input:first")[0].checked = true;}
	else {$("input:checked").next('input')[0].checked = true;}
	start = new Date;	
	tick = 0;
	localStorage.currentpicture=$("input:checked").prevAll('input').length+1;
}

function prepicture()
{
	if($("input:checked").prev('input').length == 0) {$("input:last")[0].checked = true;}
	else {$("input:checked").prev('input')[0].checked = true;}
	start = new Date;
	tick = 0	;
	localStorage.currentpicture=$("input:checked").prevAll('input').length+1;
}

function loadjson(url,check)
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
		if(check == 1) {xmlhttp.onreadystatechange = state_Change_picture;}
		else if(check == 2) { xmlhttp . onreadystatechange = state_Change_comment;}
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);
	}
	else
	{
		alert("Your browser does not support XMLHTTP.");
	}
}

function state_Change_picture()
{
	if (xmlhttp.readyState == 4)
	{
		if (xmlhttp.status == 200) { showpicture();}
		else
		{ alert("Problem retrieving XML data:" + xmlhttp.statusText); }
	}
}

function showpicture()
{
	var pictureJson = JSON.parse(xmlhttp.responseText);
	for(var i = 0 ; i < pictureJson.picture.length; i++)
	{
		var thispicture = '<div class = "one_picture"><div class = "picture_info"><a href = "'
		               + pictureJson.picture[i].link + '">' + pictureJson.picture[i].title	 
					   +'</a></div><img src="' + pictureJson.picture[i].address +'"  ></div>';
		$('#pictures').append(thispicture);
	}
	$('#pictures').find("img").click(function(e) 
	{
		var x = e.offsetX;
        if(x < $("img").width()/2) {prepicture();}
		else { nextpicture();}
    });
	$('#pictures').find(".picture_info").mouseenter(function(){
		$('#pictures').find(".picture_info").attr('style','opacity:1;');
		window.clearInterval(mytimer);
	})
	$('#pictures').find(".picture_info").mouseleave(function(){
		$('#pictures').find(".picture_info").attr('style','opacity:.3;');
		timer();
	})
	if(localStorage.currentcomment) {$("input")[localStorage.currentcomment-1].checked = true;}
	if(!localStorage.currentcomment) {loadjson('/h4_json2/page1.txt',2);}
	else 
	{
		loadjson('/h4_json2/page'+localStorage.currentcomment+'.txt',2);
		nowpage = localStorage.currentcomment;
		$('.commentbuttomtext').text(nowpage + '/20'); 
	}
	timer();
}

function state_Change_comment()
{
	if (xmlhttp.readyState == 4)
	{
		if (xmlhttp.status == 200) {showcomment();}
		else {alert("Problem retrieving XML data:" + xmlhttp.statusText);}
	}
}

function showcomment()
{
	$('#comments').empty();
	var commentJson = JSON.parse(xmlhttp.responseText);
	for(var i = 0 ; i < commentJson.comment.length; i++)
	{
		var thetime=commentJson.comment[i].time.slice(0,4)+'年'+commentJson.comment[i].time.slice(5,7)+'月'+commentJson.comment[i].time.slice(8,10)+'日';
		var thiscomment= '<div class = "one_comment"><div class = "comment-left"><img src="'
		               + commentJson.comment[i].headportrait +'" ><p class = "comment-name">' 
					   + commentJson.comment[i].name + '</p></div><div class = "comment-right"><p class = "comment-info">'
					   + commentJson.comment[i].floor + '楼    ' + thetime+'</p><p class="comment-text">' 
					   + commentJson.comment[i].comment + '</p></div>';
		$('#comments').append(thiscomment);
	}
}

function precomment()
{
	if(nowpage > 1)
	{
		nowpage--;
		if(!mycommentpage[nowpage - 1]) {loadjson('/h4_json2/page'+nowpage+'.txt',2);}
		$('.commentbuttomtext').text(nowpage + '/20');
		localStorage.currentcomment=nowpage;
	}
}

function nextcomment()
{
	if(nowpage < 20)
	{
		nowpage++;
		if(!mycommentpage[nowpage - 1]) {loadjson('/h4_json2/page'+nowpage+'.txt',2);}
		$('.commentbuttomtext').text(nowpage + '/20');
		localStorage.currentcomment=nowpage;
	}
}

