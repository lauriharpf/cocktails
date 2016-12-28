using Microsoft.AspNetCore.Mvc;

namespace Cocktails.Controllers
{
    public class HomeController : Controller
    {
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Index()
        {
            return View();
        }
    }
}
