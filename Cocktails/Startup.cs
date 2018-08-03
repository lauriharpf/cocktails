using System.Collections.Generic;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.WebApi;
using Cocktails.App_Start;
using Cocktails.BackgroundJobs;
using Cocktails.Database;
using Hangfire;
using Hangfire.Dashboard;
using Owin;
using IAuthorizationFilter = Hangfire.Dashboard.IAuthorizationFilter;

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

            GlobalConfiguration.Configuration.UseSqlServerStorage("CocktailsContext");
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                AuthorizationFilters = GetAuthorizationFilters()
            });
            
            app.UseHangfireServer();

            RecurringJob.RemoveIfExists("GetRecipesFromWikipedia.Get");
        }

        private static void RegisterDependencies()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<CocktailsContext>();
            builder.RegisterType<AzureImageUploader>().AsImplementedInterfaces();
            builder.RegisterType<GetRecipesFromWikipedia>();

            var container = builder.Build();
            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.UseAutofacActivator(container);
        }

        private static IEnumerable<IAuthorizationFilter> GetAuthorizationFilters()
        {
            var filters = new IAuthorizationFilter[]
            {
                new LocalRequestsOnlyAuthorizationFilter(),
                new BasicAuthAuthorizationFilter(new BasicAuthAuthorizationFilterOptions
                {
                    RequireSsl = true,
                    LoginCaseSensitive = true,
                    SslRedirect = true,
                    Users = new[]
                    {
                        new BasicAuthAuthorizationUser
                        {
                            Login = "HangfireAdmin",
                            // Password as SHA1 hash
                            Password =
                                new byte[]
                                {
                                    0x14, 0x21, 0x57, 0x72, 0xd4, 0x5a, 0xb1, 0x0f, 0x55, 0x6d, 0x2a, 0x5a, 0xfa, 0x46,
                                    0x44, 0x12, 0xc7, 0x47, 0xf2, 0x1d
                                }
                        }
                    }
                })
            };

            return new IAuthorizationFilter[]
            {
                new OrAuthorizationFilter(filters)
            };
        }
    }
}