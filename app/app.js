'use strict';
;(function(window) {

    angular.module('app', []).
        directive('tab', function() {
            return {
                restrict: 'E',
                transclude: true,
                template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
                scope: {
                    heading: "@"
                },
                require: '^tabset',
                link: function(scope, elem, attr, tabsetCtrl) {
                    scope.active = false;
                    tabsetCtrl.addTab(scope);
                }
            }
        }).
        directive('tabset', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: { },
                templateUrl: 'tabset.html',
                bindToController: true,
                controllerAs: 'tabset',
                controller: function() {
                    var self = this;
                    self.tabs = [];
                    self.addTab = function addtab(tab){
                        self.tabs.push(tab);
                        if (self.tabs.length == 1){
                            tab.active = true;
                        }
                    };
                    self.select = function(selectedTab) {
                        angular.forEach(self.tabs, function(tab) {
                            if(tab.active && tab !== selectedTab) {
                                tab.active = false;
                            }
                        });
                        selectedTab.active = true;
                    }
                }
            }
        }).
        directive("kid", function() {
            return {
                restrict: "E",
                scope:{
                    done: "&"
                },
                template: '<input type="text" ng-model="chore">' +
                '{{chore}}' +
                '<div class="button" ng-click="done({chore: chore})">I\'m done</div>'
            };
        }).
        controller("ChoreCtrl", function ($scope) {
            $scope.logChore = function(chore){
                alert(chore + " is done!");
            };
        })
    ;
// Define directives here
})(window);