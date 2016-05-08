// the View Model for a cluster,
// inherits from Base.js

function ClusterVM(data, owner, holderName) {
    var self = this;

    Base.call(self, data, owner, holderName);

    self.id = ko.observable(data.id || "");
    self.email = ko.observable(data.email || "");
    self.password = ko.observable(data.password || "");
    if (data.status !== undefined) {
        self.status = ko.observable(data.status + '');
    } else {
        self.status = ko.observable("");
    }
    self.servers = ko.observableArray(ko.utils.arrayMap(data.servers || [], function(server) {
        return new ServerVM(server, self, server._hoderName || 'servers');
    }));
}

ClusterVM.prototype = Object.create(Base.prototype);
ClusterVM.prototype.constructor = ClusterVM;

ClusterVM.prototype._createServer = function() {
    ServerVM.prototype._create(this, 'servers');
};