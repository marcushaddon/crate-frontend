crate.factory('stereo', function(
	$rootScope,
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
})
