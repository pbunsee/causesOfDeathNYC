$('#applyFilters').on('click',function(){
  console.log("applying filters...");
  eish.filter().set();
  eish.drawAllCharts();
});
  
$('#clearFilters').on('click',function(){
  console.log("clearing filters...");
  eish.filter().clear();
  eish.drawAllCharts();
});

$('#drawPie').on('click',function(){
  console.log("drawing pie charts...");
  eish.drawAllPie();
});

$('#drawBar').on('click',function(){
  console.log("drawing bar charts...");
  eish.drawAllCharts();
});

