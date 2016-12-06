var UpPeople = require('../sprites/UpPeople');
var ShowLayer = qc.Layer.extend({
    beginPos:null,
    arrowX:null,
    arrowY:null,
    winSize:null,

    lineHeads:null,
    nowStr:"",
    fontSprites:null,

    init:function(){
        this.initData();
        var people = UpPeople.createWithFont("\n");
        this.addChild(people);
        people.setPosition(this.beginPos);
        this.fontSprites.push(people);
    },
    initData:function(){
        this.winSize = qc.director.getWinSize();
        this.beginPos = qc.p(-110,this.winSize.width/2-30);
        this.arrowX = qc.p(60,30);
        this.arrowY = qc.p(-75,60);
        this.lineHeads = [];
        this.lineHeads.push(this.beginPos);
        this.fontSprites = [];
    },
    _nextPos:function(nowPos){
        var arrow = this.arrowX;
        return qc.p(nowPos.x+arrow.x,nowPos.y-arrow.y);
    },
    _nextLine:function(){
        var len = this.lineHeads.length;
//        console.log("len:"+len);
        var nowPos = this.lineHeads[len-1];
        var arrow = this.arrowY;
        return qc.p(nowPos.x+arrow.x,nowPos.y-arrow.y);
    },
    add:function(str){
        this.diff(str);
    },
    diff:function(str){
        var nowStr = this.nowStr;
        var beginIndex = 0;
        var nowLen = nowStr.length;
        var len = str.length;
        for(var i=0;i<nowLen&&i<len;i++){
            var charNow = nowStr.charAt(i);
            var char = str.charAt(i);
            if(char!=charNow){
                break;
            }
        }
        for(var j=nowLen-1;j>=i;j--){
            var charnow = nowStr.charAt(j);
            this._reduce(charnow);
        }
        this.nowStr = nowStr.substr(0,i);
        for(var j=i;j<len;j++){
            var char = str.charAt(j);
            this._add(char);
        }
        this.nowStr += str.substring(i);
    },
    _reduce:function(str){
        if(str=="\n"){
//            console.log("reduce \\n");
            this.lineHeads.pop();
        }
        var fontSprite = this.fontSprites.pop();
        fontSprite.removeFromParent();
    },
    _getLastPos:function(){
        var len = this.fontSprites.length;
        if(len>0){
            return this.fontSprites[len-1].getPosition();
        }
        return this.beginPos;
    },
    _add:function(str){
        if(str=="\n"){
            var nextPos = this._nextLine();
            this.lineHeads.push(nextPos);
        }else{
            var nowPos = this._getLastPos();
            var nextPos = this._nextPos(nowPos);
        }
        var peopleSprite = UpPeople.createWithFont(str);
        this.addChild(peopleSprite);
        peopleSprite.setPosition(nextPos);
        this.fontSprites.push(peopleSprite);
    }

});
ShowLayer.create=function(){
    var showLayer = new ShowLayer();
    showLayer.init();
    return showLayer;
}
module.exports = ShowLayer;