using System.Linq;
using Cocktails.Models;
using FluentAssertions;

namespace CocktailsTests.Models
{
    public static class CocktailExtensions
    {
        public static void HasOneRecipeRow(this Cocktail cocktail, decimal amount, Unit unit, string ingredientName)
        {
            cocktail.RecipeRows.Count(r => r.Amount == amount && r.Unit == unit && r.Ingredient.Name == ingredientName).Should().Be(1);
        }
    }
}
