/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (data) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    container = $('#feed')
    data.forEach(function (tweet) {
      let $tweet = createTweetElement(tweet)
      container.prepend($tweet)
    })
  }





  const createTweetElement = function (tweet) {
    let name = tweet.user.name
    let avatars = tweet.user.avatars
    let handle = tweet.user.handle
    let content = tweet.content.text
    let timestamp = timeago.format(tweet.created_at);
    let $tweet = `
  <article class="tweet">
  <header> 
      <img src=${avatars}></img>
    <p> ${name} </p>
    <p> ${handle} </p>
  
  </header>
  
  <p class="tweet-text">${content}</p>
  
  
  <footer> 
    <p>${timestamp}</p>
  
    <div class='icons'>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  
  </div>
  
  
  </footer>
  </article>
   `
    return $tweet;
  }

  // renderTweets(data)

  $("#tweet-form").submit(function (event) {
    // prevents page from refreshing
    event.preventDefault();


    // convert form data to a format the server understands
    const data = $(this).serialize()


    if ($("#tweet-text").val().length > 140) {
      $('.error-message').html('Character count is over the limit!');

    } else if ($("#tweet-text").val().length === 0 || $("#tweet-text").val() === "") {
      $('.error-message').html(' tweet field is empty!');
    } else {


      //  send data to the server using ajax
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data :  { text: $("#tweet-text").val()},
        success: function (data) {
          console.log("successfully sent tweet to server")
          $('.error-message').html('');
          $("#tweet-text").val('');
          loadTweets();
        },
        error: function (err) {
          console.log("failed to send tweet to server")
        }
      })
    }
    })

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        console.log("data recieved from server", data);
        renderTweets(data);
      },
      error: function (err) {
        console.log("failed to recieve data from server", err);
      }
    })
  }
  loadTweets()




});


