const axios = require('./axios.js');

const name = process.env.ROOM_NAME_TO_CLONE;

const defaultCords = {
	country: 'PL',
	lat: 52.2295875549016,
	lon: 21.0067005157071,
};

module.exports = async () => {
	if (!name) throw new Error('ROOM_NAME_TO_CLONE is null or undefined');

	try {
		const res = await axios.get(`https://api.sefinek.net/api/v2/haxball/room-list?name=${name}`);
		if (!res.data) {
			console.warn('Missing res.data');
			return [];
		}

		return res.data?.rooms.length > 0 ? res.data.rooms[0] : defaultCords;
	} catch (err) {
		console.error(err.stack);
		return defaultCords;
	}
};