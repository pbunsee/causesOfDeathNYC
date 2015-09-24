var eish = (function(myApp){

  myApp.load = function(){ var gil = ''; 
    var countRecs = 0;
    var fileName = "NYC_deathStats.csv";
    d3.csv(fileName,function(d) {
      countRecs++;
      return {
        year: d.Year,
        ethnicity: d.Ethnicity,
        gender: d.Sex,
        cause: d.CauseofDeath,
        count: +d.Count,
        percent: +d.Percent
      };
    }, function(error, rows) {
      if (error) throw error;
      console.log("Any errors? " + error);
      var parsed_data = rows;
   
      var parseDate = d3.time.format("%Y").parse;
      parsed_data.forEach(function(d) {
        d.year = parseDate(d.year);
      });
      var introText = countRecs + " records loaded from file '" + fileName + "'";
      $('#intro').html(introText);
      eish.global.parsed_data = parsed_data;
      eish.prep();
    });
  };

  return myApp;
})(eish || {});

