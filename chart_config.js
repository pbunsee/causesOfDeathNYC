var eish = (function(myApp){

  myApp.chartConfig = function(){ 
    var hashCharts = new Object();
    
    var directives = new Object();
    directives["deathsPerGender"] = Object(eish.global.deathsPerGender); 
    directives["xAxisTitle"] = "Gender"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerGender"] = directives;
  
    var directives = new Object();
    directives["deathsPerEthnicity"] = Object(eish.global.deathsPerEthnicity); 
    directives["xAxisTitle"] = "Ethnicity"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerEthnicity"] = directives;
  
    var directives = new Object();
    directives["deathsPerCause_top5"] = Object(eish.global.deathsPerCause_top5); 
    directives["xAxisTitle"] = "Causes_Top5"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerCause_top5"] = directives;
  
    var directives = new Object();
    directives["deathsPerYear"] = Object(eish.global.deathsPerYear); 
    directives["xAxisTitle"] = "Year"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerYear"] = directives;
  
    var directives = new Object();
    directives["deathsPerCause"] = Object(eish.global.deathsPerCause); 
    directives["xAxisTitle"] = "Cause"; 
    directives["yAxisTitle"] = "Deaths";
    hashCharts["deathsPerCause"] = directives;
  
    myApp.global.hashCharts = hashCharts;

    eish.print_console(eish.global.hashCharts, "eish.global.hashCharts");
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

    return myApp.global.hashCharts;
  };
  
  myApp.drawChart = function(plotValues, xAxisTitle, yAxisTitle){

    var decoration = function(){
      var barSpacing = 2; 
      var padding = { left: 120, right: 0, top: 20, bottom: 70 };
      var ticksReq = plotValues.length;
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
             .call(wrap, decoration().scales.x.rangeBand());
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
      appendBars(chart);
    }

    var appendBars = function(chart){
      var bars = chart.selectAll('g.bar-group')
                      .data(plotValues)
                      .enter()
                      .append('g') 
                      .attr({ transform: function (d, i) 
                                { return 'translate(' + decoration().scales.x(d.key) + ', 0)'; }, 
                              class: 'bar-group'
                            })
          .on('click', function(d){
             d3.select(".popup").remove();
             contextMenuShowing = false;
          })
          .on('mouseover', function(d) {      
             eish.tooltip(d).show();
             /*
             if ( contextMenuShowing == false ) {
               tooltipDiv.transition()        
                         .duration(200)      
                         .style("opacity", .9);      
               tooltipDiv.html(eish.data().handleType(d.value))  
                         .style("left", (d3.event.pageX - 90) + "px")     
                         .style("top", (d3.event.pageY - 180) + "px");    
                }
             */
          })                  
          .on('mouseout', function(d) {       
             eish.tooltip(d).hide();
                /*
                tooltipDiv.transition()        
                          .duration(500)      
                          .style("opacity", 0) 
                */
          })
          .on('contextmenu', function(d) {       
             eish.tooltip(d).hide();
                /*
                tooltipDiv.transition()        
                          .duration(0)      
                          .style("opacity", 0) 
                */
          });
    
    
      bars.append('rect')
          .on('click', function(d){
             var d3_target = d3.select(d3.event.target);
             d = d3_target.datum();
             var descriptor = this.getAttribute('class');
             descriptor = descriptor.replace('bar ', '').toLowerCase();
             descriptor = descriptor.replace('tomato ', '').toLowerCase();
    
             if ( descriptor == 'causes_top5') { descriptor = 'cause' }
    
             if ( descriptor == 'year') 
             { 
               //convert the selected year value toISOString();
               //what is the current selected year?
               var selectedYear = "'" + d.key.toISOString() + "'";
               console.log("selectedYear" + selectedYear);
               //build and return a statement (to be evaluated in FuncDo) 
               //which will convert the crossfilter year value toISOString();
               //and compare the selectedYear and the crossfilter year - if matching, return d;
               descriptor = "eish.global." + descriptor + "Dim.filterFunction(function(d){" + 
                            " if ( d.toISOString() == " + selectedYear + " ) " + 
                            " { return d; } " +
                            "})";
               console.log("descriptor is now: " + descriptor);
             }
             else
             {
               descriptor = "eish.global." + descriptor + "Dim.filterExact('" + d.key + "')";
             }
    
             if ( this.getAttribute('class') == 'bar tomato ' + xAxisTitle )
             { 
               $(this).css('fill', 'rgb(187, 187, 187)'); 
               var classVal = 'bar ' + xAxisTitle; 
               this.setAttribute('class', classVal); 
               if ( $.inArray(descriptor, eish.global.currentFilters) > -1 )
               {
                 //remove the filter from the currentFilters
                 var pos = eish.global.currentFilters.indexOf(descriptor);
                 if (pos > -1) 
                 {
                   eish.global.currentFilters.splice(pos, 1);
                   eish.filter().refreshMsg();
                 }
               }
               descriptor = '';
             }
             else
             { 
               $(this).css('fill', 'tomato'); 
               if ( $.inArray(descriptor, eish.global.currentFilters) == -1 )
               {
               eish.global.currentFilters.push(descriptor);
               eish.filter().refreshMsg();
               }
               var classVal = 'bar tomato ' + xAxisTitle; 
               this.setAttribute('class', classVal); 
               var funcDo = new Function(descriptor);
               console.log(funcDo);
               if ( funcDo instanceof Function ) 
                 { 
                   return(funcDo());
                 }
               else
                 {
                   console.log("Not a function - cannot execute funcDo()");
                 }
             }
            })
          .attr({
            y: decoration().chartHeight,
            height: 0,
            width: function(d){ return decoration().scales.x.rangeBand(d) - 2; },
            class: function(d){ return 'bar ' + xAxisTitle; }
            })
          .transition()
          .duration(2000)
          .attr({
            y: function(d){ return decoration().scales.y(d.value); },
            height: function(d){ return decoration().chartHeight - decoration().scales.y(d.value); }
          });
    }

    addSVG();
    return {decoration: decoration, addSVG: addSVG, appendBars: appendBars };
  }

  myApp.drawAllCharts = function(){
    eish.tooltip().init();
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

