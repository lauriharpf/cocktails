using System.Collections.Generic;
using System.Security.Policy;

namespace Cocktails.Models
{
    public class Cocktail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Ingredients { get; set; }
        public string Instructions { get; set; }
        public string Image { get; set; }
    }
}
