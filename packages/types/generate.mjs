#!/usr/bin/env zx

import { $, cd, fs, glob } from 'zx';

cd('../runtime');

await $`pnpm build`;
const declarationFiles = await glob('dist/runtime/*.d.ts');

let finalDeclartionFile = `/**
 * DO NOT EDIT
 * This file has been autogenerated by ./generate.mjs
 */

/* eslint-disable */

`;

for (const declarationFile of declarationFiles) {
  finalDeclartionFile += (await fs.readFile(declarationFile))
    .toString('utf-8')
    .replace(/(export|import)((.|\n)*);/gm, '');
}

cd('../types');

await fs.writeFile('types.d.ts', finalDeclartionFile);
