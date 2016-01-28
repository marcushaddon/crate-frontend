var plantasiaTracks = [
				{trackNum: 1, trackName : "Plantasia", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 0, stop : 196, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 2, trackName : "Symphony For A Spider Plant", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 196, stop : 350, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 3, trackName : "Baby's Tears Blues", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 350, stop : 527, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 4, trackName : "Ode To An African Violet", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 527, stop : 758, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 5, trackName : "Concerto For Philodendron & Pothos", albumName : "Plantasia", artistName : "Mort Garson", begin : 758, stop : 940, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 6, trackName : "Rhapsody In Green", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 940, stop : 1140, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 7, trackName : "Swingin' Spathiphyllums", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 1140, stop : 1311, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 8, trackName : "You Don't Have To Walk A Begonia", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 1311, stop : 1457, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 9, trackName : "A Mellow Mood For Maidenhair", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 1457, stop : 1585, runTime : function() {return this.stop - this.begin;}},
				{trackNum: 10, trackName : "Music To Soothe The Savage Snake Plant", albumName : "Plantasia", artistName : "Mort Garson", videoId: "IUVmcKcTZ4A", begin : 1585, stop : 1784, runTime : function() {return this.stop - this.begin;}},
			];

var kakashiTracks = [
			{trackNum: 1, trackName: "Suiren", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 0, stop: 275 , runTime : function() {return this.stop - this.begin;}},
			{trackNum: 2, trackName: "Kakashi", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 275, stop: 558, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 3, trackName: "Kono Yo Ni Yomeri #1", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 558, stop : 738, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 4, trackName: "Semitori", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 738, stop: 1020 , runTime : function() {return this.stop - this.begin;}},
			{trackNum: 5, trackName: "Kono Yo Ni Yomeri #2", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 1020, stop : 1154, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 6, trackName: "Yune Dewa", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 1154, stop : 1437, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 7, trackName: "Umi No Ue Kara", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 1437, stop : 1939, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 8, trackName: "Utukushiki Tennen", albumName: "Kakashi" , artistName: "Yasuaki Shimizu", videoId: "HKY38Nx8dSo", begin: 1939, stop : 2220, runTime : function() {return this.stop - this.begin;}},
			];

var workTracks = [
			{trackNum: 1, trackName: "Accidentals", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 0, stop: 207 , runTime : function() {return this.stop - this.begin;}},
			{trackNum: 2, trackName: "The Book Lovers", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 207, stop: 497, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 3, trackName: "The Message from Home", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 497, stop : 797, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 4, trackName: "Phantom", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 797, stop: 1009, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 5, trackName: "We've Got Time", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 1009, stop : 1261, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 6, trackName: "Living Room", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 1261, stop : 1469, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 7, trackName: "According to No Plan", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 1469, stop : 1657, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 8, trackName: "The World Backwards", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 1657, stop : 1898, runTime : function() {return this.stop - this.begin;}},
			{trackNum: 8, trackName: "Lights Out", albumName: "Work and Non Work" , artistName: "Broadcast", videoId: "JZbKix7UAz4", begin: 1898, stop : 2170, runTime : function() {return this.stop - this.begin;}}
			];


var playlists = [{artistName: 'Mort Garson', albumName: 'Plantasia', tracks: plantasiaTracks},
				 {artistName: 'Broadcast', albumName: "Work and Non Work", tracks: workTracks},
				 {artistName: 'Yasuaki Shimizu', albumName:'Kakashi', tracks: kakashiTracks}
			];