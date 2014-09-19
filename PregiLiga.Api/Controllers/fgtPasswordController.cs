using System;
using System.Net;
using System.Web;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using AttributeRouting.Web.Mvc;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using PrediLiga.Data;
using PrediLiga.Domain.Entities;
using PrediLiga.Domain.Services;
using PregiLiga.Api.Models;
using RestSharp;

namespace PregiLiga.Api.Controllers
{
    public class fgtPasswordController : ApiController
    {
        readonly IReadOnlyRepository _readOnlyRepository;


        public fgtPasswordController(IReadOnlyRepository readOnlyRepository)
        {

            _readOnlyRepository = readOnlyRepository;
        }

        [HttpPost]
        [AcceptVerbs("POST", "HEAD")]
        [POST("forgotpassword")]
        public AuthModel ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var resp = SendSimpleMessage(model.Email);
            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user == null) throw new HttpException((int)HttpStatusCode.NotFound, "User doesn't exist.");
            var authModel = new AuthModel { access_token = "SuperHash" };
            return authModel;
        }

        public static IRestResponse SendSimpleMessage(string destination)
        {
            var client = new RestClient
            {
                BaseUrl = "https://api.mailgun.net/v2",
                Authenticator = new HttpBasicAuthenticator("api",
                    "key-8tw489mxfegaqewx93in2xo449q5p3l0")
            };
            var request = new RestRequest();
            request.AddParameter("domain",
                                "app5dcaf6d377cc4ddcb696b827eabcb975.mailgun.org", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Nostradamus-Support <postmaster@app5dcaf6d377cc4ddcb696b827eabcb975.mailgun.org>");
            String email = "<" + destination + ">";
            request.AddParameter("to", email);
            request.AddParameter("subject", "Recover Password");
            String text = "Can only send your email: " + email + ",hashing failed to bounce.";
            request.AddParameter("text", text);
            request.Method = Method.POST;
            return client.Execute(request);
        }

    }
}