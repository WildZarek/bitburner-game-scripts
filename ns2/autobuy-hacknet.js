// This script is to handle upgrades for hacknet nodes automatically.

export async function main(ns) {
	const nodes = ns.hacknet;

	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	var targetNodes = 14;
	var targetLevel = 120;
	var targetRam = 32;
	var targetCores = 12;

	while(nodes.numNodes() < targetNodes) {
		nodes.purchaseNode();
	}

	for (var i = 0; i < targetNodes; i++) {
		while (nodes.getNodeStats(i).level < targetLevel - 1) {
			var cost = nodes.getLevelUpgradeCost(i, 10);
			while (myMoney() < cost) {
				sleep(3000);
			}
			var res = nodes.upgradeLevel(i, 10);
		}
	}
	
	ns.print("All nodes upgraded to level " + targetLevel);
	
	for (var i = 0; i < targetNodes; i++) {
		while (nodes.getNodeStats(i).ram < targetRam) {
			var cost = nodes.getRamUpgradeCost(i, 2);
			while (myMoney() < cost) {
				sleep(3000);
			}
			var res = nodes.upgradeRam(i, 2);
		}
	}
	
	ns.print("All nodes upgraded to " + targetRam + "GB RAM");
	
	for (var i = 0; i < targetNodes; i++) {
		while (nodes.getNodeStats(i).cores < targetCores) {
			var cost = nodes.getCoreUpgradeCost(i, 1);
			while (myMoney() < cost) {
				sleep(3000);
			}
			var res = nodes.upgradeCore(i, 1);
		}
	}
	
	ns.print("All nodes upgraded to " + targetCores + " cores");
}

function myMoney() {
    return getServerMoneyAvailable("home");
}