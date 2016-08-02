var debug = true;

var starfieldController = (function(){
  var settings = {}, canvas, tool;
  var stats, statsContainer;
  var gui, guiContainer;

  settings.addCount = 10000;

  init = function(element, newSettings){
    canvas = element;
    settings = $.extend(settings, newSettings);

    if(debug) initDebug();

    paper.setup(canvas[0]);

    tool = new paper.Tool();
    var tinyLayer = new paper.Layer();

    tinyLayer.setName('tinyStars');
    tinyLayer.activate();

    paper.view.onFrame = function(){
      if(debug) stats.begin();
      onFrame();
      if(debug) stats.end();
    };

    addStars();
  };

  initDebug = function(){
    guiContainer = $('<div>', { id:'guiContainer' }).appendTo($('body'));

    gui = new dat.GUI({
      autoPlace: false
    });

    guiContainer.append(gui.domElement);

    gui.addFolder('Static stars background');

    gui.add(starfieldController.settings, 'addCount');
    gui.add(starfieldController, 'addStars');

    /* --------------- */

    statsContainer = $('<div>', { id:'statsContainer' }).appendTo($('body'));

    stats = new Stats();
    statsContainer.append(stats.domElement);
  };

  addStars = function(count){
    console.log('wtf');
    var count = count || settings.addCount;

/*
    var min = 1000;
    var max = 40000;

    var step = (max - min) / 100;

    _.each(_.range(min, max, step), function(temperature,i){
      var path = new paper.Path.Rectangle({
        center: new paper.Point(100 + (i * 10),200),
        size: new paper.Size(10, 100),
        fillColor: kelvinToRGB(temperature)
      });
    });
*/

    for(i=0; i<count; i++){
      var path = new paper.Path.Circle({
        center: new paper.Point(Math.random() * paper.view.size.width, Math.random() * paper.view.size.height),
        radius: Math.random() * 1,
        fillColor: kelvinToRGB(Math.floor(Math.random() * 40000) + 3800),
        shadowColor: 'white',
        shadowBlur: 20,
        shadowOffset: new paper.Point(0, 0)
      });
    }

    paper.view.draw();
  };

  onFrame = function(){
    paper.view.draw();

//    for (var i = 0; i < settings.addCount; i++) {
//      var item = paper.project.activeLayer.children[i];
//
//      // Move the item 1/20th of its width to the right. This way
//      // larger circles move faster than smaller circles:
//      item.position.y -= item.bounds.height/* / 20*/;
//
//      // If the item has left the view on the right, move it back
//      // to the left:
//      if (item.bounds.top + item.bounds.height < 0) {
//        item.position.y = paper.view.size.height + item.bounds.height;
//      }
//    }

  };

  return {
    settings: settings,
    init: init,
    addStars: addStars
  };
})();

$(document).ready(function(){
  starfieldController.init($('canvas#starfield'));
});


/*

// The amount of circles we want to make:
var count = 50;
var canvas = document.getElementById('starfield');
var body = $('body');
body.css('background-image', 'url('+ canvas.toDataURL() +')');

// Create a symbol, which we will use to place instances of later:
var path = new Path.Circle({
  center: [0, 0],
  radius: 2,
  fillColor: 'white'
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
  // The center position is a random point in the view:
  var center = Point.random() * view.size;
  var placedSymbol = symbol.place(center);
  placedSymbol.scale(i / count);
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
  // Run through the active layer's children list and change
  // the position of the placed symbols:
  for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];

    // Move the item 1/20th of its width to the right. This way
    // larger circles move faster than smaller circles:
    item.position.y -= item.bounds.height;

    // If the item has left the view on the right, move it back
    // to the left:
    if (item.bounds.top + item.bounds.height < 0) {
      item.position.y = view.size.height + item.bounds.height;
    }
  }
}

*/
