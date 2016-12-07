class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    private food: Food;
    private snake: Snake;
    private stageX: number;
    private stageY: number;
    //分数
    private score: number = 0;
    private scoreText: egret.TextField;
    //定时器
    private num: number = 30;
    private time: egret.Timer;
    private timer: egret.Timer;
    private timeText: egret.TextField;
    private moveEvent: egret.TouchEvent;
    private head: egret.Shape;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startCreateScene, this);
    }
    protected startCreateScene(): void {
        //添加背景颜色
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x209408);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        //  添加食物
       	this.randomFood();
        // 添加蛇
        this.snake = new Snake(30, 30, 30);
        this.addChild(this.snake);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        this.scoreShow();
    }
    //显示分数
    private scoreShow(): void {
        this.scoreText = new egret.TextField;
        this.scoreText.text = "SCORE : " + this.score;
        this.scoreText.size = 32;
        this.addChild(this.scoreText);
    }

    //点击拖动时
    private onMove(e: egret.TouchEvent) {
        this.moveEvent = e;
        this.timer = new egret.Timer(200);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
        console.log("onmov");
    }
    //点击结束
    private moveEnd() {
        this.timer.stop();
    }
    //计时器逻辑
    private onTimer(moveEvent: egret.TimerEvent) {
        //获取蛇头
        this.head = this.snake.getHead();
        console.log(this.head.x, this.head.y);
        if (this.hitFood(this.head, this.food))
            //发生碰撞，则调用食物被吃事件
            this.onEat();
        //彩虹蛇继续移动
        this.snake.move(this.moveEvent);
        //如果碰到边侧，就停止游戏m
        if (this.head.x < 0 || this.head.y < 0 || this.head.x >= 590 || this.head.y >= (this.stage.stageHeight - 90)) {
            this.gameOver();
        }
    }
    //随机出食物
    private randomFood() {
        //随机坐标不取边界值
        var tmpx = Math.random() * (this.width - 80) + 30;
        var tmpy = Math.random() * (this.height - 80) + 30;
        //新建食物对象
        this.food = new Food(tmpx, tmpy, 20);
        //显示
        this.addChild(this.food);
    }
    //蛇节点的层级关系
    private index: number = 10;
    private onEat() {
        //在舞台上移除食物
        this.removeChild(this.food);
        //调用蛇吃食物的事件
        this.snake.eatFood(this.index);
        this.index--;
        this.score = this.score + 10;
        this.scoreText.text = "SCORE : " + this.score;
        //随机产生食物
        this.randomFood();
    }
    // 检验蛇和食物是否碰撞上
    private hitFood(a, b): boolean {
        var aa: egret.Rectangle;
        var bb: egret.Rectangle;
        aa = new egret.Rectangle(a.x, a.y, a.width, a.height);
        bb = new egret.Rectangle(b.x, b.y, b.width, b.height);
        var result = aa.intersects(bb);
        return result;
    }
    //游戏结束
    private gameOver(): void {
        //移除事件监听
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.startCreateScene, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        // 游戏结束显示文字
        var over: egret.TextField = new egret.TextField();
        over.text = "GAME OVER!";
        over.fontFamily = "楷体";
        over.textColor = 0x0012;
        over.size = 56;
        this.addChild(over);
        over.x = 140;
        over.y = 300;
        this.timer.stop();
        // 创建按钮
        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x334466, 1);
        btn.graphics.drawRect(0, 0, 210, 60);
        btn.graphics.endFill();
        //创建按钮文字
        var btntxt = new egret.TextField();
        btntxt.background = false;
        btntxt.fontFamily = "楷体";
        btntxt.textColor = 0xFFFBF0;
        btntxt.size = 36;
        btntxt.textAlign = "center";
        btntxt.width =200;
        btntxt.height = 40;
        btntxt.text = "重新开始";
        btntxt.y = (btn.height - btntxt.height) / 2;
        btn.addChild(btntxt);
        this.addChild(btn);
        btn.touchEnabled = true;
        btn.x = 200;
        btn.y = 378;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startCreateScene, this);
        this.score = 0;
    }
    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
