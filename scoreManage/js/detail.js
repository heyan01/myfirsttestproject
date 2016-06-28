var oname=document.getElementById('name');
var osex=document.getElementById('sex');
var ochina=document.getElementById('china');
var omath=document.getElementById('math');
var curId='';
function queryURLParameter(){
    var url=window.location.href;
    var reg=/id=(\d)/i;
    curId=reg.exec(url)[1];
    
}
queryURLParameter();

~function () {
    $.ajax({
        url:'/detail?id='+curId,
        type:'get',
        success: function (data) {
            console.log(data);
            oname.innerHTML='姓名：'+data[0].name,
            osex.innerHTML='性别：'+data[0].sex,
            ochina.innerHTML='语文成绩：'+data[0].china,
            omath.innerHTML='数学成绩：'+data[0].math

        }
        
        
    })
    
    
    
}()




