$(document).ready(function(){
  $('[data-tooltip!=""]').qtip({ // Grab all elements with a non-blank data-tooltip attr.
      style: { classes: 'qtip-youtube' },
      content: {
          attr: 'data-tooltip' // Tell qTip2 to look inside this attr for its content
      },
      position: {
          my: 'top center',
          at: 'bottom center',
          adjust: {
              x: 5,
              y: 5,
              method: 'shift none'
          },
          viewport: $('#innerContent')
      }
  });

  $('a').each(function(){
    $(this).attr('target','_blank');
  });
});
