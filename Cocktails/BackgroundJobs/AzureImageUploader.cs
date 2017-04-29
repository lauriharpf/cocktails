using System;
using System.Configuration;
using Cocktails.BackgroundJobs.RecipeParser;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Cocktails.BackgroundJobs
{
    public interface IAzureImageUploader
    {
        void ClearContainer();
        Guid Upload(Image image);
        Uri GetAzureStorageUri();
    }

    public class AzureImageUploader : IAzureImageUploader
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

        private static CloudBlobContainer GetContainer()
        {
            var storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
            var blobClient = storageAccount.CreateCloudBlobClient();
            return blobClient.GetContainerReference(ContainerName);
        }
    }
}