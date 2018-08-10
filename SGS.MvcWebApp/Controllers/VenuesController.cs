using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SGS.BusinessLogic;
using SGS.Dtos;
using SGS.Dtos.Common;
using SGS.Infrastructure;
using SGS.MvcWebApp.Models;

namespace SGS.MvcWebApp.Controllers
{
    public class VenuesController : Controller
    {
        #region Properties

        private SharedAdmin _sharedAdmin;
        private VenuesAdmin _venuesAdmin;
           
        #endregion

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);

            _sharedAdmin = new SharedAdmin();
            _venuesAdmin = new VenuesAdmin();            
        }

        public ActionResult Index()
        {
            CleanVenueFiles();
             
            return View();
        }       

        public ActionResult GetDataListInit()
        {
            var response = new { Venues = _venuesAdmin.GetVenues() };

            return this.JsonNet(response);
        }

        public ActionResult GetDataEditInit(int? venueId)
        {
            var response = new
            {
                TipoEstablecimientoList = _sharedAdmin.GetTipoEstablecimientoList(),
                Files = _venuesAdmin.GetFiles(venueId)
            };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult GetVenue(int venueId)
        {
            var response = new { Venue = _venuesAdmin.GetVenueById(venueId) };

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult CreateVenue(Venue venue)
        {
            var response =  new Result{ HasErrors = false, Messages = new List<string>() };

            try
            {
                _venuesAdmin.CreateVenue(venue, SGSSession.Current.VenueFiles);
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

            CleanVenueFiles();

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult UpdateVenue(Venue venue)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                _venuesAdmin.UpdateVenue(venue, SGSSession.Current.VenueFiles);
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

            CleanVenueFiles();

            return this.JsonNet(response);
        }

        [HttpPost]
        public ActionResult UploadInfoTecnicaFile(int? venueId)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };
          
            try
            {
                var current = SGSSession.Current.VenueFiles.InfoTecnicaFiles.SingleOrDefault(f => string.Equals(f.FileName, Request.Files[0].FileName));

                if (current != null || (venueId.HasValue & _venuesAdmin.InfoTecnicaFileExists(venueId, Request.Files[0].FileName)))
                    throw new ValidationException("Ya existe otro archivo con el mismo nombre");

                SGSSession.Current.VenueFiles.InfoTecnicaFiles.Add(Request.Files[0]);
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
        public ActionResult RemoveInfoTecnicaFile(string fileName, int? venueId)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                var current = SGSSession.Current.VenueFiles.InfoTecnicaFiles.SingleOrDefault(f => string.Equals(f.FileName, fileName));

                if (current != null)
                    SGSSession.Current.VenueFiles.InfoTecnicaFiles.Remove(current);
                else if (venueId.HasValue)
                {
                    _venuesAdmin.RemoveInfoTecnicaFile(fileName, venueId);
                }
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
        public ActionResult UploadInfoMecanicaFile(int? venueId)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                var current = SGSSession.Current.VenueFiles.InfoMecanicaFiles.SingleOrDefault(f => string.Equals(f.FileName, Request.Files[0].FileName));

                if (current != null || (venueId.HasValue & _venuesAdmin.InfoMecanicaFileExists(venueId, Request.Files[0].FileName)))
                    throw new ValidationException("Ya existe otro archivo con el mismo nombre");

                SGSSession.Current.VenueFiles.InfoMecanicaFiles.Add(Request.Files[0]);
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
        public ActionResult RemoveInfoMecanicaFile(string fileName, int? venueId)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                var current = SGSSession.Current.VenueFiles.InfoMecanicaFiles.SingleOrDefault(f => string.Equals(f.FileName, fileName));

                if (current != null)
                    SGSSession.Current.VenueFiles.InfoMecanicaFiles.Remove(current);
                else if (venueId.HasValue)
                {
                    _venuesAdmin.RemoveInfoMecanicaFile(fileName, venueId);
                }
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
        public ActionResult UploadInfoElectricaFile(int? venueId)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                var current = SGSSession.Current.VenueFiles.InfoElectricaFiles.SingleOrDefault(f => string.Equals(f.FileName, Request.Files[0].FileName));

                if (current != null || (venueId.HasValue & _venuesAdmin.InfoElectricaFileExists(venueId, Request.Files[0].FileName)))
                    throw new ValidationException("Ya existe otro archivo con el mismo nombre");

                SGSSession.Current.VenueFiles.InfoElectricaFiles.Add(Request.Files[0]);
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
        public ActionResult RemoveInfoElectricaFile(string fileName, int? venueId)
        {
            var response = new Result { HasErrors = false, Messages = new List<string>() };

            try
            {
                var current = SGSSession.Current.VenueFiles.InfoElectricaFiles.SingleOrDefault(f => string.Equals(f.FileName, fileName));

                if (current != null)
                    SGSSession.Current.VenueFiles.InfoElectricaFiles.Remove(current);
                else if (venueId.HasValue)
                {
                    _venuesAdmin.RemoveInfoElectricaFile(fileName, venueId);
                }
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

      

        private void CleanVenueFiles()
        {
            SGSSession.Current.VenueFiles = new VenueFiles
            {
                InfoElectricaFiles = new List<HttpPostedFileBase>(),
                InfoMecanicaFiles = new List<HttpPostedFileBase>(),
                InfoTecnicaFiles = new List<HttpPostedFileBase>()
            };
        }   
    }

}
