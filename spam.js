require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const browserArgs = require('./scripts/args.js');
const launchBrowser = require('./scripts/launchBrowser.js');
const { getRandomNickname, createProfileDir, openTargetRoom, setupRoom } = require('./scripts/utils.js');

// Config
const LAUNCH_DELAY = 400;
const USERNAMES_ARRAY = [
	'Pscx1', 'wonderkid', '🐌 Pkt', 'Leeeeniiii', 'RadosnyStolec', 'six nine', 'zax', 'chinczyk', 'Faluś', 'Dawidomad', 'przekozak', 'MrWorldwide',
	'Jack Wilshere', 'Nektar Ananasowy', 'solek', 'hover cat', 'farmer', 'Yezzy>!', 'sucz44', 'FuzzaMuzza', 'FZK', 'Sbx', 'wonderkid',
];

const MESSAGES_ARRAY = [
	'﷽﷽ ﷽﷽﷽ ﷽﷽﷽',
	'ह संदेश समझने की कोशिश कर रहे हैं? 😵‍💫🤯 🧿',
	'﷽ ﷻﷻﷻ ﷽﷽﷽ ﷽﷽',
	' ﷽ ﷽﷽ ﷽﷽ ﷽﷽﷽﷽',
	'﷽﷽ ﷽ ﷽ ﷽﷽﷽',
	'﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷻﷻﷻ ﷽﷽﷽ ﷽﷽﷽',
	'☠️✨☯️🌌✴️🌠 💀',
	'𓂀 𓆣 𓉝 𓂉 𓃹 𓏢 𓋹',
	'مرحبا بكم في أرض العجائب! 💫🎭',
	'𐂃 𐎘 𐌄 𐌈 𐌋 𐍉 𐍀',
	'ﺍﺍﺍ ﷽﷽ ﷽ ﷽ ﷽﷽﷽ ﷽ ﷽',
	'💥⚡𓁿𓀭𓂧𓇼𓎆',
	'🌀✨🎴🏺📿💡',
	'𓋼𓋼𓋼𓋼𓋼',
	'☾★☀☁☂☃☄',
	'🌌🧿🌀☪️📿✨☠️🏺𓂀',
	'🇰🇿Казахстан угрожает⚠️нам бир угроает⚠️нам бомбардировкой💣🇰🇿Казахстан угрожает⚠️нам бир угроает⚠️нам бомбардировкой💣🇰🇿Казахстан угрожает',
];


(async () => {
	const proxies = fs.readFileSync(path.join(__dirname, 'proxies.txt'), 'utf-8').split('\n').filter(Boolean);
	let browserLaunchCount = 0;

	const botsCount = parseInt(process.env.MAX_BOTS, 10);
	console.log(`Bots count: ${botsCount} (env MAX_BOTS)`);

	for (const proxy of proxies) {
		if (browserLaunchCount >= botsCount) break;

		const profile = createProfileDir();
		if (fs.existsSync(profile.path)) fs.rmSync(profile.path, { recursive: true, force: true });

		const randomNick = getRandomNickname(USERNAMES_ARRAY);
		console.log(`Starting (${randomNick}): ${profile.path}`);

		const browser = await launchBrowser(proxy, profile.path, browserArgs, true);
		browserLaunchCount++;

		const pages = await browser.pages();
		const page = pages.length > 0 ? pages[0] : await browser.newPage();

		await openTargetRoom(page, process.env.TARGET_ROOM);
		await setupRoom(page, randomNick, MESSAGES_ARRAY);

		if (botsCount > 1) await new Promise(resolve => setTimeout(resolve, LAUNCH_DELAY));
	}
})();
