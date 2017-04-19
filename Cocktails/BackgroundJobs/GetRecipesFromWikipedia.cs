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

        private static bool IsManuallyTriggered()
        {
            return DateTime.UtcNow.Day > 2 || DateTime.UtcNow.Month > 1;
        }

        public void Get(IEnumerable<string> pagesToGet)
        {
            if (!IsManuallyTriggered())
            {
                return;                
            }

            var parser = new HRecipeParser();
            var recipes = new List<HRecipe>();

            foreach (var cocktailPage in pagesToGet)
            {
                var recipe = parser.Parse(new Uri(RootUrl + cocktailPage));
                recipes.AddRange(recipe);
            }

            var imageUploader = new AzureImageUploader();
            RemoveExistingCocktails(imageUploader);

            var cocktails = new List<Cocktail>();
            var recipeRowConverter = new RecipeRowConverter(_context.Ingredients);

            foreach (var recipe in recipes)
            {
                var imageName = recipe.Image != null ? imageUploader.Upload(recipe.Image).ToString() : null;

                cocktails.Add(new Cocktail
                {
                    Instructions = recipe.Instructions,
                    Name = recipe.Name,
                    RecipeRows = recipeRowConverter.Convert(recipe.Ingredients.ToList()).Values,
                    WikipediaArticleUri = recipe.Uri.AbsoluteUri,
                    Image = imageName
                });
            }

            _context.Cocktails.AddRange(cocktails);
            _context.SaveChanges();
        }

        private void RemoveExistingCocktails(AzureImageUploader imageUploader)
        {
            _context.Cocktails.RemoveRange(_context.Cocktails);
            _context.Ingredients.RemoveRange(_context.Ingredients);
            _context.SaveChanges();

            imageUploader.ClearContainer();
        }
    }
}