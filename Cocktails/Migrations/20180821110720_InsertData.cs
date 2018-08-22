using Cocktails.Properties;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cocktails.Migrations
{
    public partial class InsertData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {            
            migrationBuilder.Sql(Resources._201808200656426_dbo_Cocktail_data);
            migrationBuilder.Sql(Resources._201808200656426_dbo_Ingredient_data);
            migrationBuilder.Sql(Resources._201808200656426_dbo_RecipeRow_data);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
