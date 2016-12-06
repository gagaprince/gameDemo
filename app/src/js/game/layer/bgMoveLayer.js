var BgMoveLayer = qc.Layer.extend({

    bgres:null,
    speed:2,
    fps:60,
    timer:null,

    init:function(){
        if(this._super()){
            this.initBg();
            //this.initSchedule();
            return true;
        }
        return false;
    },
    initWithBgAndSpeed:function(bgres,speed,fps){
        this.speed = speed;
        this.bgres = bgres;
        this.fps=fps||this.fps;
        this.init();

    },
    initBg:function(){
        for(var i=0;i<2;i++){
            var bgsprite = qc.Sprite.create(this.bgres);
            var height = bgsprite.getTextureRect().height;
            bgsprite.setAnchorPoint(0,0);
            bgsprite.setPosition(qc.p(0,i*height));
            this.addChild(bgsprite);
        }
    },
    initSchedule:function(){
        var _t = this;
        this.timer = setInterval(function(){
            _t.move();
        },1/this.fps*1000);
    },
    move:function(){
        var children = this.getChildren();
        var length = children.length;
        for(var i=0;i<length;i++){
            var bg = children[i];
            var pos = bg.getPosition();
            var newPosy;
            var bgHeight = bg.getTextureRect().height;
            if(pos.y+bgHeight<=0){
                newPosy = pos.y+bgHeight*(length)-this.speed;
            }else{
                newPosy = pos.y-this.speed;
            }
            bg.setPosition(qc.p(0,newPosy));
        }
    },
    onExit:function(){
        this._super();
        if(this.timer){
            clearInterval(this.timer);
        }
    },
    changeSpeed:function(speed){
        qc.log("changeSpeed:"+speed);
        this.speed = speed;
    }
});

BgMoveLayer.createWithBgAndSpeed = function(bg,speed,fps){
    var bgMoveLayer = new BgMoveLayer();
    bgMoveLayer.initWithBgAndSpeed(bg,speed,fps);
    return bgMoveLayer;
}
module.exports = BgMoveLayer;
