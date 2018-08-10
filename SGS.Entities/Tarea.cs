using System;
using System.Collections.Generic;

namespace SGS.Entities
{
    public class Tarea: EntityBase
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public Prioridad Prioridad { get; set; }
        public virtual Usuario Usuario { get; set; }
        public string UsuarioSolicitante { get; set; }
        public EstadoTarea EstadoTarea { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public DateTime? FechaCierre { get; set; }
        public DateTime? FechaCierre2 { get; set; }

    }
}
