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
ko.bindingHandlers.accessDOM = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var accessor = valueAccessor();

        accessor(element);
    }
};
// end