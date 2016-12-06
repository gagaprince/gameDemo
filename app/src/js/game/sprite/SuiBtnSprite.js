var res = require('../resource').res;
var SuiBtnSprite = qc.Layer.extend({//处理 碎石按钮的 按下状态 和 抬起状态
    mSprite:null,
    btnFrames:[],
    isSelect:false,
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        this.initFrames();
        this.initMSprite();
    },
    initMSprite:function(){
        this.mSprite = qc.Sprite.create(res.suibtn);
        this.addChild(this.mSprite);
    },
    initFrames:function(){
        var frame = qc.SpriteFrame.createWithFile(res.suibtn);
        this.btnFrames.push(frame);
        frame = qc.SpriteFrame.createWithFile(res.suibtnpress);
        this.btnFrames.push(frame);
    },
    press:function(){
        this.mSprite.setSpriteFrame(this.btnFrames[1]);
        this.isSelect = true;
    },
    up:function(){
        this.mSprite.setSpriteFrame(this.btnFrames[0]);
        this.isSelect = false;
    },
    isContain:function(pos){
        var pos = this.translateToLayer(pos);
        return this.mSprite.isContain(pos);
    }
});
module.exports = SuiBtnSprite;