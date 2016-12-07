var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(x, y, r) {
        _super.call(this);
        // 蛇身的节点
        this.List = [];
        //点击事件
        this.speed = 40;
        this.drawSnake(x, y, r);
    }
    var d = __define,c=Snake,p=c.prototype;
    //绘制蛇
    p.drawSnake = function (x, y, r) {
        //绘制蛇头
        this.head = new egret.Shape();
        this.head.graphics.lineStyle(10, 0xff4777);
        //?
        this.head.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.head.graphics.drawCircle(r, r, r);
        this.head.graphics.endFill();
        this.SnakeR = r;
        //将蛇头添加入蛇身的list
        this.List.push(this.head);
        //
        this.addChild(this.List[this.List.length - 1]);
        this.setChildIndex(this.List[this.List.length - 1], 999);
        console.log(this.List.length);
    };
    // 吃食物之后增加节点
    p.eatFood = function (a) {
        //新增的节点
        var node = new egret.Shape();
        node.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        node.graphics.drawCircle(this.SnakeR, this.SnakeR, this.SnakeR);
        node.graphics.endFill();
        //指定新增节点的位置在蛇身节点list的最后一个节点，让它坐标偏移
        node.x = this.List[this.List.length - 1].x + this.SnakeR * 0.8;
        node.y = this.List[this.List.length - 1].y + this.SnakeR * 0.8;
        //将新增节点添加入蛇身和蛇身节点list
        this.List.push(node);
        this.addChild(this.List[this.List.length - 1]);
        //console.log(this.List.length);
        //所有节点的最下面
        this.setChildIndex(this.List[this.List.length - 1], a);
    };
    p.move = function (e) {
        var mx = e.stageX;
        var my = e.stageY;
        var tween;
        //因为我们需要位于索引前的节点的坐标值,所以使用倒着遍历。
        var i;
        for (i = this.List.length - 1; i >= 1; i--) {
            tween = egret.Tween.get(this.List[i]);
            // 遍历所有节点，让它新的位置改为它的上一个节点的位置
            tween.to({ x: this.List[i - 1].x, y: this.List[i - 1].y }, 20);
        }
        //让它在蛇中的偏移坐标加上蛇在舞台中的坐标，便可以得到全局坐标
        var hx = this.List[0].x;
        var hy = this.List[0].y;
        // 蛇头需要一个明确的位置去移动，根据角度
        var tmpx;
        var tmpy;
        tmpx = this.List[0].x;
        tmpy = this.List[0].y;
        //console.log(this.List[0].x);
        //缓动动画
        tween = egret.Tween.get(this.List[0]);
        tween.to({ x: tmpx, y: tmpy }, 20);
        if (hx == mx && hy == my) {
            return;
        }
        //不在一条线上
        if (hx != mx) {
            var mk = (my - hy) / (mx - hx);
            var mangle = Math.atan(mk);
            if (mx < hx) {
                //左边
                tmpx = this.List[0].x - this.speed * Math.cos(mangle);
                tmpy = this.List[0].y - this.speed * Math.sin(mangle);
                tween.to({ x: tmpx, y: tmpy }, 20);
            }
            else {
                //右边
                tmpx = this.List[0].x + this.speed * Math.cos(mangle);
                tmpy = this.List[0].y + this.speed * Math.sin(mangle);
                tween.to({ x: tmpx, y: tmpy }, 20);
            }
        }
        else {
            //垂直（y相同）
            if (mx < hx) {
                //水平向左
                tmpx = this.List[0].x - this.speed;
                tween.to({ x: tmpx, y: tmpy }, 20);
            }
            else {
                //水平向右
                tmpx = this.List[0].x + this.speed;
                tween.to({ x: tmpx, y: tmpy }, 20);
            }
        }
    };
    //得到蛇头
    p.getHead = function () {
        return this.List[0];
    };
    return Snake;
}(egret.Sprite));
egret.registerClass(Snake,'Snake');
//# sourceMappingURL=Snake.js.map