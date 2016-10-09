crate.factory('uploadFactory', function($http, $location, discogsFactory, artistFactory, albumFactory, messenger){
  return {
    checkCrateForArtist: function(artist) {
      return $http({
        method: 'GET',
        url: '/api/search/artist/' + artist
      });
    },

    useDiscogsMaster: function(master) {
      // First check to see if we have imported this master from discogs...
      albumFactory.getAlbumByDiscogsId(master.id)
      .then(function(response){
        // If not, then continue....
        if (response.data === null) {
          discogsFactory.getMaster(master.id)
          .then(function(response){
            var master = response.data;
            var discogsArtistId = master.artists[0].id;
            // See if we already have this artist
            artistFactory.getArtistByDiscogsId(discogsArtistId)
            .then(function(response){
              // We have this artist!
              if (response.data != null && response.data != []) {
                this.artist = response.data;
              } else {
                // We dont have this artist, so create them and assign the result to our artistCandidate
                discogsFactory.getArtist(discogsArtistId)
                .then(function(response){
                  var discArtist = response.data;
                  // Create the new artist
                  var crateArtist = new Artist(
                    discArtist.name,
                    discArtist.profile,
                    discArtist.uri,
                    '',
                    discArtist.id,
                    discArtist.resource_url,
                    discArtist.uri,
                    discArtist.namevariations
                  );
                  // Put this artist into our db and use the result as our artist
                  artistFactory.createArtist(crateArtist)
                  .then(function(response){

                    $scope.artist = response.data;
                  });

                });
              }

              // Now lets see about this master....
            var album = {
                    listType: 'album',
                    name: master.title,
                    artist: this.artist.name,
                    artistId: this.artist._id,
                    noTracks: master.tracklist.length,
                    imgUrl: '',
                    // THIS JUST RETURNS THELENGTH OF THE ARRAY, NOT COOL OK
                    tags: master.styles.push(master.genres),
                    genres: master.genres,
                    year: master.year,
                    discogsId: master.id,
                    discogsUrl: master.resource_url,
                    discogsUri: master.uri
                  };
                  console.log(album);
                  // AND HERE WE WILL SAVE THE ALBUM, NEXT TIME.....


            });


          });
        } else {
          messenger.show("Oops! It looks like somone has already found that album!!");
          $location.path('/album/' + response.data._id);
        }
      });

    },

    artist: {},
    album: {},
    tracks: []
  }
});
