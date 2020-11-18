var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; 
var unzip = require('unzip-zhcn');
const { exec } = require('child_process');
var formidable = require('formidable');
const deleteEmpty = require('delete-empty');
var del = require('delete');
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express+EJS+mysql+s2' });
});
router.post('/upload_zip', function (req, res, next) {
  logger.info('开始文件上传....');
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = "./prototypeFile/";
  form.keepExtensions = true;  
  form.maxFieldsSize = 100 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    logger.info(JSON.stringify(files));
    logger.info(files.prototypeFile.path);
    logger.info('文件名:' + files.prototypeFile.name);
    function getFormatDate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentDate = `${date.getFullYear()}${month}${strDate}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
      return currentDate;
    }
    var t = getFormatDate();
    var newFileName = files.prototypeFile.name;
    fs.exists("./prototypeFile/" + files.prototypeFile.name, (result) => {
      if (result) {
        logger.info("已存在同名压缩包" + result);
        fs.rename("./prototypeFile/" + files.prototypeFile.name, "./prototypeFile/" + t + files.prototypeFile.name, function (err) {
          if (err) {
            console.log("已存在同名压缩包，对原压缩包重命名失败！");
          } else {
            console.log("已存在同名压缩包，对原压缩包重命名成功！");
            fs.rename(files.prototypeFile.path, "prototypeFile/" + newFileName, function (err) {
              if (err) {
                console.log("上传压缩包文件重命名失败！");
              } else {
                console.log("上传压缩包文件重命名成功！");
                if (files.prototypeFile.name.indexOf(".zip")) {
                  console.log("客户端上传文件是zip");
                  fs.exists("./prototypeFile/" + files.prototypeFile.name.replace(".zip", ""), (result) => {
                    logger.info("是否已存在解压文件夹：" + result);
                    if (result) {
                      logger.info("已存在解压文件夹，即将进行删除");
                      console.log(files.prototypeFile.name.replace(".zip", ""))
                      del.promise(["./prototypeFile/" + files.prototypeFile.name.replace(".zip", "")])
                        .then(function (deleted) {
                          console.log(deleted)
                          try {
                            logger.info("开始解压");
                            unzip.extractSync("./prototypeFile/" + files.prototypeFile.name, './prototypeFile/', 'cp936');
                            logger.info("解压完成");

                          } catch (error) {
                          }
                        });
                    } else {
                      logger.info("开始解压");
                      unzip.extractSync("./prototypeFile/" + files.prototypeFile.name, './prototypeFile/', 'cp936');
                      logger.info("解压完成");
                    }
                  });
                } else {
                  console.log("客户端上传文件是rar");
                  // TODO
                }
              }
            });
            res.end(JSON.stringify(files));

          }
        });
      } else {
        console.log("没有存在同名包名")
        fs.rename(files.prototypeFile.path, "prototypeFile/" + newFileName, function (err) {
          if (err) {
            console.log("上传压缩包文件重命名失败！");
          } else {
            console.log("上传压缩包文件重命名成功！");
            if (files.prototypeFile.name.indexOf(".zip")) {
              console.log("客户端上传文件是zip");
              fs.exists("./prototypeFile/" + files.prototypeFile.name.replace(".zip", ""), (result) => {
                logger.info("是否已存在解压文件夹：" + result);
                if (result) {
                  logger.info("已存在解压文件夹，即将进行删除");
                  console.log(files.prototypeFile.name.replace(".zip", ""))
                  del.promise(["./prototypeFile/" + files.prototypeFile.name.replace(".zip", "")])
                    .then(function (deleted) {
                      // deleted files
                      console.log(deleted)
                      try {
                        logger.info("开始解压");
                        unzip.extractSync("./prototypeFile/" + files.prototypeFile.name, './prototypeFile/', 'cp936');
                        logger.info("解压完成");

                      } catch (error) {
                        logger.error(error);

                      }
                    });
                } else {
                  logger.info("开始解压");
                  unzip.extractSync("./prototypeFile/" + files.prototypeFile.name, './prototypeFile/', 'cp936');
                  logger.info("解压完成");
                }
              });
            } else {
              console.log("客户端上传文件是rar");
              // TODO 
            }
          }
        });
        res.end(JSON.stringify(files));

      }
    });



  });

});

module.exports = router;