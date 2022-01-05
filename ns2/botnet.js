// This script is for run a script on all my purchased VPS servers.

export async function main(ns) {
	var script = ns.args[0];
	var script_ram = ns.getScriptRam(script)
	var i = 0;
	
    ns.tail();
    ns.disableLog('ALL');

    while (i < ns.getPurchasedServerLimit()) {
        var hostname = "vps-" + i;
		var freeram = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);
		var threads = Math.floor(freeram / script_ram);
        if (i < 23) {
            ns.killall(hostname);
			if (ns.fileExists(script, hostname)) {
				await ns.exec(script, hostname, threads);
			} else {
				await ns.scp(script, hostname);
				await ns.exec(script, hostname, threads);
			}
        }
        ++i;
    }
}