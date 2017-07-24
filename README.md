# Marvel Comic Book Database

## Introduction

This little app was written for a front-end developer role in an application process. It features REST-based autocomplete and AJAX updates.
Given the small complexity and the little amount of time I had to develop this app, I have forgone writing tests or refactoring the code properly to get the separate responsibilities out of the main App component. I might add these at a later stage. Also, further refactoring might include a proper Redux flow.

## How to run

The app is based on create-react-app, so all commands from create-react-app should work as usual, most importantly:
* `npm start` – to run a local webserver with the app accessible at localhost:3000
* `npm run build` – to build a deployable, optimized version

However, you will need to edit src/key.js first to enter your Marvel API key. Make sure to add your host to your Marvel developer account.