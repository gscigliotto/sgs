namespace SGS.Dtos
{
    public class Cliente
    {
        public int? Id { get; set; }
        public string RazonSocial { get; set; }
        public string NombreComercial { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string Cuit { get; set; }
        public string PaginaWeb { get; set; }

        public string NombreContactoComercial { get; set; }
        public string TelefonoContactoComercial { get; set; }
        public string EmailContactoComercial { get; set; }

        public string NombreContactoAdministrativo { get; set; }
        public string TelefonoContactoAdministrativo { get; set; }
        public string EmailContactoAdministrativo { get; set; }

        public string NombreContactoTecnico { get; set; }
        public string TelefonoContactoTecnico { get; set; }
        public string EmailContactoTecnico { get; set; }      
    }
}
