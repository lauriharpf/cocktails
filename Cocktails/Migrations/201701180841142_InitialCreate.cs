namespace Cocktails.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cocktail",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Instructions = c.String(),
                        Image = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.RecipeRow",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CocktailID = c.Int(nullable: false),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Unit = c.Int(nullable: false),
                        Ingredient_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Ingredient", t => t.Ingredient_ID)
                .ForeignKey("dbo.Cocktail", t => t.CocktailID, cascadeDelete: true)
                .Index(t => t.CocktailID)
                .Index(t => t.Ingredient_ID);
            
            CreateTable(
                "dbo.Ingredient",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RecipeRow", "CocktailID", "dbo.Cocktail");
            DropForeignKey("dbo.RecipeRow", "Ingredient_ID", "dbo.Ingredient");
            DropIndex("dbo.RecipeRow", new[] { "Ingredient_ID" });
            DropIndex("dbo.RecipeRow", new[] { "CocktailID" });
            DropTable("dbo.Ingredient");
            DropTable("dbo.RecipeRow");
            DropTable("dbo.Cocktail");
        }
    }
}
