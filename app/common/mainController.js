
crate.controller('Main', function($scope, $location, $rootScope, albumFactory, stereo, messenger, user) {
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


	this.setTrack = function(track) {
		stereo.setTrack(track);
	};

	this.setActiveList = function(list) {
		stereo.activeList = list;
		if (list.listType === 'playlist') {
			stereo.setActiveTracks(list.tracks);
		} else {
			// stereo is out of scope when oure success funciton runs! for now this is handled in MainCtrl :'(
			albumFactory.getTracksByAlbumId(list._id)
			.then(function(response){
				stereo.activeTracks = response.data;
			});
		}
	};

	this.isActiveList = function(list) {
		if (stereo.activeList == list) {
			return true;
		} else {
			return false;
		}
	};

	// this.isActiveTrack = function(track) {
	// 	if (stereo.activeTrack == track) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	$scope.$on('trackPlayToggle', function(event, data){
		event.stopPropagation();
		if (stereo.activeTrack == data) {
			stereo.playToggle();
		} else {
			stereo.setTrack(data);
		}
	});

	$scope.$on('listPlayToggle', function(event, data){
		event.stopPropagation();
		if (stereo.activeList != data) {
			app.setActiveList(data);
		}

	});

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

		if (!this.getIsLoggedIn()) {
			$location.path('/login');
			return;
		}
		var userId = user.info.userId;
		playlistFactory.getUserPlaylists(userId).then(function(response) {
			stereo.lists = response.data;
			if (stereo.lists[0]) {
				app.setActiveList(stereo.lists[0]);
			}

		});
		app.loggedIn = true;
		$location.path('/home');
	};

	$rootScope.$on('stereoUpdate', function(){
		app.update();
		$scope.$apply();
	});



})
