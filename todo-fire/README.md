now:
plan: 1. basic binding & e-mail password login view

actual:
1. got libraries for a basic app with firebase
2. set up typescript
    - NOTE: typescript installed globally & atom typescript package(are in the mix)
    - tsconfig.json) should have this as a dot file proper- the one i have in there is missing files glob
    - typings (https://github.com/typings/typings) tsd is deprecated
        - new angularfire typings
        - https://github.com/suhdev/firebase-3-typescript/blob/master/firebase.d.ts
3. css material
4. very basic form markup
5. 1 file: with controller major module
6. initialize firebase in  module.run versus script tag
https://firebase.google.com/docs/web/setup
see initial script
7. firebase module is in the base module - but not needed to inject in controller?
8. do the actual authentication steps
    get elements: (get element by id)
    vanilla javascript
        1. in order to add an event listener(for the buttons)
        2. to get the values()
        angular way
        1. ng-click
        2. ng-model(access value)

8a. signup -
1. need the values of the email and password (ng-model value)
2. need a callback* function -
    - what does it do?
    takes the values and uses an api method 



TODO:
1. libraries to include
* angular
* angular material(angular messages, angular animate, angular aria)
* angular fire(firebase)

2. tools
* bower
* npm(maybe not)
* typescript
* no gulp


3. jq
* when to use form versus not encapsulating in the form
* firebase module is in the base module - but not needed to inject in controller?


<!-- <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBrluAFQu9_-mLqLYaswrvrmEGC26ikAcg",
    authDomain: "todo-fire-264ad.firebaseapp.com",
    databaseURL: "https://todo-fire-264ad.firebaseio.com",
    storageBucket: "todo-fire-264ad.appspot.com",
  };
  firebase.initializeApp(config);
</script>
COPY -->
