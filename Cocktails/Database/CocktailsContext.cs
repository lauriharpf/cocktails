using Microsoft.EntityFrameworkCore;
using Cocktails.Models;

namespace Cocktails.Database
{
    public class CocktailsContext : DbContext
    {
        public CocktailsContext(DbContextOptions<CocktailsContext> options) : base(options)
        { }

        public DbSet<Cocktail> Cocktails { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
    }
}