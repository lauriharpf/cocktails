namespace Cocktails.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class DeleteHardcodedData : DbMigration
    {
        public override void Up()
        {            
            Sql("DELETE FROM dbo.Cocktail");
            Sql("DELETE FROM dbo.Ingredient");
        }
        
        public override void Down()
        {}
    }
}
