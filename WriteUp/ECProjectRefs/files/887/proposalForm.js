var mainColumn1     = "#right-column";
var extendingReady = true;

var affCount = 0;
$(document).on('click', '.addNewAffiliation', function(e) {
    e.preventDefault();
    var container = $("#affiliationList");
    var fields = $(".dynamic-form-container").find('input');

    var valid = true;
    //custom check if addForm should be called: if all fields are not empty!
    fields.each(function () {
        if (!$(this).val().length) {
            valid = false;
            //disable add button

            return false;
        }
    });
    if (valid){
        var affList = $('#affiliationList');

        // grab the prototype template
        var newWidget = affList.attr('data-prototype');
        newWidget = newWidget.replace(/__name__/g, affCount);

        // create a new list element and add it to the list
        if (affCount == 0) {
            newWidget = '<div class="columns large-10">'+newWidget+'</div>';
        } else {
            newWidget = '<div class="columns large-10">'+newWidget+'</div><div style="display: inline-block;" class="columns large-2 remove-dynamic-input"><a style="text-decoration: none" href="">X</a></div>';
        }
        var newLi = $('<div style="padding: 0px !important;" class="dynamic-form-container row"></div>').html(newWidget);
        newLi.appendTo(affList);
        affCount = affCount + 1;
    }

});

function guestExperience(type, notType) {
    $('.' + type).toggleClass('radioHover');
    $('.' + notType).removeClass('radioHover');
    if (type == 'yes') {
        $('#form_guestEditor_0').prop('checked', true);
        $('#form_guestEditor_1').prop('checked', false);
    } else {
        $('#form_guestEditor_1').prop('checked', true);
        $('#form_guestEditor_0').prop('checked', false);
    }
}

$(document).ready(function()
{
    if ($('.experience').attr('data-value') == 1) {
        guestExperience('yes', 'no');
    } else if ($('.experience').attr('data-value') == 0) {
        guestExperience('no', 'yes');
    }

    if ($('.element')) {
        var affil = $('.element').removeClass('element').addClass('columns large-10').css('margin-top', '0px');
        $(affil).wrap('<div style="padding: 0px !important;" class="dynamic-form-container row"></div>');
    }
    if ($('.dynamic-form-container').length == 0) {
        $('.addNewAffiliation').trigger('click');
    }

    tinyMCE.remove();
    tinyMCE.init({
        selector: 'textarea.tinymce',
        content_style: ".mce-content-body {font-size:13px;font-family:Arial,sans-serif;}",
        menubar: false,
        statusbar: false,
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |',
        // content_css: '{{ asset('assets/css/tinymce_content.css') }}',
        valid_elements: "sub,sup,span[style<text-decoration: underline;],em,strong,br,div[style], ,img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],a[name|href|target|title|alt]",
        invalid_elements: "h1,h2,p",
        force_p_newlines: false,
        force_br_newlines: true,
        forced_root_block: "",
        browser_spellcheck: true,
        relative_urls: false,
        remove_script_host: false,
        setup: function (ed) {
            ed.on('change', function () {
                tinymce.triggerSave();
            });
            ed.on('init', function () {
                this.pasteAsPlainText = true;
            });
            ed.on('postProcess', function (o) {
                o.content = o.content.replace(/&lt;!--([\s\S]*?)--&gt;/ig, '');
                o.content = o.content.replace(/&nbsp;/ig, ' ');
            });
        },
    });

    $(".datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: new Date()
    });
    $(".datepicker").keydown(false);

    $(document).on("click", ".remove-dynamic-input", function(e)
    {
        e.preventDefault();
        $(this).parent().remove();
    });

    $(document).on('click', '.yes', function(e) {
        guestExperience('yes', 'no');
    });

    $(document).on('click', '.no', function(e) {
        guestExperience('no', 'yes');
    });
});