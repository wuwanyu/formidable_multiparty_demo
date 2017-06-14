/**
 * Created by wuwy on 2016/4/6.
 */

var formidable = require('formidable'),
    multiparty = require('multiparty');






//����
exports.formidableFormParse = function(req,callback){

    var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:"public/upload",  //�ļ��ϴ���ַ
        keepExtensions:true  //������׺
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
}

//����
exports.multipartyFormParse = function(req,callback){
    var form = new multiparty.Form({
        encoding:"utf-8",
        uploadDir:"public/upload",  //�ļ��ϴ���ַ
        keepExtensions:true  //������׺
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

}


