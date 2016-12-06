var peopleRes = require('../resource').peopleRes;
var UpPeople = qc.Sprite.extend({
    pSprite:null,
    font:"",
    init:function(font){
        this._super();
        this.font = font;
        this.initPeople();
    },
    initPeople:function(){
        if(!(this.font=="\n"||this.font==" ")){
            var length = peopleRes.length;
            var randomNum = this._randomNum(length);
            var pSprite = this.pSprite = qc.Sprite.create(peopleRes[randomNum]);
            this.addChild(pSprite);

            var font = this.font;
            var laberFont = qc.Label.create(font,"微软雅黑","bold 30");
            this.addChild(laberFont);
            laberFont.setColor(qc.color(255,0,153));
            laberFont.setPosition(qc.p(-20,70));
            laberFont.setRotation(38);
        }
    },
    _randomNum:function(len){
        return parseInt(Math.random()*len);
    }
});
UpPeople.createWithFont = function(font){
    var uPeople = new UpPeople();
    uPeople.init(font);
    return uPeople;
}
module.exports = UpPeople;