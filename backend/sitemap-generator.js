const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const GAMES_API_URL = 'https://api.rawg.io/api';
const DOMAIN = 'https://bit-arcade.vercel.app'; // Replace with your actual domain

// Function to fetch popular games from RAWG API
async function fetchPopularGames() {
    try {
        const response = await fetch(`${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=1&page_size=50&ordering=-rating`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch games from RAWG API');
        }
        
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular games:', error);
        return [];
    }
}

// Function to generate sitemap XML
function generateSitemapXML(pages, games) {
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    pages.forEach(page => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}${page.loc}</loc>\n`;
        xml += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;
    });
    
    // Add game pages
    games.forEach(game => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/game/${game.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
    });
    
    xml += '</urlset>';
    return xml;
}

// Main function to generate sitemap
async function generateSitemap() {
    console.log('Generating sitemap...');
    
    // Define static pages
    const staticPages = [
        { loc: '/', changefreq: 'daily', priority: '1.0' },
        { loc: '/authentication/login', changefreq: 'monthly', priority: '0.5' },
        { loc: '/authentication/signup', changefreq: 'monthly', priority: '0.5' },
        { loc: '/genres', changefreq: 'weekly', priority: '0.8' },
        { loc: '/profile', changefreq: 'monthly', priority: '0.3' }
    ];
    
    // Fetch popular games
    const games = await fetchPopularGames();
    console.log(`Found ${games.length} popular games`);
    
    // Generate XML
    const sitemapXML = generateSitemapXML(staticPages, games);
    
    // Write to file
    const sitemapPath = path.join(__dirname, '../frontend/public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXML);
    
    console.log(`Sitemap generated successfully with ${staticPages.length} static pages and ${games.length} game pages`);
    console.log(`Sitemap saved to: ${sitemapPath}`);
}

// Export for use in server.js
module.exports = { generateSitemap };

// Run directly if called from command line
if (require.main === module) {
    generateSitemap().catch(console.error);
} 