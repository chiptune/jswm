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
    ver:wm.version.get(),
    id:wm.str.test(cfg.id,wm.str.rnd(8)),
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
  /*--------------------------------------------------------------------------*/
  var that=this;
  var wdw=function(){};
  wdw.prototype.constructor=wdw;
  wdw.prototype.add=function(p){wm.wdw.add(that.cfg,p);};
  wdw.prototype.update=function(n,dat){wm.wdw.update(that.cfg,n,dat);};
  this.wdw=new wdw();
  /*--------------------------------------------------------------------------*/
  wm.icon();
  wm.init(this.cfg);
  wm.resize(this.cfg);
  _w.addEventListener('resize',wm.resize.bind(null,this.cfg),false);
  _w.addEventListener('selectstart',function(){return false;},false);
  _w.addEventListener('dragstart',function(){return false;},false);
  //_w.addEventListener('contextmenu',function(e){e.preventDefault();},false);
  if(this.cfg.dbg)
    {
    var dbg=wm.wdw.add(this.cfg,{x:'2%',y:'5%',w:'50%',h:'75%',p:2});
    wm.validate(this.cfg,dbg);
    }
  }

wm.prototype=
  {
  get:function(p){return this.cfg[p];},
  set:function(p,v){if(this.cfg[p]!==undefined){this.cfg[p]=v;return true;}}
  };

wm.version=
  {
  maj:0,min:1,build:5,alpha:true,beta:false,
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
  el.style.fontFamily=cfg.fnt.type;
  el.style.fontSize=cfg.fnt.size+_u;
  el.style.lineHeight=cfg.fnt.h+_u;
  el.style[cfg.css+'user-select']='none';
  /* status */
  var sta=_e('div');
  sta.id='sta-'+cfg.id;
  sta.style.position='absolute';
  sta.style.top='0'+_u;
  sta.style.height=cfg.fnt.size+_u;
  sta.style.padding=cfg.p+_u;
  sta.style.backgroundColor=wm.col.format(wm.col.bdr);
  sta.style.color=wm.col.format(wm.col.hdr);
  el.appendChild(sta);
  /* screen */
  var scr=_e('div');
  scr.id='scr-'+cfg.id;
  scr.style.top=cfg.p+_u;
  scr.style.left=cfg.p+_u;
  scr.style.float='left';
  sta.appendChild(scr);
  wm.scr.add(cfg);
  wm.scr.add(cfg);
  wm.scr.add(cfg);
  wm.scr.toggle(cfg,1);
  var icon='<img src='+wm.img.icon.url+' ';
  icon+='width="'+wm.img.icon.w+'" height="'+wm.img.icon.h+'" ';
  icon+='style="float:left;margin-right:'+cfg.p+'px"/>';
  _i('bgd1-'+cfg.id).innerHTML+=icon+html;
  };
