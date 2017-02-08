using System;
using System.Collections.Generic;

namespace Cocktails.BackgroundJobs.RecipeParser
{
    public class HRecipe
    {
        public string Name { get; set; }
        public Uri Uri { get; set; }
        public IEnumerable<string> Ingredients { get; set; }
        public string Instructions { get; set; }
    }
}