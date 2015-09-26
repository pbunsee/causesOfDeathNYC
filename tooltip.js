var eish = (function(myApp){

  myApp.tooltip = function(d){ 
    var init = function(){
      var tooltipDiv = d3.select(".chart-container").append("div")   
            .attr("id", "tooltip")               
            .attr("class", "tooltip")               
            .style("opacity", 0);
    };

    var show = function(){
      var tooltipDiv = d3.select("#tooltip");
      if ( eish.global.contextMenuActive == false ) {
        tooltipDiv.transition()        
                  .duration(200)      
                  .style("opacity", .9);      
        tooltipDiv.html(eish.data().handleType(d.value))  
                  .style("left", (d3.event.pageX - 90) + "px")     
                  .style("top", (d3.event.pageY - 180) + "px");    
      }
    };
    
    var hide = function(){
      var tooltipDiv = d3.select("#tooltip");
      tooltipDiv.transition()        
                .duration(500)      
                .style("opacity", 0);
    };

    return { init: init, show: show, hide: hide };
  }

  return myApp;
})(eish || {});

