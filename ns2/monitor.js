export async function main(ns) {
    const flags = ns.flags([
        ['refreshrate', 200],
        ['help', false],
    ])
    if (flags._.length === 0 || flags.help) {
        ns.tprint("This script helps visualize the money and security of a server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`)
        return;
    }
    ns.tail();
    ns.disableLog('ALL');
    while (true) {
        const server = flags._[0];
        let money = ns.getServerMoneyAvailable(server);
        if (money === 0) money = 1;
        const maxMoney = ns.getServerMaxMoney(server);
        const minSec = ns.getServerMinSecurityLevel(server);
        const sec = ns.getServerSecurityLevel(server);
        const rooted = ns.hasRootAccess(server);
        const hackable = ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server);
        const ports = ns.getServerNumPortsRequired(server);
        const growthFactor = Math.max((maxMoney - money) / money, 1);
        const neededThreads = Math.round(ns.growthAnalyze(server, growthFactor));
        
        ns.clearLog(server);
        ns.print(`${server} Status Report:`);
        ns.print(` RAM_____: ${ns.getServerMaxRam(server)} GB`);
        ns.print(` Money___: ${ns.nFormat(money, "$0.000a")} / ${ns.nFormat(maxMoney, "$0.000a")} (${(money / maxMoney * 100).toFixed(2)}%)`);
        ns.print(` Rooted__: ${rooted}`);
        ns.print(` Hackable: ${hackable}`);
        ns.print(` Ports___: ${ports}`);
        ns.print(` Security: +${(sec - minSec).toFixed(2)}`);
        ns.print(` hack()__: ${ns.tFormat(ns.getHackTime(server))} (t=${Math.ceil(ns.hackAnalyzeThreads(server, money))})`);
        ns.print(` grow()__: ${ns.tFormat(ns.getGrowTime(server))} (t=${Math.ceil(ns.growthAnalyze(server, maxMoney / money))})`);
        ns.print(` weaken(): ${ns.tFormat(ns.getWeakenTime(server))} (t=${Math.ceil((sec - minSec) * 20)})`);
        ns.print(` Threads_: ${neededThreads}`);
        // ns.print("grow time: " + tFormat(growthTime) + "   threads needed: " + neededThreads);
        await ns.sleep(flags.refreshrate);
    }
}

export function autocomplete(data, args) {
    return data.servers;
}