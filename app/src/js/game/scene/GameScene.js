"use strict";
var res = require('../resource.js').res;
var GuaiwuSprite = require('../sprite/GuaiwuSprite');
var GameLayer = qc.Layer.extend({
    bgSprit:null,

    winSize:null,

    guaiwuSprite:null,

    init:function(){
        this.winSize = qc.director.getWinSize();
        this.initBg();
        this.initSprite();
        this.initListener();
    },
    initBg:function(){
        var winSize = this.winSize;
        this.bgSprit = qc.Sprite.create(res.bg);
        this.addChild(this.bgSprit);
        this.bgSprit.setPosition(qc.p(winSize.width/2,winSize.height/2));
        this.bgSprit.setScale(0.5);
    },
    initSprite:function(){
        this.guaiwuSprite = GuaiwuSprite.create();
        this.addChild(this.guaiwuSprite);
        this.guaiwuSprite.setPosition(qc.p(100,300));
    },

    moveAction:function(){
        var action1 = qc.MoveTo.create(2,qc.p(100,100));
        var action2 = qc.MoveTo.create(2,qc.p(200,300));
        var allAction = qc.Sequence.create([action1,action2]);
        this.guaiwuSprite.runAction(allAction);
    },

    initListener:function(){
        var _t = this;
        qc.EventManager.addListener({
            event: qc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(_t),
            onTouchMoved: this.onTouchMoved.bind(_t),
            onTouchEnded: this.onTouchEnded.bind(_t)
        },this);
    },
    //如果需要阻止冒泡 则 使用stopPropagation
    onTouchBegan:function(touch,event){
        this.moveAction();
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    }
});
var GameScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var gameLayer = new GameLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

module.exports = GameScene;