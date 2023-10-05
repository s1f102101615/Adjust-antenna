/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx'],
  basePath:
    process.env.GITHUB_REPOSITORY !== undefined
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
      : '',
  output: 'server',
  trailingSlash: true,
  transpilePackages: ['api', 'commonConstantsWithClient'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      // リダイレクトの設定
      { source: '/event/:appoid', destination: '/event/[appoid]', permanent: true },
      // 他のリダイレクトルールを追加
    ];
  },
};
