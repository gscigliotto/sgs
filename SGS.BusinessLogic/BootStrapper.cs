using System.Data.Entity;
using System.Linq;
using AutoMapper;
using SGS.EFRepository;
using SGS.Entities;

namespace SGS.BusinessLogic
{
    public static class BootStrapper
    {
        public static void BootStrap()
        {

            Mapper.CreateMap<Rol, Dtos.Rol>();

            Mapper.CreateMap<Usuario, Dtos.Usuario>()
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => string.Empty) )
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles.Select(r => r.Id).ToList()));

            Mapper.CreateMap<PersonalTecnico, Dtos.PersonalTecnico>();
            Mapper.CreateMap<Domicilio, Dtos.Domicilio>();
            Mapper.CreateMap<Venue, Dtos.Venue>();
            Mapper.CreateMap<Cliente, Dtos.Cliente>();
            Mapper.CreateMap<Tarea, Dtos.Tarea>();
                

            Database.SetInitializer<SGSContext>(new DbInitializer());
        }
    }
}
