const MAX_SEGMENTS = 40;
const MAX_WAVE_SEGMENTS = 100;
const MAX_ELECTRON_PER_ATOM = 1;
const MAX_NEUTRON_PER_ATOM = 1;
const WAVE_FREQ = 16;
const WAVE_LENGTH = 2;
const WAVE_AMPLITUDE = 1;

const MAX_COORDINATE = 9

const BLUE           =    [0,     1,      1];
const RED            =    [1,     0,      0];
const GRAY           =    [0.5,   0.5,    0.5]
const ORBIT_COLOR    =    [1,    1,    1]

const PROTON_SCALE = 0.2;
const NEUTRON_SCALE = 0.1;
const ELECTRON_SCALE = 0.08;

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

export class Wave {
    public phase = 0;
    public amplitude = 0.5;
    public xA = 1;
    public firstTouch = false;
    public freq = WAVE_FREQ;

    constructor(
        public pos: number[]
    ) {}

    update(dt: number): void {
        this.phase += dt * WAVE_FREQ * this.xA;
        this.pos[0] += dt * this.xA * WAVE_FREQ/4;
    }

    reflect(w: number, height: number) {
        if (this.pos[0] + WAVE_LENGTH >= MAX_COORDINATE || this.pos[0] - WAVE_LENGTH <= -MAX_COORDINATE) {
            this.xA *= -1;
        }
    }
};

export class Particle {
    public orbitDistance: number = -1;
    constructor(
        public pos: number[],
        public charge: number,
        public color: number[] = RED,
        public scale: number = 1,
        public angle: number = 0
    ) {}
};

export class Electron extends Particle {
    public n: number = 1;

    constructor(
        public pos: number[],
        public protonId: number
    ) {
        super(pos, -1, BLUE, ELECTRON_SCALE, 0);
        const proton: Particle = protons[this.protonId];
        let dx = pos[0] - proton.pos[0];
        let dy = pos[1] - proton.pos[1];
        this.orbitDistance = Math.sqrt(dx*dx + dy*dy);
        this.angle = Math.atan2(dy, dx);
    }

    update(dt: number): void {
        let radius: number = this.orbitDistance * this.n;
        this.angle += ELECTRON_ANGULAR_SPEED * dt;
        const proton: Particle = protons[this.protonId];
        this.pos[0] = proton.pos[0] + Math.cos(this.angle) * radius;
        this.pos[1] = proton.pos[1] + Math.sin(this.angle) * radius;
    }
};

export class GlRenderer {
    public width: number;
    public height: number;
    private gl: WebGLRenderingContext;
    private pProgram!: WebGLProgram;
    private wProgram!: WebGLProgram;

    private buffer!: WebGLBuffer;
    private vertexCount!: number;

    private orbitBuffer!: WebGLBuffer;
    private orbitVertexCount!: number;

    private waveBuffer!: WebGLBuffer;
    private waveVertexCount!: number;

    private positionLoc!: number;
    private offsetLoc!: WebGLUniformLocation;
    private scaleLoc!: WebGLUniformLocation;
    private colorLoc!: WebGLUniformLocation;

    private wPositionLoc!: number;
    private wOffsetLoc!: WebGLUniformLocation;
    private wAmpLoc!: WebGLUniformLocation;
    private wPhaseLoc!: WebGLUniformLocation;
    private wFreqLoc!: WebGLUniformLocation;
    private wColorLoc!: WebGLUniformLocation;

