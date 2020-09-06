from twython import Twython
import json
import random
import logging

settings = json.load(open('config.json',encoding="utf8"))

def grab_lyrics():
    lyrics = json.load(open('lyrics.json',encoding="utf8"))
    albums = get_albums(lyrics)
    return random.choice(lyrics[random.choice(albums)])

def create_quoted_string(lyric):
    lyric = '"' + lyric + '" - Taylor Swift'
    return lyric

def tweet(lyric):
    twitter = Twython(settings['consumer_key'], settings['consumer_secret'],settings['access_token'], settings['access_token_secret'])
    twitter.update_status(status=lyric)

def get_albums(json_data):
    albums = []
    for album in json_data:
        albums.append(album)
    return albums

def is_tweetable(tweet):
    if len(tweet) > 280:
        return False
    else:
        return True

def main():
    update = create_quoted_string(grab_lyrics())
    if is_tweetable(update):
        tweet(update)
    else:
        open('error.log','a').write(update).close()

if __name__ == "__main__":
    main()