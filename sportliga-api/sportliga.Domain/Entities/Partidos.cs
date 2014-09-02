using System;

namespace sportliga.Domain.Entities
{
    public class Partidos : IEntity
    {
        public virtual long Id { get; set; }
        public virtual Equipos LocalTeam { get; set; }
        public virtual int LocalGoals { get; set; }
        public virtual int AwayGoal { get; set; }
        public virtual Equipos AwayTeam { get; set; }
        public virtual DateTime MatchDate { get; set; }
        public virtual bool IsArchived { get; set; }
    }
}