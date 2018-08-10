using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SGS.BusinessLogic;
using SGS.Dtos;
using SGS.Dtos.Common;
using SGS.Infrastructure;

namespace SGS.MvcWebApp.Controllers
{
    public class PersonalTecnicoController : Controller
    {
        #region Properties

        private SharedAdmin _sharedAdmin;
        private PersonalTecnicoAdmin _personalTecnicoAdmin;       

        #endregion

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);

            _sharedAdmin = new SharedAdmin();
            _personalTecnicoAdmin = new PersonalTecnicoAdmin();            

        }

        public ActionResult Index()
        {
            return View();

        }   

        public ActionResult GetDataListInit()
        {
            var response = new { PersonalTecnicoList = _personalTecnicoAdmin.GetPersonalTecnicoList() };

            return this.JsonNet(response);
        }

        public ActionResult GetDataEditInit()
        {
            var response = new
            {
                Provincias = _sharedAdmin.GetProvincias() ,
                Categorias = _sharedAdmin.GetCategorias(),
                Cargos = _sharedAdmin.GetCargos(),
            
            };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult GetPersonalTecnico(int personalTecnicoId)
        {
            var response = new { PersonalTecnico = _personalTecnicoAdmin.GetPersonalTecnicoById(personalTecnicoId) };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult CreatePersonalTecnico(PersonalTecnico personalTecnico)
        {
            var response =  new Result{ HasErrors = false, Messages = new List<string>() };

            try
            {
                _personalTecnicoAdmin.CreatePersonalTecnico(personalTecnico);
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
        public ActionResult UpdatePersonalTecnico(PersonalTecnico personalTecnico)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                _personalTecnicoAdmin.UpdatePersonalTecnico(personalTecnico);
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
                  
    }
}
