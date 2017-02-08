using System.Data.Common;
using System.Data.Entity.Infrastructure;
using Cocktails.Database;

namespace CocktailsTests.EffortSetup
{
    public class EffortProviderFactory : IDbConnectionFactory
    {
        private static DbConnection _connection;
        private static readonly object _lock = new object();

        public static CocktailsContext FreshContext()
        {
            ResetDb();
            return new CocktailsContext();
        }

        public static void ResetDb()
        {
            lock (_lock)
            {
                _connection = null;
            }
        }

        public DbConnection CreateConnection(string nameOrConnectionString)
        {
            lock (_lock)
            {
                return _connection ?? (_connection = Effort.DbConnectionFactory.CreateTransient());
            }
        }
    }
}
