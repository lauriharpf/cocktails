using System;
using System.Collections.Generic;
using System.Linq;
using Cocktails.BackgroundJobs.RecipeParser;
using Cocktails.Database;
using Cocktails.Models;

namespace Cocktails.BackgroundJobs
{
    public class GetRecipesFromWikipedia
    {
        private static readonly IList<string> CocktailPages = new List<string>
        {
            "Bloody_Mary_(cocktail)", "Alexander_(cocktail)", "Angel_Face_(cocktail)", "Aviation_(cocktail)",
            "Mai_Tai", "Cosmopolitan_(cocktail)", "Mojito", "Martini_(cocktail)"
        };

        private const string RootUrl = "https://en.wikipedia.org/wiki/";
        private readonly CocktailsContext _context = new CocktailsContext();

        public void Get()
        {
            var parser = new HRecipeParser();
            var recipes = new List<HRecipe>();
            var recipeRowConverter = new RecipeRowConverter(new Ingredient[0]);

            foreach (var cocktailPage in CocktailPages)
            {
                var recipe = parser.Parse(new Uri(RootUrl + cocktailPage));
                recipes.AddRange(recipe);
            }

            RemoveExistingCocktails(recipes);

            var cocktails = recipes.Select(recipe => new Cocktail
            {
                Instructions = recipe.Instructions,
                Name = recipe.Name,
                RecipeRows = recipeRowConverter.Convert(recipe.Ingredients.ToList()).Values,
                WikipediaArticleUri = recipe.Uri.AbsoluteUri
            }).ToList();

            _context.Cocktails.AddRange(cocktails);
            _context.SaveChanges();
        }

        private void RemoveExistingCocktails(List<HRecipe> recipes)
        {
            var namesOfExistingCocktails = _context.Cocktails.Select(c => c.Name);
            recipes.RemoveAll(c => namesOfExistingCocktails.Contains(c.Name));
        }

    }
}