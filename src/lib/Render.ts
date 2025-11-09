
import ParticleSnow from "./ParticleSnow";

type Range = {
    min: number;
    max: number;
}

export default class Render {
    snowCount = 300;
    velocity = 0.6;
    deltaTheta = Math.PI / 2000;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    depth = 5;
    radius = 5;
    groundRate = 0.6;

    count = 0;
    theta = 0;

    elements: ParticleSnow[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        this.ctx = ctx;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        this.width = canvas.width;
        this.height = canvas.height;
        // console.log(`Canvas size: ${this.width}x${this.height}`);
    }

    init() {
        this.createElements();
        this.reconstructMethod();
        this.render();
    }

    getRandomValue(range: Range) {
        return range.min + Math.random() * (range.max - range.min);
    }

    createElements() {
        for (let i = 0; i < this.snowCount; i++) {
            this.elements.push(new ParticleSnow(this));
        }
    }

    reconstructMethod() {
        this.render = this.render.bind(this);
    }

    render() {
        requestAnimationFrame(this.render);
        const ctx = this.ctx;
        let count = 0;
        const base = (25 + 15 * Math.cos(this.theta));
        let gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'hsl(210, 50%, ' + (base + 30) + '%)');
		gradient.addColorStop(1, 'hsl(210, 50%, ' + base + '%)');
        ctx.fillStyle = gradient;
        // ctx.fillRect(0, 0, this.width, this.height);
        ctx.clearRect(0, 0, this.width, this.height);

        this.elements.sort((a, b)=>{
            return a.verticalThreshold - b.verticalThreshold;
        })
        for (let element of this.elements) {
            if (element.render(ctx, false)) {
                count++;
            }
        }

        ctx.save();
        ctx.globalAlpha = count / this.count;
        ctx.restore();

        this.elements.forEach(e=>{
            e.render(ctx, true);
        })
        this.theta += this.deltaTheta;
        this.theta %= Math.PI * 2;
    }
}