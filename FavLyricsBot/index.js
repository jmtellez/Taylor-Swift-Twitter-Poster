const fetch = require("node-fetch");
const twit = require("twit");
const propertiesReader = require("properties-reader");
const properties = propertiesReader("./props.ini");

const baseUrl = properties.get("base_url");
const format = properties.get("format_url");
const musixmatchKey = properties.get("api_key");
const T = new twit(properties.getAllProperties());

async function getArtistId(name) {
  try {
    let response = await fetch(
      `${baseUrl}artist.search${format}&q_artist=${name}&page_size=1&apikey=${musixmatchKey}`
    );
    let json = await response.json();
    let artist = json.message.body.artist_list[0].artist;
    return artist.artist_id;
  } catch (error) {
    console.log(error);
  }
}

async function getArtistAlbums(artistId) {
  try {
    let response = await fetch(
      `${baseUrl}artist.albums.get${format}&artist_id=${artistId}&apikey=${musixmatchKey}`
    );
    let json = await response.json();
    let albumList = json.message.body.album_list;
    let albums = new Set();
    albumList.forEach((el) => {
      albums.add(el.album.album_name.toLowerCase());
    });
    return albums;
  } catch (error) {
    console.log(error);
  }
}

// TODO
async function getAlbumTracks(albumId) {}

async function getSongDetails({ artist = "", track = "", lyrics = "" }) {
  if (artist === "" && track === "" && lyrics === "") {
    artist = "John Mayer";
    track = "Gravity";
    lyrics = "just keep me where the light is";
  }
  try {
    let response = await fetch(
      `${baseUrl}track.search${format}&q_track=${track}&q_artist=${artist}&q_lyrics=${lyrics}&quorum_factor=1&apikey=${musixmatchKey}`
    );
    let json = await response.json();
    // TODO - extract track_list from json
    console.log(json.message.body.track_list);
  } catch (error) {
    console.log(error);
  }
}
function tweet(message) {
  T.post("statuses/update", { status: message }, function (
    err,
    data,
    response
  ) {
    console.log(data);
  });
}

// getArtistId("John Mayer").then((artistId) => console.log(artistId + " 1"));

// async anonymous function
(async function () {
  var artistId = await getArtistId("Luis Miguel");
  var albums = await getArtistAlbums(artistId);
  getSongDetails({});
  console.log(albums);
})();
