var todoFire;
(function (todoFire) {
    'use strict';
    var MainController = (function () {
        function MainController($firebaseAuth) {
            this.firebaseAuthObject = $firebaseAuth();
            console.log(this.firebaseAuthObject);
            this.headline = "Simple Todo CRUD application using Firebase and Angular 1";
            this.checkAuthorizationState();
        }
        MainController.prototype.createUserEP = function (e, p) {
            var promise = this.firebaseAuthObject.$createUserWithEmailAndPassword(e, p);
            this.user.email = '';
            this.user.password = '';
            promise.catch(function (e) { return console.log(e.message); });
        };
        MainController.prototype.signInUserEP = function (e, p) {
            var promise = this.firebaseAuthObject.$signInWithEmailAndPassword(e, p);
            promise.catch(function (e) { return console.log(e.message); });
            this.user.email = '';
            this.user.password = '';
        };
        MainController.prototype.checkAuthorizationState = function () {
            var _this = this;
            this.firebaseAuthObject.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    _this.displayEmail = firebaseUser.email;
                    _this.someoneLoggedIn = true;
                    console.log(firebaseUser);
                }
                else {
                    console.log('not logged in');
                    _this.displayEmail = 'none';
                    _this.someoneLoggedIn = false;
                }
            });
        };
        MainController.prototype.logoutUser = function () {
            this.firebaseAuthObject.$signOut();
            this.displayEmail = 'none';
        };
        MainController.$inject = ['$firebaseAuth'];
        return MainController;
    }());
    angular
        .module('todoFire', [
        'ngMaterial',
        'ngMessages',
        'ngAria',
        'ngAnimate',
        'firebase'
    ])
        .run(function () {
        var config = {
            apiKey: "AIzaSyBrluAFQu9_-mLqLYaswrvrmEGC26ikAcg",
            authDomain: "todo-fire-264ad.firebaseapp.com",
            databaseURL: "https://todo-fire-264ad.firebaseio.com",
            storageBucket: "todo-fire-264ad.appspot.com"
        };
        firebase.initializeApp(config);
    })
        .controller('MainController', MainController);
})(todoFire || (todoFire = {}));
