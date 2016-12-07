var background = (function (_super) {
    __extends(background, _super);
    function background() {
        _super.call(this);
        this.radius = 30;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    var d = __define,c=background,p=c.prototype;
    p.startGame = function () {
        //调用方法生产随机食物
        this.randomFood();
    };
    p.randomFood = function () {
        //随机坐标
        var tmpx = Math.random() * (this.width);
        var tmpy = Math.random() * (this.height);
        //新建食物对象
        this.food = new Food(tmpx, tmpy, this.radius);
        //显示
        this.addChild(this.food);
    };
    return background;
}(egret.DisplayObjectContainer));
egret.registerClass(background,'background');
//# sourceMappingURL=background.js.map