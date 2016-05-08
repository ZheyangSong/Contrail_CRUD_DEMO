// the page-level knockout View Model, it's an augmented Clusters instance

var pageViewModel = new ClustersVM(mockDB.clusters);

$.extend(pageViewModel, {
    clusterStatusOptions: ["true", "false"],
    serverRoleOptions: ["config", "contorl", "openstack", "webui"],
    util: {
        constants: CONSTANTS,
        capitalize: function(str) {
            return str.replace(/(\w+)/, function(match, g1) {
                return g1[0].toUpperCase() + g1.substring(1);
            });
        }
    },
    operationMenu: {
        edit: function(operand) {
            // cache the current operand's status for possible recover later
            operand._cache = ko.toJS(operand);
            // set operand's status to edit mode to enable ueser editing
            operand._status(CONSTANTS.CRUD_OPERAND_STATUS.EDIT);
        },
        confirm: function(operand) {
            // send updated operand to backend service, in real scene
            // before the operaned is stringified and sent out, some
            // interal usage properties/methods need to be removed.
            // As demo, the updated operand will be output to console
            console.log("Old:\n", ko.toJS(operand._cache));
            console.log("New:\n", ko.toJS(operand));
            console.log("Send to: " + "some API URI");

            // drop the cached old state
            operand._cache = null;

            // set operand's status back to display mode
            operand._status(CONSTANTS.CRUD_OPERAND_STATUS.DISPLAY);
        },
        cancel: function(operand) {
            if (operand._status() === CONSTANTS.CRUD_OPERAND_STATUS.CREATE) {
                // when cancel newly created operand, simply remove it
                operand._owner._discard(operand, operand._holderName);
            } else if (operand._cache) {
                // _cache could be null, if a newly created operand was just removed

                // rollback the operand's state
                operand._owner[operand._holderName].replace(operand, new operand.constructor(operand._cache, operand._owner, operand._holderName));

                // drop the cached old state
                operand._cache = null;
            }
            // set operand's status back to display mode
            operand._status(CONSTANTS.CRUD_OPERAND_STATUS.DISPLAY);
        },
        remove: function(operand) {
            // send request to backend service to remove the operand
            // as demo, the request will be output to console
            console.log(["Delete", operand.id(), "request"].join(" "));
            console.log("Send to: " + "Some API URI");

            // set the operand's state to removed mode
            // this is pre-built for soft-deletion needs
            operand._status(CONSTANTS.CRUD_OPERAND_STATUS.REMOVED);

            // remove operand from its owner
            operand._owner._discard(operand, operand._holderName);
        }
    }
});

$(function() {
    ko.applyBindings(pageViewModel);
});
