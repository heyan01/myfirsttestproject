var home_banner=document.getElementById("home_banner");
var banner_inner =document.getElementById("banner_inner");
var banner_control =document.getElementById("banner_control");
var em=banner_control.getElementsByTagName("em")[0];
var oLis=banner_control.getElementsByTagName("li");

var step=0;
function autoTop(){
    step++;
    if(step>2){
       zhufengAnimate(banner_inner,{marginTop:0},100);
        zhufengAnimate(em,{top:0},100);
        step=0;
    }
    zhufengAnimate(banner_inner,{marginTop:step*-160},400);
    zhufengAnimate(em,{top:step*55},400);
    change();
}
var autoTimer=window.setInterval(autoTop,5000);

function change(){
    for(var i=0;i<oLis.length;i++){
     var curLi=oLis[i];
        step==i?utils.addClass(curLi,"current"):utils.removeClass(curLi,"current");
    }

}
home_banner.onmouseover=function(){
    clearInterval(autoTimer);
};
home_banner.onmouseout=function(){
    autoTimer =setTimeout(function(){
        autoTimer=setInterval(autoTop,5000);
    },2000)
};

!function(){
    for(var i=0;i<oLis.length;i++){
        var oLi=oLis[i];
        oLi.i=i;
        oLi.onmouseover=function(){
            step=this.i;
            zhufengAnimate(banner_inner,{marginTop:step*-160},200);
            zhufengAnimate(em,{top:step*55},200);
            change();
        }
    }
}();
