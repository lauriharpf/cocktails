# Cocktails World [![Build status](https://ci.appveyor.com/api/projects/status/0ipfl0ib704h2s8o?svg=true)](https://ci.appveyor.com/project/lauriharpf/cocktails)

[Cocktails World](http://www.cocktailsworld.eu/) shows cocktail recipes and calculates needed ingredients based on selected cocktails. Built with React, Bootstrap, C#, ASP.NET Web Api and hosted in Azure.

# Getting started with development

## First time setup

1. Install [Visual Studio 2017 Community](https://www.visualstudio.com/downloads/) with "ASP.NET and web development" and "Azure development" Workloads.
2. Install [SQL Server 2016 SP1 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
3. Install [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner).
4. Start the Azure Storage Emulator installed in Step 1 (Windows Start button -> type Azure Storage Emulator and select it)
5. Git clone the project. In Visual Studio, Team Explorer -> Clone https://github.com/lauriharpf/cocktails.git . Open the Cocktails.sln in Visual Studio.
6. Open Package Manager Console (Tools -> NuGet Package Manager -> Package Manager Console). Ensure "Cocktails" is selected as the Default project.
7. Type `Update-Database` in Package Manager Console and press Enter to create the database.
8. Right-click the `package.json` file at the root of the Cocktails project -> Task Runner Explorer
9. In Task Runner Explorer, right-click the "package.json -> Custom -> build" target and select "Run".
10. In Visual Studio, run the application in Debug mode (F5).
11. When app has started, open http://localhost:50406/hangfire/recurring . Select `GetRecipesFromWikipedia.Get` job, click _Trigger now_.
12. When `GetRecipesFromWikipedia.Get` has Succeeded, open http://localhost:50406/ . Cocktails should be shown and the site usable.
13. To run tests in CocktailsTests project, select Tools -> Extensions and Updates -> Online and install the _NUnit 3 Test Adapter_. Run all tests with CTRL+R+A.

## Running

1. Ensure Azure Storage Emulator is started (Windows Start button -> type Azure Storage Emulator and select it)
2. Open Cocktails.sln in Visual Studio.
3. If new Entity Framework migrations have been added, run `Update-Database` in the Package Manager Console
4. Right-click the `package.json` file at the root of the Cocktails project -> Task Runner Explorer
6. In Task Runner Explorer, right-click the "package.json -> Custom -> build" target and select "Run".
7. Run the app by pressing F5. The .jsx files can be modified while the app is running and changes are reflected in the browser.