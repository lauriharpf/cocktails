using System.Reflection;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.WebApi;
using Cocktails.App_Start;
using Cocktails.Database;
using Owin;

namespace Cocktails
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            System.Web.Http.GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            RegisterDependencies();
        }

        private static void RegisterDependencies()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<CocktailsContext>();

            var container = builder.Build();
            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }       
    }
}