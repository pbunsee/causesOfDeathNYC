$('#applyFilters').on('click',function(){
  console.log("applying filters...");
  eish.filter().set();
  eish.drawAllCharts();
});
  
$('#clearFilters').on('click',function(){
  console.log("clearing filters...");
  eish.filter().clear();
});

