var RULES={};
// body{border: 5px solid yellow !important;}
// instagram.com    @media all and (max-width: 1250px){div._lz6s { display:none !important;}}
const store=restoreOptions();
store.then((res)=>{
    browser.browserAction.onClicked.addListener(openOption);
    browser.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{injectCSS(tab.url);});
});


function restoreOptions(){
    const storageItem = browser.storage.local.get('custard');
    return storageItem.then((res) => {
        if(res.custard){
            RULES=res.custard;
            /* console.log("read rules");
             * console.log(RULES); */
        }
    });
}

function openOption(){
    browser.tabs.create({url:'/extension.html'});
}


function injectCSS(s){
    const u=new URL(s);
    //console.log(`rule: ${getRule(u.hostname)}`);
    browser.tabs.insertCSS({code:getRule(u.hostname),cssOrigin:"user"});
}


function getRule(hostname){
    //my dumb way of selecting the CSS rule to inject for matching host name from most specific to least specific,
    //For example: if rules for both www.example.com and example.com exist, the one will be applied is the one for www.example.com.
    let h=hostname.split('.');
    let r;
    for (let i=0;i<h.length;i++){
        r=RULES[h.slice(i).join('.')];
        if (r){
            return r;
        }
    }
    return  RULES[''];

}


