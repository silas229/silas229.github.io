$(document).ready(function(){

  $.getJSON( "https://www.silas229.de/api.php?projects=en", function( data ) {
    var items = [];
    $.each(data, function(i, object) {
      $.each(object, function(kay, val) {
          items.push( "<li id='" + key + "'>" + val + "</li>" );
      });
    });
    $( "<ul/>", {
      "class": "",
      html: items.join("" )
    }).appendTo( "body" );
  });

  $('.slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          autoplay: false
        }
      },
      {
        breakpoint: 899,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  });
});
