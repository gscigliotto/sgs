using System;
using System.Collections.Generic;
using System.Data.Entity;
using SGS.Entities;
using SGS.Infrastructure.Security;

namespace SGS.EFRepository
{
    public class DbInitializer : DropCreateDatabaseIfModelChanges<SGSContext>
    {
        protected override void Seed(SGSContext context)
        {
            var roles = new List<Rol>
            {
                new Rol { Nombre = "Admin", Descripcion = "Administrador del sistema. Otorga control total sobre el mismo", CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true},
                new Rol { Nombre = "Edición", Descripcion = "Edición", CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true},
                new Rol { Nombre = "Consulta", Descripcion = "Consulta", CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true}
            };

            roles.ForEach(u => context.Roles.Add(u));

            var contrasenia = SecurityHelper.EncodePassword("123456");

            var usuarios = new List<Usuario>
            {
                new Usuario {Nick = "Admin", Nombre = "Admin", Apellido = "Admin", Email = "pablozabo@hotmail.com", Password  = contrasenia, Roles = new List<Rol>{roles[0]} ,  CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true}
            };

            usuarios.ForEach(u => context.Usuarios.Add(u));

            var localidades = new List<Localidad>
            {
                new Localidad { Nombre = "Cap.Fed" , CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true},
                new Localidad { Nombre = "Quilmes", CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true},
                new Localidad { Nombre = "Avellaneda",  CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true}
            };

            localidades.ForEach(l => context.Localidades.Add(l));

            var  provincias = new List<Provincia>
            {
                new Provincia { Nombre = "Buenos Aires" , Localidades = localidades, CreateDate = DateTime.Now, UpdateDate = DateTime.Now, Enabled = true}
            };

            provincias.ForEach(p => context.Provincias.Add(p));


            context.SaveChanges();
        }
    }
}
