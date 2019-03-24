# WebAuthn: Authentication made easy
By [Benoît Giraudou](https://twitter.com/joowgir), Developer @ Zenika, [Personal website](http://joow.github.io/)  
[Demo and slides](https://github.com/joow/webauthn-demo)

Good read: [Web Authentication API MDN page](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

Before explaining what WebAuthn is, what is the difference between Authentication, Identification and Authorization? These three concepts are very different and have little to nothing in common.
- Identification is the action of claiming your identity. It can be used to grant access to part of a system;
- Authentication, on the other hand, is the action of proving your identity. In that sense, authentication is stronger that identification and used everyday by everyone;
- Finally, Authorization is the process of granting access to a set of features to an authorized user.

The final goal of the Web Authentication API or "WebAuthn" for short, is purely to eliminate passwords while providing a strong Authentification method to the public! The user and password combinations dates back to a time where computers were not really powerful and above all not connected to the Internet, greatly limiting attacks. Today, these two propositions are not true anymore and that method of authentication is starting to show cracks, with a lot of combinations to remember or the need for systems that remember combinations for us. Today, we too often rely on third parties to protect our digital life!

[XKCD: Password Strength](https://www.xkcd.com/936/) gives you hints on how to build a seemingly secure password.  
[HaveIBeenPwned](https://haveibeenpwned.com/) tells you if your email appeared in a breach.  

Of course, today, you can raise the bar on the difficulty for anyone to access your account by opting in 2FA, or "2 Factor Authentication". This concept adds a second factor of authentication, other than your memory. This second factor can be a code you would receive via phone call, SMS, email or an authenticator application, your fingerprint or face detection. But does it really add that much to your security? Most if not all of the biometric systems of our phones can be compromised with a picture or a mold of a face or finger. Emails, phone calls and SMS can be intercepted and authenticators might be the only way to go today... When your network infrastructure does not reveal your information by acting as a Man-In-The-Middle. The situation is such that banks are rolling back their SMS-based 2FA.

[Evilginx](https://breakdev.org/evilginx-advanced-phishing-with-two-factor-authentication-bypass/) is a web proxy that can emulate a phishing campaign. Use it for demonstration purposes only and ask for permission before using it as this tool can actually retrieve real user information!

A few years ago, the [FIDO Alliance](https://fidoalliance.org/), a working group dedicated to Authentication, released the U2F standard for third-party authentication devices. Unfortunately, this protocol only worked on Firefox and on Google Chrome, behind a preference. The Web Authentication API, on the other hand, is available on Edge, Firefox and Google Chrome. This specification is very young and adoption is just starting with companies like Dropbox.

These third party devices work as [Public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) systems. They can be used to securely exchange messages, establish shared secrets and sign and verify challenges. Here, the latter property is used:
- The web server sends a challenge to the browser;
- The browser passes the challenge to the device;
- The device signs the challenge and sends it back to the browser;
- The browser sends the signed challenge to the web server;
- The web server checks the challenge with the user public key. If the signature matches the challenge, the user is identified.

Note that this authentication method requires the public key to be registered on the service. This means the user has to login or sign up to their service, generate a key pair and send their public key to the service. The private key stays in the secure chip of the third party authentication device.

Today, the API does not handle challenge retrieval and formatting. Libraries and frameworks might provide this feature at some point in the future.

Beware not to lose your key. If this happens, you must disassociate your key from all the accounts it is registered into **manually**! It is recommended to have multiple keys associated with your accounts to avoid these emergency situations, just like when you possess a second key to your home. Be also very caution when purchasing your authentication devices: only purchase certified and recommended ones as they cannot be duplicated. Knock-off devices may pose a security threat that cancels out their purpose. These devices use RSA or Elliptic curve key pairs. None currently uses post-quantum algorithms. In case you want to start using this kind of authentication technique without purchasing a key and if your smartphone possesses a secure chip, you can start using this authentication technique with your smartphone!
