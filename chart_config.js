var eish = (function(myApp){

  myApp.chartConfig = function(){ 
    var hashCharts = new Object();
    
    //drawChart(deathsPerGender.all(), "Gender", "Deaths");
    var directives = new Object();
    //directives["deathsPerGender"] = Object(eish.global.deathsPerGender.all()); 
    directives["deathsPerGender"] = Object(eish.global.deathsPerGender); 
    directives["xAxisTitle"] = "Gender"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerGender"] = directives;
  
    //drawChart(deathsPerEthnicity.all(), "Ethnicity", "Deaths");
    var directives = new Object();
    //directives["deathsPerEthnicity"] = Object(eish.global.deathsPerEthnicity.all()); 
    directives["deathsPerEthnicity"] = Object(eish.global.deathsPerEthnicity); 
    directives["xAxisTitle"] = "Ethnicity"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerEthnicity"] = directives;
  
    //drawChart(deathsPerCause.top(5), "Top_5_Causes", "Deaths");
    var directives = new Object();
    //directives["deathsPerCause_top5"] = Object(eish.global.deathsPerCause.top(5)); 
    directives["deathsPerCause_top5"] = Object(eish.global.deathsPerCause); 
    directives["xAxisTitle"] = "Causes_Top5"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerCause_top5"] = directives;
  
    //drawChart(deathsPerYear.all(), "Year", "Deaths");
    var directives = new Object();
    //directives["deathsPerYear"] = Object(eish.global.deathsPerYear.all()); 
    directives["deathsPerYear"] = Object(eish.global.deathsPerYear); 
    directives["xAxisTitle"] = "Year"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerYear"] = directives;
  
    //drawChart(deathsPerCause.all(), "Cause", "Deaths");
    var directives = new Object();
    //directives["deathsPerCause"] = Object(eish.global.deathsPerCause.all()); 
    directives["deathsPerCause"] = Object(eish.global.deathsPerCause); 
    directives["xAxisTitle"] = "Cause"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerCause"] = directives;
  
    console.log("hashCharts");
    console.dir(hashCharts);
    myApp.global.hashCharts = hashCharts;
    eish.print_console(eish.global.genderDim, "eish.global.genderDim");
    eish.print_console(eish.global.ethnicityDim, "eish.global.ethnicityDim");
    eish.print_console(eish.global.yearDim, "eish.global.yearDim");
    eish.print_console(eish.global.causeDim, "eish.global.causeDim");
    eish.print_console(eish.global.deathsPerYear, "eish.global.deathsPerYear");
    eish.print_console(eish.global.deathsPerCause_top5, "eish.global.deathsPerCause_top5");
    eish.print_console(eish.global.deathsPerCause, "eish.global.deathsPerCause");
    eish.print_console(eish.global.deathsPerGender, "eish.global.deathsPerGender");
    eish.print_console(eish.global.deathsPerEthnicity, "eish.global.deathsPerEthnicity");
    console.log("eish.global.grandTotal:  " + eish.global.grandTotal);

    return hashCharts;
  };
  
  myApp.drawChart = function(plotValues, xAxisTitle, yAxisTitle){

    var decoration = function(){
      var barSpacing = 2; 
      var padding = { left: 120, right: 0, top: 20, bottom: 70 };
      var ticksReq = plotValues.length;
      console.log("ticksReq " + ticksReq);
      switch(true){
        case ticksReq > 30:
          var width = 1190;
          padding.bottom = 290;
          var height = 470;
          break;
        case ticksReq > 20:
          var width = 950;
          padding.bottom = 290;
          var height = 470;
          break;
        case ticksReq > 10:
          var width = 850;
          var height = 250;
          break;
        default:
          var width = 480;
          var height = 250;
      }
    
      var chartWidth = width - padding.left - padding.right;
      var chartHeight = height - padding.top - padding.bottom;
    
      var scales = { x: d3.scale.ordinal(), y: d3.scale.linear() };
    
      var axes = {
        x: d3.svg.axis().orient('bottom'),
        y: d3.svg.axis().orient('left')
      };

      axes.x.scale(scales.x)
          .tickFormat(function(d){ 
                                   if ( xAxisTitle == "Year" ) 
                                     { return d.getFullYear(); } 
                                   else
                                     { return d; } 
                                 });
      axes.y.scale(scales.y);
  
      scales.y.range([chartHeight, 0]);
      scales.x.rangeRoundBands([0, chartWidth]);
      
      scales.x.domain(plotValues.map(function (d){ return d.key; }));
      scales.y.domain([0, d3.max(plotValues.map(function(d){ return d.value; }))]).nice();


      return { barSpacing: barSpacing, padding: padding, ticksReq: ticksReq, 
               chartWidth: chartWidth, chartHeight: chartHeight,
               width: width, height: height,
               scales: scales, axes: axes
             }
    }

    var addSVG = function(){

      var deco = decoration(); 
      console.log("deco"); 
      console.dir(deco); 
      console.log("deco ticksReq"); 
      console.dir(deco.ticksReq); 
      var whichChart = "#" + xAxisTitle;
      //var removeChart = d3.select(whichChart)
      //removeChart.selectAll('*').remove();
      var removeChart = "svg" + whichChart;
      $(removeChart).remove();

      $('#' + xAxisTitle + '-outer').append("<svg class='chart' id='" + xAxisTitle + "'></svg>");
  
      var svg = d3.select("svg#" + xAxisTitle)
                  .attr({ width: decoration().width, height: decoration().height });
    
      var chart = svg.append('g')
                     .attr({ transform: function (d){ 
                             return 'translate(' + decoration().padding.left + ',' + decoration().padding.top + ')'; 
                                                  } 
                          });
   
      if ( decoration().ticksReq >= 20 ) {
          var rotateText = -65,
                 shiftDX = "-.8em",
                 shiftDY = "-.5em",
              anchorText = "end";
      }
      else {
          var rotateText = 0,
                 shiftDX = "-.1em",
                 shiftDY = "1em",
              anchorText = "middle";
      }
    
      chart.append('g') 
           .attr({ class: 'x axis', transform: 'translate(0,' + decoration().chartHeight + ')' })
           .call(decoration().axes.x)
           .selectAll("text")  
             .style("text-anchor", anchorText)
             .attr("dx", shiftDX)
             .attr("dy", shiftDY)
             .attr("transform", "rotate(" + rotateText + ")" );
    
 /* temp out
      if ( decoration().ticksReq < 20 ) {
        chart.selectAll("text")  
             .call(wrap, scales.x.rangeBand());
      }
        // note that the above call to wrap method is taking the current context (i.e. selectAll("text") )
        // and x.rangeBand as parameters
*/
    
      chart.append('g') 
           .attr({ class: 'y axis', height: decoration().chartHeight })
           .call(decoration().axes.y); 
    
      chart.selectAll('.axis line, .axis path')
           .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '2px'});
    
      //Add chart title
      chart.append("text")
            .attr("x", (decoration().width / 2))             
            .attr("y", 0 - (decoration().padding.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "12px") 
            .style("text-decoration", "underline")  
            .text(function(d){ return yAxisTitle + " / " + xAxisTitle });
    
      //Add y-axis title
      chart.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 0 - decoration().padding.left/2-5)
           .attr("x",0 - (decoration().height / 4))
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .style("font-size", "12px") 
           .text("# Deaths");
    
      //Add x-axis title
      chart.append("text")
           .attr("y", decoration().height - decoration().padding.top - decoration().padding.bottom )
           .attr("x",decoration().width - decoration().padding.left + 30)
           .attr("dx", "1em")
           .style("text-anchor", "middle")
           .style("font-size", "12px") 
           .text(function(){ return xAxisTitle; });
    }

    addSVG();
    return {decoration: decoration, addSVG: addSVG };
      
  }

  myApp.drawAllCharts = function(){
    var whichCharts = eish.chartConfig();
    Object.keys(whichCharts).forEach(function(d,i){ 
            if ( whichCharts[d] instanceof Object ) 
            {
              var directives = whichCharts[d];
              var chartData = directives[d];
              var xAxisTitle = directives["xAxisTitle"];
              var yAxisTitle = directives["yAxisTitle"];
              var newDiv = $('<div>')
              $(newDiv).attr('id',xAxisTitle+'-outer').addClass('report-group'); 
              $('.chart-container').append( $(newDiv) );
              eish.drawChart(chartData, xAxisTitle, yAxisTitle);
              //if ( xAxisTitle == "Cause" ) 
              //{
                //listValues(chartData, xAxisTitle, yAxisTitle);
              //}
            }
            else
            {
               console.log("Unexpected whichCharts entry");
            }
    });
  }

  return myApp;
})(eish || {});

