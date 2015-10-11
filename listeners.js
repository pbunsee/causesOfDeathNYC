var eish = (function(myApp){
  'use strict';

  $('#applyFilters').on('click',function(){
    console.log("applying filters...");
    eish.filter().set();
    eish.drawAllVertBarCharts();
  });
  
  $('#clearFilters').on('click',function(){
    console.log("clearing filters...");
    eish.filter().clear();
    eish.drawAllVertBarCharts();
  });

  $('#drawPie').on('click',function(){
    console.log("drawing pie charts...");
    eish.drawAllPieCharts();
  });

  $('#drawVertBar').on('click',function(){
    console.log("drawing vertical bar charts...");
    eish.drawAllVertBarCharts();
  });

  $('#drawHorizBar').on('click',function(){
    console.log("drawing horizontal bar charts...");
    eish.drawAllHorizBarCharts();
  });

  $(document).on('ready page:load',function(){
    console.log("ready!");
    eish.load();
  });

  return myApp;
})(eish || {});


