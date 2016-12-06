var LoaderScene = qc.Scene.extend({
    _interval : null,
    _length : 0,
    _count : 0,
    _label : null,
    _className:"LoaderScene",
    timer:null,
    init : function(){
        var self = this;
        var fontSize = 24;
        var winSize = qc.director.getWinSize();
        var middlePos = qc.p(winSize.width/2,winSize.height/2);
        var label = self._label = qc.Label.create("Loading... 0%", "Arial", fontSize);
        label.setPosition(middlePos);
        label.setColor(qc.color(180, 180, 180));
        this.addChild(this._label, 10);
        return true;
    },

    onEnter: function () {
        var self = this;
        qc.Node.prototype.onEnter.call(self);
        //self.schedule(self._startLoading, 0.3);
        self._startLoading();
    },

    onExit: function () {
        qc.Node.prototype.onExit.call(this);
        if(this.timer){
            clearInterval(this.timer);
        }
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     */
    initWithResources: function (resources, cb) {
        if(typeof resources == "string") resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        //self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        qc.loader.load(res, function(result, count){ self._count = count; }, function(){
            if(self.cb)
                self.cb();
        });
        this.timer = setInterval(function(){
            self._updatePercent();
        },0.1);
        //setInterval(self._updatePercent,100);
    },

    _updatePercent: function () {
        var self = this;
        var count = self._count;
        var length = self._length;
        var percent = (count / length * 100) | 0;
        percent = Math.min(percent, 100);
        self._label.setString("Loading... " + percent + "%");
        //if(count >= length) self.unschedule(self._updatePercent);
    }
});
LoaderScene.preload = function(resources, cb){
    if(!this.loaderScene) {
        this.loaderScene = new LoaderScene();
        this.loaderScene.init();
    }
    this.loaderScene.initWithResources(resources, cb);
    qc.director.runScene(this.loaderScene);
    return this.loaderScene;
};

module.exports = LoaderScene;