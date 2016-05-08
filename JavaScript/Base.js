// The base class will be used to create vidw models
function Base(data, owner, holderName) {
    var self = this;

    self._status = ko.observable(data._status || CONSTANTS.CRUD_OPERAND_STATUS.DISPLAY);
    self._isEditing = ko.pureComputed(function() {
        var state = self._status();
        return state === CONSTANTS.CRUD_OPERAND_STATUS.EDIT ||
            state === CONSTANTS.CRUD_OPERAND_STATUS.CREATE;
    }, self);
    self._cache = data._cache || null;
    self._owner = owner || null;
    self._holderName = holderName || "";

    if (self._owner) {
        self._status.subscribe(function(newState) {
            if (newState === CONSTANTS.CRUD_OPERAND_STATUS.EDIT ||
                newState === CONSTANTS.CRUD_OPERAND_STATUS.CREATE) {
                this._owner._status(CONSTANTS.CRUD_OPERAND_STATUS.EDIT);
            }
        }, self);
    }
}

Base.prototype._discard = function(target, containerName) {
    this[containerName].remove(target);
};

Base.prototype._create = function(owner, holderName) {
    owner[holderName].push(new this.constructor({
        _status: CONSTANTS.CRUD_OPERAND_STATUS.CREATE
    }, owner, holderName));

    owner._status(CONSTANTS.CRUD_OPERAND_STATUS.EDIT);
};
