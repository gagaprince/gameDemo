var res = require('../resource').res;
var TransFormSprite = qc.Layer.extend({  //移动光标的过程，并对停止时光标的位置做判断 判断 击打效果
    bgSprite:null,
    shootArea:null,
    shooter:null,

    speed:null,

    topPos:null,
    bottomPos:null,
    allHeight:0, //活动范围

    goodR:10,   //小于此值时是good
    successR:0,//不是good时 小于此值时是成功

    ctor:function(speed){
        this._super();
        this.speed = speed||400;
        this.init();
    },
    init:function(){
        this.initBg();
        this.initHitArea();
        this.initTransFlag();
        this.beginMove();
    },
    initBg:function(){
        this.bgSprite = qc.Sprite.create(res.shootBg);
        this.addChild(this.bgSprite);
        var rect = this.bgSprite.getTextureRect();
        this.topPos = qc.p(0,rect.height/2-4);
        this.bottomPos = qc.p(0,-rect.height/2+4);
        this.allHeight = rect.height;
    },
    initHitArea:function(){
        this.shootArea = qc.Sprite.create(res.shootArea);
        this.addChild(this.shootArea);
        var rect = this.shootArea.getTextureRect();
        this.successR = rect.height/2;
    },
    initTransFlag:function(){
        this.shooter = qc.Sprite.create(res.shooter);
        this.addChild(this.shooter);
    },
    beginMove:function(speed){
        this.speed = speed||Math.floor(Math.random()*200+200);
        var dtime = this.allHeight/this.speed;
        var moveUp = qc.MoveTo.create(dtime,this.topPos);
        var moveDown = qc.MoveTo.create(dtime,this.bottomPos);
        var sq = qc.Sequence.create([moveUp,moveDown]);
        var repeatSq = qc.RepeatForever.create(sq);
        this.shooter.setPosition(this.bottomPos);
        this.shooter.runAction(repeatSq);

    },
    stop:function(){
        this.shooter.stopAllActions();
        var shooterPos = this.shooter.getPosition();
        var shootArea = this.shootArea.getPosition();
        var dis =Math.abs(shooterPos.y-shootArea.y);
        if(dis<this.goodR){
            return STONE_GAME_STATE.GAMEGOOD;
        }else if(dis<this.successR){
            return STONE_GAME_STATE.GAMESUCCESS;
        }else{
            return STONE_GAME_STATE.GAMEFAILD;
        }
    }
});
module.exports = TransFormSprite;