TypeScript CLI Commands – Quick Notes
1. Installation
# Initialize Node project
npm init -y

# Install TypeScript
npm install -D typescript

# Install TSX (execute TS directly)
npm install -D tsx


2. TypeScript Compiler (tsc)
# Check TypeScript version
npx tsc -v

# Generate tsconfig.json
npx tsc --init

# Compile a TS file into JS
npx tsc basic.ts

# Compile all files using tsconfig.json
npx tsc




3. Execute TypeScript
# Run TS file directly using tsx
npx tsx basic.ts or node basics.ts

# Run a specific TS file
npx tsx src/components/basic.ts or node src/components/basic.ts