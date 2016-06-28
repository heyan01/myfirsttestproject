var oSubmit=document.getElementById("submit"),
oName=document.getElementById('name'),
    oSex=document.getElementById('sex'),
    oChina=document.getElementById('china'),
    oMath=document.getElementById('math');
//add.html?id='+item.id 点击修改的时候页面跳转 同时把当前的id问号传参
//获取地址
var flag=false;
var curId='';
function queryURLParameter(){
    var url=window.location.href;
    var reg=/id=(\d)/i;
    if(reg.test(url)){
        curId=reg.exec(url)[1];
        flag=true;//当修改时 为真
    }
}
queryURLParameter();

if(flag){//首先获取客户信息,并且把信息设置到文本框中
    $.ajax({
        url:'/getData?id='+curId,
        type:'get',
        success: function (data) {
            oName.value=data[0].name;
            oSex.value=data[0].sex;
            oChina.value=data[0].china;
            oMath.value=data[0].math;
        }
    })
}


oSubmit.onclick= function () {//点击的时候发送ajax请求 方式为post 发送的内容是文本框里写的内容
    var name=oName.value.replace(/^ +| +$/g,"");
    var sex=oSex.value.replace(/^ +| +$/g,"");
    var china=oChina.value.replace(/^ +| +$/g,"");
    var math=oMath.value.replace(/^ +| +$/g,"");
    var obj={
        name:name,
        sex:sex,
        china:china,
        math:math
    };
    if(flag){//当前是修改操作的话，需要把新数据推送上去，把原来的替换掉就可以
        obj.id=curId
        $.ajax({
            url:'/upData',
            type:'post',
            data:JSON.stringify(obj),
            success: function (data) {
                alert('修改成功！')
                window.location.href='index.html';
            }
        })
        return;
    }

   // console.log(obj); 没问题
    $.ajax({
        url:'/add',
        type:'post',
        data:JSON.stringify(obj),
        success: function (data) {
            console.log(data);
            window.location.href='index.html';
        }
    })
};



