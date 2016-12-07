class background extends egret.DisplayObjectContainer {
	private food: Food;
	private snake: Snake;
	private radius = 30;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
	}
	private startGame() {
		//调用方法生产随机食物
		this.randomFood();
	}
	private randomFood() {
		//随机坐标
        var tmpx = Math.random() * (this.width);
        var tmpy = Math.random() * (this.height );
        //新建食物对象
        this.food = new Food(tmpx, tmpy, this.radius);
        //显示
        this.addChild(this.food);
	}
}