(function() {
        'use strict';

        angular
            .module('scotchTodo', [])
            .controller('MainController', MainController);

        function MainController($http) {
            var vm = this;

            vm.formData = {};

            // when landing on the page, get all todos and show them
            $http.get('/api/todos')
                .success(function(data) {
                    vm.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });

            vm.createTodo = function() {
                $http.post('/api/todos', vm.formData)
                    .success(function(data) {
                        vm.formData = {}; // clear form so user can create another
                        vm.todos = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            };

            vm.deleteTodo = function (id) {
                console.log(id);
                console.log('hello');
                $http.delete('/api/todos/' + id)
                .success(function (data) {
                    vm.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
            };
        }

        })();
