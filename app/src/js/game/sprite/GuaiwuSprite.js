var res = require('../resource.js').res;
var GuaiwuSprite = qc.Sprite.extend({
    mySprite:null,
    init:function(){
        this.initSprite();
    },
    initSprite:function(){
        var frameCache = qc.SpriteFrameCache._getInstance();
        frameCache.addSpriteFrames(res.guaiwuplist,res.guaiwu);
        var frames = [];
        frames.push(frameCache.getSpriteFrame("fat_boss_green02.png"));
        frames.push(frameCache.getSpriteFrame("fat_boss_green01.png"));
        this.mySprite = qc.Sprite.create(frames[1]);

        var animation = qc.Animation.create(frames,0.1);
        var animate = qc.Animate.create(animation);
        this.mySprite.runAction(animate);

        this.addChild(this.mySprite);
    }
});
GuaiwuSprite.create = function(){
    var sprite = new GuaiwuSprite();
    sprite.init();
    return sprite;
}
module.exports = GuaiwuSprite;