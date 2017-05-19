// Module Boef
Boef = (function () {
    var emitters = [], sensors = [], rijen = [];
    var aardstraal = 6371000, grondsnelheid = 4176, grondstofsnelheid = 1493, grondstoftijd;

    radianConverter = function (term) {
        return term * (Math.PI / 180);
    }

    return {
        plaatsEmitter: function (latitude, longitude) {
            emitters.push({latitude: latitude, longitude: longitude})
        },
        emitters: function () {
            return emitters;
        },

        plaatsSensor: function (latitude, longitude) {
            sensors.push({
                latitude: latitude, longitude: longitude, afstand: function () {
                    var term1 = Math.sin((radianConverter(this.latitude) - radianConverter(emitters[0].latitude)) / 2) * Math.sin((radianConverter(this.latitude) - radianConverter(emitters[0].latitude)) / 2);
                    var sinsquared = Math.sin((radianConverter(this.longitude) - radianConverter(emitters[0].longitude)) / 2) * Math.sin((radianConverter(this.longitude) - radianConverter(emitters[0].longitude)) / 2);
                    var term2 = (Math.cos(radianConverter(this.latitude)) * Math.cos(radianConverter(emitters[0].latitude)) * sinsquared);
                    var sqrt = term1 + term2;
                    return 2 * aardstraal * Math.asin(Math.sqrt(sqrt));
                },
                pulse: function (tijd) {
                    var afstand = this.afstand();
                    grondstoftijd = (afstand - (grondsnelheid * tijd)) / (grondstofsnelheid - grondsnelheid);
                },

                aantalMeterGrondstof: function () {
                    return grondstoftijd * grondstofsnelheid;
                }
            })
        },

        plaatsSensoren: function (latitude, longitude, number) {
            var latDelta = latitude - emitters[0].latitude;
            var longDelta = longitude - emitters[0].longitude;
            for(var i = 0; i < number; i++) {
                if(i===0) {
                Boef.plaatsSensor(latitude, longitude);
            }
                else{
                    latitude = rijen[0][i-1].latitude + latDelta;
                    longitude = rijen[0][i-1].longitude + longDelta;
                    Boef.plaatsSensor(latitude, longitude);
                }
                rijen.push(sensors);
            }
        },

        sensors: function () {
            return sensors;
        },

        rijen: function () {
            return rijen;
        },

        reset: function () {
            emitters = [];
            sensors = [];
            rijen = [];
        }
    };
})();