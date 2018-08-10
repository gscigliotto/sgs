using System;

namespace SGS.Dtos
{
    public class Tarea
    {
        public int? Id { get; set; }
        public string Titulo { get; set; }
        public string Prioridad { get; set; }
        public string Descripcion { get; set; }
        public int? UsuarioId { get; set; }
        public string UsuarioNick { get; set; }        
        public string UsuarioSolicitante { get; set; }
        public string EstadoTarea { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public DateTime? FechaCierre { get; set; }
    }
}
