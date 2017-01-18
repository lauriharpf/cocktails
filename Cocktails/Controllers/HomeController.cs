using System.Web.Mvc;

namespace Cocktails.Controllers
{
    public class HomeController : Controller
    {
        [OutputCache(NoStore = true, Duration = 0)]
        public ActionResult Index()
        {
            return View();
        }
    }
}
