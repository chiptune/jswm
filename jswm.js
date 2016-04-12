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

/*jslint white,this,maxlen:80*/
/*global window,jslint*/

var jswm=(function(cfg)
{
'use strict';
var _w=window,_d=_w.document,_u='px';

function wm(cfg) /* constructor */
  {
  cfg.fnt=wm.obj.test(cfg.fnt);
  this.cfg=
    {
    ver:wm.version.get(),
    id:wm.str.test(cfg.id,wm.str.rand(8)),
    el:wm.el.test(cfg.el,_d.body),
    dbg:wm.bool.test(cfg.dbg),
    m:wm.integer.test(cfg.m,2),
    p:wm.integer.test(cfg.p,2),
    b:wm.integer.test(cfg.b,1),
    fnt:
      {
      type:wm.str.test(cfg.fnt.type,'monospace'),
      size:wm.integer.test(cfg.fnt.size,8),
      h:wm.integer.test(cfg.fnt.h,9),
      m:wm.integer.test(cfg.fnt.m,2)
      },
    css:wm.client.css()
    };
  wm.icon(this.cfg);
  wm.init(this.cfg);
  wm.resize(this.cfg);
  _w.addEventListener('resize',wm.resize.bind(null,this.cfg),false);
  //_w.addEventListener('contextmenu',function(e){e.preventDefault();},false);
  if(this.cfg.dbg)
    {
    wm.wdw.add(this.cfg,{x:'2%',y:'5%',w:'50%',h:'75%'});
    }
  }

wm.prototype.get=function(p){return this.cfg[p];};
wm.prototype.wdw={};
wm.prototype.wdw.add=function(cfg,p){wm.wdw.add(cfg,p);};

wm.i=function(id){return _d.getElementById(String(id));};
wm.e=function(e){return _d.createElement(String(e));};
wm.t=function(v){return _d.createTextNode(String(v));};
wm.r=function(e){return e.parentNode.removeChild(e);};

wm.version=
  {
  maj:0,min:1,build:4,alpha:true,beta:false,
  get:function()
    {
    var v=wm.version,ver=v.maj+'.'+v.min+'.'+v.build;
    if(v.alpha||v.beta){ver+=(v.alpha?'\u03b1':'\u03b2');}
    return ver;
    }
  };
/*----------------------------------------------------------------------------*/
wm.init=function(cfg)
  {
  var el=cfg.el,sta,scr,html=cfg.el.innerHTML,icon;
  el.innerHTML='';
  /* el style */
  el.style.overflow='hidden';
  el.style.userSelect='none';
  el.style.fontFamily=cfg.fnt.type;
  el.style.fontSize=cfg.fnt.size+_u;
  el.style.lineHeight=cfg.fnt.h+_u;
  el.style[cfg.css+'user-select']='none';
  /* status */
  sta=wm.e('div');
  sta.id='sta-'+cfg.id;
  sta.style.position='absolute';
  sta.style.top='0'+_u;
  sta.style.height=cfg.fnt.size+_u;
  sta.style.padding=cfg.p+_u;
  sta.style.backgroundColor=wm.col.format(wm.col.bdr);
  sta.style.color=wm.col.format(wm.col.txt);
  el.appendChild(sta);
  /* screen */
  scr=wm.e('div');
  scr.id='scr-'+cfg.id;
  scr.style.top=cfg.p+_u;
  scr.style.left=cfg.p+_u;
  scr.style.float='left';
  sta.appendChild(scr);
  wm.scr.add(cfg);
  wm.scr.add(cfg);
  wm.scr.add(cfg);
  wm.scr.toggle(cfg,1);
  icon='<img src='+wm.img.icon.url+' ';
  icon+='width="'+wm.img.icon.w+'" height="'+wm.img.icon.h+'" ';
  icon+='style="float:left;margin-right:'+cfg.p+'px"/>';
  wm.i('bgd1-'+cfg.id).innerHTML+=icon+html;
  };
/*----------------------------------------------------------------------------*/
wm.scr=
  {
  add:function(cfg)
    {
    cfg.scr=wm.arr.test(cfg.scr);
    var n,scr,bgd,name,btn,map,el;
    n=wm.arr.test(cfg.scr).length+1;
    scr=wm.e('div');
    scr.id='scr'+n+'-'+cfg.id;
    scr.style.position='absolute';
    scr.style.top=(cfg.fnt.size+cfg.p*2)+_u;
    scr.style.height=cfg.fnt.size+_u;
    scr.style.backgroundColor=wm.col.format(wm.col.bgd);
    scr.style.color=wm.col.format(wm.col.txt);
    /* background */
    bgd=wm.e('div');
    bgd.id='bgd'+n+'-'+cfg.id;
    bgd.style.position='absolute';
    bgd.style.padding=cfg.p+_u;
    scr.appendChild(bgd);
    /* name */
    name=wm.e('div');
    name.id='name'+n+'-'+cfg.id;
    name.style.position='absolute';
    name.style.color=wm.col.format(wm.col.btn);
    name.style.textAlign='right';
    name.appendChild(wm.t('screen '+n));
    scr.appendChild(name);
    /* status icon */
    map=[ /* 16*8 */
    'XXXXXXXXXXXXXXXX',
    'X______XX______X',
    'X_X____XX_XXXX_X',
    'X__X___XX_XXXX_X',
    'X___X__XX_XXXX_X',
    'X____X_XX_XXXX_X',
    'X______XX______X',
    'XXXXXXXXXXXXXXXX'];
    wm.img.gen(map,'scr',wm.col.bgd);
    btn=wm.e('div');
    btn.id='scr'+n+'-'+cfg.id+'-btn';
    btn.style.backgroundImage='url('+wm.img.scr.url+')';
    btn.style.float='left';
    btn.style.width=wm.integer.test(wm.img.scr.w/2)+_u;
    btn.style.height=wm.img.scr.h+_u;
    btn.style.marginRight=cfg.m+_u;
    btn.style.cursor='pointer';
    el=wm.i('scr-'+cfg.id);
    if(wm.el.test(el))
      {
      el.appendChild(btn);
      btn.addEventListener('click',wm.scr.toggle.bind(null,cfg,n),false);
      }
    /* init */
    cfg.el.appendChild(scr);
    cfg.scr.push({n:n,el:scr});
    wm.scr.toggle(cfg,n);
    },
  toggle:function(cfg,n)
    {
    n=wm.integer.test(n,1);
    wm.arr.test(cfg.scr).forEach(function(scr)
      {
      scr.toggle=(scr.n===n);
      scr.el.style.zIndex=scr.toggle?1:0;
      var btn=wm.i('scr'+scr.n+'-'+cfg.id+'-btn'),x;
      if(wm.el.test(btn))
        {
        x='-'+(scr.toggle?wm.integer.test(wm.img.scr.w/2):0)+_u+' 0'+_u;
        btn.style.backgroundPosition=x;
        }
      });
    },
  get:function(cfg,n)
    {
    cfg.scr=wm.arr.test(cfg.scr);
    n=wm.integer.test(n);
    var v={};
    if(n===0)
      {
      cfg.scr.forEach(function(scr){if(scr.toggle){v=scr;}});
      }
    else
      {
      n=wm.math.clamp(n,1,cfg.scr.length);
      cfg.scr.forEach(function(scr){if(scr.n===n){v=scr;}});
      }
    return v;
    }
  };
/*----------------------------------------------------------------------------*/
wm.wdw=
  {
  add:function(cfg,p)
    {
    cfg.wdw=wm.arr.test(cfg.wdw);
    p=wm.obj.test(p);
    p.hdr=wm.bool.test(p.hdr,true);
    var n,wdw,hdr,bgd,el;
    el=wm.el.test(p.el,wm.scr.get(cfg).el); if(!el){return false;}
    n=cfg.wdw.length+1; /* TODO better */
    /* window */
    wdw=wm.e('div');
    wdw.id='wdw'+n+'-'+cfg.id;
    wdw.style.position='absolute';
    wdw.style.backgroundColor=wm.col.format(wm.col.bdr);
    wdw.style.zIndex=n;
    /* header */
    if(p.hdr)
      {
      hdr=wm.e('div');
      hdr.id=wdw.id+'-hdr';
      hdr.style.position='absolute';
      hdr.style.height=cfg.fnt.size+_u;
      hdr.style.padding=cfg.p+_u;
      hdr.style.backgroundColor=wm.col.format(wm.col.bdr);
      wdw.appendChild(hdr);
      }
    /* bgd */
    bgd=wm.e('div');
    bgd.id=wdw.id+'-bgd';
    bgd.style.position='absolute';
    bgd.style.left=cfg.b+_u;
    bgd.style.top=(cfg.b+(p.hdr?cfg.fnt.size+cfg.p*2:0))+_u;
    bgd.style.backgroundColor=wm.col.format(wm.col.bgd);
    wdw.appendChild(bgd);
    /* init */
    el.appendChild(wdw);
    cfg.wdw.push({n:n,el:wdw,p:p});
    wm.wdw.resize(cfg,n);
    return n;
    },
  resize:function(cfg,n)
    {
    var dat=wm.wdw.get(cfg,n),id,el,p,wdw,hdr,bgd,x,y,w,h;
    wdw=wm.el.test(dat.el); if(!wdw){return false;}
    el=wdw.parentNode;
    p=wm.obj.test(dat.p);
    x=wm.size(el,p.x,'w');
    y=wm.size(el,p.y,'h');
    w=wm.size(el,p.w,'w');
    h=wm.size(el,p.h,'h');
    w=wm.math.clamp(w,8*3+cfg.p*2,el.offsetWidth);
    h=wm.math.clamp(h,cfg.fnt.size+cfg.p*2,el.offsetHeight);
    x=wm.math.clamp(x,0,el.offsetWidth-w);
    y=wm.math.clamp(y,0,el.offsetHeight-h);
    wdw.style.left=x+_u;
    wdw.style.top=y+_u;
    wdw.style.width=w+_u;
    wdw.style.height=h+_u;
    if(p.hdr)
      {
      hdr=wm.i(wdw.id+'-hdr');
      hdr.style.width=(w-cfg.p*2)+_u;
      }
    bgd=wm.i(wdw.id+'-bgd');
    bgd.style.width=(w-cfg.b*2)+_u;
    bgd.style.height=(h-(p.hdr?cfg.fnt.size+cfg.p*2:0)-cfg.b*2)+_u;
    },
  get:function(cfg,n)
    {
    cfg.wdw=wm.arr.test(cfg.wdw);
    n=wm.math.clamp(wm.integer.test(n),1,cfg.wdw.length);
    var v={};
    cfg.wdw.forEach(function(wdw){if(wdw.n===n){v=wdw;}});
    return v;
    }
  };
/*----------------------------------------------------------------------------*/
wm.size=function(el,n,o)
  {
  if(!wm.el.test(el)){return 0;}
  var pct=(/%/).test(String(n));
  if(!pct)
    {
    return wm.integer.test(n);
    }
  else
    {
    n=wm.nbr.test(String(n).split('%')[0]);
    o=(/^(w|h)$/).test(String(o))?o:'w';
    return wm.integer.test(el['offset'+((o==='w')?'Width':'Height')]/100*n);
    }
  };
/*----------------------------------------------------------------------------*/
wm.resize=function(cfg)
  {
  var sta=wm.i('sta-'+cfg.id),dbg,txt;
  cfg.w=cfg.el.offsetWidth;
  cfg.h=cfg.el.offsetHeight;
  if(wm.el.test(sta))
    {
    sta.style.width=(cfg.w-cfg.p*2)+_u;
    if(cfg.dbg)
      {
      dbg=wm.i(sta.id+'-dbg');
      if(wm.el.test(dbg)){wm.r(dbg);}
      dbg=wm.e('div');
      dbg.id=sta.id+'-dbg';
      dbg.style.float='right';
      txt='JSWM v'+wm.version.get()+' - id='+cfg.id;
      txt+=' - '+cfg.w+'*'+cfg.h;
      dbg.appendChild(wm.t(txt));
      sta.appendChild(dbg);
      }
    }
  wm.arr.test(cfg.scr).forEach(function(scr)
    {
    scr.el.style.width=cfg.w+_u;
    scr.el.style.height=(cfg.h-cfg.fnt.size-cfg.p*2)+_u;
    var bgd=wm.i('bgd'+scr.n+'-'+cfg.id),name=wm.i('name'+scr.n+'-'+cfg.id);
    if(wm.el.test(bgd))
      {
      bgd.style.width=(scr.el.offsetWidth-cfg.p*2)+_u;
      bgd.style.height=(scr.el.offsetHeight-cfg.p*2)+_u;
      }
    if(wm.el.test(name))
      {
      name.style.top=(scr.el.offsetHeight-cfg.fnt.size-cfg.p)+_u;
      name.style.width=(scr.el.offsetWidth-cfg.p*2)+_u;
      }
    });
  wm.arr.test(cfg.wdw).forEach(function(wdw){wm.wdw.resize(cfg,wdw.n);});
  };
/*----------------------------------------------------------------------------*/
wm.bool=
  {
  test:function(b,d)
    {
    return (typeof b==='boolean')?b:((typeof d==='boolean')?d:false);
    }
  };

wm.str=
  {
  test:function(s,d)
    {
    return (typeof s==='string')?s:((typeof d==='string')?d:'');
    },
  rand:function(n)
    {
    var i=0,s,l,str='';
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

wm.nbr=
  {
  parse:function(n){return Number(String(n).replace(/[^0-9\.\,\-\+]/g,''));},
  test:function(n,d){return wm.nbr.parse((typeof n!=='undefined')?n:d);}
  };

wm.integer=
  {
  test:function(n,d)
    {
    return parseInt(wm.nbr.parse((typeof n!=='undefined')?n:d),10);
    }
  };

wm.arr=
  {
  test:function(a,d)
    {
    if(typeof a==='object'&&a!==null&&Array.isArray(a)){return a;}
    return (typeof d==='object'&&d!==null&&Array.isArray(d))?d:[];
    }
  };

wm.obj=
  {
  test:function(o,d)
    {
    if(typeof o==='object'&&o!==null&&!Array.isArray(o)){return o;}
    return (typeof d==='object'&&d!==null&&!Array.isArray(d))?d:{};
    },
  clone:function(o)
    {
    return JSON.parse(JSON.stringify(wm.obj.test(o)));
    }
  };

wm.el=
  {
  test:function(o,d)
    {
    if(typeof o==='string'){o=wm.i(o);}
    if(typeof o==='object'&&o!==null&&o.tagName!==null){return o;}
    if(typeof d==='string'){d=wm.i(d);}
    return (typeof d==='object'&&d!==null&&d.tagName!==null)?d:false;
    }
  };

wm.math=
  {
  clamp:function(n,min,max)
    {
    n=wm.nbr.test(n);
    min=(typeof max!=='undefined')?wm.nbr.test(min):n;
    max=(typeof max!=='undefined')?wm.nbr.test(max):n;
    return Math.max(min,Math.min(n,max));
    },
  interpolate:function(from,to,n,i){return from+(to-from)/n*i;}
  };

wm.time=
  {
  get:function(){return (new Date()).getTime();}
  };

wm.client=
  {
  ischrome:(/chrome/i).test(_w.navigator.userAgent),
  isffx:(/firefox/i).test(_w.navigator.userAgent),
  isie:(/msie/i).test(_w.navigator.userAgent),
  css:function()
    {
    if(wm.client.ischrome){return '-webkit-';}
    if(wm.client.isffx){return '-moz-';}
    if(wm.client.isie){return '-ms-';}
    return '';
    }
  };
/*----------------------------------------------------------------------------*/
wm.col=
  {
  bgd:[160,160,160],
  bdr:[0,0,0],
  txt:[255,255,255],
  btn:[0,128,192],
  sel:[192,80,64],
  format:function(col)
    {
    col=wm.arr.test(col,[0,0,0]);
    return '#'+col.map(function(v)
      {
      return String('0'+wm.math.clamp(v,0,255).toString(16)).slice(-2);
      }).join('');
    },
  parse:function(col)
    {
    col=wm.str.test(col,'#000');
    var i=0,c=[0,0,0];
    if(col.charAt(0)==='#'){col=col.slice(1);}
    if(col.length===3){while(i<3){c[i]=parseInt(col[i]+col[i],16);i+=1;}}
    if(col.length===6){while(i<3){c[i]=parseInt(col.substr(i*2,2),16);i+=1;}}
    return c;
    },
  set:function(col){lol.ctx.fillStyle=col;},
  get:function(){return lol.color.parse(lol.ctx.fillStyle);},
  };
/*----------------------------------------------------------------------------*/
wm.img=
  {
  gen:function(map,name,color)
    {
    map=wm.arr.test(map);
    name=wm.str.test(name);
    color=wm.arr.test(color,wm.col.bdr);
    var cvs=wm.e('canvas'),ctx;
    cvs.width=map[0].length;
    cvs.height=map.length;
    ctx=cvs.getContext('2d');
    ctx.fillStyle=wm.col.format(color);
    ctx.beginPath();
    map.forEach(function(v,y)
      {
      v.split('').forEach(function(v,x){if(v==='X'){ctx.rect(x,y,1,1);}});
      });
    ctx.closePath();
    ctx.fill();
    wm.img[name]=
      {
      url:cvs.toDataURL(),
      w:cvs.width,
      h:cvs.height
      }
    }
  };

wm.icon=function(cfg)
  {
  var icon,map=[ /* 16*16 */
  'XXXXXXXXXXXXXXXX',
  'XX__X_X__XXXXXXX',
  'XXXXXXXXXXXXXXXX',
  'X______________X',
  'X_XXXXXXXXX____X',
  'X_X_X__XXXX____X',
  'X_XXXXXXXXXXXX_X',
  'X_X_______XXXX_X',
  'X_X_XX_XX_XXXX_X',
  'X_X_X_XXX_X__X_X',
  'X_X_______X__X_X',
  'X_XXXXXXXXX__X_X',
  'X____X_______X_X',
  'X____XXXXXXXXX_X',
  'X______________X',
  'XXXXXXXXXXXXXXXX'];
  wm.img.gen(map,'icon');
  icon=wm.e('link');
  icon.rel='icon';
  icon.type='image/png';
  icon.href=wm.img.icon.url;
  _d.head.appendChild(icon);
  };

return wm;
})();
