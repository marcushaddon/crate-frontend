var webStereo = function(
	$rootScope,
	$location,
	clerk,
	albumFactory,
	artistFactory,
	trackFactory,
	messenger
){
	console.log(player)
	return {
		stereo: this,
		lists: [],
		activeList: {},
		activeTracks: [],
		activeTrack: null,
		progress: 0,
		isPlaying: false,
		getVideoLength: function() {
			return player.getDuration();
		},

		setActiveList: function(list) {
			this.activeList = list;
			if (list.listType === 'playlist') {
				this.setActiveTracks(list.tracks);
			} else {
				// stereo is out of scope when oure success funciton runs! for now this is handled in MainCtrl :'(
				this.setActiveTracks(albumFactory.getTracksByAlbumId(list._id).$$state.value);
			}
		},

		setActiveTracks: function(tracks) {
			this.activeTracks = tracks;
			// this.setTrack(this.activeTracks[0]);
		},

		getActiveTracks: function() {
			if (this.activeTracks == []) {
				return false;
			}
			return true;
		},

		getActiveList: function() {
			return this.activeList;
		},

		takeMeToNowPlaying: function() {
			var current = this.getActiveList();
			if (current !== {}) {
				var currentPath = current.listType + '/' + current._id;
			} else {
				currentPath = '';
			}

			$location.path(currentPath);
		},

		testThing: function() {
		},

		// OMG I hate this, but otherwise when the youtube API becomes 'this'
		update: function(stereo) {
			stereo.progress = player.getCurrentTime() - stereo.getActiveTrack().begin;
			// console.log("updateing");
			// console.log("progress: " + player.getCurrentTime() + ", need to stop at: " + app.getActiveTrack())
			if (player.getCurrentTime() >= stereo.getActiveTrack().stop) {
				console.log(stereo);
				stereo.next();
			}
			$rootScope.$broadcast('stereoUpdate');
		},

		toggleUpdate: function(playerState) {
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
			        loop = window.setInterval(this.update, 1000, stereo);
			      }
		},

		getProgress: function() {
			var progress;
			if (player) {
				progress = player.getCurrentTime() - this.activeTrack.begin;
			} else {
				progress = 0;
			}
			return progress;
		},

		setProgress: function() {
			this.progress = player.getCurrentTime() - this.activeTrack.begin;
		},

		setTrack: function(track) {
			this.activeTrack = track;
			trackFactory.incrementListens(track);
			artistFactory.incrementListens(track.artistId);
			player.loadVideoById({ videoId: this.activeTrack.videoId, startSeconds: this.activeTrack.begin });
			this.isPlaying = true;
			messenger.show(track.artist + ' - ' + track.trackName);
		},

		getActiveTrack: function() {
			return this.activeTrack;
		},

		playToggle: function() {
			switch(player.getPlayerState()) {
	      	  case -1:
		      case 0:
		      case 2:
		      case 3:
		      case 5:
		        player.playVideo();
		        this.isPlaying = true;
		        break;
		      default:
		        player.pauseVideo();
		        this.isPlaying = false;
		      }
		      return player.getPlayerState();
		},

		seekTo: function(time) {
			player.seekTo(time);
		},

		// This is a helper function we will use in multiple places so there is probably a better place to put it
		trackPosition: function(track, list) {
			list = list || this.activeTracks;
			for (var candidate in list) {
				if (list[candidate]._id === track._id) {
					return parseInt(candidate);
				}
			}
			return -1;
		},

		next: function() {
			var currentTrackIndex = this.trackPosition(this.getActiveTrack(), this.activeTracks);
			if (currentTrackIndex >= this.activeTracks.length - 1) {
				this.playToggle();
				messenger.show("End of qeueued tracks.");
			} else {
				var nextTrackIndex = currentTrackIndex + 1;
				this.setTrack(this.activeTracks[nextTrackIndex]);
			}
		}
	}

};

var extensionStereo = function(
	$rootScope,
	$location,
	clerk,
	albumFactory,
	artistFactory,
	trackFactory,
	messenger
){
	return {
		stereo: this,
		lists: [],
		activeList: {},
		activeTracks: [],
		activeTrack: {},
		progress: 0,
		isPlaying: false,
		update: function(backgroundState, context) {
			context = context || this;
			// messenger.show(backgroundState.activeTracks);
			context.activeTrack = backgroundState.activeTrack;
			context.activeTracks = backgroundState.activeTracks;
			context.progress = backgroundState.progress;
			context.isPlaying = backgroundState.isPlaying;
			$rootScope.$broadcast('stereoUpdate');
			// messenger.show(context.activeTracks);
		},

		syncWithBackground: function(context) {
			context.sendRequest('update', null, context, context.update);
		},

		init: function() {
			var self = this;
			// self.syncWithBackground(self);
			var updateLoop = setInterval(self.syncWithBackground, 1000, self);

		},

		sendMessage: function(message, context, callback) {
				var port = chrome.extension.connect({
			        name: "Sample Communication"
			   });
				 port.onMessage.addListener(function(msg) {

			      callback(msg, context);
			 		});
			   port.postMessage(message);

		},

		sendCommand: function(command, payload, callback, context) {
			context = context || this;
			var message = {
				command: command,
				payload: payload
			};
			this.sendMessage(message, context, callback);
		},

		sendRequest: function(request, payload, context, callback) {
			var message = {
				request: request,
				payload: payload
			};
			this.sendMessage(message, context, callback);
		},

		getVideoLength: function() {
			return player.getDuration();
		},

		setActiveList: function(list) {
			this.activeList = list;
			this.sendCommand('setActiveList', list, function(msg) {
				this.activeList = list;
			});
		},

		setActiveTracks: function(tracks) {
			this.activeTracks = tracks;
			this.sendCommand('setActiveTracks', tracks, function(msg) {
			});
		},

		getActiveTracks: function() {
			return this.activeTracks;
		},

		getActiveListAsync: function(callback) {
			this.sendRequest('activeList', null, null, callback);
		},

		getPathToCurrentlyPlayingAsync: function(callback) {

		},

		takeMeToNowPlaying: function() {
			this.sendRequest('getActiveList', null, null, function(msg) {
				var current = msg.activeList;
				var currentPath;
				if (!current._id) {
					currentPath = '/';
				} else {
					currentPath = current.listType + '/' + current._id;
				}
				$location.path(currentPath);
			});
		},

		testThing: function() {

		},

		// OMG I hate this, but otherwise when the youtube API becomes 'this'

		toggleUpdate: function(playerState) {

		},

		getProgress: function() {
			return this.progress;
		},

		setProgress: function() {

		},

		setTrack: function(track) {
			this.sendCommand('setTrack', track, function success(response) {
				messenger.show(response.artist + " - " + response.trackName);
			});
			this.activeTrack = track;
			this.isPlaying = true;
		},

		getActiveTrack: function() {
			return this.activeTrack;
		},

		playToggle: function() {
			this.sendCommand('playToggle', null, function success(response) {
				// messenger.show(response);
			});
		},

		seekTo: function(time) {

		},

		// This is a helper function we will use in multiple places so there is probably a better place to put it
		trackPosition: function(track, list) {
			list = list || this.activeTracks;
			for (var candidate in list) {
				if (list[candidate]._id === track._id) {
					return parseInt(candidate);
				}
			}
			return -1;
		}
	}
};



var stereoController;
if (angularConfig.context === 'web') {
	stereoController = webStereo;
} else {
	stereoController = extensionStereo;
}

if (stereoController == extensionStereo) {
	console.log("Using extension stereo.");
}





crate.factory('stereo', stereoController);
