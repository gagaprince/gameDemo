var WoodSprite = require('../sprite/WoodSprite');
var WoodMoveLayer = qc.Layer.extend({
    woodLayer:null,
    speed:null,

    gameScene:null,

    moneyArray:[],
    purseNum:0,
    gameType:HUOCHE_GAME_TYPE.WX,

    totalWoodNum:160,//估计一共有多少木块
    nowNum:0,//当前创建了多少木块

    jiange:132,//两个木块直接的间隔
    ctor:function(speed,gameScene,option){
        this._super();
        this.woodLayer = qc.Layer.create();
        this.speed = speed;
        this.gameScene = gameScene;
        this.init();
        this.initMoneyWithOption(option);
    },
    init:function(){//先初始化4个木头
        for(var i=0;i<5;i++){
            var posx,posy;
            if(i==0){
                posx = 90;
            }else{
                posx = this.getPosxRandomDir();
            }
            posy = i*this.jiange;
            this.initOneMuTou(qc.p(posx,posy));
        }
    },
    initMoneyWithOption:function(option){
        if(!option)return;
        this.gameType = option.gameType;
        this.moneyArray = option.moneyArray;
        this.purseNum = option.purseNum;
    },
    move:function(){
        var woods = this.getChildren();
        var len = woods.length;
        for(var i=0;i<len;i++){
            var wood = woods[i];
            if(!wood.getUserData()){
                var pos = wood.getPosition();
                var newPos = qc.p(pos.x,pos.y-this.speed);
                if(newPos.y<-200){
                    this.sendGameOver();
                }
                wood.setPosition(newPos);
            }
        }
    },
    createNewWood:function(){
        var woods = this.getChildren();
        var len = woods.length;
        var lastWoods = woods[len-1];
        var pos = lastWoods.getPosition();

        this.initOneMuTou(qc.p(this.getPosxRandomDir(),pos.y+this.jiange));
    },
    initOneMuTou:function(pos){
        var posX =  pos.x;
        var posY = pos.y;
        var wood = WoodSprite.createWithPosx(posX);
        this.addChild(wood);
        wood.setPosition(qc.p(0,posY));
    },
    getPosxRandomDir:function(){
        var random = Math.floor(Math.random()*3);
        if(random==0){
            return 90;
        }else if(random==1){
            return -90;
        }else{
            return 0
        }
    },
    getFirstWood:function(){
        var woods = this.getChildren();
        var len = woods.length;
        for(var i=0;i<len;i++){
            var wood = woods[i];
            if(!wood.getUserData()){
                return wood;
            }
        }
    },
    removeFirstWood:function(){
        //var woodSprites = this.getChildren();
        var woodSprite = this.getFirstWood();
        woodSprite.setUserData(1);
        this.flyOut(woodSprite.wood,woodSprite);
        this.createNewWood();
    },
    flyOut:function(sprite,target){
        var pos = sprite.getPosition();
        var rotateAction = qc.RotateTo.create(0.3,135);
        var moveAction = qc.MoveBy.create(0.5,qc.p(-500,pos.y));
        var callFun = qc.CallFunc.create(function(){
            if(target){
                target.removeFromParent();
            }else{
                sprite.removeFromParent();
            }
        })
        var sq = qc.Sequence.create([moveAction,callFun]);
        sprite.runAction(rotateAction);
        sprite.runAction(sq);
    },
    sendGameOver:function(){
        this.gameScene.changeAndHandlerGameState(HUOCHE_GAME_STATE.GAMEOVER);
    },
    changeSpeed:function(speed){
        this.speed = speed;
    }
});

module.exports = WoodMoveLayer;