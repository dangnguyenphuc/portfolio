const MAX_SEGMENTS = 30;

export const BLUE =    [0,     1,      1];
export const RED =     [1,     0,      0];
export const GRAY =    [0.5,   0.5,    0.5]

export const PROTON_SCALE = 0.1;
export const NEUTON_SCALE = 0.05;
export const ELECTRON_SCALE = 0.03;


export class Particle {
    constructor(
        public pos: number[],
        public charge: number,
        public color: number[] = BLUE,
        public scale: number = 1,
    ) {}
}

export class GlRenderer {
    private gl: WebGLRenderingContext;
    private program!: WebGLProgram;
    private buffer!: WebGLBuffer;
    private vertexCount!: number;

    private positionLoc!: number;
    private offsetLoc!: WebGLUniformLocation;
    private scaleLoc!: WebGLUniformLocation;
    private colorLoc!: WebGLUniformLocation;

    constructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl")!;
    }

    init() {
        const gl = this.gl;

        const vertexShaderSrc: string = `
            attribute vec2 position;
            uniform vec2 offset;
            uniform float scale;

            void main() {
                vec2 scaled = position * scale;
                gl_Position = vec4(scaled + offset, 0.0, 1.0);
            }
        `;

        const fragmentShaderSrc: string = `
            precision mediump float;
            uniform vec3 color;

            void main() {
                gl_FragColor = vec4(color, 1.0);
            }
        `;
        
        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }
        
        const vertexShader = compile(gl.VERTEX_SHADER, vertexShaderSrc);
        const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentShaderSrc);

        this.program = gl.createProgram()!;
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);

        this.positionLoc = gl.getAttribLocation(this.program, "position")!;

        this.offsetLoc = gl.getUniformLocation(this.program, "offset")!;
        this.scaleLoc  = gl.getUniformLocation(this.program, "scale")!;
        this.colorLoc  = gl.getUniformLocation(this.program, "color")!;


        const vertices: number[] = [0,0];

        for (let i = 0; i <= MAX_SEGMENTS; i+=1) {
            const angle: number = Math.PI * 2 * (i/MAX_SEGMENTS);
            vertices.push(Math.cos(angle), Math.sin(angle));
        }

        this.vertexCount = MAX_SEGMENTS + 2;
        this.buffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(this.positionLoc);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);

        gl.clearColor(0, 0, 0, 1);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    draw(particles: Particle[]) {
        const gl = this.gl;
    
        for (const p of particles) {
            gl.uniform2f(this.offsetLoc, p.pos[0], p.pos[1]);
            gl.uniform1f(this.scaleLoc, p.scale);
            gl.uniform3f(this.colorLoc, p.color[0], p.color[1], p.color[2]);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexCount);
        }
    }
}