const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const ProxyChain = require('proxy-chain');
const path = require('node:path');

puppeteer.use(require('puppeteer-extra-plugin-stealth')());
puppeteer.use(require('puppeteer-extra-plugin-adblocker')({ blockTrackers: true, blockTrackersAndAnnoyances: true, interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY }));

const plugins = path.join(__dirname, '..', 'chrome', 'plugins');
console.log('Plugins', plugins);

const chromePath = path.join(__dirname, '..', 'chrome', `${process.env.NODE_ENV === 'production' ? 'linux' : 'win64'}-126.0.6478.182`, `chrome-${process.env.NODE_ENV === 'production' ? 'linux64' : 'win64'}`, `chrome${process.env.NODE_ENV === 'production' ? '' : '.exe'}`);
console.log('Chrome:', chromePath);

module.exports = async (proxy, userDataDir, browserArgs, usePlugins = false) => {
	const anonymizedProxy = proxy && process.env.USE_PROXY === 'true' ? await ProxyChain.anonymizeProxy(proxy) : null;

	return await puppeteer.launch({
		headless: process.env.BOTS === 'false',
		executablePath: chromePath,
		userDataDir,
		ignoreDefaultArgs: usePlugins ? [
			'--disable-extensions',
			'--enable-automation',
		] : [],
		args: [
			anonymizedProxy ? `--proxy-server=${anonymizedProxy}` : null,
			...browserArgs,
			usePlugins ? `--disable-extensions-except=${plugins}` : null,
			usePlugins ? `--load-extension=${plugins}` : null,
		].filter(Boolean),
	});
};