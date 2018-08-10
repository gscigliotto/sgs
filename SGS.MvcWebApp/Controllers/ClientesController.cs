using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SGS.BusinessLogic;
using SGS.Dtos;
using SGS.Dtos.Common;
using SGS.Infrastructure;

namespace SGS.MvcWebApp.Controllers
{
    public class ClientesController : Controller
    {
        #region Properties

        private SharedAdmin _sharedAdmin;
        private ClientesAdmin _clientesAdmin;       

        #endregion

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);

            _sharedAdmin = new SharedAdmin();
            _clientesAdmin = new ClientesAdmin();            

        }

        public ActionResult Index()
        {
            return View();

        }   

        public ActionResult GetDataListInit()
        {
            var response = new { Clientes = _clientesAdmin.GetClientes() };

            return this.JsonNet(response);
        }

        public ActionResult GetDataEditInit()
        {
            var response = new
            {                            
            };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult GetCliente(int clienteId)
        {
            var response = new { Cliente = _clientesAdmin.GetClienteById(clienteId) };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult CreateCliente(Cliente cliente)
        {
            var response =  new Result{ HasErrors = false, Messages = new List<string>() };

            try
            {
                _clientesAdmin.CreateCliente(cliente);
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
        public ActionResult UpdateCliente(Cliente cliente)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                _clientesAdmin.UpdateCliente(cliente);
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
