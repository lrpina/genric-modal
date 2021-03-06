"use strict";

var module = angular.module('brilliantDirectives', ['ui.bootstrap'])

var templateDir = 'templates/';

/*
 custom directive to use as a generic modal window.

 Usage:

 <div>
 <my-modal instance_template='butterflies' use_ctrl="ButterFliesCtrl"></my-modal>
 </div>

 Attributes:
 instance_template: the tempalate name minus the .tpl.html extension.  This assumes the template is in the
 /js/templates/ folder/

 use_ctrl: this is the controller you want to be passed to be used in your modal instance if its located outside of this
 directive then you will need to inject the module it belongs in so this can find it

 The above example decalares a modal window where the template is found at js/templates/modal_instance.html and uses the
 controller MyModalInstanceCtrl
 */
 module.controller('RedBullCtrl', function($scope, $modalInstance, custEmail){
    //add the scope
    $scope.custEmail = custEmail;
   
    $scope.ok = function(){
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

module.controller('CandyBarCtrl', function($scope, $modalInstance, custEmail){
    //add the scope
    $scope.custEmail = custEmail;
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.selected ={
        item: $scope.items[0]
    };
    $scope.ok = function(){
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


module.directive('myModal', function($modal){

    return {
        transclude: true,
        restrict: 'EA',
        template: '<a ng-click="open()" ng-transclude>{{name}}</a>',
        scope: {
            useCtrl: "@",
            email: "@"
        },
        link: function(scope, element, attrs) {

  //          console.log('Attrs: ', attrs);
 //           console.log('SCOPE: ', scope);

            scope.open = function(){


                var modalInstance = $modal.open({
                    templateUrl: templateDir+attrs.instanceTemplate +'.tpl.html',
                    controller:  scope.useCtrl,
                    size: 'lg',
                    windowClass: 'app-modal-window',
                    backdrop: true,
                    resolve: {
                        custEmail: function(){
                            return {email: scope.email};
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem){ //selectedItem //maybe this is what goes if I want to show it in the outer html
                    scope.selected = selectedItem;
                    console.log('Finished');
                }, function(){
                    console.log('Modal dismissed at : ' + new Date());
                });
            };
        }
    };
});
