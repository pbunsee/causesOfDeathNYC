var eish = (function(myApp){

  myApp.filter = function(){ 
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
      eish.filter.refreshMsg();
    };

    var set = function(){
      if ( eish.global.persistMode === 'use localStorage' )
        {
          console.log("applyFilters with currentFilters in localStorage: ");
          console.dir(filterSet);
          localStorage.setItem("currentFilters", JSON.stringify(filterSet)); 
        } 
      else
        {
          console.log("applyFilters with currentFilters in cookies: ");
          console.dir(filterSet);
          setFilterCookie(filterSet); 
        }
      eish.filter.refreshMsg();
    };

    var remove = function(){
      if ( eish.global.persistMode === 'use cookies' )
        {}
      else
        {}
    };

    var clear = function(){
      console.log("in Filters class clear function - currentFilters");
      console.dir(currentFilters);
      global.currentFilters = [];
      resetFilters();
      if ( eish.global.persistMode === 'use localStorage' )
        {
          localStorage.clear();  //how to clear only the one item we want to?
        }
      else
        {
          setFilterCookie();
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
          $('#filterInEffect').html(eish.global.currentFilters);
        }
    };

    return { init: init, get: get, set: set, remove: remove, clear: clear, refreshMsg: refreshMsg };
  }

  return myApp;
})(eish || {});
