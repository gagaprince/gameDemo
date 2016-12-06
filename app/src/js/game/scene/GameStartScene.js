var GameScene = require('./GameScene');
var res = require('../resource.js').res;
var GameStartLayer = qc.Layer.extend({
    winSize:null,
    middlePos:null,
    startBtn:null,
    frontLayer:null,
    init:function(){
        this._super();
        this.setPosition(0,0);
        this.winSize = qc.director.getWinSize();
        this.middlePos = qc.p(this.winSize.width/2,this.winSize.height/2);
        this.initBg();
        this.initHuoche();
        this.initFrontLayer();
        this.initLogo();
        this.initTitle();
        this.initBtn();
        this.addListener();
    },
    initBg:function(){
        var bg = qc.Sprite.create(res.bg);
        this.addChild(bg);
        bg.setPosition(this.middlePos);
    },
    initHuoche:function(){
        var huoche = qc.Sprite.create(res.car);
        this.addChild(huoche);
        huoche.setPosition(qc.p(this.middlePos.x,50));
    },
    initFrontLayer:function(){
        this.frontLayer = qc.Layer.create();
        this.addChild(this.frontLayer);
    },
    initLogo:function(){
        var logoBg = qc.Sprite.create(res.logobg);
        this.frontLayer.addChild(logoBg);
        logoBg.setPosition(qc.p(this.middlePos.x,this.middlePos.y+90));
        var rotateAction = qc.RotateTo.create(1,360);
        var callFun = qc.CallFunc.create(function(){
            logoBg.setRotation(0);
        })
        var sq = qc.Sequence.create([rotateAction,callFun]);
        var repeatAction = qc.RepeatForever.create(sq);
        logoBg.runAction(repeatAction);

        var logo = qc.Sprite.create(res.superman);
        this.frontLayer.addChild(logo);
        logo.setPosition(logoBg.getPosition());
    },
    initTitle:function(){
        var title = qc.Sprite.create(res.title);
        this.frontLayer.addChild(title);
        title.setPosition(qc.p(this.middlePos.x,this.middlePos.y+20));
    },
    initBtn:function(){
        this.startBtn = qc.Sprite.create(res.startBtn);
        this.frontLayer.addChild(this.startBtn);
        this.startBtn.setPosition(qc.p(this.middlePos.x,80));
    },
    addListener:function(){
        var _t = this;
        qc.EventManager.addListener({
            event: qc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(_t),
            onTouchMoved: this.onTouchMoved.bind(_t),
            onTouchEnded: this.onTouchEnded.bind(_t)
        },this);
    },
    startNextScene:function(){
        qc.director.runScene(new GameScene())
    },
    //如果需要阻止冒泡 则 使用stopPropagation
    onTouchBegan:function(touch,event){
        if(this.startBtn!=null){
            var location = touch.getLocation();
            var isClick = this.startBtn.isContain(location);
            if(isClick){
                this.startNextScene();
            }
        }
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    }
});
var GameStartScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var gameLayer = new GameStartLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});
module.exports = GameStartScene;