namespace Thread.Feature.Account.Cipher
{
	public interface ICipherService
	{
		string Encrypt(string plainText, string privateKey);
		string Decrypt(string cipherText, string privateKey);
	}
}