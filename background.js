var RULES={};

const store=restoreOptions();
store.then((res)=>{
    browser.contentScripts.register({js:[{file:"/content.js"}],matches:["<all_urls>"],runAt:'document_start'});
        
    browser.runtime.onMessage.addListener((message,sender)=>{
        injectCSS(sender.tab);
    });
});


function restoreOptions(){
    const storageItem = browser.storage.local.get('custard');
    return storageItem.then((res) => {
        if(res.custard){
            RULES=res.custard;
        }
    });
}

function openOption(){
    browser.tabs.create({url:'/extension.html'});
}


function injectCSS(tab){
    const u=new URL(tab.url);
    browser.tabs.insertCSS(tab.id,{code:getRule(u.hostname),cssOrigin:"user"});
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


