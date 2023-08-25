/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {isServer}) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: { removeViewBox: false }
                }
            ]
        });
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false
            }
        }
        return config;
    },
};

module.exports = nextConfig
