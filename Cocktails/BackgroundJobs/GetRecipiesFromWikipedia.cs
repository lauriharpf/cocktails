using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using Cocktails.BackgroundJobs.RecipeParser;
using Cocktails.Database;
using Cocktails.Models;

namespace Cocktails.BackgroundJobs
{
    public class GetRecipiesFromWikipedia
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
            var recipies = new List<HRecipe>();
            var recipeRowConverter = new RecipeRowConverter(new Ingredient[0]);

            foreach (var cocktailPage in CocktailPages)
            {
                var recipe = parser.Parse(new Uri(RootUrl + cocktailPage));
                recipies.AddRange(recipe);
            }

            RemoveExistingCocktails(recipies);

            var cocktails = recipies.Select(recipe => new Cocktail
            {
                Instructions = recipe.Instructions,
                Name = recipe.Name,
                RecipeRows = recipeRowConverter.Convert(recipe.Ingredients.ToList()).Values,
                WikipediaArticleUri = recipe.Uri.AbsoluteUri
            }).ToList();

            _context.Cocktails.AddRange(cocktails);
            _context.SaveChanges();
        }

        private void RemoveExistingCocktails(List<HRecipe> recipies)
        {
            var namesOfExistingCocktails = _context.Cocktails.Select(c => c.Name);
            recipies.RemoveAll(c => namesOfExistingCocktails.Contains(c.Name));
        }

    }
}