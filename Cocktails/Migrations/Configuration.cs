using System.Collections.Generic;
using Cocktails.Models;

namespace Cocktails.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Cocktails.Database.CocktailsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Cocktails.Database.CocktailsContext context)
        {
            var ingredients = new List<Ingredient>
            {
                new Ingredient {Name = "white rum"},
                new Ingredient {Name = "dark rum"},
                new Ingredient {Name = "orange curaçao"},
                new Ingredient {Name = "orgeat syrup"},
                new Ingredient {Name = "fresh lime juice"},
                new Ingredient {Name = "citron vodka"},
                new Ingredient {Name = "cointreau"},
                new Ingredient {Name = "cranberry juice"},
                new Ingredient {Name = "mint sprig"},
                new Ingredient {Name = "white sugar"},
                new Ingredient {Name = "soda water"},
                new Ingredient {Name = "gin"},
                new Ingredient {Name = "dry vermouth"}
            };
            ingredients.ForEach(i => context.Ingredients.AddOrUpdate(ci => ci.Name, i));
            context.SaveChanges();

            var cocktails = new List<Cocktail>
            {
                new Cocktail
                {
                    Name = "Mai Tai",
                    Image = "mai-tai_small.jpg",
                    RecipeRows = new List<RecipeRow>
                    {
                        new RecipeRow {Ingredient = ingredients[0], Amount = 4, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[1], Amount = 2, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[2], Amount = 1.5m, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[3], Amount = 1.5m, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[4], Amount = 1, Unit = Unit.Cl}
                    },
                    Instructions = "Shake ingredients with ice, strain into a glass. Serve with a straw."
                },
                new Cocktail
                {
                    Name = "Cosmopolitan",
                    Image = "cosmopolitan_small.jpg",
                    RecipeRows = new List<RecipeRow>
                    {
                        new RecipeRow {Ingredient = ingredients[5], Amount = 4, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[6], Amount = 1.5m, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[7], Amount = 3, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[4], Amount = 1.5m, Unit = Unit.Cl}
                    },
                    Instructions =
                        "Fill a cocktail shaker with ice. Add all ingredients, then shake. Strain into a large cocktail glass. Garnish with a slice of lime."
                },
                new Cocktail
                {
                    Name = "Mojito",
                    Image = "mojito_small.jpg",
                    RecipeRows = new List<RecipeRow>
                    {
                        new RecipeRow {Ingredient = ingredients[0], Amount = 4, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[4], Amount = 3, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[8], Amount = 6, Unit = Unit.Item},
                        new RecipeRow {Ingredient = ingredients[9], Amount = 2, Unit = Unit.Teaspoon},
                        new RecipeRow {Ingredient = ingredients[10], Unit = Unit.Unspecified}
                    },
                    Instructions =
                        "Muddle leaves of mint with lime juice and sugar. Add splash of soda water, fill the glass with cracked ice. " +
                        "Pour rum into glass, top with soda water. Garnish with leaves of mint and slice of lemon, serve with straw."
                },
                new Cocktail
                {
                    Name = "Dry Martini",
                    RecipeRows = new List<RecipeRow>
                    {
                        new RecipeRow {Ingredient = ingredients[11], Amount = 6, Unit = Unit.Cl},
                        new RecipeRow {Ingredient = ingredients[12], Amount = 1, Unit = Unit.Cl}
                    },
                    Instructions =
                        "Pour gin and vermouth into mixing glass with ice. Stir. Strain in a chilled martini glass. Squeeze oil from lemon peel to the drink or garnish with olives."
                }
            };
            cocktails.ForEach(c => context.Cocktails.AddOrUpdate(cc => cc.Name, c));
            context.SaveChanges();
        }
    }
}
