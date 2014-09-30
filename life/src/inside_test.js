
module("sample test case");

test("initialise test",function(){
	var a = con.createNew();
	a.initialise();
	equal(a.getWidth(),50);
	equal(a.getHeight(),50);
	equal(a.getPoint(0,0),0);
});
//测试：初始化是否存在问题

test("test change length and width",function(){
	var a = con.createNew();
	a.initialise();
	a.changeLength(23,12);
	equal(a.getWidth(),23);
	equal(a.getHeight(),12);
});
//测试：调整长宽是否存在问题

test("test change point",function(){
	var a = con.createNew();
	a.initialise();
	a.changePoint(0,0);
	equal(a.getPoint(0,0),1);
});
//测试：改变某一个点的值是否存在问题

test("test push",function(){
	var a = con.createNew();
	a.changeLength(3,3);
	a.initialise();
	a.changePoint(1,0);
	a.changePoint(2,1);
	a.changePoint(0,2);
	a.pushNext();
	for(var i = 0; i < 3; i++){ 
		for(var j = 0; j < 3; j++){
			equal(a.getPoint(i,j),1);
		}
	}
	a.pushNext();
	for(var i = 0; i < 3; i++){ 
		for(var j = 0; j < 3; j++){
			equal(a.getPoint(i,j),0);
		}
	}
});
//测试：时间演算是否存在问题
