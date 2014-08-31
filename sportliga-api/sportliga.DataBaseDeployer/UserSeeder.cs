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
                Email = "test@test.com",
                Name = "Test Name",
                Password = Encryptor.Encrypt("Ibarra")
            });
            _session.Save(new CuentaDeUsuario
            {
                Email = "test2@test.com",
                Name = "Test2 Name",
                Password = Encryptor.Encrypt("JoseM")
            });

          
        }

        
    }
}
