using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sportliga.Data;

namespace sportliga.api.Controllers
{
    public class HomeController : Controller
    {
        ReadOnlyRepository repo;
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }
    }
}
