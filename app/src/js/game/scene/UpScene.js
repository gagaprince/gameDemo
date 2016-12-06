var res = require('../resource').res;
var ShowLayer = require('../layers/showLayer');
var UpLayer = qc.Layer.extend({
    bgSprite:null,
    bgLayer:null,
    peopleLayer:null,
    winSize:null,
    midpos:null,
    init:function(){
        this.initData();
        this.initBg();
        this.initPeople();
        this.initListener();
    },
    initData:function(){
        this.winSize = qc.director.getWinSize();
        this.midpos = qc.p(this.winSize.width/2,this.winSize.height/2);
    },
    initBg:function(){
        this.bgSprite = qc.Sprite.create(res.background);
        this.bgLayer = qc.Layer.create();
        this.addChild(this.bgLayer);
        this.bgLayer.addChild(this.bgSprite);
        this.bgLayer.setPosition(this.midpos);

        var label = qc.Label.create("举牌小人","微软雅黑","bold 40");
        label.setColor(qc.color(255,51,204));
        label.setPosition(qc.p(-80,300));
        this.bgLayer.addChild(label);
    },
    initPeople:function(){
        this.peopleLayer = ShowLayer.create();
        this.addChild(this.peopleLayer);
        this.peopleLayer.setScale(0.75);
        this.peopleLayer.setPosition(this.midpos);
    },
    initListener:function(){
        var _this = this;
        var width = $("#gameCanvas").width();
        var height = $("#gameCanvas").height();
        $(".in").height(height*0.2);
        $("#inText").width(width*0.8).show();
        $("#inText").on("input",function(){
            var text = $(this).val();
            _this.peopleLayer.add(text);
        });
    }
});

var UpScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new UpLayer();
        layer.init();
        this.addChild(layer);
    }
});
module.exports = UpScene;