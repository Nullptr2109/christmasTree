type Point2D = {
  x: number;
  y: number;
  alpha: number;
};

interface SpiralConfig {
  foreground: string;
  angleOffset: number;
  factor: number;
}

export class SpiralScene {
  private ctx: CanvasRenderingContext2D;
  
  private thetaMin = 0;
  private thetaMax = 6 * Math.PI;
  private period = 40;
  private lineSpacing = 1 / 30;
  private lineLength = this.lineSpacing / 2;

  private yScreenOffset = 300;
  private xScreenOffset = 150;
  private xScreenScale = 360;
  private yScreenScale = 360;

  private yCamera = 2;
  private zCamera = -3;

  private rate = 1 / (2 * Math.PI);  // 2 越小越细
  private factor = (1 / (2 * Math.PI)) / 3;

  private spirals: Spiral[] = [];
  private isRunning = false;

  constructor(private canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    this.ctx = ctx;

    this.initSpirals();
  }

  private initSpirals() {
    this.spirals = [
      new Spiral({ foreground: "#220000", factor: 0.90 * this.factor, angleOffset: Math.PI * 0.92 }, this),
      new Spiral({ foreground: "#002211", factor: 0.90 * this.factor, angleOffset: -Math.PI * 0.08 }, this),

      new Spiral({ foreground: "#660000", factor: 0.93 * this.factor, angleOffset: Math.PI * 0.95 }, this),
      new Spiral({ foreground: "#003322", factor: 0.93 * this.factor, angleOffset: -Math.PI * 0.05 }, this),

      new Spiral({ foreground: "#ff0000", factor: this.factor, angleOffset: Math.PI }, this),
      new Spiral({ foreground: "#00ffcc", factor: this.factor, angleOffset: 0 }, this),
    ];
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.renderFrame();
  }

  private renderFrame = () => {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();

    for (const s of this.spirals) s.render(this.ctx);

    setTimeout(() => requestAnimationFrame(this.renderFrame), 1600 / this.Period);
  };

  // ==========================
  // Utilities for spiral
  // ==========================

  public projectTo2D(x: number, y: number, z: number): Point2D {
    return {
      x: this.xScreenOffset + this.xScreenScale * (x / (z - this.zCamera)),
      y: this.yScreenOffset + this.yScreenScale * ((y - this.yCamera) / (z - this.zCamera)),
      alpha: 1
    };
  }

  public getThetaChangeRate(theta: number, length: number, rate: number, factor: number) {
    return length / Math.sqrt(rate * rate + factor * factor * theta * theta);
  }

  public stroke(color: string, alpha: number) {
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.strokeStyle = color;
    this.ctx.globalAlpha = alpha;
    this.ctx.beginPath();
  }

  public getPointByAngle(theta: number, factor: number, angleOffset: number, rate: number): Point2D {
    const x = theta * factor * Math.cos(theta + angleOffset);
    const z = -theta * factor * Math.sin(theta + angleOffset);
    const y = rate * theta;
    const p = this.projectTo2D(x, y, z);
    // console.log("Point3D:",  p);
    p.alpha = Math.atan((y * factor / rate * 0.1 + 0.02 - z) * 40) * 0.35 + 0.65;

    return p;
  }

  get ThetaMin() { return this.thetaMin; }
  get ThetaMax() { return this.thetaMax; }
  get Period()   { return this.period; }
  get LineSpacing() { return this.lineSpacing; }
  get LineLength()  { return this.lineLength; }
  get Rate() { return this.rate; }
}

class Spiral {
  private offset = 0;
  private lineSegments: Record<number, { start: Point2D; end: Point2D }[]>;

  constructor(private config: SpiralConfig, private scene: SpiralScene) {
    this.lineSegments = this.computeLineSegments();
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.offset >= this.scene.Period) {
      this.offset = 0;
    }
    // console.log("Spiral offset:", this.offset);
    const segments = this.lineSegments[this.offset];
    if (!segments) return;
    
    for (const seg of segments) {
      this.scene.stroke(this.config.foreground, seg.start.alpha);
      ctx.moveTo(seg.start.x, seg.start.y);
      ctx.lineTo(seg.end.x, seg.end.y);
    }
    this.offset += 1;
  }

  private computeLineSegments() {
    const segments: Record<number, any[]> = {};
    const factor = this.config.factor;
    const rate = this.scene.Rate;
    const space = Math.floor(277 / this.scene.Period);
    // segments[1] = [];
    for (let offset = 0; offset < this.scene.Period; offset++) {
      const list: any[] = [];
      segments[offset] = list;
      let i = 1;
      for (
        let theta = this.scene.ThetaMin
          + this.scene.getThetaChangeRate(this.scene.ThetaMin, offset * this.scene.LineSpacing / this.scene.Period, rate, factor);
        theta < this.scene.ThetaMax;
        theta += this.scene.getThetaChangeRate(theta, this.scene.LineSpacing, rate, factor)
      ) {
        if (i >= (Math.abs(offset) + 1) * space) break;
        const thetaOld = Math.max(theta, this.scene.ThetaMin);
        const thetaNew = theta + this.scene.getThetaChangeRate(theta, this.scene.LineLength, rate, factor);
        if (thetaNew <= this.scene.ThetaMin * (Math.abs(offset) + 1) / 5) continue;
        list.push({
          start: this.scene.getPointByAngle(thetaOld, factor, this.config.angleOffset, rate),
          end: this.scene.getPointByAngle(thetaNew, factor, this.config.angleOffset, rate),
        });
        i += 1;
      }
    }

    return segments;
  }
}
