(function(){
  angular.module('Rails5')
    .controller('rails5Controller', rails5Controller);

  function rails5Controller($http){

    var self = this;        
    var server = "https://radiant-ravine-24313.herokuapp.com/api/"
    // For example, var server = 'https://enigmatic-garden-65625.herokuapp.com/api/'

    self.doctors = [];

    $http.get(`${server}/doctors`)
      .then(function(response) {
        self.doctors = response.data;
        console.log(self.doctors);
    });
  }
})()
// best practice
// IIFE- protects the global namespace
// helps with minification