$(document).ready(function(){
  var shareUrl,
      authorWiki,
      $quoteWrap = $('#quoteWrap'),
      $quote = $('#quote'),
      $quoteAuthor = $('#quoteAuthor'),
      $quoteIcons = $('#quoteIcons'),
      $authorWiki = $('#authorWiki'),
      $shareQuote = $('#shareQuote'),
      $generateQuote = $('#generateQuote'),
      $currentQuote = $('.current-quote');
                         
  function tweetFix(data) {
      var fixQuote = data.quoteText;
      var fixAuthor = data.quoteAuthor;
      var maxQuoteLength = 140 - 25 - fixAuthor.length;
      if (fixAuthor == '') {
        fixAuthor = "Anonymous ";
      }
      if (fixQuote.length > maxQuoteLength) {
        fixQuote = fixQuote.slice(0, maxQuoteLength - 3);
        fixQuote += "...";
      }
      shareUrl = encodeURIComponent(fixQuote + '-' + fixAuthor + " http://bit.ly/1PRQbO4");
      $shareQuote.html('<a target="_blank" title="Share the quote on twitter" href="https://twitter.com/intent/twee\tt?text=' + shareUrl + '"><img class="shareQuote" src="http://files.aesop2015.eu/200000494-54ec355e13/twitter-icon.png"></a>');
  }

  function getQuote(){
    $quoteIcons.css("visibility", "hidden");
    
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      success: function(data){
        authorWiki = '<a target="_blank" title="Find out more about the author" href="https://wikipedia.org/wiki/' + data.quoteAuthor + '"><img class="authorWiki" src="http://icons.iconarchive.com/icons/limav/flat-gradient-social/512/Wikipedia-icon.png"></img></a>';
        
        $currentQuote.fadeOut(500, function(){
          $quote.html(data.quoteText);
          $quoteIcons.css("visibility", "visible");
          
          if (data.quoteAuthor === '') {
            $("#quoteAuthor").html("- Anonymous -");
            $("#authorWiki").html('<a target="_blank" title="Find out more about the author" href="http://wikipedia.org/wiki/anonymous"><img class="authorWiki" src="http://icons.iconarchive.com/icons/limav/flat-gradient-social/512/Wikipedia-icon.png"></a>');
          } else {
            $("#quoteAuthor").html("- " + data.quoteAuthor + " -");
            $("#authorWiki").html(authorWiki);
          }
        }).fadeIn(500);
        tweetFix(data);
      },
      error: function() {
        $quote.text("Whoa, the world has run out of quotes! Try again in a moment.");
        $quoteAuthor.text('Apologies');
      }
    });
  }  
  
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
  
  $generateQuote.click(function(){
    getQuote();
  });
  getQuote();          
});