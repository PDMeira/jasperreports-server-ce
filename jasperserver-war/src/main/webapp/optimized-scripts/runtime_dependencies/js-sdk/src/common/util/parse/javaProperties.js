define(["require"],function(e){"use strict";return function(e){var r,s={},t=e.split(/\r?\n/),n="";return t.forEach(function(e){/^\s*(\#|\!|$)/.test(e)||(e=e.replace(/^\s*/,""),n+=e,/(\\\\)*\\$/.test(n)?n=n.replace(/\\$/,""):(r=/^\s*((?:[^\s:=\\]|\\.)+)\s*[:=\s]\s*(.*)$/.exec(n),s[r[1]]=r[2],n=""))}),s}});