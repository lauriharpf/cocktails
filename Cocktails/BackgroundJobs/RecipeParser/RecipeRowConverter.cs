using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Cocktails.Models;

namespace Cocktails.BackgroundJobs.RecipeParser
{
    public class RecipeRowConverter
    {
        private readonly IList<Ingredient> _knownIngredients;
        private static readonly Regex AmountRegex = new Regex(@"^(\d\.*\d*)");
        private static readonly IDictionary<string, Unit> StringToUnit = BuildUnitConversionTable();

        private static IDictionary<string, Unit> BuildUnitConversionTable()
        {
            var stringToUnit = new Dictionary<string, Unit>();
           
            foreach (var value in (Unit[])Enum.GetValues(typeof(Unit)))
            {
                stringToUnit[value.ToString().ToLower()] = value;
                stringToUnit[value.PluralForm().ToLower()] = value;
            }

            return stringToUnit;
        }

        public RecipeRowConverter(IEnumerable<Ingredient> knownIngredients)
        {
            _knownIngredients = new List<Ingredient>(knownIngredients);
        }

        public IDictionary<string, RecipeRow> Convert(ICollection<string> foundIngredientsWithAmounts)
        {
            var newIngredients = new Dictionary<string, RecipeRow>();
            
            foreach (var ingredientWithAmount in foundIngredientsWithAmounts)
            {
                newIngredients.Add(ingredientWithAmount, Parse(ingredientWithAmount));
            }

            return newIngredients;
        }        

        private RecipeRow Parse(string foundIngredientWithAmount)
        {
            foundIngredientWithAmount = foundIngredientWithAmount.ToLower();
            var ingredientParts = foundIngredientWithAmount.Split(' ');
            var recipeRow = new RecipeRow
            {
                Amount = ParseAmount(foundIngredientWithAmount),
                Unit = ParseUnit(ingredientParts),
                Ingredient = ParseIngredient(ingredientParts)
            };
            
            return recipeRow;
        }

        private decimal ParseAmount(string foundIngredientWithAmount)
        {
            var matches = AmountRegex.Matches(foundIngredientWithAmount);
            var amount = matches.Cast<Match>().Select(m => m.Groups[1].Value).SingleOrDefault();
            return amount != null ? decimal.Parse(amount, NumberStyles.AllowDecimalPoint, new CultureInfo("en-US")) : 0;
        }

        private Unit ParseUnit(IEnumerable<string> ingredientParts)
        {
            var unit = StringToUnit.FirstOrDefault(u => ingredientParts.Any(p => p.Contains(u.Key)));
            return unit.Equals(default(KeyValuePair<string, Unit>)) ? Unit.Unspecified : unit.Value;
        }

        private Ingredient ParseIngredient(IEnumerable<string> ingredientParts)
        {
            var reversedParts = ingredientParts.Reverse().Where(p => !p.Contains(')') && !p.Contains('(') && p != "fresh");
            var builder = new StringBuilder();
            foreach (var part in reversedParts)
            {
                if (part.Length < 3 || StringToUnit.Keys.Any(k => part.Contains(k)))
                {
                    break;
                }

                builder.Insert(0, " " + part);
            }

            var ingredientName = builder.ToString().TrimStart().ToLower();
            var existingIngredient = _knownIngredients.FirstOrDefault(a => a.Name == ingredientName);

            if (existingIngredient != null)
            {
                return existingIngredient;
            }

            var newIngredient = new Ingredient {Name = ingredientName};
            _knownIngredients.Add(newIngredient);
            return newIngredient;
        }
    }
}