using System.Collections.Generic;
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
            return context.Cocktails.ToList();
        }
    }
}
