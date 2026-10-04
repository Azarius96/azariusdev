import type { APIRoute } from 'astro';

const pages = ['/'];

export const GET: APIRoute = ({ site }) => {
	const lastmod = new Date().toISOString().split('T')[0];
	const urls = pages
		.map((path) => `\t<url>\n\t\t<loc>${new URL(path, site)}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
	);
};
