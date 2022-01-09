
$(document).ready(function () {
  
  $("#tweet-text").on("keyup", function () {
    const textvalue = $(this).val()
    const textLength = textvalue.length
    const remainingtext = 140 - textLength
    if (remainingtext < 0) {
      $(".counter").css("color", "red");

    } else {
      $(".counter").css("color", "black");
     }
    $(".counter").text(remainingtext)
  });
});

