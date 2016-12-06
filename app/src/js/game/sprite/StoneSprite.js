var res = require('../resource').res;
var Stone = qc.Layer.extend({ //石头封装，主要处理 当被击中时的 响应动画 裂开 或者 落地
    stone:null,
    stone1:null,
    stone2:null,
    stoneSui:null,
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        this.initStone();
    },
    initStone:function(){
        var stone = this.stone = qc.Sprite.create(res.stone);
        this.addChild(stone);
    },
    hitSuccess:function(){
        this.baozhaAction();
        this.stone.removeFromParent(); //先将石头清楚 然后加载左右两块
        this.stone = null;
        var stone1,stone2,stoneSui;
        stone1 = this.stone1 = qc.Sprite.create(res.stone1);
        stone2 = this.stone2 = qc.Sprite.create(res.stone2);
        stoneSui = this.stoneSui = qc.Sprite.create(res.stoneSui);

        this.addChild(stone1);
        this.addChild(stone2);
        stone1.setPosition(qc.p(-20,0));
        stone2.setPosition(qc.p(20,0));

        var _t = this;
        var moveleft = qc.MoveBy.create(0.05,qc.p(-60,0));
        var moveRight = qc.MoveBy.create(0.05,qc.p(60,0));
        var callFun = qc.CallFunc.create(function(){
            _t.addChild(stoneSui);
            stoneSui.setPosition(qc.p(0,-40));
        });
        var sq = qc.Sequence.create([moveleft,callFun]);
        stone1.runAction(sq);
        stone2.runAction(moveRight);
    },
    hitFailed:function(){
        this.baozhaAction();
        var moveAction = qc.MoveTo.create(0.1,qc.p(150,-180));
        this.stone.runAction(moveAction);
    },
    baozhaAction:function(){
        var baozha = qc.Sprite.create(res.baozha);
        this.addChild(baozha,1000);
        baozha.setPosition(this.stone.getPosition());
        baozha.setScale(0.1);
        var scaleAction = qc.ScaleTo.create(0.1,0.8);
        var callFun = qc.CallFunc.create(function(){
            baozha.removeFromParent();
        });
        var sq = qc.Sequence.create([scaleAction,callFun])
        baozha.runAction(sq);
    },
    reset:function(){
        if(this.stone){
            this.stone.stopAllActions();
            this.stone.removeFromParent();
        }
        if(this.stone1){
            this.stone1.stopAllActions();
            this.stone1.removeFromParent();
        }
        if(this.stone2){
            this.stone2.stopAllActions();
            this.stone2.removeFromParent();
        }
        if(this.stoneSui){
            this.stoneSui.removeFromParent();
        }
        this.stone = this.stone1 =this.stone2 = this.stoneSui= null;
        this.initStone();
    }
});

module.exports = Stone;