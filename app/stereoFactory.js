crate.factory('stereo', function($rootScope){
	return {
		stereo: this,
		lists: [],
		activeList: {},
		activeTracks: [],
		activeTrack: {},
		progress: 0,
		isPlaying: false,

		testThing: function() {
			console.log("STERESO TEST THING");
			console.log(this);
		},

		// OMG I hate this, but otherwise when the youtube API becomes 'this'
		update: function() {
			console.log(app);
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
