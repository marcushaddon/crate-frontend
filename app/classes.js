function Track(trackNum, trackName, albumName, albumId, artistName, artistId, videoId, begin, stop){
	this.trackNum  = trackNum;
	this.trackName = trackName || null;
	this.albumName = albumName;
	this.albumId = albumId;
	this.artist    = artistName;
	this.artistId  = artistId;
	this.videoId   = videoId;
	this.begin     = begin;
	this.stop      = stop || null;
}

function Album(artistName, albumName, noTracks) {
	this.artistName = artistName;
	this.albumName  = albumName;
	this.noTracks   = noTracks;
}

function Playlist(name, description, createdBy, tracks) {
	this.name = name;
	this.description = description || "";
	this.createdBy = createdBy;
	this.tracks = tracks || [];
}

function Artist(name, bio, link, imgUrl, imgs, discogsId, discogsUrl, discogsUri, aka) {
	this.name = name;
	this.bio = bio;
	this.link = link;
	this.imgUrl = imgUrl;
	this.imgs = imgs;
	this.discogsId = discogsId;
	this.discogsUrl = discogsUrl;
	this.discogsUri = discogsUri;
	this.aka = aka;
	this.favorites = 0;
	this.listens = 0;
}
