// the View Model for an interface,
// inherits from Base.js

function InterfaceVM(data, owner, holderName) {
    var self = this;

    Base.call(self, data, owner, holderName);

    self.id = ko.observable(data.id || "");
    self.ip_address = ko.observable(data.ip_address || "");
    self.mac_address = ko.observable(data.mac_address || "");
}

InterfaceVM.prototype = Object.create(Base.prototype);
InterfaceVM.prototype.constructor = InterfaceVM;

