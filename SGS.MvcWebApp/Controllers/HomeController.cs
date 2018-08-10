using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using SGS.BusinessLogic;

namespace SGS.MvcWebApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        #region Properties
        
        private TareasAdmin _tareasAdmin;        

        #endregion

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            
            _tareasAdmin = new TareasAdmin();

        }
        public ActionResult Index()
        {
            return View(_tareasAdmin.GetTareaByUser(User.Identity.Name));
        }

        public ActionResult Index2()
        {
            return View();

        }
    }
}
