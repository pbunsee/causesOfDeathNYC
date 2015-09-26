var eish = (function(myApp){

  myApp.data = function(inVal){
    var handleType = function(inVal){
      if ( inVal instanceof Date )
       { var parseVal = inVal.getFullYear(); }
      else
       { var parseVal = inVal; }
      return parseVal;
    };
    return { handleType: handleType };
  }

  return myApp;
})(eish || {});

