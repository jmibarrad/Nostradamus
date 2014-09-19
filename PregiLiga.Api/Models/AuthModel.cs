using PregiLiga.Api.Controllers;

namespace PregiLiga.Api.Models
{
    public class AuthModel
    {
        public string email { get; set; }
        public string access_token { get; set; }
        public RoleModel role { get; set; }
        
    }
}