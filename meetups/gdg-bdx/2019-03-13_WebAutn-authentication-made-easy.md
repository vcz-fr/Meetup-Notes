# WebAuthn: Authentication made easy
By [Benoît Giraudou](https://twitter.com/joowgir), Developer @ Zenika, [Personal website](http://joow.github.io/)  
[Demo and slides](https://github.com/joow/webauthn-demo)

Good read: [Web Authentication API MDN page](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

Before explaining what WebAuthn is, what is the difference between Authentication, Identification and Authorization? These three concepts are very different and have little to nothing in common.
- Identification is the action of claiming your identity. It can be used to grant access to part of a system;
- Authentication, on the other hand, is the action of proving your identity. In that sense, authentication is stronger that identification and used everyday by everyone;
- Finally, Authorization is the process of granting access to a set of features to an authorized user.

The final goal of the Web Authentication API or "WebAuthn" for short, is purely to elimitate passwords while providing a strong Authentification method to the public! The user and password combinations dates back to a time were computers were not really powerful and above all not connected to the Internet, greatly limiting attacks. Today, these two propositions are not true anymore and that method of authentication is starting to show cracks, with tens of combinations to remember or the need for systems that remember combinations for us. Today, we too often rely on third parties to protect our digital life!

[XKCD: Password Strength](https://www.xkcd.com/936/) gives you hints on how to build a seemingly secure password.  
[HaveIBeenPwned](https://haveibeenpwned.com/) tells you if your email appeared in a breach.  

Of course, today, you can raise the bar on the difficulty for anyone to access your account by opting in 2FA, or "2 Factor Authentication". This concept adds a second factor of authentication, other than your memory. This second factor can be a code you would receive via phone call, SMS, email or an authenticator application, your fingerprint or face detection. But does it really add that much to your security? Most if not all of the biometric systems of our phones can be compromised with a picture or a mold of a face or finger. Emails, phone calls and SMS can be intercepted and authenticators might be the only way to go today... When your network infrastructure does not reveal your information by acting as a Man-In-The-Middle. The situation is such that banks are rolling back their SMS-based 2FA.
