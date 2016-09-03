
crate.controller('Main', function($scope, $location, $rootScope, stereo, clerk, user) {
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
	this.getProgress     = function() { return stereo.getProgress(); };
	this.testThing = function() { alert("MAIN TEST THING"); };
	this.getUser = function() { return clerk.user; };
	this.createList = function(album) {
		// THIS WILL NEED TO INVOLVE HITTING THE API TO CREATE AND UPDATE PLAYLISTS AND THEN REFLECT THOSE CHANGES
		if (!album) {
			clerk.createList({}, function(response){
				console.log(response);
				stereo.lists.unshift( response.data );
			});

			// setActiveList needs to accept both albums and playlists first
			// this.setActiveList(stereo.lists[0]);
			console.log(app.getLists());
		}

	};

	this.editList = function(list, field, value, event) {
		value = value || event.target.innerHTML.replace(/<(?:.|\n)*?>/gm, '');
		var index = stereo.lists.indexOf(list);


		clerk.editList(list, field, value, function(response){
			console.log(response);
			stereo.lists.splice(index, 1, response.data);

		});
	};

	this.saveAlbum = function(album) {
		clerk.saveAlbum(album, function(response){
			stereo.lists.unshift(response.data);
		});
	};

	// this.logIn = function() {
	// 	clerk.logIn(this.loginName, this.loginPassword, function(response) {
	// 		user.userName = response.data.userName;
	// 		user.api_key  = response.data.api_key;
	// 		user.isLoggedIn = true;
	// 		app.init();
	// 		$location.path('/home');
	// 	})
	// 	// Need failure function
	// };


	this.setActiveList = function(list) {
		stereo.activeList = list;
		if (list.listType === 'playlist') {
			stereo.activeTracks = list.tracks;
		} else {
			clerk.getTracksByAlbumId(list._id, function(response){
				stereo.activeTracks = response.data;
			},
			function(response){

			});
		}

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

	this.playToggle = function() {
		var state = stereo.playToggle();
	}

	this.back = function() {
		// should call a stereo method
		player.seekTo(stereo.activeTrack.begin);
	};

	this.backBack = function() {
		//these are both awful and need to be re written
		stereo.setTrack(stereo.activeTracks[stereo.activeTracks.indexOf(stereo.activeTrack) - 1]);
	};

	this.next = function() {
		// wow thats ugly
		stereo.setTrack(stereo.activeTracks[stereo.activeTracks.indexOf(stereo.activeTrack) + 1]);
	};

	this.seekTo = function(time) {
		stereo.seekTo(time);
	};

	// This might break if playing a playlist or an album assembled from multiple youtube videos?
	this.scrub = function() {
		var newTime = parseFloat(this.getActiveTrack().begin) + parseFloat(this.progress);
		this.seekTo(newTime);
	};

	this.update = function() {
		angular.element('#playtime').html(
			app.secToMinSec(stereo.getProgress())
		);
		angular.element('#progress').val(stereo.getProgress());

		if (player.getCurrentTime() >= stereo.activeTrack.stop) {
			app.next();
		}
		$scope.$apply();
		console.log("THE CONTROLLER HAS UPDATED");
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

	this.init = function(user) {
		// console.log(user);
		clerk.setUser(user);
		clerk.getPlayLists(function(response) {
			stereo.lists = response.data;
			if (stereo.lists[0]) {
				app.setActiveList(stereo.lists[0]);
			}

		});
		app.loggedIn = true;
		$location.path('/home');
	}

	$rootScope.$on('stereoUpdate', function(){
		app.update();
		$scope.$apply();
	});

	$rootScope.$on('login', function(event, user){
		app.init(user);
	});



})