var globalQuery;
var globalMaxResults;
var globalOrder;

var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  //console.log('globalQuery is ' + globalQuery);
  //https://developers.google.com/youtube/v3/docs/search/list
  var query = {part: 'snippet',
               key: 'AIzaSyAvbV9_8t_DS95wve7Bgp1OytF60ANVhho',
               type: 'video', 
               relevanceLanguage: 'en',
               q: globalQuery,
               maxResults:globalMaxResults,
               order: globalOrder               
             }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}


function displaySearchData(data) {
  console.log(data.items);
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += '<article><strong>'+item.snippet.title+'</strong><br />';
     resultElement += '<a href="https://www.youtube.com/watch?v=' + item.id.videoId+'"><img src="' + item.snippet.thumbnails.medium.url + '"></a>';
     resultElement += '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" class="channel">' + item.snippet.channelTitle + ' Channel</a>';
     resultElement += '</article>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    $('form #js-disclaimers').html('');
    //var query = $(this).find('.js-query').val();
    globalQuery = $(this).find('input[name="js-searchQuery"]').val();
    if(!globalQuery){
      $('form #js-disclaimers').append("<h2>No serch query found. Default query is 'thinkful'</h2>");
      globalQuery = 'thinkful'    
    }
    globalMaxResults = $(this).find('input[name="js-maxResults"]').val();
    if(!globalMaxResults){
      $('form #js-disclaimers').append("<h2>No maxResults found. Default maxResults is 5</h2>");
      globalMaxResults = 5;    
    }
    globalOrder = $(this).find('input[name="js-order"]:checked').val();
    if(!globalOrder){
      $('form #js-disclaimers').append("<h2>Sort Order not found. Default sort order is 'relevance'</h2>");
      globalOrder = 'relevance'    
    }
    getDataFromApi(globalQuery, displaySearchData); //AKIVA, how come no argument is given to displaySearchData?
  });
}

$(function(){watchSubmit();});
