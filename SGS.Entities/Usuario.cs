using System;
using System.Collections.Generic;

namespace SGS.Entities
{
    public class Usuario: EntityBase
    {
        public string Nick { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Password { get; set; }
        public virtual IList<Rol> Roles  { get; set; }
        public virtual IList<Tarea> Tareas  { get; set; }
        public int LoginFailureCount { get; set; }
        public DateTime? BlockDate { get; set; }

    }
}
