var leftOuter=document.getElementById("leftOuter");
var left=document.getElementById("left");
var leftLis=leftOuter.getElementsByClassName("leftLis");
var leftLiDivs=left.getElementsByClassName("short");

var detailOne=document.getElementById("detailOne");
var details=left.getElementsByClassName("detail");

var detailTwo=document.getElementById("detailTwo");

///左侧鼠标事件 遍历所有的li 经过某一个Li的时候 让里面的div 显示出来
    ~function () {
        for(var i=0;i<leftLis.length;i++){
            var curLi=leftLis[i];
            curLi["index"]=i;
            curLi.onmouseenter= function (e) {//如果鼠标滑过当前这个元素的话 让这个元素的最后一个孩子显示出来
                if(this.index==0){

                    this.lastElementChild.style.display="block";
                    this.lastElementChild.style.top=0;
                }else{
                    this.lastElementChild.style.display="block";
                    this.lastElementChild.style.top=-(this.lastElementChild.offsetHeight-this.offsetHeight)/2+"px";
                }
                leftLiDivs[this.index].className="bingo short";
            };
            curLi.onmouseleave= function (e) {
                //console.log(111);
                for(var i=0;i<leftLis.length;i++){
                    leftLiDivs[this.index].className="short"
                }
                //console.log( this.lastElementChild);
                this.lastElementChild.style.display="none "//在IE中出现问题，显示的内容不能隐藏掉
            }
        }
    }();
     

  function par(ele){
      var arr=[];
      arr.push(ele);
      var p=ele.parentNode;
      while(p){
          arr.push(p);
          p= p.parentNode;
      }
      return arr
  }

   function children(ele){//获取所有的孩子
       var arr=[];
       for(var i=0;i<ele.childNodes.length;i++){
           var curchildNod=ele.childNodes[i]
           if(curchildNod.nodeType==1){
               arr.push(curchildNod)
           }
       }
       return arr;
   }


//////页面中心两个选项卡实现
var oJobtab=document.getElementById("jobTab");
var jobTabLi=oJobtab.getElementsByTagName("li");
var tabDetail=document.getElementById("tabDetail");
var tabDiv=tabDetail.getElementsByClassName("posTab");
~function () {
    for(var i=0;i<jobTabLi.length;i++){//给每一个li绑定一个点击事件
        var curLi=jobTabLi[i];
        curLi.index=i;
        curLi.onclick= function () {
            for(var j=0;j<jobTabLi.length;j++){
                jobTabLi[j].className="";}
            this.className="current";
            for(var k=0;k<jobTabLi.length;k++){
                tabDiv[k].style.display="none"
                console.log(111);
            }
            tabDiv[this.index].style.display="block"
        }

    }
}();


var logoinBar=document.getElementById("logoinBar");
var footer=document.getElementById("footer")
/*console.log(document.body.scrollHeight);
console.log(document.body.scrollTop);
console.log(footer.offsetHeight);*/
//////////////回到顶部 底部横条
var goTopIcon=document.getElementById("goTopIcon");

/*function offsetT(ele){
    var t=ele.offsetTop;
    var p=ele.parentNode;
    while(p){
        t+= p.offsetTop;
        p= p.parentNode;
    }
    return t
}
console.log(footer.offsetTop);*/

~function () {
    window.onscroll= function () {
        var bodyScrTop=document.documentElement.scrollTop||document.body.scrollTop;
        var bodyCliHeight=document.documentElement.clientHeight||document.body.clientHeight;
        if(footer.offsetTop-bodyCliHeight-bodyScrTop<=0){//当下面的盒子出现时，下面的盒子出现了多少像素 他的底部定位就是多少像素；
            logoinBar.style.bottom=bodyCliHeight+bodyScrTop-footer.offsetTop+"px";
               // 68+"px";
        }else{//当下面的盒子消失
            logoinBar.style.bottom=0
        }
        if(bodyScrTop<=0){
            goTopIcon.style.display="none";
        }
        goTopIcon.style.display="block";
    };
    goTopIcon.onclick= function () {
        var distance=document.documentElement.scrollTop||document.body.scrollTop;
        var interval=10;
        var time=600;
        var step=distance/time*interval;

        console.log(step);
        function top(){
            if(distance<=0){
                goTopIcon.style.display="none";
                clearInterval(goToptimer);
                return;
            }
            distance-=step;
            document.documentElement.scrollTop=distance;
            document.body.scrollTop=distance;
        }
        var goToptimer=window.setInterval(top,interval);
    };
}();

////////轮播图效果；

var bannerBig=document.getElementById("bannerBig");
var bannerBigLis=bannerBig.getElementsByTagName("li");
var bannerSmall=document.getElementById("bannerSmall");
var oEm=bannerSmall.getElementsByTagName("em")[0];
var bannerSmallLis=bannerSmall.getElementsByTagName("li");//获取右边盒子的三个li
var bannerI=bannerSmall.getElementsByTagName("i");
console.log(bannerI);
/*for(var i=0;i<bannerBigLis.length;i++){
    var curbannerBigLi=bannerBigLis[i];
    step刚开始的时候是0 第一张图片，然后是1 第二张图片 然后是2 显示第三张图片
    遍历右面盒子里的li,当上面的滑块走到自己身上时，就把

}*/
 var step=0;
