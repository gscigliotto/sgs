using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SGS.Entities
{
    public class Domicilio: EntityBase
    {
        public string Calle { get; set; }
        public string Numero { get; set; }
        public string Dpto { get; set; }
        public int? Piso { get; set; }
        public virtual Provincia Provincia { get; set; }
        public virtual Localidad Localidad { get; set; }
    }
}
