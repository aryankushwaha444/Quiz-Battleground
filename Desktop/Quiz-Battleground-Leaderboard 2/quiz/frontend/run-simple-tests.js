#!/usr/bin/env node

/**
 * Simple test runner script
 * Run this with: node run-simple-tests.js
 */

const { execSync } = require("child_process");

console.log("🧪 Running Simple Unit Tests...\n");

try {
  // Run only the simple test files
  execSync(
    "npx vitest run src/Register.simple.test.jsx src/Login.simple.test.jsx src/Auth/AuthContext.simple.test.jsx",
    {
      stdio: "inherit",
      cwd: process.cwd(),
    }
  );

  console.log("\n✅ All simple tests passed!");
} catch (error) {
  console.log("\n❌ Some tests failed. Check the output above.");
  process.exit(1);
}
