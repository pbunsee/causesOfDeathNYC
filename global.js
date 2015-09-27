var eish = (function(myApp){

  myApp.global = { 
    parsed_data: [],
    ndx: '',
    yearDim: '', 
    genderDim: '', 
    ethnicityDim: '', 
    causeDim: '', 
    deathsPerYear: '', 
    deathsPerCause: '', 
    deathsPerCause_top5: '', 
    deathsPerGender: '', 
    deathsPerEthnicity: '',
    grandTotal: 0, 
    contextMenuActive: false, 
    persistMode: '', 
    currentFilters: []
  }

  return myApp;
})(eish || {});

