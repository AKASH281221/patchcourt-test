#!/usr/bin/env node
"use strict";

function classifyInteger(raw) {
  const text = String(raw).trim();
  if (text === "") {
    throw new Error("Please enter an integer.");
  }
  if (!/^[+-]?\d+$/.test(text)) {
    throw new Error("Input must be an integer (no decimals or letters).");
  }
  const n = Number.parseInt(text, 10);
  return {
    value: n,
    parity: n % 2 === 0 ? "even" : "odd",
  };
}

function main() {
  const arg = process.argv[2];
  const run = (raw) => {
    const result = classifyInteger(raw);
    console.log(`${result.value} is ${result.parity}.`);
  };

  if (arg !== undefined) {
    run(arg);
    return;
  }

  process.stdout.write("Enter an integer: ");
  process.stdin.setEncoding("utf8");
  process.stdin.once("data", (chunk) => {
    try {
      run(chunk);
      process.exit(0);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  });
}

try {
  if (require.main === module) {
    main();
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

module.exports = { classifyInteger };
