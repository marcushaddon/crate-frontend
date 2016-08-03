function Track(trackNum, trackName, albumName, artistName, videoId, begin, stop){
	this.trackNum = trackNum || null;
	this.trackName = trackName || null;
	this.albumName = albumName || null;
	this.artistName = artistName || null;
	this.videoId = videoId || null;
	this.begin = begin || null;
	this.stop = stop || null;
}

function Album(artistName, albumName, noTracks) {
	this.artistName = artistName;
	this.albumName = albumName;
	this.noTracks = noTracks;
}