/**
 * Created by Administrator on 2016/6/12.
 */
~function(desW){
    var winW=document.documentElement.clientWidth;
    document.documentElement.style.fontSize=winW/desW*100+"px";
}(320);


~function () {
    var step= 0,divList=null;
    var swp=new Swiper(".swiper-container",{
    direction:"vertical",
    loop:true,
   /* effect : 'coverflow',
    /!* slidesPerView: 3,*!/
    centeredSlides: true,
    coverflow: {
        rotate: 30,
        stretch: 10,
        depth: 60,
        modifier: 2,
        slideShadows : true
    },   */
    onSlidePrevStart: function () {//往上翻一张结束
        step--;
        console.log("往上翻一页之后 "+step);
        change();
        if(step===0){
            step=4;
        }
        
    },
    onSlideNextStart: function (){//往下翻一张结束  上来就会+1 因为展示的是真实的第一张 在他前面有一张
        step++;
        console.log("往后翻一页之后 "+step);
        change();
        if(step===5){
            step=1;
        }
    }
       
    });
    
    function change(){
        divList=document.querySelectorAll(".swiper-slide");
        //console.log(divList);
        for(var i=0;i<divList.length;i++){
            var curDiv=divList[i];
            curDiv.index=i;
            //console.log(curDiv.index);
            if(step===curDiv.index){
                console.log(step);
                console.log(curDiv.index);
                console.log(curDiv.getAttribute("trueId"));

                curDiv.id=curDiv.getAttribute("trueId");
                console.log(curDiv.id);
            }else{
                curDiv.id="";
            }
            
        }
        
    }
    

}();






/*音频自动播放*/
~function () {
    var audioBox=document.querySelector(".audio");
    myAudio=audioBox.getElementsByTagName("audio")[0];
    window.setTimeout(function () {
        myAudio.play();//播放音频
        myAudio.addEventListener("canplay", function () {/*当音频可以播放的时候触发这个事件*/
            audioBox.style.display="block";
            audioBox.className+= " audioMove";
        },false)

    },1000);

    audioBox.addEventListener("click", function () {
        //console.log(11);
        if(myAudio.paused){//当前是暂停状态
            myAudio.play();
            audioBox.className+=" audioMove";
            return;
        }
        myAudio.pause();
        audioBox.className="audio";

    },false)


}();


