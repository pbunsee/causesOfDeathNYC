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
  
  return myApp;
})(eish || {});

