
crate.factory('uploadFactory', function($http, $location, discogsFactory, artistFactory, albumFactory, trackFactory, messenger){
  return {

    checkCrateForArtist: function(artist) {
      return $http({
        method: 'GET',
        url: '/api/search/artist/' + artist
      });
    },

    convertDiscogsTracklist: function(tracklist, album, artist, videoId) {
      var crateTracklist = [];
      var weHaveDurations = true;
      // Make sure every track has a duration
      for (track in tracklist) {
        if (tracklist[track].duration === "") {
          weHaveDurations = false;
        }
      }
      // Make our track
      for (track in tracklist) {
        var discTrack = tracklist[track];
        var crateTrack = {
          trackNum: parseInt(track) + 1,
          trackName: discTrack.title,
          albumName: album.name,
          albumId: album._id,
          artist: artist.name,
          artistId: artist._id,
          videoId: videoId,
          favorites: 0,
          listens: 0
        };
        crateTracklist.push(crateTrack);
      }
      // Now assign begin and stop times...
      for (track in crateTracklist) {
        if (weHaveDurations) {
          // Get corresponding discogs track object...
          var discogsTrack = tracklist[track];
          var durationArray = discogsTrack.duration.split(':');
          var durationSeconds = parseFloat(durationArray[0]) * 60 + parseFloat(durationArray[1]);
          if (track > 0) {
            crateTracklist[track].begin = crateTracklist[track - 1].stop;
          } else {
            crateTracklist[track].begin = 0;
          }
          crateTracklist[track].stop = crateTracklist[track].begin + durationSeconds;
        } else {
          crateTracklist[track].begin = null;
          crateTracklist[track].stop = null;
        }
      }

      return crateTracklist;
    },




    useDiscogsEntity: function(master) {
      var factory = this;
      messenger.show("Checking Crate for this release...");
      // First check to see if we have imported this master from discogs...
      albumFactory.getAlbumByDiscogsId(master.id)
      .then(function(response){
        // If not, then continue....
        if (response.data === null) {
          messenger.show("Getting release information from Discogs...");
          // This needs to accept a second argument of album type, master or release,
          discogsFactory.getAlbum(master.id, master.type)
          .then(function(response){
            var master = response.data;
            var discogsArtistId = master.artists[0].id;
            // See if we already have this artist
            messenger.show("Getting artist information from Discogs...");
            artistFactory.getArtistByDiscogsId(discogsArtistId)
            .then(function(response){
              // We have this artist!
              if (response.data != null && response.data != []) {
                factory.artist = response.data;
                messenger.show("Artist exists in Crate, pulling Crate artist info...");
                factory.createAlbumFromMaster(master);
              } else {
                messenger.show("New artist! Pulling artist info from Discogs to create Crate artist...");
                // We dont have this artist, so create them and assign the result to our artistCandidate
                discogsFactory.getArtist(discogsArtistId)
                .then(function(response){
                  var discArtist = response.data;
                  // Create the new artist
                  // Just in case the artist doesnt have an images array
                  var image = discArtist.images !== undefined ? discArtist.images[0].resource_url : null;
                  var crateArtist = new Artist(
                    discArtist.name,
                    discArtist.profile,
                    discArtist.uri,
                    image,
                    discArtist.id,
                    discArtist.resource_url,
                    discArtist.uri,
                    discArtist.namevariations
                  );
                  // Put this artist into our db and use the result as our artist
                  artistFactory.createArtist(crateArtist)
                  .then(function(response){

                    factory.artist = response.data;
                    factory.createAlbumFromMaster(master);
                  });

                });
              }


            });


          });
        } else {
          messenger.show("Oops! It looks like somone has already found that album!!");
          $location.path('/album/' + response.data._id);
        }
      });

    },

    createAlbumFromMaster: function(master) {
      var factory = this;
      messenger.show("Creating album from Discogs info...");

      var tags = master.styles.concat(master.genres);
      messenger.show(tags.join("/"));
      var album = {
          listType: 'album',
          name: master.title,
          artist: factory.artist.name,
          artistId: factory.artist._id,
          noTracks: master.tracklist.length,
          imgUrl: master.images[0].resource_url,
          // THIS JUST RETURNS THELENGTH OF THE ARRAY, NOT COOL OK
          tags: tags,
          genres: master.genres,
          year: master.year,
          discogsId: master.id,
          discogsUrl: master.resource_url,
          discogsUri: master.uri
        };

        // AND HERE WE WILL SAVE THE ALBUM...
        albumFactory.createAlbum(album)
        .then(function(response){

          factory.album = response.data;
          // Now let's have a look at the tracks!!!
          messenger.show("Converting Discogs master track information...");
          // convert these tracks
          factory.tracks = factory.convertDiscogsTracklist(master.tracklist, factory.album, factory.artist, factory.videoId);
          if (factory.tracks[0].begin !== null) {
            trackFactory.createTracks(factory.tracks)
            .then(function(result){
              messenger.show("We were able to get everything we needed from Discogs! Here's the album!");
              $location.path('/album/' + factory.album._id);
            });
          } else {
            $location.path('/upload/add-break-points');
            messenger.show("We just need a little more info from you!!");
            console.log(factory.tracks);
          }

        });
    },

    createTracks: function(tracks) {
      return trackFactory.createTracks(tracks);

    },

    videoId: '',
    artist: {},
    album: {},
    tracks: []
  }
});
