<template>
<div class="container d-flex flex-column ga-3">

    <div class="atom-simulation d-flex flex-col justify-center align-center">
        <span :hidden="glNotSupport">Your Browser doesn't support OPENGL</span>
        <canvas ref="atomSimulation" width="500" height="500"></canvas>
    </div>


    <Undercontruction @backToHome="$emit('backToGallery', 0)"/>



</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Config from '@/config'
import Undercontruction from '@/components/Undercontruction/Undercontruction.vue';

export default defineComponent({
    name: 'Project',
    emits: ['backToGallery'],
    setup() {
        const atomSimulation = ref<HTMLCanvasElement>();
        return {
            atomSimulation
        };
    },
    components: {
        Undercontruction,
    },
    mounted() {
        const gl: WebGLRenderingContext = this.atomSimulation?.getContext("webgl");

        if (!gl) {
            this.glNotSupport = false;
            return
        }

        const vsSource = `
            attribute vec2 position;
            void main() {
            gl_Position = vec4(position, 0.0, 5.0);
            }
        `;

        const fsSource = `
            void main() {
            gl_FragColor = vec4(0.2, 0.8, 1.0, 1.0);
            }
        `;

        // Compile shader
        function compile(type: number, source: string) {
            const shader: WebGLShader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        const vs: WebGLShader = compile(gl.VERTEX_SHADER, vsSource);
        const fs: WebGLShader = compile(gl.FRAGMENT_SHADER, fsSource);

        // Create program
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Triangle vertices (clip space)
        const vertices: number[] = [];

        vertices.push(0,0);

        const MAX_SEGMENTS = 50;
        const RADIUS = 1;

        for (let i = 0; i <= MAX_SEGMENTS; ++i) {
            const angle: number = Math.PI * 2 * (i/MAX_SEGMENTS);
            const x: number = Math.cos(angle) * RADIUS;
            const y: number = Math.sin(angle) * RADIUS;
            vertices.push(x,y);
        }

        const vertexArray = new Float32Array(vertices);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);
        

        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, MAX_SEGMENTS + 2);
        
    },
    data() {
        return {
            config: Config,
            glNotSupport: true,
        }
    }
});
</script>