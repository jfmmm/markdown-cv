var app     = require('../app');
var express = require('express');
var router  = express.Router();
var marked  = require('marked');
var fs      = require('fs');
var pdf     = require('html-pdf');
var jade    = require('jade');
var path    = require('path');
var mime    = require('mime');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.device.type);
  console.log(req.device.name);
  res.render('resume', {
    resumeHTML: marked(fs.readFileSync('./RESUME.md').toString())
  });
});

/* MARKDOWN EXPORT */
router.get('/cv_jfmorin.md', function(req, res){
  res.download('./RESUME.md', 'cv_jfmorin.md'); // Set disposition and send it.
});

/* PDF EXPORT */
router.get('/cv_jfmorin.pdf', function(req, res) {
  var templateJadeFn = jade.compileFile('./views/resume-pdf.jade', {
    'globals': ['platform']
  });

  var html = templateJadeFn({
    resumeHTML: marked(fs.readFileSync('./RESUME.md').toString())
  });

  pdf.create(html, {
    base: 'http://' + req.headers.host,
    border: {
      "top": "0.5in",
      "right": "0.5in",
      "bottom": "0.5in",
      "left": "0.5in"
    },
    "format": "Letter",
    "orientation": "portrait"
  })
    .toBuffer(function(err, buffer){
      res.contentType("application/pdf");
      res.send(buffer);
    });
});

module.exports = router;
