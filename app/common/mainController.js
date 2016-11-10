
crate.controller('Main', function($scope, $location, $rootScope, authTokenFactory, albumFactory, stereo, messenger, user) {
	// Right now this is a global, which is bad, but is being used by the youtube api's onReadyStateChange() function. hmm...
	app                  = this;
	stereoFace           = stereo;
	this.getLists        = function() { return stereo.lists; };
	this.getActiveList   = function() { return stereo.activeList; };
	this.viewingPlaylist = function() {
		var current = this.getActiveList();
		if (current != undefined && current.listType == 'playlist') {
			return true;
		}	else {
			return false;
		}
	};

	this.getActiveTracks = function() { return stereo.activeTracks; };
	this.getActiveTrack  = function() { return stereo.activeTrack; };
	this.getIsPlaying    = function() { return stereo.isPlaying; };
	this.getIsLoggedIn   = function() { return user.isLoggedIn; };
	this.loggedIn        = false;
	this.progress        = 0;
	this.testThing = "THE TEST THING";
	this.getUser = function() { return user.info; };


	this.logOut = function() {
		user.logOut();
	};

	this.toggleUpdate = function(playerState) {
		switch(playerState) {
	      	case -1:
		      case 0:
		      case 2:
		      case 3:
		      case 5:
		        window.clearInterval(loop);
	        	loop = false;
		        break;
		      default:
		        loop = window.setInterval(stereo.update, 1000);
		      }
		};


	// this.setTrack = function(track) {
	// 	stereo.setTrack(track);
	// };

	// this.setActiveList = function(list) {
	//
	// 	stereo.setActiveList(list);
	// 	if (list.listType === 'playlist') {
	// 		stereo.setActiveTracks(list.tracks);
	// 	} else {
	// 		// stereo is out of scope when oure success funciton runs! for now this is handled in MainCtrl :'(
	// 		albumFactory.getTracksByAlbumId(list._id)
	// 		.then(function(response){
	// 			stereo.activeTracks = response.data;
	// 		});
	// 	}
	// };

	// this.isActiveList = function(list) {
	// 	if (stereo.activeList == list) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };



	// TODO: The logic about whether to go to the next song needs to be inside of stereo factory
	this.update = function() {
		angular.element('#playtime').html(
			app.secToMinSec(stereo.getProgress())
		);
		angular.element('#progress').val(stereo.getProgress());

		if (player.getCurrentTime() >= stereo.activeTrack.stop) {
			app.next();
		}
		$scope.$apply();
	}

	this.showText = function(event) {
		alert(event);
	};

	//better implemented as a custom filter
	this.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
					var readOut = minutes + ":" + seconds;
					return readOut;
				};

	this.init = function() {
		var token = authTokenFactory.getToken();
		alert(token);
		user.refreshUser().then(function(response){
			user.refreshUser().then(function(response){
				user.setUser(response.data);
			})
		})

	};

	$rootScope.$on('stereoUpdate', function(){
		app.update();
		$scope.$apply();
	});



})
