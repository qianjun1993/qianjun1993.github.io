// JavaScript Document
var start;
var tick = 0;
var mytimer;
$(document).ready(myready());
var xmlhttp;
var mycommentpage = new Array(20);
var nowpage = 1;

function myready()
{
	console.log($("#mousetest"));
	$("#mousetest").mouseenter(function(){$("#m_comment").attr("style","right:0px");});
	console.log($("#m_comment"));
	$("#m_comment").mouseleave(function(){$("#m_comment").attr("style","right:-300px");});
	loadjson("/h4_json1.txt",1);
	$("[name = 'myradio']").change(function() 
	{
		start = new Date;
		tick = 0;
	});
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
}

function prepicture()
{
	if($("input:checked").prev('input').length == 0) {$("input:last")[0].checked = true;}
	else {$("input:checked").prev('input')[0].checked = true;}
	start = new Date;
	tick = 0	;
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
		else if(check == 2) {xmlhttp.onreadystatechange = state_Change_comment;}
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
	$("img").click(function(e) 
	{
		var x = e.offsetX;
        if(x < $("img").width()/2) {prepicture();}
		else { nextpicture();}
    });
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
	var commentJson = JSON.parse(xmlhttp.responseText);
	for(var i = 0 ; i < pictureJson.comment.length; i++)
	{
		var thiscomment= '<div id = "comments"><div class = "one_comment"><div class = "comment-left"><img src="'
		               + '" ><p class = "comment-info">' + '</p></div><div class = "comment-right"><p class = "comment-info">'
					   + '楼   2014年7月11日</p><p class="comment-text">' + '</p></div></div>';
		$('.commentbuttom').before(thiscomment);
	}
}

