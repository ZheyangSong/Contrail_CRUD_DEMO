// the View Model for a collection of clusters,
// inherits from Base.js

function ClustersVM(data) {
    var self = this;

    Base.call(self, data);

    self.clusters = ko.observableArray(ko.utils.arrayMap(data, function(cluster) {
        return new ClusterVM(cluster, self, 'clusters');
    }));

    self._noCluster = ko.pureComputed(function() {
    	var ret = (this.clusters().length === 0);

        if (ret && this._owner) {
            this._owner._isValid(false);
        }

        return ret;
    }, this);
}

ClustersVM.prototype = Object.create(Base.prototype);
ClustersVM.prototype.constructor = ClustersVM;

ClustersVM.prototype._valid = function() {
    var isValidField = Base.prototype._valid.call(this);

    return isValidField && !this._noCluster();
};

ClustersVM.prototype._createCluster = function() {
    ClusterVM.prototype._create(this, 'clusters');
};
