using System.Collections.Generic;
using Cocktails.BackgroundJobs;
using Hangfire;
using Hangfire.Dashboard;
using Owin;

namespace Cocktails
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configuration.UseSqlServerStorage("CocktailsContext");
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                AuthorizationFilters = GetAuthorizationFilters()
            });
            app.UseHangfireServer();

            RecurringJob.AddOrUpdate<GetRecipiesFromWikipedia>(g => g.Get(), Cron.Yearly);
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