// FOR WHEN WE GET YOUTUBE DESCRIPTIONS, HERE IS THE REGEX TO FIND TIMES /[0-9]{1,3}:[0-9]{2}/g
crate.factory('uploadFactory', function($http, $location, discogsFactory, youtubeFactory, artistFactory, albumFactory, trackFactory, messenger){
  return {

    checkCrateForArtist: function(artist) {
      return $http({
        method: 'GET',
        url: '/api/search/artist/' + artist
      });
    },

    convertDiscogsTracklist: function(tracklist, album, artist, videoId) {
      console.log("tracks comin in");
      console.log(tracklist);

      var crateTracklist = [];
      // filter to remove heading entries
      // we might want to check to see if it has the type_ attribute first...
      tracklist = tracklist.filter(function(track){
        return track.type_ == "track";
      });
      console.log("tracks goin out");
      console.log(tracklist);
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

    getVideoInfo: function() {
      var factory = this;
      return youtubeFactory.getVideoInfo(factory.videoId)
      .then(function(response){
        factory.videoInfo = response.data.items[0].snippet;
      })
    },

    getTrackTimesFromVideoInfo: function() {
      var factory = this;
      var desc = this.videoInfo.description;

      var timesArray = [];
      var stringsArray = desc.match(/[0-9]{1,3}:[0-9]{2}/g);

      // Assign converted start times
      for (string in stringsArray) {
        var current = stringsArray[string];
        var intArray = current.split(":").map(function(s){ return parseInt(s); });
        var isoTime = intArray[0] * 60 + intArray[1];
        var timeObj = {};
        timeObj.begin = isoTime;
        timesArray.push(timeObj);
      }

      // Assign end times for all but the last track
      for (var i = 0, length = timesArray.length; i < length -1; i++) {
        timesArray[i].stop = timesArray[i + 1].begin;
      }
      // assign last time
      return    youtubeFactory.getVideoDuration(factory.videoId)
          .then(function(response){
            timesArray[timesArray.length - 1].stop = response.data;

            // NOW HERE CHECK TO SEE IF FIRST OBJ STARTS AT 0
            if (timesArray[0].begin !== 0) {
              var firstObj = {
                begin: 0,
                stop: timesArray[0].begin
              };
              timesArray.unshift(firstObj);
            }
            factory.youtubeTimes = timesArray;
          });



    },


    useDiscogsEntity: function(master) {
      var factory = this;
      messenger.show("Getting Youtube video info...");
      factory.getVideoInfo()
      .then(function(){
        console.log(factory.videoInfo);
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
      })


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
            // Lets see if the youtube description has track times in it....
            factory.getTrackTimesFromVideoInfo()
            .then(function(){
              console.log("UOUIR ARRAYS");
              console.log(factory.youtubeTimes);
              console.log(factory.tracks);
              if (factory.youtubeTimes.length != factory.tracks.length) {
                $location.path('/upload/add-break-points');
                messenger.show("We just need a little more info from you!!");
              } else {
                // Assign the times and make the treacks!
                for (index in factory.youtubeTimes) {
                  factory.tracks[index].begin = factory.youtubeTimes[index].begin;
                  factory.tracks[index].stop = factory.youtubeTimes[index].stop;
                }
                console.log("LADIES AND GENTLAMEN");
                console.log(factory.tracks);
                trackFactory.createTracks(factory.tracks)
                .then(function(result){
                  messenger.show("We were able to get everything we needed from Discogs! Here's the album!");
                  $location.path('/album/' + factory.album._id);
                });
              }

            })

          }

        });
    },

    createTracks: function(tracks) {
      return trackFactory.createTracks(tracks);

    },

    videoId: '',
    artist: {},
    album: {},
    tracks: [],
    videoInfo: {},
    youtubeTimes: {}
  }
});
