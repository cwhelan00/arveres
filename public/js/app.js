var $overlay = $('<div id="overlay"></div>');//when creating a new object is not in the DOM
var $image = $('<img>');
var $caption = $("<p></p>");
$overlay.append($image);
$overlay.append($caption);
$("body").append($overlay);


$(".myimg").click(function(event){
  event.preventDefault();
  var imagelocation = $(this).attr("href");
  //var href = $(this).attr("href");
  $image.attr("src",imagelocation);
  $overlay.show();
  var captionText = $(this).children("img").attr("alt");
  $caption.text(captionText);
});

$("#overlay").click(function(event){
  $(this).hide();
});