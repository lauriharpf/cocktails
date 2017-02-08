using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using HtmlAgilityPack;

namespace Cocktails.BackgroundJobs.RecipeParser
{
    public class HRecipeParser
    {
        private readonly WebClient _client = new WebClient { Encoding = Encoding.UTF8 };

        public IEnumerable<HRecipe> Parse(Uri uri)
        {            
            var html = new HtmlDocument();
            html.LoadHtml(_client.DownloadString(uri));

            var hrecipeNodes = html.DocumentNode.Descendants().Where(n => n.HasClass("hrecipe"));
            return hrecipeNodes.Select(x => Parse(x, uri)).ToList();
        }

        private static HRecipe Parse(HtmlNode hrecipeNode, Uri uri)
        {
            var children = hrecipeNode.Descendants().ToList();
            var name = children.FirstOrDefault(n => n.HasClass("fn"));
            var ingredients = children.Where(n => n.HasClass("ingredient")).SelectMany(i => i.Descendants("li"));
            var instructions = children.FirstOrDefault(n => n.InnerText == "Preparation")?.NextSibling?.NextSibling?.InnerText;

            return new HRecipe
            {
                Name = name?.InnerText,
                Ingredients = new List<string>(ingredients.Select(i => i.InnerText)),
                Instructions = instructions,
                Uri = uri
            };
        }
    }
}