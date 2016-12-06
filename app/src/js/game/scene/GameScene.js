window.STONE_GAME_STATE={GAMEBEGIN:0,GAMESUCCESS:1,GAMEGOOD:2,GAMEFAILD:3}; //游戏状态枚举
var BgLayer = require('../layer/BgLayer');
var res = require('../resource').res;
var PeoPle = require('../sprite/PeopleSprite');
var HitPeople = require('../sprite/HitPeople');
var TransFormSprite = require('../sprite/TransFormSprite');
var SuiBtnSprite = require('../sprite/SuiBtnSprite');
window.GameLayer = qc.Layer.extend({
    winSize:null,   //窗口大小
    middlePos:null, //窗口中点位置

    people:null,    //站着的人
    hitPeople:null, //躺着的人
    shootModel:null, //射击模型
    suiBtn:null,    //碎石按钮

    gameState:STONE_GAME_STATE.GAMEBEGIN,       //初始化游戏状态

    frontLayer:null,                    //上方图层 放置人和击打模型 主要用来制作震动效果
    maxFrontLayer:null,                 //最上方图层
    totalMoney:0,                       //共得多少钱
    totalNum:10,                        //剩余游戏次数
    winNum:0,

    moneyLabel:null,                    //金钱现实标签
    chanceLaber:null,                   //剩余次数显示标签
    init:function(){
        this._super();
        this.winSize = qc.director.getWinSize();  //获取窗口大小
        this.middlePos = qc.p(this.winSize.width/2,this.winSize.height/2);//获取中点坐标
        this.totalNum = 10;                         //初始化游戏次数
        this.totalMoney = 0;                        //初始化金币
        this.winNum = 0;
        this.initGameState();
        this.initBg();                                  //初始化背景
        this.initLabel();                               //初始化标签
        this.frontLayer = qc.Layer.create();        //初始化上层图层
        this.addChild(this.frontLayer);               //添加图层到场景
        this.maxFrontLayer = qc.Layer.create();     //同上
        this.addChild(this.maxFrontLayer);
        this.initTitle();                               //初始化标题 胸口碎大石
        this.initPeople();                              //初始化站着的人
        this.initHitPeople();                           //初始化躺着的人 躺着的人和石头是封装在一起的
        this.initShootModel()                           //初始化击打模型
        this.initSuiBtn();                              //初始化碎石按钮
        this.addListener();                             //添加侦听
    },
    initGameState:function(){
        this.gameState = STONE_GAME_STATE.GAMEBEGIN;
    },
    initTitle:function(){
        var title = qc.Sprite.create(res.title);
        this.frontLayer.addChild(title);
        title.setPosition(qc.p(this.middlePos.x,this.middlePos.y+355));
    },
    initBg:function(){
        var bg = BgLayer.create(qc.color(223,222,224))//qc.Sprite.create(res.bg);
        this.addChild(bg);
    },
    initLabel:function(){
        var showTitle = SG.stoneGame.isApp?"本轮获得:0元":"成功碎石:0块";
        var moneyLabel = this.moneyLabel = qc.Label.create(showTitle,null,36);
        moneyLabel.setColor(qc.color(80,64,64));    //设置lable的颜色
        this.addChild(moneyLabel);                  //添加到场景
        moneyLabel.setPosition(qc.p(30,this.winSize.height-40)); //设置lable的位置
        var chanceLaber = this.chanceLaber = qc.Label.create("剩余机会:10次",null,36);
        chanceLaber.setColor(qc.color(80,64,64));
        this.addChild(chanceLaber);
        chanceLaber.setPosition(qc.p(370,this.winSize.height-40));
    },
    initPeople:function(){
        var people = this.people = new PeoPle();    //封装的一个站着的人类
        this.frontLayer.addChild(people);               //添加到上层图层
        people.setPosition(qc.p(this.middlePos.x-15,this.middlePos.y-50));  //添加位置
    },
    initHitPeople:function(){
        var hitPeople = this.hitPeople = new HitPeople();
        this.frontLayer.addChild(hitPeople);
        hitPeople.setPosition(qc.p(this.middlePos.x,this.middlePos.y-150));
    },
    initShootModel:function(){
        this.shootModel = new TransFormSprite();
        this.frontLayer.addChild(this.shootModel);
        this.shootModel.setPosition(qc.p(this.middlePos.x+250,this.middlePos.y));
    },
    initSuiBtn:function(){
        this.suiBtn = new SuiBtnSprite();
        this.addChild(this.suiBtn);
        this.suiBtn.setPosition(qc.p(this.middlePos.x,100));
    },
    addListener:function(){//添加侦听的一般模式就是如下，需要绑定began move 和 end方法
        var _t = this;
        qc.EventManager.addListener({
            event: qc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(_t),
            onTouchMoved: null,
            onTouchEnded:this.onTouchEnded.bind(_t)
        },this);
    },
    onTouchBegan:function(touch,event){
        /*switch (this.gameState){
            case STONE_GAME_STATE.GAMEBEGIN:
                var location = touch.getLocation();
                this.pressSuiBtn(location);
                break;
            case STONE_GAME_STATE.GAMESUCCESS:
            case STONE_GAME_STATE.GAMEGOOD:
            case STONE_GAME_STATE.GAMEFAILD:
                this.gameState = STONE_GAME_STATE.GAMEBEGIN;
                this.handleResult();
                break;
        }*/
        if(this.gameState==STONE_GAME_STATE.GAMEBEGIN){//如果是游戏开始状态  则根据点击位置判断是否按下了按钮
            var location = touch.getLocation();
            this.pressSuiBtn(location);
        }
    },
    onTouchEnded:function(touch,event){
        if(this.gameState==STONE_GAME_STATE.GAMEBEGIN){ //根据点击位置判断是否按下按钮
            var location = touch.getLocation();
            this.upSuiBtn(location);
        }
    },
    pressSuiBtn:function(location){
        if(this.checkBtnSui(location)){
            this.suiBtn.press();
        }
    },
    checkBtnSui:function(location){
        var btnPos = this.suiBtn.getPosition();
        if(location.x>btnPos.x-98&&location.x<btnPos.x+98&&location.y>btnPos.y-55&&location.y<btnPos.y+55){
            return true;
        }
        return false;
    },
    upSuiBtn:function(location){//如果没有触发碎石按钮的touchbegin事件则不触发 碎石事件
        if(this.checkBtnSui(location)&&this.suiBtn.isSelect){
            this.gameState = this.shootModel.stop();    //触发碎石事件，根据shootmodel的停止位置判断单轮胜负 并改变游戏状态
            this.handleResult();
        }
        if(this.suiBtn.isSelect){
            this.suiBtn.up();
        }
    },
    handleResult:function(){
        switch (this.gameState){
            case STONE_GAME_STATE.GAMEBEGIN:
                this.reset();
                break;
            case STONE_GAME_STATE.GAMESUCCESS:  //游戏成功 20振幅晃动世界，并执行成功效果
                this.waveTheWorld(20);
                this.executSuccess();
                break;
            case STONE_GAME_STATE.GAMEGOOD:     //游戏非常成功 40振幅晃动世界 执行good效果
                this.waveTheWorld(40);
                this.executGood();
                break;
            case STONE_GAME_STATE.GAMEFAILD:    //游戏失败 ， 20振幅晃动世界 执行失败效果
                this.waveTheWorld(20);
                this.executFaild();
                break;
        }
        //隔一段时间重新开始游戏 这里做判断是否碎了10次 累计十次gameover
        this.changeNum();
    },
    changeNum:function(){   //每执行一次碎石结果 修改一次剩余次数，并延时调用reset方法 如果没有剩余次数 则调用GameOver回调 并进入结束场景
        this.totalNum--
        this.chanceLaber.setString("剩余机会:"+this.totalNum+"次");
        if(this.totalNum>0){
            var _t = this;
            setTimeout(function(){
                _t.reset();
            },2000);
        }else{
            setTimeout(function(){
                qc.director.runScene(new GameOverScene());
                SG.stoneGame.onGameOver();
            },2000);

        }
    },
    waveTheWorld:function(zhenfu){//晃动整个世界 使用 组合简单动画
        var moveUp = qc.MoveTo.create(0.1,qc.p(0,zhenfu));
        var moveDown = qc.MoveTo.create(0.1,qc.p(0,0));
        var sq = qc.Sequence.create([moveUp,moveDown]);
        var repeat = qc.RepeatForever.create(sq,4);
        this.frontLayer.runAction(repeat);
    },
    executSuccess:function(){//成功之后的动作'
        var _t = this;
        this.people.hit(function(){     //hit方法是一个过程函数 此处传入一个回调 是在hit动作完成后回调
            _t.people.hitSuccess();
            _t.hitPeople.hitSuccess();
        });
        SG.stoneGame.onGameWinOne(); //调用外部回调
        this.winNum++;
        this.addMoney(SG.stoneGame.winMoney);
    },
    executFaild:function(){//失败之后的动作
        var _t =this;
        this.people.hit(function(){
            _t.people.hitFailed();
            _t.hitPeople.hitFailed();
        });
        this.addMoney(0);
    },
    executGood:function(){
        var _t = this;
        this.people.hit(function(){
            _t.people.hitGood();
            _t.hitPeople.hitSuccess();
        });
        SG.stoneGame.onGameWinOne();
        this.winNum++;
        this.addMoney(SG.stoneGame.winMoney);
    },
    addMoney:function(num){ //加钱，这个钱的多少是外部控制的
        var showStr;
        var isApp = SG.stoneGame.isApp;
        if(!isApp&&num!=0){//微信游戏中
            showStr = "碎成功！";
        }else{
            this.totalMoney+=num;
            showStr=(num==0?"石头没碎！":"+"+(num/100)+"元");
        }
        var addMoneySprite = qc.Label.create(showStr,null,80);
        addMoneySprite.setColor(qc.color(197,32,32));
        this.maxFrontLayer.addChild(addMoneySprite);
        addMoneySprite.setPosition(qc.p(this.middlePos.x-40*(showStr.length),this.middlePos.y+100));
        var moveAction = qc.MoveBy.create(0.5,qc.p(0,100));
        var callFun = qc.CallFunc.create(function(){
            addMoneySprite.removeFromParent();
        });
        var  sq = qc.Sequence.create([moveAction,callFun]);
        addMoneySprite.runAction(sq);
        if(!isApp){//微信游戏中
            this.moneyLabel.setString("成功碎石:"+this.winNum+"块");
        }else{
            this.moneyLabel.setString("本轮获得:"+(this.totalMoney/100)+"元");
        }

    },
    reset:function(){     //重置单局游戏
        this.people.reset();
        this.hitPeople.reset();
        this.shootModel.beginMove();
        this.gameState = STONE_GAME_STATE.GAMEBEGIN;
    }
});
var GameScene = qc.Scene.extend({
    onEnter:function(){
        this._super();
        var gameLayer = new GameLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

module.exports = GameScene;