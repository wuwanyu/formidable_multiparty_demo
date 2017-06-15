### 使用formidable & multiparty实现文件上传

#### 启动项目

1.安装依赖包：npm install
2.运行：npm start
3.在浏览器输入：http://localhost:3000/



#### 关键代码

1.formidable处理表单

参考./utils/upload.js中multipartyFormParse方法

```
var form = new formidable.IncomingForm({
    encoding:"utf-8",
    uploadDir:"public/upload",  //文件上传地址
    keepExtensions:true  //保留后缀
});
form.parse(req, function(err, fields, files) {
    var obj ={};
    Object.keys(fields).forEach(function(name) {
        console.log('name:' + name+";filed:"+fields[name]);
        obj[name] = fields[name];
    });

    Object.keys(files).forEach(function(name) {
        console.log('name:' + name+";file:"+files[name].path);
        obj[name] = files[name];
    });

    callback(err,obj);
});
```

2.multipaty处理表单

参考./utils/upload.js中multipartyFormParse方法

```
var form = new multiparty.Form({
    encoding:"utf-8",
    uploadDir:"public/upload",  //文件上传地址
    keepExtensions:true  //保留后缀
})

form.parse(req, function(err, fields, files) {
    var obj ={};
    Object.keys(fields).forEach(function(name) {
        console.log('name:' + name+";filed:"+fields[name]);
        obj[name] = fields[name];
    });

    Object.keys(files).forEach(function(name) {
        console.log('name:' + name+";file:"+files[name]);
        obj[name] = files[name];
    });
    console.log(">> obj:",obj);
    callback(err,obj);
});
```



#### 接口列表

项目启动后，建议使用postman亲自调试一下

##### 1.添加用户（使用formidable处理表单）

接口地址：http://localhost:3000/api/user/addUser_with_formidable

方法：post(form-data)

参数：（随意，例如：）

name:wuwanyu

icon:xxx.png

返回值：

```
{
  "code": 200,
  "msg": "成功！",
  "result": {
    "name": "wuwanyu",
    "icon": {
      "size": 13907,
      "path": "public\\upload\\upload_084b0bb835dc3517ea690bced7013262.jpg",
      "name": "640.jpg",
      "type": "image/jpeg",
      "mtime": "2017-06-14T09:45:20.149Z"
    }
  }
}
```



##### 2.添加用户（使用multipaty处理表单）

接口地址：http://localhost:3000/api/user/addUser_with_multiparty

方法：post(form-data)

参数：（随意，例如：）

name:wuwanyu

icon:xxx.png

返回值：

```
{
  "code": 200,
  "msg": "成功！",
  "result": {
    "name": [ "wuwanyu" ],
    "icon": [
      {
        "fieldName": "icon",
        "originalFilename": "bubbles.png",
        "path": "public\\upload\\f7mq9A8CvHMHRUEkQOL5N-5Y.png",
        "headers": {
          "content-disposition": "form-data; name=\"icon\"; filename=\"bubbles.png\"",
          "content-type": "image/png"
        },
        "size": 3614
      }
    ]
  }
}
```


#### 效果图

##### formidable表单上传及处理结果：

![image](https://github.com/wuwanyu/formidable_multiparty_demo/blob/master/screenshot/formidable.png)

##### multipaty表单上传及处理结果：
![image](https://github.com/wuwanyu/formidable_multiparty_demo/blob/master/screenshot/multipaty.png)


#### 一点总结：

表单提交如果涉及到多图上传，一定要使用multipaty
