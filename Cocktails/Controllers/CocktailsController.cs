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
        private readonly CocktailsContext _context;

        public CocktailsController(CocktailsContext context)
        {
            _context = context;
        }

        public IEnumerable<Cocktail> Get()
        {
            return _context.Cocktails.Include(c => c.RecipeRows.Select(r => r.Ingredient)).OrderBy(c => c.Name).ToList();
        }
    }
}
