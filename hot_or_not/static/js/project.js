/* Project specific Javascript goes here. */

/*
Formatting hack to get around crispy-forms unfortunate hardcoding
in helpers.FormHelper:

    if template_pack == 'bootstrap4':
        grid_colum_matcher = re.compile('\w*col-(xs|sm|md|lg|xl)-\d+\w*')
        using_grid_layout = (grid_colum_matcher.match(self.label_class) or
                             grid_colum_matcher.match(self.field_class))
        if using_grid_layout:
            items['using_grid_layout'] = True

Issues with the above approach:

1. Fragile: Assumes Bootstrap 4's API doesn't change (it does)
2. Unforgiving: Doesn't allow for any variation in template design
3. Really Unforgiving: No way to override this behavior
4. Undocumented: No mention in the documentation, or it's too hard for me to find
*/
$('.form-group').removeClass('row');

$('.left-option').click(function() {
	var data = {
		'action': 'vote_left'
	}
	var id = $(".match").data().id;

	var request = voteRequest(data, id).done(function(msg) {
		$('.left-count').text(msg.vote_left);
		location.reload();
	})

	request.fail(function(err, txtStatus) {
		console.log(err);
		console.log(txtStatus);
	})
});

$('.right-option').click(function() {
	var data = {
		'action': 'vote_right'
	}

	var id = $(".match").data().id;

	var request = voteRequest(data, id).done(function(msg) {
		$('.right-count').text(msg.vote_right);
		location.reload();
	})

	request.fail(function(err, txtStatus) {
		console.log(err);
		console.log(txtStatus);
	})
});

function voteRequest(data, id) {
	return $.ajax({
			  url : '/game/vote/' + id,
			  data : JSON.stringify(data),
			  type : 'PATCH',
			  contentType : 'application/json',
			  processData: false,
			  dataType: 'json'
			});
}

function newGameRequest() {
	return $.ajax({
			  url : '/game/next',
			  type : 'GET',
			  contentType : 'application/json',
			  processData: false,
			  dataType: 'json'
			});
}

var $delete = $('.delete'),
    $like = $('.like'),
    $header = $('.header'),
    $close = $('.close'),
    $corazon = $('.header').find('svg');
    $openCard = $('.cards-wrapper').find('.card').eq(4),
    deletecard = new TimelineMax(),
    lovecard = new TimelineMax(),
    openthecard = new TimelineMax();

function deleteCard(){
  
  $delete.on('click', function(){
  	if (localStorage.getItem('connected')) {
	    var $card = $('.cards-wrapper').find('.card').eq(4);
	    $card.attr('style','');

	    var $cardContent = $card.clone().wrap('<li>').parent().html();
	    $('.cards-wrapper').prepend($cardContent);
	    TweenLite.fromTo($delete, 0.5, {boxShadow: '0 0 0 0 rgba(0,0,0,0.5)' }, {boxShadow: '0 0 0 20px rgba(0,0,0,0)'});

	    cardAnimate($card);
	    refreshOpen();
  	} else {
		Swal("Please connect with Facebook to continue");
  	}

  });
}

function cardAnimate($card){

  deletecard.to($card, 0.35,  {
    rotationX:-85,
    transformOrigin:"0 385px",
  })
  .to($card, 0.2, {opacity:0.8, onComplete: function(){
      $card.remove();
    } }, '-=0.32')
}

function likeAnimate($card){
  lovecard.to($card, 0.5,  {
    y:'-=100',
    scale:0.5,
  })
  .to($card, 0.4, {
    opacity:0.5,
    scale:0,
    x: '500',
    y:'-=150',
    onComplete: function(){
      $card.remove();
    } }, "-=0.2")
  .to( $corazon, 0.5, {fill: '#ff2a64', onComplete: function(){
    TweenMax.to($corazon, 0.5, {fill:'#E8D1F9'});
  } } );
}


function refreshOpen(){

  $open = $('.cards-wrapper').find('.card').eq(4);
  $close = $('.close');


  var request = newGameRequest().done(function(msg) {
	 $open.eq(0).find('.circle').attr('src', msg.image);
  })


  $openCard = $open;
  openCard($openCard);
  closeCard($close);
}

function openCard(){
  $openCard.on('click', function(e) {
  	var el = $(this);
    var close = el.find('.card-header .close');
    var text = el.find('.card-content .text').eq(0);
    if( !(el.hasClass('open')) ){

      openthecard.to( $openCard, 0.3, {y:'-=90', scale: 1.25, height: 480} )
                .to( $header, 0.3, {y: '-=70'}, '-=0.3' )
                .to(text, 0.3, {borderRadius:'15px',height:150}, '-=0.3')
                .to(close, 0.3, {opacity:1})

      el.addClass('open')
    }
  });
}

function closeCard(){
  $close.on('click', function(e) {
    e.stopPropagation();
    var el = $(this);
    var openCard = el.parents('.card');
    var text = openCard.find('.card-content .text').eq(0);
    var $card = $('.cards-wrapper').find('.card').eq(4);
    openCard.removeClass('open');
    openthecard.to( $header, 0.3, {y: '0'} )
    .to(text, 0.3, {borderRadius:'50px',height:18}, '-=0.3')
    .to( el, 0.2, { opacity:0 }, '-=0.3' )
    .to( $openCard, 0.3, {y:'60', scale: 1, height: 330,  onComplete: function(){
      TweenMax.set($card, {clearProps:'all'});
    }}, '-=0.3' )
  });
}

function likeCard(){
  $like.on('click', function(e) {
  	if (localStorage.getItem('connected')) {
	    var el = $(this);
	    var $card = $('.cards-wrapper').find('.card').eq(4);
	    TweenLite.set($card, {clearProps:'all'});

	    var $cardContent = $card.clone().wrap('<li>').parent().html();
	    $('.cards-wrapper').prepend($cardContent);
	    TweenLite.fromTo(el, 0.5, {boxShadow: '0 0 0 0 rgba(0,0,0,0.5)' }, {boxShadow: '0 0 0 20px rgba(0,0,0,0)'});
	    likeAnimate($card);
	    refreshOpen();
	} else {
		Swal("Please connect with Facebook to continue")
	}
  });
}

likeCard();
closeCard();
openCard();
deleteCard();

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    checkFbLoggedIn(response);
  });
}
