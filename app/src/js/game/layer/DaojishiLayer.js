var Daojishi = qc.Layer.extend({
    timeshow:0,
    timeLabel:null,
    timer:null,
    listeners:null,
    _isPause:false,
    beginTimer:function(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
        var _t = this;
        this.timer = setInterval(function(){
            _t.updateTimeShow();
        },1000);
        this._isPause = false;
    },
    pauseTimer:function(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;

        }
        this._isPause = true;
    },
    resetTimer:function(){},
    addEndListenner:function(lis){
        this.listeners.push(lis);
    },
    removeEndListenner:function(lis){
        var listeners = this.listeners;
        var len = listeners.length;
        for(var i=0;i<len;i++){
            if(lis = listeners[i]){
                listeners.splice(i,1);
                i--;
            }
        }
    },
    triger:function(){
        var listeners = this.listeners;
        var len = listeners.length;
        for(var i=0;i<len;i++){
            var lis = listeners[i];
            lis();
        }
    },
    init:function(){
        this.listeners = [];
        this.timeLabel = qc.Label.create(this.timeshow,null,"30");
        this.timeLabel.setColor(qc.color(255,0,0));
        this.timeLabel.setPosition(qc.p(-30*(this.timeshow+"").length/2,0));
        this.addChild(this.timeLabel);
    },
    initWithTime:function(timeNum){
        this.timeshow = timeNum;
        this.init();
    },
    updateTimeShow:function(num){
        if(!this._isPause){
            if(num){
                this.timeshow = num;
            }else{
                if(this.timeshow>0){
                    this.timeshow--;
                }
            }
            this.updateTimeLabel();
            if(this.timeshow==0){
                this.triger();
                this.pauseTimer();
            }
        }
    },
    updateTimeLabel:function(){
        this.timeLabel.setString(this.timeshow)
    }
});
Daojishi.create = function(time){
    var daojishi = new Daojishi();
    daojishi.initWithTime(time);
    return daojishi;
}
module.exports = Daojishi;