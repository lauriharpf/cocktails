namespace Cocktails.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeleteDuplicates : DbMigration
    {
        public override void Up()
        {   // Due to duplicate URLs in Cocktails.BackgroundJobs.Wikipedia, three duplicates 
            // (Dry Martini, The Godfather and The Godmother) ended up in the DB. Remove them.
            Sql("DELETE FROM Cocktail WHERE ID NOT IN (SELECT MIN(Id) FROM Cocktail GROUP BY Name)");
        }
        
        public override void Down()
        {
        }
    }
}
