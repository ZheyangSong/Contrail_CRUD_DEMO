// the View Model for a server,
// inherits from Base.js

function ServerVM(data, owner, holderName) {
    var self = this;

    Base.call(self, data, owner, holderName);

    self.id = ko.observable(data.id || "");
    self.role = ko.observable(data.role || "");
    self.memory_gb = ko.observable(data.memory_gb || 256);
    self.tags = ko.observableArray(data.tags || []);
    self.installed_image = ko.observable(data.installed_image || "");
    self.management_interface = ko.observable(data.management_interface || "");
    self.interfaces = ko.observableArray(ko.utils.arrayMap(data.interfaces || [], function(interface) {
        return new InterfaceVM(interface, self, interface._hoderName || 'interfaces');
    }));

    self._newTagStr = ko.observable("");
    self._noInterface = ko.pureComputed(function() {
        var ret = (this.interfaces().length === 0);

        if (ret && this._owner) {
            this._owner._isValid(false);
        }

        return ret;
    }, self);
}

ServerVM.prototype = Object.create(Base.prototype);
ServerVM.prototype.constructor = ServerVM;

ServerVM.prototype._valid = function() {
    var isValidField = Base.prototype._valid.call(this);

    return isValidField && !this._noInterface();
};

ServerVM.prototype._createInterface = function() {
    InterfaceVM.prototype._create(this, 'interfaces');
};

ServerVM.prototype._addTag = function(data, event) {
    if (event.type === "keypress") {
        console.log(event.keyCode === 13, this._newTagStr());
    }
    if ((event.type === "focusout" ||
            (event.type === "keypress" && event.keyCode === 13)) &&
        this._newTagStr()) {
        this.tags.push(this._newTagStr());
        this._newTagStr("");
    }

    return true;
};

ServerVM.prototype._removeTag = function(data, event) {
    if (!event.target.checked) {
        this.tags.remove(data);
        console.log(data, this.tags());
    };

    return true;
};
