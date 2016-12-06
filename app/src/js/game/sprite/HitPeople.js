var res = require('../resource').res;
var Stone = require('../sprite/StoneSprite');
var HitPeople = qc.Layer.extend({ //被击打的人的封装类 包含被击打的石头， 主要处理 成功击打 击打失败时 人的动画效果
    people:null,
    eyes:null,
    stone:null,

    normalFrame:null,
    successFrame:null,
    failedFrame:null,

    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.initPeople();
        //this.initEyes();
        this.initStone();
    },
    initPeople:function(){
        var people = this.people=qc.Sprite.create(res.hitpeople);

        this.normalFrame = qc.SpriteFrame.createWithFile(res.hitpeople);
        this.successFrame = qc.SpriteFrame.createWithFile(res.sleeperSuccess);
        this.failedFrame = qc.SpriteFrame.createWithFile(res.sleeperFailed);

        this.addChild(people);
    },
    /*initEyes:function(){
        var eyes =this.eyes= qc.Sprite.create(res.eye1);
        this.addChild(eyes);
        var frames = [qc.SpriteFrame.createWithFile(res.eye1),qc.SpriteFrame.createWithFile(res.eye2)];
        var animation = qc.Animation.create(frames,1);
        var animate = qc.Animate.create(animation);
        eyes.runAction(animate);
        eyes.setPosition(qc.p(-145,28));
    },*/
    initStone:function(){
        var stone =  this.stone = new Stone();
        this.addChild(stone);
        stone.setScale(0.8);
        stone.setPosition(qc.p(0,50));
    },
    hitSuccess:function(){
        //this.eyes.removeFromParent();
        this.runToFrame(this.successFrame);
        this.stone.hitSuccess()
    },
    hitFailed:function(){
        //this.eyes.removeFromParent();
        this.runToFrame(this.failedFrame);
        this.stone.hitFailed();
    },
    reset:function(){
        this.people.setSpriteFrame(this.normalFrame);
        //this.initEyes();
        this.stone.reset();
    },
    runToFrame:function(frame){
        this.people.setSpriteFrame(frame);
//        var frames = [this.middleFrame,frame];
//        var animation = qc.Animation.create(frames,0.1,1);
//        var animate = qc.Animate.create(animation);
//        this.people.runAction(animate);
    }
});
module.exports = HitPeople;