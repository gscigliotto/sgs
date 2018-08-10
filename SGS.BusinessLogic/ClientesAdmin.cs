using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using SGS.Dtos.Common;
using SGS.Entities;
using SGS.Infrastructure.Security;

namespace SGS.BusinessLogic
{
    public class ClientesAdmin: BaseAdmin
    {
             
        public IList<Dtos.Cliente> GetClientes()
        {
            var clientes = SgsContext.Clientes.ToList();

            return Mapper.Map<IList<Cliente>, IList<Dtos.Cliente>>(clientes);
        }

        public Dtos.Cliente GetClienteById(int clienteId)
        {
            var cliente = SgsContext.Clientes.SingleOrDefault(u => u.Id == clienteId);

            return Mapper.Map<Cliente, Dtos.Cliente>(cliente);
        }

        public void CreateCliente(Dtos.Cliente clienteDto)
        {
            ValidateCliente(clienteDto);
        
            var cliente = new Cliente
            {               
                CreateDate = DateTime.Now,               
                Email = clienteDto.Email,                                
                Telefono = clienteDto.Telefono,                
                Cuit = clienteDto.Cuit,                
                Enabled = true,
                EmailContactoAdministrativo = clienteDto.EmailContactoAdministrativo,
                EmailContactoComercial = clienteDto.EmailContactoComercial,
                EmailContactoTecnico = clienteDto.EmailContactoTecnico,
                NombreComercial = clienteDto.NombreComercial,
                NombreContactoAdministrativo = clienteDto.NombreContactoAdministrativo,
                NombreContactoComercial = clienteDto.NombreContactoComercial,
                NombreContactoTecnico = clienteDto.NombreContactoTecnico,
                PaginaWeb = clienteDto.PaginaWeb,
                RazonSocial = clienteDto.RazonSocial,
                TelefonoContactoAdministrativo = clienteDto.TelefonoContactoAdministrativo,
                TelefonoContactoComercial = clienteDto.TelefonoContactoComercial,
                TelefonoContactoTecnico = clienteDto.TelefonoContactoTecnico
            };

            SgsContext.Clientes.Add(cliente);
            SgsContext.SaveChanges();            
        }

        public void UpdateCliente(Dtos.Cliente clienteDto)
        {
            ValidateCliente(clienteDto);

            var cliente = SgsContext.Clientes.Single(p => p.Id == clienteDto.Id);
         
            cliente.UpdateDate = DateTime.Now;
            cliente.Email = clienteDto.Email;
            cliente.Telefono = clienteDto.Telefono;
            cliente.Cuit = clienteDto.Cuit;
            cliente.EmailContactoAdministrativo = clienteDto.EmailContactoAdministrativo;
            cliente.EmailContactoComercial = clienteDto.EmailContactoComercial;
            cliente.EmailContactoTecnico = clienteDto.EmailContactoTecnico;
            cliente.NombreComercial = clienteDto.NombreComercial;
            cliente.NombreContactoAdministrativo = clienteDto.NombreContactoAdministrativo;
            cliente.NombreContactoComercial = clienteDto.NombreContactoComercial;
            cliente.NombreContactoTecnico = clienteDto.NombreContactoTecnico;
            cliente.PaginaWeb = clienteDto.PaginaWeb;
            cliente.RazonSocial = clienteDto.RazonSocial;
            cliente.TelefonoContactoAdministrativo = clienteDto.TelefonoContactoAdministrativo;
            cliente.TelefonoContactoComercial = clienteDto.TelefonoContactoComercial;
            cliente.TelefonoContactoTecnico = clienteDto.TelefonoContactoTecnico;
                           
            SgsContext.SaveChanges();
        }


        public void ValidateCliente(Dtos.Cliente clienteDto)
        {
            if (clienteDto == null)
               throw  new ValidationException(Resource.InvalidCliente);

           if (string.IsNullOrEmpty(clienteDto.RazonSocial))
               throw new ValidationException(Resource.RequiredRazonSocial);

           if (string.IsNullOrEmpty(clienteDto.Telefono))
               throw new ValidationException(Resource.RequiredTelefono);

           if (string.IsNullOrEmpty(clienteDto.Email))
               throw new ValidationException(Resource.RequiredEmail);        

            if (!clienteDto.Id.HasValue)
            {
                if (SgsContext.Clientes.Any(u => string.Equals(u.RazonSocial, clienteDto.RazonSocial)))
                    throw new ValidationException(Resource.DuplicateNick);

                if (SgsContext.Clientes.Any(u => string.Equals(u.Email, clienteDto.Email)))
                    throw new ValidationException(Resource.DuplicateEmail);    
            }
            else
            {
                var pt = default(Cliente);

                pt = SgsContext.Clientes.SingleOrDefault(u => string.Equals(u.RazonSocial, clienteDto.RazonSocial));

                if (pt != null && pt.Id != clienteDto.Id)
                    throw new ValidationException(Resource.DuplicateNick);

                pt = SgsContext.Clientes.SingleOrDefault(u => string.Equals(u.Email, clienteDto.Email));

                if (pt != null && pt.Id != clienteDto.Id)
                    throw new ValidationException(Resource.DuplicateEmail);
            }
                                     
        }

    }
}


