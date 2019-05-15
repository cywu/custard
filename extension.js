var page=browser.extension.getBackgroundPage();
document.addEventListener("DOMContentLoaded",(e)=>{
    const target=document.getElementById("target");
    target.appendChild(makeTableNode(page.RULES));
    document.querySelector("form").addEventListener("submit", saveOptions);
    document.getElementsByName("addrow").forEach((i)=>i.addEventListener("click",addRow));
    document.getElementsByName("delrow").forEach((i)=>i.addEventListener("click",(e)=>{delRow(e);}));

});


//populate page using the RULES var in background.js
function makeTableNode(r){
    //the container div
    const node=document.createElement('div');
    
    node.setAttribute('id','container');
    
    for(const [k,v] of Object.entries(r)){
        node.appendChild(makeRowNode(k,v));
    }
    return node;
}

function delRow(e){
    e.target.parentNode.remove();
}

function addRow(){
    const node=document.getElementById('container');
    node.appendChild(makeRowNode('',''));
    document.getElementsByName("delrow").forEach((i)=>i.addEventListener("click",(e)=>{delRow(e);}));
    
}

function makeRowNode(k,v){
    const row=document.createElement("div");
    row.setAttribute('class','row');
    const site=document.createElement("div");
    const tsite=document.createElement("input");
    tsite.setAttribute('name','site');
    tsite.setAttribute('type','text');
    tsite.setAttribute('value',k);
    site.appendChild(tsite);

    const bdelrow=document.createElement("button");
    bdelrow.setAttribute('name','delrow');
    bdelrow.setAttribute('type','button');
    bdelrow.appendChild(document.createTextNode('Delete'));
    site.appendChild(bdelrow);
    
    const style=document.createElement("div");
    const tastyle=document.createElement("textarea");
    tastyle.setAttribute('name','style');
    tastyle.setAttribute('rows','5');
    style.appendChild(tastyle);
    tastyle.appendChild(document.createTextNode(v));
    
    row.appendChild(site);
    row.appendChild(bdelrow);
    row.appendChild(style);

    return row;
}

function saveOptions(e) {
    //TODO: disable UI for integrity
    const keys=document.getElementsByName('site');
    const vals=document.getElementsByName('style');

    let o={};
    for (let i=0;i<keys.length;i++){
        //computed property name needs square bracket...
        o=Object.assign(o,{ [keys[i].value] : vals[i].value});
    }
    
    const storageItem=browser.storage.local.set({
        custard: o
    });

    storageItem.then((res) => {
        page.restoreOptions();
    });
    
    e.preventDefault();

    //TODO: enable UI after saving is done
}

//TODO: remove history entry for opening this option page
