var eish = (function(myApp){

  myApp.persistence = function(){ 
    var supports_localStorage = function(){
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    };
    
    var getFilterCookie = function(){
      Cookies.get('currentFilters');
    };
    
    var setFilterCookie = function(currentFilters){
      if ( currentFilters != '' && currentFilters != null )
      {
        Cookies.set('currentFilters', currentFilters);
      }
    };

    var init = function(){
      if ( supports_localStorage() )
        {
          console.log("This browser supports HTML5 localStorage"); 
          eish.global.persistMode = 'use localStorage';
          return 'use localStorage';
        }
      else
        {
          console.log("localStorage is not supported by this browser! App will use cookies instead."); 
          eish.global.persistMode = 'use cookies';
          return 'use cookies';
        }
    };
    return { init: init, setFilterCookie: setFilterCookie };

  };
    //persistence();

  myApp.filter = function(){ 
    var resetFilters = function(){
        /* This function takes care of the following:
        eish.global.genderDim.filterAll();
        eish.global.causeDim.filterAll();
        eish.global.yearDim.filterAll();
        eish.global.ethnicityDim.filterAll();*/
  
        var hashFilters = new Object();
        hashFilters["eish.global.yearDim"] = Object(eish.global.yearDim);
        hashFilters["eish.global.genderDim"] = Object(eish.global.genderDim);
        hashFilters["eish.global.ethnicityDim"] = Object(eish.global.ethnicityDim);
        hashFilters["eish.global.causeDim"] = Object(eish.global.causeDim);
        Object.keys(hashFilters).forEach(function(d,i){ 
                                                        hashFilters[d].filterAll();
                                                      });
  
    };

    var init = function(){
      resetFilters();
      eish.persistence.init();
    };

    var get = function(){
      if ( eish.global.persistMode === 'use localStorage' )
        {
          //localStorage stores the data as string - JSON.parse to convert from string to object
          if ( localStorage.getItem("currentFilters") === null )
            {
              console.log("currentFilters not found in localStorage.");
            }
          else
            {
              console.log("currentFilters from localStorage.");
              var persistedFilters = localStorage.getItem("currentFilters");
              return persistedFilters;
            }
        }
      else
        {
          getFilterCookie('currentFilters'); 
        }
      eish.filter().refreshMsg();
    };

    var set = function(){
      if ( eish.global.persistMode === 'use localStorage' )
        {
          console.log("applyFilters with currentFilters in localStorage: ");
          console.dir(eish.global.currentFilters);
          localStorage.setItem("currentFilters", JSON.stringify(eish.global.currentFilters)); 
        } 
      else
        {
          console.log("applyFilters with currentFilters in cookies: ");
          console.dir(eish.global.currentFilters);
          eish.persistence().setFilterCookie(eish.global.currentFilters); 
        }
      eish.filter().refreshMsg();
    };

    var clear = function(){
      console.log("in clear function - currentFilters");
      console.dir(eish.global.currentFilters);
      eish.global.currentFilters = [];
      resetFilters();
      if ( eish.global.persistMode === 'use localStorage' )
        {
          localStorage.clear();  //how to clear only the one item we want to?
        }
      else
        {
          eish.persistence().setFilterCookie();
        }
    };

    var refreshMsg = function(){
      if ( eish.global.currentFilters === "" )
        {
          var defaultMsg = 'NO FILTERS APPLIED. ' + 
                           '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                           'To filter the data, click on any bar or any combination of bars ' +
                           'from various charts & click on the "Apply Filters" button.';
          $('#filterInEffect').html(defaultMsg);
        }
        {
          var msgFilters =  eish.global.currentFilters.map(function(d){ 
            var stripStr = d;
            if ( stripStr.indexOf("year") >= 0 )
              { 
                stripStr = stripStr.replace('eish.global.yearDim.filterFunction(function(d){ if ( d.toISOString() == ','');
                stripStr = stripStr.replace(' )  { return d; } })','');
                var tempStr = stripStr.replace('year','');
                tempStr = tempStr.replace("'","");
                tempStr = tempStr.replace('Dim.filterFunction(function(d){ if ( d.toISOString() == ','');
                tempStr = tempStr.replace(/\)+$/,'');
                tempStr = tempStr.substr(0,4);
                stripStr = 'year: ' + tempStr;
              }
            else
              { 
                stripStr = stripStr.replace('eish.global.','');
                stripStr = stripStr.replace('Dim.filterExact(',': ');
                stripStr = stripStr.replace(')',''); 
              }
            return ' | ' + stripStr;
          });
          $('#filterInEffect').html(msgFilters);
        }
    };

    return { init: init, get: get, set: set, clear: clear, refreshMsg: refreshMsg };
  }

  return myApp;
})(eish || {});

