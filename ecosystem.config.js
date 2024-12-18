module.exports = {
	apps: [{
		name: 'hclones',
		script: './index.js',

		// Logging settings
		log_date_format: 'HH:mm:ss.SSS DD.MM.YYYY',
		merge_logs: true,
		log_file: '/home/logs/combined.log',
		out_file: '/home/logs/out.log',
		error_file: '/home/logs/error.log',

		// Application restart policy
		wait_ready: true,
		autorestart: true,
		max_restarts: 5,
		restart_delay: 4000,
		min_uptime: 13000,

		// Environment variables
		env: {
			NODE_ENV: 'production',
		},
	}],
};