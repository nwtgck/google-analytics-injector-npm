#!/usr/bin/env node
// (from: https://qiita.com/takayukioda/items/a149bc2907ef77121229)

import * as fs from "fs";
import * as googleAnalyticsInjector from "./google-analytics-injector";
import * as yargs from "yargs";
import * as detectFileType from "detect-file-type";

const parser = yargs
  .option("tracking-id", {
    alias: "t",
    type: "string",
    demandOption: true
  })

const argv = process.argv;

// Pars options
const args = parser.parse(argv);

// Get tracking ID
const trackingId: string = args["tracking-id"];

// TODO: Parse properly
const last = argv[argv.length - 1];
const stat = fs.statSync(last);
if (stat.isFile()) {
  const filePath = last;
  detectFileType.fromFile(filePath, (err: Error, filetype: any)=>{
    // If file is HTML
    if (filetype.mime === "text/html") {
      const html = fs.readFileSync(filePath).toString("UTF-8");
      // Get injected HTML
      const injectedHtml = googleAnalyticsInjector.injectedHtml(html, trackingId);
      // Rewrite injected HTML
      fs.writeFileSync(filePath, injectedHtml);
      console.log(`'${filePath}' is injected!`);
    }
  });
} else if (stat.isDirectory) {
  // TODO: impl
  console.log("Not implemented yet");
} else {
  console.log("NO")
}
