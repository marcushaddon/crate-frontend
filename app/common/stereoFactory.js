crate.factory('stereo', function($rootScope, albumFactory, clerk, messenger){
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

		testThing: function() {
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
		}
	}
})
