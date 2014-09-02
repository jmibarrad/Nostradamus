using System;

namespace sportliga.Domain.Entities
{
    public class Partidos : IEntity
    {
        public virtual long Id { get; set; }
        public virtual string EquipoLocal { get; set; }
        public virtual int GolesLocal { get; set; }
        public virtual int GolesVisitante { get; set; }
        public virtual string EquipoVisitante { get; set; }
        public virtual DateTime Fecha { get; set; }
        public virtual bool IsArchived { get; set; }
    }
}