using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using SGS.Dtos.Common;
using SGS.Entities;
using SGS.Infrastructure.Security;

namespace SGS.BusinessLogic
{
    public class PersonalTecnicoAdmin: BaseAdmin
    {
             
        public IList<Dtos.PersonalTecnico> GetPersonalTecnicoList()
        {
            var personalTecnico = SgsContext.PersonalTecnico.ToList();

            return Mapper.Map<IList<PersonalTecnico>, IList<Dtos.PersonalTecnico>>(personalTecnico);
        }

        public Dtos.PersonalTecnico GetPersonalTecnicoById(int personalTecnicoId)
        {
            var personalTecnico = SgsContext.PersonalTecnico.SingleOrDefault(u => u.Id == personalTecnicoId);

            return Mapper.Map<PersonalTecnico, Dtos.PersonalTecnico>(personalTecnico);
        }

        public void CreatePersonalTecnico(Dtos.PersonalTecnico personalTecnicoDto)
        {
            ValidatePersonalTecnico(personalTecnicoDto);
        
            var personalTecnico = new PersonalTecnico
            {
                Nick = personalTecnicoDto.Nick,
                Nombre = personalTecnicoDto.Nombre,
                Apellido = personalTecnicoDto.Apellido,
                CreateDate = DateTime.Now,
                Documento = personalTecnicoDto.Documento,
                Email = personalTecnicoDto.Email,                
                EmailAlternativo = personalTecnicoDto.EmailAlternativo,
                Celular = personalTecnicoDto.Celular,                                
                Telefono = personalTecnicoDto.Telefono,
                TelefonoUrgencia = personalTecnicoDto.TelefonoUrgencia,
                TelefonoAseguradora = personalTecnicoDto.TelefonoAseguradora,
                Cuit = personalTecnicoDto.Cuit,
                Art = personalTecnicoDto.Art,
                Enabled = personalTecnicoDto.Enabled,
                FechaAltaAfip = personalTecnicoDto.FechaAltaAfip,
                Operador = personalTecnicoDto.Operador,
                Poliza = personalTecnicoDto.Poliza,
                Cargo = (Cargo)Enum.Parse(typeof(Cargo), personalTecnicoDto.Cargo, true),
                Categoria = (Categoria)Enum.Parse(typeof(Categoria), personalTecnicoDto.Categoria, true),
                Domicilio = new Domicilio
                {
                    Calle = personalTecnicoDto.Domicilio.Calle,
                    Dpto = personalTecnicoDto.Domicilio.Dpto,
                    Piso = personalTecnicoDto.Domicilio.Piso,
                    Numero = personalTecnicoDto.Domicilio.Numero,
                    Provincia = SgsContext.Provincias.SingleOrDefault(p => p.Id == personalTecnicoDto.Domicilio.ProvinciaId),
                    Localidad = SgsContext.Localidades.SingleOrDefault(l => l.Id == personalTecnicoDto.Domicilio.LocalidadId)
                }
            };

            SgsContext.PersonalTecnico.Add(personalTecnico);
            SgsContext.SaveChanges();            
        }

        public void UpdatePersonalTecnico(Dtos.PersonalTecnico personalTecnicoDto)
        {
            ValidatePersonalTecnico(personalTecnicoDto);

            var personalTecnico = SgsContext.PersonalTecnico.Single(p => p.Id == personalTecnicoDto.Id);

            personalTecnico.Nick = personalTecnicoDto.Nick;
            personalTecnico.Nombre = personalTecnicoDto.Nombre;
            personalTecnico.Apellido = personalTecnicoDto.Apellido;
            personalTecnico.UpdateDate = DateTime.Now;
            personalTecnico.Documento = personalTecnicoDto.Documento;
            personalTecnico.Email = personalTecnicoDto.Email;
            personalTecnico.EmailAlternativo = personalTecnicoDto.EmailAlternativo;
            personalTecnico.Celular = personalTecnicoDto.Celular;
            personalTecnico.Telefono = personalTecnicoDto.Telefono;
            personalTecnico.TelefonoUrgencia = personalTecnicoDto.TelefonoUrgencia;
            personalTecnico.TelefonoAseguradora = personalTecnicoDto.TelefonoAseguradora;
            personalTecnico.Cuit = personalTecnicoDto.Cuit;
            personalTecnico.Art = personalTecnicoDto.Art;
            personalTecnico.Enabled = personalTecnicoDto.Enabled;
            personalTecnico.FechaAltaAfip = personalTecnicoDto.FechaAltaAfip;
            personalTecnico.Operador = personalTecnicoDto.Operador;
            personalTecnico.Poliza = personalTecnicoDto.Poliza;
            personalTecnico.Cargo = (Cargo) Enum.Parse(typeof (Cargo), personalTecnicoDto.Cargo, true);
            personalTecnico.Categoria = (Categoria) Enum.Parse(typeof (Categoria), personalTecnicoDto.Categoria, true);

            personalTecnico.Domicilio.Calle = personalTecnicoDto.Domicilio.Calle;
            personalTecnico.Domicilio.Dpto = personalTecnicoDto.Domicilio.Dpto;
            personalTecnico.Domicilio.Piso = personalTecnicoDto.Domicilio.Piso;
            personalTecnico.Domicilio.Numero = personalTecnicoDto.Domicilio.Numero;
            personalTecnico.Domicilio.Provincia = SgsContext.Provincias.SingleOrDefault(p => p.Id == personalTecnicoDto.Domicilio.ProvinciaId);
            personalTecnico.Domicilio.Localidad = SgsContext.Localidades.SingleOrDefault(p => p.Id == personalTecnicoDto.Domicilio.LocalidadId);
                           
            SgsContext.SaveChanges();
        }


