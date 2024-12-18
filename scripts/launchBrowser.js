const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const ProxyChain = require('proxy-chain');
const path = require('node:path');

puppeteer.use(StealthPlugin());

const plugins = path.join(__dirname, '..', 'chrome', 'plugins');
console.log('Plugins', plugins);

const chromePath = path.join(__dirname, '..', 'chrome', `${process.env.NODE_ENV === 'production' ? 'linux' : 'win64'}-126.0.6478.182`, `chrome-${process.env.NODE_ENV === 'production' ? 'linux64' : 'win64'}`, `chrome${process.env.NODE_ENV === 'production' ? '' : '.exe'}`);
console.log('Chrome:', chromePath);

module.exports = async (proxy, userDataDir, browserArgs) => {
	const anonymizedProxy = proxy && process.env.USE_PROXY === 'true' ? await ProxyChain.anonymizeProxy(proxy) : null;
	return await puppeteer.launch({
		headless: process.env.BOTS === 'false',
		executablePath: chromePath,
		userDataDir,
		ignoreDefaultArgs: [
			'--disable-extensions',
			'--enable-automation',
		],
		args: [
			anonymizedProxy ? `--proxy-server=${anonymizedProxy}` : '',
			...browserArgs,
			`--disable-extensions-except=${plugins}`,
			`--load-extension=${plugins}`,
		].filter(Boolean),
	});
};