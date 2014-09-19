using System;
using System.Net;
using System.Web;
using System.Web.Http;
using AcklenAvenue.Data.NHibernate;
using AttributeRouting.Web.Mvc;
using AutoMapper;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Mapping;
using PrediLiga.Data;
using PrediLiga.Domain.Entities;
using PrediLiga.Domain.Services;
using PregiLiga.Api.Models;
using RestSharp;

namespace PregiLiga.Api.Controllers
{
    public class AccountController:BaseApiController
    {
        readonly IReadOnlyRepository _readOnlyRepository;
        readonly IWriteOnlyRepository _writeOnlyRepository;
        readonly IMappingEngine _mappingEngine;


        public AccountController(IReadOnlyRepository readOnlyRepository, IWriteOnlyRepository writeOnlyRepository, IMappingEngine mappingEngine )
        {
            _readOnlyRepository = readOnlyRepository;
            _writeOnlyRepository = writeOnlyRepository;
            _mappingEngine = mappingEngine;
        }

        [HttpPost]
        [AcceptVerbs("POST","HEAD")]
        [POST("register")]
        public CreatedAccountModel Register([FromBody] AccountRegisterModel model)
        {
            var newUser = _mappingEngine.Map<AccountRegisterModel, Account>(model);
            var createdUser = _writeOnlyRepository.Create(newUser);
            var craetedUserModel = _mappingEngine.Map<Account, CreatedAccountModel>(createdUser);
            return craetedUserModel;
        }

        public static IRestResponse SendSimpleMessage(string destination, string firstname, string lastname, string displayname)
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
            request.AddParameter("subject", "Register Process");
            String text = "From Support: Message Confirm: To User->" + firstname + "-" + lastname + ", register done.  Nickname: " + displayname;
            request.AddParameter("text", text);
            request.Method = Method.POST;
            return client.Execute(request);
        }

        [HttpPost]
        [AcceptVerbs("POST","HEAD")]
        [POST("login")]
        public AuthModel Login([FromBody] AccountLoginModel model)
        {
            var user = _readOnlyRepository.FirstOrDefault<Account>(x => x.Email == model.Email);
            if (user == null) throw new HttpException((int) HttpStatusCode.NotFound, "User doesn't exist.");
            if (!user.CheckPassword(model.Password))
                throw new HttpException((int) HttpStatusCode.Unauthorized, "Password doesn't match.");
            
            var authModel = new AuthModel
            {
                email = user.Email,
                access_token = AuthRequestFactory.BuildEncryptedRequest(user.Email),
                role = new RoleModel
                {
                    bitMask = 2, title = "admin"
                }
            };

            return authModel;
        }


    }
}