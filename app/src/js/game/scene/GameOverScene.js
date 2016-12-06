window.GameOverLayer = qc.Layer.extend({//游戏结束场景 没什么说的 都是静态精灵的组合
    winSize:null,
    middlePos:null,
    init:function(){
        this._super();
        this.winSize = qc.director.getWinSize();
        this.middlePos = qc.p(this.winSize.width/2,this.winSize.height/2);
        this.initBg();
        this.initTitle();
        this.initPeople();
    },
    initBg:function(){
        var bg = BgLayer.create(qc.color(223,222,224))//qc.Sprite.create(res.bg);
        this.addChild(bg);
    },
    initTitle:function(){
        var title = qc.Sprite.create(res.gameover);
        this.addChild(title);
        title.setPosition(qc.p(this.middlePos.x,this.middlePos.y+350));
    },
    initPeople:function(){
        var people = qc.Sprite.create(res.peopleHead);
        this.addChild(people);
        var hitPeople = new HitPeople();
        this.addChild(hitPeople);
        hitPeople.setPosition(qc.p(this.middlePos.x,this.middlePos.y-70));
        people.setPosition(this.middlePos);
    }
});
var GameOverScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var gameOverLayer = new GameOverLayer();
        gameOverLayer.init();
        this.addChild(gameOverLayer);
    }
});