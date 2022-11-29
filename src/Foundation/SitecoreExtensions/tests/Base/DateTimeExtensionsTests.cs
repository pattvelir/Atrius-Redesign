using System;
using NUnit.Framework;
using AtriusHealth.Foundation.SitecoreExtensions.Base;

namespace AtriusHealth.Foundation.SitecoreExtensions.Tests.Base
{
	[TestFixture]
	public class DateTimeExtensionsTests
	{
		[Test]
		public void GetDaySuffix_Day1_ReturnsST()
		{
			DateTime date = new DateTime(2000, 1, 1);

			Assert.AreEqual("st", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day21_ReturnsST()
		{
			DateTime date = new DateTime(2000, 1, 21);

			Assert.AreEqual("st", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day31_ReturnsST()
		{
			DateTime date = new DateTime(2000, 1, 31);

			Assert.AreEqual("st", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day2_ReturnsND()
		{
			DateTime date = new DateTime(2000, 1, 2);

			Assert.AreEqual("nd", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day22_ReturnsND()
		{
			DateTime date = new DateTime(2000, 1, 22);

			Assert.AreEqual("nd", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day3_ReturnsRD()
		{
			DateTime date = new DateTime(2000, 1, 3);

			Assert.AreEqual("rd", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day23_ReturnsRD()
		{
			DateTime date = new DateTime(2000, 1, 23);

			Assert.AreEqual("rd", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day11_ReturnsTH()
		{
			DateTime date = new DateTime(2000, 1, 11);

			Assert.AreEqual("th", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day12_ReturnsTH()
		{
			DateTime date = new DateTime(2000, 1, 12);

			Assert.AreEqual("th", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day13_ReturnsTH()
		{
			DateTime date = new DateTime(2000, 1, 13);

			Assert.AreEqual("th", date.GetDaySuffix());
		}

		[Test]
		public void GetDaySuffix_Day5_ReturnsTH()
		{
			DateTime date = new DateTime(2000, 1, 5);

			Assert.AreEqual("th", date.GetDaySuffix());
		}

		[Test]
		public void ToStringExtended_NoDaySuffix_ReturnsDefaultToStringValue()
		{
			DateTime date = new DateTime(2000, 1, 13);

			Assert.AreEqual("2000", date.ToStringExtended("yyyy"));
		}

		[Test]
		public void ToStringExtended_DaySuffix_ReturnsDayWithSuffix()
		{
			DateTime date = new DateTime(2000, 1, 13);

			Assert.AreEqual("13th", date.ToStringExtended("ddSS"));
		}

		[Test]
		public void ToStringExtended_DaySuffixYear_ReturnsDayWithSuffixAndYear()
		{
			DateTime date = new DateTime(2000, 1, 13);

			Assert.AreEqual("13th, 2000", date.ToStringExtended("dSS, yyyy"));
		}

		[Test]
		public void ToStringExtended_FullDateWithDaySuffix_ReturnsDateWithSuffix()
		{
			DateTime date = new DateTime(2000, 1, 13);

			Assert.AreEqual("January 13th, 2000", date.ToStringExtended("MMMM dSS, yyyy"));
		}

		[Test]
		public void ToAtriusHealthFormat_ValidDateTime_ReturnsFormattedDate()
		{
			DateTime date = new DateTime(2000, 1, 13);

			Assert.AreEqual("Jan 13, 2000", date.ToAtriusHealthFormat());
		}

		[Test]
		public void ToAtriusHealthFormat_MinDateTime_ReturnsEmptyString()
		{
			Assert.IsEmpty(DateTime.MinValue.ToAtriusHealthFormat());
		}
	}
}
