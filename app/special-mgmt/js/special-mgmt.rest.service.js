angular.module('app.special-mgmt').factory('specialManagementRestService', function ($http, currentContextPath) {
    'use strict';

    // TODO change path
	// var servicePath = currentContextPath.get() + 'services/rest/specialmanagement/v1';
	var servicePath = currentContextPath.get() + 'services/rest/tablemanagement/v1';

	// TODO remove
	var mockpagination = { "size": 4, "page": 1, "total": 4 };

	// TODO remove
	var mockspecials = [
		{
			"id": 101,
			"modificationCounter": 1,
			"revision": null,
			"number": 1,
			"specialName": "Happy Hour",
			"offerId": 5, // "Cola"
			"specialPrice": 0.99,
			activePeriod : {
				startingDay : 1, // Monday
				endingDay : 7, // Sunday
				startingHour : 19,
				endingHour : 21
			}, 
			activeStatus: 'Inactive'
		},
		{
			"id": 102,
			"modificationCounter": 1,
			"revision": null,
			"number": 2,
			"specialName": "Midnight Deals",
			"offerId": 5, // "Cola"
			"specialPrice": 0.99,
			activePeriod : {
				startingDay : 1, // Monday
				endingDay : 7, // Sunday
				startingHour : 23,
				endingHour : 3
			}, 
			activeStatus : 'Inactive'
		},
		{
			"id": 103,
			"modificationCounter": 1,
			"revision": null,
			"number": 3,
			"specialName": "Mittagstisch",
			"offerId": 1, // "Schnitzel-Menü"
			"specialPrice": 6.95,
			activePeriod : {
				startingDay : 1, // Monday
				endingDay : 7, // Sunday
				startingHour : 12,
				endingHour : 14
			}, 
			activeStatus : 'Inactive'
		},
		{
			"id": 104,
			"modificationCounter": 1,
			"revision": null,
			"number": 4,
			"specialName": "Early Bird",
			"offerId": 3, // "Pfifferlinge-Menü"
			"specialPrice": 18.99,
			activePeriod : {
				startingDay : 1, // Monday
				endingDay : 7, // Sunday
				startingHour : 6,
				endingHour : 7
			}, 
			activeStatus : 'Inactive'
		},
		{
			"id": 105,
			"modificationCounter": 1,
			"revision": null,
			"number": 4,
			"specialName": "Simply Always",
			"offerId": 3, // "Pfifferlinge-Menü"
			"specialPrice": 7.99,
			"activeTo": new Date(1970, 0, 1, 23, 0, 0),
			activePeriod : {
				startingDay : 1, // Monday
				endingDay : 7, // Sunday
				startingHour : 0,
				endingHour : 23
			}, 
			activeStatus : 'Active'
		}
	];


    return {
        getPaginatedSpecials: function (pagenumber, pagesize) {
            var tableSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
			// TODO switch to correct service
            //return $http.post(servicePath + '/special/search', tableSearchCriteria).then(
            return $http.post(servicePath + '/table/search', tableSearchCriteria).then(
				// TODO remove mock
				function (response) {
					response.data.pagination = mockpagination;
					response.data.result = mockspecials;
					return response;
				});
        },
        deleteSpecial: function (id) {
            return $http.delete(servicePath + '/special/' + id);
        },
        saveSpecial: function (special) {
            return $http.post(servicePath + '/special/', special);
        },
        getSpecial: function (id) {
			// TODO switch to correct service
            //return $http.get(servicePath + '/special/' + id).then(
            return $http.get(servicePath + '/table/' + id).then(
				function (response) {
					// TODO remove mock
					response.data = mockspecials[0];
					return response;
				}
				);
        },
		getAllSpecials: function () {
			// TODO switch to correct service
            //return $http.get(servicePath + '/special').then(
            return $http.get(servicePath + '/table').then(
				function (response) {
					// TODO remove mock
					response.data = mockspecials;
					return response;
				}
				);
        },

    };
});
