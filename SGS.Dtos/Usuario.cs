using System.Collections.Generic;

namespace SGS.Dtos
{
    public class Usuario
    {
        public int? Id { get; set; }
        public string Nick { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Password { get; set; }
        public bool Enabled { get; set; }
        public IList<int> Roles { get; set; }        
    }
}
