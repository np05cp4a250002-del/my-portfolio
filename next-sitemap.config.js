/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://prameshbhandari.com.np",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: "./public",
};
