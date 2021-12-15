console.log("loading files")

$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("keyup", function () {
    const textvalue = $(this).val()
    const textLength = textvalue.length
    const remainingtext = 140 - textLength
    if (remainingtext < 0) {
      $(".counter").css("color", "red");

    } else {
      $(".counter").css("color", "black");
      console.log('black') }
    $(".counter").text(remainingtext)
  });
});

