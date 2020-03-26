// vue.config.js
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // baseUrl从 Vue CLI 3.3 起已弃用，请使用publicPath。
    // baseUrl:'./',
    // 公共路径
    publicPath: './',
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    // 开启生产环境SourceMap，设为false打包时不生成.map文件
    productionSourceMap: false,
    // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
    lintOnSave: false,
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require("os").cpus().length > 1,
    // 所有 webpack-dev-server 的选项都支持
    devServer: {
        open: true, // 自动开启浏览器
        port: 8080, // 配置端口
        https: false, // 使用https提供服务
        compress: true, // 开启压缩
        // 设置让浏览器 overlay 同时显示警告和错误
        overlay: {
            warnings: true,
            errors: true
        },
        // 设置请求代理
        // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        proxy: {
            "/api": {
                target: "<url>",
                ws: true,
                changeOrigin: true
            },
            "/foo": {
                target: "<other_url>"
            }
        }
    },
    chainWebpack: config => {
        // 设置一些常用alias
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"));

        // 移除 prefetch 插件，减少首屏加载
        config.plugins.delete("prefetch");
    },
    configureWebpack: config => {
        // 生产环境
        if (process.env.NODE_ENV === "production") {
            // 生产环境去除console
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

            // 生产环境打包分析体积
            return {
                plugins: [new BundleAnalyzerPlugin()]
            };
        }
    },
    // 配置多个sass全局变量文件
    css: {
        loaderOptions: {
            // 全局使用的一些scss样式，注意：需要提前在src文件下创建对应目录的scss文件
            sass: {
                // data写法已废弃，请使用prependData
                // data: `
                prependData: `
              @import "@/scss/reset.scss";
              @import "@/scss/_variables.scss";
              @import "@/scss/_mixins.scss";
            `
            }
        }
    }
};
