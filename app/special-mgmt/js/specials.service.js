// Visual Studio Code Typings and autocompletion
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('app.special-mgmt').factory('specials', 
	
	//[ 'offers',
		
	function (specialManagementRestService, offers) {
		'use strict';
		var paginatedSpecials = {};

		return {
			// TODO decide whether to calculate on client or server
			// isActive: function (special) {
			// 	var now = new Date();
			// 	if (special.activeFrom < special.activeTo) {
			// 		return now.getHours() > special.activeFrom.getHours() && now.getHours() < special.activeTo.getHours();
			// 	} else {
			// 		// around midnight
			// 		return now.getHours() > special.activeFrom.getHours() || now.getHours() < special.activeTo.getHours();
			// 	}
			// },
			addOffers: function (paginatedSpecialList) {
				// TODO decide whether to calculate on client or server
				var self = this;

				var result = offers
					.loadAllOffers()
					.then(
					function (allOffers) {
						paginatedSpecialList = paginatedSpecialList.map(function (current) {
							var allOffersFiltered = allOffers.filter(function (offer) {
								return offer.id === current.offerId;
							});
							var offer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;

							if (offer) {
								current.specialOffer = offer.description;
								current.originalPrice = offer.price;
								current.savings = (current.originalPrice - current.specialPrice).toFixed(2);
								// TODO better add percentage sign via filter
								current.savingsPercentage = ((current.savings / current.originalPrice) * 100).toFixed(0) + " %";
							}

							// TODO decide whether to calculate on client or server
							//current.activeStatus = self.isActive(current) ? "Active" : "Inactive";	

							// map weekly period
							current.activeStartingDay = current.activePeriod.startingDay;;
							current.activeEndingDay = current.activePeriod.endingDay;
							current.activeStartingTime = new Date(1970, 0, 1, current.activePeriod.startingHour, 0, 0);
							current.activeEndingTime = new Date(1970, 0, 1, current.activePeriod.endingHour, 0, 0);
							return current;
						});

						return paginatedSpecialList;

					}
					);
				return result;
			},
			getPaginatedSpecials: function (pagenumber, pagesize) {
				var self = this;

				return specialManagementRestService.getPaginatedSpecials(pagenumber, pagesize).then(function (response) {
					angular.copy(response.data, paginatedSpecials);
					return self.addOffers(paginatedSpecials.result).then(function (amendedSpecials) {
						paginatedSpecials.result = amendedSpecials;
						return paginatedSpecials;
					});
				});
			},
			deleteSpecial: function (specialId) {
				return specialManagementRestService.deleteSpecial(specialId).then(function (response) {
					// TODO check status and display confirmation or error
				});
			},
			submitSpecial: function (special) {
				return specialManagementRestService.saveSpecial(special).then(function (response) {
					// TODO check status and display confirmation or error
				});
			},
			loadSpecial: function (specialId) {
				var self = this;

				return specialManagementRestService.getSpecial(specialId).
					then(function (response) {
					// wrap in list
					return self.addOffers([response.data]);
				}).then(function (specialAsList) {
					// unwrap list
					return specialAsList[0];
				});
			},
			loadAllSpecials: function () {
				var self = this;

				return specialManagementRestService.getAllSpecials().then(function (response) {
					return self.addOffers(response.data);
				});
			},

		};
	}

//]

	);
