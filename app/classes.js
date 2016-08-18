function Track(trackNum, trackName, albumName, artistName, videoId, begin, stop){
	this.trackNum  = trackNum;
	this.trackName = trackName || null;
	this.albumName = albumName;
	this.artist    = artistName;
	this.videoId   = videoId;
	this.begin     = begin;
	this.stop      = stop || null;
}

function Album(artistName, albumName, noTracks) {
	this.artistName = artistName;
	this.albumName  = albumName;
	this.noTracks   = noTracks;
}