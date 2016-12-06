var BgLayer = qc.Layer.extend({
    _color:null,
    _fillColorStr:null,
    initWithColor:function(color){
        this._color = color;
        this.setColor(color);
    },
    setColor:function(color){
        this._fillColorStr = "rgba("+color.r+","+color.g+","+color.b+",1)";
    },
    draw:function(ctx){
        if(this._color){
            ctx.save();
            var pos = this.getPosition();
            var viewport = qc.rect(pos.x,qc._canvas.height-pos.y,qc._canvas.width,qc._canvas.height);
            ctx.fillStyle = this._fillColorStr;
            ctx.fillRect(-viewport.x,-viewport.y, viewport.width, viewport.height);
            ctx.restore();
            return true;
        }

    }
});
BgLayer.create = function(color){
    var bgLayer = new BgLayer();
    bgLayer.initWithColor(color);
    return bgLayer;
}
module.exports = BgLayer;