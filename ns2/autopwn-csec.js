export async function main(ns) {
    const target = "CSEC";
    var hasTorRouter = false;

    while(true) {
        if (ns.getHackingLevel() >= 50) {
            if (ns.hasRootAccess(target) == false) {
                if (ns.fileExists("BruteSSH.exe", "home")) {
                    ns.brutessh(target);
                    ns.nuke(target);
                    ns.tprint("[!] CSEC Ready to backdoor.");
                    await ns.kill(ns.getScriptName(), "home");
                } else {
                    if (hasTor(ns)) {
                        if (ns.getServerMoneyAvailable("home") >= 500000) {
                            ns.purchaseProgram("BruteSSH.exe");
                            ns.tprint("[+] BruteSSH.exe bought from darkweb.");
                            await ns.kill(ns.getScriptName(), "home");
                        }
                    }
                }
            } else {
                ns.tprint("[!] Killing process, connect CSEC server to backdoorize it manually.");
                await ns.kill(ns.getScriptName(), "home");
            }
        }
    }
}

function hasTor(ns) {
    var homeNodes = ns.scan("home");
    return homeNodes.includes("darkweb");
}