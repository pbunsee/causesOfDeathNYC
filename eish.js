var eish = (function(myApp){
  'use strict';

  $(document).on('ready page:load',function(){
    console.log("ready!");
    eish.load();
    //eish.prep();
    //eish.global = eish.prep();
  });

  return myApp;

})(eish || {});

