using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using SGS.Dtos.Common;
using SGS.Entities;
using SGS.Infrastructure;
using SGS.Infrastructure.Security;

namespace SGS.BusinessLogic
{
    public class SecurityAdmin: BaseAdmin
    {
        public bool IsValidUser(string nick, string password)
        {
            password = SecurityHelper.EncodePassword(password);

            var usuario = SgsContext.Usuarios.SingleOrDefault(u => string.Equals(u.Nick, nick) && string.Equals(u.Password, password));

            return usuario != null;
        }

        public string ResetPassword(string nick, string email)
        {
            var usuario = SgsContext.Usuarios.SingleOrDefault(u => string.Equals(u.Nick, nick) || string.Equals(u.Email, email));

            if(usuario == null)
                throw new Exception(Resource.InvalidUsuario);

            if (string.IsNullOrEmpty(usuario.Email))
                throw new Exception(Resource.EmailEmpty);

            var password = SecurityHelper.CreateRandomPassword(10);

            usuario.Password = SecurityHelper.EncodePassword(password);

            NotifyResetUser(usuario, password);

            SgsContext.SaveChanges();

            return string.Empty;
        }

        private void NotifyResetUser(Entities.Usuario usuario, string password)
        {
            var body = new StringBuilder();            
            var subject =  Resource.NewPasswordSubject;

            body.Append("Su contraseña ha sido reseteada. Su nueva contraseña es: ");
            body.Append(Environment.NewLine);
            body.Append(string.Format("contraseña: {0}", password));
            body.Append(Environment.NewLine);
            body.Append("Recuerde que usted podrá cambiar su contraseña una vez que acceda a su cuenta.");
            body.Append(Environment.NewLine);
            body.Append(Environment.NewLine);
            body.Append("Cordialmente,");
            body.Append(Environment.NewLine);
            body.Append("Administración SGS");

            Mail.SendEmail(usuario.Email, subject, body.ToString());
        }

        private void NotifyNewUser(Entities.Usuario usuario, string password)
        {
            var body = new StringBuilder();
            var subject = Resource.NewUserSubject;

            body.Append("Ud. ya posee una cuenta para acceder al sistema. Sus credenciales son: ");
            body.Append(Environment.NewLine);
            body.Append(string.Format("Usuario: {0}", usuario.Nick));
            body.Append(Environment.NewLine);
            body.Append(string.Format("contraseña: {0}", password));
            body.Append(Environment.NewLine);
            body.Append("Recuerde que usted podrá cambiar su contraseña una vez que acceda a su cuenta.");
            body.Append(Environment.NewLine);
            body.Append(Environment.NewLine);
            body.Append("Cordialmente,");
            body.Append(Environment.NewLine);
            body.Append("Administración SGS");

            Mail.SendEmail(usuario.Email, subject, body.ToString());
        }

        public IList<Dtos.Rol> GetRoles()
        {
            var roles = SgsContext.Roles.ToList();

            return Mapper.Map<IList<Rol>, IList<Dtos.Rol>>(roles);
        }

        public IList<Dtos.Usuario> GetUsuarios()
        {
            var usuarios = SgsContext.Usuarios.ToList();

            return Mapper.Map<IList<Usuario>, IList<Dtos.Usuario>>(usuarios);
        }

        public object GetUsuarioById(int usuarioId)
        {
            var usuario = SgsContext.Usuarios.SingleOrDefault(u => u.Id == usuarioId);

            return Mapper.Map<Usuario, Dtos.Usuario>(usuario);
        }

        public void CreateUsuario(Dtos.Usuario usuarioDto)
        {
            ValidateUsuario(usuarioDto);

            var password = SecurityHelper.CreateRandomPassword(10);

            var usuario = new Usuario
            {
                Apellido = usuarioDto.Apellido,
                CreateDate = DateTime.Now,
                Documento = usuarioDto.Documento,
                Email = usuarioDto.Email,
                Enabled = usuarioDto.Enabled,
                LoginFailureCount = 0,
                Nick = usuarioDto.Nick,
                Nombre = usuarioDto.Nombre,
                Telefono = usuarioDto.Telefono,
                Password = SecurityHelper.EncodePassword(password),
                Roles = SgsContext.Roles.Where(r => usuarioDto.Roles.Any(d => d == r.Id)).ToList()
            };

            SgsContext.Usuarios.Add(usuario);
            SgsContext.SaveChanges();

            try
            {
                NotifyNewUser(usuario, password);
            }
            catch (Exception){}           
        }

