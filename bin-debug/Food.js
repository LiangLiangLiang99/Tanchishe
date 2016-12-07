var Food = (function (_super) {
    __extends(Food, _super);
    //果实的颜色
    function Food(x, y, r) {
        _super.call(this);
        this.drawFood(x, y, r);
    }
    var d = __define,c=Food,p=c.prototype;
    //绘制食物
    p.drawFood = function (x, y, r) {
        var sh = new egret.Shape();
        sh.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        sh.graphics.drawCircle(0, 0, r);
        sh.graphics.endFill();
        //该图像在食物中的位置
        sh.x = r;
        sh.y = r;
        //该图像在空间中的位置
        this.x = x;
        this.y = y;
        this.addChild(sh);
    };
    //食物被吃掉
    p.beEat = function () {
        this.parent.removeChild(this);
    };
    return Food;
}(egret.Sprite));
egret.registerClass(Food,'Food');
//# sourceMappingURL=Food.js.map