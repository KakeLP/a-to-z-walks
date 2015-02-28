$( document ).ready( function() {
  var m = L.map( 'map' ).setView( [51.496775, -0.11652375], 10 );

  var mapQuestAttr = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
  var osmDataAttr = 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  var mopt = {
    url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
    options: { attribution: mapQuestAttr + osmDataAttr, subdomains: '1234' }
  };
  var mq = L.tileLayer( mopt.url, mopt.options );
  mq.addTo( m );

  function popUp( f, l ) {
    var text = '<span class="walk-name">' + f.properties['name']
             + '</span><br>'
             + '<span class="walk-start-end">' + f.properties['start']
             + ' to ' + f.properties['end'] + '</span><br>'
             + '<span class="walk-date">' + f.properties['date'] + '</span>';
    if ( f.properties['flickr'] ) {
      text += '<br><span class="walk-photoset"><a href="'
            + f.properties['flickr'] + '">Flickr photoset</a></span>';
    }
    l.bindPopup( text );
    if ( f.properties['name'].match( /[13579]$/ ) ) {
      l.setStyle( oddStyle );
    } else {
      l.setStyle( evenStyle );
    }
  }

  var oddStyle = {
    "color": "#ff0000",
    "weight": 5,
    "opacity": 1
  };

  var evenStyle = {
    "color": "#0000ff",
    "weight": 5,
    "opacity": 1
  };

  var geojsonLayer = new L.GeoJSON.AJAX( datafiles, { onEachFeature: popUp } );
  geojsonLayer.addTo( m );

} );