        public void ValidatePersonalTecnico(Dtos.PersonalTecnico personalTecnicoDto)
        {
            if (personalTecnicoDto == null || personalTecnicoDto.Domicilio == null)
               throw  new ValidationException(Resource.InvalidPersonalTecnico);

           if (string.IsNullOrEmpty(personalTecnicoDto.Nick))
               throw new ValidationException(Resource.RequiredNick);

           if (string.IsNullOrEmpty(personalTecnicoDto.Apellido))
               throw new ValidationException(Resource.RequiredApellido);

           if (string.IsNullOrEmpty(personalTecnicoDto.Nombre))
               throw new ValidationException(Resource.RequiredNombre);

           if (string.IsNullOrEmpty(personalTecnicoDto.Email))
               throw new ValidationException(Resource.RequiredEmail);

           if (string.IsNullOrEmpty(personalTecnicoDto.Cargo))
               throw new ValidationException(Resource.RequiredCargo);

           if (string.IsNullOrEmpty(personalTecnicoDto.Categoria))
               throw new ValidationException(Resource.RequiredCategoria);

           if (string.IsNullOrEmpty(personalTecnicoDto.Cuit))
               throw new ValidationException(Resource.RequiredCuit);

            if (!personalTecnicoDto.Id.HasValue)
            {
                if (!string.IsNullOrEmpty(personalTecnicoDto.Documento) &&  SgsContext.PersonalTecnico.Any(u => string.Equals(u.Documento, personalTecnicoDto.Documento)))
                    throw new ValidationException(Resource.DuplicateDocumento);

                if (SgsContext.PersonalTecnico.Any(u => string.Equals(u.Nick, personalTecnicoDto.Nick)))
                    throw new ValidationException(Resource.DuplicateNick);

                if (SgsContext.PersonalTecnico.Any(u => string.Equals(u.Email, personalTecnicoDto.Email)))
                    throw new ValidationException(Resource.DuplicateEmail);

                if (SgsContext.PersonalTecnico.Any(u => string.Equals(u.Cuit, personalTecnicoDto.Cuit)))
                    throw new ValidationException(Resource.DuplicateCuit);
            }
            else
            {
                var pt = default(PersonalTecnico);

                if (!string.IsNullOrEmpty(personalTecnicoDto.Documento))
                {
                    pt = SgsContext.PersonalTecnico.SingleOrDefault(u => string.Equals(u.Documento, personalTecnicoDto.Documento));    

                    if(pt != null && pt.Id != personalTecnicoDto.Id)
                        throw new ValidationException(Resource.DuplicateDocumento);
                }

                pt = SgsContext.PersonalTecnico.SingleOrDefault(u => string.Equals(u.Nick, personalTecnicoDto.Nick));

                if (pt != null && pt.Id != personalTecnicoDto.Id)
                    throw new ValidationException(Resource.DuplicateNick);

                pt = SgsContext.PersonalTecnico.SingleOrDefault(u => string.Equals(u.Email, personalTecnicoDto.Email));

                if (pt != null && pt.Id != personalTecnicoDto.Id)
                    throw new ValidationException(Resource.DuplicateEmail);

                pt = SgsContext.PersonalTecnico.SingleOrDefault(u => string.Equals(u.Cuit, personalTecnicoDto.Cuit));

                if (pt != null && pt.Id != personalTecnicoDto.Id)
                    throw new ValidationException(Resource.DuplicateCuit); 
            }
                                     
        }

    }
}


