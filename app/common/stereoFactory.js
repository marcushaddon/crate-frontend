crate.factory('stereo', function($rootScope, clerk, messenger){
	return {
		stereo: this,
		lists: [],
		activeList: {},
		activeTracks: [],
		activeTrack: {},
		progress: 0,
		isPlaying: false,
		getVideoLength: function() {
			return player.getDuration();
		},

		capturedTrack: {},

		addCapturedTrack: function(listIndex) {
			var list = this.lists[listIndex];
			var updatedTracks = list.tracks;
			updatedTracks.push(this.capturedTrack);
			clerk.editList(list, 'tracks', updatedTracks).then(function(response){
				// I have no idea why I cant access this.lists from here to add the updated list, but i guess i dont need to
				messenger.show("Track added!");
				angular.element('#bottomModal').closeModal();
			});
		},

		moveTrack: function(track, direction) {
			var tracks = this.activeList.tracks;
			var currentPosition = tracks.indexOf(track);
			var newPosition = ( direction == 'up' ) ? currentPosition - 1 : currentPosition + 1
			if (newPosition < 0 || newPosition >= tracks.length) return;
			tracks[currentPosition] = tracks[newPosition];
			tracks[newPosition] = track;
			clerk.editList(this.activeList, 'tracks', tracks).then(function(response){
				console.log(response.data);
			});
		},

		testThing: function() {
			console.log("STERESO TEST THING");
			console.log(this);
		},

		// OMG I hate this, but otherwise when the youtube API becomes 'this'
		update: function() {
			this.progress = player.getCurrentTime() - app.getActiveTrack.begin;
			if (player.getCurrentTime() >= app.getActiveTrack.stop) {
				this.next();
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
			        loop = window.setInterval(this.update, 1000);
			      }
		},

		getProgress: function() {
			return player.getCurrentTime() - this.activeTrack.begin;
		},

		setProgress: function() {
			this.progress = player.getCurrentTime() - this.activeTrack.begin;
		},

		setTrack: function(track) {
			this.activeTrack = track;
			player.loadVideoById({ videoId: this.activeTrack.videoId, startSeconds: this.activeTrack.begin });
			this.isPlaying   = true;
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
		}
	}
})
