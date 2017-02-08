using System;
using System.Collections.Generic;

namespace Cocktails.Models
{
    public class Cocktail
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<RecipeRow> RecipeRows { get; set; }
        public string Instructions { get; set; }
        public string Image { get; set; }
        public string WikipediaArticleUri { get; set; }

        public override string ToString()
        {
            return $"ID: {ID}, Name: {Name}";
        }
    }
}