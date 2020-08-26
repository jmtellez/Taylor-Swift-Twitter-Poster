from twython import Twython
import json
import random
import logging

settings = json.load(open('config.json',encoding="utf8"))

def grab_lyrics():
    lyrics = json.load(open('lyrics.json',encoding="utf8"))
    albums = ['Fearless','Speak Now','Red','1989','Reputation','Lover','Folklore']
    random.seed(a=None, version=2)
    album = lyrics[albums[random.randint(0,len(albums)-1)]]
    return album[len(album)-1]

def create_quoted_string(lyric):
    lyric = '"' + lyric + '" - Taylor Swift'
    return lyric

def tweet(lyric):
    twitter = Twython(settings['consumer_key'], settings['consumer_secret'],settings['access_token'], settings['access_token_secret'])
    twitter.update_status(status=lyric)

def main():
    update = create_quoted_string(grab_lyrics())
    try:
        tweet(update)
    except:
        open('error.log','a').write(update).close()

if __name__ == "__main__":
    main()