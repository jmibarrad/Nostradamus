using System.Collections;
using System.Collections.Generic;

namespace sportliga.Domain.Entities
{
    public class CuentaDeUsuario:IEntity
    {
        public virtual long Id { get; set; }
        public virtual string Email { get; set; }
        public virtual string UserName { get; set; }
        public virtual string UserSurname { get; set; }
        public virtual string Password { get; set; }
        public virtual string AuxiliaryEmail { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual IEnumerable<Leagues> SubscribedLeagueArray { get; set; }
    }
}
