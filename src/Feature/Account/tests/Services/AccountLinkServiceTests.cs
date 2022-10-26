using System;
using System.Web;
using NSubstitute;
using NUnit.Framework;
using Sitecore.Data;
using Thread.Feature.Account.Cipher;
using Thread.Feature.Account.Services;
using Thread.Feature.Account.Services.Models;

namespace Thread.Feature.Account.Tests.Services
{
	[TestFixture]
	public class AccountLinkServiceTests
	{
		private IAccountLinkService _service;

		[SetUp]
		public void Setup()
		{
			var cipher = Substitute.For<ICipherService>();
			cipher.Encrypt(Arg.Is<string>(a => a.Contains("kevin.mazzoni@velir.com")), Arg.Any<string>())
				.Returns("validEncryption");
			cipher.Decrypt("validEncryption", Arg.Any<string>())
				.Returns("email=kevin.mazzoni@velir.com&date=May 1, 2019");

			_service = new AccountLinkService(cipher);
		}

		[Test]
		public void GenerateSecureUrl_ValidInput_ReturnsValidUrl()
		{
			var input = new AccountLinkInput
			{
				BaseUrl = "http://dev.thread.velir.com/reset-password",
				EmailAddress = "kevin.mazzoni@velir.com",
				ExpirationMinutes = 30
			};
            var passwordToken = ID.NewID.ToShortID().ToString();
			Assert.AreEqual("http://dev.thread.velir.com/reset-password?v=validEncryption", _service.GenerateSecureUrl(input, passwordToken));
		}

		[Test]
		public void GenerateSecureUrl_NoBaseUrl_ReturnsNull()
		{
			var input = new AccountLinkInput
			{
				EmailAddress = "kevin.mazzoni@velir.com",
				ExpirationMinutes = 30
			};
            var passwordToken = ID.NewID.ToShortID().ToString();

            Assert.IsNull(_service.GenerateSecureUrl(input,passwordToken));
		}

		[Test]
		public void GenerateSecureUrl_NoEmailAddress_ReturnsNull()
		{
			var input = new AccountLinkInput
			{
				BaseUrl = "http://dev.thread.velir.com/reset-password",
				ExpirationMinutes = 30
			};
            var passwordToken = ID.NewID.ToShortID().ToString();

            Assert.IsNull(_service.GenerateSecureUrl(input,passwordToken));
		}

		[Test]
		public void GenerateSecureUrl_InputIsNull_ReturnsNull()
		{
			Assert.IsNull(_service.GenerateSecureUrl(null,string.Empty));
		}

		[Test]
		public void GetAccountParams_HasEmailAndExpiration_ReturnsValidParams()
		{
			var request = new HttpRequest("test", "http://dev.thread.velir.com/reset-password", "v=validEncryption");

			var vals = _service.GetAccountParams(request.QueryString);

			Assert.AreEqual("kevin.mazzoni@velir.com", vals.EmailAddress);
			Assert.AreEqual(new DateTime(2019, 5, 1), vals.ExpirationDate);
		}
	}
}
