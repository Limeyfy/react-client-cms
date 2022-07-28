import postcss from "rollup-plugin-postcss";

export default {
    plugins: [postcss({ extract: true, process: processScss })],
    external: ["react", "react-dom", "src/index.scss"],
}