        public void UpdateUsuario(Dtos.Usuario usuarioDto)
        {
            ValidateUsuario(usuarioDto);

            var usuario = SgsContext.Usuarios.SingleOrDefault(u => u.Id == usuarioDto.Id);
            var rolesToAdd = usuarioDto.Roles.Except(usuario.Roles.Select(r => r.Id));
            var rolesToDelete = usuario.Roles.Select(r => r.Id).Except(usuarioDto.Roles);

            usuario.Apellido = usuarioDto.Apellido;
            usuario.Documento = usuarioDto.Documento;
            usuario.Email = usuarioDto.Email;
            usuario.Enabled = usuarioDto.Enabled;
            usuario.Nick = usuarioDto.Nick;
            usuario.Nombre = usuarioDto.Nombre;
            usuario.Telefono = usuarioDto.Telefono;
            usuario.UpdateDate = DateTime.Now;

            foreach (var id in rolesToAdd)
            {
                usuario.Roles.Add(SgsContext.Roles.Single(r => r.Id == id));
            }

            rolesToDelete.Select(id => usuario.Roles.Single(r => r.Id == id)).ToList().ForEach(r => usuario.Roles.Remove(r) );
            
            
            SgsContext.SaveChanges();
        }


        public void ValidateUsuario(Dtos.Usuario usuarioDto)
        {
           if(usuarioDto == null)
               throw  new ValidationException(Resource.InvalidUsuario);

           if (string.IsNullOrEmpty(usuarioDto.Nick))
               throw new ValidationException(Resource.RequiredNick);

           if (string.IsNullOrEmpty(usuarioDto.Apellido))
               throw new ValidationException(Resource.RequiredApellido);

           if (string.IsNullOrEmpty(usuarioDto.Nombre))
               throw new ValidationException(Resource.RequiredNombre);

           if (string.IsNullOrEmpty(usuarioDto.Email))
               throw new ValidationException(Resource.RequiredEmail);

            if (!usuarioDto.Id.HasValue)
            {
                if (!string.IsNullOrEmpty(usuarioDto.Documento) &&  SgsContext.Usuarios.Any(u => string.Equals(u.Documento, usuarioDto.Documento)))
                    throw new ValidationException(Resource.DuplicateDocumento);

                if (SgsContext.Usuarios.Any(u => string.Equals(u.Nick, usuarioDto.Nick)))
                    throw new ValidationException(Resource.DuplicateNick);

                if (SgsContext.Usuarios.Any(u => string.Equals(u.Email, usuarioDto.Email)))
                    throw new ValidationException(Resource.DuplicateEmail);
            }
            else
            {
                var usuario = default(Usuario);

                if (!string.IsNullOrEmpty(usuarioDto.Documento))
                {
                    usuario = SgsContext.Usuarios.SingleOrDefault(u => string.Equals(u.Documento, usuarioDto.Documento));    

                    if(usuario != null && usuario.Id != usuarioDto.Id)
                        throw new ValidationException(Resource.DuplicateDocumento);
                }

                usuario = SgsContext.Usuarios.SingleOrDefault(u => string.Equals(u.Nick, usuarioDto.Nick));

                if (usuario != null && usuario.Id != usuarioDto.Id)
                    throw new ValidationException(Resource.DuplicateNick);

                usuario = SgsContext.Usuarios.SingleOrDefault(u => string.Equals(u.Email, usuarioDto.Email));

                if (usuario != null && usuario.Id != usuarioDto.Id)
                    throw new ValidationException(Resource.DuplicateEmail);                
            }
                          
            if (usuarioDto.Roles == null)
                usuarioDto.Roles = new List<int>();
        }

    }
}


