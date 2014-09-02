using System;
using System.Collections.Generic;

namespace sportliga.Domain.Entities
{
    public class Leagues : IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual string Name { get; set; }
        public virtual string PaisDeLiga { get; set; }
        public virtual DateTime FechaDeInicio{ get; set; }
        public virtual DateTime FechaDeFinalizacion { get; set; }
        public virtual int CantidadEquipos { get; set; }
        public virtual bool Suscrito { get; set; }
        public virtual DateTime FechaDeIncipcion { get; set; }
        public virtual IEnumerable< Equipos> EquiposLeague { get; set; }
    }
}
