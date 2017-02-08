namespace Cocktails.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddWikipediaURL : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cocktail", "WikipediaArticleUri", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Cocktail", "WikipediaArticleUri");
        }
    }
}
