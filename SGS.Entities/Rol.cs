using System.Collections.Generic;

namespace SGS.Entities
{
    public class Rol: EntityBase
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public virtual IList<Usuario> Usuarios { get; set; }
    }
}
