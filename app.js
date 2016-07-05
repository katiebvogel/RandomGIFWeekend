var clickCount = 0;
var displayAmount = 5;
$(document).ready(function(){

//This will get a RANDOM cat sticker
$('.getCatGIF').on('click', function(){
  $('.gifCatSpace').empty();
  var promise = $.ajax('http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC ');
  promise.then(function(response){
    // console.log([response]);
    var i =  Math.floor(Math.random() * response.data.length + 1);
    var id= response.data[i].id;
    var gif = response.data[i].images.downsized.url;
    // $('.gifCatSpace').append('<h1>' + id + '</h1>');
    $('.gifCatSpace').append('<img src=\' '+ gif +  '\'/>');
  })
})

//this will get a random GIF from the already randomized search in giphy API
$('.getOtherGIF').on('click', function(){
  $('.otherSpace').empty();

  var promise = $.ajax('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&');
  promise.then(function(response) {
    console.log(response);
    var otherID = response.data;
    var otherGIF = response.data.fixed_height_downsampled_url;
    // $('.otherSpace').append('<h1>' + otherID + '</h1>');
    $('.otherSpace').append('<img src=\' '+ otherGIF + '\'/>');
  })
})


//This will allow a user to type in a keyword (I called it a tag) to search for random GIFS that match their key words.
$( "#searchByTag" ).submit(function( event ) {
  event.preventDefault();
  // $('input#tag').empty();
  // couldn't figure out a good way to empty the input field.
  $('.searchSpace').empty();
  var mySearch = $('#tag').val();
  console.log(mySearch);

  $.get('http://api.giphy.com/v1/gifs/search?q='+ mySearch +'&api_key=dc6zaTOxFJmzC')
      .then(function(data){
    var k =  Math.floor(Math.random() * data.data.length + 1);
    //This shows a random GIF that matches the tag (name)
    $('.searchSpace').append('<img src=\"'+ data.data[k].images.fixed_width.url +'\"></img>');
  })
});

//Similar to the search above, but following the directions for Pro Mode in the README.  This will employ a submit key word and display 5 GIFS at a time.  Every time the user presses the submit button, the first five sill clear and another click on the same button will display the next 5 GIFS will display.
var j=0;
$( "#nextFive" ).submit(function( event ) {
  event.preventDefault();

  clickCount+= parseInt($(this).find('#1').attr('id'));
  $('.fiveSpace').empty();
  console.log(clickCount);

  var mySearch2 = $('#tag2').val();
  console.log(mySearch2);

  $.get('http://api.giphy.com/v1/gifs/search?q='+ mySearch2 +'&api_key=dc6zaTOxFJmzC')
      .then(function(data){


      if(clickCount == 1){
        for(; j< displayAmount; j++){

        $('.fiveSpace').append('<img src=\"'+ data.data[j].images.fixed_width.url +'\"></img>');

      }
    }
      if(clickCount ==2) {
        $('.fiveSpace').empty();
        clickCount = 0;
      }

    })

    })



});
