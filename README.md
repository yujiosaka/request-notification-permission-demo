# Request notification permission demo

## TL;DR;

- You need to enable "Web Push" in Safari experimental feature settings to use web push in iOS.
- Web push in iOS is limited to Home Screeen web apps (PWAs) and it does not work with web page in Safari.
- Request to notification permission can be made in short time (~5s) after user indicates interest to the page such as click.
- PWA and native apps are becoming closer, but still there are many features in the waitlist to improve PWA's capability

## Background

The [iOS 16.4 was officially released on 3/27/2023](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) with push notification support to Home Screeen web apps (PWAs).

Web push notification to iOS has been requested so long time since [the feature was already supported by Google Chrome back in 2015](https://blog.chromium.org/2015/03/chrome-42-beta-push-notifications_12.html).

The feature is still experimental with such restriction that you need to add the web app to the Home Screen and open it as a PWA. Also it behaves differently from Google Chrome and it has stricter condition to ask notification permission to users.

This project aims to demostrate how to enable web push notification in iOS and also clarify the behavior difference to request notification permission between Google Chrome and Safari.

### What's PWA?

It is important to understand Progressive Web App (PWA) because it's often discussed with web push notification within the same context and iOS supprts web push notification only to PWA and it does not allow sending notifications without adding the web app to Home Screen as of 3/30/2023.

The term ["Progressive Web Apps" was coined by Google Chrome developers](https://medium.com/@slightlylate/progressive-apps-escaping-tabs-without-losing-our-soul-3b93a8561955). But the long journey started way earlier when Steve Jobs said web apps in Safari should “look exactly and behave exactly like native apps" back in 2007.

[!["One last thing" June 11 2007, 18 days before shipping the iphone.](https://img.youtube.com/vi/ZlE7dzoD6GA/0.jpg)](https://www.youtube.com/watch?v=ZlE7dzoD6GA)

[Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) is an critical component to enable PWA. But we needed to wait until Google Chrome and Safari both support it in 2017. Also there are so many features still in the waitlist to provide good user exerience with PWAs such as external device access.

Also it is important to note that [there is a group for APIs that you can't use in a PWA](https://web.dev/learn/pwa/capabilities/#empowering-your-pwa), and where plans to add them are still long term. An example API from this group is geofencing.

You can take a look at [:blowfish: Fugu API tracker](https://fugu-tracker.web.app/) to see what's in the waitlist.

### What's the benefit of PWA?

[web.dev](https://web.dev/i18n/en/what-are-pwas/) listed capable, reliable and installable as three app pillars, which means that PWA should provide the same-level of functinalities as native apps, works offline and allows users to install to Home Screen.

Web apps and native apps have different strength and weakness described as below.

|                        | Web apps | Native apps |
|------------------------|----------|-------------|
| Internet search        | :o:      | :x:         |
| Instant update         | :o:      | :x:         |
| App store distribution | :x:      | :o:         |
| Performance            | :x:      | :o:         |
| Offline support        | :x:      | :o:         |

PWA is an attempt to have the strength of the both web and native apps allowing developers to publish the web app to the internet and to pregressively provide native experience after installing it to user devices.

Another important point is that you don't need to pay "Google Tax" and "Apple Tax" for selling apps and receiving transactions. Google provides unique sollution called "Trusted Web App" (TWA) that allows distributing PWAs in Google Play. But you need to comply with [Google Play’s Payments policy](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en) and Apple does not provide any equivalent solution.

## Getting Started

First, run the development server:

```bash
npm run dev
```

### Desktop browsers

Open [http://localhost:3000](http://localhost:3000) with your desktop browser.

<img width="495" alt="Screenshot 2023-03-30 at 10 07 30" src="https://user-images.githubusercontent.com/2261067/228701792-12f31f86-7350-4fc3-940d-041e309af135.png">

Click "Request" button and it will pops up a dialog to request permission to send push notification.

<img width="493" alt="Screenshot 2023-03-30 at 10 10 46" src="https://user-images.githubusercontent.com/2261067/228702161-ebfcfe9f-191d-4495-a046-43a1dcc87d11.png">

It should work for desktop Safari as well.

However, when you set more than 5 seconds delay to request the permission after clicking the button, it starts behaving differently between Google Chrome and Safari.

It continues working with Google Chrome. But Safari no longer shows the dialog when there are more than 5 seconds delay.

<img width="569" alt="Screenshot 2023-03-30 at 10 16 34" src="https://user-images.githubusercontent.com/2261067/228702926-e333ca3e-afe6-4e41-ae03-c884230185bd.png">

The reason is explained in the [WebKit Blog](https://webkit.org/blog/13399/webkit-features-in-safari-16-1/#web-push-for-macos-ventura) as below:

> In Safari, users of your website or web app opt into notifications by first indicating interest through a user gesture — such as clicking a button. Then they’ll be prompted to give permission for your site or app to send notifications. Users can view and manage notifications in Notifications Center. And they can customize styles and turn notifications off per website in Notifications Settings.

Therefore, it is not recommended to request push notification permission on page load. Instead, you should provide a button explicitly asking for notification permission for Safari users.

### iOS safari

Web push notification is still an exprimental feature disabled by default as of 3/30/2023. Therefore, you need to open the setting to enable the feature.

1. Open the Settings app.
2. Scroll down to Safari.
3. Click Advanced and then Experimental Features.
4. Enable Push API

![IMG_0779](https://user-images.githubusercontent.com/2261067/228711907-09147728-d942-4011-88b5-8006868cd81d.jpg)

Also you need to install the web app to Home Screen.

1. Open [http://localhost:3000](http://localhost:3000) with iOS safari.
2. Tap share icon at the bottom center of the screen and tap "Add to Home Screen".

![IMG_0780](https://user-images.githubusercontent.com/2261067/228713191-8c7d8f1f-ecd9-4c7e-936f-688f245f22dd.jpg)

The app will be installed with :sunglasses: icon. So you can tap it to open it as a PWA.

![IMG_0782](https://user-images.githubusercontent.com/2261067/228713694-8bfb7cf8-6685-4184-9404-1dce81b47a61.jpg)

After launching the web app, click "Request" button and it will pops up the dialog to request web push permission.

![IMG_0783](https://user-images.githubusercontent.com/2261067/228718942-ea34ccb2-5bc8-41aa-bceb-a673f657d479.jpg)

But the dialog won't be popped up if the delay is configured more than 5 seconds.

## Troubleshooting

### Permission dialog is not displayed

Web push is allowed either in `localhost` or HTTPS access.

When you are not either using localhost or HTTPS access to access to your local server, the easiest way is to use [ngrok](https://ngrok.com/).

It requires you to sign up for ngrok account. But once configured, you can just run `ngrok http 3000` to tunnel your local server and access it from internet with HTTPS.
