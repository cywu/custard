# Custard, a Firefox add-on for applying custom CSS to sites
## Motivation
- I want to have immersive photo viewing experience on Instagram. I made this add-on a little bit more general for future need.
- I don't like bloat-ness of existing add-ons, as I don't really need all the functionalities.
- I don't feel like auditing code of add-ons made by others. It's faster to just write my own with minimal functionality. As a result, the Options Page looks bad. Currently feature-bugs abound but my problem is solved.
## Caveats
- This is still an alpha release. To avoid losing your precious rules, please save a copy of your rules somewhere and then copy-paste into the Options Page of this add-on.
## About Permissions
This type of add-ons has to ask for many permissions. Therefore if you plan to use mine, I encourage you to audit the code. The permissions this add-on asks for are as follows.
- Access your data for all websites. A priori, I don't know which sites I want to inject CSS on. I don't see a way of requesting access to sites as needed. Thus I just have to ask for all.
- Access browser tabs. Needed to inject CSS into tabs.
- Storage. (Firefox may not mention this one to you.) This add-on needs to store the CSS rules in order for them to persist from session to session.
## CSS rules I use on Instagram.com
```
div._lz6s { position:relative !important;}
div.COOzN { display:none !important;}
div.cGcGK { max-width:100% !important;}
div._9AhH0 {display:none !important; 
/*remove transparent layer over image. enable saving image from context menu.*/}

```
### Your add-on doesn't append '!important' automatically?!!!
