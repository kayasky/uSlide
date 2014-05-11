/* uSlideJS 0.0.1 */

function uSlide() {
    
    var params = {},
        mediaArray = [],
        mediaPathsArray = [];
    
    this.init = function(elem, p){
        params = p;
        $.ajax({
            type: p.type,
            dataType: p.dataType,
            jsonpCallback: 'parseMedia',
            url: p.endpoint,
            data: p.request,
            cache: true
        });  
    }
    
    window.parseMedia = function(data) {
        mediaArray = data;
        if (params.response.mediaObject.length > 0) {
            var mediaObjLoc = params.response.mediaObject.split('.');
            $.each(mediaObjLoc, function( index, value ) {
                mediaArray = mediaArray[value];
            });
        }
        parseMediaPaths(mediaArray);
    }
    
    var parseMediaPaths = function(media) {
        mediaPathsArray = media;
        $.each(media, function( index, value ) {
            if (params.response.mediaURL.length > 0) {
                var mediaURLLoc = params.response.mediaURL.split('.');
                $.each(mediaURLLoc, function( i, val ) {
                    mediaPathsArray[index] = value[val] + params.response.mediaURLSuffix;
                });
            }
        });
        console.log(mediaPathsArray);
    }
}

$.fn.extend({
    'uSlide': function (p) {
        this.each(function () {
            var ss = new uSlide(); /* Create an instance of the uSlide class */
            ss.init(this.id, p); /* Call the init function for each slideshow */
        });
        return $(this);
    }
});