using System;

namespace SGS.Entities
{
    public abstract class EntityBase
    {
        public int Id { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool Enabled { get; set; }
    }
}
