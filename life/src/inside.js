var con = {
	createNew : function()
	{
		var inside = {};
		var width = 50;
		//网格宽度
		var height = 50;
		//网格长度
		var map = new Array();
		//网格内黑白分布，1表示生，0表示死
		
		var rate= 0.1;
		//随机生成的细胞为生的概率
		
		inside.changeLength = function(num1, num2){
			width = num1;
			height = num2;
		};
		//功能：修改网格长宽，第一个参数是宽度，第二个参数是长度
		
		inside.changerate = function(num){
			if((num >= 0)&&(num <= 1)){rate = num;}
		};
		//功能：修改随机生成的细胞为生的概率
		
		inside.OneRandom = function(){
		    return  Math.random() < rate;
			
		};
		//功能：随机生成的细胞的状态
		
		inside.initialise = function(){
			for(var i = 0; i < width; i++){
				map[i] = new Array();
				for(var j = 0; j < height; j++){
					map[i][j] = 0;
				}
			}
		};
		//功能：初始化网格，默认全部修正为死亡
		
		inside.random = function(){
			for(var i = 0; i < width; i++){
				map[i] = new Array();
				for(var j = 0; j < height; j++){
					map[i][j] = this.OneRandom();
				}
			}
		};
		//功能：随机化网格，
		
		inside.changePoint = function(x, y){
			if(x >= 0 && x < width && y >= 0 && y < height){
				if(map[x][y]){
					map[x][y] = 0;
				}
				else{
					map[x][y] = 1;
				}
			}
		};
		//功能：反转指定坐标（x，y）对应点的生死
		
		inside.cellChange = function(x, y)
		{//输入xy坐标，返回下一时刻该位置细胞状态
			var xl = (x - 1 + width) % width;
			var xr = (x + 1) % width;
			var yl = (y - 1 + height) % height;
			var yr = (y + 1) % height;
			//count值代表该细胞周围的活细胞数
			var count = map[xl][yl] + map[xl][y] + map[xl][yr] + map[x][yl] + map[x][yr] + map[xr][yl] + map[xr][y] + map[xr][yr];
  			switch (count)
			{
			case 3: return 1;
			case 2: return  map[x][y];
			default: return 0;
			}
		};

		inside.pushNext = function()
		{
			var temp = new Array();
			for(var i = 0; i < width; i++)
			{
				temp[i] = new Array();
				for(var j = 0; j < height; j++)
				{
				temp[i][j]= this.cellChange(i,j);
				}
			}
			for(var i = 0; i < width; i++)
			{
				for(var j = 0; j < height; j++)
				{
					map[i][j] = temp[i][j];
				}
			}
		};
		//功能：按当前状态进行推进，根据既有规则，判定下一个时间点细胞的生死
		
		inside.getPoint = function(x,y){
			if(x >= 0 && x < width && y >= 0 && y < height){
				return map[x][y];
			}
		};
		//功能：获取指定点的细胞生死信息
		
		inside.getWidth = function(){
			return width;
		};
		//功能：获取当前网格的宽度
		
		inside.getHeight = function(){
			return height;
		};
		//功能：获取当前网格的高度
		
		return inside;
	}
};

