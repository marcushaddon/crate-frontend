secToMinSec = function(seconds) {
      var wholeSecs = Math.floor(seconds);
      var secs = (wholeSecs % 60);
      var minutes = (wholeSecs - secs) / 60;
      var seconds = secs < 10 ? '0' + secs.toString() : secs.toString();
      var readOut = minutes + ":" + seconds;
      return readOut;
    };
