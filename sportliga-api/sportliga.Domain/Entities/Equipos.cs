using System;
using System.Collections.Generic;
using NHibernate.Type;

namespace sportliga.Domain.Entities
{
    public class Equipos : IEntity
    {
        public virtual long Id { get; set; }
        public virtual string Nombre { get; set;}
        public virtual int PartidosJugados { get; set; }
        public virtual int PartidosGanados { get; set; }
        public virtual int PartidosPerdidos { get; set; }
        public virtual int Goles { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual IEnumerable<Partidos> PartidosEquipos{ get; set; }
    }
}