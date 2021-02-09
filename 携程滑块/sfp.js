window = this;
screen = {
    availHeight: 1050,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    orientation: {
        angle: 0,
        onchange: null,
        type: "landscape-primary",
    },
    pixelDepth: 24,
    width: 1920

}
navigator = {
    hardwareConcurrency: 4,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
    plugins: []
}

window.screen = screen
window.navigator = navigator
window.sessionStorage = true;
window.localStorage = true;
window.indexedDB = true;
window.openDatabase = true;

window._bfp = function (Module) {
    Module = Module || {};
    var d = Module;
    d || (d = eval("(function() { try { return _bfp || {} } catch(e) { return {} } })()"));
    var h = {}, n;
    for (n in d)
        d.hasOwnProperty(n) && (h[n] = d[n]);
    var aa = "object" === typeof window
        , v = "function" === typeof importScripts
        , ba = "object" === typeof process && "function" === typeof require && !aa && !v
        , ca = !aa && !ba && !v;
    if (ba) {
        d.print || (d.print = function (a) {
                process.stdout.write(a + "\n")
            }
        );
        d.printErr || (d.printErr = function (a) {
                process.stderr.write(a + "\n")
            }
        );
        var da = require("fs")
            , ea = require("path");
        d.read = function (a, b) {
            a = ea.normalize(a);
            var c = da.readFileSync(a);
            c || a == ea.resolve(a) || (a = path.join(__dirname, "..", "src", a),
                c = da.readFileSync(a));
            c && !b && (c = c.toString());
            return c
        }
        ;
        d.readBinary = function (a) {
            a = d.read(a, !0);
            a.buffer || (a = new Uint8Array(a));
            assert(a.buffer);
            return a
        }
        ;
        d.load = function (a) {
            fa(read(a))
        }
        ;
        d.thisProgram || (d.thisProgram = 1 < process.argv.length ? process.argv[1].replace(/\\/g, "/") : "unknown-program");
        d.arguments = process.argv.slice(2);
        "undefined" !== typeof module && (module.exports = d);
        process.on("uncaughtException", function (a) {
            if (!(a instanceof w))
                throw "T";
        });
        d.inspect = function () {
            return "[Emscripten Module object]"
        }
    } else if (ca)
        d.print || (d.print = print),
        "undefined" != typeof printErr && (d.printErr = printErr),
            d.read = "undefined" != typeof read ? read : function () {
                throw "T";
            }
            ,
            d.readBinary = function (a) {
                if ("function" === typeof readbuffer)
                    return new Uint8Array(readbuffer(a));
                a = read(a, "binary");
                assert("object" === typeof a);
                return a
            }
            ,
            "undefined" != typeof scriptArgs ? d.arguments = scriptArgs : "undefined" != typeof arguments && (d.arguments = arguments),
            eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined");
    else if (aa || v)
        d.read = function (a) {
            var b = new XMLHttpRequest;
            b.open("GET", a, !1);
            b.send(null);
            return b.responseText
        }
            ,
        "undefined" != typeof arguments && (d.arguments = arguments),
            "undefined" !== typeof console ? (d.print || (d.print = function (a) {
                    console.log("C")
                }
            ),
            d.printErr || (d.printErr = function (a) {
                    console.log("C")
                }
            )) : d.print || (d.print = function () {
                }
            ),
        v && (d.load = importScripts),
        "undefined" === typeof d.setWindowTitle && (d.setWindowTitle = function (a) {
                document.title = a
            }
        );
    else
        throw "T";

    function fa(a) {
        eval.call(null, a)
    }

    !d.load && d.read && (d.load = function (a) {
            fa(d.read(a))
        }
    );
    d.print || (d.print = function () {
        }
    );
    d.printErr || (d.printErr = d.print);
    d.arguments || (d.arguments = []);
    d.thisProgram || (d.thisProgram = "./this.program");
    d.print = d.print;
    d.C = d.printErr;
    d.preRun = [];
    d.postRun = [];
    for (n in h)
        h.hasOwnProperty(n) && (d[n] = h[n]);
    var y = {
        U: function (a) {
            ga = a
        },
        Q: function () {
            return ga
        },
        J: function () {
            return x
        },
        I: function (a) {
            x = a
        },
        H: function (a) {
            switch (a) {
                case "i1":
                case "i8":
                    return 1;
                case "i16":
                    return 2;
                case "i32":
                    return 4;
                case "i64":
                    return 8;
                case "float":
                    return 4;
                case "double":
                    return 8;
                default:
                    return "*" === a[a.length - 1] ? y.r : "i" === a[0] ? (a = parseInt(a.substr(1)),
                        assert(0 === a % 8),
                    a / 8) : 0
            }
        },
        O: function (a) {
            return Math.max(y.H(a), y.r)
        },
        W: 16,
        ja: function (a, b) {
            "double" === b || "i64" === b ? a & 7 && (assert(4 === (a & 7)),
                a += 4) : assert(0 === (a & 3));
            return a
        },
        ba: function (a, b, c) {
            return c || "i64" != a && "double" != a ? a ? Math.min(b || (a ? y.O(a) : 0), y.r) : Math.min(b, 8) : 8
        },
        k: function (a, b, c) {
            return c && c.length ? (c.splice || (c = Array.prototype.slice.call(c)),
                c.splice(0, 0, b),
                d["dynCall_" + a].apply(null, c)) : d["dynCall_" + a].call(null, b)
        },
        p: [],
        K: function (a) {
            for (var b = 0; b < y.p.length; b++)
                if (!y.p[b])
                    return y.p[b] = a,
                    2 * (1 + b);
            throw "T";
        },
        T: function (a) {
            y.p[(a - 2) / 2] = null
        },
        e: function (a) {
            y.e.D || (y.e.D = {});
            y.e.D[a] || (y.e.D[a] = 1,
                d.C(a))
        },
        B: {},
        ea: function (a, b) {
            assert(b);
            y.B[b] || (y.B[b] = {});
            var c = y.B[b];
            c[a] || (c[a] = function () {
                    return y.k(b, a, arguments)
                }
            );
            return c[a]
        },
        da: function () {
            throw "T";
        },
        q: function (a) {
            var b = x;
            x = x + a | 0;
            x = x + 15 & -16;
            return b
        },
        V: function (a) {
            var b = z;
            z = z + a | 0;
            z = z + 15 & -16;
            return b
        },
        n: function (a) {
            var b = A;
            A = A + a | 0;
            A = A + 15 & -16;
            if (a = A >= B)
                C("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + B + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "),
                    a = !0;
            return a ? (A = b,
                0) : b
        },
        u: function (a, b) {
            return Math.ceil(a / (b ? b : 16)) * (b ? b : 16)
        },
        ia: function (a, b, c) {
            return c ? +(a >>> 0) + 4294967296 * +(b >>> 0) : +(a >>> 0) + 4294967296 * +(b | 0)
        },
        g: 8,
        r: 4,
        X: 0
    };
    y.addFunction = y.K;
    y.removeFunction = y.T;
    var D = !1, E, ha, ga;

    function assert(a, b) {
        a || C("Assertion failed: " + b)
    }

    function ia(a) {
        var b = d["_" + a];
        if (!b)
            try {
                b = eval("_" + a)
            } catch (c) {
            }
        assert(b, "AS");
        return b
    }

    var ja;
    (function () {
            function a(a) {
                a = a.toString().match(c).slice(1);
                return {
                    arguments: a[0],
                    body: a[1],
                    returnValue: a[2]
                }
            }

            var b = {
                stackSave: function () {
                    y.J()
                },
                stackRestore: function () {
                    y.I()
                },
                arrayToC: function (a) {
                    for (var b = y.q(a.length), c = b, e = 0; e < a.length; e++)
                        F[c++ >> 0] = a[e];
                    return b
                },
                stringToC: function (a) {
                    var b = 0;
                    null !== a && void 0 !== a && 0 !== a && (b = y.q((a.length << 2) + 1),
                        ka(a, b));
                    return b
                }
            }, c = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/, e = {}, g;
            for (g in b)
                b.hasOwnProperty(g) && (e[g] = a(b[g]));
            ja = function (b, c, f) {
                f = f || [];
                var g = ia(b);
                b = f.every(function (a) {
                    return "number" === a
                });
                var p = "string" !== c;
                if (p && b)
                    return g;
                var q = f.map(function (a, b) {
                    return "$" + b
                });
                c = "(function(" + q.join(",") + ") {";
                var m = f.length;
                if (!b) {
                    c += "var stack = " + e.stackSave.body + ";";
                    for (var S = 0; S < m; S++) {
                        var qa = q[S]
                            , L = f[S];
                        "number" !== L && (L = e[L + "ToC"],
                            c += "var " + L.arguments + " = " + qa + ";",
                            c += L.body + ";",
                            c += qa + "=" + L.returnValue + ";")
                    }
                }
                f = a(function () {
                    return g
                }).returnValue;
                c += "var ret = " + f + "(" + q.join(",") + ");";
                p || (f = a(function () {
                    return G
                }).returnValue,
                    c += "ret = " + f + "(ret);");
                b || (c += e.stackRestore.body.replace("()", "(stack)") + ";");
                return eval(c + "return ret})")
            }
        }
    )();
    d.cwrap = ja;

    function la(a) {
        var b;
        b = "i32";
        "*" === b.charAt(b.length - 1) && (b = "i32");
        switch (b) {
            case "i1":
                return F[a >> 0];
            case "i8":
                return F[a >> 0];
            case "i16":
                return H[a >> 1];
            case "i32":
                return I[a >> 2];
            case "i64":
                return I[a >> 2];
            case "float":
                return J[a >> 2];
            case "double":
                return K[a >> 3];
            default:
                C("invalid type for setValue: " + b)
        }
        return null
    }

    function M(a, b, c, e) {
        var g, k;
        "number" === typeof a ? (g = !0,
            k = a) : (g = !1,
            k = a.length);
        var l = "string" === typeof b ? b : null;
        c = 4 == c ? e : [N, y.q, y.V, y.n][void 0 === c ? 2 : c](Math.max(k, l ? 1 : b.length));
        if (g) {
            e = c;
            assert(0 == (c & 3));
            for (a = c + (k & -4); e < a; e += 4)
                I[e >> 2] = 0;
            for (a = c + k; e < a;)
                F[e++ >> 0] = 0;
            return c
        }
        if ("i8" === l)
            return a.subarray || a.slice ? O.set(a, c) : O.set(new Uint8Array(a), c),
                c;
        e = 0;
        for (var f, t; e < k;) {
            var p = a[e];
            "function" === typeof p && (p = y.fa(p));
            g = l || b[e];
            if (0 === g)
                e++;
            else {
                "i64" == g && (g = "i32");
                var q = c + e
                    , m = g
                    , m = m || "i8";
                "*" === m.charAt(m.length - 1) && (m = "i32");
                switch (m) {
                    case "i1":
                        F[q >> 0] = p;
                        break;
                    case "i8":
                        F[q >> 0] = p;
                        break;
                    case "i16":
                        H[q >> 1] = p;
                        break;
                    case "i32":
                        I[q >> 2] = p;
                        break;
                    case "i64":
                        ha = [p >>> 0, (E = p,
                            1 <= +ma(E) ? 0 < E ? (na(+oa(E / 4294967296), 4294967295) | 0) >>> 0 : ~~+pa((E - +(~~E >>> 0)) / 4294967296) >>> 0 : 0)];
                        I[q >> 2] = ha[0];
                        I[q + 4 >> 2] = ha[1];
                        break;
                    case "float":
                        J[q >> 2] = p;
                        break;
                    case "double":
                        K[q >> 3] = p;
                        break;
                    default:
                        C("invalid type for setValue: " + m)
                }
                t !== g && (f = y.H(g),
                    t = g);
                e += f
            }
        }
        return c
    }

    function G(a, b) {
        if (0 === b || !a)
            return "";
        for (var c = 0, e, g = 0; ;) {
            e = O[a + g >> 0];
            c |= e;
            if (0 == e && !b)
                break;
            g++;
            if (b && g == b)
                break
        }
        b || (b = g);
        e = "";
        if (128 > c) {
            for (; 0 < b;)
                c = String.fromCharCode.apply(String, O.subarray(a, a + Math.min(b, 1024))),
                    e = e ? e + c : c,
                    a += 1024,
                    b -= 1024;
            return e
        }
        return d.UTF8ToString(a)
    }

    function ra(a, b) {
        for (var c, e, g, k, l, f, t = ""; ;) {
            c = a[b++];
            if (!c)
                return t;
            c & 128 ? (e = a[b++] & 63,
                192 == (c & 224) ? t += String.fromCharCode((c & 31) << 6 | e) : (g = a[b++] & 63,
                    224 == (c & 240) ? c = (c & 15) << 12 | e << 6 | g : (k = a[b++] & 63,
                        240 == (c & 248) ? c = (c & 7) << 18 | e << 12 | g << 6 | k : (l = a[b++] & 63,
                            248 == (c & 252) ? c = (c & 3) << 24 | e << 18 | g << 12 | k << 6 | l : (f = a[b++] & 63,
                                c = (c & 1) << 30 | e << 24 | g << 18 | k << 12 | l << 6 | f))),
                    65536 > c ? t += String.fromCharCode(c) : (c -= 65536,
                        t += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023)))) : t += String.fromCharCode(c)
        }
    }

    d.UTF8ToString = function (a) {
        return ra(O, a)
    }
    ;

    function ta(a) {
        function b(c, e, g) {
            e = e || Infinity;
            var k = "", l = [], u;
            if ("N" === a[f]) {
                f++;
                "K" === a[f] && f++;
                for (u = []; "E" !== a[f];)
                    if ("S" === a[f]) {
                        f++;
                        var r = a.indexOf("_", f);
                        u.push(p[a.substring(f, r) || 0] || "?");
                        f = r + 1
                    } else if ("C" === a[f])
                        u.push(u[u.length - 1]),
                            f += 2;
                    else {
                        var r = parseInt(a.substr(f))
                            , m = r.toString().length;
                        if (!r || !m) {
                            f--;
                            break
                        }
                        var sa = a.substr(f + m, r);
                        u.push(sa);
                        p.push(sa);
                        f += m + r
                    }
                f++;
                u = u.join("::");
                e--;
                if (0 === e)
                    return c ? [u] : u
            } else if (("K" === a[f] || q && "L" === a[f]) && f++,
                r = parseInt(a.substr(f)))
                m = r.toString().length,
                    u = a.substr(f + m, r),
                    f += m + r;
            q = !1;
            "I" === a[f] ? (f++,
                r = b(!0),
                m = b(!0, 1, !0),
                k += m[0] + " " + u + "<" + r.join(", ") + ">") : k = u;
            a: for (; f < a.length && 0 < e--;)
                if (u = a[f++],
                u in t)
                    l.push(t[u]);
                else
                    switch (u) {
                        case "P":
                            l.push(b(!0, 1, !0)[0] + "*");
                            break;
                        case "R":
                            l.push(b(!0, 1, !0)[0] + "&");
                            break;
                        case "L":
                            f++;
                            r = a.indexOf("E", f) - f;
                            l.push(a.substr(f, r));
                            f += r + 2;
                            break;
                        case "A":
                            r = parseInt(a.substr(f));
                            f += r.toString().length;
                            if ("_" !== a[f])
                                throw "T";
                            f++;
                            l.push(b(!0, 1, !0)[0] + " [" + r + "]");
                            break;
                        case "E":
                            break a;
                        default:
                            k += "?" + u;
                            break a
                    }
            g || 1 !== l.length || "void" !== l[0] || (l = []);
            return c ? (k && l.push(k + "?"),
                l) : k + ("(" + l.join(", ") + ")")
        }

        var c = !!d.___cxa_demangle;
        if (c)
            try {
                var e = N(a.length);
                ka(a.substr(1), e);
                var g = N(4)
                    , k = d.___cxa_demangle(e, 0, 0, g);
                if (0 === la(g) && k)
                    return G(k)
            } catch (l) {
            } finally {
                e && P(e),
                g && P(g),
                k && P(k)
            }
        var f = 3
            , t = {
            v: "void",
            b: "bool",
            c: "char",
            s: "short",
            i: "int",
            l: "long",
            f: "float",
            d: "double",
            w: "wchar_t",
            a: "signed char",
            h: "unsigned char",
            t: "unsigned short",
            j: "unsigned int",
            m: "unsigned long",
            x: "long long",
            y: "unsigned long long",
            z: "..."
        }
            , p = []
            , q = !0
            , e = a;
        try {
            if ("Object._main" == a || "_main" == a)
                return "main()";
            "number" === typeof a && (a = G(a));
            if ("_" !== a[0] || "_" !== a[1] || "Z" !== a[2])
                return a;
            switch (a[3]) {
                case "n":
                    return "operator new()";
                case "d":
                    return "operator delete()"
            }
            e = b()
        } catch (m) {
            e += "?"
        }
        0 <= e.indexOf("?") && !c && y.e("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
        return e
    }

    function ua() {
        return va().replace(/__Z[\w\d_]+/g, function (a) {
            var b = ta(a);
            return a === b ? a : a + " [" + b + "]"
        })
    }

    function va() {
        var a = Error();
        if (!a.stack) {
            try {
                throw "T";
            } catch (b) {
                a = b
            }
            if (!a.stack)
                return "(no stack trace available)"
        }
        return a.stack.toString()
    }

    function wa() {
        var a = A;
        0 < a % 4096 && (a += 4096 - a % 4096);
        return a
    }

    for (var F, O, H, xa, I, ya, J, K, za = 0, z = 0, Aa = 0, x = 0, Ba = 0, Ca = 0, A = 0, Da = d.TOTAL_STACK || 5242880, B = d.TOTAL_MEMORY || 16777216, Q = 65536; Q < B || Q < 2 * Da;)
        Q = 16777216 > Q ? 2 * Q : Q + 16777216;
    Q !== B && (B = Q);
    assert("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "AS");
    var buffer;
    buffer = new ArrayBuffer(B);
    F = new Int8Array(buffer);
    H = new Int16Array(buffer);
    I = new Int32Array(buffer);
    O = new Uint8Array(buffer);
    xa = new Uint16Array(buffer);
    ya = new Uint32Array(buffer);
    J = new Float32Array(buffer);
    K = new Float64Array(buffer);
    I[0] = 255;
    assert(255 === O[0] && 0 === O[3], "AS");
    d.HEAP = void 0;
    d.buffer = buffer;
    d.HEAP8 = F;
    d.HEAP16 = H;
    d.HEAP32 = I;
    d.HEAPU8 = O;
    d.HEAPU16 = xa;
    d.HEAPU32 = ya;
    d.HEAPF32 = J;
    d.HEAPF64 = K;

    function R(a) {
        for (; 0 < a.length;) {
            var b = a.shift();
            if ("function" == typeof b)
                b();
            else {
                var c = b.aa;
                "number" === typeof c ? void 0 === b.A ? y.k("v", c) : y.k("vi", c, [b.A]) : c(void 0 === b.A ? null : b.A)
            }
        }
    }

    var Ea = []
        , Fa = []
        , Ga = []
        , T = []
        , Ha = []
        , U = !1;

    function Ia() {
        var a = d.preRun.shift();
        Ea.unshift(a)
    }

    function Ja(a, b) {
        for (var c = 0, e = 0; e < a.length; ++e) {
            var g = a.charCodeAt(e);
            55296 <= g && 57343 >= g && (g = 65536 + ((g & 1023) << 10) | a.charCodeAt(++e) & 1023);
            127 >= g ? ++c : c = 2047 >= g ? c + 2 : 65535 >= g ? c + 3 : 2097151 >= g ? c + 4 : 67108863 >= g ? c + 5 : c + 6
        }
        c = Array(c + 1);
        var k = c.length
            , e = 0;
        if (0 < k) {
            for (var g = e, k = e + k - 1, l = 0; l < a.length; ++l) {
                var f = a.charCodeAt(l);
                55296 <= f && 57343 >= f && (f = 65536 + ((f & 1023) << 10) | a.charCodeAt(++l) & 1023);
                if (127 >= f) {
                    if (e >= k)
                        break;
                    c[e++] = f
                } else {
                    if (2047 >= f) {
                        if (e + 1 >= k)
                            break;
                        c[e++] = 192 | f >> 6
                    } else {
                        if (65535 >= f) {
                            if (e + 2 >= k)
                                break;
                            c[e++] = 224 | f >> 12
                        } else {
                            if (2097151 >= f) {
                                if (e + 3 >= k)
                                    break;
                                c[e++] = 240 | f >> 18
                            } else {
                                if (67108863 >= f) {
                                    if (e + 4 >= k)
                                        break;
                                    c[e++] = 248 | f >> 24
                                } else {
                                    if (e + 5 >= k)
                                        break;
                                    c[e++] = 252 | f >> 30;
                                    c[e++] = 128 | f >> 24 & 63
                                }
                                c[e++] = 128 | f >> 18 & 63
                            }
                            c[e++] = 128 | f >> 12 & 63
                        }
                        c[e++] = 128 | f >> 6 & 63
                    }
                    c[e++] = 128 | f & 63
                }
            }
            c[e] = 0;
            e = e - g
        } else
            e = 0;
        b && (c.length = e);
        return c
    }

    function ka(a, b) {
        for (var c = Ja(a, void 0), e = 0; e < c.length;)
            F[b + e >> 0] = c[e],
                e += 1
    }

    Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (a, b) {
            var c = a & 65535
                , e = b & 65535;
            return c * e + ((a >>> 16) * e + c * (b >>> 16) << 16) | 0
        }
    );
    Math.ga = Math.imul;
    Math.clz32 || (Math.clz32 = function (a) {
            a = a >>> 0;
            for (var b = 0; 32 > b; b++)
                if (a & 1 << 31 - b)
                    return b;
            return 32
        }
    );
    Math.Z = Math.clz32;
    var ma = Math.abs
        , pa = Math.ceil
        , oa = Math.floor
        , na = Math.min;
    d.preloadedImages = {};
    d.preloadedAudios = {};
    za = 8;
    z = za + 12992;
    Fa.push();
    M([], "i8", 4, y.g);
    M([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 170, 44, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 0, 49, 56, 98, 121, 53, 54, 114, 45, 106, 106, 49, 119, 50, 51, 109, 111, 98, 106, 51, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 115, 32, 61, 32, 119, 105, 110, 100, 111, 119, 46, 115, 99, 114, 101, 101, 110, 44, 32, 115, 116, 114, 32, 61, 32, 39, 39, 59, 115, 116, 114, 32, 43, 61, 115, 46, 119, 105, 100, 116, 104, 32, 43, 32, 39, 120, 39, 32, 43, 32, 115, 46, 104, 101, 105, 103, 104, 116, 32, 43, 32, 39, 124, 39, 32, 43, 32, 115, 46, 99, 111, 108, 111, 114, 68, 101, 112, 116, 104, 59, 105, 102, 40, 115, 46, 97, 118, 97, 105, 108, 72, 101, 105, 103, 104, 116, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 97, 118, 97, 105, 108, 39, 32, 43, 32, 115, 46, 97, 118, 97, 105, 108, 87, 105, 100, 116, 104, 32, 43, 32, 39, 120, 39, 32, 43, 32, 115, 46, 97, 118, 97, 105, 108, 72, 101, 105, 103, 104, 116, 59, 125, 105, 102, 32, 40, 115, 46, 100, 101, 118, 105, 99, 101, 89, 68, 80, 73, 41, 32, 123, 115, 116, 114, 32, 43, 61, 32, 39, 68, 80, 73, 39, 32, 43, 32, 115, 46, 100, 101, 118, 105, 99, 101, 88, 68, 80, 73, 32, 43, 32, 39, 120, 39, 32, 43, 32, 115, 46, 100, 101, 118, 105, 99, 101, 89, 68, 80, 73, 59, 125, 105, 102, 40, 115, 46, 98, 117, 102, 102, 101, 114, 68, 101, 112, 116, 104, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 98, 117, 102, 102, 101, 114, 68, 101, 112, 116, 104, 39, 32, 43, 32, 115, 46, 98, 117, 102, 102, 101, 114, 68, 101, 112, 116, 104, 59, 125, 105, 102, 40, 115, 46, 111, 102, 102, 115, 99, 114, 101, 101, 110, 66, 117, 102, 102, 101, 114, 105, 110, 103, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 111, 102, 102, 115, 99, 114, 101, 101, 110, 66, 117, 102, 102, 101, 114, 105, 110, 103, 39, 32, 43, 32, 115, 46, 111, 102, 102, 115, 99, 114, 101, 101, 110, 66, 117, 102, 102, 101, 114, 105, 110, 103, 59, 125, 105, 102, 40, 115, 46, 108, 111, 103, 105, 99, 97, 108, 88, 68, 80, 73, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 108, 111, 103, 105, 99, 97, 108, 68, 80, 73, 39, 32, 43, 32, 115, 46, 108, 111, 103, 105, 99, 97, 108, 88, 68, 80, 73, 32, 43, 32, 39, 120, 39, 32, 43, 32, 115, 46, 108, 111, 103, 105, 99, 97, 108, 89, 68, 80, 73, 125, 105, 102, 40, 115, 46, 115, 121, 115, 116, 101, 109, 88, 68, 80, 73, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 115, 121, 115, 116, 101, 109, 68, 80, 73, 39, 32, 43, 32, 115, 46, 115, 121, 115, 116, 101, 109, 88, 68, 80, 73, 32, 43, 32, 39, 120, 39, 32, 43, 32, 115, 46, 115, 121, 115, 116, 101, 109, 89, 68, 80, 73, 125, 105, 102, 40, 115, 46, 111, 114, 105, 101, 110, 116, 97, 116, 105, 111, 110, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 111, 114, 105, 101, 110, 116, 97, 116, 105, 111, 110, 61, 39, 32, 43, 32, 49, 59, 125, 105, 102, 40, 115, 46, 112, 105, 120, 101, 108, 68, 101, 112, 116, 104, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 112, 105, 120, 101, 108, 68, 101, 112, 116, 104, 61, 39, 32, 43, 32, 115, 46, 112, 105, 120, 101, 108, 68, 101, 112, 116, 104, 59, 125, 105, 102, 40, 115, 46, 117, 112, 100, 97, 116, 101, 73, 110, 116, 101, 114, 118, 97, 108, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 117, 112, 100, 97, 116, 101, 73, 110, 116, 101, 114, 118, 97, 108, 61, 39, 32, 43, 32, 115, 46, 117, 112, 100, 97, 116, 101, 73, 110, 116, 101, 114, 118, 97, 108, 125, 105, 102, 40, 115, 46, 102, 111, 110, 116, 83, 109, 111, 111, 116, 104, 105, 110, 103, 69, 110, 97, 98, 108, 101, 100, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 102, 111, 110, 116, 83, 109, 111, 111, 116, 104, 105, 110, 103, 69, 110, 97, 98, 108, 101, 100, 61, 49, 39, 59, 125, 32, 114, 101, 116, 117, 114, 110, 32, 115, 116, 114, 59, 125, 41, 40, 41, 0, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 115, 116, 114, 32, 61, 32, 39, 116, 105, 109, 101, 122, 111, 110, 101, 39, 32, 43, 32, 40, 110, 101, 119, 32, 68, 97, 116, 101, 40, 41, 41, 46, 103, 101, 116, 84, 105, 109, 101, 122, 111, 110, 101, 79, 102, 102, 115, 101, 116, 40, 41, 32, 43, 32, 39, 39, 59, 32, 114, 101, 116, 117, 114, 110, 32, 115, 116, 114, 59, 125, 41, 40, 41, 0, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 115, 116, 114, 61, 39, 39, 59, 105, 102, 40, 119, 105, 110, 100, 111, 119, 46, 109, 97, 120, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 115, 80, 101, 114, 83, 101, 114, 118, 101, 114, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 109, 97, 120, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 115, 80, 101, 114, 83, 101, 114, 118, 101, 114, 61, 39, 32, 43, 32, 119, 105, 110, 100, 111, 119, 46, 109, 97, 120, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 115, 80, 101, 114, 83, 101, 114, 118, 101, 114, 59, 125, 105, 102, 40, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 104, 97, 114, 100, 119, 97, 114, 101, 67, 111, 110, 99, 117, 114, 114, 101, 110, 99, 121, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 104, 97, 114, 100, 119, 97, 114, 101, 67, 111, 110, 99, 117, 114, 114, 101, 110, 99, 121, 61, 39, 32, 43, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 104, 97, 114, 100, 119, 97, 114, 101, 67, 111, 110, 99, 117, 114, 114, 101, 110, 99, 121, 59, 125, 105, 102, 40, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 99, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 38, 38, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 99, 111, 110, 110, 101, 99, 116, 105, 111, 110, 46, 116, 121, 112, 101, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 99, 111, 110, 110, 116, 121, 112, 101, 39, 32, 43, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 99, 111, 110, 110, 101, 99, 116, 105, 111, 110, 46, 116, 121, 112, 101, 59, 125, 32, 114, 101, 116, 117, 114, 110, 32, 115, 116, 114, 59, 125, 41, 40, 41, 0, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 115, 116, 114, 61, 40, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 108, 97, 110, 103, 117, 97, 103, 101, 32, 124, 124, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 117, 115, 101, 114, 76, 97, 110, 103, 117, 97, 103, 101, 32, 124, 124, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 98, 114, 111, 119, 115, 101, 114, 76, 97, 110, 103, 117, 97, 103, 101, 32, 124, 124, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 115, 121, 115, 116, 101, 109, 76, 97, 110, 103, 117, 97, 103, 101, 32, 124, 124, 32, 39, 39, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 115, 116, 114, 59, 125, 41, 40, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 115, 116, 114, 32, 61, 32, 39, 39, 59, 118, 97, 114, 32, 97, 114, 114, 32, 61, 32, 91, 39, 115, 101, 115, 115, 105, 111, 110, 83, 116, 111, 114, 97, 103, 101, 39, 44, 32, 39, 108, 111, 99, 97, 108, 83, 116, 111, 114, 97, 103, 101, 39, 44, 32, 39, 105, 110, 100, 101, 120, 101, 100, 68, 66, 39, 44, 39, 111, 112, 101, 110, 68, 97, 116, 97, 98, 97, 115, 101, 39, 93, 59, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 44, 32, 108, 32, 61, 32, 97, 114, 114, 46, 108, 101, 110, 103, 116, 104, 59, 32, 105, 32, 60, 32, 108, 59, 32, 105, 43, 43, 41, 123, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 97, 114, 114, 91, 105, 93, 93, 41, 123, 115, 116, 114, 32, 43, 61, 32, 97, 114, 114, 91, 105, 93, 32, 43, 32, 39, 61, 49, 39, 125, 125, 115, 116, 114, 32, 43, 61, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 117, 115, 101, 114, 65, 103, 101, 110, 116, 59, 105, 102, 40, 47, 109, 115, 105, 101, 47, 105, 46, 116, 101, 115, 116, 40, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 117, 115, 101, 114, 65, 103, 101, 110, 116, 41, 41, 123, 118, 97, 114, 32, 99, 108, 105, 101, 110, 116, 67, 97, 112, 115, 32, 61, 32, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 116, 61, 100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 69, 108, 101, 109, 101, 110, 116, 40, 39, 115, 112, 97, 110, 39, 41, 59, 116, 46, 105, 100, 61, 39, 99, 108, 105, 101, 110, 116, 67, 97, 112, 115, 39, 59, 116, 46, 115, 116, 121, 108, 101, 46, 98, 101, 104, 97, 118, 105, 111, 114, 61, 39, 117, 114, 108, 40, 34, 35, 100, 101, 102, 97, 117, 108, 116, 35, 99, 108, 105, 101, 110, 116, 99, 97, 112, 115, 34, 41, 39, 59, 100, 111, 99, 117, 109, 101, 110, 116, 46, 98, 111, 100, 121, 46, 97, 112, 112, 101, 110, 100, 67, 104, 105, 108, 100, 40, 116, 41, 59, 114, 101, 116, 117, 114, 110, 32, 116, 59, 125, 41, 40, 41, 59, 118, 97, 114, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 61, 123, 39, 68, 83, 39, 58, 39, 123, 52, 52, 66, 66, 65, 56, 52, 56, 45, 67, 67, 53, 49, 45, 49, 49, 67, 70, 45, 65, 65, 70, 65, 45, 48, 48, 65, 65, 48, 48, 66, 54, 48, 49, 53, 67, 125, 39, 44, 32, 39, 68, 72, 68, 66, 39, 58, 39, 123, 57, 51, 56, 49, 68, 56, 70, 50, 45, 48, 50, 56, 56, 45, 49, 49, 68, 48, 45, 57, 53, 48, 49, 45, 48, 48, 65, 65, 48, 48, 66, 57, 49, 49, 65, 53, 125, 39, 44, 32, 39, 68, 72, 68, 66, 70, 74, 39, 58, 39, 123, 52, 70, 50, 49, 54, 57, 55, 48, 45, 67, 57, 48, 67, 45, 49, 49, 68, 49, 45, 66, 53, 67, 55, 45, 48, 48, 48, 48, 70, 56, 48, 53, 49, 53, 49, 53, 125, 39, 44, 32, 39, 73, 67, 87, 39, 58, 39, 123, 53, 65, 56, 68, 54, 69, 69, 48, 45, 51, 69, 49, 56, 45, 49, 49, 68, 48, 45, 56, 50, 49, 69, 45, 52, 52, 52, 53, 53, 51, 53, 52, 48, 48, 48, 48, 125, 39, 44, 32, 39, 73, 69, 39, 58, 39, 123, 56, 57, 56, 50, 48, 50, 48, 48, 45, 69, 67, 66, 68, 45, 49, 49, 67, 70, 45, 56, 66, 56, 53, 45, 48, 48, 65, 65, 48, 48, 53, 66, 52, 51, 56, 51, 125, 39, 44, 32, 39, 73, 69, 67, 70, 74, 39, 58, 39, 123, 48, 56, 66, 48, 69, 53, 67, 48, 45, 52, 70, 67, 66, 45, 49, 49, 67, 70, 45, 65, 65, 65, 53, 45, 48, 48, 52, 48, 49, 67, 54, 48, 56, 53, 53, 53, 125, 39, 44, 32, 39, 87, 77, 80, 39, 58, 39, 123, 50, 50, 68, 54, 70, 51, 49, 50, 45, 66, 48, 70, 54, 45, 49, 49, 68, 48, 45, 57, 52, 65, 66, 45, 48, 48, 56, 48, 67, 55, 52, 67, 55, 69, 57, 53, 125, 39, 44, 32, 39, 78, 78, 39, 58, 39, 123, 52, 52, 66, 66, 65, 56, 52, 50, 45, 67, 67, 53, 49, 45, 49, 49, 67, 70, 45, 65, 65, 70, 65, 45, 48, 48, 65, 65, 48, 48, 66, 54, 48, 49, 53, 66, 125, 39, 44, 32, 39, 79, 66, 80, 39, 58, 39, 123, 51, 65, 70, 51, 54, 50, 51, 48, 45, 65, 50, 54, 57, 45, 49, 49, 68, 49, 45, 66, 53, 66, 70, 45, 48, 48, 48, 48, 70, 56, 48, 53, 49, 53, 49, 53, 125, 39, 44, 32, 39, 79, 69, 39, 58, 39, 123, 52, 52, 66, 66, 65, 56, 52, 48, 45, 67, 67, 53, 49, 45, 49, 49, 67, 70, 45, 65, 65, 70, 65, 45, 48, 48, 65, 65, 48, 48, 66, 54, 48, 49, 53, 67, 125, 39, 44, 32, 39, 84, 83, 39, 58, 39, 123, 67, 67, 50, 65, 57, 66, 65, 48, 45, 51, 66, 68, 68, 45, 49, 49, 68, 48, 45, 56, 50, 49, 69, 45, 52, 52, 52, 53, 53, 51, 53, 52, 48, 48, 48, 48, 125, 39, 44, 32, 39, 77, 86, 77, 39, 58, 39, 123, 48, 56, 66, 48, 69, 53, 67, 48, 45, 52, 70, 67, 66, 45, 49, 49, 67, 70, 45, 65, 65, 65, 53, 45, 48, 48, 52, 48, 49, 67, 54, 48, 56, 53, 48, 48, 125, 39, 44, 32, 39, 68, 68, 69, 39, 58, 39, 123, 52, 52, 66, 66, 65, 56, 53, 53, 45, 67, 67, 53, 49, 45, 49, 49, 67, 70, 45, 65, 65, 70, 65, 45, 48, 48, 65, 65, 48, 48, 66, 54, 48, 49, 53, 70, 125, 39, 44, 32, 39, 68, 79, 84, 78, 69, 84, 39, 58, 39, 123, 54, 70, 65, 66, 57, 57, 68, 48, 45, 66, 65, 66, 56, 45, 49, 49, 68, 49, 45, 57, 57, 52, 65, 45, 48, 48, 67, 48, 52, 70, 57, 56, 66, 66, 67, 57, 125, 39, 44, 32, 39, 89, 72, 79, 79, 39, 58, 39, 123, 69, 53, 68, 49, 50, 67, 52, 69, 45, 55, 66, 52, 70, 45, 49, 49, 68, 51, 45, 66, 53, 67, 57, 45, 48, 48, 53, 48, 48, 52, 53, 67, 51, 67, 57, 54, 125, 39, 44, 32, 39, 83, 87, 68, 78, 69, 87, 39, 58, 39, 123, 49, 54, 54, 66, 49, 66, 67, 65, 45, 51, 70, 57, 67, 45, 49, 49, 67, 70, 45, 56, 48, 55, 53, 45, 52, 52, 52, 53, 53, 51, 53, 52, 48, 48, 48, 48, 125, 39, 44, 32, 39, 68, 79, 84, 78, 69, 84, 70, 77, 39, 58, 39, 123, 56, 57, 66, 52, 67, 49, 67, 68, 45, 66, 48, 49, 56, 45, 52, 53, 49, 49, 45, 66, 48, 65, 49, 45, 53, 52, 55, 54, 68, 66, 70, 55, 48, 56, 50, 48, 125, 39, 44, 32, 39, 77, 68, 70, 72, 39, 58, 39, 123, 56, 69, 70, 65, 52, 55, 53, 51, 45, 55, 49, 54, 57, 45, 52, 67, 67, 51, 45, 65, 50, 56, 66, 45, 48, 65, 49, 54, 52, 51, 66, 56, 65, 51, 57, 66, 125, 39, 44, 32, 39, 70, 76, 72, 39, 58, 39, 123, 68, 50, 55, 67, 68, 66, 54, 69, 45, 65, 69, 54, 68, 45, 49, 49, 67, 70, 45, 57, 54, 66, 56, 45, 52, 52, 52, 53, 53, 51, 53, 52, 48, 48, 48, 48, 125, 39, 44, 32, 39, 83, 87, 39, 58, 39, 123, 50, 65, 50, 48, 50, 52, 57, 49, 45, 70, 48, 48, 68, 45, 49, 49, 67, 70, 45, 56, 55, 67, 67, 45, 48, 48, 50, 48, 65, 70, 69, 69, 67, 70, 50, 48, 125, 39, 44, 32, 39, 83, 87, 68, 39, 58, 39, 123, 50, 51, 51, 67, 49, 53, 48, 55, 45, 54, 65, 55, 55, 45, 52, 54, 65, 52, 45, 57, 52, 52, 51, 45, 70, 56, 55, 49, 70, 57, 52, 53, 68, 50, 53, 56, 125, 39, 44, 32, 39, 82, 80, 39, 58, 39, 123, 67, 70, 67, 68, 65, 65, 48, 51, 45, 56, 66, 69, 52, 45, 49, 49, 67, 70, 45, 66, 56, 52, 66, 45, 48, 48, 50, 48, 65, 70, 66, 66, 67, 67, 70, 65, 125, 39, 44, 32, 39, 81, 84, 39, 58, 39, 123, 68, 69, 52, 65, 70, 51, 66, 48, 45, 70, 52, 68, 52, 45, 49, 49, 68, 51, 45, 66, 52, 49, 65, 45, 48, 48, 53, 48, 68, 65, 50, 69, 54, 67, 50, 49, 125, 39, 44, 32, 39, 73, 69, 72, 69, 39, 58, 39, 123, 68, 69, 53, 65, 69, 68, 48, 48, 45, 65, 52, 66, 70, 45, 49, 49, 68, 49, 45, 57, 57, 52, 56, 45, 48, 48, 67, 48, 52, 70, 57, 56, 66, 66, 67, 57, 125, 39, 32, 125, 59, 102, 111, 114, 32, 40, 118, 97, 114, 32, 110, 97, 109, 101, 32, 105, 110, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 41, 123, 105, 102, 32, 40, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 46, 104, 97, 115, 79, 119, 110, 80, 114, 111, 112, 101, 114, 116, 121, 40, 110, 97, 109, 101, 41, 41, 123, 118, 97, 114, 32, 105, 100, 61, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 91, 110, 97, 109, 101, 93, 59, 105, 102, 32, 40, 99, 108, 105, 101, 110, 116, 67, 97, 112, 115, 46, 105, 115, 67, 111, 109, 112, 111, 110, 101, 110, 116, 73, 110, 115, 116, 97, 108, 108, 101, 100, 40, 105, 100, 44, 39, 99, 111, 109, 112, 111, 110, 101, 110, 116, 105, 100, 39, 41, 41, 123, 118, 97, 114, 32, 118, 101, 114, 61, 99, 108, 105, 101, 110, 116, 67, 97, 112, 115, 46, 103, 101, 116, 67, 111, 109, 112, 111, 110, 101, 110, 116, 86, 101, 114, 115, 105, 111, 110, 40, 105, 100, 44, 39, 99, 111, 109, 112, 111, 110, 101, 110, 116, 105, 100, 39, 41, 59, 115, 116, 114, 32, 43, 61, 32, 110, 97, 109, 101, 32, 43, 32, 39, 58, 39, 32, 43, 32, 118, 101, 114, 59, 125, 125, 125, 118, 97, 114, 32, 112, 114, 111, 103, 115, 32, 61, 32, 91, 39, 65, 99, 114, 111, 80, 68, 70, 46, 80, 68, 70, 39, 44, 32, 39, 65, 100, 111, 100, 98, 46, 83, 116, 114, 101, 97, 109, 39, 44, 39, 65, 103, 67, 111, 110, 116, 114, 111, 108, 46, 65, 103, 67, 111, 110, 116, 114, 111, 108, 39, 44, 32, 39, 68, 101, 118, 97, 108, 86, 82, 88, 67, 116, 114, 108, 46, 68, 101, 118, 97, 108, 86, 82, 88, 67, 116, 114, 108, 46, 49, 39, 44, 39, 77, 97, 99, 114, 111, 109, 101, 100, 105, 97, 70, 108, 97, 115, 104, 80, 97, 112, 101, 114, 46, 77, 97, 99, 114, 111, 109, 101, 100, 105, 97, 70, 108, 97, 115, 104, 80, 97, 112, 101, 114, 39, 44, 39, 77, 115, 120, 109, 108, 50, 46, 68, 79, 77, 68, 111, 99, 117, 109, 101, 110, 116, 39, 44, 39, 77, 115, 120, 109, 108, 50, 46, 88, 77, 76, 72, 84, 84, 80, 39, 44, 39, 80, 68, 70, 46, 80, 100, 102, 67, 116, 114, 108, 39, 44, 32, 39, 81, 117, 105, 99, 107, 84, 105, 109, 101, 46, 81, 117, 105, 99, 107, 84, 105, 109, 101, 39, 44, 32, 39, 81, 117, 105, 99, 107, 84, 105, 109, 101, 67, 104, 101, 99, 107, 79, 98, 106, 101, 99, 116, 46, 81, 117, 105, 99, 107, 84, 105, 109, 101, 67, 104, 101, 99, 107, 46, 49, 39, 44, 39, 82, 101, 97, 108, 80, 108, 97, 121, 101, 114, 39, 44, 39, 82, 101, 97, 108, 80, 108, 97, 121, 101, 114, 46, 82, 101, 97, 108, 80, 108, 97, 121, 101, 114, 40, 116, 109, 41, 32, 65, 99, 116, 105, 118, 101, 88, 32, 67, 111, 110, 116, 114, 111, 108, 32, 40, 51, 50, 45, 98, 105, 116, 41, 39, 44, 39, 82, 101, 97, 108, 86, 105, 100, 101, 111, 46, 82, 101, 97, 108, 86, 105, 100, 101, 111, 40, 116, 109, 41, 32, 65, 99, 116, 105, 118, 101, 88, 32, 67, 111, 110, 116, 114, 111, 108, 32, 40, 51, 50, 45, 98, 105, 116, 41, 39, 44, 39, 83, 99, 114, 105, 112, 116, 105, 110, 103, 46, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 39, 44, 39, 83, 87, 67, 116, 108, 46, 83, 87, 67, 116, 108, 39, 44, 32, 39, 83, 104, 101, 108, 108, 46, 85, 73, 72, 101, 108, 112, 101, 114, 39, 44, 39, 83, 104, 111, 99, 107, 119, 97, 118, 101, 70, 108, 97, 115, 104, 46, 83, 104, 111, 99, 107, 119, 97, 118, 101, 70, 108, 97, 115, 104, 39, 44, 39, 83, 107, 121, 112, 101, 46, 68, 101, 116, 101, 99, 116, 105, 111, 110, 39, 44, 39, 84, 68, 67, 67, 116, 108, 46, 84, 68, 67, 67, 116, 108, 39, 44, 39, 87, 77, 80, 108, 97, 121, 101, 114, 46, 79, 67, 88, 39, 44, 32, 39, 114, 109, 111, 99, 120, 46, 82, 101, 97, 108, 80, 108, 97, 121, 101, 114, 32, 71, 50, 32, 67, 111, 110, 116, 114, 111, 108, 39, 44, 39, 114, 109, 111, 99, 120, 46, 82, 101, 97, 108, 80, 108, 97, 121, 101, 114, 32, 71, 50, 32, 67, 111, 110, 116, 114, 111, 108, 46, 49, 39, 44, 39, 123, 68, 50, 55, 67, 68, 66, 54, 69, 45, 65, 69, 54, 68, 45, 49, 49, 67, 70, 45, 57, 54, 66, 56, 45, 52, 52, 52, 53, 53, 51, 53, 52, 48, 48, 48, 48, 125, 39, 93, 59, 102, 111, 114, 32, 40, 118, 97, 114, 32, 105, 61, 48, 59, 105, 60, 112, 114, 111, 103, 115, 46, 108, 101, 110, 103, 116, 104, 59, 105, 43, 43, 41, 123, 116, 114, 121, 32, 123, 110, 101, 119, 32, 65, 99, 116, 105, 118, 101, 88, 79, 98, 106, 101, 99, 116, 40, 112, 114, 111, 103, 115, 91, 105, 93, 41, 59, 115, 116, 114, 32, 43, 61, 32, 112, 114, 111, 103, 115, 91, 105, 93, 59, 125, 99, 97, 116, 99, 104, 40, 101, 41, 32, 123, 125, 59, 125, 125, 101, 108, 115, 101, 123, 118, 97, 114, 32, 112, 108, 115, 32, 61, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 112, 108, 117, 103, 105, 110, 115, 44, 32, 112, 32, 61, 32, 39, 112, 108, 115, 39, 59, 102, 111, 114, 32, 40, 118, 97, 114, 32, 106, 32, 61, 32, 48, 59, 32, 106, 32, 60, 32, 112, 108, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 106, 43, 43, 41, 32, 123, 118, 97, 114, 32, 111, 112, 32, 61, 32, 112, 108, 115, 91, 106, 93, 59, 112, 32, 43, 61, 32, 40, 111, 112, 46, 102, 105, 108, 101, 110, 97, 109, 101, 32, 124, 124, 32, 111, 112, 46, 110, 97, 109, 101, 32, 124, 124, 32, 106, 41, 59, 105, 102, 32, 40, 106, 32, 62, 32, 51, 48, 41, 32, 98, 114, 101, 97, 107, 59, 125, 115, 116, 114, 32, 43, 61, 32, 112, 59, 125, 105, 102, 40, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 112, 108, 97, 116, 102, 111, 114, 109, 41, 123, 115, 116, 114, 32, 43, 61, 32, 39, 112, 108, 97, 116, 102, 111, 114, 109, 61, 39, 32, 43, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 112, 108, 97, 116, 102, 111, 114, 109, 59, 125, 105, 102, 40, 116, 121, 112, 101, 111, 102, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 100, 111, 78, 111, 116, 84, 114, 97, 99, 107, 32, 33, 61, 32, 39, 117, 110, 100, 101, 102, 105, 110, 101, 100, 39, 41, 123, 115, 116, 114, 32, 43, 61, 32, 40, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 100, 111, 78, 111, 116, 84, 114, 97, 99, 107, 32, 124, 124, 32, 48, 41, 59, 125, 32, 114, 101, 116, 117, 114, 110, 32, 115, 116, 114, 59, 125, 41, 40, 41, 0, 40, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 118, 97, 114, 32, 115, 116, 114, 32, 61, 32, 39, 39, 59, 116, 114, 121, 123, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 69, 108, 101, 109, 101, 110, 116, 40, 39, 99, 97, 110, 118, 97, 115, 39, 41, 59, 105, 102, 32, 40, 116, 121, 112, 101, 111, 102, 32, 99, 97, 110, 118, 97, 115, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 32, 61, 61, 61, 32, 39, 117, 110, 100, 101, 102, 105, 110, 101, 100, 39, 41, 32, 123, 115, 116, 114, 32, 43, 61, 32, 39, 85, 78, 83, 85, 80, 80, 79, 82, 84, 69, 68, 95, 67, 65, 78, 86, 65, 83, 39, 59, 125, 32, 101, 108, 115, 101, 32, 123, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 32, 61, 32, 55, 56, 48, 59, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 32, 61, 32, 49, 53, 48, 59, 118, 97, 114, 32, 115, 116, 114, 84, 101, 120, 116, 32, 61, 32, 34, 69, 110, 103, 108, 105, 115, 104, 228, 184, 173, 230, 150, 135, 213, 128, 213, 161, 213, 181, 213, 165, 214, 128, 213, 165, 213, 182, 216, 167, 231, 185, 129, 233, 171, 148, 232, 188, 184, 229, 133, 165, 217, 132, 216, 185, 216, 177, 216, 168, 217, 138, 216, 169, 210, 154, 208, 176, 208, 183, 208, 176, 210, 155, 209, 136, 208, 176, 96, 126, 49, 33, 50, 64, 51, 35, 52, 36, 53, 37, 54, 94, 55, 38, 56, 42, 57, 40, 48, 41, 45, 95, 61, 43, 91, 123, 93, 125, 124, 59, 58, 39, 44, 60, 46, 62, 47, 63, 92, 117, 100, 56, 51, 100, 92, 117, 100, 101, 48, 51, 34, 59, 118, 97, 114, 32, 99, 116, 120, 32, 61, 32, 99, 97, 110, 118, 97, 115, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 39, 50, 100, 39, 41, 59, 99, 116, 120, 46, 115, 97, 118, 101, 40, 41, 59, 99, 116, 120, 46, 114, 101, 99, 116, 40, 48, 44, 32, 48, 44, 32, 49, 48, 44, 32, 49, 48, 41, 59, 99, 116, 120, 46, 114, 101, 99, 116, 40, 50, 44, 32, 50, 44, 32, 54, 44, 32, 54, 41, 59, 115, 116, 114, 32, 43, 61, 32, 99, 116, 120, 46, 105, 115, 80, 111, 105, 110, 116, 73, 110, 80, 97, 116, 104, 40, 53, 44, 53, 44, 39, 101, 118, 101, 110, 111, 100, 100, 39, 41, 61, 61, 61, 102, 97, 108, 115, 101, 63, 32, 39, 121, 101, 115, 39, 32, 58, 32, 39, 110, 111, 39, 59, 99, 116, 120, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 99, 116, 120, 46, 115, 97, 118, 101, 40, 41, 59, 118, 97, 114, 32, 103, 114, 32, 61, 32, 99, 116, 120, 46, 99, 114, 101, 97, 116, 101, 76, 105, 110, 101, 97, 114, 71, 114, 97, 100, 105, 101, 110, 116, 40, 48, 44, 32, 48, 44, 32, 50, 48, 48, 44, 32, 48, 41, 59, 103, 114, 46, 97, 100, 100, 67, 111, 108, 111, 114, 83, 116, 111, 112, 40, 48, 44, 32, 39, 114, 103, 98, 40, 50, 48, 48, 44, 48, 44, 48, 41, 39, 41, 59, 103, 114, 46, 97, 100, 100, 67, 111, 108, 111, 114, 83, 116, 111, 112, 40, 46, 53, 44, 32, 39, 114, 103, 98, 40, 48, 44, 50, 48, 48, 44, 48, 41, 39, 41, 59, 103, 114, 46, 97, 100, 100, 67, 111, 108, 111, 114, 83, 116, 111, 112, 40, 49, 44, 32, 39, 114, 103, 98, 40, 50, 48, 48, 44, 48, 44, 48, 41, 39, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 103, 114, 59, 99, 116, 120, 46, 102, 105, 108, 108, 82, 101, 99, 116, 40, 48, 44, 32, 48, 44, 32, 50, 48, 48, 44, 32, 49, 53, 48, 41, 59, 99, 116, 120, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 99, 116, 120, 46, 115, 97, 118, 101, 40, 41, 59, 99, 116, 120, 46, 116, 114, 97, 110, 115, 108, 97, 116, 101, 40, 50, 53, 48, 44, 48, 41, 59, 99, 116, 120, 46, 103, 108, 111, 98, 97, 108, 67, 111, 109, 112, 111, 115, 105, 116, 101, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 61, 32, 39, 109, 117, 108, 116, 105, 112, 108, 121, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 50, 53, 53, 44, 48, 44, 50, 53, 53, 41, 39, 59, 99, 116, 120, 46, 98, 101, 103, 105, 110, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 97, 114, 99, 40, 53, 48, 44, 32, 53, 48, 44, 32, 53, 48, 44, 32, 48, 44, 32, 77, 97, 116, 104, 46, 80, 73, 32, 42, 32, 50, 44, 32, 116, 114, 117, 101, 41, 59, 99, 116, 120, 46, 99, 108, 111, 115, 101, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 48, 44, 50, 53, 53, 44, 50, 53, 53, 41, 39, 59, 99, 116, 120, 46, 98, 101, 103, 105, 110, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 97, 114, 99, 40, 49, 48, 48, 44, 32, 53, 48, 44, 32, 53, 48, 44, 32, 48, 44, 32, 77, 97, 116, 104, 46, 80, 73, 32, 42, 32, 50, 44, 32, 116, 114, 117, 101, 41, 59, 99, 116, 120, 46, 99, 108, 111, 115, 101, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 50, 53, 53, 44, 50, 53, 53, 44, 48, 41, 39, 59, 99, 116, 120, 46, 98, 101, 103, 105, 110, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 97, 114, 99, 40, 55, 53, 44, 32, 49, 48, 48, 44, 32, 53, 48, 44, 32, 48, 44, 32, 77, 97, 116, 104, 46, 80, 73, 32, 42, 32, 50, 44, 32, 116, 114, 117, 101, 41, 59, 99, 116, 120, 46, 99, 108, 111, 115, 101, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 50, 53, 53, 44, 48, 44, 50, 53, 53, 41, 39, 59, 99, 116, 120, 46, 97, 114, 99, 40, 55, 53, 44, 32, 55, 53, 44, 32, 55, 53, 44, 32, 48, 44, 32, 77, 97, 116, 104, 46, 80, 73, 32, 42, 32, 50, 44, 32, 116, 114, 117, 101, 41, 59, 99, 116, 120, 46, 97, 114, 99, 40, 55, 53, 44, 32, 55, 53, 44, 32, 50, 53, 44, 32, 48, 44, 32, 77, 97, 116, 104, 46, 80, 73, 32, 42, 32, 50, 44, 32, 116, 114, 117, 101, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 40, 39, 101, 118, 101, 110, 111, 100, 100, 39, 41, 59, 99, 116, 120, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 99, 116, 120, 46, 115, 97, 118, 101, 40, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 35, 51, 54, 48, 39, 59, 99, 116, 120, 46, 102, 111, 110, 116, 32, 61, 32, 34, 49, 51, 112, 120, 32, 39, 115, 97, 110, 115, 39, 34, 59, 99, 116, 120, 46, 116, 101, 120, 116, 66, 97, 115, 101, 76, 105, 110, 101, 32, 61, 32, 39, 116, 111, 112, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 115, 116, 114, 84, 101, 120, 116, 44, 32, 53, 44, 32, 49, 56, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 35, 51, 54, 48, 39, 59, 99, 116, 120, 46, 102, 111, 110, 116, 32, 61, 32, 34, 49, 52, 112, 120, 32, 39, 77, 105, 99, 114, 111, 115, 111, 102, 116, 32, 89, 97, 104, 101, 105, 39, 34, 59, 99, 116, 120, 46, 116, 101, 120, 116, 66, 97, 115, 101, 76, 105, 110, 101, 32, 61, 32, 39, 116, 111, 112, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 115, 116, 114, 84, 101, 120, 116, 44, 32, 53, 44, 32, 51, 49, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 35, 51, 54, 48, 39, 59, 99, 116, 120, 46, 102, 111, 110, 116, 32, 61, 32, 34, 49, 53, 112, 120, 32, 39, 67, 111, 110, 115, 111, 108, 97, 115, 39, 34, 59, 99, 116, 120, 46, 116, 101, 120, 116, 66, 97, 115, 101, 76, 105, 110, 101, 32, 61, 32, 39, 116, 111, 112, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 115, 116, 114, 84, 101, 120, 116, 44, 32, 53, 44, 32, 52, 52, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 35, 51, 54, 48, 39, 59, 99, 116, 120, 46, 102, 111, 110, 116, 32, 61, 32, 34, 57, 112, 120, 32, 39, 65, 114, 105, 97, 108, 39, 34, 59, 99, 116, 120, 46, 116, 101, 120, 116, 66, 97, 115, 101, 76, 105, 110, 101, 32, 61, 32, 39, 116, 111, 112, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 115, 116, 114, 84, 101, 120, 116, 44, 32, 53, 44, 32, 53, 54, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 35, 51, 54, 48, 39, 59, 99, 116, 120, 46, 102, 111, 110, 116, 32, 61, 32, 34, 49, 48, 112, 120, 32, 39, 86, 101, 114, 100, 97, 110, 97, 39, 34, 59, 99, 116, 120, 46, 116, 101, 120, 116, 66, 97, 115, 101, 76, 105, 110, 101, 32, 61, 32, 39, 116, 111, 112, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 115, 116, 114, 84, 101, 120, 116, 44, 32, 53, 44, 32, 54, 57, 41, 59, 99, 116, 120, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 35, 51, 54, 48, 39, 59, 99, 116, 120, 46, 102, 111, 110, 116, 32, 61, 32, 34, 49, 49, 112, 120, 32, 39, 87, 101, 98, 100, 105, 110, 103, 115, 39, 34, 59, 99, 116, 120, 46, 116, 101, 120, 116, 66, 97, 115, 101, 76, 105, 110, 101, 32, 61, 32, 39, 116, 111, 112, 39, 59, 99, 116, 120, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 115, 116, 114, 84, 101, 120, 116, 44, 32, 53, 44, 32, 56, 48, 41, 59, 99, 116, 120, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 99, 116, 120, 46, 115, 97, 118, 101, 40, 41, 59, 99, 116, 120, 46, 98, 101, 103, 105, 110, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 115, 116, 114, 111, 107, 101, 83, 116, 121, 108, 101, 32, 61, 32, 39, 98, 108, 117, 101, 39, 59, 99, 116, 120, 46, 108, 105, 110, 101, 87, 105, 100, 116, 104, 32, 61, 32, 53, 59, 99, 116, 120, 46, 115, 104, 97, 100, 111, 119, 79, 102, 102, 115, 101, 116, 88, 32, 61, 32, 50, 59, 99, 116, 120, 46, 115, 104, 97, 100, 111, 119, 79, 102, 102, 115, 101, 116, 89, 32, 61, 32, 50, 59, 99, 116, 120, 46, 115, 104, 97, 100, 111, 119, 67, 111, 108, 111, 114, 32, 61, 32, 39, 114, 103, 98, 40, 56, 53, 44, 56, 53, 44, 56, 53, 41, 39, 59, 99, 116, 120, 46, 115, 104, 97, 100, 111, 119, 66, 108, 117, 114, 32, 61, 32, 51, 59, 99, 116, 120, 46, 97, 114, 99, 40, 53, 48, 48, 44, 32, 49, 53, 44, 32, 49, 48, 44, 32, 48, 44, 32, 77, 97, 116, 104, 46, 80, 73, 32, 42, 32, 50, 44, 32, 116, 114, 117, 101, 41, 59, 99, 116, 120, 46, 115, 116, 114, 111, 107, 101, 40, 41, 59, 99, 116, 120, 46, 99, 108, 111, 115, 101, 80, 97, 116, 104, 40, 41, 59, 99, 116, 120, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 115, 116, 114, 32, 43, 61, 32, 99, 97, 110, 118, 97, 115, 46, 116, 111, 68, 97, 116, 97, 85, 82, 76, 40, 41, 59, 125, 115, 116, 114, 32, 43, 61, 32, 110, 97, 118, 105, 103, 97, 116, 111, 114, 46, 99, 112, 117, 67, 108, 97, 115, 115, 32, 124, 124, 32, 39, 39, 59, 125, 99, 97, 116, 99, 104, 40, 101, 41, 123, 125, 114, 101, 116, 117, 114, 110, 32, 115, 116, 114, 59, 125, 41, 40, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 37, 115, 0, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 45, 35, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 0, 0, 0, 0, 0, 0, 0, 48, 46, 49, 46, 49, 0, 84, 33, 34, 25, 13, 1, 2, 3, 17, 75, 28, 12, 16, 4, 11, 29, 18, 30, 39, 104, 110, 111, 112, 113, 98, 32, 5, 6, 15, 19, 20, 21, 26, 8, 22, 7, 40, 36, 23, 24, 9, 10, 14, 27, 31, 37, 35, 131, 130, 125, 38, 42, 43, 60, 61, 62, 63, 67, 71, 74, 77, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108, 114, 115, 116, 121, 122, 123, 124, 0, 73, 108, 108, 101, 103, 97, 108, 32, 98, 121, 116, 101, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0, 68, 111, 109, 97, 105, 110, 32, 101, 114, 114, 111, 114, 0, 82, 101, 115, 117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 97, 98, 108, 101, 0, 78, 111, 116, 32, 97, 32, 116, 116, 121, 0, 80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110, 111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 78, 111, 32, 115, 117, 99, 104, 32, 112, 114, 111, 99, 101, 115, 115, 0, 70, 105, 108, 101, 32, 101, 120, 105, 115, 116, 115, 0, 86, 97, 108, 117, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 32, 102, 111, 114, 32, 100, 97, 116, 97, 32, 116, 121, 112, 101, 0, 78, 111, 32, 115, 112, 97, 99, 101, 32, 108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101, 0, 79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121, 0, 73, 110, 116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116, 101, 109, 32, 99, 97, 108, 108, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 116, 101, 109, 112, 111, 114, 97, 114, 105, 108, 121, 32, 117, 110, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 73, 110, 118, 97, 108, 105, 100, 32, 115, 101, 101, 107, 0, 67, 114, 111, 115, 115, 45, 100, 101, 118, 105, 99, 101, 32, 108, 105, 110, 107, 0, 82, 101, 97, 100, 45, 111, 110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109, 0, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32, 101, 109, 112, 116, 121, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 112, 101, 101, 114, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 116, 105, 109, 101, 100, 32, 111, 117, 116, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 102, 117, 115, 101, 100, 0, 72, 111, 115, 116, 32, 105, 115, 32, 100, 111, 119, 110, 0, 72, 111, 115, 116, 32, 105, 115, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 65, 100, 100, 114, 101, 115, 115, 32, 105, 110, 32, 117, 115, 101, 0, 66, 114, 111, 107, 101, 110, 32, 112, 105, 112, 101, 0, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115, 0, 66, 108, 111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 0, 78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98, 117, 115, 121, 0, 69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32, 101, 114, 114, 111, 114, 0, 73, 110, 118, 97, 108, 105, 100, 32, 97, 114, 103, 117, 109, 101, 110, 116, 0, 65, 114, 103, 117, 109, 101, 110, 116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 83, 121, 109, 98, 111, 108, 105, 99, 32, 108, 105, 110, 107, 32, 108, 111, 111, 112, 0, 70, 105, 108, 101, 110, 97, 109, 101, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 111, 112, 101, 110, 32, 102, 105, 108, 101, 115, 32, 105, 110, 32, 115, 121, 115, 116, 101, 109, 0, 78, 111, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 66, 97, 100, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 0, 78, 111, 32, 99, 104, 105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 0, 66, 97, 100, 32, 97, 100, 100, 114, 101, 115, 115, 0, 70, 105, 108, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 108, 105, 110, 107, 115, 0, 78, 111, 32, 108, 111, 99, 107, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 100, 101, 97, 100, 108, 111, 99, 107, 32, 119, 111, 117, 108, 100, 32, 111, 99, 99, 117, 114, 0, 83, 116, 97, 116, 101, 32, 110, 111, 116, 32, 114, 101, 99, 111, 118, 101, 114, 97, 98, 108, 101, 0, 80, 114, 101, 118, 105, 111, 117, 115, 32, 111, 119, 110, 101, 114, 32, 100, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 99, 97, 110, 99, 101, 108, 101, 100, 0, 70, 117, 110, 99, 116, 105, 111, 110, 32, 110, 111, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101, 100, 0, 78, 111, 32, 109, 101, 115, 115, 97, 103, 101, 32, 111, 102, 32, 100, 101, 115, 105, 114, 101, 100, 32, 116, 121, 112, 101, 0, 73, 100, 101, 110, 116, 105, 102, 105, 101, 114, 32, 114, 101, 109, 111, 118, 101, 100, 0, 68, 101, 118, 105, 99, 101, 32, 110, 111, 116, 32, 97, 32, 115, 116, 114, 101, 97, 109, 0, 78, 111, 32, 100, 97, 116, 97, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 68, 101, 118, 105, 99, 101, 32, 116, 105, 109, 101, 111, 117, 116, 0, 79, 117, 116, 32, 111, 102, 32, 115, 116, 114, 101, 97, 109, 115, 32, 114, 101, 115, 111, 117, 114, 99, 101, 115, 0, 76, 105, 110, 107, 32, 104, 97, 115, 32, 98, 101, 101, 110, 32, 115, 101, 118, 101, 114, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 101, 114, 114, 111, 114, 0, 66, 97, 100, 32, 109, 101, 115, 115, 97, 103, 101, 0, 70, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 32, 105, 110, 32, 98, 97, 100, 32, 115, 116, 97, 116, 101, 0, 78, 111, 116, 32, 97, 32, 115, 111, 99, 107, 101, 116, 0, 68, 101, 115, 116, 105, 110, 97, 116, 105, 111, 110, 32, 97, 100, 100, 114, 101, 115, 115, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 77, 101, 115, 115, 97, 103, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 119, 114, 111, 110, 103, 32, 116, 121, 112, 101, 32, 102, 111, 114, 32, 115, 111, 99, 107, 101, 116, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 116, 121, 112, 101, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 78, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 65, 100, 100, 114, 101, 115, 115, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 121, 32, 112, 114, 111, 116, 111, 99, 111, 108, 0, 65, 100, 100, 114, 101, 115, 115, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 78, 101, 116, 119, 111, 114, 107, 32, 105, 115, 32, 100, 111, 119, 110, 0, 78, 101, 116, 119, 111, 114, 107, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 110, 101, 116, 119, 111, 114, 107, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 97, 98, 111, 114, 116, 101, 100, 0, 78, 111, 32, 98, 117, 102, 102, 101, 114, 32, 115, 112, 97, 99, 101, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 83, 111, 99, 107, 101, 116, 32, 105, 115, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 67, 97, 110, 110, 111, 116, 32, 115, 101, 110, 100, 32, 97, 102, 116, 101, 114, 32, 115, 111, 99, 107, 101, 116, 32, 115, 104, 117, 116, 100, 111, 119, 110, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 97, 108, 114, 101, 97, 100, 121, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 83, 116, 97, 108, 101, 32, 102, 105, 108, 101, 32, 104, 97, 110, 100, 108, 101, 0, 82, 101, 109, 111, 116, 101, 32, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 81, 117, 111, 116, 97, 32, 101, 120], "i8", 4, y.g + 1112);
    M([99, 101, 101, 100, 101, 100, 0, 78, 111, 32, 109, 101, 100, 105, 117, 109, 32, 102, 111, 117, 110, 100, 0, 87, 114, 111, 110, 103, 32, 109, 101, 100, 105, 117, 109, 32, 116, 121, 112, 101, 0, 78, 111, 32, 101, 114, 114, 111, 114, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 0, 0, 37, 115], "i8", 4, y.g + 11352);
    M([17, 0, 10, 0, 17, 17, 17, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 15, 10, 17, 17, 17, 3, 10, 7, 0, 1, 19, 9, 11, 11, 0, 0, 9, 6, 11, 0, 0, 11, 0, 6, 17, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 10, 10, 17, 17, 17, 0, 10, 0, 0, 2, 0, 9, 11, 0, 0, 0, 9, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 4, 13, 0, 0, 0, 0, 9, 14, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 15, 0, 0, 0, 0, 9, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 11, 0, 0, 0, 0, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 45, 43, 32, 32, 32, 48, 88, 48, 120, 0, 40, 110, 117, 108, 108, 41, 0, 45, 48, 88, 43, 48, 88, 32, 48, 88, 45, 48, 120, 43, 48, 120, 32, 48, 120, 0, 105, 110, 102, 0, 73, 78, 70, 0, 110, 97, 110, 0, 78, 65, 78, 0, 46, 0], "i8", 4, y.g + 12450);
    var Ka = y.u(M(12, "i8", 2), 8);
    assert(0 == Ka % 8);
    d._bitshift64Lshr = La;
    d._memset = Ma;
    d._i64Subtract = Na;
    d._i64Add = Oa;

    function Pa(a, b) {
        T.push(function () {
            y.k("vi", a, [b])
        });
        Pa.level = T.length
    }

    d._bitshift64Shl = Qa;
    d._memcpy = Ra;
    var V = 0;

    function W() {
        V += 4;
        return I[V - 4 >> 2]
    }

    var Sa = {};

    function Ta(a) {
        d.___errno_location && (I[d.___errno_location() >> 2] = a);
        return a
    }

    function X(a) {
        X.S || (A = wa(),
                X.S = !0,
                assert(y.n),
                X.N = y.n,
                y.n = function () {
                    C("cannot dynamically allocate, sbrk now has control")
                }
        );
        var b = A;
        return 0 == a || X.N(a) ? b : 4294967295
    }

    function Y(a) {
        a = eval(G(a)) + "";
        if (!Y.o || Y.o < a.length + 1)
            Y.o && P(Y.buffer),
                Y.o = a.length + 1,
                Y.buffer = N(Y.o);
        ka(a, Y.buffer);
        return Y.buffer
    }

    function Ua(a, b) {
        V = b;
        try {
            W();
            var c = W()
                , e = W()
                , g = 0;
            Ua.buffer || (Ua.buffer = []);
            for (var k = Ua.buffer, l = 0; l < e; l++) {
                for (var f = I[c + 8 * l >> 2], t = I[c + (8 * l + 4) >> 2], p = 0; p < t; p++) {
                    var q = O[f + p];
                    0 === q || 10 === q ? (d.print(ra(k, 0)),
                        k.length = 0) : k.push(q)
                }
                g += t
            }
            return g
        } catch (m) {
            return "undefined" !== typeof FS && m instanceof FS.F || C(m),
                -m.G
        }
    }

    Aa = x = y.u(z);
    Ba = Aa + Da;
    Ca = A = y.u(Ba);
    assert(Ca < B, "AS");
    var Va = M([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", 3);
    d.L = {
        Math: Math,
        Int8Array: Int8Array,
        Int16Array: Int16Array,
        Int32Array: Int32Array,
        Uint8Array: Uint8Array,
        Uint16Array: Uint16Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Float64Array: Float64Array,
        NaN: NaN,
        Infinity: Infinity
    };
    d.M = {
        abort: C,
        assert: assert,
        invoke_ii: function (a, b) {
            try {
                return d.dynCall_ii(a, b)
            } catch (c) {
                if ("number" !== typeof c && "longjmp" !== c)
                    throw "T";
                Z.setThrew(1, 0)
            }
        },
        invoke_iiii: function (a, b, c, e) {
            try {
                return d.dynCall_iiii(a, b, c, e)
            } catch (g) {
                if ("number" !== typeof g && "longjmp" !== g)
                    throw "T";
                Z.setThrew(1, 0)
            }
        },
        invoke_vi: function (a, b) {
            try {
                d.dynCall_vi(a, b)
            } catch (c) {
                if ("number" !== typeof c && "longjmp" !== c)
                    throw "T";
                Z.setThrew(1, 0)
            }
        },
        _pthread_cleanup_pop: function () {
            assert(Pa.level == T.length, "AS");
            T.pop();
            Pa.level = T.length
        },
        _emscripten_run_script_string: Y,
        _pthread_self: function () {
            return 0
        },
        _abort: function () {
            d.abort()
        },
        ___setErrNo: Ta,
        ___syscall6: function (a, b) {
            V = b;
            try {
                var c = Sa.P();
                FS.close(c);
                return 0
            } catch (e) {
                return "undefined" !== typeof FS && e instanceof FS.F || C(e),
                    -e.G
            }
        },
        _sbrk: X,
        _time: function (a) {
            var b = Date.now() / 1E3 | 0;
            a && (I[a >> 2] = b);
            return b
        },
        _pthread_cleanup_push: Pa,
        _emscripten_memcpy_big: function (a, b, c) {
            O.set(O.subarray(b, b + c), a);
            return a
        },
        ___syscall54: function (a, b) {
            V = b;
            return 0
        },
        ___syscall140: function (a, b) {
            V = b;
            try {
                var c = Sa.P()
                    , e = W()
                    , g = W()
                    , k = W()
                    , l = W();
                assert(0 === e);
                FS.ha(c, g, l);
                I[k >> 2] = c.position;
                c.R && 0 === g && 0 === l && (c.R = null);
                return 0
            } catch (f) {
                return "undefined" !== typeof FS && f instanceof FS.F || C(f),
                    -f.G
            }
        },
        _sysconf: function (a) {
            switch (a) {
                case 30:
                    return 4096;
                case 85:
                    return Q / 4096;
                case 132:
                case 133:
                case 12:
                case 137:
                case 138:
                case 15:
                case 235:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 149:
                case 13:
                case 10:
                case 236:
                case 153:
                case 9:
                case 21:
                case 22:
                case 159:
                case 154:
                case 14:
                case 77:
                case 78:
                case 139:
                case 80:
                case 81:
                case 82:
                case 68:
                case 67:
                case 164:
                case 11:
                case 29:
                case 47:
                case 48:
                case 95:
                case 52:
                case 51:
                case 46:
                    return 200809;
                case 79:
                    return 0;
                case 27:
                case 246:
                case 127:
                case 128:
                case 23:
                case 24:
                case 160:
                case 161:
                case 181:
                case 182:
                case 242:
                case 183:
                case 184:
                case 243:
                case 244:
                case 245:
                case 165:
                case 178:
                case 179:
                case 49:
                case 50:
                case 168:
                case 169:
                case 175:
                case 170:
                case 171:
                case 172:
                case 97:
                case 76:
                case 32:
                case 173:
                case 35:
                    return -1;
                case 176:
                case 177:
                case 7:
                case 155:
                case 8:
                case 157:
                case 125:
                case 126:
                case 92:
                case 93:
                case 129:
                case 130:
                case 131:
                case 94:
                case 91:
                    return 1;
                case 74:
                case 60:
                case 69:
                case 70:
                case 4:
                    return 1024;
                case 31:
                case 42:
                case 72:
                    return 32;
                case 87:
                case 26:
                case 33:
                    return 2147483647;
                case 34:
                case 1:
                    return 47839;
                case 38:
                case 36:
                    return 99;
                case 43:
                case 37:
                    return 2048;
                case 0:
                    return 2097152;
                case 3:
                    return 65536;
                case 28:
                    return 32768;
                case 44:
                    return 32767;
                case 75:
                    return 16384;
                case 39:
                    return 1E3;
                case 89:
                    return 700;
                case 71:
                    return 256;
                case 40:
                    return 255;
                case 2:
                    return 100;
                case 180:
                    return 64;
                case 25:
                    return 20;
                case 5:
                    return 16;
                case 6:
                    return 6;
                case 73:
                    return 4;
                case 84:
                    return "object" === typeof navigator ? navigator.hardwareConcurrency || 1 : 1
            }
            Ta(22);
            return -1
        },
        ___syscall146: Ua,
        STACKTOP: x,
        STACK_MAX: Ba,
        tempDoublePtr: Ka,
        ABORT: D,
        cttz_i8: Va
    };
    var Z = function (global, env, buffer) {
        var a = new global.Int8Array(buffer);
        var b = new global.Int16Array(buffer);
        var c = new global.Int32Array(buffer);
        var d = new global.Uint8Array(buffer);
        var e = new global.Uint16Array(buffer);
        var f = new global.Uint32Array(buffer);
        var g = new global.Float32Array(buffer);
        var h = new global.Float64Array(buffer);
        var i = env.STACKTOP | 0;
        var j = env.STACK_MAX | 0;
        var k = env.tempDoublePtr | 0;
        var l = env.ABORT | 0;
        var m = env.cttz_i8 | 0;
        var n = 0;
        var o = 0;
        var p = 0;
        var q = 0;
        var r = global.NaN
            , s = global.Infinity;
        var t = 0
            , u = 0
            , v = 0
            , w = 0
            , x = 0
            , y = 0
            , z = 0
            , A = 0
            , B = 0;
        var C = 0;
        var D = 0;
        var E = 0;
        var F = 0;
        var G = 0;
        var H = 0;
        var I = 0;
        var J = 0;
        var K = 0;
        var L = 0;
        var M = global.Math.floor;
        var N = global.Math.abs;
        var O = global.Math.sqrt;
        var P = global.Math.pow;
        var Q = global.Math.cos;
        var R = global.Math.sin;
        var S = global.Math.tan;
        var T = global.Math.acos;
        var U = global.Math.asin;
        var V = global.Math.atan;
        var W = global.Math.atan2;
        var X = global.Math.exp;
        var Y = global.Math.log;
        var Z = global.Math.ceil;
        var _ = global.Math.imul;
        var $ = global.Math.min;
        var aa = global.Math.clz32;
        var ba = env.abort;
        var ca = env.assert;
        var da = env.invoke_ii;
        var ea = env.invoke_iiii;
        var fa = env.invoke_vi;
        var ga = env._pthread_cleanup_pop;
        var ha = env._emscripten_run_script_string;
        var ia = env._pthread_self;
        var ja = env._abort;
        var ka = env.___setErrNo;
        var la = env.___syscall6;
        var ma = env._sbrk;
        var na = env._time;
        var oa = env._pthread_cleanup_push;
        var pa = env._emscripten_memcpy_big;
        var qa = env.___syscall54;
        var ra = env.___syscall140;
        var sa = env._sysconf;
        var ta = env.___syscall146;
        var ua = 0;

        function ya(a) {
            a = a | 0;
            var b = 0;
            b = i;
            i = i + a | 0;
            i = i + 15 & -16;
            return b | 0
        }

        function za() {
            return i | 0
        }

        function Aa(a) {
            a = a | 0;
            i = a
        }

        function Ba(a, b) {
            a = a | 0;
            b = b | 0;
            i = a;
            j = b
        }

        function Ca(a, b) {
            a = a | 0;
            b = b | 0;
            if (!n) {
                n = a;
                o = b
            }
        }

        function Da(b) {
            b = b | 0;
            a[k >> 0] = a[b >> 0];
            a[k + 1 >> 0] = a[b + 1 >> 0];
            a[k + 2 >> 0] = a[b + 2 >> 0];
            a[k + 3 >> 0] = a[b + 3 >> 0]
        }

        function Ea(b) {
            b = b | 0;
            a[k >> 0] = a[b >> 0];
            a[k + 1 >> 0] = a[b + 1 >> 0];
            a[k + 2 >> 0] = a[b + 2 >> 0];
            a[k + 3 >> 0] = a[b + 3 >> 0];
            a[k + 4 >> 0] = a[b + 4 >> 0];
            a[k + 5 >> 0] = a[b + 5 >> 0];
            a[k + 6 >> 0] = a[b + 6 >> 0];
            a[k + 7 >> 0] = a[b + 7 >> 0]
        }

        function Fa(a) {
            a = a | 0;
            C = a
        }

        function Ga() {
            return C | 0
        }

        function Ha(a, b) {
            a = a | 0;
            b = b | 0;
            var c = 0
                , d = 0
                , f = 0
                , g = 0
                , h = 0
                , i = 0;
            h = b & 3;
            g = b - h | 0;
            if ((h | 0) == (b | 0)) {
                f = 31;
                d = 0
            } else {
                c = 31;
                f = 0;
                while (1) {
                    d = f + 4 | 0;
                    f = (_(((e[a + ((f | 2) << 1) >> 1] | 0) << 16 & 16711680 | (e[a + ((f | 3) << 1) >> 1] | 0) << 24) >>> 16, 760283136) | 0) + (_((e[a + ((f | 1) << 1) >> 1] | 0) << 8 & 65280 | (e[a + (f << 1) >> 1] | 0) & 255, -862048943) | 0) | 0;
                    c = (_(f << 15 & 32768 | f >>> 17, 461845907) | 0) + (_(f >>> 1 & 65535, 898826240) | 0) ^ c;
                    c = ((c << 13 & 57344 | c >>> 19) * 5 | 0) + ((c >>> 3 & 65535) * 327680 | 0) | 0;
                    c = (c & 65535) + 27492 + (c + -430702592 & -65536) | 0;
                    if (d >>> 0 < g >>> 0)
                        f = d;
                    else {
                        f = c;
                        break
                    }
                }
            }
            switch (h | 0) {
                case 3:
                    c = (e[a + ((d | 2) << 1) >> 1] | 0) << 16 & 16711680;
                    i = 5;
                    break;
                case 2:
                    c = 0;
                    i = 5;
                    break;
                case 1:
                    c = 0;
                    break;
                default:
                    i = f;
                    b = i ^ b;
                    i = b >>> 16;
                    b = b & 65535;
                    b = b ^ i;
                    b = _(b, -2048144789) | 0;
                    i = _(i, -898957312) | 0;
                    i = b + i | 0;
                    b = i >>> 13;
                    i = b ^ i;
                    b = i & 65535;
                    i = i >>> 16;
                    b = _(b, -1028477387) | 0;
                    i = _(i, -1372258304) | 0;
                    i = b + i | 0;
                    b = i >>> 16;
                    i = b ^ i;
                    return i | 0
            }
            if ((i | 0) == 5)
                c = (e[a + ((d | 1) << 1) >> 1] | 0) << 8 & 65280 | c;
            i = (_(c >>> 16, 760283136) | 0) + (_((e[a + (d << 1) >> 1] | 0) & 255 ^ c & 65535, -862048943) | 0) | 0;
            i = (_(i << 15 & 32768 | i >>> 17, 461845907) | 0) + (_(i >>> 1 & 65535, 898826240) | 0) ^ f;
            b = i ^ b;
            i = b >>> 16;
            b = b & 65535;
            b = b ^ i;
            b = _(b, -2048144789) | 0;
            i = _(i, -898957312) | 0;
            i = b + i | 0;
            b = i >>> 13;
            i = b ^ i;
            b = i & 65535;
            i = i >>> 16;
            b = _(b, -1028477387) | 0;
            i = _(i, -1372258304) | 0;
            i = b + i | 0;
            b = i >>> 16;
            i = b ^ i;
            return i | 0
        }

        function Ia(c) {
            c = c | 0;
            var e = 0
                , f = 0
                , g = 0
                , h = 0
                , i = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0;
            k = mb(c) | 0;
            e = k << 1;
            m = tb(e) | 0;
            xb(m | 0, 0, e | 0) | 0;
            if (!k) {
                c = m;
                l = m;
                l = c - l | 0;
                l = l >> 1;
                l = Ha(m, l) | 0;
                ub(m);
                return l | 0
            } else {
                j = 0;
                i = e;
                e = m;
                f = 0
            }
            while (1) {
                h = a[c + j >> 0] | 0;
                g = h & 255;
                if (!(g & 128)) {
                    g = i;
                    h = h & 255
                } else {
                    do
                        if (g & 32) {
                            if (!(g & 16)) {
                                i = 2;
                                f = g & 15;
                                l = 14;
                                break
                            }
                            if (!(g & 8)) {
                                i = 3;
                                f = g & 7;
                                l = 14;
                                break
                            }
                            if (!(g & 4)) {
                                i = 4;
                                f = g & 3;
                                l = 14;
                                break
                            }
                            if (g & 2)
                                if (!i) {
                                    g = 0;
                                    break
                                } else {
                                    l = 14;
                                    break
                                }
                            else {
                                i = 5;
                                f = g & 1;
                                l = 14;
                                break
                            }
                        } else {
                            i = 1;
                            f = g & 31;
                            l = 14
                        }
                    while (0);
                    if ((l | 0) == 14) {
                        l = 0;
                        g = j;
                        h = 0;
                        do {
                            g = g + 1 | 0;
                            f = ((d[c + g >> 0] | 0) & 63 | (f & 65535) << 6) & 65535;
                            h = h + 1 | 0
                        } while ((h | 0) != (i | 0));
                        g = i
                    }
                    j = g + j | 0;
                    h = f
                }
                b[e >> 1] = h;
                e = e + 2 | 0;
                j = j + 1 | 0;
                if (j >>> 0 >= k >>> 0)
                    break;
                else
                    i = g
            }
            c = e;
            l = m;
            l = c - l | 0;
            l = l >> 1;
            l = Ha(m, l) | 0;
            ub(m);
            return l | 0
        }

        function Ja(b) {
            b = b | 0;
            var c = 0
                , d = 0
                , e = 0;
            c = 1862;
            d = c + 16 | 0;
            do {
                a[c >> 0] = 0;
                c = c + 1 | 0
            } while ((c | 0) < (d | 0));
            e = 15;
            while (1) {
                c = e + -1 | 0;
                d = 1862 + c | 0;
                a[d >> 0] = a[1804 + ((b >>> 0) % 36 | 0) >> 0] | 0;
                if (b >>> 0 > 35 & (c | 0) != 0) {
                    b = (b >>> 0) / 36 | 0;
                    e = c
                } else
                    break
            }
            return ((e | 0) < 2 ? 0 : d) | 0
        }

        function Ka() {
            var a = 0
                , b = 0
                , d = 0
                , e = 0
                , f = 0;
            f = i;
            i = i + 32 | 0;
            e = f + 24 | 0;
            d = f + 16 | 0;
            a = f + 8 | 0;
            b = f;
            xb(3214, 0, 1E3) | 0;
            c[b >> 2] = ha(1878) | 0;
            b = ab(3214, 999, 11423, b) | 0;
            if ((b | 0) < 0) {
                e = 0;
                i = f;
                return e | 0
            }
            c[a >> 2] = ha(2636) | 0;
            a = ab(3214 + b | 0, 999 - b | 0, 11423, a) | 0;
            if ((a | 0) < 0) {
                e = 0;
                i = f;
                return e | 0
            }
            b = a + b | 0;
            c[d >> 2] = ha(2726) | 0;
            a = ab(3214 + b | 0, 999 - b | 0, 11423, d) | 0;
            if ((a | 0) < 0) {
                e = 0;
                i = f;
                return e | 0
            }
            d = a + b | 0;
            c[e >> 2] = ha(3067) | 0;
            e = (ab(3214 + d | 0, 999 - d | 0, 11423, e) | 0) < 0;
            e = e ? 0 : 3214;
            i = f;
            return e | 0
        }

        function La() {
            var b = 0
                , d = 0
                , e = 0
                , f = 0
                , g = 0
                , h = 0;
            h = i;
            i = i + 32 | 0;
            g = h + 16 | 0;
            f = h + 8 | 0;
            b = h;
            d = 9385;
            e = d + 64 | 0;
            do {
                a[d >> 0] = 0;
                d = d + 1 | 0
            } while ((d | 0) < (e | 0));
            c[b >> 2] = Ja(Ia(Ka() | 0) | 0) | 0;
            d = ab(9385, 63, 11423, b) | 0;
            if ((d | 0) < 0) {
                g = 0;
                i = h;
                return g | 0
            }
            c[f >> 2] = Ja(Ia(ha(4214) | 0) | 0) | 0;
            b = ab(9385 + d | 0, 63 - d | 0, 9449, f) | 0;
            if ((b | 0) < 0) {
                g = 0;
                i = h;
                return g | 0
            }
            f = b + d | 0;
            c[g >> 2] = Ja(Ia(ha(7081) | 0) | 0) | 0;
            ab(9385 + f | 0, 63 - f | 0, 9449, g) | 0;
            g = 9385;
            i = h;
            return g | 0
        }

        function Ma(b) {
            b = b | 0;
            a[9523] = a[9453 + (b & 63) >> 0] | 0;
            a[9522] = a[9453 + (b >>> 6 & 63) >> 0] | 0;
            a[9521] = a[9453 + (b >>> 12 & 63) >> 0] | 0;
            a[9520] = a[9453 + (b >>> 18 & 63) >> 0] | 0;
            a[9519] = a[9453 + (b >>> 24 & 63) >> 0] | 0;
            a[9518] = a[9453 + (b >>> 30) >> 0] | 0;
            return
        }

        function Na() {
            var a = 0
                , b = 0
                , d = 0;
            a = 0;
            do {
                d = a >>> 1;
                d = (a & 1 | 0) == 0 ? d : d ^ -306674912;
                b = d >>> 1;
                b = (d & 1 | 0) == 0 ? b : b ^ -306674912;
                d = b >>> 1;
                d = (b & 1 | 0) == 0 ? d : d ^ -306674912;
                b = d >>> 1;
                b = (d & 1 | 0) == 0 ? b : b ^ -306674912;
                d = b >>> 1;
                d = (b & 1 | 0) == 0 ? d : d ^ -306674912;
                b = d >>> 1;
                b = (d & 1 | 0) == 0 ? b : b ^ -306674912;
                d = b >>> 1;
                d = (b & 1 | 0) == 0 ? d : d ^ -306674912;
                b = d >>> 1;
                c[12 + (a << 2) >> 2] = (d & 1 | 0) == 0 ? b : b ^ -306674912;
                a = a + 1 | 0
            } while ((a | 0) != 256);
            c[2] = 1;
            return
        }

        function Oa(a, b) {
            a = a | 0;
            b = b | 0;
            var e = 0
                , f = 0;
            if (!(c[2] | 0))
                Na();
            if ((b | 0) > 0) {
                e = -1;
                f = 0
            } else {
                f = 0;
                return f | 0
            }
            do {
                e = c[12 + (((d[a + f >> 0] | 0) ^ e & 255) << 2) >> 2] ^ e >>> 8;
                f = f + 1 | 0
            } while ((f | 0) != (b | 0));
            f = ~e;
            return f | 0
        }

        function Pa(a, b) {
            a = a | 0;
            b = b | 0;
            Ma(Oa(a, b) | 0);
            return
        }

        function Qa(b) {
            b = b | 0;
            var c = 0
                , d = 0
                , e = 0
                , f = 0;
            d = mb(b) | 0;
            f = d + 1 | 0;
            e = tb(f) | 0;
            xb(e | 0, 0, f | 0) | 0;
            if ((d | 0) > 0) {
                f = 0;
                c = 0
            } else
                return e | 0;
            while (1) {
                c = c - ((c | 0) == 20 ? 20 : 0) | 0;
                a[e + f >> 0] = (((a[b + f >> 0] | 0) + -66 + (a[1841 + c >> 0] | 0) | 0) % 94 | 0) + 33;
                f = f + 1 | 0;
                if ((f | 0) == (d | 0))
                    break;
                else
                    c = c + 1 | 0
            }
            return e | 0
        }

        function Ra(a) {
            a = a | 0;
            var b = 0
                , c = 0
                , d = 0;
            c = mb(a) | 0;
            d = c + 8 | 0;
            b = tb(d) | 0;
            xb(b | 0, 0, d | 0) | 0;
            Pa(a, c);
            kb(b, 9518) | 0;
            lb(b, a);
            return Qa(b) | 0
        }

        function Sa(a) {
            a = a | 0;
            var b = 0
                , c = 0
                , d = 0;
            $a();
            c = La() | 0;
            d = mb(c) | 0;
            d = d + 1 + (mb(a) | 0) | 0;
            b = tb(d) | 0;
            xb(b | 0, 0, d | 0) | 0;
            kb(b, a) | 0;
            lb(b, c);
            a = Ra(b) | 0;
            ub(b);
            return a | 0
        }

        function Ta(b) {
            b = b | 0;
            var c = 0
                , e = 0;
            c = 0;
            while (1) {
                if ((d[9531 + c >> 0] | 0) == (b | 0)) {
                    e = 2;
                    break
                }
                c = c + 1 | 0;
                if ((c | 0) == 87) {
                    c = 87;
                    b = 9619;
                    e = 5;
                    break
                }
            }
            if ((e | 0) == 2)
                if (!c)
                    c = 9619;
                else {
                    b = 9619;
                    e = 5
                }
            if ((e | 0) == 5)
                while (1) {
                    do {
                        e = b;
                        b = b + 1 | 0
                    } while ((a[e >> 0] | 0) != 0);
                    c = c + -1 | 0;
                    if (!c) {
                        c = b;
                        break
                    } else
                        e = 5
                }
            return c | 0
        }

        function Ua() {
            var a = 0;
            if (!(c[259] | 0))
                a = 1080;
            else
                a = c[(ia() | 0) + 60 >> 2] | 0;
            return a | 0
        }

        function Va(a) {
            a = a | 0;
            if (a >>> 0 > 4294963200) {
                c[(Ua() | 0) >> 2] = 0 - a;
                a = -1
            }
            return a | 0
        }

        function Wa(a, b) {
            a = +a;
            b = b | 0;
            var d = 0
                , e = 0
                , f = 0;
            h[k >> 3] = a;
            d = c[k >> 2] | 0;
            e = c[k + 4 >> 2] | 0;
            f = wb(d | 0, e | 0, 52) | 0;
            f = f & 2047;
            switch (f | 0) {
                case 0:
                    if (a != 0) {
                        a = +Wa(a * 1.8446744073709552E19, b);
                        d = (c[b >> 2] | 0) + -64 | 0
                    } else
                        d = 0;
                    c[b >> 2] = d;
                    break;
                case 2047:
                    break;
                default:
                    c[b >> 2] = f + -1022;
                    c[k >> 2] = d;
                    c[k + 4 >> 2] = e & -2146435073 | 1071644672;
                    a = +h[k >> 3]
            }
            return +a
        }

        function Xa(b, d) {
            b = b | 0;
            d = d | 0;
            do
                if (b) {
                    if (d >>> 0 < 128) {
                        a[b >> 0] = d;
                        b = 1;
                        break
                    }
                    if (d >>> 0 < 2048) {
                        a[b >> 0] = d >>> 6 | 192;
                        a[b + 1 >> 0] = d & 63 | 128;
                        b = 2;
                        break
                    }
                    if (d >>> 0 < 55296 | (d & -8192 | 0) == 57344) {
                        a[b >> 0] = d >>> 12 | 224;
                        a[b + 1 >> 0] = d >>> 6 & 63 | 128;
                        a[b + 2 >> 0] = d & 63 | 128;
                        b = 3;
                        break
                    }
                    if ((d + -65536 | 0) >>> 0 < 1048576) {
                        a[b >> 0] = d >>> 18 | 240;
                        a[b + 1 >> 0] = d >>> 12 & 63 | 128;
                        a[b + 2 >> 0] = d >>> 6 & 63 | 128;
                        a[b + 3 >> 0] = d & 63 | 128;
                        b = 4;
                        break
                    } else {
                        c[(Ua() | 0) >> 2] = 84;
                        b = -1;
                        break
                    }
                } else
                    b = 1;
            while (0);
            return b | 0
        }

        function Ya(a, b) {
            a = a | 0;
            b = b | 0;
            return (_a(a, mb(a) | 0, 1, b) | 0) + -1 | 0
        }

        function Za(b, d, e) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0
                , h = 0
                , i = 0;
            f = e + 16 | 0;
            g = c[f >> 2] | 0;
            if (!g)
                if (!(ib(e) | 0)) {
                    g = c[f >> 2] | 0;
                    h = 4
                } else
                    f = 0;
            else
                h = 4;
            a: do
                if ((h | 0) == 4) {
                    i = e + 20 | 0;
                    h = c[i >> 2] | 0;
                    if ((g - h | 0) >>> 0 < d >>> 0) {
                        f = wa[c[e + 36 >> 2] & 7](e, b, d) | 0;
                        break
                    }
                    b: do
                        if ((a[e + 75 >> 0] | 0) > -1) {
                            f = d;
                            while (1) {
                                if (!f) {
                                    g = h;
                                    f = 0;
                                    break b
                                }
                                g = f + -1 | 0;
                                if ((a[b + g >> 0] | 0) == 10)
                                    break;
                                else
                                    f = g
                            }
                            if ((wa[c[e + 36 >> 2] & 7](e, b, f) | 0) >>> 0 < f >>> 0)
                                break a;
                            d = d - f | 0;
                            b = b + f | 0;
                            g = c[i >> 2] | 0
                        } else {
                            g = h;
                            f = 0
                        }
                    while (0);
                    Bb(g | 0, b | 0, d | 0) | 0;
                    c[i >> 2] = (c[i >> 2] | 0) + d;
                    f = f + d | 0
                }
            while (0);
            return f | 0
        }

        function _a(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            var e = 0;
            e = _(c, b) | 0;
            d = Za(a, e, d) | 0;
            if ((d | 0) != (e | 0))
                c = (d >>> 0) / (b >>> 0) | 0;
            return c | 0
        }

        function $a() {
            var b = 0;
            do
                if ((Ya(9525, 1196) | 0) >= 0) {
                    if ((a[1271] | 0) != 10 ? (b = c[304] | 0,
                    b >>> 0 < (c[303] | 0) >>> 0) : 0) {
                        c[304] = b + 1;
                        a[b >> 0] = 10;
                        break
                    }
                    db(1196, 10) | 0
                }
            while (0);
            return
        }

        function ab(a, b, d, e) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0;
            f = i;
            i = i + 16 | 0;
            g = f;
            c[g >> 2] = e;
            e = cb(a, b, d, g) | 0;
            i = f;
            return e | 0
        }

        function bb(b, d, e) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0
                , h = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0
                , n = 0
                , o = 0
                , p = 0
                , q = 0
                , r = 0;
            r = i;
            i = i + 224 | 0;
            n = r + 120 | 0;
            q = r + 80 | 0;
            p = r;
            o = r + 136 | 0;
            f = q;
            g = f + 40 | 0;
            do {
                c[f >> 2] = 0;
                f = f + 4 | 0
            } while ((f | 0) < (g | 0));
            c[n >> 2] = c[e >> 2];
            if ((nb(0, d, n, p, q) | 0) < 0)
                e = -1;
            else {
                e = c[b >> 2] | 0;
                m = e & 32;
                if ((a[b + 74 >> 0] | 0) < 1)
                    c[b >> 2] = e & -33;
                l = b + 48 | 0;
                if (!(c[l >> 2] | 0)) {
                    f = b + 44 | 0;
                    g = c[f >> 2] | 0;
                    c[f >> 2] = o;
                    h = b + 28 | 0;
                    c[h >> 2] = o;
                    j = b + 20 | 0;
                    c[j >> 2] = o;
                    c[l >> 2] = 80;
                    k = b + 16 | 0;
                    c[k >> 2] = o + 80;
                    e = nb(b, d, n, p, q) | 0;
                    if (g) {
                        wa[c[b + 36 >> 2] & 7](b, 0, 0) | 0;
                        e = (c[j >> 2] | 0) == 0 ? -1 : e;
                        c[f >> 2] = g;
                        c[l >> 2] = 0;
                        c[k >> 2] = 0;
                        c[h >> 2] = 0;
                        c[j >> 2] = 0
                    }
                } else
                    e = nb(b, d, n, p, q) | 0;
                q = c[b >> 2] | 0;
                c[b >> 2] = q | m;
                e = (q & 32 | 0) == 0 ? e : -1
            }
            i = r;
            return e | 0
        }

        function cb(b, d, e, f) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            f = f | 0;
            var g = 0
                , h = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0
                , n = 0;
            n = i;
            i = i + 128 | 0;
            g = n + 112 | 0;
            m = n;
            h = m;
            j = 1084;
            k = h + 112 | 0;
            do {
                c[h >> 2] = c[j >> 2];
                h = h + 4 | 0;
                j = j + 4 | 0
            } while ((h | 0) < (k | 0));
            if ((d + -1 | 0) >>> 0 > 2147483646)
                if (!d) {
                    d = 1;
                    l = 4
                } else {
                    c[(Ua() | 0) >> 2] = 75;
                    d = -1
                }
            else {
                g = b;
                l = 4
            }
            if ((l | 0) == 4) {
                l = -2 - g | 0;
                l = d >>> 0 > l >>> 0 ? l : d;
                c[m + 48 >> 2] = l;
                b = m + 20 | 0;
                c[b >> 2] = g;
                c[m + 44 >> 2] = g;
                d = g + l | 0;
                g = m + 16 | 0;
                c[g >> 2] = d;
                c[m + 28 >> 2] = d;
                d = bb(m, e, f) | 0;
                if (l) {
                    e = c[b >> 2] | 0;
                    a[e + (((e | 0) == (c[g >> 2] | 0)) << 31 >> 31) >> 0] = 0
                }
            }
            i = n;
            return d | 0
        }

        function db(b, e) {
            b = b | 0;
            e = e | 0;
            var f = 0
                , g = 0
                , h = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0;
            m = i;
            i = i + 16 | 0;
            l = m;
            k = e & 255;
            a[l >> 0] = k;
            g = b + 16 | 0;
            h = c[g >> 2] | 0;
            if (!h)
                if (!(ib(b) | 0)) {
                    h = c[g >> 2] | 0;
                    j = 4
                } else
                    f = -1;
            else
                j = 4;
            do
                if ((j | 0) == 4) {
                    g = b + 20 | 0;
                    j = c[g >> 2] | 0;
                    if (j >>> 0 < h >>> 0 ? (f = e & 255,
                    (f | 0) != (a[b + 75 >> 0] | 0)) : 0) {
                        c[g >> 2] = j + 1;
                        a[j >> 0] = k;
                        break
                    }
                    if ((wa[c[b + 36 >> 2] & 7](b, l, 1) | 0) == 1)
                        f = d[l >> 0] | 0;
                    else
                        f = -1
                }
            while (0);
            i = m;
            return f | 0
        }

        function eb(a) {
            a = a | 0;
            var b = 0
                , d = 0;
            b = i;
            i = i + 16 | 0;
            d = b;
            c[d >> 2] = c[a + 60 >> 2];
            a = Va(la(6, d | 0) | 0) | 0;
            i = b;
            return a | 0
        }

        function fb(a, b, d) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            var e = 0
                , f = 0
                , g = 0;
            f = i;
            i = i + 32 | 0;
            g = f;
            e = f + 20 | 0;
            c[g >> 2] = c[a + 60 >> 2];
            c[g + 4 >> 2] = 0;
            c[g + 8 >> 2] = b;
            c[g + 12 >> 2] = e;
            c[g + 16 >> 2] = d;
            if ((Va(ra(140, g | 0) | 0) | 0) < 0) {
                c[e >> 2] = -1;
                a = -1
            } else
                a = c[e >> 2] | 0;
            i = f;
            return a | 0
        }

        function gb(a, b, d) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            var e = 0
                , f = 0
                , g = 0
                , h = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0
                , n = 0
                , o = 0
                , p = 0
                , q = 0;
            q = i;
            i = i + 48 | 0;
            n = q + 16 | 0;
            m = q;
            k = q + 32 | 0;
            o = a + 28 | 0;
            h = c[o >> 2] | 0;
            c[k >> 2] = h;
            p = a + 20 | 0;
            h = (c[p >> 2] | 0) - h | 0;
            c[k + 4 >> 2] = h;
            c[k + 8 >> 2] = b;
            c[k + 12 >> 2] = d;
            j = a + 60 | 0;
            l = a + 44 | 0;
            f = 2;
            b = h + d | 0;
            while (1) {
                if (!(c[259] | 0)) {
                    c[n >> 2] = c[j >> 2];
                    c[n + 4 >> 2] = k;
                    c[n + 8 >> 2] = f;
                    g = Va(ta(146, n | 0) | 0) | 0
                } else {
                    oa(1, a | 0);
                    c[m >> 2] = c[j >> 2];
                    c[m + 4 >> 2] = k;
                    c[m + 8 >> 2] = f;
                    g = Va(ta(146, m | 0) | 0) | 0;
                    ga(0)
                }
                if ((b | 0) == (g | 0)) {
                    b = 6;
                    break
                }
                if ((g | 0) < 0) {
                    b = 8;
                    break
                }
                b = b - g | 0;
                e = c[k + 4 >> 2] | 0;
                if (g >>> 0 <= e >>> 0)
                    if ((f | 0) == 2) {
                        c[o >> 2] = (c[o >> 2] | 0) + g;
                        h = e;
                        e = k;
                        f = 2
                    } else {
                        h = e;
                        e = k
                    }
                else {
                    h = c[l >> 2] | 0;
                    c[o >> 2] = h;
                    c[p >> 2] = h;
                    h = c[k + 12 >> 2] | 0;
                    g = g - e | 0;
                    e = k + 8 | 0;
                    f = f + -1 | 0
                }
                c[e >> 2] = (c[e >> 2] | 0) + g;
                c[e + 4 >> 2] = h - g;
                k = e
            }
            if ((b | 0) == 6) {
                n = c[l >> 2] | 0;
                c[a + 16 >> 2] = n + (c[a + 48 >> 2] | 0);
                a = n;
                c[o >> 2] = a;
                c[p >> 2] = a
            } else if ((b | 0) == 8) {
                c[a + 16 >> 2] = 0;
                c[o >> 2] = 0;
                c[p >> 2] = 0;
                c[a >> 2] = c[a >> 2] | 32;
                if ((f | 0) == 2)
                    d = 0;
                else
                    d = d - (c[k + 4 >> 2] | 0) | 0
            }
            i = q;
            return d | 0
        }

        function hb(b, d, e) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0;
            g = i;
            i = i + 80 | 0;
            f = g;
            c[b + 36 >> 2] = 4;
            if ((c[b >> 2] & 64 | 0) == 0 ? (c[f >> 2] = c[b + 60 >> 2],
                c[f + 4 >> 2] = 21505,
                c[f + 8 >> 2] = g + 12,
            (qa(54, f | 0) | 0) != 0) : 0)
                a[b + 75 >> 0] = -1;
            f = gb(b, d, e) | 0;
            i = g;
            return f | 0
        }

        function ib(b) {
            b = b | 0;
            var d = 0
                , e = 0;
            d = b + 74 | 0;
            e = a[d >> 0] | 0;
            a[d >> 0] = e + 255 | e;
            d = c[b >> 2] | 0;
            if (!(d & 8)) {
                c[b + 8 >> 2] = 0;
                c[b + 4 >> 2] = 0;
                d = c[b + 44 >> 2] | 0;
                c[b + 28 >> 2] = d;
                c[b + 20 >> 2] = d;
                c[b + 16 >> 2] = d + (c[b + 48 >> 2] | 0);
                d = 0
            } else {
                c[b >> 2] = d | 32;
                d = -1
            }
            return d | 0
        }

        function jb(b, d, e) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0
                , h = 0
                , i = 0;
            h = d & 255;
            f = (e | 0) != 0;
            a: do
                if (f & (b & 3 | 0) != 0) {
                    g = d & 255;
                    while (1) {
                        if ((a[b >> 0] | 0) == g << 24 >> 24)
                            break a;
                        b = b + 1 | 0;
                        e = e + -1 | 0;
                        f = (e | 0) != 0;
                        if (!(f & (b & 3 | 0) != 0)) {
                            i = 5;
                            break
                        }
                    }
                } else
                    i = 5;
            while (0);
            b: do
                if ((i | 0) == 5)
                    if (f) {
                        g = d & 255;
                        if ((a[b >> 0] | 0) != g << 24 >> 24) {
                            f = _(h, 16843009) | 0;
                            c: do
                                if (e >>> 0 > 3)
                                    while (1) {
                                        h = c[b >> 2] ^ f;
                                        if ((h & -2139062144 ^ -2139062144) & h + -16843009)
                                            break;
                                        b = b + 4 | 0;
                                        e = e + -4 | 0;
                                        if (e >>> 0 <= 3) {
                                            i = 11;
                                            break c
                                        }
                                    }
                                else
                                    i = 11;
                            while (0);
                            if ((i | 0) == 11)
                                if (!e) {
                                    e = 0;
                                    break
                                }
                            while (1) {
                                if ((a[b >> 0] | 0) == g << 24 >> 24)
                                    break b;
                                b = b + 1 | 0;
                                e = e + -1 | 0;
                                if (!e) {
                                    e = 0;
                                    break
                                }
                            }
                        }
                    } else
                        e = 0;
            while (0);
            return ((e | 0) != 0 ? b : 0) | 0
        }

        function kb(b, d) {
            b = b | 0;
            d = d | 0;
            var e = 0
                , f = 0;
            e = d;
            a: do
                if (!((e ^ b) & 3)) {
                    if (e & 3) {
                        do {
                            e = a[d >> 0] | 0;
                            a[b >> 0] = e;
                            if (!(e << 24 >> 24))
                                break a;
                            d = d + 1 | 0;
                            b = b + 1 | 0
                        } while ((d & 3 | 0) != 0)
                    }
                    e = c[d >> 2] | 0;
                    if (!((e & -2139062144 ^ -2139062144) & e + -16843009)) {
                        f = b;
                        while (1) {
                            d = d + 4 | 0;
                            b = f + 4 | 0;
                            c[f >> 2] = e;
                            e = c[d >> 2] | 0;
                            if ((e & -2139062144 ^ -2139062144) & e + -16843009)
                                break;
                            else
                                f = b
                        }
                    }
                    f = 8
                } else
                    f = 8;
            while (0);
            if ((f | 0) == 8) {
                f = a[d >> 0] | 0;
                a[b >> 0] = f;
                if (f << 24 >> 24) {
                    do {
                        d = d + 1 | 0;
                        b = b + 1 | 0;
                        f = a[d >> 0] | 0;
                        a[b >> 0] = f
                    } while (f << 24 >> 24 != 0)
                }
            }
            return b | 0
        }

        function lb(a, b) {
            a = a | 0;
            b = b | 0;
            kb(a + (mb(a) | 0) | 0, b) | 0;
            return
        }

        function mb(b) {
            b = b | 0;
            var d = 0
                , e = 0
                , f = 0;
            f = b;
            a: do
                if (!(f & 3))
                    e = 4;
                else {
                    d = b;
                    b = f;
                    while (1) {
                        if (!(a[d >> 0] | 0))
                            break a;
                        d = d + 1 | 0;
                        b = d;
                        if (!(b & 3)) {
                            b = d;
                            e = 4;
                            break
                        }
                    }
                }
            while (0);
            if ((e | 0) == 4) {
                while (1) {
                    d = c[b >> 2] | 0;
                    if (!((d & -2139062144 ^ -2139062144) & d + -16843009))
                        b = b + 4 | 0;
                    else
                        break
                }
                if ((d & 255) << 24 >> 24) {
                    do
                        b = b + 1 | 0;
                    while ((a[b >> 0] | 0) != 0)
                }
            }
            return b - f | 0
        }

        function nb(e, f, g, j, l) {
            e = e | 0;
            f = f | 0;
            g = g | 0;
            j = j | 0;
            l = l | 0;
            var m = 0
                , n = 0
                , o = 0
                , p = 0
                , q = 0
                , r = 0
                , s = 0
                , t = 0
                , u = 0
                , v = 0
                , w = 0
                , x = 0
                , y = 0
                , z = 0
                , A = 0
                , B = 0
                , D = 0
                , E = 0
                , F = 0
                , G = 0
                , H = 0
                , I = 0
                , J = 0
                , K = 0
                , L = 0
                , M = 0
                , N = 0
                , O = 0
                , P = 0
                , Q = 0
                , R = 0
                , S = 0
                , T = 0
                , U = 0
                , V = 0
                , W = 0
                , X = 0
                , Y = 0
                , Z = 0
                , $ = 0
                , aa = 0
                , ba = 0
                , ca = 0
                , da = 0
                , ea = 0
                , fa = 0
                , ga = 0
                , ha = 0;
            ha = i;
            i = i + 624 | 0;
            ca = ha + 24 | 0;
            ea = ha + 16 | 0;
            da = ha + 588 | 0;
            Y = ha + 576 | 0;
            ba = ha;
            V = ha + 536 | 0;
            ga = ha + 8 | 0;
            fa = ha + 528 | 0;
            M = (e | 0) != 0;
            N = V + 40 | 0;
            U = N;
            V = V + 39 | 0;
            W = ga + 4 | 0;
            X = Y + 12 | 0;
            Y = Y + 11 | 0;
            Z = da;
            $ = X;
            aa = $ - Z | 0;
            O = -2 - Z | 0;
            P = $ + 2 | 0;
            Q = ca + 288 | 0;
            R = da + 9 | 0;
            S = R;
            T = da + 8 | 0;
            m = 0;
            n = 0;
            s = 0;
            a: while (1) {
                do
                    if ((m | 0) > -1)
                        if ((n | 0) > (2147483647 - m | 0)) {
                            c[(Ua() | 0) >> 2] = 75;
                            m = -1;
                            break
                        } else {
                            m = n + m | 0;
                            break
                        }
                while (0);
                n = a[f >> 0] | 0;
                if (!(n << 24 >> 24)) {
                    L = 245;
                    break
                } else
                    o = f;
                b: while (1) {
                    switch (n << 24 >> 24) {
                        case 37:
                            n = o;
                            L = 9;
                            break b;
                        case 0:
                            n = o;
                            break b;
                        default:
                    }
                    K = o + 1 | 0;
                    n = a[K >> 0] | 0;
                    o = K
                }
                c: do
                    if ((L | 0) == 9)
                        while (1) {
                            L = 0;
                            if ((a[n + 1 >> 0] | 0) != 37)
                                break c;
                            o = o + 1 | 0;
                            n = n + 2 | 0;
                            if ((a[n >> 0] | 0) == 37)
                                L = 9;
                            else
                                break
                        }
                while (0);
                y = o - f | 0;
                if (M ? (c[e >> 2] & 32 | 0) == 0 : 0)
                    Za(f, y, e) | 0;
                if ((o | 0) != (f | 0)) {
                    f = n;
                    n = y;
                    continue
                }
                r = n + 1 | 0;
                o = a[r >> 0] | 0;
                q = (o << 24 >> 24) + -48 | 0;
                if (q >>> 0 < 10) {
                    K = (a[n + 2 >> 0] | 0) == 36;
                    r = K ? n + 3 | 0 : r;
                    o = a[r >> 0] | 0;
                    u = K ? q : -1;
                    s = K ? 1 : s
                } else
                    u = -1;
                n = o << 24 >> 24;
                d: do
                    if ((n & -32 | 0) == 32) {
                        q = 0;
                        while (1) {
                            if (!(1 << n + -32 & 75913)) {
                                t = q;
                                break d
                            }
                            q = 1 << (o << 24 >> 24) + -32 | q;
                            r = r + 1 | 0;
                            o = a[r >> 0] | 0;
                            n = o << 24 >> 24;
                            if ((n & -32 | 0) != 32) {
                                t = q;
                                break
                            }
                        }
                    } else
                        t = 0;
                while (0);
                do
                    if (o << 24 >> 24 == 42) {
                        o = r + 1 | 0;
                        n = (a[o >> 0] | 0) + -48 | 0;
                        if (n >>> 0 < 10 ? (a[r + 2 >> 0] | 0) == 36 : 0) {
                            c[l + (n << 2) >> 2] = 10;
                            s = 1;
                            n = r + 3 | 0;
                            q = c[j + ((a[o >> 0] | 0) + -48 << 3) >> 2] | 0
                        } else {
                            if (s) {
                                m = -1;
                                break a
                            }
                            if (!M) {
                                w = t;
                                s = 0;
                                K = 0;
                                break
                            }
                            s = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
                            q = c[s >> 2] | 0;
                            c[g >> 2] = s + 4;
                            s = 0;
                            n = o
                        }
                        if ((q | 0) < 0) {
                            w = t | 8192;
                            o = n;
                            K = 0 - q | 0
                        } else {
                            w = t;
                            o = n;
                            K = q
                        }
                    } else {
                        n = (o << 24 >> 24) + -48 | 0;
                        if (n >>> 0 < 10) {
                            o = r;
                            q = 0;
                            do {
                                q = (q * 10 | 0) + n | 0;
                                o = o + 1 | 0;
                                n = (a[o >> 0] | 0) + -48 | 0
                            } while (n >>> 0 < 10);
                            if ((q | 0) < 0) {
                                m = -1;
                                break a
                            } else {
                                w = t;
                                K = q
                            }
                        } else {
                            w = t;
                            o = r;
                            K = 0
                        }
                    }
                while (0);
                e: do
                    if ((a[o >> 0] | 0) == 46) {
                        q = o + 1 | 0;
                        n = a[q >> 0] | 0;
                        if (n << 24 >> 24 != 42) {
                            r = (n << 24 >> 24) + -48 | 0;
                            if (r >>> 0 < 10) {
                                n = q;
                                o = 0
                            } else {
                                n = q;
                                r = 0;
                                break
                            }
                            while (1) {
                                o = (o * 10 | 0) + r | 0;
                                n = n + 1 | 0;
                                r = (a[n >> 0] | 0) + -48 | 0;
                                if (r >>> 0 >= 10) {
                                    r = o;
                                    break e
                                }
                            }
                        }
                        q = o + 2 | 0;
                        n = (a[q >> 0] | 0) + -48 | 0;
                        if (n >>> 0 < 10 ? (a[o + 3 >> 0] | 0) == 36 : 0) {
                            c[l + (n << 2) >> 2] = 10;
                            n = o + 4 | 0;
                            r = c[j + ((a[q >> 0] | 0) + -48 << 3) >> 2] | 0;
                            break
                        }
                        if (s) {
                            m = -1;
                            break a
                        }
                        if (M) {
                            n = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
                            r = c[n >> 2] | 0;
                            c[g >> 2] = n + 4;
                            n = q
                        } else {
                            n = q;
                            r = 0
                        }
                    } else {
                        n = o;
                        r = -1
                    }
                while (0);
                v = 0;
                while (1) {
                    o = (a[n >> 0] | 0) + -65 | 0;
                    if (o >>> 0 > 57) {
                        m = -1;
                        break a
                    }
                    J = n + 1 | 0;
                    o = a[12458 + (v * 58 | 0) + o >> 0] | 0;
                    q = o & 255;
                    if ((q + -1 | 0) >>> 0 < 8) {
                        n = J;
                        v = q
                    } else
                        break
                }
                if (!(o << 24 >> 24)) {
                    m = -1;
                    break
                }
                t = (u | 0) > -1;
                do
                    if (o << 24 >> 24 == 19)
                        if (t) {
                            m = -1;
                            break a
                        } else
                            L = 52;
                    else {
                        if (t) {
                            c[l + (u << 2) >> 2] = q;
                            H = j + (u << 3) | 0;
                            I = c[H + 4 >> 2] | 0;
                            L = ba;
                            c[L >> 2] = c[H >> 2];
                            c[L + 4 >> 2] = I;
                            L = 52;
                            break
                        }
                        if (!M) {
                            m = 0;
                            break a
                        }
                        qb(ba, q, g)
                    }
                while (0);
                if ((L | 0) == 52 ? (L = 0,
                    !M) : 0) {
                    f = J;
                    n = y;
                    continue
                }
                u = a[n >> 0] | 0;
                u = (v | 0) != 0 & (u & 15 | 0) == 3 ? u & -33 : u;
                o = w & -65537;
                I = (w & 8192 | 0) == 0 ? w : o;
                f: do
                    switch (u | 0) {
                        case 110:
                            switch (v | 0) {
                                case 0:
                                    c[c[ba >> 2] >> 2] = m;
                                    f = J;
                                    n = y;
                                    continue a;
                                case 1:
                                    c[c[ba >> 2] >> 2] = m;
                                    f = J;
                                    n = y;
                                    continue a;
                                case 2:
                                    f = c[ba >> 2] | 0;
                                    c[f >> 2] = m;
                                    c[f + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;
                                    f = J;
                                    n = y;
                                    continue a;
                                case 3:
                                    b[c[ba >> 2] >> 1] = m;
                                    f = J;
                                    n = y;
                                    continue a;
                                case 4:
                                    a[c[ba >> 2] >> 0] = m;
                                    f = J;
                                    n = y;
                                    continue a;
                                case 6:
                                    c[c[ba >> 2] >> 2] = m;
                                    f = J;
                                    n = y;
                                    continue a;
                                case 7:
                                    f = c[ba >> 2] | 0;
                                    c[f >> 2] = m;
                                    c[f + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;
                                    f = J;
                                    n = y;
                                    continue a;
                                default:
                                    f = J;
                                    n = y;
                                    continue a
                            }
                        case 112:
                            t = I | 8;
                            r = r >>> 0 > 8 ? r : 8;
                            u = 120;
                            L = 64;
                            break;
                        case 88:
                        case 120:
                            t = I;
                            L = 64;
                            break;
                        case 111:
                            o = ba;
                            n = c[o >> 2] | 0;
                            o = c[o + 4 >> 2] | 0;
                            if ((n | 0) == 0 & (o | 0) == 0)
                                f = N;
                            else {
                                f = N;
                                do {
                                    f = f + -1 | 0;
                                    a[f >> 0] = n & 7 | 48;
                                    n = wb(n | 0, o | 0, 3) | 0;
                                    o = C
                                } while (!((n | 0) == 0 & (o | 0) == 0))
                            }
                            if (!(I & 8)) {
                                n = I;
                                t = 0;
                                q = 12938;
                                L = 77
                            } else {
                                t = U - f + 1 | 0;
                                n = I;
                                r = (r | 0) < (t | 0) ? t : r;
                                t = 0;
                                q = 12938;
                                L = 77
                            }
                            break;
                        case 105:
                        case 100:
                            n = ba;
                            f = c[n >> 2] | 0;
                            n = c[n + 4 >> 2] | 0;
                            if ((n | 0) < 0) {
                                f = yb(0, 0, f | 0, n | 0) | 0;
                                n = C;
                                o = ba;
                                c[o >> 2] = f;
                                c[o + 4 >> 2] = n;
                                o = 1;
                                q = 12938;
                                L = 76;
                                break f
                            }
                            if (!(I & 2048)) {
                                q = I & 1;
                                o = q;
                                q = (q | 0) == 0 ? 12938 : 12940;
                                L = 76
                            } else {
                                o = 1;
                                q = 12939;
                                L = 76
                            }
                            break;
                        case 117:
                            n = ba;
                            f = c[n >> 2] | 0;
                            n = c[n + 4 >> 2] | 0;
                            o = 0;
                            q = 12938;
                            L = 76;
                            break;
                        case 99:
                            a[V >> 0] = c[ba >> 2];
                            f = V;
                            u = 1;
                            w = 0;
                            v = 12938;
                            n = N;
                            break;
                        case 109:
                            n = Ta(c[(Ua() | 0) >> 2] | 0) | 0;
                            L = 82;
                            break;
                        case 115:
                            n = c[ba >> 2] | 0;
                            n = (n | 0) != 0 ? n : 12948;
                            L = 82;
                            break;
                        case 67:
                            c[ga >> 2] = c[ba >> 2];
                            c[W >> 2] = 0;
                            c[ba >> 2] = ga;
                            o = ga;
                            r = -1;
                            L = 87;
                            break;
                        case 83:
                            if (!r) {
                                sb(e, 32, K, 0, I);
                                n = 0;
                                L = 98;
                                break f
                            } else {
                                o = c[ba >> 2] | 0;
                                L = 87;
                                break f
                            }
                        case 65:
                        case 71:
                        case 70:
                        case 69:
                        case 97:
                        case 103:
                        case 102:
                        case 101:
                            p = +h[ba >> 3];
                            c[ea >> 2] = 0;
                            h[k >> 3] = p;
                            if ((c[k + 4 >> 2] | 0) >= 0)
                                if (!(I & 2048)) {
                                    H = I & 1;
                                    G = H;
                                    H = (H | 0) == 0 ? 12956 : 12961
                                } else {
                                    G = 1;
                                    H = 12958
                                }
                            else {
                                p = -p;
                                G = 1;
                                H = 12955
                            }
                            h[k >> 3] = p;
                            F = c[k + 4 >> 2] & 2146435072;
                            do
                                if (F >>> 0 < 2146435072 | (F | 0) == 2146435072 & 0 < 0) {
                                    x = +Wa(p, ea) * 2;
                                    n = x != 0;
                                    if (n)
                                        c[ea >> 2] = (c[ea >> 2] | 0) + -1;
                                    D = u | 32;
                                    if ((D | 0) == 97) {
                                        v = u & 32;
                                        y = (v | 0) == 0 ? H : H + 9 | 0;
                                        w = G | 2;
                                        f = 12 - r | 0;
                                        do
                                            if (!(r >>> 0 > 11 | (f | 0) == 0)) {
                                                p = 8;
                                                do {
                                                    f = f + -1 | 0;
                                                    p = p * 16
                                                } while ((f | 0) != 0);
                                                if ((a[y >> 0] | 0) == 45) {
                                                    p = -(p + (-x - p));
                                                    break
                                                } else {
                                                    p = x + p - p;
                                                    break
                                                }
                                            } else
                                                p = x;
                                        while (0);
                                        n = c[ea >> 2] | 0;
                                        f = (n | 0) < 0 ? 0 - n | 0 : n;
                                        f = rb(f, ((f | 0) < 0) << 31 >> 31, X) | 0;
                                        if ((f | 0) == (X | 0)) {
                                            a[Y >> 0] = 48;
                                            f = Y
                                        }
                                        a[f + -1 >> 0] = (n >> 31 & 2) + 43;
                                        t = f + -2 | 0;
                                        a[t >> 0] = u + 15;
                                        q = (r | 0) < 1;
                                        o = (I & 8 | 0) == 0;
                                        n = da;
                                        while (1) {
                                            H = ~~p;
                                            f = n + 1 | 0;
                                            a[n >> 0] = d[12922 + H >> 0] | v;
                                            p = (p - +(H | 0)) * 16;
                                            do
                                                if ((f - Z | 0) == 1) {
                                                    if (o & (q & p == 0))
                                                        break;
                                                    a[f >> 0] = 46;
                                                    f = n + 2 | 0
                                                }
                                            while (0);
                                            if (!(p != 0))
                                                break;
                                            else
                                                n = f
                                        }
                                        o = t;
                                        r = (r | 0) != 0 & (O + f | 0) < (r | 0) ? P + r - o | 0 : aa - o + f | 0;
                                        q = r + w | 0;
                                        sb(e, 32, K, q, I);
                                        if (!(c[e >> 2] & 32))
                                            Za(y, w, e) | 0;
                                        sb(e, 48, K, q, I ^ 65536);
                                        n = f - Z | 0;
                                        if (!(c[e >> 2] & 32))
                                            Za(da, n, e) | 0;
                                        f = $ - o | 0;
                                        sb(e, 48, r - (n + f) | 0, 0, 0);
                                        if (!(c[e >> 2] & 32))
                                            Za(t, f, e) | 0;
                                        sb(e, 32, K, q, I ^ 8192);
                                        n = (q | 0) < (K | 0) ? K : q;
                                        break
                                    }
                                    f = (r | 0) < 0 ? 6 : r;
                                    if (n) {
                                        n = (c[ea >> 2] | 0) + -28 | 0;
                                        c[ea >> 2] = n;
                                        p = x * 268435456
                                    } else {
                                        p = x;
                                        n = c[ea >> 2] | 0
                                    }
                                    F = (n | 0) < 0 ? ca : Q;
                                    E = F;
                                    o = F;
                                    do {
                                        B = ~~p >>> 0;
                                        c[o >> 2] = B;
                                        o = o + 4 | 0;
                                        p = (p - +(B >>> 0)) * 1E9
                                    } while (p != 0);
                                    n = c[ea >> 2] | 0;
                                    if ((n | 0) > 0) {
                                        q = F;
                                        r = o;
                                        while (1) {
                                            t = (n | 0) > 29 ? 29 : n;
                                            n = r + -4 | 0;
                                            do
                                                if (n >>> 0 >= q >>> 0) {
                                                    o = 0;
                                                    do {
                                                        A = Ab(c[n >> 2] | 0, 0, t | 0) | 0;
                                                        A = zb(A | 0, C | 0, o | 0, 0) | 0;
                                                        B = C;
                                                        z = Jb(A | 0, B | 0, 1E9, 0) | 0;
                                                        c[n >> 2] = z;
                                                        o = Ib(A | 0, B | 0, 1E9, 0) | 0;
                                                        n = n + -4 | 0
                                                    } while (n >>> 0 >= q >>> 0);
                                                    if (!o)
                                                        break;
                                                    q = q + -4 | 0;
                                                    c[q >> 2] = o
                                                }
                                            while (0);
                                            o = r;
                                            while (1) {
                                                if (o >>> 0 <= q >>> 0)
                                                    break;
                                                n = o + -4 | 0;
                                                if (!(c[n >> 2] | 0))
                                                    o = n;
                                                else
                                                    break
                                            }
                                            n = (c[ea >> 2] | 0) - t | 0;
                                            c[ea >> 2] = n;
                                            if ((n | 0) > 0)
                                                r = o;
                                            else
                                                break
                                        }
                                    } else
                                        q = F;
                                    if ((n | 0) < 0) {
                                        y = ((f + 25 | 0) / 9 | 0) + 1 | 0;
                                        z = (D | 0) == 102;
                                        do {
                                            w = 0 - n | 0;
                                            w = (w | 0) > 9 ? 9 : w;
                                            do
                                                if (q >>> 0 < o >>> 0) {
                                                    n = (1 << w) + -1 | 0;
                                                    r = 1E9 >>> w;
                                                    v = 0;
                                                    t = q;
                                                    do {
                                                        B = c[t >> 2] | 0;
                                                        c[t >> 2] = (B >>> w) + v;
                                                        v = _(B & n, r) | 0;
                                                        t = t + 4 | 0
                                                    } while (t >>> 0 < o >>> 0);
                                                    n = (c[q >> 2] | 0) == 0 ? q + 4 | 0 : q;
                                                    if (!v) {
                                                        q = n;
                                                        n = o;
                                                        break
                                                    }
                                                    c[o >> 2] = v;
                                                    q = n;
                                                    n = o + 4 | 0
                                                } else {
                                                    q = (c[q >> 2] | 0) == 0 ? q + 4 | 0 : q;
                                                    n = o
                                                }
                                            while (0);
                                            o = z ? F : q;
                                            o = (n - o >> 2 | 0) > (y | 0) ? o + (y << 2) | 0 : n;
                                            n = (c[ea >> 2] | 0) + w | 0;
                                            c[ea >> 2] = n
                                        } while ((n | 0) < 0);
                                        t = q;
                                        B = o
                                    } else {
                                        t = q;
                                        B = o
                                    }
                                    do
                                        if (t >>> 0 < B >>> 0) {
                                            n = (E - t >> 2) * 9 | 0;
                                            q = c[t >> 2] | 0;
                                            if (q >>> 0 < 10)
                                                break;
                                            else
                                                o = 10;
                                            do {
                                                o = o * 10 | 0;
                                                n = n + 1 | 0
                                            } while (q >>> 0 >= o >>> 0)
                                        } else
                                            n = 0;
                                    while (0);
                                    z = (D | 0) == 103;
                                    A = (f | 0) != 0;
                                    o = f - ((D | 0) != 102 ? n : 0) + ((A & z) << 31 >> 31) | 0;
                                    if ((o | 0) < (((B - E >> 2) * 9 | 0) + -9 | 0)) {
                                        r = o + 9216 | 0;
                                        y = (r | 0) / 9 | 0;
                                        o = F + (y + -1023 << 2) | 0;
                                        r = ((r | 0) % 9 | 0) + 1 | 0;
                                        if ((r | 0) < 9) {
                                            q = 10;
                                            do {
                                                q = q * 10 | 0;
                                                r = r + 1 | 0
                                            } while ((r | 0) != 9)
                                        } else
                                            q = 10;
                                        v = c[o >> 2] | 0;
                                        w = (v >>> 0) % (q >>> 0) | 0;
                                        if ((w | 0) == 0 ? (F + (y + -1022 << 2) | 0) == (B | 0) : 0)
                                            q = t;
                                        else
                                            L = 163;
                                        do
                                            if ((L | 0) == 163) {
                                                L = 0;
                                                x = (((v >>> 0) / (q >>> 0) | 0) & 1 | 0) == 0 ? 9007199254740992 : 9007199254740994;
                                                r = (q | 0) / 2 | 0;
                                                do
                                                    if (w >>> 0 < r >>> 0)
                                                        p = .5;
                                                    else {
                                                        if ((w | 0) == (r | 0) ? (F + (y + -1022 << 2) | 0) == (B | 0) : 0) {
                                                            p = 1;
                                                            break
                                                        }
                                                        p = 1.5
                                                    }
                                                while (0);
                                                do
                                                    if (G) {
                                                        if ((a[H >> 0] | 0) != 45)
                                                            break;
                                                        x = -x;
                                                        p = -p
                                                    }
                                                while (0);
                                                r = v - w | 0;
                                                c[o >> 2] = r;
                                                if (!(x + p != x)) {
                                                    q = t;
                                                    break
                                                }
                                                D = r + q | 0;
                                                c[o >> 2] = D;
                                                if (D >>> 0 > 999999999) {
                                                    n = t;
                                                    while (1) {
                                                        q = o + -4 | 0;
                                                        c[o >> 2] = 0;
                                                        if (q >>> 0 < n >>> 0) {
                                                            n = n + -4 | 0;
                                                            c[n >> 2] = 0
                                                        }
                                                        D = (c[q >> 2] | 0) + 1 | 0;
                                                        c[q >> 2] = D;
                                                        if (D >>> 0 > 999999999)
                                                            o = q;
                                                        else {
                                                            t = n;
                                                            o = q;
                                                            break
                                                        }
                                                    }
                                                }
                                                n = (E - t >> 2) * 9 | 0;
                                                r = c[t >> 2] | 0;
                                                if (r >>> 0 < 10) {
                                                    q = t;
                                                    break
                                                } else
                                                    q = 10;
                                                do {
                                                    q = q * 10 | 0;
                                                    n = n + 1 | 0
                                                } while (r >>> 0 >= q >>> 0);
                                                q = t
                                            }
                                        while (0);
                                        o = o + 4 | 0;
                                        D = q;
                                        o = B >>> 0 > o >>> 0 ? o : B
                                    } else {
                                        D = t;
                                        o = B
                                    }
                                    w = 0 - n | 0;
                                    B = o;
                                    while (1) {
                                        if (B >>> 0 <= D >>> 0) {
                                            y = 0;
                                            break
                                        }
                                        o = B + -4 | 0;
                                        if (!(c[o >> 2] | 0))
                                            B = o;
                                        else {
                                            y = 1;
                                            break
                                        }
                                    }
                                    do
                                        if (z) {
                                            f = (A & 1 ^ 1) + f | 0;
                                            if ((f | 0) > (n | 0) & (n | 0) > -5) {
                                                u = u + -1 | 0;
                                                f = f + -1 - n | 0
                                            } else {
                                                u = u + -2 | 0;
                                                f = f + -1 | 0
                                            }
                                            o = I & 8;
                                            if (o)
                                                break;
                                            do
                                                if (y) {
                                                    o = c[B + -4 >> 2] | 0;
                                                    if (!o) {
                                                        q = 9;
                                                        break
                                                    }
                                                    if (!((o >>> 0) % 10 | 0)) {
                                                        r = 10;
                                                        q = 0
                                                    } else {
                                                        q = 0;
                                                        break
                                                    }
                                                    do {
                                                        r = r * 10 | 0;
                                                        q = q + 1 | 0
                                                    } while (((o >>> 0) % (r >>> 0) | 0 | 0) == 0)
                                                } else
                                                    q = 9;
                                            while (0);
                                            o = ((B - E >> 2) * 9 | 0) + -9 | 0;
                                            if ((u | 32 | 0) == 102) {
                                                o = o - q | 0;
                                                o = (o | 0) < 0 ? 0 : o;
                                                f = (f | 0) < (o | 0) ? f : o;
                                                o = 0;
                                                break
                                            } else {
                                                o = o + n - q | 0;
                                                o = (o | 0) < 0 ? 0 : o;
                                                f = (f | 0) < (o | 0) ? f : o;
                                                o = 0;
                                                break
                                            }
                                        } else
                                            o = I & 8;
                                    while (0);
                                    v = f | o;
                                    r = (v | 0) != 0 & 1;
                                    t = (u | 32 | 0) == 102;
                                    if (t) {
                                        n = (n | 0) > 0 ? n : 0;
                                        u = 0
                                    } else {
                                        q = (n | 0) < 0 ? w : n;
                                        q = rb(q, ((q | 0) < 0) << 31 >> 31, X) | 0;
                                        if (($ - q | 0) < 2) {
                                            do {
                                                q = q + -1 | 0;
                                                a[q >> 0] = 48
                                            } while (($ - q | 0) < 2)
                                        }
                                        a[q + -1 >> 0] = (n >> 31 & 2) + 43;
                                        E = q + -2 | 0;
                                        a[E >> 0] = u;
                                        n = $ - E | 0;
                                        u = E
                                    }
                                    w = G + 1 + f + r + n | 0;
                                    sb(e, 32, K, w, I);
                                    if (!(c[e >> 2] & 32))
                                        Za(H, G, e) | 0;
                                    sb(e, 48, K, w, I ^ 65536);
                                    do
                                        if (t) {
                                            q = D >>> 0 > F >>> 0 ? F : D;
                                            o = q;
                                            do {
                                                n = rb(c[o >> 2] | 0, 0, R) | 0;
                                                do
                                                    if ((o | 0) == (q | 0)) {
                                                        if ((n | 0) != (R | 0))
                                                            break;
                                                        a[T >> 0] = 48;
                                                        n = T
                                                    } else {
                                                        if (n >>> 0 <= da >>> 0)
                                                            break;
                                                        do {
                                                            n = n + -1 | 0;
                                                            a[n >> 0] = 48
                                                        } while (n >>> 0 > da >>> 0)
                                                    }
                                                while (0);
                                                if (!(c[e >> 2] & 32))
                                                    Za(n, S - n | 0, e) | 0;
                                                o = o + 4 | 0
                                            } while (o >>> 0 <= F >>> 0);
                                            do
                                                if (v) {
                                                    if (c[e >> 2] & 32)
                                                        break;
                                                    Za(12990, 1, e) | 0
                                                }
                                            while (0);
                                            if ((f | 0) > 0 & o >>> 0 < B >>> 0)
                                                while (1) {
                                                    n = rb(c[o >> 2] | 0, 0, R) | 0;
                                                    if (n >>> 0 > da >>> 0) {
                                                        do {
                                                            n = n + -1 | 0;
                                                            a[n >> 0] = 48
                                                        } while (n >>> 0 > da >>> 0)
                                                    }
                                                    if (!(c[e >> 2] & 32))
                                                        Za(n, (f | 0) > 9 ? 9 : f, e) | 0;
                                                    o = o + 4 | 0;
                                                    n = f + -9 | 0;
                                                    if (!((f | 0) > 9 & o >>> 0 < B >>> 0)) {
                                                        f = n;
                                                        break
                                                    } else
                                                        f = n
                                                }
                                            sb(e, 48, f + 9 | 0, 9, 0)
                                        } else {
                                            t = y ? B : D + 4 | 0;
                                            if ((f | 0) > -1) {
                                                r = (o | 0) == 0;
                                                q = D;
                                                do {
                                                    n = rb(c[q >> 2] | 0, 0, R) | 0;
                                                    if ((n | 0) == (R | 0)) {
                                                        a[T >> 0] = 48;
                                                        n = T
                                                    }
                                                    do
                                                        if ((q | 0) == (D | 0)) {
                                                            o = n + 1 | 0;
                                                            if (!(c[e >> 2] & 32))
                                                                Za(n, 1, e) | 0;
                                                            if (r & (f | 0) < 1) {
                                                                n = o;
                                                                break
                                                            }
                                                            if (c[e >> 2] & 32) {
                                                                n = o;
                                                                break
                                                            }
                                                            Za(12990, 1, e) | 0;
                                                            n = o
                                                        } else {
                                                            if (n >>> 0 <= da >>> 0)
                                                                break;
                                                            do {
                                                                n = n + -1 | 0;
                                                                a[n >> 0] = 48
                                                            } while (n >>> 0 > da >>> 0)
                                                        }
                                                    while (0);
                                                    o = S - n | 0;
                                                    if (!(c[e >> 2] & 32))
                                                        Za(n, (f | 0) > (o | 0) ? o : f, e) | 0;
                                                    f = f - o | 0;
                                                    q = q + 4 | 0
                                                } while (q >>> 0 < t >>> 0 & (f | 0) > -1)
                                            }
                                            sb(e, 48, f + 18 | 0, 18, 0);
                                            if (c[e >> 2] & 32)
                                                break;
                                            Za(u, $ - u | 0, e) | 0
                                        }
                                    while (0);
                                    sb(e, 32, K, w, I ^ 8192);
                                    n = (w | 0) < (K | 0) ? K : w
                                } else {
                                    t = (u & 32 | 0) != 0;
                                    r = p != p | 0 != 0;
                                    n = r ? 0 : G;
                                    q = n + 3 | 0;
                                    sb(e, 32, K, q, o);
                                    f = c[e >> 2] | 0;
                                    if (!(f & 32)) {
                                        Za(H, n, e) | 0;
                                        f = c[e >> 2] | 0
                                    }
                                    if (!(f & 32))
                                        Za(r ? t ? 12982 : 12986 : t ? 12974 : 12978, 3, e) | 0;
                                    sb(e, 32, K, q, I ^ 8192);
                                    n = (q | 0) < (K | 0) ? K : q
                                }
                            while (0);
                            f = J;
                            continue a;
                        default:
                            o = I;
                            u = r;
                            w = 0;
                            v = 12938;
                            n = N
                    }
                while (0);
                g: do
                    if ((L | 0) == 64) {
                        o = ba;
                        n = c[o >> 2] | 0;
                        o = c[o + 4 >> 2] | 0;
                        q = u & 32;
                        if (!((n | 0) == 0 & (o | 0) == 0)) {
                            f = N;
                            do {
                                f = f + -1 | 0;
                                a[f >> 0] = d[12922 + (n & 15) >> 0] | q;
                                n = wb(n | 0, o | 0, 4) | 0;
                                o = C
                            } while (!((n | 0) == 0 & (o | 0) == 0));
                            L = ba;
                            if ((t & 8 | 0) == 0 | (c[L >> 2] | 0) == 0 & (c[L + 4 >> 2] | 0) == 0) {
                                n = t;
                                t = 0;
                                q = 12938;
                                L = 77
                            } else {
                                n = t;
                                t = 2;
                                q = 12938 + (u >> 4) | 0;
                                L = 77
                            }
                        } else {
                            f = N;
                            n = t;
                            t = 0;
                            q = 12938;
                            L = 77
                        }
                    } else if ((L | 0) == 76) {
                        f = rb(f, n, N) | 0;
                        n = I;
                        t = o;
                        L = 77
                    } else if ((L | 0) == 82) {
                        L = 0;
                        I = jb(n, 0, r) | 0;
                        H = (I | 0) == 0;
                        f = n;
                        u = H ? r : I - n | 0;
                        w = 0;
                        v = 12938;
                        n = H ? n + r | 0 : I
                    } else if ((L | 0) == 87) {
                        L = 0;
                        n = 0;
                        f = 0;
                        t = o;
                        while (1) {
                            q = c[t >> 2] | 0;
                            if (!q)
                                break;
                            f = Xa(fa, q) | 0;
                            if ((f | 0) < 0 | f >>> 0 > (r - n | 0) >>> 0)
                                break;
                            n = f + n | 0;
                            if (r >>> 0 > n >>> 0)
                                t = t + 4 | 0;
                            else
                                break
                        }
                        if ((f | 0) < 0) {
                            m = -1;
                            break a
                        }
                        sb(e, 32, K, n, I);
                        if (!n) {
                            n = 0;
                            L = 98
                        } else {
                            q = 0;
                            while (1) {
                                f = c[o >> 2] | 0;
                                if (!f) {
                                    L = 98;
                                    break g
                                }
                                f = Xa(fa, f) | 0;
                                q = f + q | 0;
                                if ((q | 0) > (n | 0)) {
                                    L = 98;
                                    break g
                                }
                                if (!(c[e >> 2] & 32))
                                    Za(fa, f, e) | 0;
                                if (q >>> 0 >= n >>> 0) {
                                    L = 98;
                                    break
                                } else
                                    o = o + 4 | 0
                            }
                        }
                    }
                while (0);
                if ((L | 0) == 98) {
                    L = 0;
                    sb(e, 32, K, n, I ^ 8192);
                    f = J;
                    n = (K | 0) > (n | 0) ? K : n;
                    continue
                }
                if ((L | 0) == 77) {
                    L = 0;
                    o = (r | 0) > -1 ? n & -65537 : n;
                    n = ba;
                    n = (c[n >> 2] | 0) != 0 | (c[n + 4 >> 2] | 0) != 0;
                    if ((r | 0) != 0 | n) {
                        u = (n & 1 ^ 1) + (U - f) | 0;
                        u = (r | 0) > (u | 0) ? r : u;
                        w = t;
                        v = q;
                        n = N
                    } else {
                        f = N;
                        u = 0;
                        w = t;
                        v = q;
                        n = N
                    }
                }
                t = n - f | 0;
                q = (u | 0) < (t | 0) ? t : u;
                r = w + q | 0;
                n = (K | 0) < (r | 0) ? r : K;
                sb(e, 32, n, r, o);
                if (!(c[e >> 2] & 32))
                    Za(v, w, e) | 0;
                sb(e, 48, n, r, o ^ 65536);
                sb(e, 48, q, t, 0);
                if (!(c[e >> 2] & 32))
                    Za(f, t, e) | 0;
                sb(e, 32, n, r, o ^ 8192);
                f = J
            }
            h: do
                if ((L | 0) == 245)
                    if (!e)
                        if (!s)
                            m = 0;
                        else {
                            m = 1;
                            while (1) {
                                f = c[l + (m << 2) >> 2] | 0;
                                if (!f)
                                    break;
                                qb(j + (m << 3) | 0, f, g);
                                m = m + 1 | 0;
                                if ((m | 0) >= 10) {
                                    m = 1;
                                    break h
                                }
                            }
                            while (1) {
                                m = m + 1 | 0;
                                if ((m | 0) >= 10) {
                                    m = 1;
                                    break h
                                }
                                if (c[l + (m << 2) >> 2] | 0) {
                                    m = -1;
                                    break
                                }
                            }
                        }
            while (0);
            i = ha;
            return m | 0
        }

        function ob(a) {
            a = a | 0;
            return
        }

        function pb(a, b, d) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            var e = 0
                , f = 0;
            e = a + 20 | 0;
            f = c[e >> 2] | 0;
            a = (c[a + 16 >> 2] | 0) - f | 0;
            a = a >>> 0 > d >>> 0 ? d : a;
            Bb(f | 0, b | 0, a | 0) | 0;
            c[e >> 2] = (c[e >> 2] | 0) + a;
            return d | 0
        }

        function qb(a, b, d) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            var e = 0
                , f = 0
                , g = 0;
            a: do
                if (b >>> 0 <= 20) {
                    do
                        switch (b | 0) {
                            case 9:
                                e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                b = c[e >> 2] | 0;
                                c[d >> 2] = e + 4;
                                c[a >> 2] = b;
                                break a;
                            case 10:
                                e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                b = c[e >> 2] | 0;
                                c[d >> 2] = e + 4;
                                e = a;
                                c[e >> 2] = b;
                                c[e + 4 >> 2] = ((b | 0) < 0) << 31 >> 31;
                                break a;
                            case 11:
                                e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                b = c[e >> 2] | 0;
                                c[d >> 2] = e + 4;
                                e = a;
                                c[e >> 2] = b;
                                c[e + 4 >> 2] = 0;
                                break a;
                            case 12:
                                e = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
                                b = e;
                                f = c[b >> 2] | 0;
                                b = c[b + 4 >> 2] | 0;
                                c[d >> 2] = e + 8;
                                e = a;
                                c[e >> 2] = f;
                                c[e + 4 >> 2] = b;
                                break a;
                            case 13:
                                f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                e = c[f >> 2] | 0;
                                c[d >> 2] = f + 4;
                                e = (e & 65535) << 16 >> 16;
                                f = a;
                                c[f >> 2] = e;
                                c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
                                break a;
                            case 14:
                                f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                e = c[f >> 2] | 0;
                                c[d >> 2] = f + 4;
                                f = a;
                                c[f >> 2] = e & 65535;
                                c[f + 4 >> 2] = 0;
                                break a;
                            case 15:
                                f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                e = c[f >> 2] | 0;
                                c[d >> 2] = f + 4;
                                e = (e & 255) << 24 >> 24;
                                f = a;
                                c[f >> 2] = e;
                                c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
                                break a;
                            case 16:
                                f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                e = c[f >> 2] | 0;
                                c[d >> 2] = f + 4;
                                f = a;
                                c[f >> 2] = e & 255;
                                c[f + 4 >> 2] = 0;
                                break a;
                            case 17:
                                f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
                                g = +h[f >> 3];
                                c[d >> 2] = f + 8;
                                h[a >> 3] = g;
                                break a;
                            case 18:
                                f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
                                g = +h[f >> 3];
                                c[d >> 2] = f + 8;
                                h[a >> 3] = g;
                                break a;
                            default:
                                break a
                        }
                    while (0)
                }
            while (0);
            return
        }

        function rb(b, c, d) {
            b = b | 0;
            c = c | 0;
            d = d | 0;
            var e = 0;
            if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295)
                while (1) {
                    e = Jb(b | 0, c | 0, 10, 0) | 0;
                    d = d + -1 | 0;
                    a[d >> 0] = e | 48;
                    e = b;
                    b = Ib(b | 0, c | 0, 10, 0) | 0;
                    if (!(c >>> 0 > 9 | (c | 0) == 9 & e >>> 0 > 4294967295))
                        break;
                    else
                        c = C
                }
            if (b)
                while (1) {
                    d = d + -1 | 0;
                    a[d >> 0] = (b >>> 0) % 10 | 0 | 48;
                    if (b >>> 0 < 10)
                        break;
                    else
                        b = (b >>> 0) / 10 | 0
                }
            return d | 0
        }

        function sb(a, b, d, e, f) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            e = e | 0;
            f = f | 0;
            var g = 0
                , h = 0;
            h = i;
            i = i + 256 | 0;
            g = h;
            do
                if ((d | 0) > (e | 0) & (f & 73728 | 0) == 0) {
                    f = d - e | 0;
                    xb(g | 0, b | 0, (f >>> 0 > 256 ? 256 : f) | 0) | 0;
                    e = c[a >> 2] | 0;
                    d = (e & 32 | 0) == 0;
                    if (f >>> 0 > 255) {
                        b = f;
                        do {
                            if (d) {
                                Za(g, 256, a) | 0;
                                e = c[a >> 2] | 0
                            }
                            b = b + -256 | 0;
                            d = (e & 32 | 0) == 0
                        } while (b >>> 0 > 255);
                        if (d)
                            f = f & 255;
                        else
                            break
                    } else if (!d)
                        break;
                    Za(g, f, a) | 0
                }
            while (0);
            i = h;
            return
        }

        function tb(a) {
            a = a | 0;
            var b = 0
                , d = 0
                , e = 0
                , f = 0
                , g = 0
                , h = 0
                , i = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0
                , n = 0
                , o = 0
                , p = 0
                , q = 0
                , r = 0
                , s = 0
                , t = 0
                , u = 0
                , v = 0
                , w = 0
                , x = 0
                , y = 0
                , z = 0
                , A = 0
                , B = 0
                , C = 0
                , D = 0
                , E = 0
                , F = 0
                , G = 0
                , H = 0
                , I = 0
                , J = 0
                , K = 0
                , L = 0;
            do
                if (a >>> 0 < 245) {
                    o = a >>> 0 < 11 ? 16 : a + 11 & -8;
                    a = o >>> 3;
                    i = c[327] | 0;
                    b = i >>> a;
                    if (b & 3) {
                        b = (b & 1 ^ 1) + a | 0;
                        e = b << 1;
                        d = 1348 + (e << 2) | 0;
                        e = 1348 + (e + 2 << 2) | 0;
                        f = c[e >> 2] | 0;
                        g = f + 8 | 0;
                        h = c[g >> 2] | 0;
                        do
                            if ((d | 0) != (h | 0)) {
                                if (h >>> 0 < (c[331] | 0) >>> 0)
                                    ja();
                                a = h + 12 | 0;
                                if ((c[a >> 2] | 0) == (f | 0)) {
                                    c[a >> 2] = d;
                                    c[e >> 2] = h;
                                    break
                                } else
                                    ja()
                            } else
                                c[327] = i & ~(1 << b);
                        while (0);
                        L = b << 3;
                        c[f + 4 >> 2] = L | 3;
                        L = f + (L | 4) | 0;
                        c[L >> 2] = c[L >> 2] | 1;
                        L = g;
                        return L | 0
                    }
                    h = c[329] | 0;
                    if (o >>> 0 > h >>> 0) {
                        if (b) {
                            e = 2 << a;
                            e = b << a & (e | 0 - e);
                            e = (e & 0 - e) + -1 | 0;
                            j = e >>> 12 & 16;
                            e = e >>> j;
                            f = e >>> 5 & 8;
                            e = e >>> f;
                            g = e >>> 2 & 4;
                            e = e >>> g;
                            d = e >>> 1 & 2;
                            e = e >>> d;
                            b = e >>> 1 & 1;
                            b = (f | j | g | d | b) + (e >>> b) | 0;
                            e = b << 1;
                            d = 1348 + (e << 2) | 0;
                            e = 1348 + (e + 2 << 2) | 0;
                            g = c[e >> 2] | 0;
                            j = g + 8 | 0;
                            f = c[j >> 2] | 0;
                            do
                                if ((d | 0) != (f | 0)) {
                                    if (f >>> 0 < (c[331] | 0) >>> 0)
                                        ja();
                                    a = f + 12 | 0;
                                    if ((c[a >> 2] | 0) == (g | 0)) {
                                        c[a >> 2] = d;
                                        c[e >> 2] = f;
                                        k = c[329] | 0;
                                        break
                                    } else
                                        ja()
                                } else {
                                    c[327] = i & ~(1 << b);
                                    k = h
                                }
                            while (0);
                            L = b << 3;
                            h = L - o | 0;
                            c[g + 4 >> 2] = o | 3;
                            i = g + o | 0;
                            c[g + (o | 4) >> 2] = h | 1;
                            c[g + L >> 2] = h;
                            if (k) {
                                f = c[332] | 0;
                                d = k >>> 3;
                                a = d << 1;
                                e = 1348 + (a << 2) | 0;
                                b = c[327] | 0;
                                d = 1 << d;
                                if (b & d) {
                                    b = 1348 + (a + 2 << 2) | 0;
                                    a = c[b >> 2] | 0;
                                    if (a >>> 0 < (c[331] | 0) >>> 0)
                                        ja();
                                    else {
                                        l = b;
                                        m = a
                                    }
                                } else {
                                    c[327] = b | d;
                                    l = 1348 + (a + 2 << 2) | 0;
                                    m = e
                                }
                                c[l >> 2] = f;
                                c[m + 12 >> 2] = f;
                                c[f + 8 >> 2] = m;
                                c[f + 12 >> 2] = e
                            }
                            c[329] = h;
                            c[332] = i;
                            L = j;
                            return L | 0
                        }
                        a = c[328] | 0;
                        if (a) {
                            i = (a & 0 - a) + -1 | 0;
                            K = i >>> 12 & 16;
                            i = i >>> K;
                            J = i >>> 5 & 8;
                            i = i >>> J;
                            L = i >>> 2 & 4;
                            i = i >>> L;
                            b = i >>> 1 & 2;
                            i = i >>> b;
                            j = i >>> 1 & 1;
                            j = c[1612 + ((J | K | L | b | j) + (i >>> j) << 2) >> 2] | 0;
                            i = (c[j + 4 >> 2] & -8) - o | 0;
                            b = j;
                            while (1) {
                                a = c[b + 16 >> 2] | 0;
                                if (!a) {
                                    a = c[b + 20 >> 2] | 0;
                                    if (!a)
                                        break
                                }
                                b = (c[a + 4 >> 2] & -8) - o | 0;
                                L = b >>> 0 < i >>> 0;
                                i = L ? b : i;
                                b = a;
                                j = L ? a : j
                            }
                            f = c[331] | 0;
                            if (j >>> 0 < f >>> 0)
                                ja();
                            h = j + o | 0;
                            if (j >>> 0 >= h >>> 0)
                                ja();
                            g = c[j + 24 >> 2] | 0;
                            d = c[j + 12 >> 2] | 0;
                            do
                                if ((d | 0) == (j | 0)) {
                                    b = j + 20 | 0;
                                    a = c[b >> 2] | 0;
                                    if (!a) {
                                        b = j + 16 | 0;
                                        a = c[b >> 2] | 0;
                                        if (!a) {
                                            n = 0;
                                            break
                                        }
                                    }
                                    while (1) {
                                        d = a + 20 | 0;
                                        e = c[d >> 2] | 0;
                                        if (e) {
                                            a = e;
                                            b = d;
                                            continue
                                        }
                                        d = a + 16 | 0;
                                        e = c[d >> 2] | 0;
                                        if (!e)
                                            break;
                                        else {
                                            a = e;
                                            b = d
                                        }
                                    }
                                    if (b >>> 0 < f >>> 0)
                                        ja();
                                    else {
                                        c[b >> 2] = 0;
                                        n = a;
                                        break
                                    }
                                } else {
                                    e = c[j + 8 >> 2] | 0;
                                    if (e >>> 0 < f >>> 0)
                                        ja();
                                    a = e + 12 | 0;
                                    if ((c[a >> 2] | 0) != (j | 0))
                                        ja();
                                    b = d + 8 | 0;
                                    if ((c[b >> 2] | 0) == (j | 0)) {
                                        c[a >> 2] = d;
                                        c[b >> 2] = e;
                                        n = d;
                                        break
                                    } else
                                        ja()
                                }
                            while (0);
                            do
                                if (g) {
                                    a = c[j + 28 >> 2] | 0;
                                    b = 1612 + (a << 2) | 0;
                                    if ((j | 0) == (c[b >> 2] | 0)) {
                                        c[b >> 2] = n;
                                        if (!n) {
                                            c[328] = c[328] & ~(1 << a);
                                            break
                                        }
                                    } else {
                                        if (g >>> 0 < (c[331] | 0) >>> 0)
                                            ja();
                                        a = g + 16 | 0;
                                        if ((c[a >> 2] | 0) == (j | 0))
                                            c[a >> 2] = n;
                                        else
                                            c[g + 20 >> 2] = n;
                                        if (!n)
                                            break
                                    }
                                    b = c[331] | 0;
                                    if (n >>> 0 < b >>> 0)
                                        ja();
                                    c[n + 24 >> 2] = g;
                                    a = c[j + 16 >> 2] | 0;
                                    do
                                        if (a)
                                            if (a >>> 0 < b >>> 0)
                                                ja();
                                            else {
                                                c[n + 16 >> 2] = a;
                                                c[a + 24 >> 2] = n;
                                                break
                                            }
                                    while (0);
                                    a = c[j + 20 >> 2] | 0;
                                    if (a)
                                        if (a >>> 0 < (c[331] | 0) >>> 0)
                                            ja();
                                        else {
                                            c[n + 20 >> 2] = a;
                                            c[a + 24 >> 2] = n;
                                            break
                                        }
                                }
                            while (0);
                            if (i >>> 0 < 16) {
                                L = i + o | 0;
                                c[j + 4 >> 2] = L | 3;
                                L = j + (L + 4) | 0;
                                c[L >> 2] = c[L >> 2] | 1
                            } else {
                                c[j + 4 >> 2] = o | 3;
                                c[j + (o | 4) >> 2] = i | 1;
                                c[j + (i + o) >> 2] = i;
                                a = c[329] | 0;
                                if (a) {
                                    f = c[332] | 0;
                                    d = a >>> 3;
                                    a = d << 1;
                                    e = 1348 + (a << 2) | 0;
                                    b = c[327] | 0;
                                    d = 1 << d;
                                    if (b & d) {
                                        a = 1348 + (a + 2 << 2) | 0;
                                        b = c[a >> 2] | 0;
                                        if (b >>> 0 < (c[331] | 0) >>> 0)
                                            ja();
                                        else {
                                            p = a;
                                            q = b
                                        }
                                    } else {
                                        c[327] = b | d;
                                        p = 1348 + (a + 2 << 2) | 0;
                                        q = e
                                    }
                                    c[p >> 2] = f;
                                    c[q + 12 >> 2] = f;
                                    c[f + 8 >> 2] = q;
                                    c[f + 12 >> 2] = e
                                }
                                c[329] = i;
                                c[332] = h
                            }
                            L = j + 8 | 0;
                            return L | 0
                        }
                    }
                } else if (a >>> 0 <= 4294967231) {
                    a = a + 11 | 0;
                    o = a & -8;
                    j = c[328] | 0;
                    if (j) {
                        b = 0 - o | 0;
                        a = a >>> 8;
                        if (a)
                            if (o >>> 0 > 16777215)
                                i = 31;
                            else {
                                q = (a + 1048320 | 0) >>> 16 & 8;
                                x = a << q;
                                p = (x + 520192 | 0) >>> 16 & 4;
                                x = x << p;
                                i = (x + 245760 | 0) >>> 16 & 2;
                                i = 14 - (p | q | i) + (x << i >>> 15) | 0;
                                i = o >>> (i + 7 | 0) & 1 | i << 1
                            }
                        else
                            i = 0;
                        a = c[1612 + (i << 2) >> 2] | 0;
                        a: do
                            if (!a) {
                                d = 0;
                                a = 0;
                                x = 86
                            } else {
                                f = b;
                                d = 0;
                                g = o << ((i | 0) == 31 ? 0 : 25 - (i >>> 1) | 0);
                                h = a;
                                a = 0;
                                while (1) {
                                    e = c[h + 4 >> 2] & -8;
                                    b = e - o | 0;
                                    if (b >>> 0 < f >>> 0)
                                        if ((e | 0) == (o | 0)) {
                                            e = h;
                                            a = h;
                                            x = 90;
                                            break a
                                        } else
                                            a = h;
                                    else
                                        b = f;
                                    x = c[h + 20 >> 2] | 0;
                                    h = c[h + 16 + (g >>> 31 << 2) >> 2] | 0;
                                    d = (x | 0) == 0 | (x | 0) == (h | 0) ? d : x;
                                    if (!h) {
                                        x = 86;
                                        break
                                    } else {
                                        f = b;
                                        g = g << 1
                                    }
                                }
                            }
                        while (0);
                        if ((x | 0) == 86) {
                            if ((d | 0) == 0 & (a | 0) == 0) {
                                a = 2 << i;
                                a = (a | 0 - a) & j;
                                if (!a)
                                    break;
                                a = (a & 0 - a) + -1 | 0;
                                n = a >>> 12 & 16;
                                a = a >>> n;
                                m = a >>> 5 & 8;
                                a = a >>> m;
                                p = a >>> 2 & 4;
                                a = a >>> p;
                                q = a >>> 1 & 2;
                                a = a >>> q;
                                d = a >>> 1 & 1;
                                d = c[1612 + ((m | n | p | q | d) + (a >>> d) << 2) >> 2] | 0;
                                a = 0
                            }
                            if (!d) {
                                i = b;
                                j = a
                            } else {
                                e = d;
                                x = 90
                            }
                        }
                        if ((x | 0) == 90)
                            while (1) {
                                x = 0;
                                q = (c[e + 4 >> 2] & -8) - o | 0;
                                d = q >>> 0 < b >>> 0;
                                b = d ? q : b;
                                a = d ? e : a;
                                d = c[e + 16 >> 2] | 0;
                                if (d) {
                                    e = d;
                                    x = 90;
                                    continue
                                }
                                e = c[e + 20 >> 2] | 0;
                                if (!e) {
                                    i = b;
                                    j = a;
                                    break
                                } else
                                    x = 90
                            }
                        if ((j | 0) != 0 ? i >>> 0 < ((c[329] | 0) - o | 0) >>> 0 : 0) {
                            f = c[331] | 0;
                            if (j >>> 0 < f >>> 0)
                                ja();
                            h = j + o | 0;
                            if (j >>> 0 >= h >>> 0)
                                ja();
                            g = c[j + 24 >> 2] | 0;
                            d = c[j + 12 >> 2] | 0;
                            do
                                if ((d | 0) == (j | 0)) {
                                    b = j + 20 | 0;
                                    a = c[b >> 2] | 0;
                                    if (!a) {
                                        b = j + 16 | 0;
                                        a = c[b >> 2] | 0;
                                        if (!a) {
                                            s = 0;
                                            break
                                        }
                                    }
                                    while (1) {
                                        d = a + 20 | 0;
                                        e = c[d >> 2] | 0;
                                        if (e) {
                                            a = e;
                                            b = d;
                                            continue
                                        }
                                        d = a + 16 | 0;
                                        e = c[d >> 2] | 0;
                                        if (!e)
                                            break;
                                        else {
                                            a = e;
                                            b = d
                                        }
                                    }
                                    if (b >>> 0 < f >>> 0)
                                        ja();
                                    else {
                                        c[b >> 2] = 0;
                                        s = a;
                                        break
                                    }
                                } else {
                                    e = c[j + 8 >> 2] | 0;
                                    if (e >>> 0 < f >>> 0)
                                        ja();
                                    a = e + 12 | 0;
                                    if ((c[a >> 2] | 0) != (j | 0))
                                        ja();
                                    b = d + 8 | 0;
                                    if ((c[b >> 2] | 0) == (j | 0)) {
                                        c[a >> 2] = d;
                                        c[b >> 2] = e;
                                        s = d;
                                        break
                                    } else
                                        ja()
                                }
                            while (0);
                            do
                                if (g) {
                                    a = c[j + 28 >> 2] | 0;
                                    b = 1612 + (a << 2) | 0;
                                    if ((j | 0) == (c[b >> 2] | 0)) {
                                        c[b >> 2] = s;
                                        if (!s) {
                                            c[328] = c[328] & ~(1 << a);
                                            break
                                        }
                                    } else {
                                        if (g >>> 0 < (c[331] | 0) >>> 0)
                                            ja();
                                        a = g + 16 | 0;
                                        if ((c[a >> 2] | 0) == (j | 0))
                                            c[a >> 2] = s;
                                        else
                                            c[g + 20 >> 2] = s;
                                        if (!s)
                                            break
                                    }
                                    b = c[331] | 0;
                                    if (s >>> 0 < b >>> 0)
                                        ja();
                                    c[s + 24 >> 2] = g;
                                    a = c[j + 16 >> 2] | 0;
                                    do
                                        if (a)
                                            if (a >>> 0 < b >>> 0)
                                                ja();
                                            else {
                                                c[s + 16 >> 2] = a;
                                                c[a + 24 >> 2] = s;
                                                break
                                            }
                                    while (0);
                                    a = c[j + 20 >> 2] | 0;
                                    if (a)
                                        if (a >>> 0 < (c[331] | 0) >>> 0)
                                            ja();
                                        else {
                                            c[s + 20 >> 2] = a;
                                            c[a + 24 >> 2] = s;
                                            break
                                        }
                                }
                            while (0);
                            b: do
                                if (i >>> 0 >= 16) {
                                    c[j + 4 >> 2] = o | 3;
                                    c[j + (o | 4) >> 2] = i | 1;
                                    c[j + (i + o) >> 2] = i;
                                    a = i >>> 3;
                                    if (i >>> 0 < 256) {
                                        b = a << 1;
                                        e = 1348 + (b << 2) | 0;
                                        d = c[327] | 0;
                                        a = 1 << a;
                                        if (d & a) {
                                            a = 1348 + (b + 2 << 2) | 0;
                                            b = c[a >> 2] | 0;
                                            if (b >>> 0 < (c[331] | 0) >>> 0)
                                                ja();
                                            else {
                                                t = a;
                                                u = b
                                            }
                                        } else {
                                            c[327] = d | a;
                                            t = 1348 + (b + 2 << 2) | 0;
                                            u = e
                                        }
                                        c[t >> 2] = h;
                                        c[u + 12 >> 2] = h;
                                        c[j + (o + 8) >> 2] = u;
                                        c[j + (o + 12) >> 2] = e;
                                        break
                                    }
                                    a = i >>> 8;
                                    if (a)
                                        if (i >>> 0 > 16777215)
                                            e = 31;
                                        else {
                                            K = (a + 1048320 | 0) >>> 16 & 8;
                                            L = a << K;
                                            J = (L + 520192 | 0) >>> 16 & 4;
                                            L = L << J;
                                            e = (L + 245760 | 0) >>> 16 & 2;
                                            e = 14 - (J | K | e) + (L << e >>> 15) | 0;
                                            e = i >>> (e + 7 | 0) & 1 | e << 1
                                        }
                                    else
                                        e = 0;
                                    a = 1612 + (e << 2) | 0;
                                    c[j + (o + 28) >> 2] = e;
                                    c[j + (o + 20) >> 2] = 0;
                                    c[j + (o + 16) >> 2] = 0;
                                    b = c[328] | 0;
                                    d = 1 << e;
                                    if (!(b & d)) {
                                        c[328] = b | d;
                                        c[a >> 2] = h;
                                        c[j + (o + 24) >> 2] = a;
                                        c[j + (o + 12) >> 2] = h;
                                        c[j + (o + 8) >> 2] = h;
                                        break
                                    }
                                    a = c[a >> 2] | 0;
                                    c: do
                                        if ((c[a + 4 >> 2] & -8 | 0) != (i | 0)) {
                                            e = i << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
                                            while (1) {
                                                d = a + 16 + (e >>> 31 << 2) | 0;
                                                b = c[d >> 2] | 0;
                                                if (!b)
                                                    break;
                                                if ((c[b + 4 >> 2] & -8 | 0) == (i | 0)) {
                                                    w = b;
                                                    break c
                                                } else {
                                                    e = e << 1;
                                                    a = b
                                                }
                                            }
                                            if (d >>> 0 < (c[331] | 0) >>> 0)
                                                ja();
                                            else {
                                                c[d >> 2] = h;
                                                c[j + (o + 24) >> 2] = a;
                                                c[j + (o + 12) >> 2] = h;
                                                c[j + (o + 8) >> 2] = h;
                                                break b
                                            }
                                        } else
                                            w = a;
                                    while (0);
                                    a = w + 8 | 0;
                                    b = c[a >> 2] | 0;
                                    L = c[331] | 0;
                                    if (b >>> 0 >= L >>> 0 & w >>> 0 >= L >>> 0) {
                                        c[b + 12 >> 2] = h;
                                        c[a >> 2] = h;
                                        c[j + (o + 8) >> 2] = b;
                                        c[j + (o + 12) >> 2] = w;
                                        c[j + (o + 24) >> 2] = 0;
                                        break
                                    } else
                                        ja()
                                } else {
                                    L = i + o | 0;
                                    c[j + 4 >> 2] = L | 3;
                                    L = j + (L + 4) | 0;
                                    c[L >> 2] = c[L >> 2] | 1
                                }
                            while (0);
                            L = j + 8 | 0;
                            return L | 0
                        }
                    }
                } else
                    o = -1;
            while (0);
            d = c[329] | 0;
            if (d >>> 0 >= o >>> 0) {
                a = d - o | 0;
                b = c[332] | 0;
                if (a >>> 0 > 15) {
                    c[332] = b + o;
                    c[329] = a;
                    c[b + (o + 4) >> 2] = a | 1;
                    c[b + d >> 2] = a;
                    c[b + 4 >> 2] = o | 3
                } else {
                    c[329] = 0;
                    c[332] = 0;
                    c[b + 4 >> 2] = d | 3;
                    L = b + (d + 4) | 0;
                    c[L >> 2] = c[L >> 2] | 1
                }
                L = b + 8 | 0;
                return L | 0
            }
            a = c[330] | 0;
            if (a >>> 0 > o >>> 0) {
                K = a - o | 0;
                c[330] = K;
                L = c[333] | 0;
                c[333] = L + o;
                c[L + (o + 4) >> 2] = K | 1;
                c[L + 4 >> 2] = o | 3;
                L = L + 8 | 0;
                return L | 0
            }
            do
                if (!(c[445] | 0)) {
                    a = sa(30) | 0;
                    if (!(a + -1 & a)) {
                        c[447] = a;
                        c[446] = a;
                        c[448] = -1;
                        c[449] = -1;
                        c[450] = 0;
                        c[438] = 0;
                        c[445] = (na(0) | 0) & -16 ^ 1431655768;
                        break
                    } else
                        ja()
                }
            while (0);
            g = o + 48 | 0;
            f = c[447] | 0;
            h = o + 47 | 0;
            e = f + h | 0;
            f = 0 - f | 0;
            i = e & f;
            if (i >>> 0 <= o >>> 0) {
                L = 0;
                return L | 0
            }
            a = c[437] | 0;
            if ((a | 0) != 0 ? (u = c[435] | 0,
                w = u + i | 0,
            w >>> 0 <= u >>> 0 | w >>> 0 > a >>> 0) : 0) {
                L = 0;
                return L | 0
            }
            d: do
                if (!(c[438] & 4)) {
                    d = c[333] | 0;
                    e: do
                        if (d) {
                            a = 1756;
                            while (1) {
                                b = c[a >> 2] | 0;
                                if (b >>> 0 <= d >>> 0 ? (r = a + 4 | 0,
                                (b + (c[r >> 2] | 0) | 0) >>> 0 > d >>> 0) : 0)
                                    break;
                                a = c[a + 8 >> 2] | 0;
                                if (!a) {
                                    x = 174;
                                    break e
                                }
                            }
                            b = e - (c[330] | 0) & f;
                            if (b >>> 0 < 2147483647) {
                                d = ma(b | 0) | 0;
                                w = (d | 0) == ((c[a >> 2] | 0) + (c[r >> 2] | 0) | 0);
                                a = w ? b : 0;
                                if (w) {
                                    if ((d | 0) != (-1 | 0)) {
                                        r = d;
                                        q = a;
                                        x = 194;
                                        break d
                                    }
                                } else
                                    x = 184
                            } else
                                a = 0
                        } else
                            x = 174;
                    while (0);
                    do
                        if ((x | 0) == 174) {
                            e = ma(0) | 0;
                            if ((e | 0) != (-1 | 0)) {
                                a = e;
                                b = c[446] | 0;
                                d = b + -1 | 0;
                                if (!(d & a))
                                    b = i;
                                else
                                    b = i - a + (d + a & 0 - b) | 0;
                                a = c[435] | 0;
                                d = a + b | 0;
                                if (b >>> 0 > o >>> 0 & b >>> 0 < 2147483647) {
                                    w = c[437] | 0;
                                    if ((w | 0) != 0 ? d >>> 0 <= a >>> 0 | d >>> 0 > w >>> 0 : 0) {
                                        a = 0;
                                        break
                                    }
                                    d = ma(b | 0) | 0;
                                    x = (d | 0) == (e | 0);
                                    a = x ? b : 0;
                                    if (x) {
                                        r = e;
                                        q = a;
                                        x = 194;
                                        break d
                                    } else
                                        x = 184
                                } else
                                    a = 0
                            } else
                                a = 0
                        }
                    while (0);
                    f: do
                        if ((x | 0) == 184) {
                            e = 0 - b | 0;
                            do
                                if (g >>> 0 > b >>> 0 & (b >>> 0 < 2147483647 & (d | 0) != (-1 | 0)) ? (v = c[447] | 0,
                                    v = h - b + v & 0 - v,
                                v >>> 0 < 2147483647) : 0)
                                    if ((ma(v | 0) | 0) == (-1 | 0)) {
                                        ma(e | 0) | 0;
                                        break f
                                    } else {
                                        b = v + b | 0;
                                        break
                                    }
                            while (0);
                            if ((d | 0) != (-1 | 0)) {
                                r = d;
                                q = b;
                                x = 194;
                                break d
                            }
                        }
                    while (0);
                    c[438] = c[438] | 4;
                    x = 191
                } else {
                    a = 0;
                    x = 191
                }
            while (0);
            if ((((x | 0) == 191 ? i >>> 0 < 2147483647 : 0) ? (y = ma(i | 0) | 0,
                z = ma(0) | 0,
            y >>> 0 < z >>> 0 & ((y | 0) != (-1 | 0) & (z | 0) != (-1 | 0))) : 0) ? (A = z - y | 0,
                B = A >>> 0 > (o + 40 | 0) >>> 0,
                B) : 0) {
                r = y;
                q = B ? A : a;
                x = 194
            }
            if ((x | 0) == 194) {
                a = (c[435] | 0) + q | 0;
                c[435] = a;
                if (a >>> 0 > (c[436] | 0) >>> 0)
                    c[436] = a;
                h = c[333] | 0;
                g: do
                    if (h) {
                        f = 1756;
                        while (1) {
                            a = c[f >> 2] | 0;
                            b = f + 4 | 0;
                            d = c[b >> 2] | 0;
                            if ((r | 0) == (a + d | 0)) {
                                x = 204;
                                break
                            }
                            e = c[f + 8 >> 2] | 0;
                            if (!e)
                                break;
                            else
                                f = e
                        }
                        if (((x | 0) == 204 ? (c[f + 12 >> 2] & 8 | 0) == 0 : 0) ? h >>> 0 < r >>> 0 & h >>> 0 >= a >>> 0 : 0) {
                            c[b >> 2] = d + q;
                            L = (c[330] | 0) + q | 0;
                            K = h + 8 | 0;
                            K = (K & 7 | 0) == 0 ? 0 : 0 - K & 7;
                            J = L - K | 0;
                            c[333] = h + K;
                            c[330] = J;
                            c[h + (K + 4) >> 2] = J | 1;
                            c[h + (L + 4) >> 2] = 40;
                            c[334] = c[449];
                            break
                        }
                        a = c[331] | 0;
                        if (r >>> 0 < a >>> 0) {
                            c[331] = r;
                            j = r
                        } else
                            j = a;
                        b = r + q | 0;
                        a = 1756;
                        while (1) {
                            if ((c[a >> 2] | 0) == (b | 0)) {
                                x = 212;
                                break
                            }
                            a = c[a + 8 >> 2] | 0;
                            if (!a) {
                                b = 1756;
                                break
                            }
                        }
                        if ((x | 0) == 212)
                            if (!(c[a + 12 >> 2] & 8)) {
                                c[a >> 2] = r;
                                n = a + 4 | 0;
                                c[n >> 2] = (c[n >> 2] | 0) + q;
                                n = r + 8 | 0;
                                n = (n & 7 | 0) == 0 ? 0 : 0 - n & 7;
                                k = r + (q + 8) | 0;
                                k = (k & 7 | 0) == 0 ? 0 : 0 - k & 7;
                                a = r + (k + q) | 0;
                                m = n + o | 0;
                                p = r + m | 0;
                                l = a - (r + n) - o | 0;
                                c[r + (n + 4) >> 2] = o | 3;
                                h: do
                                    if ((a | 0) != (h | 0)) {
                                        if ((a | 0) == (c[332] | 0)) {
                                            L = (c[329] | 0) + l | 0;
                                            c[329] = L;
                                            c[332] = p;
                                            c[r + (m + 4) >> 2] = L | 1;
                                            c[r + (L + m) >> 2] = L;
                                            break
                                        }
                                        h = q + 4 | 0;
                                        b = c[r + (k + h) >> 2] | 0;
                                        if ((b & 3 | 0) == 1) {
                                            i = b & -8;
                                            f = b >>> 3;
                                            i: do
                                                if (b >>> 0 >= 256) {
                                                    g = c[r + ((k | 24) + q) >> 2] | 0;
                                                    e = c[r + (q + 12 + k) >> 2] | 0;
                                                    do
                                                        if ((e | 0) == (a | 0)) {
                                                            d = k | 16;
                                                            e = r + (d + h) | 0;
                                                            b = c[e >> 2] | 0;
                                                            if (!b) {
                                                                d = r + (d + q) | 0;
                                                                b = c[d >> 2] | 0;
                                                                if (!b) {
                                                                    I = 0;
                                                                    break
                                                                }
                                                            } else
                                                                d = e;
                                                            while (1) {
                                                                e = b + 20 | 0;
                                                                f = c[e >> 2] | 0;
                                                                if (f) {
                                                                    b = f;
                                                                    d = e;
                                                                    continue
                                                                }
                                                                e = b + 16 | 0;
                                                                f = c[e >> 2] | 0;
                                                                if (!f)
                                                                    break;
                                                                else {
                                                                    b = f;
                                                                    d = e
                                                                }
                                                            }
                                                            if (d >>> 0 < j >>> 0)
                                                                ja();
                                                            else {
                                                                c[d >> 2] = 0;
                                                                I = b;
                                                                break
                                                            }
                                                        } else {
                                                            f = c[r + ((k | 8) + q) >> 2] | 0;
                                                            if (f >>> 0 < j >>> 0)
                                                                ja();
                                                            b = f + 12 | 0;
                                                            if ((c[b >> 2] | 0) != (a | 0))
                                                                ja();
                                                            d = e + 8 | 0;
                                                            if ((c[d >> 2] | 0) == (a | 0)) {
                                                                c[b >> 2] = e;
                                                                c[d >> 2] = f;
                                                                I = e;
                                                                break
                                                            } else
                                                                ja()
                                                        }
                                                    while (0);
                                                    if (!g)
                                                        break;
                                                    b = c[r + (q + 28 + k) >> 2] | 0;
                                                    d = 1612 + (b << 2) | 0;
                                                    do
                                                        if ((a | 0) != (c[d >> 2] | 0)) {
                                                            if (g >>> 0 < (c[331] | 0) >>> 0)
                                                                ja();
                                                            b = g + 16 | 0;
                                                            if ((c[b >> 2] | 0) == (a | 0))
                                                                c[b >> 2] = I;
                                                            else
                                                                c[g + 20 >> 2] = I;
                                                            if (!I)
                                                                break i
                                                        } else {
                                                            c[d >> 2] = I;
                                                            if (I)
                                                                break;
                                                            c[328] = c[328] & ~(1 << b);
                                                            break i
                                                        }
                                                    while (0);
                                                    d = c[331] | 0;
                                                    if (I >>> 0 < d >>> 0)
                                                        ja();
                                                    c[I + 24 >> 2] = g;
                                                    a = k | 16;
                                                    b = c[r + (a + q) >> 2] | 0;
                                                    do
                                                        if (b)
                                                            if (b >>> 0 < d >>> 0)
                                                                ja();
                                                            else {
                                                                c[I + 16 >> 2] = b;
                                                                c[b + 24 >> 2] = I;
                                                                break
                                                            }
                                                    while (0);
                                                    a = c[r + (a + h) >> 2] | 0;
                                                    if (!a)
                                                        break;
                                                    if (a >>> 0 < (c[331] | 0) >>> 0)
                                                        ja();
                                                    else {
                                                        c[I + 20 >> 2] = a;
                                                        c[a + 24 >> 2] = I;
                                                        break
                                                    }
                                                } else {
                                                    d = c[r + ((k | 8) + q) >> 2] | 0;
                                                    e = c[r + (q + 12 + k) >> 2] | 0;
                                                    b = 1348 + (f << 1 << 2) | 0;
                                                    do
                                                        if ((d | 0) != (b | 0)) {
                                                            if (d >>> 0 < j >>> 0)
                                                                ja();
                                                            if ((c[d + 12 >> 2] | 0) == (a | 0))
                                                                break;
                                                            ja()
                                                        }
                                                    while (0);
                                                    if ((e | 0) == (d | 0)) {
                                                        c[327] = c[327] & ~(1 << f);
                                                        break
                                                    }
                                                    do
                                                        if ((e | 0) == (b | 0))
                                                            E = e + 8 | 0;
                                                        else {
                                                            if (e >>> 0 < j >>> 0)
                                                                ja();
                                                            b = e + 8 | 0;
                                                            if ((c[b >> 2] | 0) == (a | 0)) {
                                                                E = b;
                                                                break
                                                            }
                                                            ja()
                                                        }
                                                    while (0);
                                                    c[d + 12 >> 2] = e;
                                                    c[E >> 2] = d
                                                }
                                            while (0);
                                            a = r + ((i | k) + q) | 0;
                                            f = i + l | 0
                                        } else
                                            f = l;
                                        a = a + 4 | 0;
                                        c[a >> 2] = c[a >> 2] & -2;
                                        c[r + (m + 4) >> 2] = f | 1;
                                        c[r + (f + m) >> 2] = f;
                                        a = f >>> 3;
                                        if (f >>> 0 < 256) {
                                            b = a << 1;
                                            e = 1348 + (b << 2) | 0;
                                            d = c[327] | 0;
                                            a = 1 << a;
                                            do
                                                if (!(d & a)) {
                                                    c[327] = d | a;
                                                    J = 1348 + (b + 2 << 2) | 0;
                                                    K = e
                                                } else {
                                                    a = 1348 + (b + 2 << 2) | 0;
                                                    b = c[a >> 2] | 0;
                                                    if (b >>> 0 >= (c[331] | 0) >>> 0) {
                                                        J = a;
                                                        K = b;
                                                        break
                                                    }
                                                    ja()
                                                }
                                            while (0);
                                            c[J >> 2] = p;
                                            c[K + 12 >> 2] = p;
                                            c[r + (m + 8) >> 2] = K;
                                            c[r + (m + 12) >> 2] = e;
                                            break
                                        }
                                        a = f >>> 8;
                                        do
                                            if (!a)
                                                e = 0;
                                            else {
                                                if (f >>> 0 > 16777215) {
                                                    e = 31;
                                                    break
                                                }
                                                J = (a + 1048320 | 0) >>> 16 & 8;
                                                K = a << J;
                                                I = (K + 520192 | 0) >>> 16 & 4;
                                                K = K << I;
                                                e = (K + 245760 | 0) >>> 16 & 2;
                                                e = 14 - (I | J | e) + (K << e >>> 15) | 0;
                                                e = f >>> (e + 7 | 0) & 1 | e << 1
                                            }
                                        while (0);
                                        a = 1612 + (e << 2) | 0;
                                        c[r + (m + 28) >> 2] = e;
                                        c[r + (m + 20) >> 2] = 0;
                                        c[r + (m + 16) >> 2] = 0;
                                        b = c[328] | 0;
                                        d = 1 << e;
                                        if (!(b & d)) {
                                            c[328] = b | d;
                                            c[a >> 2] = p;
                                            c[r + (m + 24) >> 2] = a;
                                            c[r + (m + 12) >> 2] = p;
                                            c[r + (m + 8) >> 2] = p;
                                            break
                                        }
                                        a = c[a >> 2] | 0;
                                        j: do
                                            if ((c[a + 4 >> 2] & -8 | 0) != (f | 0)) {
                                                e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
                                                while (1) {
                                                    d = a + 16 + (e >>> 31 << 2) | 0;
                                                    b = c[d >> 2] | 0;
                                                    if (!b)
                                                        break;
                                                    if ((c[b + 4 >> 2] & -8 | 0) == (f | 0)) {
                                                        L = b;
                                                        break j
                                                    } else {
                                                        e = e << 1;
                                                        a = b
                                                    }
                                                }
                                                if (d >>> 0 < (c[331] | 0) >>> 0)
                                                    ja();
                                                else {
                                                    c[d >> 2] = p;
                                                    c[r + (m + 24) >> 2] = a;
                                                    c[r + (m + 12) >> 2] = p;
                                                    c[r + (m + 8) >> 2] = p;
                                                    break h
                                                }
                                            } else
                                                L = a;
                                        while (0);
                                        a = L + 8 | 0;
                                        b = c[a >> 2] | 0;
                                        K = c[331] | 0;
                                        if (b >>> 0 >= K >>> 0 & L >>> 0 >= K >>> 0) {
                                            c[b + 12 >> 2] = p;
                                            c[a >> 2] = p;
                                            c[r + (m + 8) >> 2] = b;
                                            c[r + (m + 12) >> 2] = L;
                                            c[r + (m + 24) >> 2] = 0;
                                            break
                                        } else
                                            ja()
                                    } else {
                                        L = (c[330] | 0) + l | 0;
                                        c[330] = L;
                                        c[333] = p;
                                        c[r + (m + 4) >> 2] = L | 1
                                    }
                                while (0);
                                L = r + (n | 8) | 0;
                                return L | 0
                            } else
                                b = 1756;
                        while (1) {
                            a = c[b >> 2] | 0;
                            if (a >>> 0 <= h >>> 0 ? (C = c[b + 4 >> 2] | 0,
                                D = a + C | 0,
                            D >>> 0 > h >>> 0) : 0)
                                break;
                            b = c[b + 8 >> 2] | 0
                        }
                        b = a + (C + -39) | 0;
                        b = a + (C + -47 + ((b & 7 | 0) == 0 ? 0 : 0 - b & 7)) | 0;
                        f = h + 16 | 0;
                        b = b >>> 0 < f >>> 0 ? h : b;
                        a = b + 8 | 0;
                        d = r + 8 | 0;
                        d = (d & 7 | 0) == 0 ? 0 : 0 - d & 7;
                        L = q + -40 - d | 0;
                        c[333] = r + d;
                        c[330] = L;
                        c[r + (d + 4) >> 2] = L | 1;
                        c[r + (q + -36) >> 2] = 40;
                        c[334] = c[449];
                        d = b + 4 | 0;
                        c[d >> 2] = 27;
                        c[a >> 2] = c[439];
                        c[a + 4 >> 2] = c[440];
                        c[a + 8 >> 2] = c[441];
                        c[a + 12 >> 2] = c[442];
                        c[439] = r;
                        c[440] = q;
                        c[442] = 0;
                        c[441] = a;
                        a = b + 28 | 0;
                        c[a >> 2] = 7;
                        if ((b + 32 | 0) >>> 0 < D >>> 0) {
                            do {
                                L = a;
                                a = a + 4 | 0;
                                c[a >> 2] = 7
                            } while ((L + 8 | 0) >>> 0 < D >>> 0)
                        }
                        if ((b | 0) != (h | 0)) {
                            g = b - h | 0;
                            c[d >> 2] = c[d >> 2] & -2;
                            c[h + 4 >> 2] = g | 1;
                            c[b >> 2] = g;
                            a = g >>> 3;
                            if (g >>> 0 < 256) {
                                b = a << 1;
                                e = 1348 + (b << 2) | 0;
                                d = c[327] | 0;
                                a = 1 << a;
                                if (d & a) {
                                    a = 1348 + (b + 2 << 2) | 0;
                                    b = c[a >> 2] | 0;
                                    if (b >>> 0 < (c[331] | 0) >>> 0)
                                        ja();
                                    else {
                                        F = a;
                                        G = b
                                    }
                                } else {
                                    c[327] = d | a;
                                    F = 1348 + (b + 2 << 2) | 0;
                                    G = e
                                }
                                c[F >> 2] = h;
                                c[G + 12 >> 2] = h;
                                c[h + 8 >> 2] = G;
                                c[h + 12 >> 2] = e;
                                break
                            }
                            a = g >>> 8;
                            if (a)
                                if (g >>> 0 > 16777215)
                                    e = 31;
                                else {
                                    K = (a + 1048320 | 0) >>> 16 & 8;
                                    L = a << K;
                                    J = (L + 520192 | 0) >>> 16 & 4;
                                    L = L << J;
                                    e = (L + 245760 | 0) >>> 16 & 2;
                                    e = 14 - (J | K | e) + (L << e >>> 15) | 0;
                                    e = g >>> (e + 7 | 0) & 1 | e << 1
                                }
                            else
                                e = 0;
                            d = 1612 + (e << 2) | 0;
                            c[h + 28 >> 2] = e;
                            c[h + 20 >> 2] = 0;
                            c[f >> 2] = 0;
                            a = c[328] | 0;
                            b = 1 << e;
                            if (!(a & b)) {
                                c[328] = a | b;
                                c[d >> 2] = h;
                                c[h + 24 >> 2] = d;
                                c[h + 12 >> 2] = h;
                                c[h + 8 >> 2] = h;
                                break
                            }
                            a = c[d >> 2] | 0;
                            k: do
                                if ((c[a + 4 >> 2] & -8 | 0) != (g | 0)) {
                                    e = g << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
                                    while (1) {
                                        d = a + 16 + (e >>> 31 << 2) | 0;
                                        b = c[d >> 2] | 0;
                                        if (!b)
                                            break;
                                        if ((c[b + 4 >> 2] & -8 | 0) == (g | 0)) {
                                            H = b;
                                            break k
                                        } else {
                                            e = e << 1;
                                            a = b
                                        }
                                    }
                                    if (d >>> 0 < (c[331] | 0) >>> 0)
                                        ja();
                                    else {
                                        c[d >> 2] = h;
                                        c[h + 24 >> 2] = a;
                                        c[h + 12 >> 2] = h;
                                        c[h + 8 >> 2] = h;
                                        break g
                                    }
                                } else
                                    H = a;
                            while (0);
                            a = H + 8 | 0;
                            b = c[a >> 2] | 0;
                            L = c[331] | 0;
                            if (b >>> 0 >= L >>> 0 & H >>> 0 >= L >>> 0) {
                                c[b + 12 >> 2] = h;
                                c[a >> 2] = h;
                                c[h + 8 >> 2] = b;
                                c[h + 12 >> 2] = H;
                                c[h + 24 >> 2] = 0;
                                break
                            } else
                                ja()
                        }
                    } else {
                        L = c[331] | 0;
                        if ((L | 0) == 0 | r >>> 0 < L >>> 0)
                            c[331] = r;
                        c[439] = r;
                        c[440] = q;
                        c[442] = 0;
                        c[336] = c[445];
                        c[335] = -1;
                        a = 0;
                        do {
                            L = a << 1;
                            K = 1348 + (L << 2) | 0;
                            c[1348 + (L + 3 << 2) >> 2] = K;
                            c[1348 + (L + 2 << 2) >> 2] = K;
                            a = a + 1 | 0
                        } while ((a | 0) != 32);
                        L = r + 8 | 0;
                        L = (L & 7 | 0) == 0 ? 0 : 0 - L & 7;
                        K = q + -40 - L | 0;
                        c[333] = r + L;
                        c[330] = K;
                        c[r + (L + 4) >> 2] = K | 1;
                        c[r + (q + -36) >> 2] = 40;
                        c[334] = c[449]
                    }
                while (0);
                a = c[330] | 0;
                if (a >>> 0 > o >>> 0) {
                    K = a - o | 0;
                    c[330] = K;
                    L = c[333] | 0;
                    c[333] = L + o;
                    c[L + (o + 4) >> 2] = K | 1;
                    c[L + 4 >> 2] = o | 3;
                    L = L + 8 | 0;
                    return L | 0
                }
            }
            c[(Ua() | 0) >> 2] = 12;
            L = 0;
            return L | 0
        }

        function ub(a) {
            a = a | 0;
            var b = 0
                , d = 0
                , e = 0
                , f = 0
                , g = 0
                , h = 0
                , i = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0
                , n = 0
                , o = 0
                , p = 0
                , q = 0
                , r = 0
                , s = 0
                , t = 0
                , u = 0;
            if (!a)
                return;
            b = a + -8 | 0;
            i = c[331] | 0;
            if (b >>> 0 < i >>> 0)
                ja();
            d = c[a + -4 >> 2] | 0;
            e = d & 3;
            if ((e | 0) == 1)
                ja();
            o = d & -8;
            q = a + (o + -8) | 0;
            do
                if (!(d & 1)) {
                    b = c[b >> 2] | 0;
                    if (!e)
                        return;
                    j = -8 - b | 0;
                    l = a + j | 0;
                    m = b + o | 0;
                    if (l >>> 0 < i >>> 0)
                        ja();
                    if ((l | 0) == (c[332] | 0)) {
                        b = a + (o + -4) | 0;
                        d = c[b >> 2] | 0;
                        if ((d & 3 | 0) != 3) {
                            u = l;
                            g = m;
                            break
                        }
                        c[329] = m;
                        c[b >> 2] = d & -2;
                        c[a + (j + 4) >> 2] = m | 1;
                        c[q >> 2] = m;
                        return
                    }
                    f = b >>> 3;
                    if (b >>> 0 < 256) {
                        e = c[a + (j + 8) >> 2] | 0;
                        d = c[a + (j + 12) >> 2] | 0;
                        b = 1348 + (f << 1 << 2) | 0;
                        if ((e | 0) != (b | 0)) {
                            if (e >>> 0 < i >>> 0)
                                ja();
                            if ((c[e + 12 >> 2] | 0) != (l | 0))
                                ja()
                        }
                        if ((d | 0) == (e | 0)) {
                            c[327] = c[327] & ~(1 << f);
                            u = l;
                            g = m;
                            break
                        }
                        if ((d | 0) != (b | 0)) {
                            if (d >>> 0 < i >>> 0)
                                ja();
                            b = d + 8 | 0;
                            if ((c[b >> 2] | 0) == (l | 0))
                                h = b;
                            else
                                ja()
                        } else
                            h = d + 8 | 0;
                        c[e + 12 >> 2] = d;
                        c[h >> 2] = e;
                        u = l;
                        g = m;
                        break
                    }
                    h = c[a + (j + 24) >> 2] | 0;
                    e = c[a + (j + 12) >> 2] | 0;
                    do
                        if ((e | 0) == (l | 0)) {
                            d = a + (j + 20) | 0;
                            b = c[d >> 2] | 0;
                            if (!b) {
                                d = a + (j + 16) | 0;
                                b = c[d >> 2] | 0;
                                if (!b) {
                                    k = 0;
                                    break
                                }
                            }
                            while (1) {
                                e = b + 20 | 0;
                                f = c[e >> 2] | 0;
                                if (f) {
                                    b = f;
                                    d = e;
                                    continue
                                }
                                e = b + 16 | 0;
                                f = c[e >> 2] | 0;
                                if (!f)
                                    break;
                                else {
                                    b = f;
                                    d = e
                                }
                            }
                            if (d >>> 0 < i >>> 0)
                                ja();
                            else {
                                c[d >> 2] = 0;
                                k = b;
                                break
                            }
                        } else {
                            f = c[a + (j + 8) >> 2] | 0;
                            if (f >>> 0 < i >>> 0)
                                ja();
                            b = f + 12 | 0;
                            if ((c[b >> 2] | 0) != (l | 0))
                                ja();
                            d = e + 8 | 0;
                            if ((c[d >> 2] | 0) == (l | 0)) {
                                c[b >> 2] = e;
                                c[d >> 2] = f;
                                k = e;
                                break
                            } else
                                ja()
                        }
                    while (0);
                    if (h) {
                        b = c[a + (j + 28) >> 2] | 0;
                        d = 1612 + (b << 2) | 0;
                        if ((l | 0) == (c[d >> 2] | 0)) {
                            c[d >> 2] = k;
                            if (!k) {
                                c[328] = c[328] & ~(1 << b);
                                u = l;
                                g = m;
                                break
                            }
                        } else {
                            if (h >>> 0 < (c[331] | 0) >>> 0)
                                ja();
                            b = h + 16 | 0;
                            if ((c[b >> 2] | 0) == (l | 0))
                                c[b >> 2] = k;
                            else
                                c[h + 20 >> 2] = k;
                            if (!k) {
                                u = l;
                                g = m;
                                break
                            }
                        }
                        d = c[331] | 0;
                        if (k >>> 0 < d >>> 0)
                            ja();
                        c[k + 24 >> 2] = h;
                        b = c[a + (j + 16) >> 2] | 0;
                        do
                            if (b)
                                if (b >>> 0 < d >>> 0)
                                    ja();
                                else {
                                    c[k + 16 >> 2] = b;
                                    c[b + 24 >> 2] = k;
                                    break
                                }
                        while (0);
                        b = c[a + (j + 20) >> 2] | 0;
                        if (b)
                            if (b >>> 0 < (c[331] | 0) >>> 0)
                                ja();
                            else {
                                c[k + 20 >> 2] = b;
                                c[b + 24 >> 2] = k;
                                u = l;
                                g = m;
                                break
                            }
                        else {
                            u = l;
                            g = m
                        }
                    } else {
                        u = l;
                        g = m
                    }
                } else {
                    u = b;
                    g = o
                }
            while (0);
            if (u >>> 0 >= q >>> 0)
                ja();
            b = a + (o + -4) | 0;
            d = c[b >> 2] | 0;
            if (!(d & 1))
                ja();
            if (!(d & 2)) {
                if ((q | 0) == (c[333] | 0)) {
                    t = (c[330] | 0) + g | 0;
                    c[330] = t;
                    c[333] = u;
                    c[u + 4 >> 2] = t | 1;
                    if ((u | 0) != (c[332] | 0))
                        return;
                    c[332] = 0;
                    c[329] = 0;
                    return
                }
                if ((q | 0) == (c[332] | 0)) {
                    t = (c[329] | 0) + g | 0;
                    c[329] = t;
                    c[332] = u;
                    c[u + 4 >> 2] = t | 1;
                    c[u + t >> 2] = t;
                    return
                }
                g = (d & -8) + g | 0;
                f = d >>> 3;
                do
                    if (d >>> 0 >= 256) {
                        h = c[a + (o + 16) >> 2] | 0;
                        b = c[a + (o | 4) >> 2] | 0;
                        do
                            if ((b | 0) == (q | 0)) {
                                d = a + (o + 12) | 0;
                                b = c[d >> 2] | 0;
                                if (!b) {
                                    d = a + (o + 8) | 0;
                                    b = c[d >> 2] | 0;
                                    if (!b) {
                                        p = 0;
                                        break
                                    }
                                }
                                while (1) {
                                    e = b + 20 | 0;
                                    f = c[e >> 2] | 0;
                                    if (f) {
                                        b = f;
                                        d = e;
                                        continue
                                    }
                                    e = b + 16 | 0;
                                    f = c[e >> 2] | 0;
                                    if (!f)
                                        break;
                                    else {
                                        b = f;
                                        d = e
                                    }
                                }
                                if (d >>> 0 < (c[331] | 0) >>> 0)
                                    ja();
                                else {
                                    c[d >> 2] = 0;
                                    p = b;
                                    break
                                }
                            } else {
                                d = c[a + o >> 2] | 0;
                                if (d >>> 0 < (c[331] | 0) >>> 0)
                                    ja();
                                e = d + 12 | 0;
                                if ((c[e >> 2] | 0) != (q | 0))
                                    ja();
                                f = b + 8 | 0;
                                if ((c[f >> 2] | 0) == (q | 0)) {
                                    c[e >> 2] = b;
                                    c[f >> 2] = d;
                                    p = b;
                                    break
                                } else
                                    ja()
                            }
                        while (0);
                        if (h) {
                            b = c[a + (o + 20) >> 2] | 0;
                            d = 1612 + (b << 2) | 0;
                            if ((q | 0) == (c[d >> 2] | 0)) {
                                c[d >> 2] = p;
                                if (!p) {
                                    c[328] = c[328] & ~(1 << b);
                                    break
                                }
                            } else {
                                if (h >>> 0 < (c[331] | 0) >>> 0)
                                    ja();
                                b = h + 16 | 0;
                                if ((c[b >> 2] | 0) == (q | 0))
                                    c[b >> 2] = p;
                                else
                                    c[h + 20 >> 2] = p;
                                if (!p)
                                    break
                            }
                            d = c[331] | 0;
                            if (p >>> 0 < d >>> 0)
                                ja();
                            c[p + 24 >> 2] = h;
                            b = c[a + (o + 8) >> 2] | 0;
                            do
                                if (b)
                                    if (b >>> 0 < d >>> 0)
                                        ja();
                                    else {
                                        c[p + 16 >> 2] = b;
                                        c[b + 24 >> 2] = p;
                                        break
                                    }
                            while (0);
                            b = c[a + (o + 12) >> 2] | 0;
                            if (b)
                                if (b >>> 0 < (c[331] | 0) >>> 0)
                                    ja();
                                else {
                                    c[p + 20 >> 2] = b;
                                    c[b + 24 >> 2] = p;
                                    break
                                }
                        }
                    } else {
                        e = c[a + o >> 2] | 0;
                        d = c[a + (o | 4) >> 2] | 0;
                        b = 1348 + (f << 1 << 2) | 0;
                        if ((e | 0) != (b | 0)) {
                            if (e >>> 0 < (c[331] | 0) >>> 0)
                                ja();
                            if ((c[e + 12 >> 2] | 0) != (q | 0))
                                ja()
                        }
                        if ((d | 0) == (e | 0)) {
                            c[327] = c[327] & ~(1 << f);
                            break
                        }
                        if ((d | 0) != (b | 0)) {
                            if (d >>> 0 < (c[331] | 0) >>> 0)
                                ja();
                            b = d + 8 | 0;
                            if ((c[b >> 2] | 0) == (q | 0))
                                n = b;
                            else
                                ja()
                        } else
                            n = d + 8 | 0;
                        c[e + 12 >> 2] = d;
                        c[n >> 2] = e
                    }
                while (0);
                c[u + 4 >> 2] = g | 1;
                c[u + g >> 2] = g;
                if ((u | 0) == (c[332] | 0)) {
                    c[329] = g;
                    return
                }
            } else {
                c[b >> 2] = d & -2;
                c[u + 4 >> 2] = g | 1;
                c[u + g >> 2] = g
            }
            b = g >>> 3;
            if (g >>> 0 < 256) {
                d = b << 1;
                f = 1348 + (d << 2) | 0;
                e = c[327] | 0;
                b = 1 << b;
                if (e & b) {
                    b = 1348 + (d + 2 << 2) | 0;
                    d = c[b >> 2] | 0;
                    if (d >>> 0 < (c[331] | 0) >>> 0)
                        ja();
                    else {
                        r = b;
                        s = d
                    }
                } else {
                    c[327] = e | b;
                    r = 1348 + (d + 2 << 2) | 0;
                    s = f
                }
                c[r >> 2] = u;
                c[s + 12 >> 2] = u;
                c[u + 8 >> 2] = s;
                c[u + 12 >> 2] = f;
                return
            }
            b = g >>> 8;
            if (b)
                if (g >>> 0 > 16777215)
                    f = 31;
                else {
                    r = (b + 1048320 | 0) >>> 16 & 8;
                    s = b << r;
                    q = (s + 520192 | 0) >>> 16 & 4;
                    s = s << q;
                    f = (s + 245760 | 0) >>> 16 & 2;
                    f = 14 - (q | r | f) + (s << f >>> 15) | 0;
                    f = g >>> (f + 7 | 0) & 1 | f << 1
                }
            else
                f = 0;
            b = 1612 + (f << 2) | 0;
            c[u + 28 >> 2] = f;
            c[u + 20 >> 2] = 0;
            c[u + 16 >> 2] = 0;
            d = c[328] | 0;
            e = 1 << f;
            a: do
                if (d & e) {
                    b = c[b >> 2] | 0;
                    b: do
                        if ((c[b + 4 >> 2] & -8 | 0) != (g | 0)) {
                            f = g << ((f | 0) == 31 ? 0 : 25 - (f >>> 1) | 0);
                            while (1) {
                                e = b + 16 + (f >>> 31 << 2) | 0;
                                d = c[e >> 2] | 0;
                                if (!d)
                                    break;
                                if ((c[d + 4 >> 2] & -8 | 0) == (g | 0)) {
                                    t = d;
                                    break b
                                } else {
                                    f = f << 1;
                                    b = d
                                }
                            }
                            if (e >>> 0 < (c[331] | 0) >>> 0)
                                ja();
                            else {
                                c[e >> 2] = u;
                                c[u + 24 >> 2] = b;
                                c[u + 12 >> 2] = u;
                                c[u + 8 >> 2] = u;
                                break a
                            }
                        } else
                            t = b;
                    while (0);
                    b = t + 8 | 0;
                    d = c[b >> 2] | 0;
                    s = c[331] | 0;
                    if (d >>> 0 >= s >>> 0 & t >>> 0 >= s >>> 0) {
                        c[d + 12 >> 2] = u;
                        c[b >> 2] = u;
                        c[u + 8 >> 2] = d;
                        c[u + 12 >> 2] = t;
                        c[u + 24 >> 2] = 0;
                        break
                    } else
                        ja()
                } else {
                    c[328] = d | e;
                    c[b >> 2] = u;
                    c[u + 24 >> 2] = b;
                    c[u + 12 >> 2] = u;
                    c[u + 8 >> 2] = u
                }
            while (0);
            u = (c[335] | 0) + -1 | 0;
            c[335] = u;
            if (!u)
                b = 1764;
            else
                return;
            while (1) {
                b = c[b >> 2] | 0;
                if (!b)
                    break;
                else
                    b = b + 8 | 0
            }
            c[335] = -1;
            return
        }

        function vb() {
        }

        function wb(a, b, c) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            if ((c | 0) < 32) {
                C = b >>> c;
                return a >>> c | (b & (1 << c) - 1) << 32 - c
            }
            C = 0;
            return b >>> c - 32 | 0
        }

        function xb(b, d, e) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0
                , h = 0
                , i = 0;
            f = b + e | 0;
            if ((e | 0) >= 20) {
                d = d & 255;
                h = b & 3;
                i = d | d << 8 | d << 16 | d << 24;
                g = f & ~3;
                if (h) {
                    h = b + 4 - h | 0;
                    while ((b | 0) < (h | 0)) {
                        a[b >> 0] = d;
                        b = b + 1 | 0
                    }
                }
                while ((b | 0) < (g | 0)) {
                    c[b >> 2] = i;
                    b = b + 4 | 0
                }
            }
            while ((b | 0) < (f | 0)) {
                a[b >> 0] = d;
                b = b + 1 | 0
            }
            return b - e | 0
        }

        function yb(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
            return (C = d,
            a - c >>> 0 | 0) | 0
        }

        function zb(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            c = a + c >>> 0;
            return (C = b + d + (c >>> 0 < a >>> 0 | 0) >>> 0,
            c | 0) | 0
        }

        function Ab(a, b, c) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            if ((c | 0) < 32) {
                C = b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c;
                return a << c
            }
            C = a << c - 32;
            return 0
        }

        function Bb(b, d, e) {
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0;
            if ((e | 0) >= 4096)
                return pa(b | 0, d | 0, e | 0) | 0;
            f = b | 0;
            if ((b & 3) == (d & 3)) {
                while (b & 3) {
                    if (!e)
                        return f | 0;
                    a[b >> 0] = a[d >> 0] | 0;
                    b = b + 1 | 0;
                    d = d + 1 | 0;
                    e = e - 1 | 0
                }
                while ((e | 0) >= 4) {
                    c[b >> 2] = c[d >> 2];
                    b = b + 4 | 0;
                    d = d + 4 | 0;
                    e = e - 4 | 0
                }
            }
            while ((e | 0) > 0) {
                a[b >> 0] = a[d >> 0] | 0;
                b = b + 1 | 0;
                d = d + 1 | 0;
                e = e - 1 | 0
            }
            return f | 0
        }

        function Cb(a, b, c) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            if ((c | 0) < 32) {
                C = b >> c;
                return a >>> c | (b & (1 << c) - 1) << 32 - c
            }
            C = (b | 0) < 0 ? -1 : 0;
            return b >> c - 32 | 0
        }

        function Db(b) {
            b = b | 0;
            var c = 0;
            c = a[m + (b & 255) >> 0] | 0;
            if ((c | 0) < 8)
                return c | 0;
            c = a[m + (b >> 8 & 255) >> 0] | 0;
            if ((c | 0) < 8)
                return c + 8 | 0;
            c = a[m + (b >> 16 & 255) >> 0] | 0;
            if ((c | 0) < 8)
                return c + 16 | 0;
            return (a[m + (b >>> 24) >> 0] | 0) + 24 | 0
        }

        function Eb(a, b) {
            a = a | 0;
            b = b | 0;
            var c = 0
                , d = 0
                , e = 0
                , f = 0;
            f = a & 65535;
            e = b & 65535;
            c = _(e, f) | 0;
            d = a >>> 16;
            a = (c >>> 16) + (_(e, d) | 0) | 0;
            e = b >>> 16;
            b = _(e, f) | 0;
            return (C = (a >>> 16) + (_(e, d) | 0) + (((a & 65535) + b | 0) >>> 16) | 0,
            a + b << 16 | c & 65535 | 0) | 0
        }

        function Fb(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            var e = 0
                , f = 0
                , g = 0
                , h = 0
                , i = 0
                , j = 0;
            j = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
            i = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
            f = d >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
            e = ((d | 0) < 0 ? -1 : 0) >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
            h = yb(j ^ a, i ^ b, j, i) | 0;
            g = C;
            a = f ^ j;
            b = e ^ i;
            return yb((Kb(h, g, yb(f ^ c, e ^ d, f, e) | 0, C, 0) | 0) ^ a, C ^ b, a, b) | 0
        }

        function Gb(a, b, d, e) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0
                , h = 0
                , j = 0
                , k = 0
                , l = 0;
            f = i;
            i = i + 16 | 0;
            j = f | 0;
            h = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
            g = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
            l = e >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
            k = ((e | 0) < 0 ? -1 : 0) >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
            a = yb(h ^ a, g ^ b, h, g) | 0;
            b = C;
            Kb(a, b, yb(l ^ d, k ^ e, l, k) | 0, C, j) | 0;
            e = yb(c[j >> 2] ^ h, c[j + 4 >> 2] ^ g, h, g) | 0;
            d = C;
            i = f;
            return (C = d,
                e) | 0
        }

        function Hb(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            var e = 0
                , f = 0;
            e = a;
            f = c;
            c = Eb(e, f) | 0;
            a = C;
            return (C = (_(b, f) | 0) + (_(d, e) | 0) + a | a & 0,
            c | 0 | 0) | 0
        }

        function Ib(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            return Kb(a, b, c, d, 0) | 0
        }

        function Jb(a, b, d, e) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            e = e | 0;
            var f = 0
                , g = 0;
            g = i;
            i = i + 16 | 0;
            f = g | 0;
            Kb(a, b, d, e, f) | 0;
            i = g;
            return (C = c[f + 4 >> 2] | 0,
            c[f >> 2] | 0) | 0
        }

        function Kb(a, b, d, e, f) {
            a = a | 0;
            b = b | 0;
            d = d | 0;
            e = e | 0;
            f = f | 0;
            var g = 0
                , h = 0
                , i = 0
                , j = 0
                , k = 0
                , l = 0
                , m = 0
                , n = 0
                , o = 0
                , p = 0;
            l = a;
            j = b;
            k = j;
            h = d;
            n = e;
            i = n;
            if (!k) {
                g = (f | 0) != 0;
                if (!i) {
                    if (g) {
                        c[f >> 2] = (l >>> 0) % (h >>> 0);
                        c[f + 4 >> 2] = 0
                    }
                    n = 0;
                    f = (l >>> 0) / (h >>> 0) >>> 0;
                    return (C = n,
                        f) | 0
                } else {
                    if (!g) {
                        n = 0;
                        f = 0;
                        return (C = n,
                            f) | 0
                    }
                    c[f >> 2] = a | 0;
                    c[f + 4 >> 2] = b & 0;
                    n = 0;
                    f = 0;
                    return (C = n,
                        f) | 0
                }
            }
            g = (i | 0) == 0;
            do
                if (h) {
                    if (!g) {
                        g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
                        if (g >>> 0 <= 31) {
                            m = g + 1 | 0;
                            i = 31 - g | 0;
                            b = g - 31 >> 31;
                            h = m;
                            a = l >>> (m >>> 0) & b | k << i;
                            b = k >>> (m >>> 0) & b;
                            g = 0;
                            i = l << i;
                            break
                        }
                        if (!f) {
                            n = 0;
                            f = 0;
                            return (C = n,
                                f) | 0
                        }
                        c[f >> 2] = a | 0;
                        c[f + 4 >> 2] = j | b & 0;
                        n = 0;
                        f = 0;
                        return (C = n,
                            f) | 0
                    }
                    g = h - 1 | 0;
                    if (g & h) {
                        i = (aa(h | 0) | 0) + 33 - (aa(k | 0) | 0) | 0;
                        p = 64 - i | 0;
                        m = 32 - i | 0;
                        j = m >> 31;
                        o = i - 32 | 0;
                        b = o >> 31;
                        h = i;
                        a = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & b;
                        b = b & k >>> (i >>> 0);
                        g = l << p & j;
                        i = (k << p | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
                        break
                    }
                    if (f) {
                        c[f >> 2] = g & l;
                        c[f + 4 >> 2] = 0
                    }
                    if ((h | 0) == 1) {
                        o = j | b & 0;
                        p = a | 0 | 0;
                        return (C = o,
                            p) | 0
                    } else {
                        p = Db(h | 0) | 0;
                        o = k >>> (p >>> 0) | 0;
                        p = k << 32 - p | l >>> (p >>> 0) | 0;
                        return (C = o,
                            p) | 0
                    }
                } else {
                    if (g) {
                        if (f) {
                            c[f >> 2] = (k >>> 0) % (h >>> 0);
                            c[f + 4 >> 2] = 0
                        }
                        o = 0;
                        p = (k >>> 0) / (h >>> 0) >>> 0;
                        return (C = o,
                            p) | 0
                    }
                    if (!l) {
                        if (f) {
                            c[f >> 2] = 0;
                            c[f + 4 >> 2] = (k >>> 0) % (i >>> 0)
                        }
                        o = 0;
                        p = (k >>> 0) / (i >>> 0) >>> 0;
                        return (C = o,
                            p) | 0
                    }
                    g = i - 1 | 0;
                    if (!(g & i)) {
                        if (f) {
                            c[f >> 2] = a | 0;
                            c[f + 4 >> 2] = g & k | b & 0
                        }
                        o = 0;
                        p = k >>> ((Db(i | 0) | 0) >>> 0);
                        return (C = o,
                            p) | 0
                    }
                    g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
                    if (g >>> 0 <= 30) {
                        b = g + 1 | 0;
                        i = 31 - g | 0;
                        h = b;
                        a = k << i | l >>> (b >>> 0);
                        b = k >>> (b >>> 0);
                        g = 0;
                        i = l << i;
                        break
                    }
                    if (!f) {
                        o = 0;
                        p = 0;
                        return (C = o,
                            p) | 0
                    }
                    c[f >> 2] = a | 0;
                    c[f + 4 >> 2] = j | b & 0;
                    o = 0;
                    p = 0;
                    return (C = o,
                        p) | 0
                }
            while (0);
            if (!h) {
                k = i;
                j = 0;
                i = 0
            } else {
                m = d | 0 | 0;
                l = n | e & 0;
                k = zb(m | 0, l | 0, -1, -1) | 0;
                d = C;
                j = i;
                i = 0;
                do {
                    e = j;
                    j = g >>> 31 | j << 1;
                    g = i | g << 1;
                    e = a << 1 | e >>> 31 | 0;
                    n = a >>> 31 | b << 1 | 0;
                    yb(k, d, e, n) | 0;
                    p = C;
                    o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
                    i = o & 1;
                    a = yb(e, n, o & m, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l) | 0;
                    b = C;
                    h = h - 1 | 0
                } while ((h | 0) != 0);
                k = j;
                j = 0
            }
            h = 0;
            if (f) {
                c[f >> 2] = a;
                c[f + 4 >> 2] = b
            }
            o = (g | 0) >>> 31 | (k | h) << 1 | (h << 1 | g >>> 31) & 0 | j;
            p = (g << 1 | 0 >>> 31) & -2 | i;
            return (C = o,
                p) | 0
        }

        function Lb(a, b) {
            a = a | 0;
            b = b | 0;
            return va[a & 1](b | 0) | 0
        }

        function Mb(a, b, c, d) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            d = d | 0;
            return wa[a & 7](b | 0, c | 0, d | 0) | 0
        }

        function Nb(a, b) {
            a = a | 0;
            b = b | 0;
            xa[a & 1](b | 0)
        }

        function Ob(a) {
            a = a | 0;
            ba(0);
            return 0
        }

        function Pb(a, b, c) {
            a = a | 0;
            b = b | 0;
            c = c | 0;
            ba(1);
            return 0
        }

        function Qb(a) {
            a = a | 0;
            ba(2)
        }

        var va = [Ob, eb];
        var wa = [Pb, pb, hb, fb, gb, Pb, Pb, Pb];
        var xa = [Qb, ob];
        return {
            _i64Subtract: yb,
            _free: ub,
            _i64Add: zb,
            _mixfp: Sa,
            _memset: xb,
            _malloc: tb,
            _bitshift64Lshr: wb,
            _memcpy: Bb,
            _authEncrypt: Ra,
            _bitshift64Shl: Ab,
            runPostSets: vb,
            stackAlloc: ya,
            stackSave: za,
            stackRestore: Aa,
            establishStackSpace: Ba,
            setThrew: Ca,
            setTempRet0: Fa,
            getTempRet0: Ga,
            dynCall_ii: Lb,
            dynCall_iiii: Mb,
            dynCall_vi: Nb
        }
    }(d.L, d.M, buffer)
        , Na = d._i64Subtract = Z._i64Subtract
        , P = d._free = Z._free;
    d.runPostSets = Z.runPostSets;
    var Oa = d._i64Add = Z._i64Add;
    d._mixfp = Z._mixfp;
    var Ma = d._memset = Z._memset
        , N = d._malloc = Z._malloc;
    d._authEncrypt = Z._authEncrypt;
    var Ra = d._memcpy = Z._memcpy
        , La = d._bitshift64Lshr = Z._bitshift64Lshr
        , Qa = d._bitshift64Shl = Z._bitshift64Shl;
    d.dynCall_ii = Z.dynCall_ii;
    d.dynCall_iiii = Z.dynCall_iiii;
    d.dynCall_vi = Z.dynCall_vi;
    y.q = Z.stackAlloc;
    y.J = Z.stackSave;
    y.I = Z.stackRestore;
    y.$ = Z.establishStackSpace;
    y.U = Z.setTempRet0;
    y.Q = Z.getTempRet0;

    function w(a) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + a + ")";
        this.status = a
    }

    w.prototype = Error();
    w.prototype.constructor = w;
    var Wa = null;
    d.callMain = d.Y = function (a) {
        function b() {
            for (var a = 0; 3 > a; a++)
                e.push(0)
        }

        assert(!0, "AS");
        assert(0 == Ea.length, "AS");
        a = a || [];
        U || (U = !0,
            R(Fa));
        var c = a.length + 1
            , e = [M(Ja(d.thisProgram), "i8", 0)];
        b();
        for (var g = 0; g < c - 1; g += 1)
            e.push(M(Ja(a[g]), "i8", 0)),
                b();
        e.push(0);
        e = M(e, "i32", 0);
        try {
            var k = d._main(c, e, 0);
            Xa(k, !0)
        } catch (l) {
            if (!(l instanceof w))
                if ("SimulateInfiniteLoop" == l)
                    d.noExitRuntime = !0;
                else
                    throw "T";
        } finally {
        }
    }
    ;

    function Ya(a) {
        function b() {
            if (!d.calledRun && (d.calledRun = !0,
                !D)) {
                U || (U = !0,
                    R(Fa));
                R(Ga);
                if (d.onRuntimeInitialized)
                    d.onRuntimeInitialized();
                d._main && Za && d.callMain(a);
                if (d.postRun)
                    for ("function" == typeof d.postRun && (d.postRun = [d.postRun]); d.postRun.length;) {
                        var b = d.postRun.shift();
                        Ha.unshift(b)
                    }
                R(Ha)
            }
        }

        a = a || d.arguments;
        null === Wa && (Wa = Date.now());
        if (d.preRun)
            for ("function" == typeof d.preRun && (d.preRun = [d.preRun]); d.preRun.length;)
                Ia();
        R(Ea);
        d.calledRun || (d.setStatus ? (d.setStatus("Running..."),
            setTimeout(function () {
                setTimeout(function () {
                    d.setStatus("")
                }, 1);
                b()
            }, 1)) : b())
    }

    d.run = d.run = Ya;

    function Xa(a, b) {
        if (!b || !d.noExitRuntime) {
            if (!d.noExitRuntime && (D = !0,
                x = void 0,
                R(T),
                d.onExit))
                d.onExit(a);
            ba ? (process.stdout.once("drain", function () {
                process.exit(a)
            }),
                console.log("C"),
                setTimeout(function () {
                    process.exit(a)
                }, 500)) : ca && "function" === typeof quit && quit(a);
            throw "T";
        }
    }

    d.exit = d.exit = Xa;
    var $a = [];

    function C(a) {
        void 0 !== a ? (d.print(a),
            d.C(a),
            a = JSON.stringify(a)) : a = "";
        D = !0;
        var b = "abort(" + a + ") at " + ua() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
        $a && $a.forEach(function (c) {
            b = c(b, a)
        });
        throw "T";
    }

    d.abort = d.abort = C;
    if (d.preInit)
        for ("function" == typeof d.preInit && (d.preInit = [d.preInit]); 0 < d.preInit.length;)
            d.preInit.pop()();
    var Za = !0;
    d.noInitialRun && (Za = !1);
    Ya();
    return Module
}
;
e = window._bfp().cwrap("mixfp", "string", ["string"])

function sfp(token) {
    return encodeURIComponent(e(token))
}

console.log(sfp('123'))