

/*选项卡 start*/
var oLis=document.getElementById("lis");
var li=oLis.getElementsByTagName("li");/*获取现在的类名 在这个基础上 增加类名或者减少类名*/
var tabDiv=document.getElementsByClassName("tabDiv");
var greenBtm=document.getElementById("greenBtm");

for(var i=0;i<li.length;i++){
    curLi=li[i];
    curLi["index"]=i;
    curLi.onclick= function () {
        var left=parseFloat(window.getComputedStyle(greenBtm,null)["left"]);
        console.log(left);
        left==0?tools.animate(greenBtm,{left:150},300):tools.animate(greenBtm,{left:0},300);
        for(var j=0;j<tabDiv.length;j++){
         tools.removeClass(li[j],"active");
         tabDiv[j].style.display="none";
        }
        tools.addClass(li[this["index"]],"active") ;
        tabDiv[this["index"]].style.display="block";
    }
}


/*选项卡 end*/

/*验证码 start*/
var testCode=document.getElementById("testCode");
var unrobotA=document.getElementById("unrobotA");
var str='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
~function () {
    getRandom();
    function run(m,n){
        return Math.round(Math.random()*(m-n)+n)
    }
    unrobotA.onclick=getRandom;
        function getRandom() {
        var ary=[];
        for(var i=0;i<4;i++){
            var num=str[run(0,61)];
            ary.push(num)
        }
        var con=ary.join("");
        testCode.innerHTML=con
    }
}();
/*验证码 end*/
/*同意协议*/
var agreeBtn=document.getElementById("agreeBtn");
var agreeInp=document.getElementById("agreeInp");
agreeInp.onclick=show;
agreeBtn.onclick=show;
function show() {
    console.log(11);
    agreeBtn.style.backgroundPosition=agreeBtn.style.backgroundPosition==="-13px 3px"?"0px 3px":"-13px 3px"
};

var tools={
    hasClass: function (ele,name) {
        var reg=new RegExp('(?:^| +)'+name+'(?: +|$)');
        return reg.test(ele.className)
    },
    addClass: function (ele,className) {
        var ary=className.split("/\s+/");
        for(var i=0;i<ary.length;i++){
            if(!tools.hasClass(ele,ary[i])){
                ele.className+= " "+ary[i]
            }
        }
    },
    removeClass: function (ele,className) {
        if(tools.hasClass(ele,className)){
            ele.className=ele.className.replace(className,"")
        }
    },
    heyanEffect:function(t,b,c,d){
        return b+t/d*c
    },
    animate: function (ele, target, duration) {
        var begin={};
        var change={};
        for(var attr in target){
            begin[attr]=parseFloat(window.getComputedStyle(ele,null)[attr]);
            change[attr]=target[attr]-begin[attr];
        }
        var time=null;
        var interval=10;
        function move(){
            time+=interval;
            if(time>=duration){//时间达到最大了 让属性值变成目标值
                for(var key in change){
                    if(key=="opacity"){
                        ele.style[key]=target[key]
                    }else{
                        ele.style[key]=target[key]+"px";
                    }
                }
                clearInterval(timer);
                return;
            }else{
                for(var key in change){
                    var val=tools.heyanEffect(time,begin[key],change[key],duration);
                    if(key=="opacity"){
                        ele.style[key]=val
                    }else{
                        ele.style[key]=val+"px"
                    }
                }
            }
        }
        var timer=window.setInterval(move,interval)
    }
};






