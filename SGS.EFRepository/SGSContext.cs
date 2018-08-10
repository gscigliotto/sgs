using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using SGS.Entities.Interfaces;

namespace SGS.EFRepository
{
    public class SGSContext : DbContext, ISGSContext
    {
        public SGSContext()
            : base(ConfigurationManager.ConnectionStrings["SGS"].ConnectionString)
        {
          
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }        
        public IDbSet<Entities.Usuario> Usuarios { get; set; }
        public IDbSet<Entities.Rol> Roles { get; set; }
        public IDbSet<Entities.PersonalTecnico> PersonalTecnico { get; set; }
        public IDbSet<Entities.Provincia> Provincias { get; set; }
        public IDbSet<Entities.Localidad> Localidades { get; set; }
        public IDbSet<Entities.Venue> Venues { get; set; }
        public IDbSet<Entities.Cliente> Clientes { get; set; }
        public IDbSet<Entities.Tarea> Tareas { get; set; }
        public IDbSet<Entities.Gustos> Gustos { get; set; }

    }
}
