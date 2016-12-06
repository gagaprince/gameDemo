window.HUOCHE_GAME_STATE={GAMEBEGIN:0,GAMEOVER:1,GAMEING:2};
window.HUOCHE_GAME_TYPE={QUNARAPP:0,WX:1};
var BgMoveLayer = require('../layer/BgMoveLayer');
var WoodMoveLayer = require('../layer/WoodMoveLayer');
var res = require('../resource').res;
var Daojishi = require('../layer/DaojishiLayer');
var GameLayer = qc.Layer.extend({
    winSize:null,
    middlePos:null,

    gameState:HUOCHE_GAME_STATE.GAMEBEGIN,

    frontLayer:null,
    huoche:null,

    bgLayer:null,
    woodLayer:null,

    timer:null,

    gameLevel:1,
    score:0,
    scoreLabel:null,

    hand:null,
    tishibegin:null,

    gameOverSprite:null,

    daojishi:null,//倒计时模块

    gameType:HUOCHE_GAME_TYPE.QUNARAPP, //0是客户端 1 是微信

    init:function(){
        this._super();
        this.winSize = qc.director.getWinSize();
        this.middlePos = qc.p(this.winSize.width/2,this.winSize.height/2);
        this.initGameState();
        this.initBg();
        this.initWood();
        this.initHuoche();
        this.frontLayer = qc.Layer.create();
        this.addChild(this.frontLayer);
        this.initBeginTiShi();
        this.initTimer();
        this.initDaojishi();
        this.initScore();
        this.initListener();
        //this.addListener();
    },
    initGameState:function(){
        this.gameState = HUOCHE_GAME_STATE.GAMEBEGIN;
    },
    initBg:function(){
        var bg =this.bgLayer =  BgMoveLayer.createWithBgAndSpeed(res.bg,0);
        this.addChild(bg);
    },
    initHuoche:function(){
        var huoche = this.huoche = qc.Sprite.create(res.car);
        this.addChild(huoche);
        huoche.setPosition(qc.p(this.middlePos.x,50));
    },
    initWood:function(){
        var woodLayer = this.woodLayer = new WoodMoveLayer(0,this);
        woodLayer.setPosition(qc.p(this.middlePos.x,this.middlePos.y-10));
        this.addChild(woodLayer);
    },
    huocheMove:function(){
        var moveAction = qc.MoveBy.create(1,qc.p(0,-70));
        this.huoche.runAction(moveAction);
    },
    initBeginTiShi:function(){
        var tishi =this.tishibegin = qc.Sprite.create(res.beginTishi);
        var hand =this.hand = qc.Sprite.create(res.hand);
        this.frontLayer.addChild(tishi);
        tishi.setPosition(qc.p(this.middlePos.x,this.middlePos.y+60));
        this.frontLayer.addChild(hand);
        hand.setPosition(qc.p(this.middlePos.x+180,this.middlePos.y-60));
        this.handAction(hand);
    },
    handAction:function(hand){
        var moveLeft = qc.MoveBy.create(0.4,qc.p(-20,0));
        var moveRight = qc.MoveBy.create(0.4,qc.p(20,0))
        var sq = qc.Sequence.create([moveLeft,moveRight]);
        var repeat = qc.RepeatForever.create(sq);
        hand.runAction(repeat);
    },
    initTimer:function(){
        var _t = this;
        this.timer = setInterval(function(){
            _t.bgLayer.move();
            _t.woodLayer.move();
        },1/60*1000);
    },
    initDaojishi:function(){
        this.daojishi = Daojishi.create(60);
        this.daojishi.setPosition(qc.p(this.winSize.width-50,this.winSize.height-30));
        this.frontLayer.addChild(this.daojishi);
        var _t = this;
        this.daojishi.addEndListenner(function(){
            _t.changeAndHandlerGameState(HUOCHE_GAME_STATE.GAMEOVER);
        });
    },
    initScore:function(){
        this.score = 0;
        this.scoreLabel = qc.Label.create("",null,24);
        this.frontLayer.addChild(this.scoreLabel);
        this.updateScoreLabel(this.score);
    },
    changeSpeed:function(speed){//改变滑动速度
        this.bgLayer.changeSpeed(speed);
        this.woodLayer.changeSpeed(speed);
        if(speed==0){
            if(this.timer){
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    },
    onExit:function(){
        this._super();
        if(this.timer){
            clearInterval(this.timer);
        }
    },
    changeAndHandlerGameState:function(state){
        this.gameState = state;
        this.handlerGameState();
    },
    handlerGameState:function(){
        switch (this.gameState){
            case HUOCHE_GAME_STATE.GAMEOVER:
                this.changeSpeed(0);
                this.stopDaojishi();
                this.showGameOver();
                break;
            case HUOCHE_GAME_STATE.GAMEING:
                this.handlerGameBegin();
                break;
        }
    },
    initListener:function(){
        var _t = this;
        qc.EventManager.addListener({
            event: qc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(_t),
            onTouchMoved: null,
            onTouchEnded:this.onTouchEnded.bind(_t)
        },this);
    },
    onTouchEnded:function(touch,event){},
    onTouchBegan:function(touch,event){
        var location = touch.getLocation();
        switch (this.gameState){
            case HUOCHE_GAME_STATE.GAMEBEGIN:
                this.checkBegin(location);
                break;
            case HUOCHE_GAME_STATE.GAMEING:
                this.checkGameing(location);
                break;
            case HUOCHE_GAME_STATE.GAMEOVER:
                this.checkPlayAgain(location);
                break;
        }
    },
    getOneScore:function(){//score+1
        this.score++;
        if(this.score%45==0){
            this.gameLevel++;
            this.changeSpeed(this.gameLevel+4);
        }
//        this.gameLevel = parseInt(this.score/10);
        this.woodLayer.removeFirstWood();
        this.updateScoreLabel(this.score);
    },
    updateScoreLabel:function(score){
        var showText = "得分:"+score;
        this.scoreLabel.setString(showText);
        var scoreLabelPos = qc.p(70-24*showText.length/2,this.winSize.height-30);
        this.scoreLabel.setPosition(scoreLabelPos);
    },
    checkGameing:function(location){//先只检测wood 不检测失败
        var wood = this.woodLayer.getFirstWood();
        location = this.translateToLayer(location,this.woodLayer);
//        this.getOneScore();
//        return;
        if(wood.isContain(location)){//开始游戏
            this.getOneScore();
        }else{
            if(wood.isElseContain(location)){
                //失败
                this.changeAndHandlerGameState(HUOCHE_GAME_STATE.GAMEOVER);
            }
        }
    },
    checkPlayAgain:function(location){
        var moveAction = qc.MoveTo.create(0.5,qc.p(this.middlePos.x*3,this.middlePos.y));
        var callFun = qc.CallFunc.create(function(){
            qc.director.runScene(new GameStartScene());
        });
        var sq = qc.Sequence.create([moveAction,callFun]);
        this.gameOverSprite.runAction(sq);
    },
    checkBegin:function(location){//在开始状态下 点击屏幕会触发此方法，传入当前点击点
        var wood = this.woodLayer.getFirstWood();
        location = this.translateToLayer(location,this.woodLayer);
        if(wood.isContain(location)){//开始游戏
            this.changeAndHandlerGameState(HUOCHE_GAME_STATE.GAMEING);
            this.getOneScore();
        }
    },
    handlerGameBegin:function() {
        var hand = this.hand;
        var tishi = this.tishibegin;
        hand.stopAllActions();
        this.flyOut(hand,500);
        this.flyOut(tishi,-300);
        this.changeSpeed(this.gameLevel+4);//level就是速度
        this.daojishi.beginTimer();
        this.huocheMove();
    },

    flyOut:function(sprite,posx){
        var spritePos = sprite.getPosition();
        var moveTo = qc.MoveTo.create(0.2, qc.p(posx, spritePos.y));
        var callFun = qc.CallFunc.create(function () {
            sprite.removeFromParent();
        });
        var sq = qc.Sequence.create([moveTo, callFun]);
        sprite.runAction(sq);
    },
    translateToLayer:function(location,layer){
        var pos = layer.getPosition();
        return qc.p(location.x-pos.x,location.y-pos.y);
    },
    showGameOver:function(){
        var gameOverSprite=this.gameOverSprite = qc.Sprite.create(res.over);
        this.addChild(gameOverSprite);
        gameOverSprite.setPosition(qc.p(-this.middlePos.x,this.middlePos.y));
        var moveAction = qc.MoveTo.create(0.5,this.middlePos);
        gameOverSprite.runAction(moveAction);
    },
    stopDaojishi:function(){
        this.daojishi.pauseTimer();
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
GameScene.create = function(option){

}

module.exports = GameScene;