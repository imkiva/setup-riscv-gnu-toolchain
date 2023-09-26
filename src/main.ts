import * as core from "@actions/core";
import * as tool from "@actions/tool-cache";
import * as exec from "@actions/exec";
import * as os from "os";
import * as path from "path";

async function run(): Promise<void> {
  try {
    const version = core.getInput("version");
    const arch = core.getInput("arch");
    const libc = core.getInput("libc");
    const compiler = core.getInput("compiler");
    const os = core.getInput("os");

    core.info("Hello! I am going to setup riscv-collab/riscv-gnu-toolchain with the following configuration:");
    core.info("version:  " + version);
    core.info("arch:     " + arch);
    core.info("libc:     " + libc);
    core.info("compiler: " + compiler);
    core.info("os:       " + os);

    // TODO: support parsing `latest` version to tag name
    let url = `https://github.com/riscv-collab/riscv-gnu-toolchain/releases/download/${version}/${arch}-${libc}-${os}-${compiler}-nightly-${version}-nightly.tar.gz`
    core.info("Downloading from " + url)

    const toolchainHome = await install(url);
    core.info("Nice to meet you! This is");
    await exec.exec(path.join(toolchainHome, "riscv", "bin", "riscv64-unknown-linux-gnu-gcc"), ["--version"]);
    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

async function install(url: string): Promise<string> {
  const os = detectOS();
  if (os !== "linux") {
    core.setFailed("Currently only Linux is supported");
    throw new Error("Currently only Linux is supported");
  }

  core.info("Downloading from " + url);
  const file = await tool.downloadTool(url);
  core.info("Downloaded to " + file);

  const toolchainHome = await tool.extractTar(file);
  core.addPath(path.join(toolchainHome, "riscv", "bin"));
  core.exportVariable("RISCV_HOME", path.join(toolchainHome, "riscv"));
  core.exportVariable("RISCV_SYSROOT", path.join(toolchainHome, "riscv", "sysroot"));
  return toolchainHome;
}

/** convert current OS to GitHub runner names */
function detectOS(): string {
  var osType: string = os.type().toLowerCase();
  if (osType.includes("linux")) return "linux";
  if (osType.includes("darwin")) return "macos";
  if (osType.includes("windows")) return "windows";
  throw new Error("Unknown OS: " + osType);
}

run()
