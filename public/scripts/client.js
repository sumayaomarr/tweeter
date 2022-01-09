/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// A $( document ).ready() block.
$(document).ready(function () {

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
    const {user, content, created_at} = tweet
    let timestamp = timeago.format(created_at);
    let $tweet = `

      <article class="tweet">
          <header> 
              <div>
                <img src=${user.avatars}/>
                <p> ${user.name} </p>
              </div>

              <p> ${user.handle} </p>
          </header>
          
          <p class="tweet-text">${escape(content.text)}</p>

          <footer> 
            <p>${timestamp}</p>
          
            <div class="icons">
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
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
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
        data: data,
        success: function (data) {
          $('.error-message').html('');
          $('#feed').html('');
          $("#tweet-text").val('');
          $(".counter").text(140)
          loadTweets();
        },
        error: function (err) {
        }
      })
    }
    })

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      },
      error: function (err) {
      }
    })
  }
  loadTweets()

});


