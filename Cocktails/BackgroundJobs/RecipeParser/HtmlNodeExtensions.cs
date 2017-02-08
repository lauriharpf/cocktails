using HtmlAgilityPack;

namespace Cocktails.BackgroundJobs.RecipeParser
{
    public static class HtmlNodeExtensions
    {
        public static bool HasClass(this HtmlNode node, string className)
        {
            return node != null && node.GetAttributeValue("class", "").Contains(className);
        }
    }
}