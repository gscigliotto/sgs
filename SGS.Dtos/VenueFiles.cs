using System.Collections.Generic;
using System.Web;

namespace SGS.Dtos
{
    public class VenueFiles
    {
        public IList<HttpPostedFileBase> InfoElectricaFiles { get; set; }
        public IList<HttpPostedFileBase> InfoMecanicaFiles { get; set; }
        public IList<HttpPostedFileBase> InfoTecnicaFiles { get; set; }
    }
    
}
