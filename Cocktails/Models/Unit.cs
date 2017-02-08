namespace Cocktails.Models
{
    public enum Unit
    {
        Cl, Teaspoon, Item, Unspecified, Dash
    }

    public static class UnitExtensions
    {
        public static string PluralForm(this Unit value)
        {
            var suffix = "";

            switch (value)
            {
                case Unit.Cl:
                case Unit.Teaspoon:
                case Unit.Item:
                    suffix = "s";
                    break;                    
                case Unit.Dash:
                    suffix = "es";
                    break;
            }

            return value + suffix;
        }
    }
}