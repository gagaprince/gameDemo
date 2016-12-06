window.GameStartLayer = qc.Layer.extend({
    winSize:null,   //窗口大小
    middlePos:null, //中点位置
    startBtn:null,  //开始按钮
    init:function(){
        this._super();
        this.winSize = qc.director.getWinSize();
        this.middlePos = qc.p(this.winSize.width/2,this.winSize.height/2);
        this.initBg();
        this.initTitle();
        this.initPeople();
        this.initBeginBtn();
        //this.startNextScene();
        this.addListener();
    },
    initBg:function(){
        var bg = BgLayer.create(qc.color(223,222,224))//qc.Sprite.create(res.bg);
        this.addChild(bg);
        //bg.setPosition(this.middlePos);
    },
    initTitle:function(){
        var title = qc.Sprite.create(res.title);
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
    },
    initBeginBtn:function(){
        var startBtn = this.startBtn = qc.Sprite.create(res.headbtn);
        startBtn.setPosition(qc.p(this.middlePos.x,this.middlePos.y-350));
        this.addChild(startBtn);
    },
    startNextScene:function(){//开始下一个场景 即 游戏开始
        var _this = this;
        this.beginBtnAction(function(){
            qc.log("here")
            _this.startBtn.removeFromParent();
            _this.startBtn = null;
            _this.beginBtnFenLieAction(function(){
                qc.director.runScene(new GameScene())
            })
        });
    },
    beginBtnAction:function(endCall){ //点击开始按钮后会有一个晃动开始按钮的动画 使用组合简单动画完成
        var rotateAction1 = qc.RotateTo.create(0.1,10);
        var rotateAction2 = qc.RotateTo.create(0.1,-10);
        var sequAction = qc.Sequence.create([rotateAction1,rotateAction2]);
        var repeatAction = qc.RepeatForever.create(sequAction,3);
        var callFun = qc.CallFunc.create(endCall,this);
        var sequ2 = qc.Sequence.create([repeatAction,callFun]);
        this.startBtn.runAction(sequ2);
    },
    beginBtnFenLieAction:function(endCall){ // 晃动完后 有分裂为两块的动画 使用组合简单动画完成
        var startBtnLeft = qc.Sprite.create(res.headbtnleft);
        var startBtnRight = qc.Sprite.create(res.headbtnrigth);
        startBtnLeft.setPosition(qc.p(this.middlePos.x-90,this.middlePos.y-350));
        this.addChild(startBtnLeft);
        startBtnRight.setPosition(qc.p(this.middlePos.x+90,this.middlePos.y-350));
        this.addChild(startBtnRight);


        var exploreSprite = qc.Sprite.create(res.baozha);
        exploreSprite.setScale(0.1);
        this.addChild(exploreSprite);
        exploreSprite.setPosition(qc.p(this.middlePos.x,this.middlePos.y-350));
        var scaleAction = qc.ScaleTo.create(0.2,2);
        var callFun = qc.CallFunc.create(function(){
            exploreSprite.removeFromParent();
            endCall();
        },this);
        var sequ = qc.Sequence.create([scaleAction,callFun]);
        exploreSprite.runAction(sequ);


        var tempLeftPos = startBtnLeft.getPosition();
        var tempRightPos = startBtnRight.getPosition();
        var moveLeft = qc.MoveBy.create(0.2,qc.p(-40,0));
        var moveLeftDown = qc.MoveBy.create(0.1,qc.p(0,-20));

        var moveRight = qc.MoveBy.create(0.2,qc.p(40,0));
        var moveRigthDown = qc.MoveBy.create(0.1,qc.p(0,-20));

        var sqLeft = qc.Sequence.create([moveLeft,moveLeftDown]);
        var sqRight = qc.Sequence.create([moveRight,moveRigthDown]);

        startBtnLeft.runAction(sqLeft);
        startBtnRight.runAction(sqRight);
    },
    addListener:function(){
        var _t = this;
        qc.EventManager.addListener({
            event: qc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(_t),
            onTouchMoved: this.onTouchMoved.bind(_t),
            onTouchEnded: this.onTouchEnded.bind(_t)
        },this);
    },
    //如果需要阻止冒泡 则 使用stopPropagation
    onTouchBegan:function(touch,event){ //当点开始按钮后 跳转到下一个场景
        if(this.startBtn!=null){
            var location = touch.getLocation();
            var isClick = this.startBtn.isContain(location);
            if(isClick){
                this.startNextScene();
            }
        }
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    }
});
var GameStartScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var gameLayer = new GameStartLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});