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

        private HRecipe Parse(HtmlNode hrecipeNode, Uri uri)
        {
            var children = hrecipeNode.Descendants().ToList();
            var name = children.FirstOrDefault(n => n.HasClass("fn"));
            var ingredients = children.Where(n => n.HasClass("ingredient")).SelectMany(i => i.Descendants("li"));
            var instructions = children.FirstOrDefault(n => n.InnerText == "Preparation")?.NextSibling?.NextSibling?.InnerText;

            var imageUriString = 
                children.Where(i => i.Name == "tr")
                    .Skip(1)
                    .FirstOrDefault()?.Descendants()
                    .FirstOrDefault(n => n.Name == "img")?
                    .Attributes.FirstOrDefault(a => a.Name == "src")?.Value;

            var image = imageUriString == null ? null : DownloadImage(new Uri("https:" + imageUriString));

            return new HRecipe
            {
                Name = name?.InnerText,
                Ingredients = new List<string>(ingredients.Select(i => i.InnerText)),
                Instructions = instructions,
                Uri = uri,
                Image = image
            };
        }

        private Image DownloadImage(Uri imageUri)
        {
            var imageContent = _client.DownloadData(imageUri);
            var headers = _client.ResponseHeaders;

            return new Image
            {
                Content = imageContent,
                ContentType = headers.Get("Content-Type")
            };
        }
    }
}