/*-----------------------------------------------------------------------------.
|                 /\______  /\______  ____/\______     __                      |
|                 \____   \/  \__   \/  _ \____   \ __/  \____                 |
|                  / _/  _/    \/   /   /  / _/  _// / / / / /                 |
|                 /  \   \  /\ /   /\  /  /  \   \/ /\  / / /                  |
|                 \__/\   \/RTX______\___/\__/\   \/ / /_/_/                   |
|                      \___)   \__)            \___) \/                        |
|------------------------------------------------------------------------------|
|#################################### JSWM ####################################|
`-----------------------------------------------------------------------------*/

/*jslint white,this,browser,maxlen:80*/
/*global window,jslint*/

var jswm=(function()
{
'use strict';
var _w=window;
var _d=_w.document;
var _u='px';
var _ls=_w.localStorage;

var _i=function(id){return _d.getElementById(String(id));};
var _e=function(e){return _d.createElement(String(e));};
var _t=function(v){return _d.createTextNode(String(v));};
var _r=function(e){return e.parentNode.removeChild(e);};
/*----------------------------------------------------------------------------*/
function wm(cfg) /* constructor */
  {
  cfg.fnt=wm.obj.test(cfg.fnt);
  this.cfg=
    {
    //ver:wm.ver.get(),
    id:wm.str.test(cfg.id,wm.str.rnd(8)),
    el:wm.el.test(cfg.el,_d.body),
    p:wm.integer.test(cfg.p,2),
    b:wm.integer.test(cfg.b,1),
    fnt:
      {
      f:wm.str.test(cfg.fnt.f,'monospace'),
      s:wm.nbr.test(cfg.fnt.s,8),
      h:wm.nbr.test(cfg.fnt.h,wm.nbr.test(cfg.fnt.s,8)+1),
      m:wm.integer.test(cfg.fnt.m,2)
      },
    save:wm.bool.test(cfg.save,true),
    dbg:wm.bool.test(cfg.dbg)
    };
  var sav=wm.ls.get(this.cfg.id);
  if(!wm.obj.isempty(sav)){this.cfg=sav;}
  /*--------------------------------------------------------------------------*/
  var that=this;
  var wdw=function(){};
  wdw.prototype.constructor=wdw;
  wdw.prototype.add=function(p){return wm.wdw.add(that.cfg,p);};
  wdw.prototype.update=function(n,dat){wm.wdw.up(that.cfg,n,dat);};
  this.wdw=new wdw();
  var vs=function(){};
  vs.prototype.constructor=wdw;
  vs.prototype.add=function(p){return wm.vs.add(that.cfg,p);};
  vs.prototype.toggle=function(n){wm.vs.toggle(that.cfg,n);};
  this.vs=new vs();
  /*--------------------------------------------------------------------------*/
  wm.icon();
  wm.img.init();
  wm.init(this.cfg);
  wm.resize(this.cfg);
  wm.ls.save(this.cfg);
  _w.addEventListener('resize',wm.resize.bind(null,this.cfg),false);
  _w.addEventListener('mousedown',wm.mse.down.bind(null,null,this.cfg),false);
  _w.addEventListener('mouseup',wm.mse.up.bind(null,null,this.cfg),false);
  _w.addEventListener('mousemove',wm.mse.move.bind(null,null,this.cfg),false);
  var e=wm.nav.isffx?'DOMMouseScroll':'mousewheel';
  _w.addEventListener(e,wm.mse.wheel.bind(null,null,this.cfg),false);
  _w.addEventListener('selectstart',function(){return false;},false);
  _w.addEventListener('dragstart',function(){return false;},false);
  //_w.addEventListener('contextmenu',function(e){e.preventDefault();},false);
  if(this.cfg.dbg)
    {
    var dbg=wm.wdw.add(this.cfg,
      {
      txt:'debug',
      x:'2%',y:'5%',w:'50%',h:'75%',p:2
      });
    wm.validate(this.cfg,dbg);
    }
  }

wm.prototype=
  {
  get:function(p){return this.cfg[p];},
  set:function(p,v){if(this.cfg[p]!==undefined){this.cfg[p]=v;return true;}}
  };

wm.ver=
  {
  maj:0,min:1,build:8,alpha:true,beta:false,
  get:function()
    {
    var ver=this.maj+'.'+this.min+'.'+this.build;
    if(this.alpha||this.beta){ver+=(this.alpha?'\u03b1':'\u03b2');}
    return ver;
    }
  };
/*----------------------------------------------------------------------------*/
wm.init=function(cfg)
  {
  var el=wm.el.test(cfg.el); if(!el){return false;}
  var html=wm.str.test(el.innerHTML);
  el.innerHTML='';
  /* el style */
  el.style.overflow='hidden';
  el.style.userSelect='none';
  el.style.fontFamily=cfg.fnt.f;
  el.style.fontSize=cfg.fnt.s+_u;
  el.style.lineHeight=cfg.fnt.h+_u;
  el.style.textRendering='geometricPrecision';
  el.style[wm.nav.css()+'user-select']='none';
  /* status */
  var sta=_e('div');
  sta.id='sta-'+cfg.id;
  sta.style.position='absolute';
  sta.style.height=(cfg.fnt.s+cfg.p*2)+_u;
  sta.style.backgroundColor=wm.col.format('bdr');
  sta.style.color=wm.col.format('hdr');
  sta.style.overflow='hidden';
  el.appendChild(sta);
  /* screen */
  wm.vs.add(cfg);
  wm.vs.toggle(cfg,1);
  var icon='<img src='+wm.img.icon.url+' ';
  icon+='width="'+wm.img.icon.w+'" height="'+wm.img.icon.h+'" ';
  icon+='style="float:left;margin-right:'+cfg.p+'px"/>';
  _i('bgd1-'+cfg.id).innerHTML+=icon+html;
  };
/*----------------------------------------------------------------------------*/
wm.sta=
  {
  get:function(cfg){return wm.el.test(_i('sta-'+cfg.id));},
  dbg:function(cfg)
    {
    if(!cfg.dbg){return false;}
    var sta=wm.sta.get(cfg);
    var dbg=_i(sta.id+'-dbg');
    var w=cfg.vs.length*(wm.img.vs.h+cfg.p);
    if(wm.el.test(dbg)){_r(dbg);}
    dbg=_e('div');
    dbg.id=sta.id+'-dbg';
    dbg.style.position='absolute';
    dbg.style.left=(cfg.p+w)+_u;
    dbg.style.top=cfg.p+_u;
    dbg.style.width=(cfg.w-cfg.p*2-w)+_u;
    dbg.style.height=cfg.fnt.s+_u;
    dbg.style.whiteSpace='nowrap';
    dbg.style.textOverflow='ellipsis';
    dbg.style.overflow='hidden';
    var txt='JSWM v'+wm.ver.get()+' | id:'+cfg.id;
    txt+=' | vs:'+wm.vs.get(cfg).n;
    txt+=' | '+cfg.w+'*'+cfg.h;
    txt+=' | evt:'+wm.str.test(wm.obj.test(cfg.evt).a,'---');
    txt+=' | mp:'+wm.mse.x+'*'+wm.mse.y;
    dbg.appendChild(_t(txt));
    if(wm.el.test(sta)){sta.appendChild(dbg);}
    }
  };
/*----------------------------------------------------------------------------*/
wm.vs=
  {
  add:function(cfg,p)
    {
    cfg.vs=wm.arr.test(cfg.vs);
    p=wm.obj.test(p);
    var n=wm.arr.test(cfg.vs).length+1;
    var vs=_e('div');
    vs.id='vs'+n+'-'+cfg.id;
    vs.style.position='absolute';
    vs.style.top=(cfg.fnt.s+cfg.p*2)+_u;
    vs.style.height=cfg.fnt.s+_u;
    vs.style.backgroundColor=wm.col.format('bgd');
    vs.style.color=wm.col.format('hdr');
    vs.style.overflow='hidden';
    /* background */
    var bgd=_e('div');
    bgd.id='bgd'+n+'-'+cfg.id;
    bgd.style.position='absolute';
    bgd.style.padding=cfg.p+_u;
    vs.appendChild(bgd);
    /* name */
    var name=_e('div');
    name.id='name'+n+'-'+cfg.id;
    name.style.position='absolute';
    name.style.color=wm.col.format('txt');
    name.style.textAlign='right';
    name.appendChild(_t(wm.str.test(p.txt,'screen '+n)));
    vs.appendChild(name);
    /* status button */
    var btn=wm.btn('vs'+n+'-'+cfg.id+'-btn','vs');
    btn.style.left=(cfg.p+(n-1)*(wm.img.vs.h+cfg.p))+_u;
    btn.style.top=cfg.p+_u;
    var sta=wm.sta.get(cfg);
    if(wm.el.test(sta))
      {
      sta.appendChild(btn);
      btn.addEventListener('mouseup',wm.vs.toggle.bind(null,cfg,n),false);
      }
    /* init */
    cfg.el.appendChild(vs);
    cfg.vs.push({n:n,el:vs});
    wm.vs.init(cfg,n);
    wm.vs.toggle(cfg,n);
    wm.sta.dbg(cfg);
    },
  init:function(cfg,n)
    {
    var vs=wm.vs.get(cfg,n);
    var el=vs.el; if(!wm.el.test(el)){return false;}
    el.style.width=cfg.w+_u;
    el.style.height=(cfg.h-cfg.fnt.s-cfg.p*2)+_u;
    var bgd=_i('bgd'+vs.n+'-'+cfg.id);
    if(wm.el.test(bgd))
      {
      bgd.style.width=(cfg.w-cfg.p*2)+_u;
      bgd.style.height=(cfg.h-cfg.p*2)+_u;
      }
    var name=_i('name'+vs.n+'-'+cfg.id);
    if(wm.el.test(name))
      {
      name.style.top=(el.offsetHeight-cfg.fnt.s-cfg.p)+_u;
      name.style.width=(el.offsetWidth-cfg.p*2)+_u;
      }
    },
  toggle:function(cfg,n)
    {
    n=wm.integer.test(n,1);
    wm.arr.test(cfg.vs).forEach(function(vs)
      {
      vs.toggle=(vs.n===n);
      vs.el.style.zIndex=vs.toggle?1:0;
      var btn=_i('vs'+vs.n+'-'+cfg.id+'-btn');
      if(wm.el.test(btn))
        {
        var x=vs.toggle?wm.img.vs.h:0;
        btn.style.backgroundPosition='-'+x+_u+' 0'+_u;
        }
      });
    },
  get:function(cfg,n)
    {
    cfg.vs=wm.arr.test(cfg.vs);
    n=wm.integer.test(n);
    var v={};
    if(n===0)
      {
      cfg.vs.forEach(function(vs){if(vs.toggle){v=vs;}});
      }
    else
      {
      n=wm.math.clamp(n,1,cfg.vs.length);
      cfg.vs.forEach(function(vs){if(vs.n===n){v=vs;}});
      }
    return v;
    },
  insert:function(cfg,el)
    {
    var vs=_i('bgd'+wm.vs.get(cfg).n+'-'+cfg.id);
    if(wm.el.test(vs)){vs.appendChild(el);}
    }
  };
/*----------------------------------------------------------------------------*/
/* TODO
   add callback to config (enable refresh button) */
wm.wdw=
  {
  add:function(cfg,p)
    {
    if(wm.obj.isempty(cfg)){return false;}
    cfg.wdw=wm.arr.test(cfg.wdw);
    var el=wm.el.test(p.el,wm.vs.get(cfg).el); if(!el){return false;}
    var n=cfg.wdw.length+1; /* TODO better */
    p=wm.obj.test(p);
    p.hdr=wm.bool.test(p.hdr,true);
    p.txt=wm.str.test(p.txt,'window '+n);
    /* window */
    var wdw=_e('div');
    wdw.id='wdw'+n+'-'+cfg.id;
    wdw.style.position='absolute';
    wdw.style.backgroundColor=wm.col.format('bdr');
    wdw.style.zIndex=n;
    /* header */
    if(p.hdr)
      {
      var hdr=_e('div');
      hdr.id=wdw.id+'-hdr';
      hdr.style.position='absolute';
      hdr.style.height=(cfg.fnt.s+cfg.p*2)+_u;
      hdr.style.backgroundColor=wm.col.format('bdr');
      wdw.appendChild(hdr);
      var txt=_e('div');
      txt.id=wdw.id+'-txt';
      txt.style.position='absolute';
      txt.style.top=cfg.p+_u;
      txt.style.left=cfg.p+_u;
      txt.style.height=cfg.fnt.s+_u;
      txt.style.lineHeight=cfg.fnt.s+_u;
      txt.style.whiteSpace='nowrap';
      txt.style.textOverflow='ellipsis';
      txt.style.overflow='hidden';
      txt.style.cursor='move';
      txt.appendChild(_t(p.txt));
      hdr.appendChild(txt);
      txt.addEventListener('mousedown',wm.wdw.mv.down.bind(null,cfg,n),false);
      /* buttons */
      var btn=wm.btn('wdw'+n+'-'+cfg.id+'-del','wdw');
      btn.style.top=cfg.p+_u;
      btn.addEventListener('mouseup',wm.wdw.del.bind(null,cfg,n),false);
      hdr.appendChild(btn);
      btn=wm.btn('wdw'+n+'-'+cfg.id+'-exp','wdw',1);
      btn.style.top=cfg.p+_u;
      //btn.addEventListener('mouseup',wm.wdw.exp.bind(null,cfg,n),false);
      hdr.appendChild(btn);
      btn=wm.btn('wdw'+n+'-'+cfg.id+'-rsz','wdw',3);
      btn.style.cursor='nwse-resize';
      btn.style.zIndex=1;
      btn.addEventListener('mousedown',wm.wdw.rsz.down.bind(null,cfg,n),false);
      wdw.appendChild(btn);
      }
    /* background */
    var bgd=_e('div');
    bgd.id=wdw.id+'-bgd';
    bgd.style.position='absolute';
    bgd.style.left=cfg.b+_u;
    bgd.style.top=(p.hdr?cfg.fnt.s+cfg.p*2:cfg.b)+_u;
    bgd.style.backgroundColor=wm.col.format('wdw');
    bgd.style.overflow='hidden';
    wdw.appendChild(bgd);
    /* content */
    var con=_e('div');
    con.id=wdw.id+'-con';
    con.style.position='absolute';
    con.style.color=wm.col.format('txt');
    con.style.padding=wm.integer.test(p.p)+_u;
    bgd.appendChild(con);
    /* init */
    el.appendChild(wdw);
    cfg.wdw.push({n:n,el:wdw,p:p});
    wm.wdw.init(cfg,n);
    return n;
    },
  init:function(cfg,n)
    {
    var wdw=wm.wdw.get(cfg,n);
    var el=wm.el.test(wdw.el); if(!el){return false;}
    var p=wm.obj.test(wdw.p);
    var x=wm.size.get(wdw,p.x,'x');
    var y=wm.size.get(wdw,p.y,'y');
    var w=wm.size.get(wdw,p.w,'w');
    var h=wm.size.get(wdw,p.h,'h');
    var pn=el.parentNode;
    w=wm.math.clamp(w,8*3+cfg.p*2,pn.offsetWidth);
    h=wm.math.clamp(h,cfg.fnt.s+cfg.p*2,pn.offsetHeight);
    x=wm.math.clamp(x,0,pn.offsetWidth-w);
    y=wm.math.clamp(y,0,pn.offsetHeight-h);
    el.style.left=x+_u;
    el.style.top=y+_u;
    el.style.width=w+_u;
    el.style.height=h+_u;
    var bgd=_i(el.id+'-bgd');
    if(wm.el.test(bgd))
      {
      bgd.style.width=(w-cfg.b*2)+_u;
      bgd.style.height=(h-(p.hdr?cfg.fnt.s+cfg.p*2:cfg.b)-cfg.b)+_u;
      }
    var btn=_i(el.id+'-rsz');
    if(wm.el.test(btn))
      {
      btn.style.left=(w-cfg.b-wm.img.wdw.h)+_u;
      btn.style.top=(h-cfg.b-wm.img.wdw.h)+_u;
      }
    if(p.hdr)
      {
      var hdr=_i(el.id+'-hdr');
      if(wm.el.test(hdr)){hdr.style.width=w+_u;}
      var txt=_i(el.id+'-txt');
      if(wm.el.test(txt))
        {
        txt.style.width=(w-cfg.p*2-2*(wm.img.wdw.h+cfg.p))+_u;
        if(cfg.dbg)
          {
          txt.innerText='';
          txt.appendChild(_t(wdw.p.txt+' | z='+el.style.zIndex+' | '+w+'*'+h));
          }
        }
      btn=_i(el.id+'-del');
      if(wm.el.test(btn)){btn.style.left=(w-cfg.p-wm.img.wdw.h)+_u;}
      btn=_i(el.id+'-exp');
      if(wm.el.test(btn)){btn.style.left=(w-(cfg.p+wm.img.wdw.h)*2)+_u;}
      }
    },
  mv:
    {
    down:function(cfg,n)
      {
      cfg.evt={t:'wdw',a:'mv',n:n};
      wm.wdw.box(cfg,n);
      var box=_i('box-'+cfg.id); if(!wm.el.test(box)){return false;}
      cfg.mse={x:wm.mse.x-box.offsetLeft,y:wm.mse.y-box.offsetTop};
      },
    up:function(cfg,n)
      {
      delete cfg.evt;
      var wdw=wm.wdw.get(cfg,n);
      var box=_i('box-'+cfg.id);
      if(wm.el.test(box))
        {
        wdw.el.style.left=box.offsetLeft+_u;
        wdw.el.style.top=box.offsetTop+_u;
        wdw.p.x=wm.size.set(wdw,box.offsetLeft,'x');
        wdw.p.y=wm.size.set(wdw,box.offsetTop,'y');
        }
      _r(box);
      },
    move:function(cfg,n)
      {
      var box=_i('box-'+cfg.id);
      if(wm.el.test(box))
        {
        box.style.left=(wm.mse.x-cfg.mse.x)+_u;
        box.style.top=(wm.mse.y-cfg.mse.y)+_u;
        }
      }
    },
  rsz:
    {
    down:function(cfg,n)
      {
      cfg.evt={t:'wdw',a:'rsz',n:n};
      wm.wdw.box(cfg,n);
      var box=_i('box-'+cfg.id); if(!wm.el.test(box)){return false;}
      cfg.mse={x:wm.mse.x-box.offsetWidth,y:wm.mse.y-box.offsetHeight};
      },
    up:function(cfg,n)
      {
      delete cfg.evt;
      var wdw=wm.wdw.get(cfg,n);
      var box=_i('box-'+cfg.id);
      if(wm.el.test(box))
        {
        wdw.p.w=wm.size.set(wdw,box.offsetWidth,'w');
        wdw.p.h=wm.size.set(wdw,box.offsetHeight,'h');
        wm.wdw.init(cfg,wdw.n);
        }
      _r(box);
      },
    move:function(cfg,n)
      {
      var box=_i('box-'+cfg.id);
      if(wm.el.test(box))
        {
        box.style.width=(wm.mse.x-cfg.mse.x)+_u;
        box.style.height=(wm.mse.y-cfg.mse.y)+_u;
        }
      }
    },
  del:function(cfg,n)
    {
    n=wm.integer.test(n);
    cfg.wdw.forEach(function(wdw,i)
      {
      if(wdw.n===n)
        {
        wdw.el.style.display='none';
        _r(wdw.el);
        cfg.wdw.splice(i,1);
        wm.ls.save(cfg);}
      });
    },
  get:function(cfg,n)
    {
    cfg.wdw=wm.arr.test(cfg.wdw);
    n=wm.math.clamp(wm.integer.test(n),1,cfg.wdw.length);
    var v={};
    cfg.wdw.forEach(function(wdw){if(wdw.n===n){v=wdw;}});
    return v;
    },
  up:function(cfg,n,dat)
    {
    var wdw=wm.wdw.get(cfg,n).el; if(!wm.el.test(wdw)){return false;}
    var el=_i(wdw.id+'-con');
    if(wm.el.test(el)){el.innerHTML=wm.str.test(dat,'no data');}
    wm.wdw.init(cfg,n);
    },
  box:function(cfg,n)
    {
    var wdw=wm.wdw.get(cfg,n).el; if(!wm.el.test(wdw)){return false;}
    var el=_i('box-'+cfg.id);
    if(wm.el.test(el)){_r(el);}
    el=_e('div');
    el.id='box-'+cfg.id;
    el.style.position='absolute';
    el.style.left=wdw.offsetLeft+_u;
    el.style.top=wdw.offsetTop+_u;
    el.style.width=(wdw.offsetWidth-cfg.b*2)+_u;
    el.style.height=(wdw.offsetHeight-cfg.b*2)+_u;
    el.style.borderStyle='solid';
    el.style.borderWidth=cfg.b+_u;
    el.style.borderColor=wm.col.format('sel');
    el.style.cursor='move';
    el.style.zIndex=1024;
    wm.vs.insert(cfg,el);
    }
  };
/*----------------------------------------------------------------------------*/
wm.btn=function(id,img,n)
  {
  img=wm.obj.test(wm.img[img]);
  n=wm.integer.test(n);
  var el=_e('div');
  el.id=id;
  el.style.backgroundImage='url('+img.url+')';
  el.style.backgroundPosition='-'+(img.h*n)+_u+' 0'+_u;
  el.style.position='absolute';
  el.style.width=img.h+_u;
  el.style.height=img.h+_u;
  el.style.cursor='pointer';
  return el;
  };
/*----------------------------------------------------------------------------*/
wm.size=
  {
  set:function(obj,n,o)
    {
    obj=wm.obj.test(obj);
    if(!wm.el.test(obj.el)){return 0;}
    obj.p=wm.obj.test(obj.p);
    o=(/^(x|y|w|h)$/).test(String(o))?o:'w';
    if(!(/%/).test(obj.p[o]))
      {
      return wm.integer.test(n);
      }
    else
      {
      var pn=obj.el.parentNode;
      n=wm.nbr.test(n);
      var v='offset'+((/x|w/).test(o)?'Width':'Height');
      return (Math.round((n/pn[v]*100)*100)/100)+'%';
      }
    },
  get:function(obj,n,o)
    {
    obj=wm.obj.test(obj);
    if(!wm.el.test(obj.el)){return 0;}
    obj.p=wm.obj.test(obj.p);
    o=(/^(x|y|w|h)$/).test(String(o))?o:'w';
    if(!(/%/).test(obj.p[o]))
      {
      return wm.integer.test(n);
      }
    else
      {
      var pn=obj.el.parentNode;
      n=wm.nbr.test(n);
      var v='offset'+((/x|w/).test(o)?'Width':'Height');
      return wm.integer.test(pn[v]/100*n);
      }
    }
  };
/*----------------------------------------------------------------------------*/
wm.resize=function(cfg)
  {
  cfg.w=cfg.el.offsetWidth;
  cfg.h=cfg.el.offsetHeight;
  var sta=wm.sta.get(cfg);
  if(wm.el.test(sta))
    {
    sta.style.width=cfg.w+_u;
    wm.sta.dbg(cfg);
    }
  wm.arr.test(cfg.vs).forEach(function(vs){wm.vs.init(cfg,vs.n);});
  wm.arr.test(cfg.wdw).forEach(function(wdw){wm.wdw.init(cfg,wdw.n);});
  };
/*----------------------------------------------------------------------------*/
wm.bool=
  {
  test:function(b,d)
    {
    return (typeof b==='boolean')?b:((typeof d==='boolean')?d:false);
    }
  };

wm.nbr=
  {
  parse:function(n){return Number(String(n).replace(/[^0-9\.\,\-\+]/g,''));},
  test:function(n,d){return wm.nbr.parse((n!==undefined&&n!==null)?n:d);}
  };

wm.integer=
  {
  test:function(n,d)
    {
    return parseInt(wm.nbr.parse((n!==undefined&&n!==null)?n:d),10);
    }
  };

wm.str=
  {
  test:function(s,d)
    {
    return (typeof s==='string')?s:((typeof d==='string')?d:'');
    },
  rnd:function(n)
    {
    var s;var l;var str='';var i=0;
    while(i<n)
      {
      if(Math.floor(Math.random()*2))
        {
        s=48;
        l=10;
        }
      else
        {
        s=Math.floor(Math.random()*2)?65:97;
        l=26;
        }
      str+=String.fromCharCode(s+Math.floor(Math.random()*l));
      i+=1;
      }
    return str;
    }
  };

wm.arr=
  {
  test:function(a,d)
    {
    if(typeof a==='object'&&a!==null&&Array.isArray(a)){return a;}
    return (typeof d==='object'&&d!==null&&Array.isArray(d))?d:[];
    },
  isempty:function(a)
    {
    a=wm.arr.test(a);
    return (a.length===0||(a.length===1&&wm.str.test(a[0])===''));
    }
  };

wm.obj=
  {
  test:function(o,d)
    {
    if(typeof o==='object'&&o!==null&&!Array.isArray(o)){return o;}
    return (typeof d==='object'&&d!==null&&!Array.isArray(d))?d:{};
    },
  isempty:function(o)
    {
    return (Object.getOwnPropertyNames(wm.obj.test(o)).length===0);
    },
  clone:function(o)
    {
    return JSON.parse(JSON.stringify(wm.obj.test(o)));
    }
  };

wm.fn=
  {
  test:function(f){return (typeof f==='function');}
  };

wm.el=
  {
  test:function(o,d)
    {
    if(typeof o==='string'){o=_i(o);}
    if(typeof o==='object'&&o!==null&&o.tagName!==null){return o;}
    if(typeof d==='string'){d=_i(d);}
    return (typeof d==='object'&&d!==null&&d.tagName!==null)?d:false;
    }
  };

wm.math=
  {
  clamp:function(n,min,max)
    {
    n=wm.nbr.test(n);
    min=(n!==undefined&&n!==null)?wm.nbr.test(min):n;
    max=(n!==undefined&&n!==null)?wm.nbr.test(max):n;
    return Math.max(min,Math.min(n,max));
    },
  interpolate:function(a,b,n,i)
    {
    a=wm.nbr.test(a);
    b=wm.nbr.test(b);
    return a+(b-a)/wm.nbr.test(n)*wm.nbr.test(i);
    }
  };

wm.time=
  {
  get:function(){return (new Date()).getTime();}
  };

wm.nav=
  {
  ischrome:(/chrome/i).test(_w.navigator.userAgent),
  isffx:(/firefox/i).test(_w.navigator.userAgent),
  isie:(/msie/i).test(_w.navigator.userAgent),
  css:function()
    {
    if(wm.nav.ischrome){return '-webkit-';}
    if(wm.nav.isffx){return '-moz-';}
    if(wm.nav.isie){return '-ms-';}
    return '';
    }
  };
/*----------------------------------------------------------------------------*/
wm.mse=
  {
  x:0,
  y:0,
  fn:function(cfg)
    {
    cfg.evt=wm.obj.test(cfg.evt);
    var t=wm.str.test(cfg.evt.t);
    var a=wm.str.test(cfg.evt.a);
    if(wm.obj.isempty(wm[t])){return false;}
    if(wm.obj.isempty(wm[t][a])){return false;}
    if(wm.fn.test(wm[t][a][wm.mse.e])){wm[t][a][wm.mse.e](cfg,cfg.evt.n);}
    },
  down:function(e,cfg)
    {
    e=e||_w.event;
    wm.mse.o={x:e.pageX,y:e.pageY};
    wm.mse.e='down';
    wm.mse.fn(cfg);
    wm.sta.dbg(cfg);
    },
  up:function(e,cfg)
    {
    e=e||_w.event;
    wm.mse.e='up';
    wm.mse.fn(cfg);
    wm.sta.dbg(cfg);
    },
  move:function(e,cfg)
    {
    e=e||_w.event;
    wm.mse.x=e.pageX;
    wm.mse.y=e.pageY;
    wm.mse.e='move';
    wm.mse.fn(cfg);
    wm.sta.dbg(cfg);
    e.preventDefault();
    },
  wheel:function(e)
    {
    e=e||_w.event;
    wm.mse.e='wheel';
    var delta=e.wheelDelta/180;
    e.preventDefault();
    }
  };
/*----------------------------------------------------------------------------*/
wm.ls=
  {
  test:function()
    {
    if(!wm.nav.isffx&&!wm.nav.isie)
      {
      return (_w.hasOwnProperty('localStorage')&&_ls!==null);
      }
    else
      {
      return (_ls!==undefined);
      }
    },
  get:function(cfg)
    {
    if(!wm.ls.test()||!cfg.save){return {};}
    return wm.obj.test(_w.JSON.parse(_ls.getItem(cfg.id)));
    },
  save:function(cfg)
    {
    if(wm.ls.test()&&cfg.save){_ls.setItem(cfg.id,_w.JSON.stringify(cfg));}
    },
  reset:function(cfg){if(wm.ls.test()){delete _ls[cfg.id];}}
  };
/*----------------------------------------------------------------------------*/
wm.col=
  {
  list:
    {
    bdr:[0,0,0],
    bgd:[128,128,128],
    wdw:[144,144,144],
    txt:[208,208,208],
    hdr:[248,248,248],
    btn:[64,160,192],
    sel:[192,80,80]
    },
  format:function(col)
    {
    col=wm.arr.test(wm.col.list[col],[0,0,0]);
    return '#'+col.map(function(v)
      {
      return String('0'+wm.math.clamp(v,0,255).toString(16)).slice(-2);
      }).join('');
    },
  parse:function(col)
    {
    col=wm.str.test(col,'#000');
    var i=0;var c=[0,0,0];
    if(col.charAt(0)==='#'){col=col.slice(1);}
    if(col.length===3){while(i<3){c[i]=parseInt(col[i]+col[i],16);i+=1;}}
    if(col.length===6){while(i<3){c[i]=parseInt(col.substr(i*2,2),16);i+=1;}}
    return c;
    }
  };
/*----------------------------------------------------------------------------*/
wm.img=
  {
  init:function()
    {
    var map=[ /* 16*8 */
    '1111111111111111',
    '1      11      1',
    '1 6    11 5555 1',
    '1  6   11 5555 1',
    '1   6  11 5555 1',
    '1    6 11 5555 1',
    '1      11      1',
    '1111111111111111'];
    wm.img.gen(map,'vs');
    map=[ /* 16*8 */
    ' 5    5 55555555      0        0',
    '555  5555   5  5     00       05',
    ' 555555 5   5  5    050      055',
    '  5555  5   5  5   0550     0555',
    '  5555  55555  5  05550    05555',
    ' 555555 5      5 055550   055555',
    '555  5555      50000000  0555555',
    ' 5    5 55555555        05555555'];
    wm.img.gen(map,'wdw');
    },
  gen:function(map,name,force)
    {
    map=wm.arr.test(map);
    name=wm.str.test(name);
    if(!wm.bool.test(force)&&!wm.obj.isempty(wm.img[name])){return false;}
    var cvs=_e('canvas');
    cvs.width=wm.str.test(map[0]).length;
    cvs.height=map.length;
    var ctx=cvs.getContext('2d');
    //ctx.imageSmoothingEnabled=false;
    Object.getOwnPropertyNames(wm.obj.test(wm.col.list)).forEach(function(c,i)
      {
      ctx.fillStyle=wm.col.format(c);
      ctx.beginPath();
      map.forEach(function(v,y)
        {
        v.split('').forEach(function(v,x)
          {
          if(v===' '){return false;}
          if(i===wm.integer.test(v)){ctx.rect(x,y,1,1);}
          });
        });
      ctx.closePath();
      ctx.fill();
      });
    wm.img[name]=
      {
      url:cvs.toDataURL(),
      w:cvs.width,
      h:cvs.height
      };
    }
  };

wm.icon=function()
  {
  var map=[ /* 16*16 */
  '0000000000000000',
  '0501010000000000',
  '0000000000000000',
  '0111111111111110',
  '0100000000011110',
  '0104044000011110',
  '0100000000000010',
  '0102222222000010',
  '0102332332000010',
  '0102323332022010',
  '0102222225022010',
  '0100000000022010',
  '0111102222225010',
  '0111100000000010',
  '0111111111111110',
  '0000000000000000'];
  wm.img.gen(map,'icon');
  var icon=_e('link');
  icon.rel='icon';
  icon.type='image/png';
  icon.href=wm.img.icon.url;
  _d.head.appendChild(icon);
  };
/*----------------------------------------------------------------------------*/
wm.validate=function(cfg,wdw)
  {
  var xhr=new _w.XMLHttpRequest();
  xhr.open('GET',_i('code').src+'?v='+wm.str.rnd(32),true);
  xhr.setRequestHeader('Content-Type','application/javascript');
  xhr.onreadystatechange=function()
    {
    if(xhr.readyState===4&&xhr.status===200)
      {
      var lint=jslint(xhr.responseText);
      var err=wm.arr.test(lint.warnings);
      var n=err.length;
      var txt=n+' error'+((n>0)?'s':'')+' found '+((n===0)?'\\:D/':':(');
      txt+=(n>0?'<br><br>':'');
      txt+='<table cellpadding="0" cellspacing="0">';
      err.forEach(function(v)
        {
        txt+='<tr><td>[</td>';
        txt+='<td align="right">'+(v.line+1)+',&nbsp;</td>';
        txt+='<td align="right">'+v.column+']&nbsp;</td>';
        txt+='<td style="white-space:nowrap">'+v.message+'</td></tr>';
        });
      txt+='</table>';
      wm.wdw.up(cfg,wdw,txt);
      }
    };
  xhr.send();
  };

return wm;
})();
