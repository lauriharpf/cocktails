using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Cocktails.BackgroundJobs;

namespace Cocktails.Controllers
{
    public class ConfigurationController : ApiController
    {
        public Uri Get()
        {
            return new AzureImageUploader().GetAzureStorageUri();
        }
    }
}