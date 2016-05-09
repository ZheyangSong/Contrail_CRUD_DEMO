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

    self._noServer = ko.pureComputed(function() {
        var ret = (this.servers().length === 0);

        if (ret && this._owner) {
            this._owner._isValid(false);
        }

        return ret;
    }, self);
}

ClusterVM.prototype = Object.create(Base.prototype);
ClusterVM.prototype.constructor = ClusterVM;

ClusterVM.prototype._valid = function() {
    var isValidField = Base.prototype._valid.call(this);

    return isValidField && !this._noServer();
};

ClusterVM.prototype._createServer = function() {
    ServerVM.prototype._create(this, 'servers');
};