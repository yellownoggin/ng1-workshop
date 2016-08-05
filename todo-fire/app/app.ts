namespace todoFire {
    'use strict';

    class MainController {
        static $inject: Array<string> = ['$firebaseAuth'];
        public firebaseAuthObject: any;
        public headline: string;
        public displayEmail: string;
        public someoneLoggedIn: boolean;
        public user: any;
        private config: Object;

        // TODO: try this file  take away any https://github.com/suhdev/firebase-3-typescript/blob/master/firebase.d.ts
        constructor($firebaseAuth) {
            this.firebaseAuthObject = $firebaseAuth();



            console.log(this.firebaseAuthObject);
            // see: https://github.com/gordonmzhu/angular-course-demo-app-v2/blob/master/src/app/auth/auth.service.js
            this.headline = "Simple Todo CRUD application using Firebase and Angular 1";

            this.checkAuthorizationState();

        }

        createUserEP(e, p) {
            // TODO:  check for real e-mail  & password (validate)
            var promise = this.firebaseAuthObject.$createUserWithEmailAndPassword(e, p);
            this.user.email = '';
            this.user.password = '';
            promise.catch(e => console.log(e.message));
        }
        signInUserEP(e, p) {
            // TODO:  check for real e-mail  & password (validate)
            var promise = this.firebaseAuthObject.$signInWithEmailAndPassword(e, p);
            promise.catch(e => console.log(e.message));
            this.user.email = '';
            this.user.password = '';
        }

        // add a real-time listener
        checkAuthorizationState() {
            this.firebaseAuthObject.$onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    // get user e-mail to display
                    this.displayEmail = firebaseUser.email
                    this.someoneLoggedIn = true;
                    console.log(firebaseUser);
                } else {
                    console.log('not logged in');
                    this.displayEmail = 'none';
                    this.someoneLoggedIn = false;
                }
            })
        }

        logoutUser() {
            this.firebaseAuthObject.$signOut();
            this.displayEmail = 'none';
        }
    }


    /**i
     * @ngdoc module
     * @requires Todo:
     * @description
     *
     * Main module
     *
     */
    angular
        .module('todoFire', [
            'ngMaterial',
            'ngMessages',
            'ngAria',
            'ngAnimate',
            'firebase'
        ])
        .run(function() {
            const config = {
                apiKey: "AIzaSyBrluAFQu9_-mLqLYaswrvrmEGC26ikAcg",
                authDomain: "todo-fire-264ad.firebaseapp.com",
                databaseURL: "https://todo-fire-264ad.firebaseio.com",
                storageBucket: "todo-fire-264ad.appspot.com"
            };
            firebase.initializeApp(config);
        })
        .controller('MainController', MainController);
}
