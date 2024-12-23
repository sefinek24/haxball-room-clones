# HaxBall Room Cloning and more ♿⚽
This project lets you clone any HaxBall room and more. Please ensure you have a legitimate reason before using it.

<div align="center">
    [<a href="README.md">ENG</a>] | [<a href="README_PL.md">POL</a>]
</div>
<br>

| File                 | Videos                                                                                                              | Beta? | Description                                                           |
|----------------------|:--------------------------------------------------------------------------------------------------------------------|-------|-----------------------------------------------------------------------|
| [index.js](index.js) | N/A                                                                                                                 | ✅     | Enables cloning of any room.                                          |
| [spam.js](spam.js)   | [[1]](videos/brave_CImkZcsVAvZS.mp4) [[2]](videos/brave_V9aVo2HB6Ls5.mp4) [[3]](videos/webstorm64_tRdRAAcKpprr.mp4) | ✅     | Deploys bots to join a specific room and send random spam messages.   |
| proxies.txt          | N/A                                                                                                                 | N/A   | List of proxies (preferably SOCKS5).                                  |
| tokens.json          | N/A                                                                                                                 | N/A   | A list of headless tokens, along with their generation dates.         |


## About
A game for deficient 30-year-olds (most of the people in this game have asperger's syndrome), who don’t have lives.
Poor people, hurt by fate, with a miserable existence.
If you are a veteran player of this game, you will probably deny my words. Honestly? I don't care.

Basro is ripping you off with Google Ads money, and he doesn't care about the game.
Do something useful for your country (or your family, which you probably don't have), rather than just sitting in front of a computer playing online soccer.

## How does it work?
1. The script connects to a random proxy, where each proxy represents a browser session with two tabs.
2. A GET request is being sent to my API to generate a headless token.
3. Tokens are saved in the `tokens.json` file. If a token expires, the script automatically generates a new one.
4. Every ~12 minutes, the script checks for updates in geolocation data. If changes are detected, the cloned room’s page is refreshed and restarted using the new coordinates (`country`, `lat`, `lon`).

## Can this code be written better? 🤓
Of course, but for what? Answer that question yourself.

## How to use this script?
### Requirements
1. You will need [a proxy](https://stableproxy.com/?r=SKX2AY)
2. A service that offers [automatic captcha solving](https://getcaptchasolution.com/df5q6t8krs)

    https://github.com/user-attachments/assets/48012a22-72c0-476b-ac5a-b11647973a20

3. [Node.js + npm](https://nodejs.org) + [PM2](https://pm2.keymetrics.io)
4. Linux
5. At least +8 GB of RAM is required

### Usage & Installation
```sh
sudo apt update && sudo apt upgrade -y
sudo reboot (if the kernel has been updated)
cd ~
git clone https://github.com/sefinek/haxball-raid-clones.git
mcedit proxy.txt (paste all your proxies)
cp .env.default .env
mcedit .env (set NODE_ENV to production and adjust other variables)
npm install
npm run download-chrome
npm run prepare-anticaptcha
Install the required dependencies for Chrome: https://github.com/sefinek/sefinek/blob/main/chrome.md
npm install pm2 -g
pm2 start
pm2 save
pm2 startup
```

### Tested on
- `Lubuntu` (Proxmox 8.2.7)
- `Ubuntu Server 22.04` (Proxmox 8.2.7)

## How to get coordinates (lat, lon) for each room?
You can check my API https://api.sefinek.net/api/v2/haxball/room-list.
Use the `name` parameter to get information about a specific room. It's not necessary to provide the full name.

### Examples
#### All rooms
```bash
curl "https://api.sefinek.net/api/v2/haxball/room-list"
```

#### Specific room
```bash
curl "https://api.sefinek.net/api/v2/haxball/room-list?name=haxnball"
```

## Other repos
https://github.com/sefinek/2-haxball-rooms