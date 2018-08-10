using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using SGS.Dtos.Common;
using SGS.Entities;

namespace SGS.BusinessLogic
{
    public class TareasAdmin: BaseAdmin
    {
        public IList<Dtos.Tarea> GetTareas()
        {
            var tareas = SgsContext.Tareas.ToList();

            return Mapper.Map<IList<Tarea>, IList<Dtos.Tarea>>(tareas);
        }
                   
        public Dtos.Tarea GetTareaById(int tareaId)
        {
            var tarea = SgsContext.Tareas.SingleOrDefault(v => v.Id == tareaId);

            return Mapper.Map<Tarea, Dtos.Tarea>(tarea);
        }

        public void CreateTarea(Dtos.Tarea tareaDto)
        {
            ValidateTarea(tareaDto);
        
            var tarea = new Tarea
            {                
                CreateDate = DateTime.Now,               
                Enabled = true,
                Descripcion = tareaDto.Descripcion,
                FechaVencimiento = tareaDto.FechaVencimiento,
                Titulo = tareaDto.Titulo,
                Prioridad = (Prioridad)Enum.Parse(typeof(Prioridad), tareaDto.Prioridad, true),
                EstadoTarea = EstadoTarea.Pendiente,
                Usuario = SgsContext.Usuarios.Single(u => u.Id == tareaDto.UsuarioId),
                UsuarioSolicitante =  HttpContext.Current.User.Identity.Name                
            };

            SgsContext.Tareas.Add(tarea);
            SgsContext.SaveChanges();            
        }

        public void UpdateTarea(Dtos.Tarea tareaDto)
        {
            ValidateTarea(tareaDto);

            var tarea = SgsContext.Tareas.Single(v => v.Id == tareaDto.Id);

            tarea.UpdateDate = DateTime.Now;
            tarea.Descripcion = tareaDto.Descripcion;
            tarea.FechaVencimiento = tareaDto.FechaVencimiento;
            tarea.Titulo = tareaDto.Titulo;
            tarea.Prioridad = (Prioridad) Enum.Parse(typeof (Prioridad), tareaDto.Prioridad, true);
            tarea.Usuario = SgsContext.Usuarios.Single(u => u.Id == tareaDto.UsuarioId);
            tarea.EstadoTarea = (EstadoTarea) Enum.Parse(typeof (EstadoTarea), tareaDto.EstadoTarea, true);

            //if (tarea.EstadoTarea == EstadoTarea.Rechazada || tarea.EstadoTarea == EstadoTarea.Finalizada)
            //    tarea.Enabled = false;
       
            SgsContext.SaveChanges();
        }


        public void ValidateTarea(Dtos.Tarea tareaDto)
        {
            if (tareaDto == null)
               throw  new ValidationException(Resource.InvalidTarea);

            if (string.IsNullOrEmpty(tareaDto.Prioridad))
                throw new ValidationException(Resource.RequiredPrioridad);

            if (string.IsNullOrEmpty(tareaDto.Titulo))
                throw new ValidationException(Resource.RequiredTitulo);

            if (!tareaDto.UsuarioId.HasValue)
                throw new ValidationException(Resource.RequiredUsuario);

            if (tareaDto.Id.HasValue &&  string.IsNullOrEmpty(tareaDto.EstadoTarea))
                throw new ValidationException(Resource.RequiredEstadoTarea);      
        }

        public IList<Dtos.Tarea> GetTareaByUser(string userName)
        {
            var user = SgsContext.Usuarios.Single(u => string.Equals(u.Nick, userName));
            var tareas = SgsContext.Tareas.Where(t => t.Usuario.Id == user.Id).ToList();

            return Mapper.Map<IList<Tarea>, IList<Dtos.Tarea>>(tareas);
        }
    }
}