function aotumove(){
    step++;
    if(step==3){
        step=0;
        animate(bannerBig,{marginTop:-160*step},500);
        animate(oEm,{top:55*step},500);

    }else{
        animate(bannerBig,{marginTop:-160*step},700);
        animate(oEm,{top:55*step},700);
    };
    Uncover()
};
function Uncover(){
    for(var j=0;j<bannerSmallLis.length;j++){///所有的定时器都是异步的，也就是虽然先执行animate(oEm,{top:55*step},500)这个函数，但是函数里有定时器，就先等着，执行完主任务队列里的代码，在返回头执行定时器里的；所以第一次进来时 虽然动画的代码在上面，但并没有立即执行动画，因为动画里有定时器，执行主任务队列 所以先获取的top值就是0,
        var oEmTop= parseFloat(oEm.style.top);
        bannerSmallLis[j].className="";
        if(oEmTop<55){
            bannerSmallLis[1].className="currentImg";
        }else if(oEmTop>=110){
            bannerSmallLis[0].className="currentImg";
        }else{
            bannerSmallLis[2].className="currentImg";
        }
    }
}
var aotumovetimer=window.setInterval(aotumove,2000);

bannerBig.onmousemove= function () {
    clearInterval(aotumovetimer)
};
bannerBig.onmouseout= function () {
    aotumovetimer=window.setInterval(aotumove,2000);
};

bannerSmall.onmouseover= function (e) {
    clearInterval(aotumovetimer);
    e=e||window.event;
    e.target= e.target|| e.srcElement;
    console.log(e.target);
    for(var i=0;i<bannerI.length;i++){
        var curLi=bannerI[i];
        curLi.index=i;
        if(e.target==curLi){
            animate(bannerBig,{marginTop:-160*curLi.index},100);
            animate(oEm,{top:55*curLi.index},100);
            Uncover()
        }
    }

};
bannerSmall.onmouseout= function () {
    aotumovetimer=window.setInterval(aotumove,2000);
};

//////////footer里的名片和微博
var oApp=document.getElementById("APP");
var oWeibo=document.getElementById("weibo");

oApp.onmouseenter= function () {
    var appImg=this.lastElementChild;
    animate(appImg,{opacity:1},600);
    appImg.style.display="block"
};
oApp.onmouseleave= function () {
    this.lastElementChild.style.opacity=0;///为什么并不能把透明度改成0；可以让一个隐藏的盒子的透明度变成0么？
    this.lastElementChild.style.display="none";
};
oWeibo.onmouseover= function () {
    var weiboImg=this.lastElementChild;
    console.log(weiboImg);
    animate(weiboImg,{opacity:1},600);
    weiboImg.style.display="block"
};
oWeibo.onmouseout= function () {
    this.lastElementChild.style.opacity=0;
    this.lastElementChild.style.display="none";
};
/////动画库 只能是页面中的某一个元素可以用动画库的代码，如果是回到顶部，此类改变的值是body的某属性，不能用这个动画；
var heyanEffect={
    linear: function (t,b,c,d) {
        return b+t/d*c;
    }
};
function animate(ele,target,duration){
     var begin={};
     var change={};
    for(var attr in target){

        begin[attr]=parseFloat(window.getComputedStyle(ele,null)[attr]);
        //console.log(window.getComputedStyle(ele,null)[attr]);
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
            clearInterval(ele.timer);
            return;
        }else{
            for(var key in change){
                var val=heyanEffect.linear(time,begin[key],change[key],duration);
                if(key=="opacity"){
                    ele.style[key]=val
                }else{
                    ele.style[key]=val+"px"
                }
            }
        }
    }
    ele.timer=window.setInterval(move,interval)
}


/////遮罩层的效果 老师写的
~function ($) {
    //direction:计算进入或者离开的方向
    function direction(pageX, pageY) {
        var $o = $(this).offset(),
            $w = $(this).outerWidth(),
            $h = $(this).outerHeight();

        //->计算鼠标指针位于当前元素“比例空间”中的坐标位置:“比例空间”->以元素中心为坐标原点,以元素左边位置为X轴的-1,以元素右边位置为X轴的1,以元素顶部位置为Y轴的-1,以元素底部位置为Y轴的1,的直角坐标空间
        var $x = (pageX - $o.left - ($w / 2)) * ($w > $h ? ($h / $w) : 1);
        var $y = (pageY - $o.top - ($h / 2)) * ($h > $w ? ($w / $h) : 1);

        //->计算鼠标指针位于当前元素“比例空间”中的方位:0、1、2、3 => 上、右、下、左
        //->Math.PI:圆周率π
        //->Math.atan2($y, $x):返回-PI到PI之间的值,是从X轴正向逆时针旋转到点($y,$x)时经过的角度
        return Math.round((((Math.atan2($y, $x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    }

    //->根据方向实现对应的动画操作
    function mouseAnimate(interval) {
        interval = interval || 200;
        $(this).on("mouseenter mouseleave", function (e) {
            var $mark = $(this).children(".mark"), $posL = 0, $posT = 0, $tarL = 0, $tarT = 0, $dir = direction.call(this, e.pageX, e.pageY);
            if (e.type === "mouseenter") {
                $dir === 0 ? $posT = "-100%" : null;
                $dir === 1 ? $posL = "100%" : null;
                $dir === 2 ? $posT = "100%" : null;
                $dir === 3 ? $posL = "-100%" : null;
                $mark.css({top: $posT, left: $posL, display: "block"}).stop().animate({
                    top: $tarT,
                    left: $tarL
                }, interval);
                return;
            }
            $dir === 0 ? $tarT = "-100%" : null;
            $dir === 1 ? $tarL = "100%" : null;
            $dir === 2 ? $tarT = "100%" : null;
            $dir === 3 ? $tarL = "-100%" : null;
            $mark.stop().animate({top: $tarT, left: $tarL}, interval, function () {
                $mark.css({
                    display: "none"
                });
            });
        });
    }

    $.fn.extend({mouseAnimate: mouseAnimate});
}(jQuery);

$(".bannerBtm li").mouseAnimate(300);











