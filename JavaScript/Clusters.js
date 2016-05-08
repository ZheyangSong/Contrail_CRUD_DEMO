// the View Model for a collection of clusters,
// inherits from Base.js

function ClustersVM(data) {
    var self = this;

    Base.call(self, data);

    self.clusters = ko.observableArray(ko.utils.arrayMap(data, function(cluster) {
        return new ClusterVM(cluster, self, 'clusters');
    }));
}

ClustersVM.prototype = Object.create(Base.prototype);
ClustersVM.prototype.constructor = ClustersVM;

ClustersVM.prototype._createCluster = function() {
    ClusterVM.prototype._create(this, 'clusters');
};
