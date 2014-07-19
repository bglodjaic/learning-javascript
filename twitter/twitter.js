var request = require('request');

// Twitter OAuth
var qs = require('querystring')
  , oauth =
    { 
        callback: 'http://plm.find.in.rs/',
        consumer_key: 'AdrFkq4tD1RsKyDHTEmAinvpN',
        consumer_secret: 'u8duFPtQL2Bg22AutYMrBXgaYUCVWMXn5cgjIhcaqEzWivX8br',
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.post({url:url, oauth:oauth}, function (e, r, body) {
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.
    var access_token = qs.parse(body),
    oauth = {
        consumer_key: 'AdrFkq4tD1RsKyDHTEmAinvpN',
        consumer_secret: 'u8duFPtQL2Bg22AutYMrBXgaYUCVWMXn5cgjIhcaqEzWivX8br',
        token: access_token.oauth_token,
        token_secret: access_token.oauth_token_secret
    },
    url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    var perm_token = qs.parse(body)
      , oauth = { 
            consumer_key: 'AdrFkq4tD1RsKyDHTEmAinvpN',
            consumer_secret: 'u8duFPtQL2Bg22AutYMrBXgaYUCVWMXn5cgjIhcaqEzWivX8br',
            token: perm_token.oauth_token,
            token_secret: perm_token.oauth_token_secret
        }
      , url = 'https://api.twitter.com/1.1/users/show.json?'
      , params =
        { screen_name: perm_token.screen_name
        , user_id: perm_token.user_id
        }
      ;
    url += qs.stringify(params)
    request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
      console.log(user)
    })
  })
})