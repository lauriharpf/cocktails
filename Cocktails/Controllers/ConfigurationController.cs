using System;
using System.Web.Http;
using Cocktails.BackgroundJobs;

namespace Cocktails.Controllers
{
    public class ConfigurationController : ApiController
    {
        private readonly IAzureImageUploader _azureImageUploader;

        public ConfigurationController(IAzureImageUploader azureImageUploader)
        {
            _azureImageUploader = azureImageUploader;
        }

        public Uri Get()
        {
            return _azureImageUploader.GetAzureStorageUri();
        }
    }
}