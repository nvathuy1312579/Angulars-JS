/*var myapp = angular.module("AccountApp", []);

myapp.service("profile", function ($http, $q)
{
	var deferred = $q.defer();
	$http.get('https://api.myjson.com/bins/qvek').then(function (data)
	{
		deferred.resolve(data);
	});

	this.getMenu   = function ()
	{
		return deferred.promise;
	}
})

myapp.controller("accountCtrl", function ($scope, profile)
{
	var promise = profile.getMenu();
	promise.then(function (data)
	{
		$scope.menu   = data.data;
		console.log($scope.menu);
	});
})*/