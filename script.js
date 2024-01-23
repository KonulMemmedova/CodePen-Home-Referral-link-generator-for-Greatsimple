var z=0;

$(function () {
  $('[data-toggle="popover"]').popover()
})

var products = getProduct(false);
for (var i in products) {
  $('select[name=product]').append($(`<option value="${i}">${i}</option>`))  
}
 
$('form').submit(function(e) {
  showLink();
  $('.link').removeClass('invisible');
 return false; 
})

$('body').on('click', '.disabled',function(e) {
  return false; 
})

$('[name=vendor_id]').on('change', function () {
  localStorage.setItem('vendor_id', this.value);
}).val(localStorage.getItem('vendor_id'));

function disable(name, val) {
  $('[name='+name+'][value='+val+']').removeAttr('checked').addClass('disabled')
        .parent().addClass('disabled').removeClass('active');
  afterchange(name);
}

function enable(name, val) {
  $('[name='+name+'][value='+val+']').removeClass('disabled')
        .parent().removeClass('disabled');
  afterchange(name);
}

function afterchange(name) {
  if (!$('[name='+name+']:not(.disabled):checked').length) {
    console.log('test');
    $('[name='+name+']:not(.disabled)').eq(0).attr('checked', true)
      .parent('.btn').addClass('active');
  }
}

function updateForm() {
  if ($('[name=promo_type][value=0]:checked').length) {
    $('#collapseProduct').collapse('hide');
  } else {
    $('#collapseProduct').collapse('show');
  }
   
  if ($('[name=land_type][value=0]:checked').length) {
    $('.product-version').collapse('hide');
  } else {
    $('.product-version').collapse('show');
  }
  
  
}

$('input, select').on('keyup change click', function (){
  console.log('change!!!', this.name, z++); 
  var product = getProduct($('[name=product]:visible option:selected').val());
  if (product) {
    if (!product.promo) {
      disable('land_type','0');   
    } else {
      enable('land_type','0');
    }
    
    if (!product.free && !product.full) {
      disable('lend_type','1');
    } else {
      enable('lend_type', '1');
    }
    
    if (!product.free) {
      disable('product_version', '0');
    } else {
      enable('product_version', '0');
    }    
  }
  
  updateForm();
    
  showLink();
})

$('.utm-show').click(function () {
  $(this).parent().hide();
})


function getProduct(id) {
  
  var products = {
      'Administrator': {
          'free': 'administrator_demo',
          'full': 'administrator',
          'promo': 'https://administrator.design/'
      },
      'Big Design Bundle': {
          'promo': 'http://bundle.greatsimple.io/',
          'full': 'bigdesignbundle'
      },
    'Design Kit Bundle': {
          'full': 'designkitsbundle',
      },
      'iOS Design Kit': {
          'full': 'iosdesignkit',
          'promo': 'http://iosdesignkit.io/'
      },
    
      'Material Design Kit': {
          'full': 'materialdesignkit',

          'promo': 'https://materialdesignkit.com/'
      },
      
      'Module Framework': {
          'full': 'module_html',
          'promo': 'http://moduleframework.com/'

      },
      'Module Bundle': {
          'full': 'module_bundle',
          'promo': 'http://moduleframework.com/'
      },
      'Module Layouts': {
          'full': 'module_layouts',
          'promo': 'http://moduleframework.com/'
      },
      'Odessa': {
          'free': 'odessa_demo',
          'full': 'odessa',
          'promo': 'http://odessakit.com/'
      },
      'Glue': {
          'free': 'glue_demo',
          'full': 'glue',
          'promo': 'http://glue.greatsimple.io/'
      },
      'Pin': {
          'free': 'pin_demo',
          'full': 'pin',
          'promo': 'http://pinuikit.com/'
      },
      'Flowcharts Web': {
          'free': 'flowcharts_web_demo',
          'full': 'flowcharts_web',
          'promo': 'http://flowcharts.ws/'
      },
      'Flowcharts Mobile': {
          'free': 'flowcharts_mobile_demo',
          'full': 'flowcharts_mobile',
          'promo': 'http://mobile.flowcharts.ws/'
      },
      'Flowcharts Bundle': {
          'full': 'flowcharts_bundle',
          'promo': 'http://flowcharts.ws/'
      },

      'Platforma Web': {
          'free': 'platforma_web_demo',
          'full': 'platforma_web',
          'promo': 'http://platforma.ws/'
      },
      'Platforma HTML': {
          'free': 'platforma_html_demo',

          'full': 'platforma_html',
          'promo': 'http://platforma.ws/'
      },
      'Platforma Bundle': {

          'full': 'platforma_bundle',
          'promo': 'http://platforma.ws/'
      },
      'Platforma Android': {
          'free': 'platforma_android_demo',
          'full': 'platforma_android',
          'promo': 'http://android.platforma.ws/'
      },

      'Platforma iOS': {
          'free': 'platforma_ios_demo',
          'full': 'platforma_ios',
          'promo': 'http://ios.platforma.ws/'
      },
      'Stack': {
          'free': 'stack_demo',
          'full': 'stack',
          'promo': 'http://uistack.io/'
      },
      'Stamp': {
          'free': 'stamp_demo',
          'full': 'stamp',
          'promo': 'http://stamp.greatsimple.io/'
      },
      'Untitled719': {
          'full': 'untitled719',
          'promo': 'https://untitled719.com/'
      },
  }
  if (id) {
    return products[id];  
  } else {
    return products;
  }
  
}

function showLink() {
  var landing = 'https://greatsimple.io/';
  
  if (parseInt($('.active>[name=promo_type]').val())) {
    var product = getProduct($('[name=product] option:selected').val());
   
    landing = product['promo'];
    console.log(product);
    console.log(parseInt($('.active>[name=product_version]').val()))
    if (parseInt($('.active>[name=land_type]').val())) {
      landing = 'https://checkout.greatsimple.io'
      if (parseInt($('.active>[name=product_version]').val())) {
        landing += '/b/' + product['full'];  
      } else {
        landing += '/b/' + product['free'];
      }
    } 
  } 
  
  var link = 'https://checkout.greatsimple.io/p/'+ $('[name=vendor_id]').val()+'/'+encodeURIComponent(landing);
  $('.result-link').attr({
    'href': link
  });
 
    var utm = $('[name^="utm"]:visible').filter(function () {return !!this.value}).serialize();
  if (utm) {
    link +='?'+utm;
  }
  
  $('.result-link').text(link);
}

enable('promo_type', 1);
updateForm();
