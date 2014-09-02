using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DomainDrivenDatabaseDeployer;
using NHibernate;
using sportliga.Domain.Entities;

namespace sportliga.DataBaseDeployer
{
    class UserSeeder : IDataSeeder
    {
        
        readonly ISession _session;

        public UserSeeder (ISession session)
        {
            _session = session;
            
        }

        public void Seed()
        {
            _session.Save( new CuentaDeUsuario
            {
                Email = "P4@html.com",
                Name = "chuck",
                Password = SimplerAES.Encrypt("Ibarra")
            });
            _session.Save(new CuentaDeUsuario
            {
                Email = "P4@Resharper.live",
                Name = "noris",
                Password = SimplerAES.Encrypt("JoseM")
            });

          
        }

        
    }
}
