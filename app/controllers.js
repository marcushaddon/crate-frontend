// (function(){

// angular.module('main-app', [])

// .controller('Player', function(){
// 	var app = this;

// 	this.savedLists = {
// 		lists: playlists,
// 		selected: 0
// 	};

// 	this.currentTracks = {
// 		//find better way to write this
// 		tracks: app.savedLists.lists[app.savedLists.selected].tracks
// 	};

// 	this.controls = {
// 		currentTime: 0
// 	};


// 	//better implemented as a custom filter
// 	this.secToMinSec = function(seconds) {
// 					var wholeSecs = Math.floor(seconds);
// 					var secs = (wholeSecs % 60);
// 					var minutes = (wholeSecs - secs) / 60;
// 					var readOut = minutes + ":" + secs;
// 					return readOut;
// 				};

// });

// })();