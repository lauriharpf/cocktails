using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using Cocktails.Database;
using Cocktails.Models;

namespace Cocktails.Controllers
{
    public class CocktailsController : ApiController
    {
        public IEnumerable<Cocktail> Get()
        {
            var context = new CocktailsContext();
            return context.Cocktails.Include(c => c.RecipeRows.Select(r => r.Ingredient)).ToList();
        }
    }
}
