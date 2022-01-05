// This script is for autobuy TOR router ASAP.
// Requires Source-File 4-1 to work.

export async function main(ns) {
    const torCost = 200000;
    var hasTorRouter = false;
    while (true) {
        if (hasTorRouter) {
            ns.tprint("[!] TOR router already bought. Exiting...");
            break;
        }
        if (hasTor(ns)) {
            hasTorRouter = true;
        } else {
            if (torCost <= getPlayerMoney(ns)) {
                ns.purchaseTor();
            }
        }
        await ns.sleep(200);
    }
}

function getPlayerMoney(ns) {
    return ns.getServerMoneyAvailable("home");
}

function hasTor(ns) {
    var homeNodes = ns.scan("home");
    return homeNodes.includes("darkweb");
}