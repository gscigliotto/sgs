using System.Collections.Generic;

namespace SGS.Entities
{
    public class Venue: EntityBase
    {
        public string Denominacion { get; set; }
        public string DireccionPrincipal { get; set; }
        public string DireccionEntregaProveedores { get; set; }
        public string ContactoReferencia { get; set; }
        public string TelefonoContacto { get; set; }
        public string EmailContacto { get; set; }
        public string EmailEmpresaSeguridad { get; set; }
        public TipoEstablecimiento TipoEstablecimiento { get; set; }
        public string Encomienda { get; set; }
        public string PlanoTecnico { get; set; }
        public string PlanoMecanico { get; set; }
        public string PlanoElectrico { get; set; }
        public string InformacionTecnica { get; set; }
        public string InformacionMecanica { get; set; }        
        public string InformacionElectrica { get; set; }        
    }
}
