using System;
using System.Configuration;
using Cocktails.BackgroundJobs.RecipeParser;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Cocktails.BackgroundJobs
{
    public class AzureImageUploader
    {
        private const string ContainerName = "images";

        public void ClearContainer()
        {
            var container = GetContainer();
            container.DeleteIfExists();
            container.Create();
            container.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
        }

        public Guid Upload(Image image)
        {            
            var container = GetContainer();
            var imageName = Guid.NewGuid();
            var blob = container.GetBlockBlobReference(imageName.ToString());
            blob.UploadFromByteArray(image.Content, 0, image.Content.Length);
            blob.Properties.ContentType = image.ContentType;

            return imageName;
        }

        public Uri GetAzureStorageUri()
        {
            return GetContainer().Uri;
        }

        private CloudBlobContainer GetContainer()
        {
            var storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
            var blobClient = storageAccount.CreateCloudBlobClient();
            return blobClient.GetContainerReference(ContainerName);
        }
    }
}