# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Qinglong automation script repository designed to run automated check-in tasks for various services. The project uses TypeScript utilities and JavaScript automation scripts.

## Project Structure

```
qinglong/
├── script/        # Automation scripts (check-in tasks)
├── utils/         # Shared TypeScript utilities
├── package.json   # Dependencies and scripts
└── tsconfig.json  # TypeScript configuration
```

## Architecture

### Script Layer (`script/`)
Contains automation scripts that perform check-in tasks for various services. Scripts interact with external APIs and use the Qinglong API (`QLAPI`) to retrieve credentials from environment variables.

**Key pattern:**
- Scripts retrieve credentials via `QLAPI.getEnvs({ searchValue: "..." })`
- Credentials are stored as environment variables in Qinglong (e.g., `cgUsername`, `cgPassword`)
- Each script follows the pattern: login → perform action → log result

### Utilities Layer (`utils/`)
Shared TypeScript utilities used across scripts. Currently contains HTTP utilities.

## Development Commands

### Package Management
```bash
pnpm install              # Install dependencies
```

The project uses `pnpm@10.15.1` as specified in package.json.

### TypeScript
```bash
npx tsc                   # Compile TypeScript
npx tsc --noEmit          # Type check without compilation
```

## TypeScript Configuration

- Target: ES2022
- Module: ES2022
- Strict mode enabled
- ESM imports/exports

## Dependencies

- `axios`: HTTP client for API requests
- TypeScript (implied by tsconfig.json)

## Qinglong Integration

Scripts in this repository are designed to run in the Qinglong task scheduler environment. The global `QLAPI` object is available at runtime and provides:

- `QLAPI.getEnvs({ searchValue: string })`: Retrieve environment variables by name

Credentials should be configured as environment variables in Qinglong before running scripts.
