var eish = (function(myApp){

    myApp.print_console = function(filter, whichFilter){
      console.log("eish.global.genderDim");
      console.dir(eish.global.genderDim);
      //var filter = myApp.global.genderDim, 
          //whichFilter = "eish.global.genderDim";

      var f=eval(filter);
      if (typeof(f.length) != "undefined") {} else {}
      if (typeof(f.top) != "undefined") {f=f.top(Infinity);} else {}
      if (typeof(f.dimension) != "undefined") 
        {f=f.dimension(function(d) { return "";}).top(Infinity);} 
      else 
        {}
      console.groupCollapsed(whichFilter);
      console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t")
                                                              .replace(/}\,/g,"},\n\t")
                                                              .replace("]","\n]"));
      console.groupEnd();
      };

  return myApp;
})(eish || {});

