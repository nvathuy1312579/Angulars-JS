var app = angular.module('StarterApp', ['ngMaterial', 'ngMdIcons']);

/*var myapp = angular.module("AccountApp", []);*/

app.service("profile", function ($http, $q)
{
	var deferred = $q.defer();
	$http.get('https://api.myjson.com/bins/4uhiw').then(function (data)
	{
		deferred.resolve(data);
	});

	this.getMenu   = function ()
	{
		return deferred.promise;
	}
})

app.controller("accountCtrl", function ($scope, profile)
{
    window.sc1=$scope;
	var promise = profile.getMenu();
  $scope.data = null;
	promise.then(function (data)
	{
		$scope.data   = data.data;
    
		console.log($scope.menu);
	});
});

app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

 	/*$scope.menu = [
            {
      link : '',
      title: 'Full Name: Nguyen Vu Anh Thuy',
      icon: 'description'
    },
    {
      link : '',
      title: 'D.O.B: 23/09/1995',
      icon: 'event'
    },
        {
      link : '',
      title: 'National: VietNamese',
      icon: 'language'
    },
        {
      link : '',
      title: 'Student at Information Technology in University of Sciences',
      icon: 'account_circle'
    },
    {
      link : '',
      title: 'P.O.B: Kien Giang',
      icon: 'home'
    }

  ];
    $scope.contacts = [
        {
            link : 'anhthuy2908@gmal.com',
            title: 'Email: anhthuy2908@gmail.com',
            icon: 'mail'
        },
        {
            link : '',
            title: 'Phone Number: 01692189779',
            icon: 'phone'
        }
    ];
  
  $scope.SUMMARY = [
      {
        notes: "I'm a junior student at University of Sciences - Information Technology"
      },
            
    ];*/
    
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

app.controller("LocationFormCtrl", function ($scope) {
    $scope.location = {
        region: "Wellington Region",
        city: "Wellington",
        suburb: "Mt. Cook"
    };
});
app.directive("clickToEdit", function () {
    var editorTemplate = '' +
        '<div class="click-to-edit">' +
            '<div ng-hide="view.editorEnabled">' +
                '{{value}} ' +
                '<a class="button tiny" ng-click="enableEditor()">Edit</a>' +
            '</div>' +
            '<div ng-show="view.editorEnabled">' +
                '<input type="text" class="small-12.columns" ng-model="view.editableValue">' +
                '<a class="button tiny" href="#" ng-click="save()">Save</a>' +
                ' or ' +
                '<a class="button tiny" ng-click="disableEditor()">cancel</a>' +
            '</div>' +
        '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
        },
        link: function (scope, element, attrs) {
            scope.view = {
                editableValue: scope.value,
                editorEnabled: false
            };

            scope.enableEditor = function () {
                scope.view.editorEnabled = true;
                scope.view.editableValue = scope.value;
                setTimeout(function () {
                    element.find('input')[0].focus();
                    //element.find('input').focus().select(); // w/ jQuery
                });
            };

            scope.disableEditor = function () {
                scope.view.editorEnabled = false;
            };

            scope.save = function () {
                scope.value = scope.view.editableValue;
                scope.disableEditor();
            };

        }
    };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});