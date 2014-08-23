'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Nostradamus Soccer';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Nostradamus Soccer | About';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Nostradamus Soccer | Sign In';
        // TODO: Authorize a user
        $scope.username = "";
        $scope.password = "";
        $scope.login = function () {
            if($scope.username==="ibarra@gmail.com" && $scope.password==="p4")
                $location.path('/profile');
            //else if ($scope.username==="ibarra@gmail.com" && $scope.password!=="p4") 
            else
                $location.path('/userprofile');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
        $scope.register = function() {
            $location.path('/register');
            return false;
        };

    }])

     // Path: /register
    .controller('RegisterCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Nostradamus Soccer | Register';
        // TODO: Register a new user
        $scope.login = function () {
            $location.path('/login');
            return false;
        };
    }])

    // Path: /userprofile
    .controller('userprofileCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Nostradamus | Users';
        // TODO: Register a new user

        $scope.isEditing = false;
        $scope.NameEdited = "";
        $scope.NewScore1 = 0;
        $scope.NewScore2 = 0;
        $scope.unsubscribedLeagues = [];
        $scope.subcribedLeagueGames = [];

        //Apply changes Date to be input
        $scope.ArrLeagues = [
        {
            nombre: 'BBVA', pais: 'Spain', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 20, id: 1
        },
        {
            nombre: 'Calcio', pais: 'Italy', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 21, id: 2
        },
        {
            nombre: 'Premier League', pais: 'England', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 15, id: 3
        },
        {
            nombre: 'League 1', pais: 'France', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 21, id: 4
        },
        {
            nombre: 'Bundesliga', pais: 'Germany', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 15, id: 5
        }];
 
        $scope.ArrMatches = [{ nombre: 'Real Madrid vs Espanyol', _leagueID: 1, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Villareal vs Valencia', _leagueID: 1, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Atletico de Madrid vs Barcelona', _leagueID: 1, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'New Castle vs Wigan', _leagueID: 3, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Manchester United vs Chelsea', _leagueID: 3, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Aston Villa vs Liverpool', _leagueID: 3, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'AS Roma vs Juventus', _leagueID: 2, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'AC Milan vs Napoi', _leagueID: 2, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Genoa vs Fiorentina', _leagueID: 2, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Marseille vs Lyon', _leagueID: 4, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Monaco vs Reims', _leagueID: 4, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Toulouse vs Lens', _leagueID: 4, gameDate: new Date(), score1: 0, score2: 0 },
                       { nombre: 'Bayern Munich vs Werder Bremen', _leagueID: 5, gameDate: new Date(), score1: 0, score2: 0 }
        ];

  
        $scope.addLeague = function (nombre) {
            for (var i = 0; i < $scope.unsubscribedLeagues.length; i++) {
                if ($scope.unsubscribedLeagues[i].nombre === nombre) {
                    $scope.ArrLeagues.push($scope.unsubscribedLeagues[i]);
                    $scope.unsubscribedLeagues.splice(i, 1);
                    refresh();
                }
            }

        };

        var refresh = function() {
            if ($scope.subcribedLeagueGames.length > 0)
                $scope.subcribedLeagueGames.splice(0, $scope.subcribedLeagueGames.length);
            for (var i = 0; i < $scope.ArrMatches.length; i++) {
                if (isLeagueActive($scope.ArrMatches[i]._leagueID) === true) {
                    $scope.subcribedLeagueGames.push($scope.ArrMatches[i]);
                }
            }
        };

        //Not sure if used below? o.O
        refresh();
        //

        //Apply changes:: flag it
        var isLeagueActive = function (id) {
            for (var i = 0; i < $scope.ArrLeagues.length; i++) {
                if ($scope.ArrLeagues[i].id === parseInt(id)) {
                    return true;
                }
            }
            return false;
        };

        $scope.activate = function(edited) {
            $scope.isEditing = true;
            $scope.NameEdited = edited;
        };

        $scope.IsFinishedAddingScore = function() {
            $scope.isEditing = false;
            $scope.NameEdited = "";
            $scope.NewScore1 = 0;
            $scope.NewScore2 = 0;
        };

        $scope.removeLeague = function (nameLeague) {
            for (var i = 0; i < $scope.ArrLeagues.length; i++) {
                if ($scope.ArrLeagues[i].nombre === nameLeague) {
                    $scope.unsubscribedLeagues.push($scope.ArrLeagues[i]);
                    $scope.ArrLeagues.splice(i, 1);
                    refresh();
                }
            }
        };

        $scope.FinishEditing = function() {
            for (var i = 0; i < $scope.ArrMatches.length; i++) {
                if ($scope.ArrMatches[i].nombre === $scope.NameEdited && $scope.NewScore1 > -1 && $scope.NewScore2 > -1) {
                    $scope.ArrMatches[i].score1 = $scope.NewScore1;
                    $scope.ArrMatches[i].score2 = $scope.NewScore2;
                }
            }
            IsFinishedAddingScore();
        };

    }])

     // Path: /forgot-password
    .controller('ForgotPasswordCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Soccer | Recover Password';
        // TODO: Forgot password

        //Message Not Shown:: Check HTML CODE 
        $scope.RecoverPassword = function () {
            $scope.ShowMessage = true;
           // $location.path('/RecoverPassword');
            return false;
        };
    }])



      // Path: /profile
    .controller('ProfileCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Nostradamus Soccer | Profile';
        // TODO: Forgot password

        //Remaster _leagueID to be INT
        $scope.newLeague = false;
        $scope.adding = false;
        $scope._leagueName = "";
        $scope._country = "";
        $scope._leagueID = "";
        $scope.ArrLeagues = [
        {
            nombre: 'BBVA', pais: 'Spain', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 20, id: 1, active: true
        },
        {
            nombre: 'Calcio', pais: 'Italy', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 21, id: 2, active: true
        },
        {
            nombre: 'Premier League', pais: 'England', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 15, id: 3, active: true
        },
        {
           nombre: 'League 1', pais: 'France', seasonStart: new Date(),
           seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 21, id: 4, active: true
        },
        {
            nombre: 'Bundesliga', pais: 'Germany', seasonStart: new Date(),
            seasonEnd: new Date().setMilliseconds(387564395), numberOfTeams: 15, id: 5, active: true
        }];

        $scope.ordenarPor = function (orden) {
            $scope.OrdenSeleccionado = orden;
        };

        $scope.auxAddLeague = function() {
            $scope.adding = false;
            $scope._leagueName = "";
            $scope._country = "";
            $scope._leagueID = "";
        };

        $scope.addNewLeague = function () {
            $scope.ArrLeagues.push({
                nombre: $scope._leagueName,
                pais: $scope._country,  
                seasonStart: new Date(),
                seasonEnd: new Date(),
                numberOfTeams: 0,
                active: true,
                id: parseInt($scope._leagueID)
            });
            auxAddLeague();
        };

        $scope.activate= function() {
            $scope.adding = true;
        };

        $scope.IsFinishedAddTeam = function() {
            $scope.adding = false;
            $scope._leagueName = "";
            $scope._country = "";
            $scope._leagueID = "";
        };
    }])

      // Path: /league
    .controller('LeagueCtrl', ['$scope', '$location', '$window','$stateParams', function ($scope, $location, $window, $stateParams) {
        $scope.$root.title = 'Nostradamus Soccer | League';

        console.log($stateParams.id);
   // Le Variable :: Validate  NoONLYNumbersAllowed
        $scope.FilterTeams = [];
        $scope.IsAddingMatch = false;
        $scope.IsEditingScore = false;
        $scope.isEditing = false;
        $scope.IsAddingTeam = false;
        $scope.leName1 = "";
        $scope.leName2 = "";
        $scope.MatchScore1 = 0;
        $scope.MatchScore2 = 0;
        $scope.Field = "";
        $scope.Field2 = "";
        $scope._NewScore = 0;
        $scope._NewScore2 = 0;
        $scope._MNP = "";
        $scope._MNPD = "";
        $scope._MNPT = "";
        $scope._MNPC = "";
        $scope._TeamName = "";
        $scope.isEditing = false;
        $scope.Activated = true;
        $scope.TeamExName = "";
        $scope.TeamNewName = "";
        $scope.NoNumbers = false;
        $scope.ArrMatches = [];

        $scope.teams = [{ nombre: 'Levante', _leagueID: 1, active: true },
                { nombre: 'Barcelona', _leagueID: 1, active: true },
                { nombre: 'Madrid', _leagueID: 1, active: true },
                { nombre: 'Liverpool', _leagueID: 3, active: true },
                { nombre: 'Manchester', _leagueID: 3, active: true },
                { nombre: 'Chelsea', _leagueID: 3, active: true },
                { nombre: 'Genova', _leagueID: 2, active: true },
                { nombre: 'Cagliari', _leagueID: 2, active: true },
                { nombre: 'Inter', _leagueID: 2, active: true },
                { nombre: 'Monaco', _leagueID: 4, active: true },
                { nombre: 'Paris', _leagueID: 4, active: true },
                { nombre: 'France', _leagueID: 4, active: true },
                { nombre: 'Bayern Munich', _leagueID: 5, active: true },
                { nombre: 'Dortmund', _leagueID: 5, active: true },
                { nombre: 'Shalke 04', _leagueID: 5, active: true },
                { nombre: 'Werder Bremen', _leagueID: 5, active: true }
        ];


        $scope.RestoreValuesMatch = function() {
            $scope.IsAddingMatch = false;
            $scope.leName1 = "";
            $scope.leName2 = "";
            $scope.MatchScore1 = 0;
            $scope.MatchScore2 = 0;
        };

        $scope.MatchToArray = function () {
            $scope.ArrMatches.push({
                nombre1: $scope.leName1,
                nombre2: $scope.leName2,
                id: $stateParams.id,
                score1: $scope.MatchScore1,
                score2: $scope.MatchScore2
        });

            RestoreValuesMatch();
        };

        var refresh = function () {
            $scope.FilterTeams = [];
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i]._leagueID === parseInt($stateParams.id)) {
                    $scope.FilterTeams.push($scope.teams[i]);
                }
            }
        };

        $scope.cancelMatchEdit = function () {
            $scope.isEditingMatch = false;
            $scope._MNP = "";
            $scope._MNPD = "";
            $scope._MNPT = "";
            $scope._MNPC = "";
        };

        $scope.AddMatchFunc = function () {
            $scope.IsAddingMatch = true;
            $scope.IsAddingTeam = false;
            $scope.isEditing = false;
            $scope.IsEditingScore = false;
        };

        var auxcancelEdit = function () {
            $scope.isEditing = false;
            $scope.NoNumbers = false;
        };

        $scope.cancelTeamAdd = function () {
            $scope.IsAddingTeam = false;
            $scope.TeamNewName = "";

        };

        $scope.editTeam = function (teamname) {
            $scope.isEditing = true;
            $scope.IsAddingMatch = false;
            $scope.IsAddingTeam = false;
            $scope.IsEditingScore = false;
            $scope.TeamExName = teamname;
            $scope.TeamNewName = teamname;

        };


        $scope.IsTeamNameFinished = function () {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].nombre === $scope.TeamExName && isNaN($scope.TeamNewName) == true) {
                    $scope.teams[i].nombre = $scope.TeamNewName;
                    auxcancelEdit();
                    $scope.TeamExName = "";
                    $scope.TeamNewName = "";
                } else {
                    $scope.NoNumbers = true;
                    $scope.isEditing = true;
                }
            }
            refresh();
        };

        $scope.activateNewTeam = function () {
            $scope.IsAddingTeam = true;
            $scope.isEditing = false;
            $scope.IsAddingMatch = false;
            $scope.IsEditingScore = false;
        };


        //Not sure if used below?
        refresh();
        //

        $scope.addNewTeam = function(){
            var team = {nombre: $scope._TeamName, _leagueID:parseInt($stateParams.id), active:true};
            $scope.teams.push(team);
            refresh();
            $scope._TeamName = "";
        };

        $scope.deleteTeam = function(nombre) {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].nombre === nombre) {
                    $scope.teams.splice(i, 1);
                    refresh();
                }
            }
        };

        $scope.cancelEdit = function (team) {
            auxcancelEdit();
        };

        $scope.IsActiveEditingScore = function (name1, name2) {
            $scope.IsEditingScore = true;
            $scope.IsAddingMatch = false;
            $scope.isEditing = false;
            $scope.IsAddingTeam = false;
            $scope.Field = name1;
            $scope.Field2 = name2;
        };

        //remember modify functionality:: add message for noNegativeNumbersScore
        $scope.addResultado = function () {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.ArrMatches[i].nombre1 === $scope.Field && $scope.ArrMatches[i].nombre2 === $scope.Field2 && $scope._NewScore>-1 && $scope._NewScore2>-1)
                    $scope.ArrMatches[i].score1 = $scope._NewScore;
                     $scope.ArrMatches[i].score2 = $scope._NewScore2;
            }
            $scope.IsEditingScore = false;
            $scope.Field0 = "";
            $scope._NewScore = 0;
            $scope._NewScore2 = 0;
        };

        $scope.IsFinishedAddingScore = function () {
            $scope.IsEditingScore = false;
            $scope._NewScore = 0;
            $scope._NewScore2 = 0;
        }

        $scope.finishMEdit = function () {
            for (var i = 0; i < $scope.ArrMatches.length; i++) {
                if ($scope.ArrMatches[i].nombre1 === $scope._MNP && $scope.ArrMatches[i].nombre2 === $scope._MNPD) {
                    $scope.ArrMatches[i].nombre1 = $scope._MNPT;
                    $scope.ArrMatches[i].nombre2 = $scope._MNPC;
                }

            }
            cancelMatchEdit();
        }
   
        $scope.activateMatchEdit = function (nameParam1, nameParam2) {
            $scope.isEditingMatch = true;
            $scope.IsEditingScore = false;
            $scope.IsAddingMatch = false;
            $scope.isEditing = false;
            $scope.IsAddingTeam = false;
            $scope._MNP = nameParam1;
            $scope._MNPD = nameParam2;
        }

    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);