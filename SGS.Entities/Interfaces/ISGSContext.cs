using System.Data.Entity;

namespace SGS.Entities.Interfaces
{
    public interface ISGSContext
    {
        IDbSet<Usuario> Usuarios { get; }
        IDbSet<Rol> Roles { get; }
        IDbSet<PersonalTecnico> PersonalTecnico { get; }
        IDbSet<Provincia> Provincias { get; }
        IDbSet<Localidad> Localidades { get; }
        IDbSet<Venue> Venues { get; }
        IDbSet<Cliente> Clientes { get; }
        IDbSet<Tarea> Tareas { get; }
      
        Database Database { get; }
        int SaveChanges();   
    }
}
