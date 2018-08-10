using System.Collections.Generic;
using System.Web;

namespace SGS.Dtos
{
    public class VenueFilesEdit
    {
        public IList<string> InfoElectricaFiles { get; set; }
        public IList<string> InfoMecanicaFiles { get; set; }
        public IList<string> InfoTecnicaFiles { get; set; }
    }
    
}
