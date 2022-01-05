export async function main(ns) {
	const programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
	
	// Array of all servers that don't need any ports opened
	// to gain root access. These have 16 GB of RAM
	let servers_ports_0 = ["foodnstuff",
                    	  "sigma-cosmetics",
                    	  "joesguns",
                    	  "nectar-net",
                    	  "hong-fang-tea",
                    	  "harakiri-sushi"];
	// Array of all servers that only need 1 port opened
	// to gain root access. These have 32 GB of RAM
	let servers_ports_1 = ["neo-net",
                    	   "zer0",
                    	   "max-hardware",
                    	   "iron-gym"];
	
	for (var i = 0; i < servers_ports_0.length; ++i) {
    	var server = servers_ports_0[i];
		await autoroot(ns, server);
		scp("joesguns.js", server);
		exec("joesguns.js", server, 6);
	}

	for (var i = 0; i < servers_ports_1.length; ++i) {
    	var server = servers_ports_1[i];
		await autoroot(ns, server);
		scp("joesguns.js", server);
		exec("joesguns.js", server, 12);
	}

	exec("monitor.js joesguns", "home");

}

async function autoroot(ns, target) {
    if (ns.hasRootAccess(target) == false) {
		var ports_required = ns.getServerNumPortsRequired(target);
		if (ports_required == 0) {
			ns.nuke(target);
		} else {
			var required_programs = false;
			for (var port = 0; port <= ports_required-1; ++port) {
				var prog = programs[port];
            	if (hasProgram(ns, prog)) {
                	continue;
            	} else {
                	required_programs = true;
					break;
            	}
			}
			if (!required_programs) {
				if (ports_required == 1) {
					ns.brutessh(target);
					ns.nuke(target);
				}
				if (ports_required == 2) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.nuke(target);
				}
				if (ports_required == 3) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.relaysmtp(target);
					ns.nuke(target);
				}
				if (ports_required == 4) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.relaysmtp(target);
					ns.httpworm(target);
					ns.nuke(target);
				}
				if (ports_required == 5) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.relaysmtp(target);
					ns.httpworm(target);
					ns.sqlinject(target);
					ns.nuke(target);
				}
			}
		}
	} else {
		ns.tprint("[!] " + target + " already rooted!");
	}
}

function hasProgram(ns, program) {
    return ns.fileExists(program, "home");
}