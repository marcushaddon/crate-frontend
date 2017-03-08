
crate.controller('Main', function($scope, $location, $window, $rootScope, angularConfig, authTokenFactory, albumFactory, stereo, messenger, user) {
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
		        loop = window.setInterval(stereo.update, 1000, stereo);
		      }
		};

	this.showText = function(event) {
		alert(event);
	};

	// better implemented as a custom filter
	this.secToMinSec = function(seconds) {
					var wholeSecs = Math.floor(seconds);
					var secs = (wholeSecs % 60);
					var minutes = (wholeSecs - secs) / 60;
					var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
					var readOut = minutes + ":" + seconds;
					return readOut;
				};

	this.returnToLastLocation = function() {
		var lastPath = $window.localStorage.getItem('lastCrateLocation');
		if (lastPath) {
			var bookmark;
			if (lastPath.indexOf('printout') > -1) {
				bookmark = '/';
			} else {
				var useless = lastPath.indexOf('#');
				bookmark = lastPath.slice(useless + 1);
			}
			$location.path(bookmark);
		} else {
			$location.path('/');
		}
	};

	this.init = function() {
		var test = $location.search().test;
		messenger.show(test);
		console.log(test);
		console.log("Getting user!");
		user.refreshUser()
		.then(function(response){
			user.setUser(response.data);
			if (angularConfig.context !== 'web') {
				// make request to background and see if there is a pending upload AND the upload is in the currently active tab
				var request = { isContentMessage: true, action: 'getPendingUpload' };
				console.log("checking possible uploads!");
				stereo.sendMessage(request, this, function(msg) {
					// See if the upload came from the currently active tab
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						var currentTabId = tabs[0].id;
						if (currentTabId === msg.tabId) {
							$location.path('/upload').search('videoId', msg.videoId);
						} else {
							app.returnToLastLocation();
						}
					});
				});


			}
		},
		function failure(){
				$location.path('/login');
		});
// chrome


	};




})
