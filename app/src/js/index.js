"use strict";
var LoaderScene = require('./game/scene/LoadScene.js');
var start_resources = require('./game/resource.js').start_resources;
var UpScene = require('./game/scene/UpScene.js');
qc.game.onStart = function(){
    LoaderScene.preload(start_resources,function(){
        var myScene = new UpScene();
        qc.director.runScene(myScene);
    });
};
qc.game.run();