using System;
using System.Collections.Generic;
using System.Linq;
using Cocktails.BackgroundJobs.RecipeParser;
using Cocktails.Models;
using FluentAssertions;
using NUnit.Framework;

namespace CocktailsTests.BackgroundJobs.RecipeParser
{
    [TestFixture]
    public class RecipeRowConverterTest
    {
        [TestCase("4.5 cl (3 parts) Vodka", 4.5, Unit.Cl, "vodka")]
        [TestCase("9 cl (6 parts) Tomato juice", 9, Unit.Cl, "tomato juice")]
        [TestCase("1.5 cl (1 part) Lemon juice", 1.5, Unit.Cl, "lemon juice")]
        [TestCase("2 to 3 dashes of Worcestershire Sauce", 2, Unit.Dash, "worcestershire sauce")]
        [TestCase("Tabasco", 0, Unit.Unspecified, "tabasco")]
        [TestCase("Celery salt", 0, Unit.Unspecified, "celery salt")]
        [TestCase("2 teaspoons Sugar", 2, Unit.Teaspoon, "sugar")]
        public void ConvertsIngredientsWithAmountsToRecipeRows(string foundIngredientWithAmount, 
            double expectedAmount, Unit expectedUnit, string expectedIngredientName)
        {
            var results = new RecipeRowConverter(new List<Ingredient>()).Convert(new[] { foundIngredientWithAmount });
            var result = results.Single();

            result.Key.Should().Be(foundIngredientWithAmount);

            var actualRecipeRow = result.Value;
            actualRecipeRow.Should().NotBeNull();

            actualRecipeRow.Amount.Should().Be((decimal)expectedAmount);
            actualRecipeRow.Unit.Should().Be(expectedUnit);

            var actualIngredient = actualRecipeRow.Ingredient;
            actualIngredient.Should().NotBeNull();
            actualIngredient.Name.Should().Be(expectedIngredientName);
        }        
    }
}
