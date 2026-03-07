const MAX_SEGMENTS = 30;
const MAX_ELECTRON_PER_ATOM = 2;
const MAX_NEUTRON_PER_ATOM = 1;

export const BLUE           =    [0,     1,      1];
export const RED            =    [1,     0,      0];
export const GRAY           =    [0.5,   0.5,    0.5]
export const ORBIT_COLOR    =    [1,    1,    1]

export const PROTON_SCALE = 0.1;
export const NEUTRON_SCALE = 0.05;
export const ELECTRON_SCALE = 0.03;

export const ELECTRON_ANGULAR_SPEED = Math.PI / 2;

export const electrons : Electron[] = [];
export const neutrons : Particle[] = [];
export const protons : Particle[] = [];

const randPos = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1]
]

export class Particle {
    constructor(
        public pos: number[],
        public charge: number,
        public color: number[] = RED,
        public scale: number = 1,
        public angle: number = 0
    ) {}
};



export class Electron extends Particle {
    
    public orbitDistance: number;

    constructor(
        public pos: number[],
        public protonId: number
    ) {
        super(pos, -1, BLUE, ELECTRON_SCALE, 0);
        const proton: Particle = protons[this.protonId];
        let dx: number = Math.abs(pos[0] - proton.pos[0]);
        let dy: number = Math.abs(pos[1] - proton.pos[1]);
        this.orbitDistance = Math.sqrt(dx*dx + dy*dy);
        this.angle = Math.atan2(dy, dx);
    }

    update(dt: number): void {
        this.angle += ELECTRON_ANGULAR_SPEED * dt;
        const proton: Particle = protons[this.protonId];
        this.pos[0] = proton.pos[0] + Math.cos(this.angle) * this.orbitDistance;
        this.pos[1] = proton.pos[1] + Math.sin(this.angle) * this.orbitDistance;
    }
};

export class GlRenderer {
    private gl: WebGLRenderingContext;
    private program!: WebGLProgram;
    private buffer!: WebGLBuffer;
    private vertexCount!: number;

    private orbitBuffer!: WebGLBuffer;
    private orbitVertexCount!: number;

    private positionLoc!: number;
    private offsetLoc!: WebGLUniformLocation;
    private scaleLoc!: WebGLUniformLocation;
    private colorLoc!: WebGLUniformLocation;

    constructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl")!;
    }

    init() {
        const gl = this.gl;
        this.initGlProgram();

        this.positionLoc = gl.getAttribLocation(this.program, "position")!;
        this.offsetLoc = gl.getUniformLocation(this.program, "offset")!;
        this.scaleLoc  = gl.getUniformLocation(this.program, "scale")!;
        this.colorLoc  = gl.getUniformLocation(this.program, "color")!;

        this.registerCircle();
        this.registerOrbit();
        gl.clearColor(0, 0, 0, 1);
    }

    initGlProgram() {
        const gl = this.gl;
        const vertexShaderSrc: string = `
            attribute vec2 position;
            uniform vec2 offset;
            uniform float scale;

            void main() {
                vec2 scaled = position * scale;
                gl_Position = vec4(scaled + offset, 0.0, 8.0);
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
    }

    registerCircle() {
        const gl = this.gl;
        const vertices: number[] = [0,0];
        for (let i = 0; i <= MAX_SEGMENTS; i+=1) {
            const angle: number = Math.PI * 2 * (i/MAX_SEGMENTS);
            let x = Math.cos(angle);
            let y = Math.sin(angle);
            vertices.push(x, y);
        }

        this.vertexCount = MAX_SEGMENTS + 2;
        this.buffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.positionLoc);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
    }

    registerOrbit() {
        const gl = this.gl;
        const orbitVertices: number[] = [];
        for (let i = 0; i < MAX_SEGMENTS; i++) {
            const angle = (i / MAX_SEGMENTS) * Math.PI * 2;
            orbitVertices.push(Math.cos(angle), Math.sin(angle));
        }

        this.orbitVertexCount = MAX_SEGMENTS;

        this.orbitBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.orbitBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(orbitVertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.orbitBuffer);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    update(electrons: Electron[], time: number) {
        for (const e of electrons) {
            e.update(time)
        }
    }

    drawOrbit(electron: Electron) {
        const gl = this.gl
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.orbitBuffer);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
        const proton: Particle = protons[electron.protonId];
        gl.uniform2f(this.offsetLoc, proton.pos[0], proton.pos[1]);
        gl.uniform1f(this.scaleLoc, electron.orbitDistance);
        gl.uniform3f(this.colorLoc, ORBIT_COLOR[0], ORBIT_COLOR[1], ORBIT_COLOR[2]);
        gl.drawArrays(gl.LINE_LOOP, 0, this.orbitVertexCount);
    }

    drawParticle(particle: Particle) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(this.offsetLoc, particle.pos[0], particle.pos[1]);
        gl.uniform1f(this.scaleLoc, particle.scale);
        gl.uniform3f(this.colorLoc, particle.color[0], particle.color[1], particle.color[2]);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexCount);
    }

    drawElectron(electron: Electron) {
        this.drawOrbit(electron);
        this.drawParticle(electron);
    }

}

export class AtomManager {
    public counter: number = 0;
    constructor() {}

    makeAtom(x: number, y: number) {
        protons.push(new Particle([x, y], 1, RED, PROTON_SCALE));
        this.counter += 1;

        for (let i = 0; i < MAX_ELECTRON_PER_ATOM; i+=1) {
            electrons.push(new Electron(randPos[Math.floor(Math.random() * 4)], this.counter - 1));
        }
    }
}