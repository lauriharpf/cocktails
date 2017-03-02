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
        private const string RootUrl = "https://en.wikipedia.org/wiki/";

        private readonly CocktailsContext _context;

        public GetRecipesFromWikipedia() : this(new CocktailsContext()) { }

        public GetRecipesFromWikipedia(CocktailsContext context)
        {
            _context = context;
        }

        public void Get(IEnumerable<string> pagesToGet)
        {
            var parser = new HRecipeParser();
            var recipes = new List<HRecipe>();
            var recipeRowConverter = new RecipeRowConverter(_context.Ingredients);

            foreach (var cocktailPage in pagesToGet)
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