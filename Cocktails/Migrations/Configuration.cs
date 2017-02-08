namespace Cocktails.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<Cocktails.Database.CocktailsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Cocktails.Database.CocktailsContext context)
        {}
    }
}
