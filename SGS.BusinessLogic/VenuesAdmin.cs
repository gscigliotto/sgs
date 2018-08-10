using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Policy;
using System.Web;
using AutoMapper;
using SGS.Dtos;
using SGS.Dtos.Common;
using SGS.Entities;
using Venue = SGS.Entities.Venue;

namespace SGS.BusinessLogic
{
    public class VenuesAdmin: BaseAdmin
    {
        #region Properties

        private string InfoTecticaPath
        {
            get
            {
                return String.Format(@"{0}\Files\Venues\InfoTecnica", AppDomain.CurrentDomain.BaseDirectory);
            }
        }

        private string InfoElectricaPath
        {
            get
            {
                return String.Format(@"{0}\Files\Venues\InfoElectrica", AppDomain.CurrentDomain.BaseDirectory);
            }
        }

        private string InfoMecanicaPath
        {
            get
            {
                return String.Format(@"{0}\Files\Venues\InfoMecanica", AppDomain.CurrentDomain.BaseDirectory);
            }
        }

        #endregion

        public IList<Dtos.Venue> GetVenues()
        {
            var venues = SgsContext.Venues.ToList();

            return Mapper.Map<IList<Venue>, IList<Dtos.Venue>>(venues);
        }

        public Dtos.Venue GetVenueById(int venueId)
        {
            var venue = SgsContext.Venues.SingleOrDefault(v => v.Id == venueId);

            return Mapper.Map<Venue, Dtos.Venue>(venue);
        }

        public void CreateVenue(Dtos.Venue venueDto, VenueFiles venueFiles)
        {
            ValidateVenue(venueDto);
        
            var venue = new Venue
            {
                ContactoReferencia = venueDto.ContactoReferencia,
                CreateDate = DateTime.Now,
                Denominacion = venueDto.Denominacion,
                DireccionEntregaProveedores = venueDto.DireccionEntregaProveedores,
                DireccionPrincipal = venueDto.DireccionPrincipal,
                EmailContacto = venueDto.EmailContacto,
                EmailEmpresaSeguridad = venueDto.EmailEmpresaSeguridad,
                Enabled = true,
                Encomienda = venueDto.Encomienda,
                InformacionElectrica = venueDto.InformacionElectrica,
                InformacionMecanica = venueDto.InformacionMecanica,
                InformacionTecnica = venueDto.InformacionTecnica,
                TelefonoContacto = venueDto.TelefonoContacto,
                TipoEstablecimiento = (TipoEstablecimiento)Enum.Parse(typeof(TipoEstablecimiento), venueDto.TipoEstablecimiento, true)                
            };

            SgsContext.Venues.Add(venue);
            SgsContext.SaveChanges();

            Savefiles(venue.Id, venueFiles);
        }
        
        public void UpdateVenue(Dtos.Venue venueDto, VenueFiles venueFiles)
        {
            ValidateVenue(venueDto);

            var venue = SgsContext.Venues.Single(v => v.Id == venueDto.Id);

            venue.ContactoReferencia = venueDto.ContactoReferencia;
            venue.UpdateDate = DateTime.Now;
            venue.Denominacion = venueDto.Denominacion;
            venue.DireccionEntregaProveedores = venueDto.DireccionEntregaProveedores;
            venue.DireccionPrincipal = venueDto.DireccionPrincipal;
            venue.EmailContacto = venueDto.EmailContacto;
            venue.EmailEmpresaSeguridad = venueDto.EmailEmpresaSeguridad;
            venue.Enabled = true;
            venue.Encomienda = venueDto.Encomienda;
            venue.InformacionElectrica = venueDto.InformacionElectrica;
            venue.InformacionMecanica = venueDto.InformacionMecanica;
            venue.InformacionTecnica = venueDto.InformacionTecnica;
            venue.TelefonoContacto = venueDto.TelefonoContacto;
            venue.TipoEstablecimiento = (TipoEstablecimiento)Enum.Parse(typeof(TipoEstablecimiento), venueDto.TipoEstablecimiento, true);
           
            SgsContext.SaveChanges();

            Savefiles(venue.Id, venueFiles);
        }

