var HTMLGame = 
{
	/*初始化*/
    init: function() 
	{
        this.canvas = $("#myCanvas");
        this.context = this.canvas[0].getContext('2d');
		this.size = [200,200];
        this.canvas[0].width = this.size[0];
        this.canvas[0].height = this.size[1];
        this.fps = 30;
		this.lifeNumber = 0;
		this.map = con.createNew();
		this.map.changeLength(this.size[0],this.size[1])
		this.map.random();
		this.width = this.map.getWidth();
		this.height = this.map.getHeight();
		this.start=0;
		
    },
	
	/*绘制细胞*/
	drawCell:function()
	{
		this.lifeNumber = 0;
		for (var i=0;i<this.width;i++)
		{	
			for (var j=0;j<this.height;j++)
			{	
				if(this.map.getPoint(i,j))
				{
					this.context.fillStyle = "#000000";
					this.lifeNumber ++;
				}
				else
				{
					this.context.fillStyle = "#FFFFFF";
				}
				this.context.fillRect(i,j,1,1);
			}
		}
	},
	
	/*更新数据*/
	upgradeData:function()
	{
		$('#GameData').find('td:eq(3)').text('当前存活细胞数：' +this.lifeNumber );
	},
	
	/*启动时钟*/
	clockStart:function()
	{
		this.timer=setInterval(function() 
		{
			HTMLGame.drawCell();
			HTMLGame.map.pushNext();
			HTMLGame.upgradeData();
		}, 1000/this.fps);
	},
	
	/*显示数据*/
	showData:function()
	{
	    $('#GameData').find('td:eq(0)').text('横向细胞数：' + this.width );
		$('#GameData').find('td:eq(1)').text('纵向细胞数：' + this.height);
		$('#GameData').find('td:eq(2)').text('FPS速率：' + this.fps );
		$('#GameData').find('td:eq(3)').text('当前存活细胞数：' +this.lifeNumber );
	},
	
	/*重置*/
	refresh:function()
	{
		if(parseInt($("input[name='row']")[0].value)>500)
		{
			alert("横向细胞数不能超过500");
			return;
		}
		if(parseInt($("input[name='row']")[0].value)<20)
		{
			alert("横向细胞数不能少于20");
			return;
		}
		if(parseInt($("input[name='line']")[0].value)>500)
		{
			alert("纵向细胞数不能超过500");
			return;
		}
		if(parseInt($("input[name='line']")[0].value)<20)
		{
			alert("纵向细胞数不能少于20");
			return;
		}
		if(parseInt($("input[name='fps']")[0].value)>100)
		{
			alert("帧数不能超过100");
			return;
		}
		if(parseInt($("input[name='fps']")[0].value)<1)
		{
			alert("帧数不能小于1");
			return;
		}
		if(parseFloat($("input[name='rate']")[0].value)>1)
		{
			alert("初始细胞存活率不能超过1");
			return;
		}
		if(parseFloat($("input[name='rate']")[0].value)<0)
		{
			alert("初始细胞存活率不能小于0");
			return;
		}
		HTMLGame.map.changeLength(parseInt($("input[name='row']")[0].value),parseInt($("input[name='line']")[0].value));
		HTMLGame.fps = parseInt($("input[name='fps']")[0].value);
		HTMLGame.map.changerate(parseFloat($("input[name='rate']")[0].value));
		HTMLGame.canvas[0].width = parseInt($("input[name='row']")[0].value);
        HTMLGame.canvas[0].height = parseInt($("input[name='line']")[0].value);
		HTMLGame.width = HTMLGame.map.getWidth();
		HTMLGame.height = HTMLGame.map.getHeight();
		HTMLGame.map.random();
		HTMLGame.drawCell();
		HTMLGame.showData();
		if(HTMLGame.start==1)
		{
			clearInterval(HTMLGame.timer);
			HTMLGame.start = 0;
			$("#switch").css("backgroundImage","url(1.png)");
		}
	},
	
	/*暂停或启动*/
	restart:function()
	{
		if(HTMLGame.start == 0)
		{
			HTMLGame.start = 1;
			$("#switch").css("backgroundImage","url(2.png)");
			HTMLGame.clockStart();
		}
		else{
		clearInterval(HTMLGame.timer);
		$("#switch").css("backgroundImage","url(1.png)");
		HTMLGame.start = 0;
		}
	}			
};

HTMLGame.init();
$("#switch").click(HTMLGame.restart);
$("#refresh").click(HTMLGame.refresh);
HTMLGame.drawCell();
HTMLGame.showData();
