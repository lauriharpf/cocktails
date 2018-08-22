using System.Collections.Generic;
using System.Linq;
using Cocktails.Database;
using Cocktails.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cocktails.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CocktailsController : ControllerBase
    {
        private readonly CocktailsContext _context;

        public CocktailsController(CocktailsContext context)
        {
            _context = context;
        }
       
        [HttpGet]
        public IEnumerable<Cocktail> Get()
        {
            return _context.Cocktails.Include(c => c.RecipeRows).ThenInclude(r => r.Ingredient).OrderBy(c => c.Name).ToList();
        }
    }
}
