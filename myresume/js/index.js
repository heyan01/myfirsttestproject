/**
 * Created by Administrator on 2016/6/12.
 */
~function(desW){
    var winW=document.documentElement.clientWidth;
    document.documentElement.style.fontSize=winW/desW*100+"px";
}(320);


~function () {

    var swp=new Swiper(".swiper-container",{
    direction:"vertical",
    loop:true,

        effect : 'coverflow',
        /* slidesPerView: 3,*/
        centeredSlides: true,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
        }
    })

}()
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


