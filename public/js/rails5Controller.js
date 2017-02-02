(function(){
  angular.module('Rails5')
    .controller('rails5Controller', rails5Controller);
    // add a controller to the app, using the function below

  function rails5Controller($http) {

    var self = this;        
    // var server = "https://radiant-ravine-24313.herokuapp.com/api/"
    var server = "http://localhost:3000/api/"
    // For example, var server = 'https://enigmatic-garden-65625.herokuapp.com/api/'

    self.appointments_with_names = [];

     $http.get('http://localhost:3000/api/appointments/get_all')
      .then(function(response) {
        // console.log(response.data);
        var doctors = response.data.doctors;
        var patients = response.data.patients;
        var appointments = response.data.appointments;

        for (var i = 0; i < appointments.length; i++){
          for (var j = 0; j < patients.length; j++){
            for (var k = 0; k < doctors.length; k++) {
              var new_appt = {};

              if (appointments[i].patient_id === patients[j].id) {
                if (appointments[i].doctor_id === doctors[k].id) {
                  new_appt.patient_name = patients[j].name
                  new_appt.day = appointments[i].day
                  new_appt.location = appointments[i].location
                  new_appt.doctor_name = doctors[k].name
                  new_appt.reason = appointments[i].reason
                  self.appointments_with_names.push(new_appt);
                }
              }
            }
          }
        }
        console.log(self.appointments_with_names);
        return self.appointments_with_names;

    });


    self.doctors = [];

    $http.get(`${server}/doctors`)
      .then(function(response) {
        self.doctors = response.data;
        console.log(self.doctors);
    });

    self.patients = [];

    $http.get(`${server}/patients`)
      .then(function(response) {
        console.log(self.patients);
        return self.patients = response.data;
      })
      .then(function(patients) {

      });

    self.appointments = [];

    $http.get(`${server}/appointments`)
      .then(function(response) {
        self.appointments = response.data;
        console.log(self.appointments);
    });
  }
})()
// best practice
// IIFE- protects the global namespace
// helps with minification