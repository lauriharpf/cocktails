# Cocktails World [![Build status](https://ci.appveyor.com/api/projects/status/0ipfl0ib704h2s8o?svg=true)](https://ci.appveyor.com/project/lauriharpf/cocktails)

[Cocktails World](http://www.cocktailsworld.eu/) shows cocktail recipes and calculates needed ingredients based on selected cocktails. Built with .NET Core, React, Redux, Bootstrap and hosted in Azure.

![Animated demo of Cocktails World site](https://raw.githubusercontent.com/lauriharpf/cocktails/master/readme_demo.gif)

# Getting started with development

## Setup

1. Install [Visual Studio 2017 Community](https://www.visualstudio.com/downloads/) 15.8.1 or later with "ASP.NET and web development" workload.
2. Install [Node.js](https://nodejs.org/en/) 10.7 or later.
3. Change Visual Studio to use the installed Node.js instead of the bundled-in one. See [Update Node Version in Visual Studio 2017](https://stackoverflow.com/a/43850262/843984).
4. Git clone the project. In Visual Studio, Team Explorer -> Clone https://github.com/lauriharpf/cocktails.git . Open Cocktails.sln in Visual Studio.
5. Run the application in Debug mode (F5). Cocktails should be shown and the site usable.

## Developing

1. Open Cocktails.sln in Visual Studio.
2. Run the app by pressing F5. The .js files can be modified while the app is running and changes are reflected in the browser.

Changes to dependencies in package.json take effect when the file is saved.

## Running tests

1. Open a Node.js command prompt.
2. `cd` to the directory containing `package.json` (`Cocktails\ClientApp`)
3. `npm test`

## Publishing

1. Set up an App Service on Azure.
2. In Visual Studio, right-click on Cocktails project -> Publish.
3. Choose Microsoft Azure App Service. Select your Azure account.
4. Publish.