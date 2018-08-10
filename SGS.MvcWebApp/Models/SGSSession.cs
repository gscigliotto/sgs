using SGS.Dtos;
using SGS.Infrastructure;

namespace SGS.MvcWebApp.Models
{
    public class SGSSession : SessionInfo<SGSSession>
    {
        public VenueFiles VenueFiles { get; set; }
    }
}