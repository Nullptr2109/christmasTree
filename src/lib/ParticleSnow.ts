interface RandomRange {
  min: number;
  max: number;
}

interface SnowRenderer {
  width: number;
  height: number;
  depth: number;
  radius: number;
  velocity: number;
  groundRate: number;
  getRandomValue(range: RandomRange): number;
}

export default class ParticleSnow {
  private renderer: SnowRenderer;

  private z = 0;
  x = 0;
  y = 0;
  private rate = 0;
  private radius = 0;
  private vx = 0;
  private vy = 0;
  private opacity = 1;
  verticalThreshold = 0;
  private theta = 0;
  private deltaTheta = 0;

  constructor(renderer: SnowRenderer) {
    this.renderer = renderer;
    this.init(false);
  }

  private init(toReset: boolean) {
    const r = this.renderer;

    this.z = r.getRandomValue({ min: 1, max: r.depth });
    this.x = r.getRandomValue({ min: 0, max: r.width });

    this.y = toReset
      ? -r.getRandomValue({ min: this.radius, max: r.height / 3 })
      : r.getRandomValue({ min: 0, max: r.height });

    this.rate = this.z / r.depth;
    this.radius = r.radius * this.rate;
    this.vx = r.getRandomValue({ min: -r.velocity, max: r.velocity }) * this.rate;
    this.vy = r.velocity * this.rate;

    this.opacity = 1;

    this.verticalThreshold = r.height * (r.groundRate + (1 - r.groundRate) * this.rate);

    this.theta = 0;
    this.deltaTheta = -this.vx / 30;
  }

  render(context: CanvasRenderingContext2D, toFront: boolean): boolean {
    const r = this.renderer;

    // 分前后层
    if ((toFront && this.z <= r.depth / 2) || (!toFront && this.z > r.depth / 2)) {
      return false;
    }

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.theta);
    context.globalAlpha = this.opacity;
    context.strokeStyle = `hsl(0, 0%, ${80 + 20 * this.rate}%)`;
    context.lineWidth = 2 * this.rate;

    // 绘制雪花的三条线
    for (let i = 0; i < 3; i++) {
      context.save();
      context.rotate((Math.PI * i * 2) / 3);

      context.beginPath();
      context.moveTo(0, -this.radius);
      context.lineTo(0, this.radius);
      context.stroke();

      context.restore();
    }

    context.restore();

    // 出界重新生成
    if (this.x < -this.radius || this.x > r.width + this.radius) {
      this.init(true);
    } else if (this.y > this.verticalThreshold) {
      this.opacity -= 0.05;

      if (this.opacity <= 0) {
        this.init(true);
      }
      return false;
    }

    // 更新位置与旋转
    this.x += this.vx;
    this.y += this.vy;
    this.theta = (this.theta + this.deltaTheta) % (Math.PI * 2);

    return false;
  }
}
