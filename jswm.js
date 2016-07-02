/*   o. .o$00$o .o   o. .o. .o.
     0$ $0(     $0   0$ $0$o$0$
    .00 `$00$o. 00.o.00 00`$'00
o. .o0$     )0$ $0$"$0$ $0   0$
`$000$' "$000$' `$' `$' `$   $' */

/*jslint this,white,single,browser,maxlen:80*/
/*global window,jslint*/

var jswm=(function()
{
'use strict';
var _w=window;
var _d=_w.document;
var _u='px';
var _ls=_w.localStorage;
var _pn='parentNode';
var _ox='offsetLeft';
var _oy='offsetTop';
var _ow='offsetWidth';
var _oh='offsetHeight';
var _bp='backgroundPosition';
var _bc='backgroundColor';
var _br='borderRadius';
var _ac='appendChild';
var _ae='addEventListener';

var _i=function(id){return _d.getElementById(String(id));};
var _t=function(id){return _d.getElementsByTagName(String(id));};
var _e=function(e){return _d.createElement(String(e));};
var _n=function(v){return _d.createTextNode(String(v));};
var _c=function(e){return e.cloneNode(true);};
var _r=function(e){return e[_pn].removeChild(e);};
/*----------------------------------------------------------------------------*/
function wm(cfg) /* constructor */
  {
  this.cfg=wm.dflt(cfg);
  var sav=wm.ls.get(cfg);
  if(wm.obj.test(sav).jswm!==wm.ver.get())
    {
    if(wm.ls.test()){delete _w.localStorage[cfg.id];}
    }
  if(!wm.obj.isempty(sav)){this.cfg=wm.obj.merge(this.cfg,sav);}
  wm.lst=wm.obj.test(wm.lst);
  wm.lst[cfg.id]=this.cfg;
  /*--------------------------------------------------------------------------*/
  var that=this;
  var V=function(){return;};
  V.prototype.constructor=V;
  V.prototype.add=function(n,p){return wm.vs.add(that.cfg,n,p);};
  V.prototype.get=function(n){return wm.vs.get(that.cfg,n);};
  V.prototype.toggle=function(n){wm.vs.tog(that.cfg,n);};
  this.vs=new V();
  var W=function(){return;};
  W.prototype.constructor=W;
  W.prototype.add=function(p){return wm.wdw.add(that.cfg,p);};
  W.prototype.close=function(id){return wm.wdw.del(that.cfg,id);};
  W.prototype.get=function(id){return wm.wdw.get(that.cfg,id);};
  W.prototype.select=function(id){return wm.wdw.sel(that.cfg,id);};
  W.prototype.insert=function(id,txt){wm.wdw.txt(that.cfg,id,txt);};
  W.prototype.clear=function(id){wm.wdw.clr(that.cfg,id);};
  W.prototype.style=function(id,k,v){wm.wdw.css(id,k,v);};
  this.window=new W();
  var I=function(){return;};
  I.prototype.constructor=I;
  I.prototype.add=function(p){return wm.ico.add(that.cfg,p);};
  I.prototype.close=function(p){return wm.ico.del(that.cfg,p);};
  I.prototype.get=function(id){return wm.ico.get(that.cfg,id);};
  this.icon=new I();
  var S=function(){return;};
  S.prototype.constructor=S;
  S.prototype.get=function(x,y,w,h,f){return wm.stg.get(that.cfg,x,y,w,h,f);};
  this.snap=new S();
  /*--------------------------------------------------------------------------*/
  wm.fav(this.cfg);
  wm.css.ini(this.cfg);
  wm.img.ini(this.cfg);
  wm.ini.call(this);
  }

wm.prototype=
  {
  get:function(p){return this.cfg[p];},
  set:function(p,v)
    {
    p=wm.str.test(p).split('.');
    var cfg=this.cfg;
    p.forEach(function(n)
      {
      if(cfg[n]===undefined||cfg[n]===null){return;}
      if(!wm.obj.isempty(cfg[n])){cfg=cfg[n];}else{return;}
      });
    cfg[p.pop()]=v;
    wm.ls.sav(this.cfg);
    return true;
    },
  resize:function(){wm.rsz(this.cfg);},
  pi:function(n){return wm.math.pi(n);}
  };

wm.ver=
  {
  maj:0,min:2,build:9,alpha:true,beta:false,
  get:function()
    {
    var ver=this.maj+'.'+this.min+'.'+this.build;
    if(this.alpha||this.beta){ver+=(this.alpha?'a':'b');}//'\u03b1':'\u03b2');}
    return ver;
    }
  };

wm.id=function(cfg){cfg.n=wm.int.test(cfg.n)+1;return cfg.n;};

wm.get=function(id)
  {
  wm.lst=wm.obj.test(wm.lst);
  if(wm.obj.isempty(wm.lst[id])){id=Object.keys(wm.lst)[0];}
  return wm.obj.test(wm.lst[id]);
  };

wm.dflt=function(cfg)
  {
  cfg=wm.obj.test(cfg);
  cfg.fnt=wm.obj.test(cfg.fnt);
  cfg.stg=wm.obj.test(cfg.stg);
  return wm.obj.merge(cfg,
    {
    jswm:wm.ver.get(),
    id:wm.str.test(cfg.id,wm.str.rnd(8)),
    root:wm.str.test(cfg.root),
    m:wm.int.test(cfg.m,2), /* margin */
    b:wm.int.test(cfg.b,1), /* border */
    r:wm.int.test(cfg.r,3), /* radius */
    i:wm.int.test(cfg.i,2), /* increment */
    fnt:
      {
      f:wm.str.test(cfg.fnt.f,'monospace'),
      s:wm.nbr.test(cfg.fnt.s,8),
      h:wm.nbr.test(cfg.fnt.h,wm.nbr.test(cfg.fnt.s,8)+1),
      r:wm.int.test(cfg.fnt.r,1)
      },
    bgd:wm.bool.test(cfg.bgd,true),
    sav:wm.bool.test(cfg.sav,true),
    tt:wm.bool.test(cfg.tt,true),
    snp:wm.bool.test(cfg.snp,true),
    stg:
      {
      m:wm.int.test(cfg.stg.m,6),
      n:wm.int.test(cfg.stg.n,20)
      },
    on:wm.bool.test(cfg.on),  /* status */
    dbg:wm.bool.test(cfg.dbg) /* debug */
    });
  };

wm.sel=function(e,cfg)
  {
  e=e||_w.event;
  var on=(e.type==='mouseover');
  if(on){wm.cur=cfg.id;}
  //console.log(wm.cur+' ('+e.type+')');
  if(cfg.on!==on)
    {
    Object.keys(wm.lst).forEach(function(k)
      {
      var c=wm.lst[k];
      c.on=(c.id===cfg.id)?on:false;
      var el=_i(c.id+'-sta-btn');
      if(wm.el.test(el))
        {
        el.style[_bp]='-'+(wm.img.btn.h*(c.on?1:0))+_u+' 0'+_u;
        }
      });
    }
  e.preventDefault();
  };
/*----------------------------------------------------------------------------*/
wm.tt={};

wm.tt.btn=function(cfg)
  {
  cfg.tt=!wm.bool.test(cfg.tt);
  var btn=_i(cfg.id+'-tt-btn');
  if(wm.el.test(btn))
    {
    btn.style[_bp]='-'+((cfg.tt?3:2)*wm.img.sta.h)+_u+' 0'+_u;
    }
  wm.tt.add(cfg,'tooltip');
  };

wm.tt.add=function(cfg,txt)
  {
  txt=wm.str.trim(txt);
  if(!wm.bool.test(cfg.tt)||txt===''){return;}
  var tt=_i(cfg.id+'-tt');
  if(!wm.el.test(tt))
    {
    tt=_e('div');
    tt.id=cfg.id+'-tt';
    tt.style.position='absolute';
    tt.style[_br]=cfg.r+_u;
    tt.style.padding=cfg.m+_u;
    tt.style[_bc]=wm.col.get('hdr');
    tt.style.color=wm.col.get('bdr');
    tt.style.zIndex=1024;
    var root=_i(cfg.root);
    if(wm.el.test(root)){root[_ac](tt);}
    }
  tt.innerHTML=txt;
  wm.tt.mv(cfg);
  };

wm.tt.del=function(cfg)
  {
  var tt=_i(cfg.id+'-tt');
  if(wm.el.test(tt)){_r(tt);}
  };

wm.tt.mv=function(cfg)
  {
  if(!wm.bool.test(cfg.tt)){return;}
  var root=_i(cfg.root);
  var tt=_i(cfg.id+'-tt');
  if(!wm.el.test(root)||!wm.el.test(tt)){return;}
  var x=wm.mse.x+12;
  var y=wm.mse.y;
  var w=tt[_ow];
  var h=tt[_oh];
  if(x+w>cfg.o.x+root[_ow]){x=wm.mse.x-w-12;}
  tt.style.left=wm.math.clp(x,0,cfg.o.x+root[_ow]-w)+_u;
  tt.style.top=wm.math.clp(y,0,cfg.o.y+root[_oh]-h)+_u;
  };
/*----------------------------------------------------------------------------*/
wm.dbg={max:128};

wm.dbg.btn=function(cfg)
  {
  cfg.dbg=!wm.bool.test(cfg.dbg);
  var btn=_i(cfg.id+'-dbg-btn');
  if(wm.el.test(btn))
    {
    btn.style[_bp]='-'+((cfg.dbg?7:6)*wm.img.sta.h)+_u+' 0'+_u;
    }
  wm.dbg.ini(cfg);
  };

wm.dbg.ini=function(cfg)
  {
  if(cfg.dbg)
    {
    var s=wm.stg.get(cfg,1,2,6,-2,'%');
    var p=
      {
      id:'dbg-'+cfg.id,txt:'debug',m:2,x:s.x,y:s.y,w:s.w,h:s.h,
      mnu:[
        {
        id:'option',
        lst:[
          {id:'nfo',txt:'about',fn:function(){wm.dbg.nfo(cfg);}},
          {txt:'code validation',fn:function(){wm.lint(cfg);}},
          {id:'test'},
          {id:'menu',lst:[{id:'foo'},{id:'bar',lst:[
            {id:'LOL',fn:function(){wm.dbg.log(cfg,'LOL');}},
            {id:'MDR'}]}]}]
        },
        {id:'clear',fn:function(){wm.dbg.clr(cfg);}},
        {id:'buffer',txt:'0/'+wm.dbg.max}
        ]
      };
    wm.wdw.add(cfg,p);
    wm.wdw.css('dbg-'+cfg.id,'whiteSpace','nowrap');
    wm.dbg.clr(cfg);
    wm.dbg.nfo(cfg);
    wm.lint(cfg);
    }
  else
    {
    wm.wdw.del(cfg,'dbg-'+cfg.id);
    }
  wm.sta.dbg(cfg);
  wm.arr.test(cfg.wdw).forEach(function(v){wm.wdw.dbg(cfg,v.id);});
  };

wm.dbg.log=function(cfg,txt)
  {
  if(cfg.dbg)
    {
    var id='dbg-'+cfg.id;
    wm.wdw.txt(cfg,id,wm.str.test(txt)+'<br>');
    wm.dbg.len(cfg);
    wm.sb.v.end(cfg,id);
    }
  };

wm.dbg.clr=function(cfg)
  {
  if(cfg.dbg)
    {
    var id='dbg-'+cfg.id;
    var el=_i(id+'-con');
    if(wm.el.test(el)){el.innerHTML='';}
    wm.wdw.ini(cfg,id);
    wm.dbg.len(cfg);
    }
  };

wm.dbg.len=function(cfg)
  {
  var el=_i('dbg-'+cfg.id+'-con');
  if(wm.el.test(el))
    {
    var log=el.innerHTML.split('<br>');
    var n=log.length-1;
    if(n>wm.dbg.max-1){log.splice(0,1);el.innerHTML=log.join('<br>');}
    el=_i('dbg-'+cfg.id+'-mnu-buffer');
    if(wm.el.test(el))
      {
      wm.el.clr(el);
      el[_ac](wm.mnu.txt(cfg,n+'/'+wm.dbg.max));
      }
    }
  };

wm.dbg.nfo=function(cfg)
  {
  wm.dbg.log(cfg);
  wm.dbg.log(cfg,'&gt; JSWM v'+wm.ver.get()+' (id:'+cfg.id+')');
  wm.dbg.log(cfg,'&gt; &copy;2016 - REZ');
  var css='class="'+wm.css.cls(cfg,'lnk')+'"';
  var url='https://github.com/chiptune/jswm';
  var lnk='<a '+css+' href="'+url+'" target="new">github</a>';
  wm.dbg.log(cfg,'&gt; sources at '+lnk);
  url='https://twitter.com/intent/follow?screen_name=chiptune';
  lnk='<a '+css+' href="'+url+'" target="new">twitter</a>';
  wm.dbg.log(cfg,'&gt; follow me on '+lnk);
  wm.dbg.log(cfg);
  };
/*----------------------------------------------------------------------------*/
wm.ini=function()
  {
  var cfg=wm.dflt(this.cfg);
  var root=_i(cfg.root);
  if(!wm.el.test(root)){return;}
  cfg.o=wm.el.o(root);
  root.innerHTML='';
  root.setAttribute('type','wm');
  /* root style */
  root.className=wm.css.cls(cfg,'txt');
  root.style.overflow='hidden';
  root.style.userSelect='none';
  root.style[wm.nav.css()+'user-select']='none';
  /* status */
  wm.sta.add(cfg);
  wm.stg.ini(cfg);
  wm.sta.ini(cfg);
  wm.vs.add(cfg,1);
  wm.arr.test(cfg.vs).forEach(function(v){wm.vs.add(cfg,v.n,v);});
  wm.vs.tog(cfg);
  wm.arr.test(cfg.wdw).forEach(function(v){wm.wdw.add(cfg,v);});
  wm.arr.test(cfg.ico).forEach(function(v){wm.ico.add(cfg,v);});
  wm.dbg.ini(cfg);
  _w[_ae]('resize',function(){wm.rsz(cfg);});
  _w[_ae]('mousemove',function(e){wm.mse.mv(e,cfg);});
  _w[_ae]('mousedown',function(e){wm.mse.dwn(e,cfg);});
  _w[_ae]('mouseup',function(e){wm.mse.up(e,cfg);});
  _w[_ae]('wheel',function(e){wm.mse.wheel(e,cfg);});
  _w[_ae]('keydown',function(e){wm.key.dwn(e,cfg);});
  _w[_ae]('keyup',function(e){wm.key.up(e,cfg);});
  root[_ae]('mouseover',function(e){wm.sel(e,cfg);});
  root[_ae]('mouseout',function(e){wm.sel(e,cfg);});
  root[_ae]('selectstart',function(e){e.preventDefault();});
  root[_ae]('dragstart',function(e){e.preventDefault();});
  //root[_ae]('contextmenu',function(e){e.preventDefault();});
  };

wm.rsz=function(cfg)
  {
  var snp=cfg.snp;
  cfg.snp=false;
  wm.stg.ini(cfg);
  wm.sta.ini(cfg);
  wm.arr.test(cfg.vs).forEach(function(v){wm.vs.ini(cfg,v.n);});
  wm.arr.test(cfg.wdw).forEach(function(v){wm.wdw.ini(cfg,v.id);});
  wm.arr.test(cfg.ico).forEach(function(v){wm.ico.ini(cfg,v.id);});
  cfg.snp=snp;
  };
/*----------------------------------------------------------------------------*/
wm.sta={};

wm.sta.add=function(cfg)
  {
  var root=_i(cfg.root);
  if(!wm.el.test(root)){return;}
  var sta=_e('div');
  sta.id='sta-'+cfg.id;
  sta.style.position='absolute';
  sta.style.top='0'+_u;
  sta.style.height=(cfg.fnt.s+cfg.m*2)+_u;
  sta.style[_bc]=wm.col.get('bdr');
  sta.style.color=wm.col.get('hdr');
  sta.style.overflow='hidden';
  var m=wm.int.test((cfg.fnt.s-wm.img.btn.h)/2);
  var btn=wm.ui.ico(cfg,'btn',cfg.sta?1:0,cfg.id+'-sta','status');
  btn.style.left=(cfg.m+m)+_u;
  btn.style.top=(cfg.m+m)+_u;
  btn.style.cursor='default';
  sta[_ac](btn);
  btn=wm.ui.ico(cfg,'sta',1,cfg.id+'-cfg','config');
  btn.style.top=(cfg.m+m)+_u;
  btn[_ae]('mouseup',function()
    {
    var x=cfg.o.x+this[_ox]-cfg.b-cfg.m;
    var y=cfg.o.y+cfg.fnt.s+cfg.m*2;
    wm.ui.cfg(cfg,x,y);
    });
  sta[_ac](btn);
  btn=wm.ui.ico(cfg,'sta',cfg.tt?3:2,cfg.id+'-tt','tooltip');
  btn.style.top=(cfg.m+m)+_u;
  btn[_ae]('mouseup',function(){wm.tt.btn(cfg);});
  sta[_ac](btn);
  btn=wm.ui.ico(cfg,'sta',cfg.snp?5:4,cfg.id+'-stg','snap to grid');
  btn.style.top=(cfg.m+m)+_u;
  btn[_ae]('mouseup',function(){wm.stg.btn(cfg);});
  sta[_ac](btn);
  btn=wm.ui.ico(cfg,'sta',cfg.dbg?7:6,cfg.id+'-dbg','debug');
  btn.style.top=(cfg.m+m)+_u;
  btn[_ae]('mouseup',function(){wm.dbg.btn(cfg);});
  sta[_ac](btn);
  if(cfg.sav)
    {
    btn=wm.ui.ico(cfg,'sta',0,cfg.id+'-rst','reset');
    btn.style.top=(cfg.m+m)+_u;
    btn[_ae]('mouseup',function(){wm.ls.rst(cfg);});
    sta[_ac](btn);
    }
  root[_ac](sta);
  };

wm.sta.ini=function(cfg)
  {
  var root=_i(cfg.root);
  var sta=_i('sta-'+cfg.id);
  if(!wm.el.test(root)||!wm.el.test(sta)){return;}
  sta.style.width=root[_ow]+_u;wm.sta.dbg(cfg);
  var m=wm.int.test((cfg.fnt.s-wm.img.btn.h)/2);
  var w=wm.img.sta.h+cfg.m+m;
  var btn=_i(cfg.id+'-cfg-btn');
  if(wm.el.test(btn)){btn.style.left=(root[_ow]-w*(cfg.sav?2:1))+_u;}
  btn=_i(cfg.id+'-tt-btn');
  if(wm.el.test(btn)){btn.style.left=(root[_ow]-w*(cfg.sav?3:2))+_u;}
  btn=_i(cfg.id+'-stg-btn');
  if(wm.el.test(btn)){btn.style.left=(root[_ow]-w*(cfg.sav?4:3))+_u;}
  btn=_i(cfg.id+'-dbg-btn');
  if(wm.el.test(btn)){btn.style.left=(root[_ow]-w*(cfg.sav?5:4))+_u;}
  if(cfg.sav)
    {
    btn=_i(cfg.id+'-rst-btn');
    if(wm.el.test(btn)){btn.style.left=(root[_ow]-w)+_u;}
    }
  wm.sta.dbg(cfg);
  };

wm.sta.dbg=function(cfg)
  {
  if(!cfg.on){return;}
  var root=_i(cfg.root);
  var sta=_i('sta-'+cfg.id);
  if(!wm.el.test(root)||!wm.el.test(sta)){return;}
  var dbg=_i(sta.id+'-dbg');
  if(wm.el.test(dbg)){_r(dbg);}
  if(!cfg.dbg){return;}
  cfg.vs=wm.arr.test(cfg.vs);
  var m=wm.int.test((cfg.fnt.s-wm.img.btn.h)/2);
  var w=wm.img.sta.h+cfg.m+m;
  dbg=_e('div');
  dbg.id=sta.id+'-dbg';
  dbg.style.position='absolute';
  dbg.style.left=(cfg.m+m+w*cfg.vs.length+w)+_u;
  dbg.style.top=cfg.m+_u;
  dbg.style.width=(root[_ow]-(cfg.m+m)*2-w*cfg.vs.length-w*6)+_u;
  dbg.style.height=cfg.fnt.s+_u;
  dbg.style.lineHeight=cfg.fnt.s+_u;
  dbg.style.whiteSpace='nowrap';
  dbg.style.textOverflow='ellipsis';
  dbg.style.overflow='hidden';
  var txt='JSWM v'+wm.ver.get()+' | id:'+cfg.id;
  txt+=' | '+root[_ow]+'*'+root[_oh];
  txt+=' | vs:'+wm.vs.get(cfg).txt;
  txt+=' | key:'+((wm.int.test(wm.key.code)!==0)?wm.key.code:'--');
  txt+=' '+(wm.key.shft?'s':'*')+(wm.key.alt?'a':'*')+(wm.key.ctrl?'c':'*');
  if(wm.str.test(cfg.wid))
    {
    txt+=' | wdw:'+cfg.wid+' # z:'+wm.wdw.get(cfg,cfg.wid).z;
    }
  if(wm.str.test(cfg.iid))
    {
    txt+=' | ico:'+cfg.iid+' # z:'+wm.ico.get(cfg,cfg.iid).z;
    }
  var evt=wm.obj.test(cfg.evt);
  txt+=' | evt:'+(wm.str.test(evt.t)?evt.t+'_'+evt.a:'---');
  txt+=' | mp:'+wm.mse.x+'*'+wm.mse.y;
  dbg[_ac](_n(txt));
  if(wm.el.test(sta)){sta[_ac](dbg);}
  };
/*----------------------------------------------------------------------------*/
wm.vs={};

wm.vs.add=function(cfg,n,p)
  {
  var root=_i(cfg.root);
  if(!wm.el.test(root)){return;}
  cfg.vs=wm.arr.test(cfg.vs);
  n=wm.int.test(n,cfg.vs.length+1);
  var id='vs'+n+'-'+cfg.id;
  if(wm.el.test(_i('vs'+n+'-'+cfg.id))){return;}
  var txt=wm.str.test(wm.obj.test(p).txt,'screen '+n);
  var vs=_e('div');
  vs.id=id;
  vs.setAttribute('type','vs');
  vs.style.position='absolute';
  vs.style.top=(cfg.fnt.s+cfg.m*2)+_u;
  vs.style[_bc]=wm.col.get('bgd');
  vs.style.color=wm.col.get('hdr');
  vs.style.overflow='hidden';
  vs.style.zIndex=n;
  /* background */
  var bgd=_e('div');
  bgd.id=id+'-bgd';
  bgd.style.position='absolute';
  if(cfg.bgd){bgd.className=wm.css.cls(cfg,'img-bgd');}
  vs[_ac](bgd);
  /* name */
  var name=_e('div');
  name.id=id+'-name';
  name.style.position='absolute';
  name.style.color=wm.col.get('txt');
  name.style.textAlign='right';
  name[_ac](_n(txt));
  bgd[_ac](name);
  /* status button */
  var x=cfg.vs.length;
  cfg.vs.forEach(function(v,i){if(v.n===n){x=i;}});
  var m=wm.int.test((cfg.fnt.s-wm.img.btn.h)/2);
  var w=wm.img.btn.h+cfg.m+m;
  var btn=wm.ui.ico(cfg,'btn',2,id,txt);
  btn.style.left=(cfg.m+x*w+w+m)+_u;
  btn.style.top=(cfg.m+m)+_u;
  var sta=_i('sta-'+cfg.id);
  if(wm.el.test(sta))
    {
    btn[_ae]('mouseup',function(){wm.vs.tog(cfg,n);});
    sta[_ac](btn);
    }
  /* init */
  root[_ac](vs);
  if(!cfg.vs.some(function(v){return (v.n===n);}))
    {
    cfg.vs.push({n:n,txt:txt});
    }
  wm.vs.ini(cfg,n);
  wm.sta.dbg(cfg);
  /* default icon */
  wm.ico.add(cfg,wm.obj.merge(
    {
    id:id+'-wdw',vs:n,tt:'new window',
    fn:function()
      {
      var wdw=wm.wdw.add(cfg,wm.obj.merge({m:2},wm.stg.get(cfg,2,2,7,5,'%')));
      wm.wdw.txt(cfg,wdw,'test window '+wdw);
      wm.ico.add(cfg,wm.obj.merge({wdw:wdw,img:'ico'},wm.stg.get(cfg)));
      }
    },wm.stg.get(cfg)));
  wm.ico.add(cfg,wm.obj.merge(
    {
    id:id+'-ico',vs:n,tt:'new icon',
    fn:function(){wm.ico.add(cfg,wm.stg.get(cfg,3,1));}
    },wm.stg.get(cfg,2,1)));
  };

wm.vs.ini=function(cfg,n)
  {
  var root=_i(cfg.root);
  if(!wm.el.test(root)){return;}
  var id='vs'+n+'-'+cfg.id;
  var vs=_i(id);
  if(!wm.el.test(vs)){return;}
  var w=root[_ow];
  var h=root[_oh]-cfg.fnt.s-cfg.m*2;
  vs.style.width=w+_u;
  vs.style.height=h+_u;
  var bgd=_i(id+'-bgd');
  if(wm.el.test(bgd))
    {
    bgd.style.width=w+_u;
    bgd.style.height=h+_u;
    }
  var name=_i(id+'-name');
  if(wm.el.test(name))
    {
    name.style.top=(h-cfg.fnt.s-cfg.m)+_u;
    name.style.width=(w-cfg.m)+_u;
    name.style.height=cfg.fnt.s+_u;
    }
  };

wm.vs.tog=function(cfg,n)
  {
  n=wm.int.test(n,wm.vs.get(cfg).n);
  wm.arr.test(cfg.vs).forEach(function(v)
    {
    v.tog=(v.n===n);
    var id='vs'+v.n+'-'+cfg.id;
    var el=_i(id);
    if(wm.el.test(el)){el.style.zIndex=v.tog?2:1;}
    var btn=_i(id+'-btn');
    if(wm.el.test(btn))
      {
      var x=wm.img.btn.h*(v.tog?3:2);
      btn.style[_bp]='-'+x+_u+' 0'+_u;
      }
    });
  wm.ls.sav(cfg);
  wm.wdw.sel(cfg);
  };

wm.vs.get=function(cfg,n)
  {
  var vs={};
  cfg.vs=wm.arr.test(cfg.vs);
  cfg.vs.forEach(function(v){if(v.n===n){vs=v;}});
  if(!wm.obj.isempty(vs)){return vs;}
  cfg.vs.forEach(function(v){if(wm.bool.test(v.tog)){vs=v;}});
  return !wm.obj.isempty(vs)?vs:wm.obj.test(cfg.vs[0]);
  };

wm.vs.ins=function(cfg,n,el)
  {
  n=wm.vs.get(cfg,n).n;
  var vs=_i('vs'+n+'-'+cfg.id+'-bgd');
  if(wm.el.test(vs)){vs[_ac](el);}
  };
/*----------------------------------------------------------------------------*/
wm.stg={};

wm.stg.btn=function(cfg)
  {
  cfg.snp=!wm.bool.test(cfg.snp);
  var btn=_i(cfg.id+'-stg-btn');
  if(wm.el.test(btn))
    {
    btn.style[_bp]='-'+((cfg.snp?5:4)*wm.img.sta.h)+_u+' 0'+_u;
    }
  if(cfg.snp)
    {
    wm.stg.ini(cfg);
    wm.arr.test(cfg.wdw).forEach(function(v){wm.wdw.ini(cfg,v.id);});
    }
  };

wm.stg.ini=function(cfg,t)
  {
  var el=_i(cfg.root);
  if(!wm.el.test(el)){return;}
  t=wm.int.test(t,-1);
  var w=el[_ow];
  var h=el[_oh]-cfg.fnt.s-cfg.m*2;
  cfg.stg=wm.obj.test(cfg.stg);
  cfg.stg.nx=cfg.stg.n;
  cfg.stg.ny=wm.int.test(cfg.stg.n*(h/w));
  cfg.stg.w=(w-cfg.stg.m)/cfg.stg.nx;
  cfg.stg.h=(h-cfg.stg.m)/cfg.stg.ny;
  if(!cfg.stg.to&&t>-1){cfg.stg.to=setTimeout(wm.stg.add,t,cfg,el,w,h);}
  };

wm.stg.add=function(cfg,w,h,el)
  {
  if(!cfg.snp){return;}
  cfg.stg=wm.obj.test(cfg.stg);
  clearTimeout(cfg.stg.to);
  var vs=_i('vs'+wm.vs.get(cfg).n+'-'+cfg.id+'-bgd');
  if(!wm.el.test(vs)){return;}
  var stg=_e('div');
  stg.id=cfg.id+'-stg';
  stg.style.position='absolute';
  stg.style.width=w+_u;
  stg.style.height=h+_u;
  var i=0;
  var j=0;
  while(j<cfg.stg.ny)
    {
    i=0;
    while(i<cfg.stg.nx)
      {
      el=_e('div');
      el.id=cfg.id+'-stg-'+i+'-'+j;
      el.className=wm.css.cls(cfg,'img-stg');
      el.style.position='absolute';
      el.style.left=wm.int.test(i*cfg.stg.w+cfg.stg.m)+_u;
      el.style.top=wm.int.test(j*cfg.stg.h+cfg.stg.m)+_u;
      el.style.width=wm.int.test(cfg.stg.w-cfg.stg.m)+_u;
      el.style.height=wm.int.test(cfg.stg.h-cfg.stg.m)+_u;
      el.style[_br]=cfg.r+_u;
      stg[_ac](el);
      i+=1;
      }
    j+=1;
    }
  el=_i(cfg.id+'-stg');
  if(wm.el.test(el)){_r(el);}
  vs[_ac](stg);
  if(cfg.bgd){vs.className='';}
  cfg.stg.to=false;
  };

wm.stg.del=function(cfg)
  {
  cfg.stg=wm.obj.test(cfg.stg);
  clearTimeout(cfg.stg.to);
  cfg.stg.to=false;
  var el=_i(cfg.id+'-stg');
  if(wm.el.test(el)){_r(el);}
  var vs=_i('vs'+wm.vs.get(cfg).n+'-'+cfg.id+'-bgd');
  if(wm.el.test(vs)&&cfg.bgd){vs.className=wm.css.cls(cfg,'img-bgd');}
  };

wm.stg.snp=function(cfg,x,y,o)
  {
  cfg.stg=wm.obj.test(cfg.stg);
  o=wm.math.clp(wm.int.test(o,0),0,3);
  x=cfg.stg.m+Math.floor(x/cfg.stg.w)*cfg.stg.w;
  y=cfg.stg.m+Math.floor(y/cfg.stg.h)*cfg.stg.h;
  if(o===1||o===2){x+=cfg.stg.w-cfg.stg.m*2;}
  if(o===2||o===3){y+=cfg.stg.h-cfg.stg.m*2;}
  return {x:wm.int.test(x),y:wm.int.test(y)};
  };

wm.stg.get=function(cfg,nx,ny,nw,nh,f)
  {
  cfg.stg=wm.obj.test(cfg.stg);
  nx=wm.int.test(nx,1)%cfg.stg.nx;
  ny=wm.int.test(ny,1)%cfg.stg.ny;
  if(nx<1){nx=cfg.stg.nx-Math.abs(nx);}
  if(ny<1){ny=cfg.stg.ny-Math.abs(ny);}
  var x=wm.int.test(cfg.stg.m+(nx-1)*cfg.stg.w);
  var y=wm.int.test(cfg.stg.m+(ny-1)*cfg.stg.h);
  nw=(wm.int.test(nw,1)-nx+1)%cfg.stg.nx;
  nh=(wm.int.test(nh,1)-ny+1)%cfg.stg.ny;
  if(nw<1){nw=cfg.stg.nx-Math.abs(nw);}
  if(nh<1){nh=cfg.stg.ny-Math.abs(nh);}
  var w=wm.int.test(nw*cfg.stg.w-cfg.stg.m);
  var h=wm.int.test(nh*cfg.stg.h-cfg.stg.m);
  if(wm.str.test(f)==='%')
    {
    var el=_i('vs'+wm.vs.get(cfg).n+'-'+cfg.id);
    if(wm.el.test(el))
      {
      x=x/el[_ow]*100;
      x=((x!==wm.int.test(x))?x.toFixed(4):wm.int.test(x))+'%';
      y=y/el[_oh]*100;
      y=((y!==wm.int.test(y))?y.toFixed(4):wm.int.test(y))+'%';
      w=w/el[_ow]*100;
      w=((w!==wm.int.test(w))?w.toFixed(4):wm.int.test(w))+'%';
      h=h/el[_oh]*100;
      h=((h!==wm.int.test(h))?h.toFixed(4):wm.int.test(h))+'%';
      }
    }
  return {x:x,y:y,w:w,h:h};
  };
/*----------------------------------------------------------------------------*/
wm.wdw={};

wm.wdw.add=function(cfg,p)
  {
  cfg.wdw=wm.arr.test(cfg.wdw);
  p=wm.obj.test(p);
  var id=wm.str.test(p.id,false);
  if(!id){id='wdw'+wm.id(cfg)+'-'+cfg.id;}
  if(wm.el.test(_i(id))){return id;}
  var vs=wm.int.test(p.vs,wm.vs.get(cfg).n);
  p.txt=wm.str.test(p.txt,id);
  p.hdr=wm.bool.test(p.hdr,true);
  p.rsz=wm.bool.test(p.rsz,true);
  p.exp=wm.bool.test(p.exp);
  var b=wm.int.test(p.b,cfg.b);
  var m=wm.int.test(p.m);
  var r=wm.math.clp(cfg.r-b*2,0);
  var z=wm.int.test(p.z);
  if(z===0)
    {
    z=1;
    cfg.wdw.forEach(function(v){if(v.vs===vs){z+=1;}});
    }
  p.z=z;
  wm.arr.test(cfg.ico).forEach(function(v){if(v.vs===vs){z+=1;}});
  /* window */
  var el=_e('div');
  el.id=id;
  el.style.position='absolute';
  el.style[_br]=cfg.r+_u;
  if(b>0){el.style[_bc]=wm.col.get('bdr');}
  el.style.overflow='hidden';
  el.style.zIndex=z;
  //el[_ae]('mouseover',function(){wm.wdw.sel(cfg,id);});
  //el[_ae]('mouseout',function(){wm.wdw.sel(cfg);});
  el[_ae]('mousedown',function(e)
    {
    wm.wdw.sel(cfg,id);
    wm.wdw.z(cfg,id);
    e.preventDefault();
    });
  /* header */
  if(p.hdr){el[_ac](wm.wdw.hdr(cfg,id,p.txt,p.exp));}
  /* menu */
  var mnu=!wm.arr.isempty(p.mnu);
  if(mnu){el[_ac](wm.wdw.mnu(cfg,id,p.mnu,p.hdr,b));}
  /* background */
  var bgd=_e('div');
  bgd.id=id+'-bgd';
  bgd.style.position='absolute';
  bgd.style.left=b+_u;
  bgd.style.top=((p.hdr?cfg.fnt.s+cfg.m*2:b)+(mnu?cfg.fnt.s+cfg.m*2:0))+_u;
  bgd.style[_br]=(!p.hdr?r+_u+' '+r+_u:'0 0')+' '+r+_u+' '+r+_u;
  bgd.style[_bc]=wm.col.get('wdw');
  bgd.style.overflow='hidden';
  el[_ac](bgd);
  /* content */
  var con=_e('div');
  con.id=id+'-con';
  con.style.position='absolute';
  con.style[_bc]=wm.col.get('wdw');
  con.style.color=wm.col.get('txt');
  con.style.padding=m+_u;
  bgd[_ac](con);
  /* buttons */
  if(p.rsz)
    {
    var btn=wm.ui.ico(cfg,'wdw',4,id+'-rsz');
    btn.style.cursor='nwse-resize';
    btn.style[_br]=wm.css.msk('001',cfg.r-cfg.b);
    btn.style.zIndex=1024;
    btn[_ae]('mousedown',function(){cfg.evt={t:'wdw',a:'rsz',id:id};});
    el[_ac](btn);
    }
  /* init */
  var o={x:p.x,y:p.y,w:p.w,h:p.h};
  if(p.exp)
    {
    p.x=0;
    p.y=0;
    p.w='100%';
    p.h='100%';
    }
  if(!cfg.wdw.some(function(v){return (v.id===id);}))
    {
    var nc={id:id,vs:vs,txt:p.txt,hdr:p.hdr,rsz:p.rsz,exp:p.exp};
    if(!wm.arr.isempty(p.mnu)){nc.mnu=p.mnu;}
    nc=wm.obj.merge(nc,{x:p.x,y:p.y,z:p.z,w:p.w,h:p.h,b:b,m:m});
    if(p.exp){nc.o=o;}
    if(!wm.obj.isempty(p.e)){nc.e=p.e;}
    cfg.wdw.push(nc);
    wm.ls.sav(cfg);
    }
  wm.vs.ins(cfg,vs,el);
  wm.wdw.ini(cfg,id);
  wm.dbg.log(cfg,'add "'+id+'" to vs'+vs);
  wm.wdw.sel(cfg,id);
  return id;
  };

wm.wdw.hdr=function(cfg,id,name,exp)
  {
  var hdr=_e('div');
  hdr.id=id+'-hdr';
  hdr.style.position='absolute';
  hdr.style.height=(cfg.fnt.s+cfg.m*2)+_u;
  hdr.style[_br]=cfg.r+_u;
  hdr.style[_bc]=wm.col.get('bdr');
  /* title */
  var m=wm.int.test((cfg.fnt.s-wm.img.wdw.h)/2);
  var txt=_e('div');
  txt.id=id+'-txt';
  txt.style.position='absolute';
  txt.style.top=cfg.m+_u;
  txt.style.left=((cfg.m+m)*2+wm.img.wdw.h)+_u;
  txt.style.height=cfg.fnt.s+_u;
  txt.style.lineHeight=cfg.fnt.s+_u;
  txt.style.whiteSpace='nowrap';
  txt.style.textOverflow='ellipsis';
  txt.style.overflow='hidden';
  txt.style.cursor='move';
  txt[_ac](_n(name));
  txt[_ae]('mousedown',function(){cfg.evt={t:'wdw',a:'mv',id:id};});
  hdr[_ac](txt);
  /* buttons */
  var btn=wm.ui.ico(cfg,'btn',(cfg.wid===id)?1:0,id+'-sta');
  btn.style.top=(cfg.m+m)+_u;
  btn.style.left=(cfg.m+m)+_u;
  btn.style.cursor='context-menu';
  //btn[_ae]('mouseup',function(){wm.wdw.mnu(cfg,id);});
  hdr[_ac](btn);
  btn=wm.ui.ico(cfg,'wdw',1,id+'-del','close');
  btn.style.top=(cfg.m+m)+_u;
  btn[_ae]('mouseup',function(){wm.wdw.del(cfg,id);});
  hdr[_ac](btn);
  btn=wm.ui.ico(cfg,'wdw',exp?3:2,id+'-exp','expand');
  btn.style.top=(cfg.m+m)+_u;
  btn[_ae]('mousedown',function(){cfg.evt={t:'wdw',a:'exp',id:id};});
  hdr[_ac](btn);
  return hdr;
  };

wm.wdw.mnu=function(cfg,id,lst,hdr,b)
  {
  var mnu=_e('div');
  mnu.id=id+'-mnu';
  mnu.style.position='absolute';
  mnu.style.height=(cfg.fnt.s+cfg.m*2)+_u;
  mnu.style[_bc]=wm.col.get('bgd');
  mnu.style.color=wm.col.get('bdr');
  mnu.style.overflow='hidden';
  mnu.style.left=b+_u;
  mnu.style.top=(hdr?cfg.fnt.s+cfg.m*2:b)+_u;
  mnu.style.height=(cfg.fnt.s+cfg.m*2)+_u;
  var con=_e('div');
  con.style.position='absolute';
  con.style.whiteSpace='nowrap';
  con.style.height=(cfg.fnt.s+cfg.m*2)+_u;
  wm.arr.test(lst).forEach(function(p,i,a)
    {
    var btn=wm.mnu.btn(cfg,p,0);
    btn.id=id+'-mnu-'+wm.str.test(p.id,i);
    btn.style.float='left';
    con[_ac](btn);
    if(i<a.length-1) /* separator */
      {
      var el=_e('div');
      el.style.float='left';
      el.style.width=b+_u;
      el.style.height=cfg.fnt.s+_u;
      el.style.margin=cfg.m+_u;
      el.style[_bc]=wm.col.get('wdw');
      con[_ac](el);
      }
    });
  mnu[_ac](con);
  return mnu;
  };

wm.wdw.ini=function(cfg,id)
  {
  var wdw=wm.wdw.get(cfg,id); id=wdw.id;
  var el=_i(id);
  if(!wm.el.test(el)){return;}
  var x=wm.size.get(wdw,'x');
  var y=wm.size.get(wdw,'y');
  var w=wm.size.get(wdw,'w');
  var h=wm.size.get(wdw,'h');
  var snp;
  if(cfg.snp&&!wdw.exp&&wdw.rsz)
    {
    snp=wm.stg.snp(cfg,x,y);
    x=snp.x;
    y=snp.y;
    snp=wm.stg.snp(cfg,w,h,2);
    w=snp.x;
    h=snp.y;
    }
  var mw=10+wm.img.wdw.h*3+cfg.m*4;
  var mh=10+cfg.fnt.h+cfg.m*2+wm.img.wdw.h;
  var pw=el[_pn][_ow];
  var ph=el[_pn][_oh];
  w=wm.math.clp(w,mw,pw-(cfg.snp?cfg.stg.m*2:0));
  h=wm.math.clp(h,mh,ph-(cfg.snp?cfg.stg.m*2:0));
  if(wdw.x<0&&wdw.w==='auto'){x=pw-w-(cfg.snp?cfg.stg.m:0)-wdw.x;}
  if(wdw.y<0&&wdw.h==='auto'){y=ph-h-(cfg.snp?cfg.stg.m:0)-wdw.y;}
  x=wm.math.clp(x,cfg.snp?cfg.stg.m:null,pw-w);
  y=wm.math.clp(y,cfg.snp?cfg.stg.m:null,ph-h);
  el.style.left=((x+w<pw)?x:pw-w)+_u;
  el.style.top=((y+h<ph)?y:ph-h)+_u;
  el.style.width=w+_u;
  el.style.height=h+_u;
  var mnu=_i(id+'-mnu');
  var bgd=_i(id+'-bgd');
  if(wm.el.test(bgd))
    {
    bgd.style.width=(w-wdw.b*2)+_u;
    var v=wdw.hdr?cfg.fnt.s+cfg.m*2:wdw.b;
    if(wm.el.test(mnu)){v+=cfg.fnt.s+cfg.m*2;}
    bgd.style.height=(h-v-wdw.b)+_u;
    }
  var con=_i(id+'-con');
  if(wm.el.test(con))
    {
    con.style.left=-wm.int.test(wdw.sbh)+_u;
    con.style.top=-wm.int.test(wdw.sbv)+_u;
    }
  var btn=_i(id+'-rsz-btn');
  if(wm.el.test(btn))
    {
    btn.style.left=(w-wdw.b-wm.img.wdw.h)+_u;
    btn.style.top=(h-wdw.b-wm.img.wdw.h)+_u;
    }
  if(wdw.hdr)
    {
    var m=wm.int.test((cfg.fnt.s-wm.img.wdw.h)/2);
    var hdr=_i(id+'-hdr');
    if(wm.el.test(hdr)){hdr.style.width=w+_u;}
    var txt=_i(id+'-txt');
    if(wm.el.test(txt))
      {
      txt.style.width=(w-(cfg.m+m)*2-3*(wm.img.wdw.h+cfg.m+m))+_u;
      }
    wm.wdw.dbg(cfg,id);
    btn=_i(id+'-del-btn');
    if(wm.el.test(btn)){btn.style.left=(w-cfg.m-m-wm.img.wdw.h)+_u;}
    btn=_i(id+'-exp-btn');
    if(wm.el.test(btn)){btn.style.left=(w-(cfg.m+m+wm.img.wdw.h)*2)+_u;}
    }
  if(wm.el.test(mnu)){mnu.style.width=(w-wdw.b*2)+_u;}
  wdw.x=wm.size.set(wdw,x,'x');
  wdw.y=wm.size.set(wdw,y,'y');
  wdw.w=wm.size.set(wdw,w,'w');
  wdw.h=wm.size.set(wdw,h,'h');
  if(wm.fn.test(wm.obj.test(wdw.e).rsz)){wdw.e.rsz(cfg,id);}
  wm.sb.v.ini(cfg,id);
  wm.sb.h.ini(cfg,id);
  };

wm.wdw.css=function(id,k,v)
  {
  var el=_i(id+'-con');
  if(!wm.el.test(el)){return;}
  el.style[wm.str.test(k)]=v;
  };

wm.wdw.dbg=function(cfg,id)
  {
  var wdw=wm.wdw.get(cfg,id); id=wdw.id;
  if(!wdw.hdr){return;}
  var txt=wdw.txt;
  var el=_i(id);
  if(cfg.dbg&&wm.el.test(el))
    {
    txt+=((id!==txt)?' ('+id+')':'')+' | z:'+wdw.z;
    txt+=' | p:'+el[_ox]+'*'+el[_oy];
    txt+=' | s:'+el[_ow]+'*'+el[_oh];
    }
  el=_i(id+'-txt');
  if(wm.el.test(el)){el.innerText=txt;}
  };

wm.wdw.mv=
  {
  dwn:function(cfg,id)
    {
    var box=wm.wdw.box(cfg,id);
    if(!wm.el.test(box)){return;}
    cfg.mse={x:wm.mse.x-box[_ox],y:wm.mse.y-box[_oy]};
    if(cfg.dbg){wm.tt.add(cfg,box[_ox]+'*'+box[_oy]);}
    wm.stg.ini(cfg,0);
    },
  up:function(cfg,id)
    {
    var box=_i('box-'+cfg.id);
    if(!wm.el.test(box)){return;}
    var wdw=wm.wdw.get(cfg,id);
    wdw.x=wm.size.set(wdw,box[_ox]+cfg.b,'x');
    wdw.y=wm.size.set(wdw,box[_oy]+cfg.b,'y');
    wm.wdw.ini(cfg,id);
    _r(box);
    if(cfg.dbg){wm.tt.del(cfg);}
    wm.stg.del(cfg);
    },
  mv:function(cfg)
    {
    var box=_i('box-'+cfg.id);
    if(!wm.el.test(box)){return;}
    var pn=box[_pn];
    var w=pn[_ow]-box[_ow]-(cfg.snp?cfg.stg.m:0);
    var h=pn[_oh]-box[_oh]-(cfg.snp?cfg.stg.m:0);
    var x=wm.math.clp(wm.mse.x-cfg.mse.x,0,w);
    var y=wm.math.clp(wm.mse.y-cfg.mse.y,0,h);
    if(cfg.snp)
      {
      var snp=wm.stg.snp(cfg,x,y);
      x=snp.x-cfg.b;
      y=snp.y-cfg.b;
      }
    box.style.left=wm.int.test(x)+_u;
    box.style.top=wm.int.test(y)+_u;
    if(cfg.dbg){wm.tt.add(cfg,box[_ox]+'*'+box[_oy]);}
    },
  inc:function(cfg,x,y)
    {
    var box=_i('box-'+cfg.id);
    if(!wm.el.test(box)){return;}
    var m=cfg.snp?cfg.stg.m:0;
    var pn=box[_pn];
    var w=pn[_ow]-box[_ow]-m;
    var h=pn[_oh]-box[_oh]-m;
    x=box[_ox]+x;
    y=box[_oy]+y;
    if(cfg.snp)
      {
      x=Math.floor(x/cfg.stg.w)*cfg.stg.w+cfg.stg.m-cfg.b;
      y=Math.floor(y/cfg.stg.h)*cfg.stg.h+cfg.stg.m-cfg.b;
      }
    x=wm.math.clp(x,m-cfg.b,w+cfg.b*2);
    y=wm.math.clp(y,m-cfg.b,h+cfg.b*2);
    box.style.left=wm.int.test(x)+_u;
    box.style.top=wm.int.test(y)+_u;
    if(cfg.dbg){wm.tt.add(cfg,box[_ox]+'*'+box[_oy]);}
    }
  };

wm.wdw.rsz=
  {
  dwn:function(cfg,id)
    {
    var box=wm.wdw.box(cfg,id);
    if(!wm.el.test(box)){return;}
    cfg.mse={x:wm.mse.x-box[_ow],y:wm.mse.y-box[_oh]};
    if(cfg.dbg){wm.tt.add(cfg,box[_ow]+'*'+box[_oh]);}
    wm.stg.ini(cfg,0);
    },
  up:function(cfg,id)
    {
    var box=_i('box-'+cfg.id);
    if(!wm.el.test(box)){return;}
    var wdw=wm.wdw.get(cfg,id);
    wdw.w=wm.size.set(wdw,box[_ow]-cfg.b*2,'w');
    wdw.h=wm.size.set(wdw,box[_oh]-cfg.b*2,'h');
    wm.wdw.ini(cfg,id);
    _r(box);
    if(cfg.dbg){wm.tt.del(cfg);}
    wm.stg.del(cfg);
    },
  mv:function(cfg)
    {
    var box=_i('box-'+cfg.id);
    if(!wm.el.test(box)){return;}
    var pn=box[_pn];
    var w=pn[_ow]-box[_ox]-(cfg.snp?cfg.stg.m:0);
    var h=pn[_oh]-box[_oy]-(cfg.snp?cfg.stg.m:0);
    var x=wm.math.clp(wm.mse.x-cfg.mse.x,(cfg.b+cfg.m)*2,w);
    var y=wm.math.clp(wm.mse.y-cfg.mse.y,(cfg.b+cfg.m)*2,h);
    if(cfg.snp)
      {
      var snp=wm.stg.snp(cfg,x,y,2);
      x=snp.x+cfg.b*2;
      y=snp.y+cfg.b*2;
      }
    box.style.width=wm.int.test(x-cfg.b*2)+_u;
    box.style.height=wm.int.test(y-cfg.b*2)+_u;
    if(cfg.dbg){wm.tt.add(cfg,box[_ow]+'*'+box[_oh]);}
    },
  inc:function(cfg,x,y)
    {
    var box=_i('box-'+cfg.id);
    if(!wm.el.test(box)){return;}
    var pn=box[_pn];
    var w=pn[_ow]-box[_ox]-(cfg.snp?cfg.stg.m:0);
    var h=pn[_oh]-box[_oy]-(cfg.snp?cfg.stg.m:0);
    var m=(cfg.b+cfg.m)*2;
    x=box[_ow]+x;
    y=box[_oh]+y;
    if(cfg.snp)
      {
      x=Math.floor((x+cfg.stg.m)/cfg.stg.w)*cfg.stg.w-cfg.stg.m+cfg.b*2;
      y=Math.floor((y+cfg.stg.m)/cfg.stg.h)*cfg.stg.h-cfg.stg.m+cfg.b*2;
      }
    x=wm.math.clp(x,cfg.snp?cfg.stg.w-cfg.stg.m+cfg.b*2:m,w+cfg.b*2);
    y=wm.math.clp(y,cfg.snp?cfg.stg.h-cfg.stg.m+cfg.b*2:m,h+cfg.b*2);
    box.style.width=wm.int.test(x-cfg.b*2)+_u;
    box.style.height=wm.int.test(y-cfg.b*2)+_u;
    if(cfg.dbg){wm.tt.add(cfg,box[_ow]+'*'+box[_oh]);}
    }
  };

wm.wdw.exp=
  {
  dwn:function(cfg,id)
    {
    wm.wdw.box(cfg,id);
    },
  up:function(cfg,id)
    {
    var wdw=wm.wdw.get(cfg,id); id=wdw.id;
    wdw.exp=!wm.bool.test(wdw.exp);
    var btn=_i(id+'-exp-btn');
    if(wm.el.test(btn))
      {
      btn.style[_bp]='-'+((wdw.exp?3:2)*wm.img.wdw.h)+_u+' 0'+_u;
      }
    if(wdw.exp)
      {
      wdw.o={x:wdw.x,y:wdw.y,w:wdw.w,h:wdw.h};
      wdw.x=0;
      wdw.y=0;
      wdw.w='100%';
      wdw.h='100%';
      }
    else
      {
      var o=wm.obj.test(wdw.o);
      wdw.x=o.x;
      wdw.y=o.y;
      wdw.w=o.w;
      wdw.h=o.h;
      delete wdw.o;
      }
    var box=_i('box-'+cfg.id);
    if(wm.el.test(box)){_r(box);}
    wm.wdw.ini(cfg,id);
    }
  };

wm.wdw.del=function(cfg,id)
  {
  var el=_i(id);
  if(!wm.el.test(el)){return;}
  cfg.wdw=wm.arr.test(cfg.wdw);
  var wdw=wm.wdw.get(cfg,id);
  el.style.display='none';
  wm.wdw.clr(cfg,id);
  _r(el);
  wm.tt.del(cfg);
  var n=0;
  cfg.wdw.forEach(function(v,i)
    {
    if(v.id===id){n=i;}
    if(v.vs===wdw.vs&&v.z>wdw.z){v.z-=1;}
    });
  cfg.wdw.splice(n,1);
  wm.ls.sav(cfg);
  };

wm.wdw.get=function(cfg,id)
  {
  cfg.wdw=wm.arr.test(cfg.wdw);
  var wdw={};
  cfg.wdw.forEach(function(v){if(v.id===id){wdw=v;}});
  if(!wm.obj.isempty(wdw)){return wdw;}
  cfg.wdw.forEach(function(v){if(cfg.wid){wdw=v;}});
  if(!wm.obj.isempty(wdw)){return wdw;}
  var vs=wm.vs.get(cfg).n;
  cfg.wdw.forEach(function(v){if(v.vs===vs){wdw=v;}});
  return wdw;
  };

wm.wdw.ins=function(cfg,id,node)
  {
  var el=_i(id+'-bgd');
  if(wm.el.test(el))
    {
    el[_ac](node);
    setTimeout(function(){wm.wdw.ini(cfg,id);},1);
    }
  };

wm.wdw.txt=function(cfg,id,txt)
  {
  var el=_i(id+'-con');
  if(wm.el.test(el))
    {
    el.innerHTML+=wm.str.test(String(txt));
    setTimeout(function(){wm.wdw.ini(cfg,id);},1);
    }
  };

wm.wdw.clr=function(cfg,id)
  {
  var lst=[];
  wm.arr.test(cfg.ico).forEach(function(v){if(v.wdw===id){lst.push(v.id);}});
  lst.forEach(function(v){wm.ico.del(cfg,v);});
  var el=_i(id+'-con');
  wm.el.clr(el);
  setTimeout(function(){wm.wdw.ini(cfg,id);},1);
  };

wm.wdw.sel=function(cfg,id)
  {
  cfg.wdw=wm.arr.test(cfg.wdw);
  var vs=wm.vs.get(cfg).n;
  var test=cfg.wdw.some(function(v){return (v.id===id&&v.vs===vs);});
  if(!test)
    {
    id=false;
    var z=0;
    cfg.wdw.forEach(function(v){if(v.vs===vs&&v.z>z){id=v.id;z=v.z;}});
    }
  if(id===cfg.wid){return;}
  cfg.wid=id;
  cfg.wdw.forEach(function(v)
    {
    if(v.vs!==vs){return;}
    var el=_i(v.id+'-sta-btn');
    if(wm.el.test(el))
      {
      el.style[_bp]='-'+(wm.img.btn.h*((v.id===cfg.wid)?1:0))+_u+' 0'+_u;
      }
    });
  wm.sta.dbg(cfg);
  wm.dbg.log(cfg,'select window "'+id+'"');
  };

wm.wdw.z=function(cfg,id,upd)
  {
  upd=wm.bool.test(upd,true);
  cfg.wdw=wm.arr.test(cfg.wdw);
  var wdw=wm.wdw.get(cfg,id); id=wdw.id;
  var z=wm.math.clp(wm.int.test(wdw.z),1);
  var vs=wm.vs.get(cfg).n;
  var max=0;
  if(upd){cfg.wdw.forEach(function(v){if(v.vs===vs){max+=1;}});}
  var n=0;
  wm.arr.test(cfg.ico).forEach(function(v){if(v.vs===vs){n+=1;}});
  cfg.wdw.forEach(function(v)
    {
    if(v.vs!==vs){return;}
    if(upd){v.z=(v.id===id)?max:((v.z>=z)?v.z-1:v.z);}
    var el=_i(v.id);
    if(wm.el.test(el)){el.style.zIndex=n+v.z;}
    if(upd){wm.wdw.dbg(cfg,v.id);}
    });
  };

wm.wdw.box=function(cfg,id,upd)
  {
  var box=_i('box-'+cfg.id);
  if(wm.el.test(box)&&wm.bool.test(upd)){return box;}
  var el=_i(id);
  if(!wm.el.test(el)){return;}
  if(wm.el.test(box)){_r(box);}
  box=_e('div');
  box.id='box-'+cfg.id;
  box.style.position='absolute';
  box.style.left=(el[_ox]-cfg.b)+_u;
  box.style.top=(el[_oy]-cfg.b)+_u;
  box.style.width=el[_ow]+_u;
  box.style.height=el[_oh]+_u;
  box.style.borderStyle='solid';
  box.style.borderWidth=cfg.b+_u;
  box.style[_br]=(cfg.r+cfg.b)+_u;
  box.style.borderColor=wm.col.get('sel');
  box.style.cursor='move';
  box.style.zIndex=1024;
  wm.vs.ins(cfg,null,box);
  return box;
  };
/*----------------------------------------------------------------------------*/
wm.sb={};

wm.sb.v=
  {
  upd:function(cfg,id,y)
    {
    var bar=_i(id+'-sbv-bar');
    var btn=_i(id+'-sbv-btn');
    var up=_i(id+'-sbv-pgup');
    var dwn=_i(id+'-sbv-pgdwn');
    if(wm.el.test(bar)&&wm.el.test(btn)&&wm.el.test(up)&&wm.el.test(dwn))
      {
      y=wm.math.clp(y,0,bar[_oh]-btn[_oh]);
      btn.style.top=y+_u;
      up.style.height=y+_u;
      dwn.style.top=(y+btn[_oh])+_u;
      dwn.style.height=(bar[_oh]-y-btn[_oh])+_u;
      var con=_i(id+'-con');
      if(wm.el.test(con))
        {
        var r=con[_oh]/bar[_oh];
        con.style.top=-wm.int.test(y*r)+_u;
        var wdw=wm.wdw.get(cfg,id);
        wdw.sbv=wm.int.test(y*r);
        }
      }
    },
  dwn:function(cfg,id)
    {
    var btn=_i(id+'-sbv-btn');
    if(!wm.el.test(btn)){return;}
    cfg.mse={x:wm.mse.x-btn[_ox],y:wm.mse.y-btn[_oy]};
    },
  up:function(cfg,id)
    {
    wm.sb.v.mv(cfg,id);
    },
  mv:function(cfg,id)
    {
    wm.sb.v.upd(cfg,id,wm.mse.y-cfg.mse.y);
    },
  pgup:function(cfg,id)
    {
    var btn=_i(id+'-sbv-btn');
    if(wm.el.test(btn)){wm.sb.v.upd(cfg,id,btn[_oy]-btn[_oh]);}
    },
  pgdwn:function(cfg,id)
    {
    var btn=_i(id+'-sbv-btn');
    if(wm.el.test(btn)){wm.sb.v.upd(cfg,id,btn[_oy]+btn[_oh]);}
    },
  end:function(cfg,id)
    {
    var el=_i(id+'-sbv');
    if(wm.el.test(el)){wm.sb.v.upd(cfg,id,el[_oh]);}
    },
  inc:function(cfg,id,y)
    {
    var btn=_i(id+'-sbv-btn');
    if(wm.el.test(btn)){wm.sb.v.upd(cfg,id,btn[_oy]+wm.int.test(y));}
    }
  };

wm.sb.v.ini=function(cfg,id)
  {
  var bgd=_i(id+'-bgd');
  var con=_i(id+'-con');
  if(!wm.el.test(con)||!wm.el.test(bgd)){return;}
  var sbv=_i(id+'-sbv');
  if(wm.el.test(sbv)){_r(sbv);}
  if(con[_oh]<=bgd[_oh])
    {
    con.style.top=0+_u;
    con.style.paddingRight=0+_u;
    return;
    }
  con.style.paddingRight=(wm.img.wdw.h+cfg.b*2)+_u;
  var t=bgd[_oh];
  var r=(t-cfg.b*2-wm.img.wdw.h)/con[_oh];
  var h=wm.math.clp(wm.int.test(t*r),1);
  var y=wm.math.clp(wm.int.test(Math.abs(con[_oy])*r),0,t-h);
  sbv=_e('div');
  sbv.id=id+'-sbv';
  sbv.style.position='absolute';
  sbv.style.left=(bgd[_ow]-wm.img.wdw.h-cfg.b*2)+_u;
  sbv.style.width=(wm.img.wdw.h+cfg.b*2)+_u;
  sbv.style.height=t+_u;
  sbv.style[_bc]=wm.col.get('wdw');
  var bar=_e('div');
  bar.id=id+'-sbv-bar';
  bar.style.position='absolute';
  bar.style.left=cfg.b+_u;
  bar.style.top=cfg.b+_u;
  bar.style.width=wm.img.wdw.h+_u;
  bar.style.height=(t-cfg.b*2-wm.img.wdw.h)+_u;
  bar.style[_br]=cfg.r+_u;
  bar.style[_bc]=wm.col.get('bgd');
  var btn=_e('div');
  btn.id=id+'-sbv-btn';
  btn.style.position='absolute';
  btn.style.top=y+_u;
  btn.style.width=wm.img.wdw.h+_u;
  btn.style.height=h+_u;
  btn.style[_br]=cfg.r+_u;
  btn.style[_bc]=wm.col.get('bdr');
  btn.style.cursor='ns-resize';
  btn[_ae]('mousedown',function(){cfg.evt={t:'sb',a:'v',id:id};});
  var up=_e('div');
  up.id=id+'-sbv-pgup';
  up.style.position='absolute';
  up.style.width=wm.img.wdw.h+_u;
  up.style.cursor='pointer';
  up[_ae]('mousedown',function(){wm.sb.v.pgup(cfg,id);});
  var dwn=_e('div');
  dwn.id=id+'-sbv-pgdwn';
  dwn.style.position='absolute';
  dwn.style.top=(y+h)+_u;
  dwn.style.width=wm.img.wdw.h+_u;
  dwn.style.cursor='pointer';
  dwn[_ae]('mousedown',function(){wm.sb.v.pgdwn(cfg,id);});
  bar[_ac](btn);
  bar[_ac](up);
  bar[_ac](dwn);
  sbv[_ac](bar);
  bgd[_ac](sbv);
  wm.sb.v.upd(cfg,id,y);
  };

wm.sb.h=
  {
  upd:function(cfg,id,x)
    {
    var bar=_i(id+'-sbh-bar');
    var btn=_i(id+'-sbh-btn');
    var up=_i(id+'-sbh-pgup');
    var dwn=_i(id+'-sbh-pgdwn');
    if(wm.el.test(bar)&&wm.el.test(btn)&&wm.el.test(up)&&wm.el.test(dwn))
      {
      x=wm.math.clp(x,0,bar[_ow]-btn[_ow]);
      btn.style.left=x+_u;
      up.style.width=x+_u;
      dwn.style.left=(x+btn[_ow])+_u;
      dwn.style.width=(bar[_ow]-x-btn[_ow])+_u;
      var con=_i(id+'-con');
      if(wm.el.test(con))
        {
        var r=con[_ow]/bar[_ow];
        con.style.left=-wm.int.test(x*r)+_u;
        var wdw=wm.wdw.get(cfg,id);
        wdw.sbh=wm.int.test(x*r);
        }
      }
    },
  dwn:function(cfg,id)
    {
    var btn=_i(id+'-sbh-btn');
    if(!wm.el.test(btn)){return;}
    cfg.mse={x:wm.mse.x-btn[_ox],y:wm.mse.y-btn[_oy]};
    },
  up:function(cfg,id)
    {
    wm.sb.h.mv(cfg,id);
    },
  mv:function(cfg,id)
    {
    wm.sb.h.upd(cfg,id,wm.mse.x-cfg.mse.x);
    },
  pgup:function(cfg,id)
    {
    var btn=_i(id+'-sbh-btn');
    if(wm.el.test(btn)){wm.sb.h.upd(cfg,id,btn[_ox]-btn[_ow]);}
    },
  pgdwn:function(cfg,id)
    {
    var btn=_i(id+'-sbh-btn');
    if(wm.el.test(btn)){wm.sb.h.upd(cfg,id,btn[_ox]+btn[_ow]);}
    },
  inc:function(cfg,id,x)
    {
    var btn=_i(id+'-sbh-btn');
    if(wm.el.test(btn)){wm.sb.h.upd(cfg,id,btn[_ox]+wm.int.test(x));}
    }
  };

wm.sb.h.ini=function(cfg,id)
  {
  var bgd=_i(id+'-bgd');
  var con=_i(id+'-con');
  if(!wm.el.test(con)||!wm.el.test(bgd)){return;}
  var sbh=_i(id+'-sbh');
  if(wm.el.test(sbh)){_r(sbh);}
  if(con[_ow]<=bgd[_ow])
    {
    con.style.left=0+_u;
    con.style.marginBottom=0+_u;
    return;
    }
  con.style.marginBottom=(wm.img.wdw.h+cfg.b*2)+_u;
  var t=bgd[_ow];
  var r=(t-cfg.b*2-wm.img.wdw.h)/con[_ow];
  var w=wm.math.clp(wm.int.test(t*r),1);
  var x=wm.math.clp(wm.int.test(Math.abs(con[_ox])*r),0,t-w);
  sbh=_e('div');
  sbh.id=id+'-sbh';
  sbh.style.position='absolute';
  sbh.style.top=(bgd[_oh]-wm.img.wdw.h-cfg.b*2)+_u;
  sbh.style.width=(t-wm.img.wdw.h-cfg.b)+_u;
  sbh.style.height=(wm.img.wdw.h+cfg.b*2)+_u;
  sbh.style[_bc]=wm.col.get('wdw');
  var bar=_e('div');
  bar.id=id+'-sbh-bar';
  bar.style.position='absolute';
  bar.style.left=cfg.b+_u;
  bar.style.top=cfg.b+_u;
  bar.style.width=(t-cfg.b*2-wm.img.wdw.h)+_u;
  bar.style.height=wm.img.wdw.h+_u;
  bar.style[_br]=cfg.r+_u;
  bar.style[_bc]=wm.col.get('bgd');
  var btn=_e('div');
  btn.id=id+'-sbh-btn';
  btn.style.position='absolute';
  btn.style.left=x+_u;
  btn.style.width=w+_u;
  btn.style.height=wm.img.wdw.h+_u;
  btn.style[_br]=cfg.r+_u;
  btn.style[_bc]=wm.col.get('bdr');
  btn.style.cursor='ew-resize';
  btn[_ae]('mousedown',function(){cfg.evt={t:'sb',a:'h',id:id};});
  var up=_e('div');
  up.id=id+'-sbh-pgup';
  up.style.position='absolute';
  up.style.height=wm.img.wdw.h+_u;
  up.style.cursor='pointer';
  up[_ae]('mousedown',function(){wm.sb.h.pgup(cfg,id);});
  var dwn=_e('div');
  dwn.id=id+'-sbh-pgdwn';
  dwn.style.position='absolute';
  dwn.style.left=(x+w)+_u;
  dwn.style.height=wm.img.wdw.h+_u;
  dwn.style.cursor='pointer';
  dwn[_ae]('mousedown',function(){wm.sb.h.pgdwn(cfg,id);});
  bar[_ac](btn);
  bar[_ac](up);
  bar[_ac](dwn);
  sbh[_ac](bar);
  bgd[_ac](sbh);
  wm.sb.h.upd(cfg,id,x);
  };
/*----------------------------------------------------------------------------*/
wm.ico={};

wm.ico.add=function(cfg,p)
  {
  cfg.ico=wm.arr.test(cfg.ico);
  p=wm.obj.test(p);
  var id=wm.str.test(p.id,false);
  if(!id){id='ico'+wm.id(cfg)+'-'+cfg.id;}
  if(wm.el.test(_i(id))){return id;}
  p.wdw=wm.el.test(_i(p.wdw))?p.wdw:false;
  p.vs=!p.wdw?wm.vs.get(cfg,p.vs).n:false;
  cfg.ico.forEach(function(v){if(v.id===id){p=v;}});
  p.img=wm.str.test(p.img,'ico');
  if(wm.obj.isempty(wm.img[p.img])){p.img='ico';}
  p.z=wm.int.test(p.z);
  if(p.z===0)
    {
    p.z=1;
    cfg.ico.forEach(function(v){if(v.vs===p.vs&&v.wdw===p.wdw){p.z+=1;}});
    }
  var el=_e('div');
  el.id=id;
  el.className=wm.css.cls(cfg,'img-'+p.img);
  el.style.position='absolute';
  el.style.width=wm.img[p.img].w+_u;
  el.style.height=wm.img[p.img].h+_u;
  el.style.zIndex=p.z;
  el.style.cursor=wm.str.test(p.fn)?'pointer':'default';
  el[_ae]('mouseover',function(){cfg.iid=id;wm.tt.add(cfg,p.tt);});
  el[_ae]('mouseout',function(){cfg.iid=false;wm.tt.del(cfg);});
  el[_ae]('mousedown',function(){cfg.evt={t:'ico',a:'fn',id:id};});
  wm[p.wdw?'wdw':'vs'].ins(cfg,p[p.wdw?'wdw':'vs'],el);
  if(!cfg.ico.some(function(v){return (v.id===id);}))
    {
    var nc={id:id,vs:p.vs,wdw:p.wdw,img:p.img,x:p.x,y:p.y,z:p.z};
    if(wm.str.trim(p.tt)!==''){nc.tt=wm.str.trim(p.tt);}
    if(p.fn){nc.fn=wm.fn.str(p.fn);}
    cfg.ico.push(nc);
    wm.ls.sav(cfg);
    }
  wm.ico.ini(cfg,id);
  wm.arr.test(cfg.wdw).forEach(function(v){wm.wdw.z(cfg,v.id,false);});
  wm.dbg.log(cfg,'add "'+id+'" to '+(p.wdw?'window "'+p.wdw+'"':'vs'+p.vs));
  return id;
  };

wm.ico.ini=function(cfg,id)
  {
  var ico=wm.ico.get(cfg,id); id=ico.id;
  var el=_i(id);
  if(!wm.el.test(el)){return;}
  var x=wm.size.get(ico,'x');
  var y=wm.size.get(ico,'y');
  var snp;
  if(cfg.snp)
    {
    snp=wm.stg.snp(cfg,x,y);
    x=wm.int.test(snp.x+(cfg.stg.w-cfg.stg.m-el[_ow])/2);
    y=wm.int.test(snp.y+(cfg.stg.h-cfg.stg.m-el[_oh])/2);
    ico.x=wm.size.set(ico,x,'x');
    ico.y=wm.size.set(ico,y,'y');
    }
  x=wm.math.clp(x,0,el[_pn][_ow]-el[_ow]);
  y=wm.math.clp(y,0,el[_pn][_oh]-el[_oh]);
  el.style.left=x+_u;
  el.style.top=y+_u;
  };

wm.ico.get=function(cfg,id)
  {
  var ico={};
  wm.arr.test(cfg.ico).forEach(function(v){if(v.id===id){ico=v;}});
  if(!wm.obj.isempty(ico)){return ico;}
  wm.arr.test(cfg.ico).forEach(function(v){if(v.id===cfg.iid){ico=v;}});
  if(!wm.obj.isempty(ico)){return ico;}
  var vs=wm.vs.get(cfg).n;
  wm.arr.test(cfg.ico).forEach(function(v){if(v.vs===vs){ico=v;}});
  return ico;
  };

wm.ico.z=function(cfg,id)
  {
  cfg.ico=wm.arr.test(cfg.ico);
  var ico=wm.ico.get(cfg,id); id=ico.id;
  var n=0;
  cfg.ico.forEach(function(v){if(v.vs===ico.vs&&v.wdw===ico.wdw){n+=1;}});
  var z=wm.int.test(ico.z);
  cfg.ico.forEach(function(v)
    {
    if(v.vs===ico.vs&&v.wdw===ico.wdw)
      {
      if(v.z>=z){v.z-=1;}
      if(v.id===id){v.z=n;}
      var el=_i(v.id);
      if(wm.el.test(el)){el.style.zIndex=v.z;}
      }
    });
  };

wm.ico.del=function(cfg,id)
  {
  cfg.ico=wm.arr.test(cfg.ico);
  var ico=wm.ico.get(cfg,id); id=ico.id;
  var el=_i(id);
  if(!wm.el.test(el)){return;}
  el.style.display='none';
  _r(el);
  wm.tt.del(cfg);
  cfg.ico.forEach(function(v)
    {
    if(v.vs===ico.vs&&v.wdw===ico.wdw&&v.z>ico.z){v.z-=1;}
    });
  var msg='remove "'+id+'" from '+(ico.wdw?'window "'+ico.wdw+'"':'vs'+ico.vs);
  wm.dbg.log(cfg,msg);
  var n=0;
  cfg.ico.forEach(function(v,i){if(v.id===id){n=i;}});
  cfg.ico.splice(n,1);
  wm.ls.sav(cfg);
  };

wm.ico.fn=
  {
  dwn:function(cfg,id)
    {
    var el=_i(id);
    if(!wm.el.test(el)){return;}
    cfg.mse={x:wm.mse.x-el[_ox],y:wm.mse.y-el[_oy]};
    wm.ico.z(cfg,id);
    cfg.evt=wm.obj.test(cfg.evt);
    var fn=function()
      {
      cfg.evt.a='mv';
      wm.ico.mv.dwn(cfg,id);
      };
    if(!cfg.evt.to){cfg.evt.to=setTimeout(fn,250);}
    },
  up:function(cfg,id)
    {
    clearTimeout(wm.obj.test(cfg.evt).to);
    var ico=wm.ico.get(cfg,id);
    var fn=new Function('wm,cfg,id',ico.fn);
    if(wm.fn.test(fn)&&!wm.el.test(_i(cfg.id+'-stg'))){fn(wm,cfg,id);}
    }
  };

wm.ico.mv=
  {
  dwn:function(cfg,id)
    {
    var el=_i(id);
    if(!wm.el.test(el)){return;}
    wm.stg.ini(cfg,250);
    var cl=_c(el);
    cl.id+='-mv';
    cl.style.zIndex=1024;
    var o=wm.el.o(el[_pn]);
    cl.style.left=(el[_ox]+o.x)+_u;
    cl.style.top=(el[_oy]+o.y)+_u;
    cl.style.cursor='move';
    wm.vs.ins(cfg,null,cl);
    if(cfg.dbg){wm.tt.add(cfg,cl[_ox]+'*'+cl[_oy]);}
    el.style.visibility='hidden';
    },
  up:function(cfg,id)
    {
    wm.stg.del(cfg);
    var ico=wm.ico.get(cfg,id); id=ico.id;
    var el=_i(id);
    var cl=_i(id+'-mv');
    if(!wm.el.test(el)||!wm.el.test(cl)){return;}
    var o=wm.el.o(el[_pn]);
    var x=cl[_ox];
    var y=cl[_oy];
    var z=0;
    var vs=wm.vs.get(cfg).n;
    var wdw=false;
    wm.arr.test(cfg.wdw).forEach(function(v)
      {
      if(v.vs!==vs){return;}
      var w=_i(v.id);
      if(!wm.el.test(w)){return;}
      var p={x:w[_ox],y:w[_oy],w:w[_ow],h:w[_oh]};
      if(x>p.x&&x<p.x+p.w&&y>p.y&&y<p.y+p.h&&v.z>=z){wdw=v.id;z=v.z;}
      });
    var bgd;
    if(wdw&&wdw!==ico.wdw)
      {
      ico.wdw=wdw;
      ico.vs=false;
      delete ico.z;
      bgd=_i(wdw+'-bgd');
      if(!wm.el.test(bgd)){return;}
      o=wm.el.o(bgd);
      wm.dbg.log(cfg,'drop "'+id+'" on window "'+wdw+'"');
      }
    if(!wdw&&ico.wdw)
      {
      ico.vs=vs;
      ico.wdw=false;
      delete ico.z;
      bgd=_i('vs'+vs+'-'+cfg.id+'-bgd');
      if(!wm.el.test(bgd)){return;}
      o=wm.el.o(bgd);
      wm.dbg.log(cfg,'drop "'+id+'" on vs'+vs);
      }
    var p=wm.obj.clone(ico);
    p.x=wm.size.set(ico,cl[_ox]-o.x,'x');
    p.y=wm.size.set(ico,cl[_oy]-o.y,'y');
    wm.ico.del(cfg,id);
    wm.ico.add(cfg,p);
    wm.dbg.log(cfg,ico.id+': x='+ico.x+' y='+ico.y);
    wm.ico.ini(cfg,id);
    if(wm.el.test(cl)){_r(cl);}
    if(cfg.dbg){wm.tt.del(cfg);}
    },
  mv:function(cfg,id)
    {
    var el=_i(id);
    if(!wm.el.test(el)){return;}
    var o=wm.el.o(el[_pn]);
    el=_i(id+'-mv');
    if(!wm.el.test(el)){return;}
    var w=el[_pn][_ow]-el[_ow];
    var h=el[_pn][_oh]-el[_oh];
    var x=wm.math.clp(wm.mse.x-cfg.mse.x+o.x,0,w);
    var y=wm.math.clp(wm.mse.y-cfg.mse.y+o.y,0,h);
    el.style.left=x+_u;
    el.style.top=y+_u;
    if(cfg.dbg){wm.tt.add(cfg,x+'*'+y);}
    },
  inc:function(cfg,x,y)
    {
    var el=_i(cfg.iid);
    if(!wm.el.test(el)){return;}
    var m=cfg.snp?cfg.stg.m:0;
    var w=el[_pn][_ow]-el[_ow];
    var h=el[_pn][_oh]-el[_oh];
    x=wm.math.clp(el[_ox]+wm.int.test(x),m,w);
    y=wm.math.clp(el[_oy]+wm.int.test(y),m,h);
    el.style.left=x+_u;
    el.style.top=y+_u;
    if(cfg.dbg){wm.tt.add(cfg,x+'*'+y);}
    }
  };
/*----------------------------------------------------------------------------*/
wm.mnu={};

wm.mnu.add=function(cfg,lst,x,y,n)
  {
  if(wm.arr.isempty(lst)){return;}
  n=wm.int.test(n,1);
  x=wm.int.test(x,wm.mse.x-cfg.b-cfg.m);
  y=wm.int.test(y,wm.mse.y-cfg.b-cfg.m);
  var root=_i(cfg.root);
  if(!wm.el.test(root)){return;}
  wm.msk.add(cfg);
  wm.mnu.del(cfg,n);
  var mnu=_e('div');
  mnu.id=cfg.id+'-mnu'+n;
  mnu.style.position='absolute';
  mnu.style[_br]=cfg.r+_u;
  mnu.style[_bc]=wm.col.get('bdr');
  mnu.style.color=wm.col.get('bdr');
  mnu.style.zIndex=1024;
  root[_ac](mnu);
  var w=0;
  var h=cfg.b;
  var m=wm.img.btn.h+cfg.m+(cfg.fnt.s-wm.img.btn.h);
  lst.forEach(function(p,i)
    {
    if(p.fn){p.fn=wm.fn.str(p.fn);}
    var btn=wm.mnu.btn(cfg,p,n);
    btn.id=cfg.id+'-mnu'+n+'-'+wm.str.test(p.id,i);
    btn.style.position='absolute';
    btn.style.left=cfg.b+_u;
    btn.style.top=h+_u;
    if(i===0){btn.style[_br]=wm.css.msk('11',cfg.r-cfg.b);}
    if(i===lst.length-1){btn.style[_br]=wm.css.msk('0011',cfg.r-cfg.b);}
    mnu[_ac](btn);
    var l=!wm.arr.isempty(p.lst);
    if(btn[_ow]+(l?m:0)>w){w=btn[_ow]+(l?m:0);}
    h+=cfg.fnt.s+cfg.m*2;
    });
  mnu.style.width=(w+cfg.b*2)+_u;
  mnu.style.height=(h+cfg.b)+_u;
  mnu.style.left=wm.math.clp(x,0,cfg.o.x+root[_ow]-mnu[_ow])+_u;
  mnu.style.top=wm.math.clp(y,0,cfg.o.y+root[_oh]-mnu[_oh])+_u;
  lst.forEach(function(p,i)
    {
    var el=_i(cfg.id+'-mnu'+n+'-'+wm.str.test(p.id,i));
    if(wm.el.test(el)){el.style.width=w+_u;}
    });
  wm.tt.del(cfg);
  wm.dbg.log(cfg,'show menu '+n+' at '+mnu[_ox]+'*'+mnu[_oy]);
  };

wm.mnu.btn=function(cfg,p,n)
  {
  if(wm.obj.isempty(p)){return;}
  n=wm.int.test(n,1);
  if(p.fn){p.fn=wm.fn.str(p.fn);}
  var el=_e('div');
  el.style.height=(cfg.fnt.s+cfg.m*2)+_u;
  el.style.whiteSpace='nowrap';
  el.style[_bc]=wm.col.get('bgd');
  el[_ac](wm.mnu.txt(cfg,wm.str.test(p.txt,p.id)));
  if(!wm.arr.isempty(p.lst)||wm.str.test(p.fn))
    {
    el.style.cursor='pointer';
    el[_ae]('mouseover',function(){this.style[_bc]=wm.col.get('btn');});
    el[_ae]('mouseout',function(){this.style[_bc]=wm.col.get('bgd');});
    el[_ae]('mousedown',function(){this.style[_bc]=wm.col.get('txt');});
    }
  else
    {
    el[_ae]('mouseup',function(){wm.mnu.del(cfg,n+1);});
    }
  if(!wm.arr.isempty(p.lst))
    {
    var m=wm.int.test((cfg.fnt.s-wm.img.btn.h)/2);
    var btn=wm.ui.ico(cfg,'btn',(n>0)?5:4);
    btn.style.position='relative';
    btn.style.float='right';
    btn.style.margin=wm.css.msk('111',cfg.m+m);
    el[_ac](btn);
    el[_ae]('mouseup',function()
      {
      var o=wm.el.o(this);
      var pn=this[_pn];
      var x=pn[_ox]+((n>0)?pn[_ow]:cfg.o.x+o.x)-cfg.b;
      var y=pn[_oy]+((n>0)?this[_oy]-cfg.b:cfg.fnt.s+cfg.m*2+o.y+this[_oh]);
      wm.mnu.add(cfg,p.lst,x,y,n+1);
      });
    }
  if(wm.str.test(p.fn))
    {
    el.style.color=wm.col.get('txt');
    var fn=new Function('wm,cfg,id',p.fn);
    el[_ae]('mouseup',function()
      {
      this.style[_bc]=wm.col.get('btn');
      wm.mnu.del(cfg);
      wm.msk.del(cfg);
      fn(wm,cfg,p.id);
      });
    }
  return el;
  };

wm.mnu.txt=function(cfg,txt)
  {
  var el=_e('div');
  el.style.float='left';
  el.style.margin=cfg.m+_u;
  el.style.height=cfg.fnt.s+_u;
  el.style.textOverflow='ellipsis';
  el[_ac](_n(wm.str.test(txt)));
  return el;
  };

wm.mnu.del=function(cfg,n)
  {
  n=wm.int.test(n,1);
  var mnu=_i(cfg.id+'-mnu'+n);
  if(wm.el.test(mnu))
    {
    _r(mnu);
    wm.dbg.log(cfg,'hide menu '+n);
    wm.mnu.del(cfg,n+1);
    }
  };
/*----------------------------------------------------------------------------*/
wm.msk={};

wm.msk.add=function(cfg,bgd)
  {
  var root=_i(cfg.root);
  if(!wm.el.test(root)){return;}
  var msk=_i(cfg.id+'-msk');
  if(wm.el.test(msk)){return;}
  msk=_e('div');
  msk.id=cfg.id+'-msk';
  msk.style.position='absolute';
  if(wm.bool.test(bgd)){msk.className=wm.css.cls(cfg,'img-msk');}
  msk.style.width=root[_ow]+_u;
  msk.style.height=root[_oh]+_u;
  msk.style.zIndex=1024;
  msk[_ae]('mouseup',function(){wm.mnu.del(cfg);wm.msk.del(cfg);});
  root[_ac](msk);
  };

wm.msk.del=function(cfg)
  {
  var msk=_i(cfg.id+'-msk');
  if(wm.el.test(msk)){_r(msk);}
  };
/*----------------------------------------------------------------------------*/
wm.size={};

wm.size.get=function(obj,o)
  {
  obj=wm.obj.test(obj);
  var el=_i(obj.id);
  if(!wm.el.test(el)){return 0;}
  o=(/^(x|y|w|h)$/).test(String(o))?o:false;
  if(!o){return 0;}
  var v=(/x|w/).test(o)?_ow:_oh;
  if(!(/%/).test(obj[o]))
    {
    if(obj[o]==='auto')
      {
      var con=_i(obj.id+'-con');
      if(!wm.el.test(con)){return 0;}
      return con[v]+obj.b*2;
      }
    return wm.int.test(obj[o]);
    }
  else
    {
    var pn=el[_pn];
    return wm.int.test(pn[v]/100*wm.nbr.test(obj[o]));
    }
  };

wm.size.set=function(obj,n,o)
  {
  obj=wm.obj.test(obj);
  var el=_i(obj.id);
  if(!wm.el.test(el)){return 0;}
  var pn=el[_pn];
  o=(/^(x|y|w|h)$/).test(String(o))?o:false;
  if(!o){return 0;}
  if(obj[o]==='auto'){return 'auto';}
  var v=(/x|w/).test(o)?_ow:_oh;
  if(!(/%/).test(obj[o]))
    {
    return wm.int.test(n);
    }
  else
    {
    n=wm.nbr.test(n)/pn[v]*100;
    return ((n!==wm.int.test(n))?n.toFixed(4):wm.int.test(n))+'%';
    }
  };
/*----------------------------------------------------------------------------*/
wm.ui={};

wm.ui.ico=function(cfg,img,n,id,tt)
  {
  img=wm.obj.test(wm.img[img]);
  n=wm.int.test(n);
  var el=_e('div');
  if(wm.str.test(id)){el.id=id+'-btn';}
  el.className=wm.css.cls(cfg,'img-'+img.id);
  el.style[_bp]='-'+(img.h*n)+_u+' 0'+_u;
  el.style.position='absolute';
  el.style.width=img.h+_u;
  el.style.height=img.h+_u;
  el.style.cursor='pointer';
  if(wm.str.test(tt)!=='')
    {
    el[_ae]('mouseover',function(){wm.tt.add(cfg,tt);});
    el[_ae]('mouseout',function(){wm.tt.del(cfg);});
    }
  return el;
  };

wm.ui.cfg=function(cfg,x,y)
  {
  var lst=[
    {txt:'font',lst:[
      {txt:'family',lst:[]},
      {txt:'size',lst:[]},
      {txt:'line height',lst:[]}]
    },
    {txt:'border',lst:[
      {txt:'width',lst:[]},
      {txt:'radius',lst:[]}]
    }];
  wm.mnu.add(cfg,lst,x,y);
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

wm.int=
  {
  test:function(n,d){return Math.round(wm.nbr.test(n,d));}
  };

wm.str=
  {
  test:function(s,d)
    {
    return (typeof s==='string')?s:((typeof d==='string')?d:'');
    },
  trim:function(s)
    {
    return wm.str.test(s).replace(/^\s+|\s+$/g,'');
    },
  rnd:function(n)
    {
    var s; var l; var str=''; var i=0;
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
    },
  clone:function(a)
    {
    return wm.arr.test(a).slice();
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
    return (Object.keys(wm.obj.test(o)).length===0);
    },
  merge:function(o1,o2)
    {
    o1=wm.obj.test(o1);
    Object.keys(wm.obj.test(o2)).forEach(function(v)
      {
      //if(wm.el.test(o1[v])){return;}
      if(o2[v]!==undefined&&o2[v]!==null){o1[v]=o2[v];}
      if(!wm.obj.isempty(o2[v])){o1[v]=wm.obj.merge(o1[v],o2[v]);}
      });
    return o1;
    },
  clone:function(o)
    {
    return JSON.parse(JSON.stringify(wm.obj.test(o)));
    }
  };

wm.fn=
  {
  test:function(f){return (typeof f==='function');},
  str:function(f)
    {
    f=String(f).split('\n').map(function(v){return wm.str.trim(v);}).join('');
    f=f.replace(/function\ \(\)/g,'');
    return f;
    }
  };

wm.el=
  {
  test:function(el,d)
    {
    if(typeof el==='string'){el=_i(el);}
    if(typeof el==='object'&&el!==null&&el.tagName!==null){return el;}
    if(typeof d==='string'){d=_i(d);}
    return (typeof d==='object'&&d!==null&&d.tagName!==null)?d:false;
    },
  clr:function(el)
    {
    if(wm.el.test(el)){while(el.firstChild){el.removeChild(el.firstChild);}}
    },
  o:function(el)
    {
    var o={x:0,y:0};
    wm.el.oloop(el,o);
    return o;
    },
  oloop:function(el,o)
    {
    if(!wm.el.test(el)){return;}
    if(el===_d.body){return;}
    var type=el.getAttribute('type');
    if(type==='wm'||type==='vs'){return;}
    o.x+=el[_ox]-el.scrollLeft;
    o.x+=wm.int.test(el.style.borderLeftWidth);
    o.x-=wm.int.test(el.style.marginLeft);
    o.y+=el[_oy]-el.scrollTop;
    o.y+=wm.int.test(el.style.borderTopWidth);
    o.y-=wm.int.test(el.style.marginTop);
    wm.el.oloop(el[_pn],o);
    }
  };

wm.math=
  {
  clp:function(n,min,max)
    {
    n=wm.nbr.test(n);
    min=(min!==undefined&&min!==null)?wm.nbr.test(min):n;
    max=(max!==undefined&&max!==null)?wm.nbr.test(max):n;
    return Math.max(min,Math.min(n,max));
    },
  interpolate:function(a,b,n,i)
    {
    a=wm.nbr.test(a);
    b=wm.nbr.test(b);
    return a+(b-a)/wm.nbr.test(n)*wm.nbr.test(i);
    },
  pi:function(n)
    {
    n=wm.int.test(n,256*256);
    var pi=3;
    var i=0;
    var v=4;
    while(i<n){i+=2;pi+=v/(i*(i+1)*(i+2));v=-v;}
    //var pi=16*Math.atan(1/5)-4*Math.atan(1/239);
    return pi;
    }
  };

wm.time=
  {
  get:function(){return Date.now();}
  };

wm.nav=
  {
  isch:(/chrome/i).test(_w.navigator.userAgent),
  isff:(/firefox/i).test(_w.navigator.userAgent),
  isie:(/msie/i).test(_w.navigator.userAgent),
  css:function()
    {
    if(wm.nav.isch){return '-webkit-';}
    if(wm.nav.isff){return '-moz-';}
    if(wm.nav.isie){return '-ms-';}
    return '';
    }
  };
/*----------------------------------------------------------------------------*/
wm.mse={x:0,y:0};

wm.mse.fn=function(cfg)
  {
  cfg.evt=wm.obj.test(cfg.evt);
  var t=wm.str.test(cfg.evt.t);
  var a=wm.str.test(cfg.evt.a);
  if(wm.obj.isempty(wm[t])){return;}
  if(wm.obj.isempty(wm[t][a])){return;}
  if(wm.fn.test(wm[t][a][wm.mse.e])){wm[t][a][wm.mse.e](cfg,cfg.evt.id);}
  };

wm.mse.dwn=function(e,cfg)
  {
  e=e||_w.event;
  wm.mse.o={x:e.pageX,y:e.pageY};
  wm.mse.e='dwn';
  wm.mse.fn(cfg);
  wm.sta.dbg(cfg);
  e.preventDefault();
  };

wm.mse.up=function(e,cfg)
  {
  e=e||_w.event;
  wm.mse.e='up';
  wm.mse.fn(cfg);
  delete cfg.evt;
  wm.sta.dbg(cfg);
  wm.ls.sav(cfg);
  e.preventDefault();
  };

wm.mse.mv=function(e,cfg)
  {
  e=e||_w.event;
  wm.mse.x=e.pageX;
  wm.mse.y=e.pageY;
  wm.mse.e='mv';
  wm.mse.fn(cfg);
  wm.sta.dbg(cfg);
  wm.tt.mv(cfg);
  e.preventDefault();
  };

wm.mse.wheel=function(e,cfg)
  {
  if(!cfg.on){return;}
  e=e||_w.event;
  wm.mse.e='wheel';
  if(wm.str.test(cfg.wid)!=='')
    {
    var btn;
    var x=wm.int.test(-e.wheelDeltaX/32);
    var y=wm.int.test(-e.wheelDeltaY/32);
    if(!wm.key.shft&&!wm.key.ctrl)
      {
      if(x!==0)
        {
        btn=_i(cfg.wid+'-sbh-btn');
        if(wm.el.test(btn)){x+=btn[_ox];}
        wm.sb.h.upd(cfg,cfg.wid,x);
        }
      if(y!==0)
        {
        btn=_i(cfg.wid+'-sbv-btn');
        if(wm.el.test(btn)){y+=btn[_oy];}
        wm.sb.v.upd(cfg,cfg.wid,y);
        }
      }
    else
      {
      if(x!==0||y!==0)
        {
        x=(cfg.snp&&!wm.key.alt)?x/4*cfg.stg.w:x*cfg.i;
        y=(cfg.snp&&!wm.key.alt)?y/4*cfg.stg.h:y*cfg.i;
        wm.wdw[wm.key.shft?'mv':'rsz'].inc(cfg,x,y);
        }
      }
    }
  e.preventDefault();
  };
/*----------------------------------------------------------------------------*/
wm.key={};

wm.key.dwn=function(e,cfg)
  {
  if(!cfg.on){return;}
  e=e||_w.event;
  wm.key.e='dwn';
  wm.key.code=e.keyCode;
  wm.key.shft=e.shiftKey;
  wm.key.alt=e.altKey;
  wm.key.ctrl=e.ctrlKey;
  wm.sta.dbg(cfg);
  if(cfg.wid&&(wm.key.shft||wm.key.ctrl)){wm.wdw.box(cfg,cfg.wid,true);}
  if((wm.key.ctrl&&wm.key.code===82)||wm.key.code===116) /* ctrl+r */
    {
    wm.dbg.log(cfg,'reboot now');
    _w.location.reload();
    }
  if(cfg.wid)
    {
    if(wm.key.shft||wm.key.ctrl)
      {
      wm.stg.ini(cfg,0);
      if(wm.key.code>36&&wm.key.code<41)
        {
        var a=wm.key.shft?'mv':'rsz';
        var x=(cfg.snp&&!wm.key.alt)?cfg.stg.w:cfg.i;
        var y=(cfg.snp&&!wm.key.alt)?cfg.stg.h:cfg.i;
        switch(wm.key.code)
          {
          case 37: wm.wdw[a].inc(cfg,-x,0); break;
          case 39: wm.wdw[a].inc(cfg,x,0); break;
          case 38: wm.wdw[a].inc(cfg,0,-y); break;
          case 40: wm.wdw[a].inc(cfg,0,y); break;
          }
        }
      }
    else
      {
      var id=cfg.wid;
      switch(wm.key.code)
        {
        case 33: wm.sb.v.pgup(cfg,id); break;
        case 34: wm.sb.v.pgdwn(cfg,id); break;
        case 35: wm.sb.v.end(cfg,id); break;
        case 36: wm.sb.v.upd(cfg,id,0); break;
        case 37: wm.sb.h.inc(cfg,id,-cfg.i); break;
        case 38: wm.sb.v.inc(cfg,id,-cfg.i); break;
        case 39: wm.sb.h.inc(cfg,id,cfg.i); break;
        case 40: wm.sb.v.inc(cfg,id,cfg.i); break;
        }
      }
    }
  if(wm.key.code===9) /* tab */
    {
    var box=_i('box-'+cfg.id);
    if(wm.el.test(box)){_r(box);}
    cfg.wdw=wm.arr.test(cfg.wdw);
    var vs=wm.vs.get(cfg).n;
    var lst=[];
    cfg.wdw.forEach(function(v,i){if(v.vs===vs){lst.push(i);}});
    var n=0;
    lst.forEach(function(v,i)
      {
      if(cfg.wdw[v].id===cfg.wid){n=i;}
      });
    if(!wm.key.shft){n+=1;if(n>lst.length-1){n=0;}}
    else{n-=1;if(n<0){n=lst.length-1;}}
    wm.wdw.sel(cfg,cfg.wdw[lst[n]].id);
    wm.wdw.z(cfg,cfg.wdw[lst[n]].id);
    e.preventDefault();
    }
  };

wm.key.up=function(e,cfg)
  {
  if(!cfg.on){return;}
  e=e||_w.event;
  wm.key.e='up';
  wm.key.code=e.keyCode;
  wm.key.shft=e.shiftKey;
  wm.key.alt=e.altKey;
  wm.key.ctrl=e.ctrlKey;
  wm.sta.dbg(cfg);
  if(wm.key.code===27) /* esc */
    {
    wm.tt.del(cfg);
    wm.mnu.del(cfg);
    wm.msk.del(cfg);
    wm.stg.del(cfg);
    delete cfg.evt;
    wm.sta.dbg(cfg);
    var box=_i('box-'+cfg.id);
    if(wm.el.test(box)){_r(box);}
    }
  if(wm.key.code===16||wm.key.code===17) /* shft|ctrl */
    {
    wm.stg.del(cfg);
    wm.wdw[wm.key.code===16?'mv':'rsz'].up(cfg,cfg.wid);
    wm.ls.sav(cfg);
    }
  if(wm.key.code>36&&wm.key.code<41){wm.ls.sav(cfg);}
  };
/*----------------------------------------------------------------------------*/
wm.ls={};

wm.ls.test=function()
  {
  if(!wm.nav.isff&&!wm.nav.isie)
    {
    return (_w.hasOwnProperty('localStorage')&&_ls!==null);
    }
  else
    {
    return (_ls!==undefined);
    }
  };

wm.ls.get=function(cfg)
  {
  if(!wm.ls.test()||!cfg.sav){return {};}
  return wm.obj.test(_w.JSON.parse(_ls.getItem(cfg.id)));
  };

wm.ls.sav=function(cfg)
  {
  if(wm.ls.test()&&cfg.sav)
    {
    var sav=_w.JSON.stringify(cfg);
    _ls.setItem(cfg.id,sav);
    //wm.dbg.log(cfg,'config saved ('+Math.round(sav.length/1024)+'kb)');
    }
  };

wm.ls.rst=function(cfg)
  {
  if(!wm.ls.test()){return;}
  delete _w.localStorage[cfg.id];
  var root=_i(cfg.root);
  if(cfg.dbg||!wm.el.test(root))
    {
    cfg.sav=false;
    _w.location.reload();
    }
  else
    {
    var nc=wm.obj.clone(cfg);
    wm.el.clr(root);
    wm.ini({id:nc.id,root:nc.root});
    }
  };
/*----------------------------------------------------------------------------*/
wm.col={};

wm.col.list=
  {
  bdr:[0,0,0],
  bgd:[120,120,120],
  wdw:[144,144,144],
  txt:[208,208,208],
  hdr:[255,255,255],
  btn:[80,160,208],
  sel:[208,80,80],
  ok:[80,208,80]
  };

wm.col.get=function(col)
  {
  col=wm.arr.test(wm.col.list[col],[0,0,0]);
  return '#'+col.map(function(v)
    {
    return String('0'+wm.math.clp(v,0,255).toString(16)).slice(-2);
    }).join('');
  };

wm.col.parse=function(col)
  {
  col=wm.str.test(col,'#000');
  var i=0;var c=[0,0,0];
  if(col.charAt(0)==='#'){col=col.slice(1);}
  if(col.length===3){while(i<3){c[i]=parseInt(col[i]+col[i],16);i+=1;}}
  if(col.length===6){while(i<3){c[i]=parseInt(col.substr(i*2,2),16);i+=1;}}
  return c;
  };
/*----------------------------------------------------------------------------*/
wm.css={};

wm.css.ini=function(cfg)
  {
  if(!wm.css.get())
    {
    var css=_e('style');
    css.type='text/css';
    css.title='jswm';
    _d.head[_ac](css);
    }
  var r='font-family:'+cfg.fnt.f+';font-style:normal';
  r+=';font-size:'+(cfg.fnt.s*cfg.fnt.r)+_u+';line-height:'+cfg.fnt.h+_u;
  wm.css.add(cfg,'txt',r);
  wm.css.add(cfg,'tb','border-spacing:'+cfg.b+_u);
  wm.css.add(cfg,'td','padding:'+cfg.m+_u+';border-radius:'+cfg.r+_u);
  r='color:'+wm.col.get('bdr')+';text-decoration:none';
  wm.css.add(cfg,'lnk',r);
  };

wm.css.get=function()
  {
  var css=false;
  Object.keys(_d.styleSheets).forEach(function(v)
    {
    if(_d.styleSheets[v].title==='jswm'){css=_d.styleSheets[v];}
    });
  return css;
  };

wm.css.cls=function(cfg,id){return id+'-'+cfg.id;};

wm.css.add=function(cfg,id,r)
  {
  if(wm.str.test(id)===''||wm.str.test(r)===''){return;}
  var css=wm.css.get();
  if(!css){return;}
  css.insertRule('.'+wm.css.cls(cfg,id)+' {'+r+'}',css.cssRules.length);
  };

wm.css.msk=function(m,v,n)
  {
  n=wm.math.clp(wm.int.test(n,4),wm.str.test(m).length);
  m=wm.str.test(m).substr(0,n);
  var i=0;
  var l=n-m.length;
  while(i<l){m+='0';i+=1;}
  v=wm.int.test(v);
  var a=m.split('').map(function(k){return (wm.int.test(k)*v)+_u;});
  return a.join(' ');
  };

/*----------------------------------------------------------------------------*/
wm.img={};

wm.img.ini=function(cfg)
  {
  var map=[
  '  6666     111   111111  333333 1 1  1 15 5  5 51       5       ',
  ' 666666   111   11 11 1133333333 1 1  1  5 5  5 11      55      ',
  '666  666  11   1111  111333333331 1  1 15 5  5 5 11      55     ',
  '66    66  11  11111  11133333333 1 1  1  5 5  5   11      55    ',
  '66    66  11111111 11 1133333333                  11      55    ',
  '666  666 111111  111111  333333 1 1  1 15 5  5 5 11      55     ',
  ' 666666 111        11      33    1 1  1  5 5  5 11      55      ',
  '  6666  11         1       3    1 1  1 15 5  5 51   11115   5555'];
  wm.img.gen(cfg,map,'sta');
  map=[
  '  1111    1111  1111111111111111          3     ',
  ' 1    1  1    1 1      11      1          33    ',
  '1      11  77  11 6 6  11 5555 133    33   33   ',
  '1      11 7777 11  6 6 11 5555 1 33  33     33  ',
  '1      11 7777 11 6 6  11 5555 1  3333      33  ',
  '1      11  77  11  6 6 11 5555 1   33      33   ',
  ' 1    1  1    1 1      11      1          33    ',
  '  1111    1111  1111111111111111          3     '];
  wm.img.gen(cfg,map,'btn');
  map=[
  '11111111 6    6 5555 11155555555       0',
  '11111111666  6665555   155555555      05',
  '         666666 5555   155555555     055',
  '11111111  6666  5555   155555555    0555',
  '11111111  6666         155555555   05555',
  '         666666 1      155555555  055555',
  '11111111666  6661      155555555 0555555',
  '11111111 6    6 111111115555555505555555'];
  wm.img.gen(cfg,map,'wdw');
  map=[
  '1 1 1 1 ',
  ' 2 1 2 1',
  '1 1 1 1 ',
  ' 1 2 1 2',
  '1 1 1 1 ',
  ' 2 1 2 1',
  '1 1 1 1 ',
  ' 1 2 1 2'];
  wm.img.gen(cfg,map,'msk');
  map=[
  /*
  ' 5      ',
  '5 55   5',
  ' 5      ',
  ' 5   5  ',
  '     5  ',
  '   55 55',
  '     5  ',
  ' 5   5  '];*/
  '5 5 5 5 ',
  ' 5 5 5 5',
  '5 5 5 5 ',
  ' 5 5 5 5',
  '5 5 5 5 ',
  ' 5 5 5 5',
  '5 5 5 5 ',
  ' 5 5 5 5'];
  wm.img.gen(cfg,map,'stg');
  map=[ /* 16*16 */
  '00002222222200  ',
  '000022222002000 ',
  '0000222220020000',
  '0000222220020000',
  '0000222222220000',
  '0000000000000000',
  '0000000000000000',
  '0044444444444400',
  '0044444444444400',
  '0044444444444400',
  '0044444444444400',
  '0044444444444400',
  '0044444444444400',
  '0044444444444400',
  '0055555555555500',
  '0055555555555500'];
  wm.img.gen(cfg,map,'ico');
  map=[ /* 20*32 */
  '2 2 2 2 222         ',
  ' 2 2 2 222222       ',
  '2 2 22222222222     ',
  ' 2 22222222222222   ',
  '2222222222222222222 ',
  ' 2222222222222222222',
  '   22222222222222 2 ',
  '     22222222222 2 2',
  '  2    222222 2 2 2 ',
  '   2     222 2 2 2 2',
  '  2 2     2 2 2 2 2 ',
  '   2       2 2 2 2 2',
  '  2 2     2 2 2 2 2 ',
  '   22      2 2 2 2 2',
  '  22222   2 2 2 2 2 ',
  '   22222   2 2 2 2 2',
  '2    222  2 2 2 2 22',
  '222    2   2 2 2 222',
  '22222     2 2 222222',
  '2222222    2 2222222',
  '222222222 2222222222',
  '2222222222 222222222',
  '2222222 2    2222222',
  '222222 2 2     22222',
  '222 2 2 2        222',
  '22 2 2 2 2         2',
  '2 2 2 2 2           ',
  ' 2 2 2 2 2          ',
  '2 2 2 2 2           ',
  ' 2 2 2 2 2          ',
  '2 2 2 2 2           ',
  ' 2 2 2 2 2          '];
  wm.img.gen(cfg,map,'bgd');
  };

wm.img.gen=function(cfg,map,name,css)
  {
  map=wm.arr.test(map);
  name=wm.str.test(name);
  var cvs=_e('canvas');
  cvs.width=wm.str.test(map[0]).length;
  cvs.height=map.length;
  var ctx=cvs.getContext('2d');
  Object.keys(wm.obj.test(wm.col.list)).forEach(function(c,i)
    {
    ctx.fillStyle=wm.col.get(c);
    ctx.beginPath();
    map.forEach(function(v,y)
      {
      v.split('').forEach(function(v,x)
        {
        if(v===' '){return;}
        if(i===wm.int.test(v)){ctx.rect(x,y,1,1);}
        });
      });
    ctx.closePath();
    ctx.fill();
    });
  wm.img[name]=
    {
    id:name,
    url:cvs.toDataURL(),
    w:cvs.width,
    h:cvs.height
    };
  if(!wm.bool.test(css,true)){return;}
  wm.css.add(cfg,'img-'+name,'background-image:url('+wm.img[name].url+')');
  };
/*----------------------------------------------------------------------------*/
wm.fav=function(cfg)
  {
  var test=false;
  Object.keys(_t('link')).forEach(function(v)
    {
    if(_t('link')[v].rel==='icon'){test=true;}
    });
  if(test){return;}
  var map=[ /* 16*16 */
  '0000000000000000',
  '0501010000000060',
  '0000000000000000',
  '0111111111111110',
  '0100000000011110',
  '0101044006011110',
  '0100000000000010',
  '0102222222006010',
  '0102332332000010',
  '0102323332022010',
  '0102222225032010',
  '0100000000022010',
  '0111102222225010',
  '0111100000000010',
  '0111111111111110',
  '0000000000000000'];
  wm.img.gen(cfg,map,'fav',false);
  var ico=_e('link');
  ico.rel='icon';
  ico.type='image/png';
  ico.href=wm.img.fav.url;
  _d.head[_ac](ico);
  };
/*----------------------------------------------------------------------------*/
wm.lint=function(cfg)
  {
  var el=_i('code');
  if(!wm.el.test(el)){return;}
  var xhr=new _w.XMLHttpRequest();
  xhr.open('GET',el.src+'?v='+wm.str.rnd(32),true);
  xhr.setRequestHeader('Content-Type','application/javascript');
  xhr.onreadystatechange=function()
    {
    if(xhr.readyState===4&&xhr.status===200)
      {
      var err=wm.arr.test(wm.obj.test(jslint(xhr.responseText)).warnings);
      var n=err.length;
      var txt='<br>code validation: '+n+' error'+((n>0)?'s':'')+' found';
      if(n===0){return;}
      var css='margin-right:'+cfg.m+_u;
      txt+='<br>';
      txt+='<table class="'+wm.css.cls(cfg,'tb')+'" style="'+css+'">';
      var cls='class="'+wm.css.cls(cfg,'td')+'"';
      css='background-color:'+wm.col.get('bgd')+';line-height:'+cfg.fnt.s+_u;
      css+=';vertical-align:top';
      txt+='<tr>';
      txt+='<td '+cls+' style="'+css+';text-align:center">line</td>';
      txt+='<td '+cls+' style="'+css+';text-align:center">col</td>';
      txt+='<td '+cls+' style="'+css+';width:100%">error message</td>';
      txt+='</tr>';
      err.forEach(function(v)
        {
        txt+='<tr>';
        txt+='<td '+cls+' style="'+css+';text-align:right">'+(v.line+1)+'</td>';
        txt+='<td '+cls+' style="'+css+';text-align:right">'+v.column+'</td>';
        txt+='<td '+cls+' style="'+css+';width:100%">'+v.message+'</td>';
        txt+='</tr>';
        });
      txt+='</table>';
      wm.dbg.log(cfg,txt);
      }
    };
  xhr.send();
  };

return wm;
}());
