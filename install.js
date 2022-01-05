const baseUrl = 'https://raw.githubusercontent.com/WildZarek/bitburner-game-scripts/master/'
const filesToDownload = [
  'ns/autobuy-hacknet.js',
  'ns/autobuy-vps.js',
  'ns/autopwn-csec.js',
  'ns/botnet.js',
  'ns/hack-target.js',
  'ns/harakiri-sushi.js',
  'ns/hong-fang-tea.js',
  'ns/initial-hack.js',
  'ns/joesguns.js',
  'ns/monitor.js',
  'ns/ram-upgrader.js',
  'ns/singlehack.js',
  'ns/tor-router.js',
  'scripts/calc-threads.script',
]

function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Downloading scripts...`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('[x] This script needs to be executed from your home server.')
  }

  for (let i = 0; i < filesToDownload.length; i++) {
    const filename = filesToDownload[i]
    const path = baseUrl + filename
    await ns.scriptKill(filename, 'home')
    await ns.rm(filename)
    await ns.sleep(200)
    ns.tprint(`[${localeHHMMSS()}] Trying to download ${path}`)
    await ns.wget(path + '?ts=' + new Date().getTime(), filename)
  }

  // valuesToRemove.map((value) => localStorage.removeItem(value)) // REQUIRED 

  ns.tprint(`[${localeHHMMSS()}] Killing all scripts from home...`)
  ns.killall("home")
  ns.tprint(`[${localeHHMMSS()}] Spawning initial-hack.js...`)
  ns.spawn("initial-hack.js", 1);
}