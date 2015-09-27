var eish = (function(myApp){

  myApp.drawAllPie = function(){
    //eish.tooltip().init();
    var whichCharts = eish.chartConfig();
    Object.keys(whichCharts).forEach(function(d,i){ 
            if ( whichCharts[d] instanceof Object ) 
            {
              var directives = whichCharts[d];
              var chartData = directives[d];
              var xAxisTitle = directives["xAxisTitle"];
              var yAxisTitle = directives["yAxisTitle"];
              var whichOuter = "#" + xAxisTitle + '-outer';
              $(whichOuter).remove();
              var newDiv = $('<div>')
              $(newDiv).attr('id',xAxisTitle+'-outer').addClass('report-group'); 
              $('.chart-container').append( $(newDiv) );
              eish.drawPie(chartData, xAxisTitle);
            }
            else
            {
               console.log("Unexpected whichCharts entry");
            }
    });
  }

  myApp.drawPie = function(plotValues, whichDim){
    var whichChart = "#" + whichDim;
    var removeChart = "svg" + whichChart;
    $(removeChart).remove();
    $('#' + whichDim + '-outer').append("<svg class='chart' id='" + whichDim + "'></svg>");

    var width = 360,
        height = 200,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    
    var svg = d3.select("svg#" + whichDim)
    //var svg = d3.select().append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
      var g = svg.selectAll(".arc")
          .data(pie(plotValues))
        .enter().append("g")
          .attr("class", "arc");
    
      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.key); });
    
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.key; });
  }

  return myApp;
})(eish || {});

