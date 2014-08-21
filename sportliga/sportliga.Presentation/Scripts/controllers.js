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
        //$scope.$root.title = 'SportLiga | userprofile';
        // TODO: Register a new user
        $scope.unsubsciptions = [];

        $scope.filteredMatches = [];

        $scope.ligas = [
        {
            nombre: 'BBVA', pais: 'Spain', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 20, id: 1
        },
        {
            nombre: 'Calcio', pais: 'Italy', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 21, id: 2
        },
        {
            nombre: 'Premier League', pais: 'England', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 15, id: 3
        },
        {
            nombre: 'League 1', pais: 'France', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 21, id: 4
        },
        {
            nombre: 'Bundesliga', pais: 'Germany', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 15, id: 5
        }];
 
        $scope.matches = [{ nombre: 'Real Madrid vs Espanyol', id_liga: 1, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Villareal vs Valencia', id_liga: 1, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Atletico de Madrid vs Barcelona', id_liga: 1, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'New Castle vs Wigan', id_liga: 3, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Manchester United vs Chelsea', id_liga: 3, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Aston Villa vs Liverpool', id_liga: 3, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'AS Roma vs Juventus', id_liga: 2, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'AC Milan vs Napoi', id_liga: 2, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Genoa vs Fiorentina', id_liga: 2, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Marseille vs Lyon', id_liga: 4, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Monaco vs Reims', id_liga: 4, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Toulouse vs Lens', id_liga: 4, fecha: new Date(), resultado1: 0, resultado2: 0 },
                       { nombre: 'Bayern Munich vs Werder Bremen', id_liga: 5, fecha: new Date(), resultado1: 0, resultado2: 0 }
        ];

        var leagueExists = function (id) {
            for (var i = 0; i < $scope.ligas.length; i++) {
                if ($scope.ligas[i].id.toString() === id) {
                    return true;
                }
            }
            return false;
        }

        var inicio = function () {
            if ($scope.filteredMatches.length > 0)
                $scope.filteredMatches.splice(0, $scope.filteredMatches.length);
            for (var i = 0; i < $scope.matches.length; i++) {
                if (leagueExists($scope.matches[i].id_liga.toString()) === true) {
                    $scope.filteredMatches.push($scope.matches[i]);
                }
            }
        }

        inicio();

        $scope.isEditing = false;
        $scope.NameEdited = "";
        $scope.NewScore1 = 0;
        $scope.NewScore2 = 0;


        $scope.activate = function(edited) {
            $scope.isEditing = true;
            $scope.NameEdited = edited;
        }

        $scope.deactivate = function() {
            $scope.isEditing = false;
            $scope.NameEdited = "";
            $scope.NewScore1 = 0;
            $scope.NewScore2 = 0;
        }

        $scope.FinishEditing = function() {
            for (var i = 0; i < $scope.matches.length; i++) {
                if ($scope.matches[i].nombre === $scope.NameEdited && $scope.NewScore1>-1 && $scope.NewScore2>-1) {
                    $scope.matches[i].resultado1 = $scope.NewScore1;
                    $scope.matches[i].resultado2 = $scope.NewScore2;
                }
            }
            $scope.isEditing = false;
            $scope.NameEdited = "";
            $scope.NewScore1 = 0;
            $scope.NewScore2 = 0;

        }
        $scope.addLeague = function(name) {
            for (var i = 0; i < $scope.unsubsciptions.length; i++) {
                if ($scope.unsubsciptions[i].nombre === name) {
                    $scope.ligas.push($scope.unsubsciptions[i]);
                    $scope.unsubsciptions.splice(i, 1);
                    inicio();
                }
            }
            
        }

        $scope.removeLeague = function (name) {
            
            for (var i = 0; i < $scope.ligas.length; i++) {
                if ($scope.ligas[i].nombre === name) {
                    $scope.unsubsciptions.push($scope.ligas[i]);
                    $scope.ligas.splice(i, 1);
                    inicio();
                }
            }
            
        }

     
    }])

     // Path: /forgot-password
    .controller('ForgotPasswordCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Soccer | Recover Password';
        // TODO: Forgot password
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
        $scope.ligas = [
        {
            nombre: 'BBVA', pais: 'Spain', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 20, id: 1, active: true
        },
        {
            nombre: 'Calcio', pais: 'Italy', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 21, id: 2, active: true
        },
        {
            nombre: 'Premier League', pais: 'England', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 15, id: 3, active: true
        },
        {
           nombre: 'League 1', pais: 'France', inicio: new Date(),
           fin: new Date().setMilliseconds(387564395), cant_equipos: 21, id: 4, active: true
        },
        {
            nombre: 'Bundesliga', pais: 'Germany', inicio: new Date(),
            fin: new Date().setMilliseconds(387564395), cant_equipos: 15, id: 5, active: true
        }];



        $scope.ordenarPor = function (orden) {
            $scope.OrdenSeleccionado = orden;
        };

        $scope.newLeague = false;
        $scope.adding = false;
        $scope.name = "";
        $scope.land = "";
        $scope.ident = "";

        $scope.addNewLeague = function () {
            $scope.ligas.push({
                nombre: $scope.name,
                pais: $scope.land,
                inicio: new Date(),
                fin: new Date(),
                cant_equipos: 15,
                active: true,
                id: parseInt(ident)
            });

            $scope.adding = false;
            $scope.name = "";
            $scope.land = "";
            $scope.ident = "";
        };

        $scope.activate= function() {
            $scope.adding = true;
        };

        $scope.cancelAdd = function() {
            $scope.adding = false;
            $scope.name = "";
            $scope.land = "";
            $scope.ident = "";
        };
    }])

      // Path: /league
    .controller('LeagueCtrl', ['$scope', '$location', '$window','$stateParams', function ($scope, $location, $window, $stateParams) {
        $scope.$root.title = 'Nostradamus Soccer | League';

        console.log($stateParams.id);
   
        $scope.FilterTeams = [];
        $scope.matches = [];
        $scope.addingMatch = false;
        $scope.editResul = false;
        $scope.isEditing = false;
        $scope.addingTeam = false;
        $scope.name1 = "";
        $scope.name2 = "";


        $scope.addMatch = function () {
            $scope.matches.push({
                nombre1:
                $scope.name1, nombre2:
                $scope.name2, id:
                $stateParams.id,
                resultado: 'No Determinado Aun'
            });
            $scope.addingMatch = false;
            $scope.name1 = "";
            $scope.name2 = "";
        };

        $scope.cancelMatch = function () {
            $scope.addingMatch = false;
            $scope.name1 = "";
            $scope.name2 = "";
        }

        $scope.teams = [{ nombre: 'Levante', id_liga: 1, active: true},
                        { nombre: 'Barcelona', id_liga: 1, active: true },
                        { nombre: 'Madrid', id_liga: 1, active: true },
                        { nombre: 'Liverpool', id_liga: 3, active: true },
                        { nombre: 'Manchester', id_liga: 3, active: true },
                        { nombre: 'Chelsea', id_liga: 3, active: true },
                        { nombre: 'Genova', id_liga: 2, active: true },
                        { nombre: 'Cagliari', id_liga: 2, active: true },
                        { nombre: 'Inter', id_liga: 2, active: true },
                        { nombre: 'Monaco', id_liga: 4, active: true },
                        { nombre: 'Paris', id_liga: 4, active: true },
                        { nombre: 'France', id_liga: 4, active: true },
                        { nombre: 'Bayern Munich', id_liga: 5, active: true },
                        { nombre: 'Dortmund', id_liga: 5, active: true },
                        { nombre: 'Shalke 04', id_liga: 5, active: true },
                        { nombre: 'Werder Bremen', id_liga: 5, active: true }
        ];

       
     
        var inicio = function () {
            $scope.FilterTeams = [];
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].id_liga.toString() === $stateParams.id) {
                    $scope.FilterTeams.push($scope.teams[i]);
                }
            }
        };

        inicio();

        $scope.NombreEquipo = "";

        $scope.addNewTeam = function(){
            var team = {nombre: $scope.NombreEquipo, id_liga:parseInt($stateParams.id)};
            $scope.teams.push(team);
            inicio();
            $scope.NombreEquipo = "";
        };

        $scope.deleteTeam = function (nombre) {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].nombre === nombre ) {
                    $scope.teams.splice(i,1);
                    inicio();
                }
            }
        };

        $scope.isEditing = false;
        $scope.Activated = true;
        $scope.NombreAnterior = "";
        $scope.NuevoNombre = "";
        $scope.NoNumbers = false;

        $scope.editTeam = function (teamname) {
            $scope.isEditing = true;
            $scope.addingMatch = false;
            $scope.addingTeam = false;
            $scope.editResul = false;
            $scope.NombreAnterior = teamname;
            $scope.NuevoNombre = teamname;

        };

        $scope.activate = function () {
            $scope.addingMatch = true;
            $scope.addingTeam = false;
            $scope.isEditing = false;
            $scope.editResul = false;
        };

        $scope.activateNewTeam = function () {
            $scope.addingTeam = true;
            $scope.isEditing = false;
            $scope.addingMatch = false;
            $scope.editResul = false;
        };

        $scope.cancelTeam = function () {
            $scope.addingTeam = false;
            $scope.NuevoNombre = "";
        };

        $scope.cancelEdit = function (team) {
            $scope.isEditing = false;
            $scope.NoNumbers = false;
        };


        var auxcancelEdit = function () {
            $scope.isEditing = false;
            $scope.NoNumbers = false;
        };

        $scope.FinishEditing = function () {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].nombre === $scope.NombreAnterior&&isNaN($scope.NuevoNombre)==true) {
                    $scope.teams[i].nombre = $scope.NuevoNombre;
                    auxcancelEdit();
                    $scope.NombreAnterior = "";
                    $scope.NuevoNombre = "";

                } else {
                    $scope.NoNumbers = true;
                    $scope.isEditing = true;
                }

            }


            inicio();
        };

        $scope.Field = "";
        $scope.Field2 = "";
        $scope.newResult = "";

        $scope.activateResul = function (name1, name2) {
            $scope.editResul = true;
            $scope.addingMatch = false;
            $scope.isEditing = false;
            $scope.addingTeam = false;
            $scope.Field = name1;
            $scope.Field2 = name2;
        };
        //remember modify something
        $scope.addResultado = function () {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.matches[i].nombre1 === $scope.Field && $scope.matches[i].nombre2 === $scope.Field2)
                    $scope.matches[i].resultado = $scope.newResult;
            }
            $scope.editResul = false;
            $scope.Field0 = "";
            $scope.newResult = "";
        };

        $scope.cancelResultado = function () {
            $scope.editResul = false;
            $scope.Field0 = "";
            $scope.newResult = "";
        }

        $scope.matches = [{ nombre: 'Real Madrid vs Espanyol', id_liga: 1, fecha:new Date() , resultado1: 0 ,resultado2:0},
                        { nombre: 'Villareal vs Valencia', id_liga: 1, fecha: new Date(), resultado1: 0, resultado2: 0},
                        { nombre: 'Atletico de Madrid vs Barcelona', id_liga: 1, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'New Castle vs Wigan', id_liga: 3, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Manchester United vs Chelsea', id_liga: 3, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Aston Villa vs Liverpool', id_liga: 3, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'AS Roma vs Juventus', id_liga: 2, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'AC Milan vs Napoi', id_liga: 2, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Genoa vs Fiorentina', id_liga: 2, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Marseille vs Lyon', id_liga: 4, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Monaco vs Reims', id_liga: 4, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Toulouse vs Lens', id_liga: 4, fecha: new Date(), resultado1: 0, resultado2: 0 },
                        { nombre: 'Bayern Munich vs Werder Bremen', id_liga: 5, fecha: new Date(), resultado1: 0, resultado2: 0}
        ];



    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);