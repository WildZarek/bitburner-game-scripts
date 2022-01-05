// This script is for auto upgrade RAM on the "home" machine ASAP.
// Only works if actual RAM is below 1024 GB and usage is over 80% of total available.

export async function main(ns) {
    // this runs forever, it always runs. as long as utilization is high enough, we want more ram.
    while (true) {
        var maxram = ns.getServerMaxRam("home");
        var usedram = ns.getServerUsedRam("home");
        var percentage = Math.round(100 * usedram / maxram);
        // if our utilization rates are below half, we don't necessarily need more RAM
		if (percentage > 80 && maxram < 1024) {
            if (ns.getUpgradeHomeRamCost() <= ns.getServerMoneyAvailable("home")) {
                ns.upgradeHomeRam();
            }
		}
        await ns.sleep(2000);
    }
}