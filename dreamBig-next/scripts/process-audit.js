const fs = require("node:fs");
const path = require("node:path");

const reportPath = path.resolve(process.cwd(), "audit-report.json");
const summaryPath = path.resolve(process.cwd(), "audit-summary.txt");

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const advisories = Object.values(report.advisories || {});

const summary = advisories.map((advisory) => ({
  package: advisory.module_name,
  severity: advisory.severity,
  recommendation: advisory.recommendation || "Review advisory for remediation",
  issue: advisory.title || "Security advisory",
  path: advisory.findings?.[0]?.paths?.[0] || "unknown",
}));

const unique = Array.from(
  new Map(
    summary.map((item) => [
      [item.package, item.severity, item.path, item.recommendation].join(":"),
      item,
    ]),
  ).values(),
);

if (unique.length === 0) {
  const message = "No vulnerable packages found.\n";
  fs.writeFileSync(summaryPath, message);
  console.log(message.trim());
} else {
  const lines = ["Vulnerable packages:"];
  for (const item of unique) {
    lines.push(`- package: ${item.package}`);
    lines.push(`  severity: ${item.severity}`);
    lines.push(`  path: ${item.path}`);
    lines.push(`  issue: ${item.issue}`);
    lines.push(`  action: ${item.recommendation}`);
  }
  fs.writeFileSync(summaryPath, `${lines.join("\n")}\n`);
  console.log(lines.join("\n"));
}

const criticalCount = report?.metadata?.vulnerabilities?.critical ?? 0;

if (criticalCount > 0) {
  console.error(`Critical vulnerabilities found: ${criticalCount}`);
  process.exit(1);
}

console.log("No critical vulnerabilities found.");
