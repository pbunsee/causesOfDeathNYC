var eish = (function(myApp){

  var makeLegend = function(){
    var whichArc = ".arc";
    var canvas = d3.select(whichArc);
    var colorScale = d3.scale.category10();
    var legendRectSize = 18;
    var legendSpacing = 4;

    var legend = canvas.selectAll('.legend')
      .data(colorScale.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        console.log("height: " + height);
        console.log("colorScale.domain().length: " + colorScale.domain().length);
        var offset =  height * colorScale.domain().length / 2;
        console.log("offset: " + offset);
        var horz = -2 * legendRectSize;
        console.log("horz: " + horz);
        var vert = i * height - offset;
        console.log("vert: " + vert);
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style("fill", function (d){ return d.children ? "#fff" : colorScale(d) ; })
      .style("stroke", function (d){ return d.children ? "#fff" : colorScale(d) ; });
    
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
  };

  myApp.drawAllPieCharts = function(){
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
          .attr("data-legend", function(d){return d.data.key})
          .style("fill", function(d) { return color(d.data.key); });
    
/*
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return eish.data().handleType(d.data.key); });
*/

      var width = 360;
      var height = 1360;
      var radius = Math.min(width, height) / 2;
      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;


      var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = 6.5 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return eish.data().handleType(d); });

/*
     //var legend;
     var legend = svg.append("g")
                .attr("class", "legend")
                .attr("transform", "translate(50,30)")
                .style("font-size", "12px");
                //.call(d3.legend);
      //makeLegend();
*/

  }

  return myApp;
})(eish || {});

