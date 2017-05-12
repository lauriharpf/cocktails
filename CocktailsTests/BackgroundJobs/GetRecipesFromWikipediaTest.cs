using System.Linq;
using Cocktails.BackgroundJobs;
using Cocktails.Database;
using Cocktails.Models;
using CocktailsTests.Models;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace CocktailsTests.BackgroundJobs
{
    [TestFixture]
    public class GetRecipesFromWikipediaTest
    {
        private GetRecipesFromWikipedia _getRecipes;
        private CocktailsContext _context;
        private Mock<IAzureImageUploader> _azureImageUploader;

        [SetUp]
        public void Setup()
        {
            _context = EffortSetup.EffortProviderFactory.FreshContext();
            _azureImageUploader = new Mock<IAzureImageUploader>();
            _getRecipes = new GetRecipesFromWikipedia(_context, _azureImageUploader.Object);
        }

        [Test]
        public void ReusesKnownIngredients()
        {
            // Both of these have gin; we should end up with only one instance of the "gin" ingredient
            _getRecipes.Get(new[] { "Angel_Face_(cocktail)", "Aviation_(cocktail)" });
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
        public void ParsesCasinoCocktail()
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
        public void ParsesCloverClubCocktail()
        {
            _getRecipes.Get(new[] { "Clover_Club_Cocktail" });

            var cloverClub = _context.Cocktails.Single();
            cloverClub.Image.Should().NotBeNullOrEmpty();
            cloverClub.RecipeRows.Count.Should().Be(4);
            cloverClub.HasOneRecipeRow(4.5M, Unit.Cl, "gin");
            cloverClub.HasOneRecipeRow(1.5M, Unit.Cl, "lemon juice");
            cloverClub.HasOneRecipeRow(1.5M, Unit.Cl, "raspberry syrup");
            cloverClub.HasOneRecipeRow(1M, Unit.Unspecified, "egg white");
        }

        [Test]
        public void ParsesBrandyAlexanderCocktail()
        {
            _getRecipes.Get(new [] { "Alexander_(cocktail)" });

            var brandyAlexander = _context.Cocktails.Single();
            brandyAlexander.Image.Should().NotBeNullOrEmpty();
            brandyAlexander.RecipeRows.Count.Should().Be(3);
            brandyAlexander.HasOneRecipeRow(3M, Unit.Cl, "cognac");
            brandyAlexander.HasOneRecipeRow(3M, Unit.Cl, "white crème de cacao");
            brandyAlexander.HasOneRecipeRow(3M, Unit.Cl, "light cream");
        }

        [Test]
        public void ParsesTomCollins()
        {
            _getRecipes.Get(new [] { "Tom_Collins" });

            var tomCollins = _context.Cocktails.Single();
            tomCollins.RecipeRows.Count.Should().Be(4);
            tomCollins.HasOneRecipeRow(4.5M, Unit.Cl, "old tom gin");
            tomCollins.HasOneRecipeRow(3M, Unit.Cl, "lemon juice");
            tomCollins.HasOneRecipeRow(1.5M, Unit.Cl, "sugar syrup");
            tomCollins.HasOneRecipeRow(6M, Unit.Cl, "carbonated water");
        }

        [Test]
        public void ParsesCaipirinha()
        {
            _getRecipes.Get(new[] { "Caipirinha" });

            var caipirinha = _context.Cocktails.Single();
            caipirinha.Image.Should().NotBeNullOrEmpty();
            caipirinha.RecipeRows.Count.Should().Be(3);
            caipirinha.HasOneRecipeRow(5M, Unit.Cl, "cacha\u00e7a");
            caipirinha.HasOneRecipeRow(0.5M, Unit.Item, "lime");
            caipirinha.HasOneRecipeRow(2M, Unit.Teaspoon, "sugar");
        }

        [Test]
        public void ParsesBramble()
        {
            _getRecipes.Get(new [] { "Bramble_(cocktail)" });

            var bramble = _context.Cocktails.Single();
            bramble.Image.Should().NotBeNullOrEmpty();
            bramble.RecipeRows.Count.Should().Be(4);
            bramble.HasOneRecipeRow(4M, Unit.Cl, "gin");
            bramble.HasOneRecipeRow(1.5M, Unit.Cl, "lemon juice");
            bramble.HasOneRecipeRow(1M, Unit.Cl, "simple syrup");
            bramble.HasOneRecipeRow(1.5M, Unit.Cl, "creme de mure");
        }

        [Test]
        public void ParsesWhiteRussian()
        {
            _getRecipes.Get(new [] { "White_Russian_(cocktail)" });

            var whiteRussian = _context.Cocktails.Single();
            whiteRussian.Image.Should().NotBeNullOrEmpty();
            whiteRussian.HasOneRecipeRow(5M, Unit.Cl, "vodka");
            whiteRussian.HasOneRecipeRow(2M, Unit.Cl, "coffee liqueur");
            whiteRussian.HasOneRecipeRow(3M, Unit.Cl, "cream");
        }

        [Test]
        public void ParsesGoldenCadillac()
        {
            _getRecipes.Get(new [] { "Golden_Cadillac" });

            var goldenCadillac = _context.Cocktails.Single();
            goldenCadillac.HasOneRecipeRow(2M, Unit.Cl, "galliano");
            goldenCadillac.HasOneRecipeRow(2M, Unit.Cl, "crème de cacao");
            goldenCadillac.HasOneRecipeRow(2M, Unit.Cl, "cream");
        }

        [Test]
        public void RemovesFootnotesFromInstructions()
        {
            _getRecipes.Get(new [] { "Long_Island_Iced_Tea" });

            var longIslandIcedTea = _context.Cocktails.Single();
            longIslandIcedTea.Instructions.Should().NotBeNullOrEmpty();
            longIslandIcedTea.Instructions.Should().NotContain("[").And.NotContain("]");
        }
    }
}
