using System.Collections.Generic;

namespace SGS.Entities
{
    public class Provincia: EntityBase
    {
        public string Nombre { get; set; }
        public IList<Localidad> Localidades  { get; set; }
    }
}
