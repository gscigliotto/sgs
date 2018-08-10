using System;

namespace SGS.Dtos
{
    public class PersonalTecnico
    {
        public int? Id { get; set; }
        public string Nick { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public string Cuit { get; set; }
        public DateTime? FechaAltaAfip { get; set; }
        public Domicilio Domicilio { get; set; }
        public string Telefono { get; set; }
        public string Celular{ get; set; }        
        public string TelefonoUrgencia{ get; set; }
        public string Email{ get; set; }
        public string EmailAlternativo { get; set; }
        public string Cargo { get; set; }
        public string Categoria { get; set; }
        public bool Operador { get; set; }
        public string Art { get; set; }
        public string TelefonoAseguradora { get; set; }
        public string Poliza { get; set; }
        public bool Enabled { get; set; }
    }
}
