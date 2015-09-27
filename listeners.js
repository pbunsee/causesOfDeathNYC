$('#applyFilters').on('click',function(){
  console.log("applying filters...");
  eish.drawAllCharts();
  //var persistFilters = new Filters(currentFilters);
  //persistFilters.set(currentFilters);
});
  
$('#clearFilters').on('click',function(){
  console.log("clearing filters...");
  //var persistFilters = new Filters(currentFilters);
  //currentFilters = persistFilters.clear(currentFilters);
});

