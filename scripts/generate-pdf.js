const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const htmlPath = path.join(__dirname, '..', 'WordPressSecurityWhitePaper.html');
	const htmlContent = fs.readFileSync(htmlPath, 'utf8');

	await page.setContent(htmlContent, {
		waitUntil: 'networkidle0'
	});

	const pdfPath = path.join(__dirname, '..', 'WordPressSecurityWhitePaper.pdf');

	await page.pdf({
		path: pdfPath,
		format: 'A4',
		printBackground: true,
		margin: {
			top: '0.75in',
			right: '0.5in',
			bottom: '0.75in',
			left: '0.5in'
		}
	});
	await browser.close();

	console.log(`PDF generated successfully: ${pdfPath}`);
}

generatePDF().catch(console.error);
