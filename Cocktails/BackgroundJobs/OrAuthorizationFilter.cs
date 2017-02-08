using System.Collections.Generic;
using System.Linq;
using Hangfire.Dashboard;

namespace Cocktails.BackgroundJobs
{
    public class OrAuthorizationFilter : IAuthorizationFilter
    {
        private readonly IEnumerable<IAuthorizationFilter> _filters;

        public OrAuthorizationFilter(IEnumerable<IAuthorizationFilter> filters)
        {
            _filters = filters;
        }

        public bool Authorize(IDictionary<string, object> owinEnvironment)
        {
            return _filters.Any(authorizationFilter => authorizationFilter.Authorize(owinEnvironment));
        }
    }
}