using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Jabberwocky.DependencyInjection.Autowire.Attributes;

namespace AtriusHealth.Feature.Account.Cipher
{
	[AutowireService(LifetimeScope.SingleInstance)]
	public class CipherService : ICipherService
	{
		private const int Keysize = 128;
		private const int DerivationIterations = 1000;

		public string Encrypt(string plainText, string privateKey)
		{
			var saltStringBytes = Generate128BitsOfRandomEntropy();
			var ivStringBytes = Generate128BitsOfRandomEntropy();
			var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
			using (var password = new Rfc2898DeriveBytes(privateKey, saltStringBytes, DerivationIterations))
			using (var symmetricKey = new RijndaelManaged())
			{
				var keyBytes = password.GetBytes(Keysize / 8);

				symmetricKey.BlockSize = 128;
				symmetricKey.Mode = CipherMode.CBC;
				symmetricKey.Padding = PaddingMode.PKCS7;
				using (var encryptor = symmetricKey.CreateEncryptor(keyBytes, ivStringBytes))
				using (var memoryStream = new MemoryStream())
				using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
				{
					cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
					cryptoStream.FlushFinalBlock();
					// Create the final bytes as a concatenation of the random salt bytes, the random iv bytes and the cipher bytes.
					var cipherTextBytes = saltStringBytes;
					cipherTextBytes = cipherTextBytes.Concat(ivStringBytes).ToArray();
					cipherTextBytes = cipherTextBytes.Concat(memoryStream.ToArray()).ToArray();
					memoryStream.Close();
					cryptoStream.Close();
					return Convert.ToBase64String(cipherTextBytes);
				}
			}
		}

		public string Decrypt(string cipherText, string privateKey)
		{
			var cipherTextBytesWithSaltAndIv = Convert.FromBase64String(cipherText);
			// Get the saltbytes by extracting the first 32 bytes from the supplied cipherText bytes.
			var saltStringBytes = cipherTextBytesWithSaltAndIv.Take(Keysize / 8).ToArray();
			// Get the IV bytes by extracting the next 32 bytes from the supplied cipherText bytes.
			var ivStringBytes = cipherTextBytesWithSaltAndIv.Skip(Keysize / 8).Take(Keysize / 8).ToArray();
			// Get the actual cipher text bytes by removing the first 64 bytes from the cipherText string.
			var cipherTextBytes = cipherTextBytesWithSaltAndIv.Skip((Keysize / 8) * 2)
					.Take(cipherTextBytesWithSaltAndIv.Length - ((Keysize / 8) * 2))
					.ToArray();

			using (var password = new Rfc2898DeriveBytes(privateKey, saltStringBytes, DerivationIterations))
			using (var symmetricKey = new RijndaelManaged())
			{
				var keyBytes = password.GetBytes(Keysize / 8);

				symmetricKey.BlockSize = 128;
				symmetricKey.Mode = CipherMode.CBC;
				symmetricKey.Padding = PaddingMode.PKCS7;
				using (var decryptor = symmetricKey.CreateDecryptor(keyBytes, ivStringBytes))
				using (var memoryStream = new MemoryStream(cipherTextBytes))
				using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
				{
					var plainTextBytes = new byte[cipherTextBytes.Length];
					var decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
					memoryStream.Close();
					cryptoStream.Close();
					return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
				}
			}
		}

		private static byte[] Generate128BitsOfRandomEntropy()
		{
			var randomBytes = new byte[16]; // 32 Bytes will give us 256 bits.
			using (var rngCsp = new RNGCryptoServiceProvider())
			{
				// Fill the array with cryptographically secure random bytes.
				rngCsp.GetBytes(randomBytes);
			}
			return randomBytes;
		}
	}
}
