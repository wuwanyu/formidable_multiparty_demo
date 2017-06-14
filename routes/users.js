var express = require('express');
var router = express.Router();
var async = require('async'),
    uploadClient = require('../utils/upload.js');

// 通过formidable上传
router.post('/addUser_with_formidable', function(req, res, next) {
  async.auto({
      formParse:function(cb){
          uploadClient.formidableFormParse(req,function(err,data){  // 或者 uploadClient.formidableFormParse2
            cb(err,data);
        });
    },
    add:["formParse",function(data,cb){
        var user = data.formParse;
        // save to database                // 保存到数据库
        cb(null,user);
    }],
  },function(err,data){
      if(err) throw err;
      res.send({
          code:200,
          msg:"成功！",
          result:data.add
      });
  })
});

// 通过multiparty上传
router.post('/addUser_with_multiparty', function(req, res, next) {
    async.auto({
        formParse:function(cb){
            uploadClient.multipartyFormParse(req,function(err,data){  // 表单解析
                cb(err,data);
            });
        },
        add:["formParse",function(data,cb){
            var user = data.formParse;
            // save to database                // 保存到数据库
            cb(null,user);
        }],
    },function(err,data){
        if(err) throw err;
        res.send({
            code:200,
            msg:"成功！",
            result:data.add
        });
    })
});

module.exports = router;
