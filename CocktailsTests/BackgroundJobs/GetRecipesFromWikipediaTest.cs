using System.Linq;
using Cocktails.BackgroundJobs;
using Cocktails.Database;
using Cocktails.Models;
using CocktailsTests.Models;
using FluentAssertions;
using NUnit.Framework;

namespace CocktailsTests.BackgroundJobs
{
    [TestFixture]
    public class GetRecipesFromWikipediaTest
    {
        private GetRecipesFromWikipedia _getRecipes;
        private CocktailsContext _context;

        [SetUp]
        public void Setup()
        {
            _context = EffortSetup.EffortProviderFactory.FreshContext();
            _getRecipes = new GetRecipesFromWikipedia(_context);
        }

        [Test]
        public void ReusesKnownIngredients()
        {
            // Both of these have gin; we should end up with only one instance of the "gin" ingredient
            _getRecipes.Get(new[] { "Angel_Face_(cocktail)" });
            _getRecipes.Get(new[] { "Aviation_(cocktail)" });
            HasExpectedIngredients();
        }

        private void HasExpectedIngredients()
        {
            var allIngredients = _context.Ingredients.ToList();
            allIngredients.Count.Should().Be(5);
            allIngredients.Count(c => c.Name == "gin").Should().Be(1);
            allIngredients.Count(c => c.Name == "apricot brandy").Should().Be(1);
            allIngredients.Count(c => c.Name == "calvados").Should().Be(1);
            allIngredients.Count(c => c.Name == "lemon juice").Should().Be(1);
            allIngredients.Count(c => c.Name == "maraschino liqueur").Should().Be(1);
        }

        [Test]
        public void ParsesCasinoCocktailCorrectly()
        {
            _getRecipes.Get(new[] { "Casino_(cocktail)" });

            var casino = _context.Cocktails.Single();
            casino.RecipeRows.Count.Should().Be(4);
            casino.HasOneRecipeRow(4M, Unit.Cl, "gin");         // Ensure unnecessary "(Old Tom)" was removed
            casino.HasOneRecipeRow(1M, Unit.Cl, "maraschino");
            casino.HasOneRecipeRow(1M, Unit.Cl, "orange bitters");
            casino.HasOneRecipeRow(1M, Unit.Cl, "lemon juice"); // Ensure unnecessary "fresh" was removed
        }

        [Test]
        public void ParsesCloverClubCocktailCorrectly()
        {
            _getRecipes.Get(new[] { "Clover_Club_Cocktail" });

            var cloverClub = _context.Cocktails.Single();
            cloverClub.RecipeRows.Count.Should().Be(4);
            cloverClub.HasOneRecipeRow(4.5M, Unit.Cl, "gin");
            cloverClub.HasOneRecipeRow(1.5M, Unit.Cl, "lemon juice");
            cloverClub.HasOneRecipeRow(1.5M, Unit.Cl, "raspberry syrup");
            cloverClub.HasOneRecipeRow(1M, Unit.Unspecified, "egg white");
        }
        
    }
}
