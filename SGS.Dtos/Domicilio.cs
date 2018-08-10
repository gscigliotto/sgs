namespace SGS.Dtos
{
    public class Domicilio
    {
        public string Calle { get; set; }
        public string Numero { get; set; }
        public string Dpto { get; set; }
        public int? Piso { get; set; }
        public int ProvinciaId { get; set; }
        public int LocalidadId { get; set; }
    }
}
