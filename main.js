<<<<<<< current
$(document).ready(function(){
  if (typeof language !== 'undefined') {
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
            arrows: false
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

    $.getJSON( "https://www.silas229.de/api.php?projects="+language )
    .done(function( data ) {
      var project;
      $.each(data, function(i, object) {
        if (object.newtab == '0') {
          object.url = 'https://www.silas229.de' + object.url;
        }
        project = '<a title="' + object.description  + '" href="' + object.url +'" class="slider-element" target="_blank">';
        project += '<img src="https://www.silas229.de/lib/img/' + object.icon_url + '-ico.png">';
        project += '<br>';
        project += '<span>' + object.tax + '</span>';
        project += '<h1 title="' + object.name  + '">' + object.name +'</h1>';
        project += '<p title="' + object.description + '">' + object.description +'</p>';
        project += '</a>'
        $('.slider').slick('slickAdd',project);
      });
      $(".slider").slick('removeSlide', 0);
      //$(".slider").html(projects);
    });

    const crate = new Crate({
      server: '226768293195808768',
      channel: '226774461599318017',
      shard: 'https://cl1.widgetbot.io'
    })

    if (language == 'de') { crate.notify( 'Hi!👋 Hinterlass doch eine Nachricht auf meinem Discord!😉' ) } else { crate.notify( "Hi!👋 Why don't you leave a message on my discord?😉" ) }
    crate.on('signIn', data => {
      console.log(`Gast als ${data.name} angemeldet`)
    })

  }
});
=======
$(document).ready(function(){
  if (typeof language !== 'undefined') {
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

    $.getJSON( "https://www.silas229.de/api.php?projects="+language )
    .done(function( data ) {
      var project;
      $.each(data, function(i, object) {
        if (object.newtab) {
          object.url = 'https://silas229.de' + object.url;
        }
        project = '<a href="' + object.url +'" class="slider-element" target="_blank">';
        project += '<img src="https://www.silas229.de/lib/img/' + object.icon_url + '-ico.png">';
        project += '<br>';
        project += '<span>' + object.tax + '</span>';
        project += '<h1>' + object.name +'</h1>';
        project += '<p>' + object.description +'</p>';
        project += '</a>'
        $('.slider').slick('slickAdd',project);
      });
      $(".slider").slick('removeSlide', 0);
      //$(".slider").html(projects);
    });
  }
});
>>>>>>> before discard
