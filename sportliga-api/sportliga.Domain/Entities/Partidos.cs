using System;

namespace sportliga.Domain.Entities
{
    public class Partidos : IEntity
    {
        public virtual long GlobalID { get; set; }
        public virtual string HomeTeam { get; set; }
        public virtual string VisitorTeam { get; set; }

        public virtual int HomeGoals { get; set; }
        public virtual int VisitorGoals { get; set; }
        
        public virtual DateTime MatchDate { get; set; }
        public virtual bool IsArchived { get; set; }
    }
}