var links = [];

function rebuildLinksArray(){
  var innerContentOffset = $('#innerContent').offset();
  links = [];

  $('a:not(.menu a)').each(function(){
    var offset = $(this).position();

    links.push({
      'element': $(this),
      'top': offset.top + innerContentOffset.top,
      'left': offset.left + innerContentOffset.left,
      'width': $(this).width(),
      'height': $(this).height()
    });
  });
}

$(window).load(function(){
  rebuildLinksArray();

  $(window).resize(function(){
    rebuildLinksArray();
  });

  $(document).on('mousemove', function(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var scrollTop = $('#content').scrollTop();

    $.each(links, function(index, link){
      // get link center point
      var linkX = link.left + link.width/2;
      var linkY = (link.top - scrollTop) + link.height/2;

      // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
      var distanceSquared = Math.pow(linkX - mouseX, 2) + Math.pow(linkY - mouseY, 2);
      var distance = Math.sqrt(distanceSquared);
      var halfLinkWidth = (link.width / 2);

      if( distance <= halfLinkWidth + 100 ){
        var outsideDistance = distance - halfLinkWidth;
        var reversedOutsideDistance = 100 - (distance - halfLinkWidth);
        var percentageTowardLink = Math.floor((reversedOutsideDistance <= 100) ? reversedOutsideDistance : 100);

        links['percentage'] = percentageTowardLink;
        link.element.css('animation-delay','-'+ percentageTowardLink +'s');
      }else if( links['percentage'] > 0 ){
        links['percentage'] = 0;
        link.element.css('animation-delay','0s');
      }
    });
  });
});