        public void ValidateVenue(Dtos.Venue venueDto)
        {
            if (venueDto == null)
               throw  new ValidationException(Resource.InvalidVenue);

            if (string.IsNullOrEmpty(venueDto.Denominacion))
                throw new ValidationException(Resource.RequiredDenominacion);

            if (string.IsNullOrEmpty(venueDto.DireccionPrincipal))
               throw new ValidationException(Resource.RequiredDireccionPrincipal);

           if (string.IsNullOrEmpty(venueDto.ContactoReferencia))
               throw new ValidationException(Resource.RequiredContactoReferencia);

           if (string.IsNullOrEmpty(venueDto.TipoEstablecimiento))
               throw new ValidationException(Resource.RequiredTipoEstablecimiento);

            if (!venueDto.Id.HasValue)
            {
                if (SgsContext.Venues.Any(u => string.Equals(u.Denominacion, venueDto.Denominacion)))
                    throw new ValidationException(Resource.DuplicateDenominacion);               
            }
            else
            {
                var venue = default(Venue);

                venue = SgsContext.Venues.SingleOrDefault(u => string.Equals(u.Denominacion, venueDto.Denominacion));

                if (venue != null && venue.Id != venueDto.Id)
                    throw new ValidationException(Resource.DuplicateDenominacion);              
            }
                                     
        }

        public void RemoveInfoTecnicaFile(string fileName, int? venueId)
        {
            var file = string.Format(@"{0}\{1}_{2} ", InfoTecticaPath, venueId, fileName);

           if(File.Exists(file))
               File.Delete(file);
        }

        public void RemoveInfoMecanicaFile(string fileName, int? venueId)
        {
            var file = string.Format(@"{0}\{1}_{2} ", InfoMecanicaPath, venueId, fileName);

            if (File.Exists(file))
                File.Delete(file);
        }

        public void RemoveInfoElectricaFile(string fileName, int? venueId)
        {
            var file = string.Format(@"{0}\{1}_{2} ", InfoElectricaPath, venueId, fileName);

            if (File.Exists(file))
                File.Delete(file);
        }

        private void Savefiles(int venueId, VenueFiles venueFiles)
        {
            foreach (var file in venueFiles.InfoTecnicaFiles)
            {
                var path = string.Format(@"{0}\{1}_{2} ", InfoTecticaPath, venueId, file.FileName);

                file.SaveAs(path);
            }

            foreach (var file in venueFiles.InfoMecanicaFiles)
            {
                var path = string.Format(@"{0}\{1}_{2} ", InfoMecanicaPath, venueId, file.FileName);

                file.SaveAs(path);
            }

            foreach (var file in venueFiles.InfoElectricaFiles)
            {
                var path = string.Format(@"{0}\{1}_{2} ", InfoElectricaPath , venueId, file.FileName);

                file.SaveAs(path);
            }
        }
        public bool InfoTecnicaFileExists(int? venueId, string fileName)
        {
            var path = string.Format(@"{0}\{1}_{2} ", InfoTecticaPath, venueId, fileName);

            return File.Exists(path);
        }

        public bool InfoMecanicaFileExists(int? venueId, string fileName)
        {
            var path = string.Format(@"{0}\{1}_{2} ", InfoMecanicaPath, venueId, fileName);

            return File.Exists(path);
        }

        public bool InfoElectricaFileExists(int? venueId, string fileName)
        {
            var path = string.Format(@"{0}\{1}_{2} ", InfoElectricaPath, venueId, fileName);

            return File.Exists(path);
        }

        public VenueFilesEdit GetFiles(int? venueId)
        {
            if (!venueId.HasValue) return null;

            var search = string.Format("{0}*", venueId);

            var infoTecnicaFiles = Directory.GetFiles(InfoTecticaPath, search)
                                            .Select(f =>
                                            {                                               
                                                var fileName =  Path.GetFileName(f);
                                                var index = fileName.IndexOf('_', 0) + 1;

                                                return fileName.Substring(index);

                                            }).ToList();
            var infoMecanicaFiles = Directory.GetFiles(InfoMecanicaPath, search)
                                             .Select(f =>
                                             {
                                                 var fileName = Path.GetFileName(f);
                                                 var index = fileName.IndexOf('_', 0) + 1;

                                                 return fileName.Substring(index);
                                             }).ToList();
            var infoElectricaFiles = Directory.GetFiles(InfoElectricaPath, search)
                                             .Select(f =>
                                             {
                                                 var fileName = Path.GetFileName(f);
                                                 var index = fileName.IndexOf('_', 0) + 1;

                                                 return fileName.Substring(index);
                                             }).ToList();

            return new VenueFilesEdit
            {
                InfoElectricaFiles = infoElectricaFiles,
                InfoMecanicaFiles = infoMecanicaFiles,
                InfoTecnicaFiles = infoTecnicaFiles                
            };
        }
    }
}



