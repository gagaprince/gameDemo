var res = require('../resource').res;
var PeoPle = qc.Layer.extend({ //站着的人 类，主要处理 击打过程手臂落下的动画效果
    people:null,
    normalFrame:null,
    successFrame:null,
    failedFrame:null,
    goodFrame1:null,
    hand:null,

    handFrames:[],
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        this.initPeople();
        this.initHandFrame();
        this.initHand();
    },
    initPeople:function(){
        var people =this.people= qc.Sprite.create(res.people);

        this.normalFrame = qc.SpriteFrame.createWithFile(res.people);
        this.successFrame = qc.SpriteFrame.createWithFile(res.peopleGood1);
        this.failedFrame = qc.SpriteFrame.createWithFile(res.peopleFailed);
        this.goodFrame1 = qc.SpriteFrame.createWithFile(res.peopleGood1);

        this.addChild(people);
        this.chuanQiAction(people);
    },
    initHandFrame:function(){
        var handFrame = qc.SpriteFrame.createWithFile(res.hand);
        this.handFrames.push(handFrame);
        handFrame = qc.SpriteFrame.createWithFile(res.hand2);
        this.handFrames.push(handFrame);

    },
    initHand:function(){
        if(!this.hand){
            this.hand= qc.Sprite.create(res.hand);
            this.addChild(this.hand);
        }
        var hand = this.hand;
        hand.setSpriteFrame(this.handFrames[0]);
        var peoplePos = this.people.getPosition();
        hand.setPosition(peoplePos.x-20,peoplePos.y+80);
        hand.setAnchorPoint(qc.p(0.9,0.3))
//        hand.setRotation(20);
        this.huishouAction(hand);
    },
    huishouAction:function(hand){
        var rotate1 = qc.RotateTo.create(0.4,-20);
        var rotate2 = qc.RotateTo.create(0.4,10);
        var sq = qc.Sequence.create([rotate1,rotate2]);
        var repeat = qc.RepeatForever.create(sq);
        hand.runAction(repeat);
    },
    /*initHand:function(){
        if(!this.hand){
            this.hand= qc.Sprite.create(res.hand);
            this.addChild(this.hand);
        }
        var hand = this.hand;
        var peoplePos = this.people.getPosition();
        hand.setPosition(peoplePos.x-10,peoplePos.y+95);
        hand.setAnchorPoint(qc.p(0.7,0.9))
        hand.setRotation(20);
        this.huishouAction(hand);
    },
    huishouAction:function(hand){
        var rotate1 = qc.RotateTo.create(0.4,60);
        var rotate2 = qc.RotateTo.create(0.4,20);
        var sq = qc.Sequence.create([rotate1,rotate2]);
        var repeat = qc.RepeatForever.create(sq);
        hand.runAction(repeat);
    },*/
    chuanQiAction:function(people){
        var scale1 = qc.ScaleTo.create(0.4,1,1.02);
        var scale2 = qc.ScaleTo.create(0.4,1);
        var sq = qc.Sequence.create([scale1,scale2]);
        var repeat = qc.RepeatForever.create(sq);
        people.runAction(repeat);
    },
    hit:function(endCall){
        this.hand.stopAllActions();
        var _t = this;
        var hitAction = qc.RotateTo.create(0.1,-40);
        var callFun1 = qc.CallFunc.create(function(){
            _t.hand.setSpriteFrame(_t.handFrames[1]);
            _t.hand.setAnchorPoint(qc.p(0.7,0.9));
            var peoplePos = _t.people.getPosition();
            _t.hand.setPosition(peoplePos.x-10,peoplePos.y+102);
            _t.hand.setRotation(20);
        });
        var hitAction2 = qc.RotateTo.create(0.05,0);
        var callFun = qc.CallFunc.create(function(){
            _t.people.stopAllActions();
            endCall();
        });
        var sq = qc.Sequence.create([hitAction,callFun1,hitAction2,callFun]);
        this.hand.runAction(sq)
    },
    hitFailed:function(){
//        var hand = this.hand;
//        hand.removeFromParent();
        this.people.setSpriteFrame(this.failedFrame);
    },
    hitSuccess:function(){
        this.hand.removeFromParent();
        this.hand = null;
        this.people.setSpriteFrame(this.successFrame);
    },
    hitGood:function(){
        this.hand.removeFromParent();
        this.hand = null;
        this.people.setSpriteFrame(this.goodFrame1);
//        var frames = [this.goodFrame1,this.goodFrame2];
//        var animation = qc.Animation.create(frames,0.1,4);
//        var animate = qc.Animate.create(animation);
//        this.people.runAction(animate);
    },
    reset:function(){
        this.initHand();
        this.people.stopAllActions();
        this.people.setSpriteFrame(this.normalFrame);
        this.chuanQiAction(this.people);
    }
});
module.exports = PeoPle;