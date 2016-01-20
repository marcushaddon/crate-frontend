(function() {

angular.module('main-app', [])

.factory('CurrentTracks', function CurrentFactory(){
	return {
		savedAlbums: [{artistName: 'Mort Garson', albumName: 'Plantasia', tracks: plantasiaTracks},
				 {artistName: 'Takeshi Taruchi', albumName: "Let's Go Classics!", tracks: null},
				 {artistName: 'Yasuaki Shimizu', albumName:'Kakashi', tracks: kakashiTracks}
			]
	};
})

})();