/* uSlideJS 0.0.1 */

function uSlide() {
    
    var params = {};
    
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
        var mediaObj = params.response.mediaObject.split('.');
        console.log(mediaObj.length);
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