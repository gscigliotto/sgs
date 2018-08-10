using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SGS.BusinessLogic;
using SGS.Dtos;
using SGS.Dtos.Common;
using SGS.Infrastructure;

namespace SGS.MvcWebApp.Controllers
{
    public class SecurityController : Controller
    {
        #region Properties

        private SecurityAdmin _securityAdmin;       

        #endregion

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);

            _securityAdmin = new SecurityAdmin();            

        }

        #region Roles

        public ActionResult Roles()
        {
            return View();
        }

        public ActionResult GetRoles()
        {
            var response = new {Roles = _securityAdmin.GetRoles()};

            return this.JsonNet(response);

        }

        #endregion

        #region Usuarios

        public ActionResult Usuarios()
        {
            return View();
        }

        public ActionResult GetDataListInit()
        {
            var response = new { Usuarios = _securityAdmin.GetUsuarios() };

            return this.JsonNet(response);
        }

        public ActionResult GetDataEditInit()
        {
            var response = new { Roles = _securityAdmin.GetRoles() };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult GetUsuario(int usuarioId)
        {
            var response = new { Usuario = _securityAdmin.GetUsuarioById(usuarioId) };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult CreateUsuario(Usuario usuario)
        {
            var response =  new Result{ HasErrors = false, Messages = new List<string>() };

            try
            {
                _securityAdmin.CreateUsuario(usuario);
            }
            catch (ValidationException exception)
            {
                response.HasErrors = true;
                response.Messages.Add(exception.Message);
            }
            catch (Exception ex)
            {
                response.HasErrors = true;
                response.Messages.Add(ex.Message);
            }

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult UpdateUsuario(Usuario usuario)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                _securityAdmin.UpdateUsuario(usuario);
            }
            catch (ValidationException exception)
            {
                response.HasErrors = true;
                response.Messages.Add(exception.Message);
            }
            catch (Exception ex)
            {
                response.HasErrors = true;
                response.Messages.Add(ex.Message);
            }

            return this.JsonNet(response);
        }

        #endregion

        public ActionResult Index()
        {
            return View();

        }       
    }
}
