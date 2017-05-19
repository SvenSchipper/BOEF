var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.102346, lng: 5.175269},
        zoom: 18
    });

    Boef.plaatsEmitter(52.102346, 5.175269);
    Boef.plaatsSensoren(52.101448,5.175354, 1000);

      var marker, i;
     marker = new google.maps.Marker({
         position: new google.maps.LatLng(Boef.emitters()[0].latitude, Boef.emitters()[0].longitude),
         map: map
       });

    for (i = 0; i < Boef.rijen()[0].length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(Boef.rijen()[0][i].latitude, Boef.rijen()[0][i].longitude),
            map: map
        });
   }
}