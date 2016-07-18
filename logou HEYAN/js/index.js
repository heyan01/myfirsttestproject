/*DOM utils start*/
var DOM=(function () {
    var flag='getComputedStyle' in window;
    function listToArray(likeArray){
        var arr = [];
        try{
            arr= Array.prototype.slice.call(likeArray);
        }catch (e){
            for(var i =0; i<likeArray.length;i++){
                arr.push(likeArray[i]);
            }
        }
        return arr;
    }
    return {
        listToArray:listToArray,
        par:function par(ele){
            var arr=[];
            arr.push(ele);
            var p=ele.parentNode;
            while(p){
                arr.push(p);
                p= p.parentNode;
            }
            return arr
        },
        children:function children(ele){
            var arr=[];
            for(var i=0;i<ele.childNodes.length;i++){
                var curchildNod=ele.childNodes[i]
                if(curchildNod.nodeType==1){
                    arr.push(curchildNod)
                }
            }
            return arr;
        },
        getLastElement:function getLastElement(ele){
            if(flag){
                return ele.lastElementChild;
            }else{
                var arr=children(ele);
                return arr[arr.length-1]
            }
        },
        getStyle:function getStyle(ele,attr){
            if(flag){
                return window.getComputedStyle(ele,null)[attr]
            }else{
                return ele.currentStyle(attr);
            }
        },
        getElementsByClass:function getElementsByClassName(className,context){
            var context = context||document;
            if(flag){
                return this.listToArray(context.getElementsByClassName(className));
            }
            var allTag = context.getElementsByTagName("*");
            var classList = className.replace(/^ +| +$/g,"").split(/\s+/);
            var arr = [];
            for(var i=0;i<allTag.length;i++){
                var cur = allTag[i];
                var f = true;
                for(var j = 0; j<classList.length;j++){
                    var curClassName = classList[j];
                    var reg = new RegExp("(?:^| +)"+curClassName+"(?: +|$)");
                    if(!reg.test(cur.className)){
                        flag = false;
                        break;
                    }
                }
                if(f){
                    arr.push(cur);
                }
            }
            return arr;

        }
    }
})();
/*DOM utils end*/
var leftOuter=document.getElementById("leftOuter");
var left=document.getElementById("left");
//var leftLis=leftOuter.getElementsByClassName("leftLis");
var leftLis=DOM.getElementsByClass("leftLis",leftOuter);
//var leftLiDivs=left.getElementsByClassName("short");
var leftLiDivs=DOM.getElementsByClass("short");
var detailOne=document.getElementById("detailOne");
//var details=left.getElementsByClassName("detail");
//var leftLiDivs=DOM.getElementsByClass("detail",left);
var detailTwo=document.getElementById("detailTwo");

/*left show detail start*/
    ~function () {
        for(var i=0;i<leftLis.length;i++){
            var curLi=leftLis[i];
            curLi["index"]=i;
            curLi.onmouseenter= function (e) {
                var curDetail=DOM.getLastElement(this);
                if(this.index==0){
                    curDetail.style.display="block";
                    curDetail.style.top=0;
                    console.log(curDetail.style.top);
                }else{
                    curDetail.style.display="block";
                    //console.log(curDetail.offsetHeight, this.offsetHeight );
                    curDetail.style.top=-(parseFloat(curDetail.offsetHeight)-parseFloat(this.offsetHeight))/2+"px";
                    
                }
                console.log(leftLiDivs[this.index]);
                leftLiDivs[this.index].className="bingo short";
            };
            curLi.onmouseleave= function (e) {
                //console.log(111);
                for(var i=0;i<leftLis.length;i++){
                    leftLiDivs[this.index].className="short"
                }
                //console.log( this.lastElementChild);
                DOM.getLastElement(this).style.display="none";//在IE中出现问题，显示的内容不能隐藏掉 兼容问题
            }
        }
    }();
/*left show detail end*/


