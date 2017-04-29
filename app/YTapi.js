loop = false;

// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      // TODO: figure out CSP so we dont have to do this shit
      var tagSrc = 'https://www.youtube.com/iframe_api';
      tag.src = tagSrc;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '1',
          width: '1',
          //need to figure this out, obvs
          videoId: '',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        console.log("Player is ready!");
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.

      function onPlayerStateChange(event) {
       app.toggleUpdate(player.getPlayerState());
      }
      function stopVideo() {
        player.stopVideo();
      }
