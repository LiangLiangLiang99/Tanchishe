class Food extends egret.Sprite {
	//果实的颜色
	public constructor(x: number, y: number, r: number) {
		super();
		this.drawFood(x, y, r);

	}
    //绘制食物
	private drawFood(x: number, y: number, r: number): void {
        var sh: egret.Shape = new egret.Shape();
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
    }
	//食物被吃掉
	private beEat() {
		this.parent.removeChild(this);
	}
}