/** Menu ***/
function mainMenuInit() {
    //Controll the main menu drop down list
    var theRelativeUrl = window.location.href.substring(liveSite.length);
    hasActiveMenu = false;
    //find exact match
    $('a', $('#mainMenu')).each(function () {
        currentLink = $(this).attr('href');
        if (currentLink == theRelativeUrl) {
            //two levels of submenus.
            $(this).parent('li:first').addClass('activeMenu').parents('li:first').addClass('activeMenu').parents('li:first').addClass('activeMenu');
            hasActiveMenu = true;
        }
    });

    //find next leve match if no exact match found
    if (!hasActiveMenu) {
        var theLength = theRelativeUrl.lastIndexOf('/');
        if (theLength != -1) {
            theRelativeUrl = theRelativeUrl.substring(0, theLength);
            $('a', $('#mainMenu')).each(function () {
                currentLink = $(this).attr('href');
                if (currentLink == theRelativeUrl) {
                    //two levels of submenus.
                    $(this).parent('li:first').addClass('activeMenu').parents('li:first').addClass('activeMenu').parents('li:first').addClass('activeMenu');
                    hasActiveMenu = true;
                }
            });
        }
    }

    //find next leve match if no exact match found
    if (!hasActiveMenu) {
        var theLength1 = theRelativeUrl.lastIndexOf('/');
        if (theLength1 != -1) {
            theRelativeUrl = theRelativeUrl.substring(0, theLength1);
            $('a', $('#mainMenu')).each(function () {
                currentLink = $(this).attr('href');
                if (currentLink == theRelativeUrl) {
                    //two levels of submenus.
                    $(this).parent('li:first').addClass('activeMenu').parents('li:first').addClass('activeMenu').parents('li:first').addClass('activeMenu');
                    hasActiveMenu = true;
                }
            });
        }
    }

    //default to first menu item if no match found.
    if (!hasActiveMenu) {
        $('li:first', $('#mainMenu')).addClass('activeMenu');
    }

    $('li:last-child', $('#mainMenu')).addClass('lastMenu');

    $('ul li', $('#mainMenu')).hover(
            function () {
                $(this).addClass('over');
            },
            function () {
                $(this).removeClass('over');
            }
    );
}

//Webform verify field
function verifyWebform(formID) {
    var errorMsg = '';
    var errorMsgStatus = false;

    $(".verifyFieldClass").each(function () {
        var verifyFieldID = $(this).attr("id");
        var verifyFieldArr = verifyFieldID.split("verifyFormField");

        if (verifyFieldArr.length == 2 && verifyFieldArr[1] != '') {
            if ($("#formField" + verifyFieldArr[1]).val() != $(this).val()) {
                errorMsg += $(this).prev("label").text() + " is not the same!\n";
                errorMsgStatus = true;
            }
        }
    });

    if (errorMsgStatus) {
        alert(errorMsg);
        return false;
    } else {
        if ($("#captchaCode").val() != "") {
            $("#formmail-" + formID).submit();
            return true;
        } else {
            alert("Verification is incorrect!");
            window.location = liveSite + "#contactus";
            return false;
        }
    }
}

//**************************************************************************//
var fruitCapcha = '';

$(function () {
    $("#capcha .img").click(function () {
        fruitCapcha = $(this).parent().find("input:radio").val();
    });

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 50
                }, 1000);
                return false;
            }
        }
    });

    //Promo Message
    $("#promoCodeValue").focusout(function () {
        $.ajax({
            type: "GET",
            url: "main.php?option=com_checkout&theAction=promoMessageDisplay&promoCode=" + $(this).val(),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (data) {
                if (data) {
                    $('#promoMessage th').text(data);
                    $('#promoMessage').show();
                } else {
                    $('#promoMessage th').text("");
                    $('#promoMessage').hide();
                }
            },
            error: function () {
                $('#promoMessage th').text("");
                $('#promoMessage').hide();
            }
        });
    });

    //webpage gallery images lightbox
    $('#webpage-gallery-box a').prettyPhoto({
        social_tools: ""
    });

    $('#bweb-system-message').slideDown('slow');

    //initial menu setup
    mainMenuInit();

    //User registration form verification
    $('#loginForm').submit(function () {
        if ($('#member_pass').attr('value') != $('#member_pass1').attr('value')) {
            alert('Passwords entered are not the same!');
            return false;
        }
    });

    //Blog commment area
    $('.reply-button').click(function () {
        $('#cancel-reply').css('display', 'block');

        $('#parent_id').attr('value', $(this).attr('title'));
        $('#commentform-section').css('display', 'none');
        $(this).parent().append($('#commentform-section').remove());
        $('#commentform-section').slideDown('slow');

        $('#cancel-reply').click(function () {
            $('#cancel-reply').css('display', 'none');
            $('#parent_id').attr('value', 0);
            $('.comment-section').append($('#commentform-section').remove());
            return false;
        });

        return false;
    });
});

//formmail component
$(function () {
    $(".formmail-datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    /**
     $(".mini-calendar").datepicker({
     onSelect: function(dateText, inst) {
     //ajax call to display selected date event(s)
     var date = dateText.split("/");
     miniCalendarSelection(date[0],date[1],date[2]);
     }
     });**/

    if ($('.referUrlForm').val() == "" || $('.referUrlForm').val() == undefined) {
        $('.referUrlForm').attr('value', window.location.href);
    }
});

//newsletter component
$(function () {
    $(".newsletter-signup-form").submit(function () {
        $('.newsletter-refer-url').attr('value', window.location.href);
        $('.newsletter-token-id').attr('value', liveSite);
    });
});


//check compulsory fields
function adminFormOnSubmit() {
    $('.required-field').removeClass('required-field-highlight');

    var valid = true;
    var message = new Array();
    $('.required-field').each(function () {
        if (!$(this).val()) {
            valid = false;
            $(this).addClass('required-field-highlight');
            message.push($(this).attr('title'));
        }
    });

    if (!valid) {
        alert("Please enter the following required fields: " + message.join(','));
        return false;
    }

    return true;
}