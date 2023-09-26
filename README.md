# Setup [riscv-gnu-toolchain](https://github.com/riscv-collab/riscv-gnu-toolchain) in your GitHub Actions

## Use this Action

The following code snippet installs the nightly version of Aya and adds it to the PATH:

```yaml
- name: Setup RISCV GNU Toolchain
  uses: imkiva/setup-riscv-gnu-toolchain@latest
  with:
    version: 'latest' # or tag name
    arch: riscv64     # or riscv32
    libc: glibc       # or elf, musl
    compiler: gcc     # or llvm
    os: ubuntu-22.04  # or ubuntu-20.04
```

Available versions are `latest` or any valid [tag name here](https://github.com/riscv-collab/riscv-gnu-toolchain/tags).

## Develop this Action

- Install a modern version of Node.js
- Install `pnpm`: `npm install -g pnpm`
- Install dependencies: `pnpm install`

Due to GitHub restrictions, you have to commit all generated files under `dists/`
folder to version control. So don't forget to run `pnpm package` before commit.
- `pnpm package`
