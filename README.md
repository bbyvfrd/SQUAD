# SQUAD

Coming-soon landing page for SQUAD — a community sports platform for Azerbaijan.

Live at **https://squad.az**.

See [docs/project-brief.md](docs/project-brief.md) for product framing and [CLAUDE.md](CLAUDE.md) for the technical map.

## Quick start

```bash
npm install
cp .dev.vars.example .dev.vars   # then fill in real values
npm run dev                      # http://localhost:8788 (page + /api/subscribe + /docs/* 404)
npm test                         # function tests
npm run typecheck
```

Push to `main` to deploy via Cloudflare Pages.
