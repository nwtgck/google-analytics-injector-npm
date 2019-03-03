#!/usr/bin/env node
// (from: https://qiita.com/takayukioda/items/a149bc2907ef77121229)

import * as fs from "fs";
import * as googleAnalyticsInjector from "./google-analytics-injector";
import * as yargs from "yargs";
import * as detectFileType from "detect-file-type";
import * as path from "path";

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
const fileOrDirPath = argv[argv.length - 1];
// Inject GA tracking code into HTML files
injectRecursively(fileOrDirPath);

function injectRecursively(fileOrDirPath: string): void {
  const stat = fs.statSync(fileOrDirPath);
  if (stat.isFile()) {
    const filePath = fileOrDirPath;
    detectFileType.fromFile(filePath, (err: Error, filetype: any)=>{
      // If file is HTML
      if (err === null && filetype !== null && filetype.mime === "text/html") {
        const html = fs.readFileSync(filePath).toString("UTF-8");
        // Get injected HTML
        const injectedHtml = googleAnalyticsInjector.injectedHtml(html, trackingId);
        // Rewrite injected HTML
        fs.writeFileSync(filePath, injectedHtml);
        console.log(`'${filePath}' is injected!`);
      }
    });
  } else if (stat.isDirectory()) {
    const filePaths = fs.readdirSync(fileOrDirPath);
    for (const filePath of filePaths) {
      injectRecursively(path.join(fileOrDirPath, filePath));
    }
  }
}
