var http=require('http');
var fs=require('fs');
var url=require('url');
var mime=require('mime')
http.createServer(function (request,response) {
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname;

    if(pathname=='/'){
        response.setHeader('Content-Type','text/html;charset:utf8');
        fs.createReadStream('./index.html').pipe(response);
    }else if(pathname=='/getAllData'){
        response.setHeader('Content-Type','application/json;charset:utf8');
        fs.createReadStream('./node/studentInfo.json').pipe(response);
    }else if(pathname=='/add'){//返回的是和之前的数据拼接好的json字符串
        var temp='';
        request.on('data', function (obj) {
            temp+=obj;
        });
        request.on('end', function () {
            temp=JSON.parse(temp);
            var con=fs.readFileSync('./node/studentInfo.json',"utf8");//把之前的读取回来
            con=(con!='')?JSON.parse(con):[];
            if(con.length===0){
                temp["id"]=1;
            }else{
                temp["id"]=Number(con[con.length-1]["id"])+1
            };
            con.push(temp);
            fs.writeFileSync('./node/studentInfo.json',JSON.stringify(con));
            var res={
                code:0,
                mess:"创建成功！"
            };
            response.setHeader('Content-Type','application/json;charset:utf8')
            response.end(JSON.stringify(res))
        })
    }else if(pathname=='/delete'){//把json文件里的数据删掉 通过id 获得是利用query
        var curId=urlObj.query.id;//先把之前的读取回来 在根据id去删除特定的 在返回给json文件就可以了
        console.log(curId);
        var con=fs.readFileSync('./node/studentInfo.json',"utf8");
        con=JSON.parse(con);
        con=con.filter(function (item) {
            return item.id!=curId
        })
        console.log(con);
        fs.writeFileSync('./node/studentInfo.json',JSON.stringify(con));
        var res={
            code:0,
            mess:"删除成功"
        };
        response.setHeader('Content-Type','application/json;charset:utf8');
        response.end(JSON.stringify(res))//必须要返回 不返回东西 那边不会执行成功函数
    }else if(pathname=='/getData'){
        var curId=urlObj.query.id;
        var con=fs.readFileSync('./node/studentInfo.json',"utf8");
        con=JSON.parse(con);
        con=con.filter(function (item) {
            return item.id==curId
        });
        response.setHeader('Content-Type','application/json;charset:utf8');
        response.end(JSON.stringify(con))

    }else if(pathname=='/upData'){
        var temp='';
        request.on('data', function (data) {//得到了希望改的数据 把原数组里的那一项用当前的这个替换
            console.log(data);
            temp+=data;
        });
        request.on('end', function () {
            temp=JSON.parse(temp);
            var con=fs.readFileSync('./node/studentInfo.json',"utf8");
            con=JSON.parse(con);//读取到的所有后台的数据
            for(var i=0;i<con.length;i++){
                cur=con[i];
                if(cur.id==temp.id){
                    cur.name=temp.name,
                        cur.sex=temp.sex,
                        cur.china=temp.china,
                        cur.math=temp.math
                }
            }
            response.setHeader('Content-Type','application/json;charset:utf8');
            fs.writeFileSync('./node/studentInfo.json',JSON.stringify(con))
            response.end(JSON.stringify(con))//把最新的后台数据返回
        })
       
    }else if(pathname=='/detail'){
        var curId=urlObj.query.id;
        response.setHeader('Content-Type','application/json;charset:utf8');

        var con=fs.readFileSync('./node/studentInfo.json',"utf8");

        con=JSON.parse(con);
        con=con.filter(function (item) {
            return item.id==curId
        })
        response.setHeader('Content-Type','application/json;charset:utf8');
        response.end(JSON.stringify(con))
    }
    else{
        if(fs.existsSync('.'+pathname)){
            response.setHeader('Content-Type',mime.lookup(pathname)+';charset:utf8');
            fs.createReadStream('.'+pathname).pipe(response)

        }else{
            response.statusCode='404';
            response.end();
        }
    }


}).listen(80);

