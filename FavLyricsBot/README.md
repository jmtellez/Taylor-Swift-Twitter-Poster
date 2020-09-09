[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/jmtellez/Taylor-Swift-Twitter-Poster/pulls)&nbsp;

# FavLyricsBot 🤖

**Twitter-Bot** to send out favorite lyrics as tweets 🐦

Once the project has been cloned, create `props.ini` file with the following twitter keys and tokens and on entry file `index.js`, give the path to your properties file:

```js

#Twitter Access Token - props.ini
consumer_key = <KEY>
consumer_secret = <SECRET>
access_token = <TOKEN>
access_token_secret = <SECRET>


#index.js
const properties = propertiesReader('./props.ini');
```