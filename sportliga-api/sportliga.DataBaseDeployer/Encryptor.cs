using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;


namespace sportliga.DataBaseDeployer
{
    #region
    public struct PasswordPolicy
    {
        private readonly int _aForceXUpperCase;
        private readonly int _aForceXNonAlphaNumeric;
        private readonly int _aForceXNumeric;
        private readonly int _aPasswordMinLength;
        private readonly int _aPasswordMaxLength;

        /// <summary>
        /// Creates a new PasswordPolicy Struct
        /// </summary>
        /// <param name="xUpper">Forces at least this number of Uppercase characters</param>
        /// <param name="xNonAlphaNumeric">Forces at least this number of Special characters</param>
        /// <param name="xNumeric">Forces at least this number of Numeric characters</param>
        /// <param name="minLength">Forces at least this number of characters</param>
        /// <param name="maxLength">Forces at most this number of characters</param>
        public PasswordPolicy(int xUpper, int xNonAlphaNumeric, int xNumeric, int minLength, int maxLength)
        {
            _aForceXUpperCase = xUpper;
            _aForceXNonAlphaNumeric = xNonAlphaNumeric;
            _aForceXNumeric = xNumeric;
            _aPasswordMinLength = minLength;
            _aPasswordMaxLength = maxLength;
        }

        public int ForceXUpperCase
        {
            get
            {
                return _aForceXUpperCase;
            }
        }

        public int ForceXNonAlphaNumeric
        {
            get
            {
                return _aForceXNonAlphaNumeric;
            }
        }

        public int ForceXNumeric
        {
            get
            {
                return _aForceXNumeric;
            }
        }

        public int PasswordMinLength
        {
            get
            {
                return _aPasswordMinLength;
            }
        }

        public int PasswordMaxLength
        {
            get
            {
                return _aPasswordMaxLength;
            }
        }
    }
    #endregion

    #region Encrypt
    public class SimplerAES
    {

        public static bool SpecialChars = true;
        public static bool MaxLength = true;
        public static bool MinLength = true;
        public static bool UpperCase = true;
        public static bool AlphaNumeric = true;
        private const String CNumbersRegex = "[\\d]";
        private const String CUppercaseRegex = "[A-Z]";
        private const String CNonAlphaNumericRegex = "[^0-9a-zA-Z]";

        private static byte[] key = { 123, 217, 19, 11, 24, 26, 85, 45, 114, 184, 27, 162, 37, 112, 222, 209, 241, 24, 175, 144, 173, 53, 196, 29, 24, 26, 17, 218, 131, 236, 53, 209 };
        private static byte[] vector = { 146, 64, 191, 111, 23, 3, 113, 119, 231, 121, 221, 112, 79, 32, 114, 156 };
        private static RijndaelManaged rm = new RijndaelManaged();
        private static ICryptoTransform encryptor = rm.CreateEncryptor(key, vector), decryptor = rm.CreateDecryptor(key, vector);
        private static UTF8Encoding encoder = new UTF8Encoding();
       
        public SimplerAES()
        {
          
           
        }

        public static string Encrypt(string unencrypted)
        {
            return Convert.ToBase64String(Encrypt(encoder.GetBytes(unencrypted)));
        }

        public static string Decrypt(string encrypted)
        {
            return encoder.GetString(Decrypt(Convert.FromBase64String(encrypted)));
        }

        public static byte[] Encrypt(byte[] buffer)
        {
            return Transform(buffer, encryptor);
        }

        public static byte[] Decrypt(byte[] buffer)
        {
            return Transform(buffer, decryptor);
        }

        protected static byte[] Transform(byte[] buffer, ICryptoTransform transform)
        {
            MemoryStream stream = new MemoryStream();
            using (CryptoStream cs = new CryptoStream(stream, transform, CryptoStreamMode.Write))
            {
                cs.Write(buffer, 0, buffer.Length);
            }
            return stream.ToArray();
        }
       #endregion

        #region Validate Password Policy
        private static void PCheckPasswordPolicyCompliance(String password, PasswordPolicy pwdPolicy)
        {
            if (new Regex(CNumbersRegex).Matches(password).Count < pwdPolicy.ForceXNumeric)
            {
                AlphaNumeric = false;
            }

            if (new Regex(CNonAlphaNumericRegex).Matches(password).Count < pwdPolicy.ForceXNonAlphaNumeric)
            {
                SpecialChars = false;
            }

            if (new Regex(CUppercaseRegex).Matches(password).Count < pwdPolicy.ForceXUpperCase)
            {
                UpperCase = false;
            }

            if (password.Length < pwdPolicy.PasswordMinLength)
            {
                MinLength = false;
            }

            if (password.Length > pwdPolicy.PasswordMaxLength)
            {
                MaxLength = false;
            }
        }

        #endregion

    }

}