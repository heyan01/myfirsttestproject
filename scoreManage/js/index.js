var studentList=document.getElementById('studentList');

~function(){
    function callback(data){
       // console.log(data);
          var str='';
        data.forEach(function (item,index) {//每一个都是一个对象 name"张三"性别 : "女"数学 : 30语文 :  80
            str+='<li>',
            str+='<span class="w50">'+(index+1)+'</span>',
            str+='<span class="w100">'+item.name+'</span>',
            str+='<span class="w150">'+item.sex+'</span>',
            str+='<span class="w150">'+item.china+'</span>',
            str+='<span class="w150">'+item.math+'</span>',
            str+='<span class="w200 last"> ',
            str+='<a href="javascript:;" id="'+item.id+'">删除</a>',
            str+='      <a href="add.html?id='+item.id+'">修改</a>',
            str+='  <a href="detail.html?id='+item.id+'" >查看详情</a></span>',
            str+='</li>'
        })
        studentList.innerHTML=str;
    }
    $.ajax({
        url:'/getAllData',
        type:'get',
        data:null,
        success:callback
    })

}();

studentList.onclick= function (e) {
    e=e||window.event;
    var tar= e.target|| e.srcElement;
    if(tar.tagName.toUpperCase()=='A'&&tar.innerHTML=='删除'){
        var curId=tar.getAttribute('id');
        $.ajax({
            url:'/delete?id='+curId,
            type:'get',
            data:null,
            async:true,
            success: function (data){
                studentList.removeChild(tar.parentNode.parentNode)//把整行数据删掉
            }
        })
    }
};