/*two tab start*/
var oJobtab=document.getElementById("jobTab");
var jobTabLi=oJobtab.getElementsByTagName("li");
var tabDetail=document.getElementById("tabDetail");
var tabDiv=tabDetail.getElementsByClassName("posTab");
~function () {
    for(var i=0;i<jobTabLi.length;i++){
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
/*two tab end*/

/*ajax  start*/
var hotPosUl=document.getElementById("hotPosUl");
var newPosUl=document.getElementById("newPosUl");
~function () {
    function binddata(jsondata){
        //console.log(jsondata);
        var data=jsondata.data;
        var str="";
        for(var i=0;i<data.length;i++){
             var dataDetail=data[i];
            str+='<li class="jobDes">';
            str+='<div class="jobTop">';
            str+='<div class="jobDesLeft">';
            str+='<div class="jobName">';
            str+='<h2><a href="###">'+dataDetail["position"]+'<span>['+dataDetail["address"]+']</span></a></h2>';
            str+='<span class="time">'+dataDetail["date"]+'</span>';
            str+='</div>';
            str+='<div class="salary">';
            str+='<span class="salary">'+dataDetail["salary"]+'</span>';
            str+='<span>'+dataDetail["degree"]+'</span>';
            str+='</div>';
            str+='</div>';
            str+='<div class="jobDesRight">';
            str+='<h5><a href="###">'+dataDetail["company"]+'</a></h5>';
            str+='<div class="companyDes">'+dataDetail["companyType"]+'</div>';
            str+='</div>';
            str+='</div>';
            str+='<div class="jobBot">';
            str+='<div class="jobCon">“'+dataDetail["jobCon"]+'”</div>';
            str+='<div class="tips">';
            for(var j=0;j<dataDetail["tips"].length;j++){
                str+='<span>'+dataDetail["tips"][j]+'</span>'
            };

            str+='</div>';
            str+='</div>';
            str+='</li>';
        }
        hotPosUl.innerHTML=str;
    }

    function binddataNext(jsondata){
        var data=jsondata.data;
        var str="";
        for(var i=0;i<data.length;i++){
            var dataDetail=data[i];
            str+='<li class="jobDes">';
            str+='<div class="jobTop">';
            str+='<div class="jobDesLeft">';
            str+='<div class="jobName">';
            str+='<h2><a href="###">'+dataDetail["position"]+'<span>['+dataDetail["address"]+']</span></a></h2>';
            str+='<span class="time">'+dataDetail["date"]+'</span>';
            str+='</div>';
            str+='<div class="salary">';
            str+='<span class="salary">'+dataDetail["salary"]+'</span>';
            str+='<span>'+dataDetail["degree"]+'</span>';
            str+='</div>';
            str+='</div>';
            str+='<div class="jobDesRight">';
            str+='<h5><a href="###">'+dataDetail["company"]+'</a></h5>';
            str+='<div class="companyDes">'+dataDetail["companyType"]+'</div>';
            str+='</div>';
            str+='</div>';
            str+='<div class="jobBot">';
            str+='<div class="jobCon">“'+dataDetail["jobCon"]+'”</div>';
            str+='<div class="tips">';
            for(var j=0;j<dataDetail["tips"].length;j++){
                str+='<span>'+dataDetail["tips"][j]+'</span>'
            };

            str+='</div>';
            str+='</div>';
            str+='</li>';
        }
        newPosUl.innerHTML=str;
    }
    var xhr=new XMLHttpRequest();
    xhr.open("get","./json/hotPosition.json",false);
    xhr.onreadystatechange= function () {
      if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
          binddata(JSON.parse(xhr.responseText))
      }
    };
    xhr.send(null);
    var xhr1=new XMLHttpRequest();
    xhr1.open("get","./json/newPosition.json",false);
    xhr1.onreadystatechange= function () {
        if(xhr1.readyState==4&&/^2\d{2}$/.test(xhr1.status)){
            binddataNext(JSON.parse(xhr1.responseText))
        }
    };
    xhr1.send(null);
}();
/*ajax  end*/


var logoinBar=document.getElementById("logoinBar");
var footer=document.getElementById("footer")
var goTopIcon=document.getElementById("goTopIcon");

/*footerBar toTop Start*/
~function () {
    window.onscroll= function () {
        var bodyScrTop=document.documentElement.scrollTop||document.body.scrollTop;
        var bodyCliHeight=document.documentElement.clientHeight||document.body.clientHeight;
        if(footer.offsetTop-bodyCliHeight-bodyScrTop<=0){
            logoinBar.style.bottom=bodyCliHeight+bodyScrTop-footer.offsetTop+"px";
               // 68+"px";
        }else{
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
/*footerBar toTop end*/

var bannerBig=document.getElementById("bannerBig");
var bannerBigLis=bannerBig.getElementsByTagName("li");
var bannerSmall=document.getElementById("bannerSmall");
var oEm=bannerSmall.getElementsByTagName("em")[0];
var bannerSmallLis=bannerSmall.getElementsByTagName("li");
var bannerI=bannerSmall.getElementsByTagName("i");

/*slideImage start*/
 var step=0;
function aotumove(){
    window.clearInterval(bannerBig.timer);
    window.clearInterval(oEm.timer);
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
    for(var j=0;j<bannerSmallLis.length;j++){
        bannerSmallLis[j].className="";
        step==j?bannerSmallLis[j].className="currentImg":"";
    }
}
var aotumovetimer=window.setInterval(aotumove,2000);
bannerBig.onmouseover= function () {
    clearInterval(aotumovetimer);
};
bannerBig.onmouseout= function () {
    aotumovetimer=window.setTimeout(function () {
        aotumovetimer=window.setInterval(aotumove,2000);
    },2000);
};

bannerSmall.onmouseover= function (e) {
    window.clearInterval(aotumovetimer);

    e=e||window.event;
    e.target= e.target|| e.srcElement;

    for(var i=0;i<bannerI.length;i++) {
        var curLi = bannerI[i];
        curLi.index = i;
        if (e.target == curLi) {
            step=curLi.index;
            animate(bannerBig, {marginTop: -160 * step}, 100);
            animate(oEm, {top: 55 * step}, 100);
            Uncover();
        }
    }
};
bannerSmall.onmouseout= function () {
    aotumovetimer=window.setInterval(aotumove,2000);
};
/*slideImage end*/

/* footer start*/
var oApp=document.getElementById("APP");
var oWeibo=document.getElementById("weibo");
oApp.onmouseenter= function () {
    var appImg=this.lastElementChild;
    animate(appImg,{opacity:1},600);
    appImg.style.display="block"
};
oApp.onmouseleave= function () {
    this.lastElementChild.style.opacity=0;
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
/* footer end*/

/*animate start*/
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
                var val=heyanEffect.linear(time,begin[key],change[key],duration);
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
/*animate end*/

/*cover start*/
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
/*cover end*/

$(".bannerBtm li").mouseAnimate(300);











