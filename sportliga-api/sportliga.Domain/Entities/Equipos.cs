using System;
using System.Collections.Generic;
using NHibernate.Type;

namespace sportliga.Domain.Entities
{
    public class Equipos : IEntity
    {
        public virtual long GlobalID { get; set; }
        public virtual string TeamName { get; set;}
        public virtual int PlayedMatches { get; set; }
        public virtual int WonMatches { get; set; }
        public virtual int LoseMatches { get; set; }
        public virtual int FavorGoals { get; set; }
        public virtual int AgainstGoals { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual IEnumerable<Partidos> MatchesArray{ get; set; }
    }
}