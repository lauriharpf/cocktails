using Cocktails.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Cocktails
{
    public static class MigrationsRunner
    {
        public static void RunMigrations(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<CocktailsContext>();
                context.Database.Migrate();
            }                        
        }
    }
}