/*----------------------------------------------------------------------------*/
wm.scr=
  {
  add:function(cfg)
    {
    cfg.scr=wm.arr.test(cfg.scr);
    var n=wm.arr.test(cfg.scr).length+1;
    var scr=_e('div');
    scr.id='scr'+n+'-'+cfg.id;
    scr.style.position='absolute';
    scr.style.top=(cfg.fnt.size+cfg.p*2)+_u;
    scr.style.height=cfg.fnt.size+_u;
    scr.style.backgroundColor=wm.col.format(wm.col.bgd);
    scr.style.color=wm.col.format(wm.col.hdr);
    /* background */
    var bgd=_e('div');
    bgd.id='bgd'+n+'-'+cfg.id;
    bgd.style.position='absolute';
    bgd.style.padding=cfg.p+_u;
    scr.appendChild(bgd);
    /* name */
    var name=_e('div');
    name.id='name'+n+'-'+cfg.id;
    name.style.position='absolute';
    name.style.color=wm.col.format(wm.col.btn);
    name.style.textAlign='right';
    name.appendChild(_t('screen '+n));
    scr.appendChild(name);
    /* status icon */
    var map=[ /* 16*8 */
    'XXXXXXXXXXXXXXXX',
    'X______XX______X',
    'X_X____XX_XXXX_X',
    'X__X___XX_XXXX_X',
    'X___X__XX_XXXX_X',
    'X____X_XX_XXXX_X',
    'X______XX______X',
    'XXXXXXXXXXXXXXXX'];
    wm.img.gen(map,'scr',wm.col.btn);
    var btn=_e('div');
    btn.id='scr'+n+'-'+cfg.id+'-btn';
    btn.style.backgroundImage='url('+wm.img.scr.url+')';
    btn.style.float='left';
    btn.style.width=wm.integer.test(wm.img.scr.w/2)+_u;
    btn.style.height=wm.img.scr.h+_u;
    btn.style.marginRight=cfg.m+_u;
    btn.style.cursor='pointer';
    var el=_i('scr-'+cfg.id);
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
      var btn=_i('scr'+scr.n+'-'+cfg.id+'-btn');
      if(wm.el.test(btn))
        {
        var x='-'+(scr.toggle?wm.integer.test(wm.img.scr.w/2):0)+_u+' 0'+_u;
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
/* TODO
   add callback to config (enable refresh button) */
wm.wdw=
  {
  add:function(cfg,p)
    {
    if(wm.obj.isempty(cfg)){return false;}
    cfg.wdw=wm.arr.test(cfg.wdw);
    p=wm.obj.test(p);
    p.hdr=wm.bool.test(p.hdr,true);
    var el=wm.el.test(p.el,wm.scr.get(cfg).el); if(!el){return false;}
    var n=cfg.wdw.length+1; /* TODO better */
    /* window */
    var wdw=_e('div');
    wdw.id='wdw'+n+'-'+cfg.id;
    wdw.style.position='absolute';
    wdw.style.backgroundColor=wm.col.format(wm.col.bdr);
    wdw.style.zIndex=n;
    /* header */
    if(p.hdr)
      {
      var hdr=_e('div');
      hdr.id=wdw.id+'-hdr';
      hdr.style.position='absolute';
      hdr.style.height=cfg.fnt.size+_u;
      hdr.style.padding=cfg.p+_u;
      hdr.style.backgroundColor=wm.col.format(wm.col.bdr);
      wdw.appendChild(hdr);
      }
    /* background */
    var bgd=_e('div');
    bgd.id=wdw.id+'-bgd';
    bgd.style.position='absolute';
    bgd.style.left=cfg.b+_u;
    bgd.style.top=(cfg.b+(p.hdr?cfg.fnt.size+cfg.p*2:0))+_u;
    bgd.style.backgroundColor=wm.col.format(wm.col.bgd);
    bgd.style.overflow='hidden';
    wdw.appendChild(bgd);
    /* content */
    var con=_e('div');
    con.id=wdw.id+'-con';
    con.style.position='absolute';
    con.style.color=wm.col.format(wm.col.txt);
    con.style.padding=wm.integer.test(p.p)+_u;
    bgd.appendChild(con);
    /* init */
    el.appendChild(wdw);
    cfg.wdw.push({n:n,el:wdw,p:p});
    wm.wdw.resize(cfg,n);
    return n;
    },
  resize:function(cfg,n)
    {
    var dat=wm.wdw.get(cfg,n);
    var wdw=wm.el.test(dat.el); if(!wdw){return false;}
    var el=wdw.parentNode;
    var p=wm.obj.test(dat.p);
    var x=wm.size(el,p.x,'w');
    var y=wm.size(el,p.y,'h');
    var w=wm.size(el,p.w,'w');
    var h=wm.size(el,p.h,'h');
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
      var hdr=_i(wdw.id+'-hdr');
      if(wm.el.test(hdr)){hdr.style.width=(w-cfg.p*2)+_u;}
      }
    var bgd=_i(wdw.id+'-bgd');
    if(wm.el.test(bgd))
      {
      bgd.style.width=(w-cfg.b*2)+_u;
      bgd.style.height=(h-(p.hdr?cfg.fnt.size+cfg.p*2:0)-cfg.b*2)+_u;
      }
    },
  get:function(cfg,n)
    {
    cfg.wdw=wm.arr.test(cfg.wdw);
    n=wm.math.clamp(wm.integer.test(n),1,cfg.wdw.length);
    var v={};
    cfg.wdw.forEach(function(wdw){if(wdw.n===n){v=wdw;}});
    return v;
    },
  update:function(cfg,n,dat)
    {
    var wdw=wm.wdw.get(cfg,n); if(wm.obj.isempty(wdw)){return false;}
    _i(wdw.el.id+'-con').innerHTML=wm.str.test(dat,'no data');
    wm.wdw.resize(cfg,n);
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
  cfg.w=cfg.el.offsetWidth;
  cfg.h=cfg.el.offsetHeight;
  var sta=_i('sta-'+cfg.id);
  if(wm.el.test(sta))
    {
    sta.style.width=(cfg.w-cfg.p*2)+_u;
    if(cfg.dbg)
      {
      var dbg=_i(sta.id+'-dbg');
      if(wm.el.test(dbg)){_r(dbg);}
      dbg=_e('div');
      dbg.id=sta.id+'-dbg';
      dbg.style.float='right';
      var txt='JSWM v'+wm.version.get()+' - id='+cfg.id+' - '+cfg.w+'*'+cfg.h;
      dbg.appendChild(_t(txt));
      sta.appendChild(dbg);
      }
    }
  wm.arr.test(cfg.scr).forEach(function(scr)
    {
    scr.el.style.width=cfg.w+_u;
    scr.el.style.height=(cfg.h-cfg.fnt.size-cfg.p*2)+_u;
    var bgd=_i('bgd'+scr.n+'-'+cfg.id);
    if(wm.el.test(bgd))
      {
      bgd.style.width=(scr.el.offsetWidth-cfg.p*2)+_u;
      bgd.style.height=(scr.el.offsetHeight-cfg.p*2)+_u;
      }
    var name=_i('name'+scr.n+'-'+cfg.id);
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
  bgd:[128,128,128],
  bdr:[0,0,0],
  txt:[192,192,192],
  hdr:[255,255,255],
  btn:[64,160,192],
  sel:[192,160,64],
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
  gen:function(map,name,color)
    {
    map=wm.arr.test(map);
    name=wm.str.test(name);
    color=wm.arr.test(color,wm.col.bdr);
    var cvs=_e('canvas');
    cvs.width=map[0].length;
    cvs.height=map.length;
    var ctx=cvs.getContext('2d');
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
      };
    }
  };

wm.icon=function()
  {
  var map=[ /* 16*16 */
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
      wm.wdw.update(cfg,wdw,txt);
      }
    };
  xhr.send();
  };

return wm;
})();
