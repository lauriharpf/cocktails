# Cocktails World [![Build status](https://ci.appveyor.com/api/projects/status/0ipfl0ib704h2s8o?svg=true)](https://ci.appveyor.com/project/lauriharpf/cocktails)

[Cocktails World](http://www.cocktailsworld.eu/) shows cocktail recipes and calculates needed ingredients based on selected cocktails. Built with .NET Core, React, Redux, Bootstrap and hosted in Azure.

![Animated demo of Cocktails World site](https://raw.githubusercontent.com/lauriharpf/cocktails/master/readme_demo.gif)

# Getting started with development

## Setup

1. Install [Visual Studio 2017 Community](https://www.visualstudio.com/downloads/) 15.8.1 or later with "ASP.NET and web development" workload.
2. Install [SQL Server 2016 SP1 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
3. Install [Node.js](https://nodejs.org/en/) 10.7 or later.
4. Change Visual Studio to use the installed Node.js instead of the bundled-in one. See [Update Node Version in Visual Studio 2017](https://stackoverflow.com/a/43850262/843984).
5. Git clone the project. In Visual Studio, Team Explorer -> Clone https://github.com/lauriharpf/cocktails.git . Open Cocktails.sln in Visual Studio.
6. Open Package Manager Console (Tools -> NuGet Package Manager -> Package Manager Console). Ensure "Cocktails" is selected as the Default project.
7. Type `Update-Database` in Package Manager Console and press Enter to create the database.
8. In Visual Studio, run the application in Debug mode (F5). Cocktails should be shown and the site usable.

## Developing

1. Open Cocktails.sln in Visual Studio.
2. If new Entity Framework migrations have been added, run `Update-Database` in the Package Manager Console
3. Run the app by pressing F5. The .js files can be modified while the app is running and changes are reflected in the browser.

Changes to dependencies in package.json take effect when the file is saved.

## Publishing

1. Set up an App Service and a SQL database on Azure.
2. Right-click on Cocktails project -> Publish.
3. Choose Microsoft Azure App Service. Select your Azure account.
4. In the publish Settings -> Databases, enable executing Code First Migrations and enter the Azure database connection string.
5. Publish.