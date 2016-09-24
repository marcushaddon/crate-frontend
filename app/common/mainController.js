
crate.controller('Main', function($scope, $location, $rootScope, stereo, messenger, clerk, user) {
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
	// this.createList = function(album) {
	// 	if (!album) {
	// 		playlistFactory.createPlaylist()
	// 		.then(function(response){
	// 			stereo.lists.unshift( response.data );
	// 		});
	//
	// 		// setActiveList needs to accept both albums and playlists first
	// 		// this.setActiveList(stereo.lists[0]);
	// 		console.log(app.getLists());
	// 	}
	//
	// };

	this.logOut = function() {
		user.logOut();
	};

	// this.deleteList = function(list) {
	// 	playlistFactory.deletePlaylist(list._id).then(function(response){
	// 		stereo.lists.splice(stereo.lists.indexOf(list), 1);
	// 		messenger.show(response.data);
	// 	});
	// };


	// this.captureTrack = function(track) {
	// 	stereo.capturedTrack = track;
	// 	angular.element('#bottomModal').openModal();
	// };

	// Hmmm... not sure how to offload this, since playlistCtrl isnt active when viewing an album
	// this.getCapturedTrack = function() {
	// 	return stereo.capturedTrack;
	// };

	// this.addCapturedTrack = function(list, index) {
	// 	stereo.addCapturedTrack(index);
	// };

	// this.removeTrack = function (track, list) {
	// 	var listIndex = stereo.lists.indexOf(list);
	// 	var tracks = list.tracks;
	// 	var pos = tracks.indexOf(track);
	// 	tracks.splice(pos, 1);
	// 	playlistFactory.editPlaylist(list, 'tracks', tracks)
	// 	.then(function(response){
	// 		stereo.lists.splice(listIndex, 1, response.data);
	// 	});
	// };

	// this.moveTrack = function(track, direction) {
	// 	stereo.moveTrack(track, direction);
	// };

	// this.editList = function(list, field, value, event) {
	// 	value = value || event.target.innerHTML.replace(/<(?:.|\n)*?>/gm, '');
	// 	var index = stereo.lists.indexOf(list);
	//
	// 	playlistFactory.editPlaylist(list, field, value).then(function(response){
	// 		stereo.lists.splice(index, 1, response.data);
	// 	});
	// };

	// this.saveAlbum = function(album) {
	// 	clerk.saveAlbum(album).then(function(response){
	// 		stereo.lists.unshift(response.data);
	// 	});
	// };


	this.setActiveList = function(list) {
		stereo.activeList = list;
		if (list.listType === 'playlist') {
			stereo.activeTracks = list.tracks;
		} else {
			// TODO: replace with albumFactoctory (or trackFactory?) method
			clerk.getTracksByAlbumId(list._id).then(function(response){
				stereo.activeTracks = response.data;
			});
		}

		// We will move away from this soon
		if ($location.path() != '/home') {
			$location.path('/home');
		}
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

	this.isActiveList = function(list) {
		if (stereo.activeList == list) {
			return true;
		} else {
			return false;
		}
	};

	this.isActiveTrack = function(track) {
		if (stereo.activeTrack == track) {
			return true;
		} else {
			return false;
		}
	};

	$scope.$on('trackPlayToggle', function(event, data){
		event.stopPropagation();
		if (stereo.activeTrack == data) {
			stereo.playToggle();
		} else {
			stereo.setTrack(data);
		}
	});

	// Not sure why this is getting picked up twice
	$scope.$on('listPlayToggle', function(event, data){
		event.stopPropagation();
		app.setActiveList(data);
	});

	// this.playToggle = function() {
	// 	var state = stereo.playToggle();
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

	// Dont think we are using this anymore
	// $rootScope.$on('login', function(event, user){
	// 	app.init(user);
	// });



})
