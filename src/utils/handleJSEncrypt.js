import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

const handleJSEncrypt = (data) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1oPV6JCZUNzro3heK3II
XmRp9LtFZvzzXBJK8l3U24tIZayZJ/ddcKf0jDR1tRW3mYnWRIuhF60kyOR5iDX3
qzosZkegnQ5L82JN0rq6HDtsdfLmB+pEfNkxTM8f5puE+RJeB80FTq0GpCj3sKs5
qCPvTqH2RHDIT0WcXT7DDLOjwAJJHoCVfvBqmMptHir1a1izUlIPXHPYuZ5EMpLu
9KEa5nEVVN+urW4uhYAgjMf/p+8ElcqkpdFNNHFsglSzPyt0cHtwQka0FjQuiX8x
+XsrTOQHSOHz+NG6MUA2OB2Ay7YgtAq4JxbP0J6896QGv1wYwQTG74QWBy1NuolI
owIDAQAB
-----END PUBLIC KEY-----`;

  const sessionKeyBytes = crypto.getRandomValues(new Uint8Array(32));

  const sessionKeyHex = Array.from(sessionKeyBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const iv = CryptoJS.lib.WordArray.random(16);

  const encryptedPayload = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Hex.parse(sessionKeyHex),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();

  const rsa = new JSEncrypt();
  rsa.setPublicKey(publicKey);

  const encryptedKey = rsa.encrypt(sessionKeyHex);

  if (!encryptedKey) {
    throw new Error("RSA encryption failed");
  }
  return {
    key: encryptedKey,
    payload: encryptedPayload,
    iv: iv.toString(CryptoJS.enc.Hex),
  };
};

export default handleJSEncrypt;

// const encryptLargeData = (bigData, publicKeyString) => {
//     // 1. Generate a random 32-character Session Key
//     const sessionKey = Math.random().toString(36).substring(2, 15) +
//                        Math.random().toString(36).substring(2, 15);

//     // 2. Encrypt the Big Data with AES
//     const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(bigData), sessionKey).toString();

//     // 3. Encrypt the Session Key with RSA (Public Key)
//     const rsaEncryptor = new JSEncrypt();
//     rsaEncryptor.setPublicKey(publicKeyString);
//     const encryptedKey = rsaEncryptor.encrypt(sessionKey);

//     // 4. Send both pieces to the server
//     return {
//         key: encryptedKey,  // RSA Encrypted Key (Safe)
//         data: encryptedData // AES Encrypted Data
//     };
// };

// // Usage
// const payload = { /* your large betting JSON */ };
// const securePackage = encryptLargeData(payload, publicKey);
// axios.post(API.decrypt, securePackage);
