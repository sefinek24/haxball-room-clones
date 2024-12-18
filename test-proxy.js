require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const browserArgs = require('./scripts/args.js');
const launchBrowser = require('./scripts/launchBrowser.js');
const { createProfileDir, openTargetRoom } = require('./scripts/utils.js');

// Config
const LAUNCH_DELAY = 3000;
const MAX_TABS = 4;

(async () => {
	const proxies = fs.readFileSync(path.join(__dirname, 'proxies.txt'), 'utf-8').split('\n').filter(Boolean);
	let browserLaunchCount = 0;

	for (const proxy of proxies) {
		if (browserLaunchCount >= MAX_TABS) break;

		const profile = createProfileDir();
		if (fs.existsSync(profile.path)) fs.rmSync(profile.path, { recursive: true, force: true });

		const browser = await launchBrowser(proxy, profile.path, browserArgs);
		browserLaunchCount++;

		const pages = await browser.pages();
		const page = pages.length > 0 ? pages[0] : await browser.newPage();

		await openTargetRoom(page, 'https://myip.com');
		// await openTargetRoom(page, 'https://haxball.com');
		// await openTargetRoom(page, 'https://sefinek.net');

		if (MAX_TABS > 1) await new Promise(resolve => setTimeout(resolve, LAUNCH_DELAY));
	}
})();
