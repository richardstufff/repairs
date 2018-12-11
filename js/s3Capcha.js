/* ------------------------------------------------------------------------
 s3Capcha
 
 Developped By: Boban Karišik -> http://www.serie3.info/
 Icons and css: Mészáros Róbert -> http://www.perspectived.com/
 Version: 1.0
 
 Copyright: Feel free to redistribute the script/modify it, as
 long as you leave my infos at the top.
 ------------------------------------------------------------------------- */


$(function () {
    $('#capcha').s3Capcha();

    var counter = true;
    $("#capcha input").each(function () {
        if ($(this).val() == $("#s3capchaRandValue").val()) {

        } else {
            if (counter) {
                $(this).attr("checked", "true");
                counter = false;
            }
        }
    });
});

(function ($) {

    jQuery.fn.extend({
        check: function () {
            return this.each(function () {
                this.checked = true;
            });
        },
        uncheck: function () {
            return this.each(function () {
                this.checked = false;
            });
        }
    });


    $.fn.s3Capcha = function (vars) {
        var element = this;

        if (element[0] != undefined) {
            var spans = $("#" + element[0].id + " div span");
            var radios = $("#" + element[0].id + " div span input");
            var images = $("#" + element[0].id + " div .img");
            // hide radios //
            spans.css({
                'display': 'none'
            });
            // show images //
            images.css({
                'display': 'block'
            });

            images.each(function (i) {
                $(images[i]).click(function () {
                    //Reset checked by default
                    $(radios[0]).uncheck();

                    images.css({
                        'background-position': 'bottom left'
                    });
                    $(images[i]).css({
                        'background-position': 'top left'
                    });
                    $(radios[i]).check();
                });
            });
        }
    }

})(jQuery);