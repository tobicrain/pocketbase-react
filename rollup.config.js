import ts         from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

const isProduction = !process.env.ROLLUP_WATCH;

function basePlugins() {
    return [
        ts(),

        isProduction && terser({
            output: {
                comments: false,
            },
        }),
    ]
}

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file:      'dist/pocketbase.react.es.mjs',
                format:    'es',
                sourcemap: true,
            },
        ],
        plugins: basePlugins(),
        watch: {
            clearScreen: false,
        },
    }
];