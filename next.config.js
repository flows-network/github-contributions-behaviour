/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {isServer}) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                "fs": false,
                "path": false,
                "os": false
            }
        }
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
};

module.exports = nextConfig
