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
  cfg.fnt=wm.object.test(cfg.fnt);
  this.cfg=
    {
    ver:wm.version.get(),
    id:wm.string.test(cfg.id,wm.string.random(8)),
    el:wm.el.test(cfg.el,_d.body),
    m:wm.integer.test(cfg.m,2),
    p:wm.integer.test(cfg.p,2),
    fnt:
      {
      type:wm.string.test(cfg.fnt.type,'monospace'),
      size:wm.integer.test(cfg.fnt.size,8),
      h:wm.integer.test(cfg.fnt.h,9),
      m:wm.integer.test(cfg.fnt.m,2)
      },
    scr:[] /* virtual screen */
    };
  wm.icon(this.cfg);
  wm.init(this.cfg);
  wm.resize(this.cfg);
  _w.addEventListener('resize',wm.resize.bind(null,this.cfg),false);
  //_w.addEventListener('contextmenu',function(e){e.preventDefault();},false);
  }

wm.prototype.get=function(p){return this.cfg[p];}

wm.i=function(id){return _d.getElementById(String(id));};
wm.e=function(el){return _d.createElement(String(el));};
wm.t=function(txt){return _d.createTextNode(String(txt));};
wm.r=function(el){return el.parentNode.removeChild(el);};

wm.version=
  {
  maj:0,min:1,build:3,alpha:true,beta:false,
  get:function()
    {
    var v=wm.version,ver=v.maj+'.'+v.min+'.'+v.build;
    if(v.alpha||v.beta){ver+=(v.alpha?'\u03b1':'\u03b2');}
    return ver;
    }
  };

wm.init=function(cfg)
  {
  var el=cfg.el,sta=wm.e('div'),html=cfg.el.innerHTML,icon;
  el.innerHTML='';
  /* el style */
  el.style.overflow='hidden';
  el.style.userSelect='none';
  el.style.fontFamily=cfg.fnt.type;
  el.style.fontSize=cfg.fnt.size+_u;
  el.style.lineHeight=cfg.fnt.h+_u;
  el.style['-webkit-user-select']='none';
  el.style['-moz-user-select']='none';
  el.style['-ms-user-select']='none';
  /* status */
  sta.id='sta-'+cfg.id;
  sta.style.position='absolute';
  sta.style.top='0'+_u;
  sta.style.height=cfg.fnt.size+_u;
  sta.style.padding=cfg.p+_u;
  sta.style.backgroundColor=wm.color.format(wm.color.bdr);
  sta.style.color=wm.color.format(wm.color.txt);
  /* screen */
  wm.scr.add(cfg);
  wm.scr.add(cfg);
  wm.scr.add(cfg);
  wm.scr.toggle(cfg,1);
  el.appendChild(sta);
  icon='<img src='+wm.icon.url+' width="16" height="16" ';
  icon+='style="float:left;margin-right:2px"/>';
  wm.i('bgd1-'+cfg.id).innerHTML+=icon+html;
  };

wm.scr=
  {
  add:function(cfg)
    {
    var scr=wm.e('div'),bgd=wm.e('div'),name=wm.e('div'),n;
    n=wm.array.test(cfg.scr).length+1;
    scr.id='scr'+n+'-'+cfg.id;
    scr.style.position='absolute';
    scr.style.top=(cfg.fnt.size+cfg.p*2)+_u;
    scr.style.backgroundColor=wm.color.format(wm.color.bgd);
    scr.style.color=wm.color.format(wm.color.txt);
    bgd.id='bgd'+n+'-'+cfg.id;
    bgd.style.position='absolute';
    bgd.style.padding=cfg.p+_u;
    scr.appendChild(bgd);
    name.id='name'+n+'-'+cfg.id;
    name.style.position='absolute';
    name.style.color=wm.color.format(wm.color.btn);
    name.style.textAlign='right';
    name.appendChild(wm.t('screen '+n));
    scr.appendChild(name);
    cfg.el.appendChild(scr);
    cfg.scr.push({n:n,el:scr});
    wm.scr.toggle(cfg,n);
    },
  toggle:function(cfg,n)
    {
    n=wm.integer.test(n,1);
    cfg.scr.forEach(function(scr)
      {
      scr.toggle=(scr.n===n);
      scr.el.style.display=(scr.n===n)?'block':'none';
      });
    }
  };

wm.resize=function(cfg)
  {
  var sta=wm.i('sta-'+cfg.id),dbg,txt;
  cfg.w=cfg.el.offsetWidth;
  cfg.h=cfg.el.offsetHeight;
  if(wm.el.test(sta))
    {
    sta.style.width=(cfg.w-cfg.p*2)+_u;
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
  cfg.scr.forEach(function(scr)
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
  };
/*----------------------------------------------------------------------------*/
wm.string=
  {
  test:function(s,d)
    {
    return (typeof s==='string')?s:((typeof d==='string')?d:'');
    },
  random:function(n)
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

wm.number=
  {
  parse:function(n){return Number(String(n).replace(/[^0-9\.\,\-\+]/g,''));},
  test:function(n,d){return wm.number.parse((typeof n!=='undefined')?n:d);}
  };

wm.integer=
  {
  test:function(n,d)
    {
    return parseInt(wm.number.parse((typeof n!=='undefined')?n:d),10);
    }
  };

wm.array=
  {
  test:function(a,d)
    {
    if(typeof a==='object'&&a!==null&&Array.isArray(a)){return a;}
    return (typeof d==='object'&&d!==null&&Array.isArray(d))?d:[];
    }
  };

wm.object=
  {
  test:function(o,d)
    {
    if(typeof o==='object'&&o!==null&&!Array.isArray(o)){return o;}
    return (typeof d==='object'&&d!==null&&!Array.isArray(d))?d:{};
    },
  clone:function(o)
    {
    return JSON.parse(JSON.stringify(wm.object.test(o)));
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
    n=wm.number.test(n);
    min=(typeof max!=='undefined')?wm.number.test(min):n;
    max=(typeof max!=='undefined')?wm.number.test(max):n;
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
  isffx:(/firefox/i).test(window.navigator.userAgent)
  };

wm.color=
  {
  bgd:[192,192,192],
  bdr:[0,0,0],
  txt:[255,255,255],
  btn:[0,128,192],
  ovr:[216,80,64],
  format:function(col)
    {
    col=wm.array.test(col,[0,0,0]);
    return '#'+col.map(function(v)
      {
      return String('0'+wm.math.clamp(v,0,255).toString(16)).slice(-2);
      }).join('');
    },
  parse:function(col)
    {
    col=wm.string.test(col,'#000');
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
wm.icon=function(cfg)
  {
  var icon,img,cvs=wm.e('canvas'),ctx,map=[ /* 16*16 */
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
  cvs.width=map[0].length;
  cvs.height=map.length;
  ctx=cvs.getContext('2d');
  ctx.fillStyle='rgba(0,0,0,1.0)';
  ctx.beginPath();
  map.forEach(function(v,y)
    {
    v.split('').forEach(function(v,x){if(v==='X'){ctx.rect(x,y,1,1);}});
    });
  ctx.closePath();
  ctx.fill();
  wm.icon.url=cvs.toDataURL();
  icon=wm.e('link');
  icon.rel='icon';
  icon.type='image/png';
  icon.href=wm.icon.url;
  _d.head.appendChild(icon);
  /*
  img=wm.e('img');
  img.src=icon.href;
  img.width=map[0].length;
  img.height=map.length;
  img.style.imageRendering='pixelated';
  img.style.marginRight=cfg.fnt.m+_u;
  img.style.marginBottom=cfg.fnt.m+_u;
  */
  };

return wm;
})();
