// JavaScript Document
var start;
var tick=0;
var mytimer;
$(document).ready(ready1());
var xmlpicture;

function ready1()
{
	$("img").click(function(e) 
	{
		var x = e.offsetX;
        if(x < $("img").width()/2) {prepicture();}
		else { nextpicture();}
    });
	$("[name = 'myradio']").change(function() 
	{
		start = new Date;
		tick = 0;
	});
	timer();
}

function timer()
{
	start = new Date;
	mytimer=setInterval(function()
	{
		tick = new Date - start;
		if(tick >= 5000) 
		{
			console.log(tick);
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

function loadpicture(url)
{
	xmlpicture = null;
	if (window.XMLHttpRequest)
	{// code for IE7, Firefox, Opera, etc
	xmlpicture = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{// code for IE6, IE5
	xmlpicture = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlpicture != null)
	{
		xmlpicture.onreadystatechange = state_Change_picture;
		xmlpicture.open("GET",url,true);
		xmlpicture.send(null);
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
		if (xmlhttp.status == 200)
		{
			$('div').innerHTML = xmlhttp.responseText;
		}
		else
		{
			alert("Problem retrieving XML data:" + xmlhttp.statusText);
		}
	}
}

