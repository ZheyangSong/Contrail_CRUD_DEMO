// global constants
var CONSTANTS = {
    CRUD_OPERAND_STATUS: {
        CREATE: 1,
        DISPLAY: 2,
        EDIT: 3,
        REMOVED: 4
    }
};
// end

// custom knockout bindings
ko.bindingHandlers.accessTagID = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var accessor = valueAccessor();

        accessor(element.id);
    }
};
// end

// config jQuery validator
jQuery.validator.setDefaults({
    errorPlacement: function() {},
    highlight: function(element, errorClass) {
        $(element).addClass(errorClass + " alert-danger");
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass + " alert-danger");
    },
    showErrors: function(errorMap, errorList) {
        this.defaultShowErrors();
        errorList.forEach(function(item) {
        	console.log(this);
            var $elem = $(item.element),
            errorClass = "error",
                msgId = $elem.attr('id') + "-" + errorClass,
                $errorMsg = $elem.siblings("#" + msgId);

            $elem.addClass(errorClass + " alert-danger");
            if (!$errorMsg.length) {
                $("<span/>").attr({
                    id: msgId,
                    class: errorClass
                }).html(item.message).appendTo($elem.parent());
            }
        }, this);
    }
});
// end
