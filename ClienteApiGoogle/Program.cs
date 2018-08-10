using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClienteApiGoogle;
using CalendarG;
namespace ClienteApiGoogle
{
    class Program
    {
        static void Main(string[] args)
        {
            //Calendario Calendario = new Calendario();
            //Calendario.ObtenerEventos();
            ServiciosGoogle calendario = new ServiciosGoogle();
            Evento evento = new Evento() { Nombre = "Evento Prueba", Contenido = "EventoContenido", Inicio = DateTime.Parse("03/04/2014 13:00:00"), Fin = DateTime.Parse("03/04/2014 14:00:00") };
            List<Evento> Eventos = calendario.GetEvents("gscigliotto@gmail.com","lnmagb");
            //bool ret = calendario.NuevoEvento(evento, "gscigliotto@gmail.com", "lnmagb");

            //bool ret2 = calendario.BorrarEvento(evento.ID, "gscigliotto@gmail.com", "lnmagb");
        }
    }
}
