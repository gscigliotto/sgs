using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SGS.BusinessLogic;
using SGS.Dtos;
using SGS.Dtos.Common;
using SGS.Infrastructure;

namespace SGS.MvcWebApp.Controllers
{
    public class CalendarioController : Controller
    {
        #region Properties

        private SharedAdmin _sharedAdmin;
        private TareasAdmin _tareasAdmin;
        private SecurityAdmin _securityAdmin;

        #endregion

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);

            _sharedAdmin = new SharedAdmin();
            _tareasAdmin = new TareasAdmin();
            _securityAdmin = new SecurityAdmin();

        }

        public ActionResult Index()
        {
            return View();

        }

        //public ActionResult GetDataListInit()
        //{
        //    var response = new { Tareas = _tareasAdmin.GetTareas() };

        //    return this.JsonNet(response);
        //}

        //public ActionResult GetDataEditInit()
        //{
        //    var response = new
        //    {
        //        Prioridades = _sharedAdmin.GetPrioridades(),
        //        EstadosTarea = _sharedAdmin.GetEstadosTarea(),
        //        Usuarios = _securityAdmin.GetUsuarios()
        //    };

        //    return this.JsonNet(response);
        //}       

        //[HttpPost]
        //public ActionResult GetTarea(int tareaId)
        //{
        //    var response = new { Tarea = _tareasAdmin.GetTareaById(tareaId) };

        //    return this.JsonNet(response);
        //}

        //[HttpPost]
        //public ActionResult CreateTarea(Tarea tarea)
        //{
        //    var response = new Result { HasErrors = false, Messages = new List<string>() };

        //    try
        //    {
        //        _tareasAdmin.CreateTarea(tarea);
        //    }
        //    catch (ValidationException exception)
        //    {
        //        response.HasErrors = true;
        //        response.Messages.Add(exception.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.HasErrors = true;
        //        response.Messages.Add(ex.Message);
        //    }

        //    return this.JsonNet(response);
        //}

        //[HttpPost]
        //public ActionResult UpdateTarea(Tarea tarea)
        //{
        //    var response = new Result { HasErrors = false, Messages = new List<string>() };

        //    try
        //    {
        //        _tareasAdmin.UpdateTarea(tarea);
        //    }
        //    catch (ValidationException exception)
        //    {
        //        response.HasErrors = true;
        //        response.Messages.Add(exception.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.HasErrors = true;
        //        response.Messages.Add(ex.Message);
        //    }

        //    return this.JsonNet(response);
        //}

    }
}
