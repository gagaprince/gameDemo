"use strict";
var LoaderScene = require('./game/scene/LoadScene.js');
var start_resources = require('./game/resource.js').start_resources;
var GameScene = require('./game/scene/GameScene.js');
qc.game.onStart = function(){
    LoaderScene.preload(start_resources,function(){
        if(SG.stoneGame.gameCanBegin){
//            qc.game.stop();
//            qc.game._runMainLoop();
            var myScene = new GameScene();
            qc.director.runScene(myScene);
            SG.stoneGame.gameHasBegin = true;
            setTimeout(function(){
                SG.stoneGame.resizeToWindow();
            },200);
            return;
        }else{
            SG.stoneGame.gameCanBegin =  true;
        }
    });
};
qc.game.run();
window.SG = window.SG||{};
SG.StoneGame = function(){
    this.addListener();
}
SG.StoneGame.prototype = {
    onGameOver:function(){qc.log("gameOver")},
    onGameWinOne:function(){qc.log("winOne")},
    winMoney:100,

    gameCanBegin:false,
    gameHasBegin:false,

    isApp:false,
    init:function(callObj){
        callObj = callObj ||{};
        this.onGameOver = callObj.onGameOver||this.onGameOver;
        this.onGameWinOne = callObj.onGameWinOne||this.onGameWinOne;
    },
    setWinMoney:function(money){
        this.winMoney = money;
    },
    gameStop:function(){//强制停止游戏
        if(this.gameHasBegin){
            qc.director.runScene(new GameOverScene());
            this.onGameOver();
        }
    },
    restart:function(){
        this.winMoney = 100;
        this.isApp = this.is_app();

        if(this.gameCanBegin){
            var myScene = new GameScene();
            qc.director.runScene(myScene);
            this.gameHasBegin = true;
            var _t = this;
            setTimeout(function(){
                _t.resizeToWindow();
            },200);
        }else{
            this.gameCanBegin = true;
        }
    },
    is_app: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('qunar') != -1) {
            return true;
        } else {
            return false;
        }
    },
    addListener:function(){
        window.removeEventListener("resize", qc.resizeCall, false);
        var resizeCall = this.resizeToWindow;
        resizeCall();
        window.addEventListener("resize",resizeCall,false);
    },
    resizeToWindow:function(){
        var winSize = qc.director.getWinSize();
        var width = winSize.width;
        var height = winSize.height;
        var localContainer = qc.container;
        var localCanvas = qc._canvas;
        var localConStyle = localContainer.style;
        var waicengContainer = document.getElementsByClassName("horizontal_center")[0];

        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight-44;
        var wbh = width/height;
        var wwbh = winWidth/winHeight;
        var rw , rh;
        if(wbh>wwbh){
            rw = winWidth;
            rh = winWidth/width*height;
        }else{
            rh = winHeight;
            rw = winHeight/height*width;
        }
        localConStyle.width = (rw || 480) + "px";
        localConStyle.height = (rh || 320) + "px";
        waicengContainer.style.width = "100%";
        waicengContainer.style.height=winHeight+"px";
        waicengContainer.style.marginTop = 44+"px";
    }
}
SG.stoneGame = new SG.StoneGame();
(function(){
    SG.stoneGame.restart();
//    setTimeout(function(){
//        SG.stoneGame.gameStop();
//    },10000);
    //exports.stoneGame = SG.stoneGame;
}());
