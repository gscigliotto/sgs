using SGS.EFRepository;
using SGS.Entities.Interfaces;

namespace SGS.BusinessLogic
{
    public abstract class BaseAdmin
    {

        #region Properties

        protected readonly ISGSContext SgsContext;      

        #endregion

        #region Contructor

        protected BaseAdmin() : this(new SGSContext() )
        {

        }
        protected BaseAdmin(ISGSContext sgsContext)
        {
            SgsContext = sgsContext;             
        }

        #endregion
    }
}
