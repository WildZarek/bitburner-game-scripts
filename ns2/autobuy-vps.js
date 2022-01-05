// This script is for autobuy VPS with 1024GB RAM each.

export async function main(ns) {
	var vps_ram = 1024;
	var i = 0;
	
    ns.tail();
    ns.disableLog('ALL');

    while (i < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(vps_ram)) {
            var hostname = "vps-" + i;
            ns.purchaseServer(hostname, vps_ram);
            ns.print("[+] New VPS: " + hostname + " with " + ns.getPurchasedServerMaxRam(i) + " GB RAM - You have " + i + " servers.");
            if (i < 23) {
                await ns.scp("joesguns.js", hostname);
                await ns.exec("joesguns.js", hostname, 200);
            }
            ++i;
        } else {
            ns.print("[x] Not enough money. Try later!");
            break;
        }
    }
}