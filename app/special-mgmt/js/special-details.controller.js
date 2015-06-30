angular.module('app.special-mgmt').controller('SpecialDetailsCntl',
    function ($scope, $sce, specials, specialDetails, allOffers, globalSpinner, positionStateNotification) {
        'use strict';
        $scope.special = specialDetails;
        $scope.allOffers = allOffers;
		var allOffersFiltered = allOffers.filter(function(offer) { 
			return offer.id === $scope.special.offerId; 
		});
        $scope.selectedOffer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;
		
        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        // form container to access forms added in parent scopes
        $scope.forms = {};

        $scope.submit = function () {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
				console.log("Saving special: " +JSON.stringify($scope.special));
				
				// map weekly period
				$scope.special.activePeriod.startingDay = $scope.special.activeStartingDay;
				$scope.special.activePeriod.endingDay = $scope.special.activeEndingDay;
				$scope.special.activePeriod.startingHour = $scope.special.activeStartingTime.getHours();
				$scope.special.activePeriod.endingHour = $scope.special.activeStartingTime.getHours();
				
                return specials.submitSpecial($scope.special);
            }).then(function () {
                $scope.$close();
            });
        };
		
		$scope.selectOffer = function (item, model) {
			$scope.selectedOffer = item;
			$scope.special.offerId = item.id;
			$scope.special.specialOffer = item.description;
		};
    });
