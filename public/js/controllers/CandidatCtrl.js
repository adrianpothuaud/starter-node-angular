// View Controller for candidat.html HTML Template

angular.module('CandidatCtrl', []).controller('CandidatController', function($scope, $http, $location) {

    const INFO_LIMIT = 5

    // Request the API to get user informations
    $scope.$watch($http.get($location.protocol() + '://' + $location.host() + ':' + $location.port() + "/api" +
            "onsiteactionskey4YHTE7" +
            "/candidats/" +
            $location.search().id)
        .then(function(response) {
            // set $scope attribute with user informations
            $scope.userResponse = response;
        }).then(function() {
            // Request the API to get Events informations
            $http.get($location.protocol() + '://' + $location.host() + ':' + $location.port() + "/api" +
                    "onsiteactionskey4YHTE7" +
                    "/events")
                .then(function(response) {
                    // set $scope attribute with events list
                    $scope.eventsResponse = response;
                })
                .then(function() {
                    $scope.$evalAsync(function() {
                        // Welcome message configuration
                        $scope.msgWelcomeCandidat = 'Bienvenue ' + $scope.userResponse.data.firstname + ' ' + $scope.userResponse.data.lastname + ' !';
                        // Profile progress bar configuration
                        // % value
                        $scope.profile_progressbar_valuenow = 0;
                        if ($scope.userResponse.data.firstname) $scope.profile_progressbar_valuenow += 20;
                        if ($scope.userResponse.data.lastname) $scope.profile_progressbar_valuenow += 20;
                        if ($scope.userResponse.data.email) $scope.profile_progressbar_valuenow += 20;
                        if ($scope.userResponse.data.connaissances.length > 0) $scope.profile_progressbar_valuenow += 20;
                        if ($scope.userResponse.data.experiences.length > 0) $scope.profile_progressbar_valuenow += 20;
                        // % value to string
                        $scope.profile_progressbar_valuenow_string = $scope.profile_progressbar_valuenow.toString();
                        // progress bar width
                        $scope.profile_progressbar_style = "width: " + $scope.profile_progressbar_valuenow + "%";
                        // progress bar class
                        $scope.profile_progressbar_class = "progress-bar progress-bar-danger";
                        if ($scope.profile_progressbar_valuenow > 25) {
                            if ($scope.profile_progressbar_valuenow > 50) {
                                if ($scope.profile_progressbar_valuenow > 75) {
                                    $scope.profile_progressbar_class = "progress-bar progress-bar-success";
                                } else {
                                    $scope.profile_progressbar_class = "progress-bar progress-bar-info";
                                }
                            } else {
                                $scope.profile_progressbar_class = "progress-bar progress-bar-warning";
                            }
                        }
                        // Selected events
                        // ... ToDo
                        // Accessible events configuration
                        // initialize events ongoing/upcoming/passed
                        $scope.onGoingEventsCpt = 0;
                        $scope.upComingEventsCpt = 0;
                        $scope.passedEventsCpt = 0;
                        $scope.selectedEventsCpt = 0;
                        $scope.onGoingEvents = [];
                        $scope.upComingEvents = [];
                        $scope.passedEvents = [];
                        $scope.selectedEvents = [];
                        // loop on events and set $scope
                        var now = new Date();
                        $scope.eventsResponse.data.forEach(function(element) {
                            // Compare Event dates and store events in the appropriate categorie
                            var beginD = new Date(element.dateBegin).getTime(),
                                endD = new Date(element.dateEnd).getTime();
                            // MongoDB -> String -> JavaScript Objects
                            element.dateBegin = new Date(element.dateBegin);
                            element.dateEnd = new Date(element.dateEnd);
                            if (beginD <= now.getTime() && now.getTime() <= endD) {
                                $scope.onGoingEventsCpt += 1;
                                if ($scope.onGoingEvents.length < INFO_LIMIT) {
                                    $scope.onGoingEvents = $scope.onGoingEvents.concat(element);
                                }
                            } else if (now.getTime() <= beginD) {
                                $scope.upComingEventsCpt += 1;
                                if ($scope.upComingEvents.length < INFO_LIMIT) {
                                    $scope.upComingEvents = $scope.upComingEvents.concat(element);
                                }
                            } else {
                                if ($scope.passedEvents.length < INFO_LIMIT) {
                                    $scope.passedEventsCpt += 1;
                                    if ($scope.passedEvents.length < INFO_LIMIT) {
                                        $scope.passedEvents = $scope.passedEvents.concat(element);
                                    }
                                }
                            }
                            // build selectedEvents
                            if (element.connaissancesRequises) {
                                element.connaissancesRequises.forEach(function(eventConnaissance) {
                                    $scope.userResponse.data.connaissances.forEach(function(userConnaissance) {
                                        if (eventConnaissance.name == userConnaissance.name) {
                                            if ($.inArray(element, $scope.selectedEvents) === -1) {
                                                $scope.selectedEventsCpt += 1
                                                $scope.selectedEvents = $scope.selectedEvents.concat([element])
                                            }
                                        }
                                    })
                                })
                            }
                            if (element.experiencesRequises) {
                                element.experiencesRequises.forEach(function(eventExperience) {
                                    $scope.userResponse.data.experiences.forEach(function(userExperience) {
                                        if (eventExperience.jobName == userExperience.jobName) {
                                            if ($.inArray(element, $scope.selectedEvents) === -1) {
                                                $scope.selectedEventsCpt += 1
                                                $scope.selectedEvents = $scope.selectedEvents.concat([element])
                                            }
                                        }
                                    })
                                })
                            }
                        }, this);

                        // use events in ng-repeat on HTML template candidat.html
                    });
                })
        }));
});