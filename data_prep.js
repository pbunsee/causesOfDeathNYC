var eish = (function(myApp){

  myApp.prep = function(){ 
    myApp.global.ndx = crossfilter(myApp.global.parsed_data);

    myApp.global.yearDim = myApp.global.ndx.dimension(function(d){return d.year;});
    myApp.global.genderDim = myApp.global.ndx.dimension(function(d){return d.gender;});
    myApp.global.ethnicityDim = myApp.global.ndx.dimension(function(d){return d.ethnicity;});
    myApp.global.causeDim = myApp.global.ndx.dimension(function(d){return d.cause;});

    myApp.global.deathsPerYear = myApp.global.yearDim
                                             .group()
                                             .reduceSum(function(d){ return +d.count; })
                                             .all();

    myApp.global.deathsPerCause = myApp.global.causeDim
                                              .group()
                                              .reduceSum(function(d){ return +d.count; })
                                              .all();

    myApp.global.deathsPerCause_top5 = myApp.global.causeDim
                                                   .group()
                                                   .reduceSum(function(d){ return +d.count; })
                                                   .top(5);

    myApp.global.deathsPerGender = myApp.global.genderDim
                                               .group()
                                               .reduceSum(function(d){ return +d.count; })
                                               .all();

    myApp.global.deathsPerEthnicity = myApp.global.ethnicityDim
                                                  .group()
                                                  .reduceSum(function(d){ return +d.count; })
                                                  .all();

    myApp.global.grandTotal = myApp.global.ndx.groupAll()
                                              .reduceSum(function(d) { return +d.count; })
                                              .value();
    
    return myApp.global;
  };

  return myApp;
})(eish || {});

