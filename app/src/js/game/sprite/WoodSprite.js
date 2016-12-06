var WOODTYPE={WOOD:0,GOLD:1,PURSE:2}
var res = require('../resource').res;
var WoodSprite = qc.Layer.extend({
    wood:null,
    posx:0,
    type:WOODTYPE.WOOD,
    money:0,
    initWithPosx:function(posx,type,monye){
        this.posx = posx;
        this.type=type||WOODTYPE.WOOD;
        this.money = monye||0;
        var woodres = this.getResByType(this.type);
        this.wood = qc.Sprite.create(woodres);
        this.wood.setPosition(qc.p(posx,0));
        this.addChild(this.wood);
    },
    getResByType:function(type){
        var woodres = res.wood;
        switch (type){
            case WOODTYPE.WOOD:
                woodres = res.wood;
                break;
            case WOODTYPE.GOLD:
                break;
            case WOODTYPE.PURSE:
                break;
        }
        return woodres;
    },
    isContain:function(location){
        location = this.translateToLayer(location,this);
        var pos = this.wood.getPosition();
        return location.y<90&&location.y>-66&&location.x>pos.x-60&&location.x<pos.x+60;
    },
    isElseContain:function(location){
    //即没有点中木头，而点中了一排的其他位置，
    //此时需增加一个精灵，并返回一个失败的 如果不属于这种情况则返回false
        location = this.translateToLayer(location,this);
        if(location.y<39&&location.y>-39){
            var posx;
            if(location.x<-45){
                posx = -90;
            }else if(location.x>45){
                posx = 90;
            }else{
                posx = 0;
            }
            this.setWingFlag(qc.p(posx,30));
            return true;
        }
        return false;
    },
    setWingFlag:function(pos){
        var wingFlag = qc.Sprite.create(res.wing);
        wingFlag.setPosition(pos);
        this.addChild(wingFlag);
    },
    translateToLayer:function(location){
        var pos = this.getPosition();
        return qc.p(location.x-pos.x,location.y-pos.y);
    }
});
WoodSprite.createWithPosx = function(posx){
    var woodSprite = new WoodSprite();
    woodSprite.initWithPosx(posx);
    return woodSprite;
}
WoodSprite.createWithPosxAndType = function(posx,type,money){
    var woodSprite = new WoodSprite();
    woodSprite.initWithPosx(posx,type,money);
    return woodSprite;
}
module.exports = WoodSprite;