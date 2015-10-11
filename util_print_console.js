var eish = (function(myApp){

    myApp.print_console = function(filter, whichFilter){
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

