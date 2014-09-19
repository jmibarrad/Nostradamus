using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrediLiga.Domain.Entities
{
    public class Result : IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual int HomeTeamGoals { get; set; }
        public virtual int AwayTeamGoals { get; set; }
        public virtual int HomeTeamPenalties { get; set; }
        public virtual int AwayTeamPenalties { get; set; }
        public virtual Team WinnerTeam { get; set; }
    }
}
