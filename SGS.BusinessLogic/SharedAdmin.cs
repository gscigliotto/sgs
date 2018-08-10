using System;
using System.Collections.Generic;
using System.Linq;
using SGS.Entities;

namespace SGS.BusinessLogic
{
    public class SharedAdmin: BaseAdmin
    {
        public object GetProvincias()
        {
            return
                SgsContext.Provincias.Select(
                    p =>new
                        {
                            p.Id,
                            p.Nombre,
                            Localidades = p.Localidades.Select(l => new {l.Id, l.Nombre})
                        }).ToList();
        }

        public IList<string> GetCategorias()
        {
            return Enum.GetNames(typeof (Categoria)).OrderBy(n => n).ToList();
        }

        public IList<string> GetCargos()
        {
            return Enum.GetNames(typeof(Cargo)).OrderBy(n => n).ToList();
        }

        public IList<string> GetTipoEstablecimientoList()
        {
            return Enum.GetNames(typeof(TipoEstablecimiento)).OrderBy(n => n).ToList();
        }

        public IList<string> GetPrioridades()
        {
            return Enum.GetNames(typeof(Prioridad)).OrderBy(n => n).ToList();
        }

        public IList<string> GetEstadosTarea()
        {
            return Enum.GetNames(typeof(EstadoTarea)).OrderBy(n => n).ToList();
        }
    }
}


