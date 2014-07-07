 //以下是作业时间的比较函数
function dateget(a)
{
	var date=Number(a.slice(0,4)+a.slice(5,7)+ a.slice(8,10));
	return date;
}

function timeget(a)
{
	var time=Number(a.slice(11,13)+a.slice(14,16)+ a.slice(17,18));
	return time;
}

function timecompare(a,b)
{
	var adate=dateget(a);
	var bdate=dateget(b);
	if(adate>bdate) return 1;
	else if(adate<bdate) return -1;
	else 
	{
		var atime=timeget(a);
		var btime=timeget(b);
		if(atime>btime) return 1;
		else if(atime<btime) return -1;
		else  return 0;
	}
}

function nowtimecompare(a)
{
	var adate=dateget(a);
	var myDate=new Date();
	var nowdate=myDate.getFullYear()*10000+(myDate.getMonth()+1)*100+myDate.getDate()-1;      
	if(adate>nowdate) return 1;
	else return -1;
}

//这是数组内部的排序函数
function my_TableSort(my_table,my_argument)
{
    if(my_argument==4||my_argument==5)
	{
	    var flag;
	    for(var i=0;i<my_table.length-1;i++)
		{
		    for(var j=0;j<my_table.length-1-i;j++)
			{
			    if(timecompare(my_table[j].find('td:eq('+my_argument+')').text(),
				             my_table[j+1].find('td:eq('+my_argument+')').text())==1)
				{
				    flag=my_table[j];
					my_table[j]=my_table[j+1];
					my_table[j+1]=flag;
				}
			}
		}
	}
}

var a=$('#homeworklist');
var homework1=[];//尚未提交的未过deadline的作业
var homework2=[];//已经提交的未过deadline的作业
var homework3=[];//已经批改的作业
var homework4=[];//已经提交的已过deadline的作业
var homework5=[];//尚未提交的已过deadline的作业
var myclick1=0;
var myclick2=0;

//这是我主函数
(function ()
{	
	//以下是作业的分类
	a.find('tr').each(function()
	{
		var my_s=$(this).find('td:eq(2)').text();
		var my_time=$(this).find("td:eq(5)").text();
		if(my_s=='已改批改')   {homework3.push($(this));}
		else if(my_s=='尚未提交')
		{
			if(nowtimecompare(my_time)==1) {homework1.push($(this));}
			else {homework5.push($(this));}
		}
		else 
		{ 
			if(nowtimecompare(my_time)==1) {homework2.push($(this));}
			else {homework4.push($(this));}
		}
	});
	
	my_TableSort(homework1,5);
	my_TableSort(homework2,5);
	my_TableSort(homework3,5);
	my_TableSort(homework4,5);
	my_TableSort(homework5,5);
	commonSort();
	$('div.hw-table-title').find('td:eq(4)').click(function(){timeSort(4);});
	$('div.hw-table-title').find('td:eq(4)').attr('style','cursor:pointer');
	$('div.hw-table-title').find('td:eq(5)').click(function(){timeSort(5);});
	$('div.hw-table-title').find('td:eq(5)').attr('style','cursor:pointer');
	$('div.hw-table-title').find('td:eq(2)').click(function(){commonSort();});
	$('div.hw-table-title').find('td:eq(2)').attr('style','cursor:pointer');
})()

//作业的默认排序函数
function commonSort()
{
    var my_count;
	var my_allcount=1;
	for(my_count=0;my_count<homework1.length;my_count++)
	{ 
	    var my_tr=homework1[my_count];
		a.append(my_tr);
		my_tr.removeClass("gray-bg");
		if(my_allcount%2==0) {my_tr.addClass("gray-bg");}
		my_tr.find('td:eq(0)').text(my_allcount);
		my_tr.find('div:eq(1)').attr('style','color:red');
		my_tr.find('td:eq(5)').attr('style','color:red');
		my_tr.find('a:eq(3)').attr('style','color:gray');
		my_allcount++;
	}
	for(my_count=0;my_count<homework2.length;my_count++)
	{
	    var my_tr=homework2[my_count];
		a.append(my_tr);
		my_tr.removeClass("gray-bg");
		if(my_allcount%2==0) {my_tr.addClass("gray-bg");}
		my_tr.find('td:eq(0)').text(my_allcount);
		my_tr.find('a:eq(3)').attr('style','color:gray');
		my_tr.find('td:eq(5)').attr('style','color:red');
		my_allcount++;
	}
	for(my_count=0;my_count<homework3.length;my_count++)
	{
		var my_tr=homework3[homework3.length-1-my_count];
		a.append(my_tr);
		my_tr.removeClass("gray-bg");
		if(my_allcount%2==0) {my_tr.addClass("gray-bg");}
		my_tr.find('td:eq(0)').text(my_allcount);
		my_allcount++;
	}
	for(my_count=0;my_count<homework4.length;my_count++)
	{
		var my_tr=homework4[homework4.length-1-my_count];
		a.append(my_tr);
		my_tr.removeClass("gray-bg");
		if(my_allcount%2==0) {my_tr.addClass("gray-bg");}
		my_tr.find('td:eq(0)').text(my_allcount);
		my_tr.find('a:eq(3)').attr('style','color:gray');
		my_allcount++;
	}
	for(my_count=0;my_count<homework5.length;my_count++)
	{
	    var my_tr=homework5[homework5.length-1-my_count];
		a.append(my_tr);
		my_tr.removeClass("gray-bg");
		if(my_allcount%2==0) {my_tr.addClass("gray-bg");}
		my_tr.find('td:eq(0)').text(my_allcount);
		my_tr.find('a:eq(3)').attr('style','color:gray');
		my_allcount++;
	}
}

//作业的按时间排序
function timeSort(my_set)
{
    var homework0=[];
	if(my_set==3) {myclick1=(myclick1+1)%2;}
    else if(my_set==4) 	{myclick2=(myclick2+1)%2;}
	a.find('tr').each(function()
	{
	    $(this).removeClass("gray-bg");
		homework0.push($(this))
	})
	my_TableSort(homework0,my_set);
	var my_count=0;
	for(my_count=0;my_count<homework0.length;my_count++)
	{ 
	    var my_tr=homework0[my_count];;
		if((my_set==3&&myclick1%2==1)||((my_set==4&&myclick2%2==1))){my_tr=homework0[homework0.length-1-my_count];} 
		a.append(my_tr);
		if((my_count+1)%2==0) {my_tr.addClass("gray-bg");}
		my_tr.find('td:eq(0)').text(my_count+1);
	}
}