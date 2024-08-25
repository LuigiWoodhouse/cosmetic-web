# Roleplay Delight

## Introduction

This is an angular app that does the client side business logic for Roleplay Delight

## Current Version of this app
1.0.4

## Language version

Angular CLI: 18.0.7
Node: 18.20.4
Package Manager: npm 10.7.0
OS: win32 x64

Angular: 18.0.6
... animations, common, compiler, compiler-cli, core, forms
... material, platform-browser, platform-browser-dynamic
... platform-server, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1800.7
@angular-devkit/build-angular   18.0.7
@angular-devkit/core            18.0.7
@angular-devkit/schematics      18.0.7
@angular/cdk                    18.1.3
@angular/cli                    18.0.7
@angular/ssr                    18.0.7
@schematics/angular             18.0.7
rxjs                            7.8.1
typescript                      5.4.5
zone.js                         0.14.7


## How To Run Locally
1. Install Node.js v18.17.0 if you havent already using the following link https://nodejs.org/en/download
2. Run the following command to install angular cli: npm install -g @angular/cli
3. Install dependencies: npm install
4. Start the application by running : ng serve


## 1.0.1
- Remove space between navbar and shop bar category

## 1.0.2
- Update background color of CTA buttons from pink to rgb(159, 64, 80);

## 1.0.3
- Phone number bug fixed where user would still see error message after only 10 digits

## 1.0.4
- Update background color of CTA buttons from pink to rgb(159, 64, 80) on place order modal
- Add env configs.

## 1.0.5
- Fixed issue with add to cart button not being hidden when stock is zero

## 1.1.0
- Add service worker
- update angular cli and core from 18.0.0 to 18.2.1
- update shop UI