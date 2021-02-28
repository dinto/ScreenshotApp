var express= require('express');
const phantom =require('phantom');
var fs=require('fs');
const downloadsFolder = require('downloads-folder');
var path = require('path'); 
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Screenshot a remote webpage' });
});

router.get('/test/submit',function(req,res,next){
  res.render('test', { output: req.params.id});
}); 
router.post('/test/submit',function(req,res,next){

  //var url="http://www.nitc.ac.in";   //https://www.google.com/
  var url =req.body.id;
  var filename=req.body.filename;
  var format=req.body.format;
  var width=req.body.width;
  var height=req.body.height;
  var file_name =  filename +'.'+format
  takeScreenshot(url,file_name,width,height);
  
 // console.log(takeScreenshot.status);
    res.redirect('/test/submit');
  
});

const takeScreenshot=async(url,file_name,width,height)=>{
  const instance=await phantom.create()
  const page=await instance.createPage()
  const status=await page.open(url)
   //page.viewportSize = { width: 1024, height: 768 }
   //page.clipRect = { top: 0, left: 0, width: 200, height: 300 }
  var DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/')
  var file_path = path.join(DOWNLOAD_DIR,file_name)
  //console.log(file_path)
 // var file = fs.createWriteStream(file_path)
  await page.render(file_path)
  await instance.exit()
}

module.exports = router;