    constructor(private canvas: HTMLCanvasElement) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.gl = canvas.getContext("webgl")!;
        this.gl.viewport(0, 0, canvas.width, canvas.height);
    }

    init() {
        const gl = this.gl;
        this.initGlProgram();

        // particle program
        this.positionLoc = gl.getAttribLocation(this.pProgram, "position")!;
        this.offsetLoc = gl.getUniformLocation(this.pProgram, "offset")!;
        this.scaleLoc  = gl.getUniformLocation(this.pProgram, "scale")!;
        this.colorLoc  = gl.getUniformLocation(this.pProgram, "color")!;

        this.registerCircle();
        this.registerOrbit();

        // wave program
        this.wPositionLoc = gl.getAttribLocation(this.wProgram, "position")!;
        this.wPhaseLoc    = gl.getUniformLocation(this.wProgram, "phase")!;
        this.wAmpLoc      = gl.getUniformLocation(this.wProgram, "amplitude")!;
        this.wFreqLoc     = gl.getUniformLocation(this.wProgram, "freq")!;
        this.wOffsetLoc   = gl.getUniformLocation(this.wProgram, "offset")!;
        this.wColorLoc    = gl.getUniformLocation(this.wProgram, "color")!;
        this.registerWave();

        gl.clearColor(0, 0, 0, 1);
    }

    initGlProgram() {
        const gl = this.gl;
        const pVertexShaderSrc: string = `
            attribute vec2 position;
            uniform vec2 offset;
            uniform float scale;

            void main() {
                vec2 scaled = position * scale;
                gl_Position = vec4(scaled + offset, 0.0, 8.0);
            }
        `;

        const wVertexShaderSrc: string = `
            attribute vec2 position;
            uniform float phase;
            uniform float freq;
            uniform float amplitude;
            uniform vec2 offset;

            void main() {

                float x = position.x;
                float y = amplitude * sin(x * freq + phase);

                gl_Position = vec4(x + offset.x, y + offset.y, 0.0, 8.0);
            }
        `;

        const fragmentShaderSrc: string = `
            precision mediump float;
            uniform vec3 color;

            void main() {
                gl_FragColor = vec4(color, 1.0);
            }
        `;

        this.pProgram = this.createProgram(pVertexShaderSrc, fragmentShaderSrc);
        this.wProgram = this.createProgram(wVertexShaderSrc, fragmentShaderSrc);
        
    }

    createProgram(vertexSrc: string, fragmentSrc: string): WebGLProgram {
        const gl = this.gl;

        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const vertexShader = compile(gl.VERTEX_SHADER, vertexSrc);
        const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSrc);

        const program = gl.createProgram()!;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        return program;
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
    }
    
    registerWave() {
        const gl = this.gl;
        const waveVertices: number[] = [];
        for (let i = 0; i <= MAX_WAVE_SEGMENTS; i++) {
            // sine(wt)
            let x: number = (i/MAX_WAVE_SEGMENTS) * WAVE_LENGTH - WAVE_LENGTH/2;
            waveVertices.push(x, 0);
        }

        this.waveVertexCount = MAX_WAVE_SEGMENTS + 1;

        this.waveBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.waveBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(waveVertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.waveBuffer);
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
        gl.enableVertexAttribArray(this.positionLoc);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
        const proton: Particle = protons[electron.protonId];
        gl.uniform2f(this.offsetLoc, proton.pos[0], proton.pos[1]);
        gl.uniform1f(this.scaleLoc, electron.orbitDistance);
        gl.uniform3f(this.colorLoc, ORBIT_COLOR[0], ORBIT_COLOR[1], ORBIT_COLOR[2]);
        gl.drawArrays(gl.LINE_LOOP, 0, this.orbitVertexCount);
    }

    drawWave(wave: Wave) {
        const gl = this.gl;
        gl.useProgram(this.wProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.waveBuffer);
        gl.enableVertexAttribArray(this.wPositionLoc);
        gl.vertexAttribPointer(this.wPositionLoc, 2, gl.FLOAT, false, 0, 0);
        gl.uniform1f(this.wPhaseLoc, wave.phase);
        gl.uniform1f(this.wFreqLoc, wave.freq);
        gl.uniform1f(this.wAmpLoc, wave.amplitude);
        gl.uniform2f(this.wOffsetLoc, wave.pos[0], wave.pos[1]);
        gl.uniform3f(this.wColorLoc, 1, 1, 1);
        gl.drawArrays(gl.LINE_STRIP, 0, this.waveVertexCount);
    }

    drawParticle(particle: Particle) {
        const gl = this.gl;
        gl.useProgram(this.pProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.enableVertexAttribArray(this.positionLoc);
        gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(this.offsetLoc, particle.pos[0], particle.pos[1]);
        gl.uniform1f(this.scaleLoc, particle.scale);
        gl.uniform3f(this.colorLoc, particle.color[0], particle.color[1], particle.color[2]);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexCount);
    }

    drawElectron(electron: Electron) {
        this.gl.useProgram(this.pProgram);
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
            const electron = new Electron(randPos[Math.floor(Math.random() * 4)], this.counter - 1)
            electrons.push(electron);
            protons[this.counter - 1].orbitDistance = electron.orbitDistance;
        }
    }
}

export function collision(atom: Particle, wave: Wave) {

    const left = wave.pos[0];
    const right = wave.pos[0] + wave.xA*WAVE_LENGTH;

    const top = wave.pos[1];
    const bottom = wave.pos[1] - wave.xA*wave.amplitude * 2;

    const minX = Math.min(left, right);
    const maxX = Math.max(left, right);
    const minY = Math.min(bottom, top);
    const maxY = Math.max(bottom, top);

    const closestX = Math.max(minX, Math.min(atom.pos[0], maxX));
    const closestY = Math.max(minY, Math.min(atom.pos[1], maxY));

    const dx = atom.pos[0] - closestX;
    const dy = atom.pos[1] - closestY;

    return dx * dx + dy * dy <= atom.orbitDistance * atom.orbitDistance;
}