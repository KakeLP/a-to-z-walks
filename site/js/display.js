$( document ).ready( function() {

  // Set up the map.
  var m = L.map( 'map' ).setView( [51.496775, -0.11652375], 10 );

  var osmDataAttr = 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  var osm_layer = new L.TileLayer(
                          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                          { attribution: osmDataAttr } );

  osm_layer.addTo( m );

  // Add the GeoJSON data layers.
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

  // Set up the title box.
  $( "#title-text" ).html( "Walking Across London — Kake’s A–Z Walks" );
  $( "#title-expander" ).hide();
  $( "#title-collapser" ).click( function() {
    $( "#title" ).hide();
    $( "#title-expander" ).show();
    $( "#map" ).height( "100%" );
  } );
  $( "#title-expander" ).click( function() {
    $( "#title" ).show();
    $( "#title-expander" ).hide();
    recalcMapHeight();
  } );

} );

$( window ).load( function() {
  // For smaller screens, set the height of the map to the viewport minus the
  // height of the title box.  Have to do this here rather than in
  // $( document ).ready() so we can be sure #title's height has been set.
  recalcMapHeight();
});

function recalcMapHeight() {
    if ( $( window ).width() < 640 ) {
      $( "#map" ).height( $( window ).height() - $( "#title" ).outerHeight() );
    }
}
