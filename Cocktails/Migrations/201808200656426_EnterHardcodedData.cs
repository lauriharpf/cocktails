namespace Cocktails.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EnterHardcodedData : DbMigration
    {
        public override void Up()
        {
            // Delete all existing data
            Sql("DELETE FROM dbo.RecipeRow");
            Sql("DELETE FROM dbo.Cocktail");
            Sql("DELETE FROM dbo.Ingredient");
            // Add new, hardcoded data
            SqlFile("../Migrations/201808200656426_dbo.Cocktail.data.sql");
            SqlFile("../Migrations/201808200656426_dbo.Ingredient.data.sql");
            SqlFile("../Migrations/201808200656426_dbo.RecipeRow.data.sql");
        }
        
        public override void Down()
        {
        }
    }
}
