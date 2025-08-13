# Backend Deploy Notes

If you see an error like `invalid ELF header` for `bcrypt`, it means a native module compiled for a different CPU/OS got bundled. On Render, force a clean install and prefer pure JS `bcryptjs`.

Steps we already applied:
- Switched to `bcryptjs` (pure JS, no native binding)
- Pinned Node to 20.x via `package.json#engines` and `.nvmrc`
- Deleted `package-lock.json` to avoid stale native binaries

On Render after pushing these changes:
1. Manual Deploy → Clear build cache & deploy
2. Ensure Node version is detected as 20.x


