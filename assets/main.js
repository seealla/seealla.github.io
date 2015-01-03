var seealla_template = $('#image-template').html();
var container = document.getElementById('gallery');
var Pack = require('horizontal-grid-packing');
var pack = new Pack(container);
pack.height = 350;
function seealla_photo(original, thumbnail) {
  var new_html = seealla_template.replace('{{original_link}}', original).replace('{{thumbnail_link}}', thumbnail);
  var elem = $(new_html);
  imagesLoaded(elem, function(e) {
    var elem = e.elements[0];
    var img = e.images[0];
    var width = img.img.naturalWidth;
    var height = img.img.naturalHeight;
    $(elem).attr({'data-width': width, 'data-height': height});
    pack.reload();
  });
  pack.append(elem);
  pack.reload();
}

window.addEventListener('resize', function () {
  pack.width = container.clientWidth;
  pack.reload();
});

//lightbox
$('body').on('click','.mfp-container',function(e){
  if( e.target !== this ) 
    return;
  $(this).find('.mfp-close').trigger('click');
});
$('#gallery').magnificPopup({
  delegate: '.lightbox-gallery-item',
  closeOnBgClick:false,
  closeOnContentClick:false,
  type: 'image',
  gallery: {
    enabled:true,
    tPrev: 'Previous',
    tNext: 'Next',
    tCounter: '%curr% / %total%',
    arrowMarkup: '<a title="%title%" class="tj-mp-action tj-mp-arrow-%dir% mfp-prevent-close"><i class="fa fa-angle-%dir%"></i></a>'
  }
});
