using System;
using System.Collections.Generic;

namespace sportliga.Domain.Entities
{
    public class Leagues : IEntity
    {
        public virtual long GlobalID { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual string LeagueName { get; set; }
        public virtual string WhereAbouts { get; set; }
        public virtual DateTime EndDate{ get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual int TeamCounter { get; set; }
        public virtual bool Subscribed { get; set; }
        public virtual IEnumerable< Equipos> LeagueArray { get; set; }
    }
}
