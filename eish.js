var eish = (function(myApp){

  $(document).on('ready page:load',function(){
    console.log("ready!");
    eish.load();
  });

  return myApp;
})(eish || {});

