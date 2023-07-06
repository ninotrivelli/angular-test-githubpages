"use strict";
(self.webpackChunkbases_angular = self.webpackChunkbases_angular || []).push([
  [179],
  {
    833: () => {
      function ee(e) {
        return "function" == typeof e;
      }
      function io(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Si = io(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function so(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ht {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ee(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Si ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  qd(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Si ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Si(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) qd(t);
            else {
              if (t instanceof ht) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && so(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && so(n, t), t instanceof ht && t._removeParent(this);
        }
      }
      ht.EMPTY = (() => {
        const e = new ht();
        return (e.closed = !0), e;
      })();
      const zd = ht.EMPTY;
      function Wd(e) {
        return (
          e instanceof ht ||
          (e && "closed" in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        );
      }
      function qd(e) {
        ee(e) ? e() : e.unsubscribe();
      }
      const kn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Mi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Mi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Mi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Zd(e) {
        Mi.setTimeout(() => {
          const { onUnhandledError: t } = kn;
          if (!t) throw e;
          t(e);
        });
      }
      function Yd() {}
      const RC = ja("C", void 0, void 0);
      function ja(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Ln = null;
      function Ii(e) {
        if (kn.useDeprecatedSynchronousErrorHandling) {
          const t = !Ln;
          if ((t && (Ln = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Ln;
            if (((Ln = null), n)) throw r;
          }
        } else e();
      }
      class $a extends ht {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Wd(t) && t.add(this))
              : (this.destination = LC);
        }
        static create(t, n, r) {
          return new ao(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ua(
                (function xC(e) {
                  return ja("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ua(
                (function NC(e) {
                  return ja("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ua(RC, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const OC = Function.prototype.bind;
      function Ba(e, t) {
        return OC.call(e, t);
      }
      class PC {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ai(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ai(r);
            }
          else Ai(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ai(n);
            }
        }
      }
      class ao extends $a {
        constructor(t, n, r) {
          let o;
          if ((super(), ee(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && kn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Ba(t.next, i),
                  error: t.error && Ba(t.error, i),
                  complete: t.complete && Ba(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new PC(o);
        }
      }
      function Ai(e) {
        kn.useDeprecatedSynchronousErrorHandling
          ? (function FC(e) {
              kn.useDeprecatedSynchronousErrorHandling &&
                Ln &&
                ((Ln.errorThrown = !0), (Ln.error = e));
            })(e)
          : Zd(e);
      }
      function Ua(e, t) {
        const { onStoppedNotification: n } = kn;
        n && Mi.setTimeout(() => n(e, t));
      }
      const LC = {
          closed: !0,
          next: Yd,
          error: function kC(e) {
            throw e;
          },
          complete: Yd,
        },
        Ha =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Vn(e) {
        return e;
      }
      function Qd(e) {
        return 0 === e.length
          ? Vn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let ye = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function $C(e) {
              return (
                (e && e instanceof $a) ||
                ((function jC(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete);
                })(e) &&
                  Wd(e))
              );
            })(n)
              ? n
              : new ao(n, r, o);
            return (
              Ii(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Kd(r))((o, i) => {
              const s = new ao({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ha]() {
            return this;
          }
          pipe(...n) {
            return Qd(n)(this);
          }
          toPromise(n) {
            return new (n = Kd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Kd(e) {
        var t;
        return null !== (t = e ?? kn.Promise) && void 0 !== t ? t : Promise;
      }
      const BC = io(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Xt = (() => {
        class e extends ye {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Xd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new BC();
          }
          next(n) {
            Ii(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Ii(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ii(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? zd
              : ((this.currentObservers = null),
                i.push(n),
                new ht(() => {
                  (this.currentObservers = null), so(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ye();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Xd(t, n)), e;
      })();
      class Xd extends Xt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : zd;
        }
      }
      function Jd(e) {
        return ee(e?.lift);
      }
      function Ie(e) {
        return (t) => {
          if (Jd(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function we(e, t, n, r, o) {
        return new UC(e, t, n, r, o);
      }
      class UC extends $a {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function G(e, t) {
        return Ie((n, r) => {
          let o = 0;
          n.subscribe(
            we(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function _n(e) {
        return this instanceof _n ? ((this.v = e), this) : new _n(e);
      }
      function rf(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function qa(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const sf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function af(e) {
        return ee(e?.then);
      }
      function uf(e) {
        return ee(e[Ha]);
      }
      function lf(e) {
        return Symbol.asyncIterator && ee(e?.[Symbol.asyncIterator]);
      }
      function cf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const df = (function cw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function ff(e) {
        return ee(e?.[df]);
      }
      function hf(e) {
        return (function nf(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof _n
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield _n(n.read());
              if (o) return yield _n(void 0);
              yield yield _n(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function pf(e) {
        return ee(e?.getReader);
      }
      function pt(e) {
        if (e instanceof ye) return e;
        if (null != e) {
          if (uf(e))
            return (function dw(e) {
              return new ye((t) => {
                const n = e[Ha]();
                if (ee(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (sf(e))
            return (function fw(e) {
              return new ye((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (af(e))
            return (function hw(e) {
              return new ye((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Zd);
              });
            })(e);
          if (lf(e)) return gf(e);
          if (ff(e))
            return (function pw(e) {
              return new ye((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (pf(e))
            return (function gw(e) {
              return gf(hf(e));
            })(e);
        }
        throw cf(e);
      }
      function gf(e) {
        return new ye((t) => {
          (function mw(e, t) {
            var n, r, o, i;
            return (function ef(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = rf(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Jt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Re(e, t, n = 1 / 0) {
        return ee(t)
          ? Re((r, o) => G((i, s) => t(r, i, o, s))(pt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Ie((r, o) =>
              (function yw(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    pt(n(g, c++)).subscribe(
                      we(
                        t,
                        (_) => {
                          o?.(_), i ? h(_) : t.next(_);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const _ = u.shift();
                                s ? Jt(t, s, () => p(_)) : p(_);
                              }
                              f();
                            } catch (_) {
                              t.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    we(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function or(e = 1 / 0) {
        return Re(Vn, e);
      }
      const kt = new ye((e) => e.complete());
      function Za(e) {
        return e[e.length - 1];
      }
      function mf(e) {
        return ee(Za(e)) ? e.pop() : void 0;
      }
      function uo(e) {
        return (function Dw(e) {
          return e && ee(e.schedule);
        })(Za(e))
          ? e.pop()
          : void 0;
      }
      function yf(e, t = 0) {
        return Ie((n, r) => {
          n.subscribe(
            we(
              r,
              (o) => Jt(r, e, () => r.next(o), t),
              () => Jt(r, e, () => r.complete(), t),
              (o) => Jt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function vf(e, t = 0) {
        return Ie((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Df(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ye((n) => {
          Jt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Jt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ve(e, t) {
        return t
          ? (function Mw(e, t) {
              if (null != e) {
                if (uf(e))
                  return (function Cw(e, t) {
                    return pt(e).pipe(vf(t), yf(t));
                  })(e, t);
                if (sf(e))
                  return (function Ew(e, t) {
                    return new ye((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (af(e))
                  return (function ww(e, t) {
                    return pt(e).pipe(vf(t), yf(t));
                  })(e, t);
                if (lf(e)) return Df(e, t);
                if (ff(e))
                  return (function bw(e, t) {
                    return new ye((n) => {
                      let r;
                      return (
                        Jt(n, t, () => {
                          (r = e[df]()),
                            Jt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ee(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (pf(e))
                  return (function Sw(e, t) {
                    return Df(hf(e), t);
                  })(e, t);
              }
              throw cf(e);
            })(e, t)
          : pt(e);
      }
      function Ya(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new ao({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return pt(t(...n)).subscribe(r);
      }
      function J(e) {
        for (let t in e) if (e[t] === J) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Qa(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function te(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(te).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ka(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Tw = J({ __forward_ref__: J });
      function ne(e) {
        return (
          (e.__forward_ref__ = ne),
          (e.toString = function () {
            return te(this());
          }),
          e
        );
      }
      function T(e) {
        return Xa(e) ? e() : e;
      }
      function Xa(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Tw) &&
          e.__forward_ref__ === ne
        );
      }
      function Ja(e) {
        return e && !!e.ɵproviders;
      }
      class C extends Error {
        constructor(t, n) {
          super(Ti(t, n)), (this.code = t);
        }
      }
      function Ti(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function P(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ri(e, t) {
        throw new C(-201, !1);
      }
      function gt(e, t) {
        null == e &&
          (function Q(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function R(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Ye(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ni(e) {
        return Cf(e, xi) || Cf(e, Ef);
      }
      function Cf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function wf(e) {
        return e && (e.hasOwnProperty(eu) || e.hasOwnProperty(Lw))
          ? e[eu]
          : null;
      }
      const xi = J({ ɵprov: J }),
        eu = J({ ɵinj: J }),
        Ef = J({ ngInjectableDef: J }),
        Lw = J({ ngInjectorDef: J });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let tu;
      function mt(e) {
        const t = tu;
        return (tu = e), t;
      }
      function bf(e, t, n) {
        const r = Ni(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ri(te(e));
      }
      const oe = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        lo = {},
        nu = "__NG_DI_FLAG__",
        Fi = "ngTempTokenPath",
        jw = "ngTokenPath",
        $w = /\n/gm,
        Bw = "\u0275",
        Sf = "__source";
      let co;
      function ir(e) {
        const t = co;
        return (co = e), t;
      }
      function Uw(e, t = N.Default) {
        if (void 0 === co) throw new C(-203, !1);
        return null === co
          ? bf(e, void 0, t)
          : co.get(e, t & N.Optional ? null : void 0, t);
      }
      function x(e, t = N.Default) {
        return (
          (function Vw() {
            return tu;
          })() || Uw
        )(T(e), t);
      }
      function z(e, t = N.Default) {
        return x(e, Oi(t));
      }
      function Oi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function ru(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = T(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Hw(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(x(o, i));
          } else t.push(x(r));
        }
        return t;
      }
      function fo(e, t) {
        return (e[nu] = t), (e.prototype[nu] = t), e;
      }
      function Hw(e) {
        return e[nu];
      }
      function en(e) {
        return { toString: e }.toString();
      }
      var Lt = (() => (
          ((Lt = Lt || {})[(Lt.OnPush = 0)] = "OnPush"),
          (Lt[(Lt.Default = 1)] = "Default"),
          Lt
        ))(),
        Vt = (() => {
          return (
            ((e = Vt || (Vt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Vt
          );
          var e;
        })();
      const tn = {},
        q = [],
        Pi = J({ ɵcmp: J }),
        ou = J({ ɵdir: J }),
        iu = J({ ɵpipe: J }),
        If = J({ ɵmod: J }),
        nn = J({ ɵfac: J }),
        ho = J({ __NG_ELEMENT_ID__: J });
      let Ww = 0;
      function sr(e) {
        return en(() => {
          const t = Tf(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Lt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || Vt.Emulated,
              id: "c" + Ww++,
              styles: e.styles || q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Rf(n);
          const r = e.dependencies;
          return (n.directiveDefs = ki(r, !1)), (n.pipeDefs = ki(r, !0)), n;
        });
      }
      function Zw(e) {
        return K(e) || ke(e);
      }
      function Yw(e) {
        return null !== e;
      }
      function ot(e) {
        return en(() => ({
          type: e.type,
          bootstrap: e.bootstrap || q,
          declarations: e.declarations || q,
          imports: e.imports || q,
          exports: e.exports || q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Af(e, t) {
        if (null == e) return tn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function O(e) {
        return en(() => {
          const t = Tf(e);
          return Rf(t), t;
        });
      }
      function K(e) {
        return e[Pi] || null;
      }
      function ke(e) {
        return e[ou] || null;
      }
      function Ke(e) {
        return e[iu] || null;
      }
      function it(e, t) {
        const n = e[If] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${te(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Tf(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Af(e.inputs, t),
          outputs: Af(e.outputs),
        };
      }
      function Rf(e) {
        e.features?.forEach((t) => t(e));
      }
      function ki(e, t) {
        if (!e) return null;
        const n = t ? Ke : Zw;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(Yw);
      }
      const rn = 0,
        b = 1,
        j = 2,
        ce = 3,
        St = 4,
        jn = 5,
        Le = 6,
        ur = 7,
        fe = 8,
        Li = 9,
        Vi = 10,
        B = 11,
        su = 12,
        po = 13,
        Nf = 14,
        lr = 15,
        Ve = 16,
        go = 17,
        cr = 18,
        jt = 19,
        mo = 20,
        xf = 21,
        ie = 22,
        au = 1,
        Ff = 2,
        ji = 7,
        $i = 8,
        dr = 9,
        He = 10;
      function st(e) {
        return Array.isArray(e) && "object" == typeof e[au];
      }
      function Mt(e) {
        return Array.isArray(e) && !0 === e[au];
      }
      function uu(e) {
        return 0 != (4 & e.flags);
      }
      function yo(e) {
        return e.componentOffset > -1;
      }
      function Bi(e) {
        return 1 == (1 & e.flags);
      }
      function It(e) {
        return !!e.template;
      }
      function Kw(e) {
        return 0 != (256 & e[j]);
      }
      function $n(e, t) {
        return e.hasOwnProperty(nn) ? e[nn] : null;
      }
      class eE {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function yt() {
        return kf;
      }
      function kf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = nE), tE;
      }
      function tE() {
        const e = Vf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === tn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function nE(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Vf(e) ||
            (function rE(e, t) {
              return (e[Lf] = t);
            })(e, { previous: tn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new eE(u && u.currentValue, t, a === tn)), (e[r] = t);
      }
      yt.ngInherit = !0;
      const Lf = "__ngSimpleChanges__";
      function Vf(e) {
        return e[Lf] || null;
      }
      const vt = function (e, t, n) {};
      function Ne(e) {
        for (; Array.isArray(e); ) e = e[rn];
        return e;
      }
      function Ui(e, t) {
        return Ne(t[e]);
      }
      function at(e, t) {
        return Ne(t[e.index]);
      }
      function Bf(e, t) {
        return e.data[t];
      }
      function Xe(e, t) {
        const n = t[e];
        return st(n) ? n : n[rn];
      }
      function Hi(e) {
        return 64 == (64 & e[j]);
      }
      function wn(e, t) {
        return null == t ? null : e[t];
      }
      function Uf(e) {
        e[cr] = 0;
      }
      function cu(e, t) {
        e[jn] += t;
        let n = e,
          r = e[ce];
        for (
          ;
          null !== r && ((1 === t && 1 === n[jn]) || (-1 === t && 0 === n[jn]));

        )
          (r[jn] += t), (n = r), (r = r[ce]);
      }
      const k = { lFrame: eh(null), bindingsEnabled: !0 };
      function Gf() {
        return k.bindingsEnabled;
      }
      function v() {
        return k.lFrame.lView;
      }
      function W() {
        return k.lFrame.tView;
      }
      function xe() {
        let e = qf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function qf() {
        return k.lFrame.currentTNode;
      }
      function $t(e, t) {
        const n = k.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function du() {
        return k.lFrame.isParent;
      }
      function hr() {
        return k.lFrame.bindingIndex++;
      }
      function mE(e, t) {
        const n = k.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), hu(t);
      }
      function hu(e) {
        k.lFrame.currentDirectiveIndex = e;
      }
      function gu(e) {
        k.lFrame.currentQueryIndex = e;
      }
      function vE(e) {
        const t = e[b];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Le] : null;
      }
      function Xf(e, t, n) {
        if (n & N.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & N.Host ||
              ((o = vE(i)), null === o || ((i = i[lr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (k.lFrame = Jf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function mu(e) {
        const t = Jf(),
          n = e[b];
        (k.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Jf() {
        const e = k.lFrame,
          t = null === e ? null : e.child;
        return null === t ? eh(e) : t;
      }
      function eh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function th() {
        const e = k.lFrame;
        return (
          (k.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const nh = th;
      function yu() {
        const e = th();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function ze() {
        return k.lFrame.selectedIndex;
      }
      function Bn(e) {
        k.lFrame.selectedIndex = e;
      }
      function Gi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function zi(e, t, n) {
        rh(e, t, 3, n);
      }
      function Wi(e, t, n, r) {
        (3 & e[j]) === n && rh(e, t, n, r);
      }
      function vu(e, t) {
        let n = e[j];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[j] = n));
      }
      function rh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[cr] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[cr] += 65536),
              (a < i || -1 == i) &&
                (IE(e, n, t, u), (e[cr] = (4294901760 & e[cr]) + u + 2)),
              u++;
      }
      function IE(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[j] >> 11 < e[cr] >> 16 && (3 & e[j]) === t) {
            (e[j] += 2048), vt(4, a, i);
            try {
              i.call(a);
            } finally {
              vt(5, a, i);
            }
          }
        } else {
          vt(4, a, i);
          try {
            i.call(a);
          } finally {
            vt(5, a, i);
          }
        }
      }
      const pr = -1;
      class Do {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function _u(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            ih(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function oh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function ih(e) {
        return 64 === e.charCodeAt(0);
      }
      function _o(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  sh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function sh(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function ah(e) {
        return e !== pr;
      }
      function qi(e) {
        return 32767 & e;
      }
      function Zi(e, t) {
        let n = (function NE(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[lr]), n--;
        return r;
      }
      let Cu = !0;
      function Yi(e) {
        const t = Cu;
        return (Cu = e), t;
      }
      const uh = 255,
        lh = 5;
      let xE = 0;
      const Bt = {};
      function Qi(e, t) {
        const n = ch(e, t);
        if (-1 !== n) return n;
        const r = t[b];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          wu(r.data, e),
          wu(t, null),
          wu(r.blueprint, null));
        const o = Eu(e, t),
          i = e.injectorIndex;
        if (ah(o)) {
          const s = qi(o),
            a = Zi(o, t),
            u = a[b].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function wu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function ch(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Eu(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = yh(o)), null === r)) return pr;
          if ((n++, (o = o[lr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return pr;
      }
      function bu(e, t, n) {
        !(function FE(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ho) && (r = n[ho]),
            null == r && (r = n[ho] = xE++);
          const o = r & uh;
          t.data[e + (o >> lh)] |= 1 << o;
        })(e, t, n);
      }
      function dh(e, t, n) {
        if (n & N.Optional || void 0 !== e) return e;
        Ri();
      }
      function fh(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          !(n & (N.Self | N.Host)))
        ) {
          const o = e[Li],
            i = mt(void 0);
          try {
            return o ? o.get(t, r, n & N.Optional) : bf(t, r, n & N.Optional);
          } finally {
            mt(i);
          }
        }
        return dh(r, 0, n);
      }
      function hh(e, t, n, r = N.Default, o) {
        if (null !== e) {
          if (1024 & t[j]) {
            const s = (function VE(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[j] && !(256 & s[j]);

              ) {
                const a = ph(i, s, n, r | N.Self, Bt);
                if (a !== Bt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[xf];
                  if (l) {
                    const c = l.get(n, Bt, r);
                    if (c !== Bt) return c;
                  }
                  (u = yh(s)), (s = s[lr]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Bt);
            if (s !== Bt) return s;
          }
          const i = ph(e, t, n, r, Bt);
          if (i !== Bt) return i;
        }
        return fh(t, n, r, o);
      }
      function ph(e, t, n, r, o) {
        const i = (function kE(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(ho) ? e[ho] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & uh : LE) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Xf(t, e, r)) return r & N.Host ? dh(o, 0, r) : fh(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & N.Optional) return s;
            Ri();
          } finally {
            nh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = ch(e, t),
            u = pr,
            l = r & N.Host ? t[Ve][Le] : null;
          for (
            (-1 === a || r & N.SkipSelf) &&
            ((u = -1 === a ? Eu(e, t) : t[a + 8]),
            u !== pr && mh(r, !1)
              ? ((s = t[b]), (a = qi(u)), (t = Zi(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[b];
            if (gh(i, a, c.data)) {
              const d = PE(a, t, n, s, r, l);
              if (d !== Bt) return d;
            }
            (u = t[a + 8]),
              u !== pr && mh(r, t[b].data[a + 8] === l) && gh(i, a, t)
                ? ((s = c), (a = qi(u)), (t = Zi(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function PE(e, t, n, r, o, i) {
        const s = t[b],
          a = s.data[e + 8],
          c = (function Ki(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && It(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? yo(a) && Cu : r != s && 0 != (3 & a.type),
            o & N.Host && i === a
          );
        return null !== c ? Un(t, s, c, a) : Bt;
      }
      function Un(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function AE(e) {
            return e instanceof Do;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Rw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Y(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : P(e);
              })(i[n])
            );
          const a = Yi(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? mt(s.injectImpl) : null;
          Xf(e, r, N.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function ME(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = kf(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && mt(u), Yi(a), (s.resolving = !1), nh();
          }
        }
        return o;
      }
      function gh(e, t, n) {
        return !!(n[t + (e >> lh)] & (1 << e));
      }
      function mh(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class gr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return hh(this._tNode, this._lView, t, Oi(r), n);
        }
      }
      function LE() {
        return new gr(xe(), v());
      }
      function Fe(e) {
        return en(() => {
          const t = e.prototype.constructor,
            n = t[nn] || Su(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[nn] || Su(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Su(e) {
        return Xa(e)
          ? () => {
              const t = Su(T(e));
              return t && t();
            }
          : $n(e);
      }
      function yh(e) {
        const t = e[b],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Le] : null;
      }
      const yr = "__parameters__";
      function Dr(e, t, n) {
        return en(() => {
          const r = (function Mu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(yr)
                ? u[yr]
                : Object.defineProperty(u, yr, { value: [] })[yr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Hn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Hn(n, t) : t(n)));
      }
      function Dh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Ji(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ut(e, t, n) {
        let r = _r(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function UE(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Au(e, t) {
        const n = _r(e, t);
        if (n >= 0) return e[1 | n];
      }
      function _r(e, t) {
        return (function _h(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const bo = fo(Dr("Optional"), 8),
        So = fo(Dr("SkipSelf"), 4);
      var Je = (() => (
        ((Je = Je || {})[(Je.Important = 1)] = "Important"),
        (Je[(Je.DashCase = 2)] = "DashCase"),
        Je
      ))();
      const Ou = new Map();
      let cb = 0;
      const ku = "__ngContext__";
      function je(e, t) {
        st(t)
          ? ((e[ku] = t[mo]),
            (function fb(e) {
              Ou.set(e[mo], e);
            })(t))
          : (e[ku] = t);
      }
      let Lu;
      function Vu(e, t) {
        return Lu(e, t);
      }
      function To(e) {
        const t = e[ce];
        return Mt(t) ? t[ce] : t;
      }
      function ju(e) {
        return $h(e[po]);
      }
      function $u(e) {
        return $h(e[St]);
      }
      function $h(e) {
        for (; null !== e && !Mt(e); ) e = e[St];
        return e;
      }
      function wr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Mt(r) ? (i = r) : st(r) && ((s = !0), (r = r[rn]));
          const a = Ne(r);
          0 === e && null !== n
            ? null == o
              ? Wh(t, n, a)
              : Gn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Gn(t, n, a, o || null, !0)
            : 2 === e
            ? (function qu(e, t, n) {
                const r = rs(e, t);
                r &&
                  (function xb(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function Pb(e, t, n, r, o) {
                const i = n[ji];
                i !== Ne(n) && wr(t, e, r, i, o);
                for (let a = He; a < n.length; a++) {
                  const u = n[a];
                  Ro(u[b], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Uu(e, t, n) {
        return e.createElement(t, n);
      }
      function Uh(e, t) {
        const n = e[dr],
          r = n.indexOf(t),
          o = t[ce];
        512 & t[j] && ((t[j] &= -513), cu(o, -1)), n.splice(r, 1);
      }
      function Hu(e, t) {
        if (e.length <= He) return;
        const n = He + t,
          r = e[n];
        if (r) {
          const o = r[go];
          null !== o && o !== e && Uh(o, r), t > 0 && (e[n - 1][St] = r[St]);
          const i = Ji(e, He + t);
          !(function bb(e, t) {
            Ro(e, t, t[B], 2, null, null), (t[rn] = null), (t[Le] = null);
          })(r[b], r);
          const s = i[jt];
          null !== s && s.detachView(i[b]),
            (r[ce] = null),
            (r[St] = null),
            (r[j] &= -65);
        }
        return r;
      }
      function Hh(e, t) {
        if (!(128 & t[j])) {
          const n = t[B];
          n.destroyNode && Ro(e, t, n, 3, null, null),
            (function Ib(e) {
              let t = e[po];
              if (!t) return Gu(e[b], e);
              for (; t; ) {
                let n = null;
                if (st(t)) n = t[po];
                else {
                  const r = t[He];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[St] && t !== e; )
                    st(t) && Gu(t[b], t), (t = t[ce]);
                  null === t && (t = e), st(t) && Gu(t[b], t), (n = t && t[St]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Gu(e, t) {
        if (!(128 & t[j])) {
          (t[j] &= -65),
            (t[j] |= 128),
            (function Nb(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Do)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        vt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          vt(5, a, u);
                        }
                      }
                    else {
                      vt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        vt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function Rb(e, t) {
              const n = e.cleanup,
                r = t[ur];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[ur] = null;
              }
            })(e, t),
            1 === t[b].type && t[B].destroy();
          const n = t[go];
          if (null !== n && Mt(t[ce])) {
            n !== t[ce] && Uh(n, t);
            const r = t[jt];
            null !== r && r.detachView(e);
          }
          !(function hb(e) {
            Ou.delete(e[mo]);
          })(t);
        }
      }
      function Gh(e, t, n) {
        return (function zh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[rn];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Vt.None || i === Vt.Emulated) return null;
            }
            return at(r, n);
          }
        })(e, t.parent, n);
      }
      function Gn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Wh(e, t, n) {
        e.appendChild(t, n);
      }
      function qh(e, t, n, r, o) {
        null !== r ? Gn(e, t, n, r, o) : Wh(e, t, n);
      }
      function rs(e, t) {
        return e.parentNode(t);
      }
      let zu,
        Qu,
        Qh = function Yh(e, t, n) {
          return 40 & e.type ? at(e, n) : null;
        };
      function os(e, t, n, r) {
        const o = Gh(e, r, t),
          i = t[B],
          a = (function Zh(e, t, n) {
            return Qh(e, t, n);
          })(r.parent || t[Le], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) qh(i, o, n[u], a, !1);
          else qh(i, o, n, a, !1);
        void 0 !== zu && zu(i, r, t, n, o);
      }
      function is(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return at(t, e);
          if (4 & n) return Wu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return is(e, r);
            {
              const o = e[t.index];
              return Mt(o) ? Wu(-1, o) : Ne(o);
            }
          }
          if (32 & n) return Vu(t, e)() || Ne(e[t.index]);
          {
            const r = Xh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : is(To(e[Ve]), r)
              : is(e, t.next);
          }
        }
        return null;
      }
      function Xh(e, t) {
        return null !== t ? e[Ve][Le].projection[t.projection] : null;
      }
      function Wu(e, t) {
        const n = He + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[b].firstChild;
          if (null !== o) return is(r, o);
        }
        return t[ji];
      }
      function Zu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && je(Ne(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) Zu(e, t, n.child, r, o, i, !1), wr(t, e, o, a, i);
            else if (32 & u) {
              const l = Vu(n, r);
              let c;
              for (; (c = l()); ) wr(t, e, o, c, i);
              wr(t, e, o, a, i);
            } else 16 & u ? Jh(e, t, r, n, o, i) : wr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Ro(e, t, n, r, o, i) {
        Zu(n, r, e.firstChild, t, o, i, !1);
      }
      function Jh(e, t, n, r, o, i) {
        const s = n[Ve],
          u = s[Le].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) wr(t, e, o, u[l], i);
        else Zu(e, t, u, s[ce], o, i, !0);
      }
      function ep(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function tp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && _u(e, t, r),
          null !== o && ep(e, t, o),
          null !== i &&
            (function Lb(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class sp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const ls = new S("ENVIRONMENT_INITIALIZER"),
        mp = new S("INJECTOR", -1),
        yp = new S("INJECTOR_DEF_TYPES");
      class vp {
        get(t, n = lo) {
          if (n === lo) {
            const r = new Error(`NullInjectorError: No provider for ${te(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function cS(...e) {
        return { ɵproviders: Dp(0, e), ɵfromNgModule: !0 };
      }
      function Dp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Hn(t, (i) => {
            const s = i;
            nl(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && _p(o, n),
          n
        );
      }
      function _p(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          rl(o, (i) => {
            t.push(i);
          });
        }
      }
      function nl(e, t, n, r) {
        if (!(e = T(e))) return !1;
        let o = null,
          i = wf(e);
        const s = !i && K(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = wf(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) nl(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Hn(i.imports, (c) => {
                  nl(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && _p(l, t);
            }
            if (!a) {
              const l = $n(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: q },
                { provide: yp, useValue: o, multi: !0 },
                { provide: ls, useValue: () => x(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              rl(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function rl(e, t) {
        for (let n of e)
          Ja(n) && (n = n.ɵproviders), Array.isArray(n) ? rl(n, t) : t(n);
      }
      const dS = J({ provide: String, useValue: J });
      function ol(e) {
        return null !== e && "object" == typeof e && dS in e;
      }
      function zn(e) {
        return "function" == typeof e;
      }
      const il = new S("Set Injector scope."),
        cs = {},
        hS = {};
      let sl;
      function ds() {
        return void 0 === sl && (sl = new vp()), sl;
      }
      class un {}
      class Ep extends un {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            ul(t, (s) => this.processProvider(s)),
            this.records.set(mp, br(void 0, this)),
            o.has("environment") && this.records.set(un, br(void 0, this));
          const i = this.records.get(il);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(yp.multi, q, N.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = ir(this),
            r = mt(void 0);
          try {
            return t();
          } finally {
            ir(n), mt(r);
          }
        }
        get(t, n = lo, r = N.Default) {
          this.assertNotDestroyed(), (r = Oi(r));
          const o = ir(this),
            i = mt(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function vS(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof S)
                    );
                  })(t) && Ni(t);
                (a = u && this.injectableDefInScope(u) ? br(al(t), cs) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? ds() : this.parent).get(
              t,
              (n = r & N.Optional && n === lo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Fi] = s[Fi] || []).unshift(te(t)), o)) throw s;
              return (function Gw(e, t, n, r) {
                const o = e[Fi];
                throw (
                  (t[Sf] && o.unshift(t[Sf]),
                  (e.message = (function zw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Bw
                        ? e.slice(2)
                        : e;
                    let o = te(t);
                    if (Array.isArray(t)) o = t.map(te).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : te(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      $w,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[jw] = o),
                  (e[Fi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            mt(i), ir(o);
          }
        }
        resolveInjectorInitializers() {
          const t = ir(this),
            n = mt(void 0);
          try {
            const r = this.get(ls.multi, q, N.Self);
            for (const o of r) o();
          } finally {
            ir(t), mt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(te(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = zn((t = T(t))) ? t : T(t && t.provide);
          const r = (function gS(e) {
            return ol(e) ? br(void 0, e.useValue) : br(bp(e), cs);
          })(t);
          if (zn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = br(void 0, cs, !0)),
              (o.factory = () => ru(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === cs && ((n.value = hS), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function yS(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = T(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function al(e) {
        const t = Ni(e),
          n = null !== t ? t.factory : $n(e);
        if (null !== n) return n;
        if (e instanceof S) throw new C(204, !1);
        if (e instanceof Function)
          return (function pS(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Eo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function kw(e) {
              return (e && (e[xi] || e[Ef])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function bp(e, t, n) {
        let r;
        if (zn(e)) {
          const o = T(e);
          return $n(o) || al(o);
        }
        if (ol(e)) r = () => T(e.useValue);
        else if (
          (function wp(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...ru(e.deps || []));
        else if (
          (function Cp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => x(T(e.useExisting));
        else {
          const o = T(e && (e.useClass || e.provide));
          if (
            !(function mS(e) {
              return !!e.deps;
            })(e)
          )
            return $n(o) || al(o);
          r = () => new o(...ru(e.deps));
        }
        return r;
      }
      function br(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function ul(e, t) {
        for (const n of e)
          Array.isArray(n) ? ul(n, t) : n && Ja(n) ? ul(n.ɵproviders, t) : t(n);
      }
      class DS {}
      class Sp {}
      class CS {
        resolveComponentFactory(t) {
          throw (function _S(e) {
            const t = Error(
              `No component factory found for ${te(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Oo = (() => {
        class e {}
        return (e.NULL = new CS()), e;
      })();
      function wS() {
        return Sr(xe(), v());
      }
      function Sr(e, t) {
        return new lt(at(e, t));
      }
      let lt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = wS), e;
      })();
      class Ip {}
      let ln = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function bS() {
                const e = v(),
                  n = Xe(xe().index, e);
                return (st(n) ? n : e)[B];
              })()),
            e
          );
        })(),
        SS = (() => {
          class e {}
          return (
            (e.ɵprov = R({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Po {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const MS = new Po("15.2.9"),
        ll = {},
        cl = "ngOriginalError";
      function dl(e) {
        return e[cl];
      }
      class Mr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && dl(t);
          for (; n && dl(n); ) n = dl(n);
          return n || null;
        }
      }
      function cn(e) {
        return e instanceof Function ? e() : e;
      }
      function Tp(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Rp = "ng-template";
      function LS(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Tp(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Np(e) {
        return 4 === e.type && e.value !== Rp;
      }
      function VS(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Rp);
      }
      function jS(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function US(e) {
            for (let t = 0; t < e.length; t++) if (oh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !VS(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (At(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!LS(e.attrs, l, n)) {
                    if (At(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = $S(8 & r ? "class" : u, o, Np(e), n);
                if (-1 === d) {
                  if (At(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Tp(h, l, 0)) || (2 & r && l !== f)) {
                    if (At(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !At(r) && !At(u)) return !1;
            if (s && At(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return At(r) || s;
      }
      function At(e) {
        return 0 == (1 & e);
      }
      function $S(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function HS(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function xp(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (jS(e, t[r], n)) return !0;
        return !1;
      }
      function Fp(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function zS(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !At(s) && ((t += Fp(i, o)), (o = "")),
              (r = s),
              (i = i || !At(r));
          n++;
        }
        return "" !== o && (t += Fp(i, o)), t;
      }
      const L = {};
      function dn(e) {
        Op(W(), v(), ze() + e, !1);
      }
      function Op(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[j])) {
            const i = e.preOrderCheckHooks;
            null !== i && zi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Wi(t, i, 0, n);
          }
        Bn(n);
      }
      function Vp(e, t = null, n = null, r) {
        const o = jp(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function jp(e, t = null, n = null, r, o = new Set()) {
        const i = [n || q, cS(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : te(e))),
          new Ep(i, t || ds(), r || null, o)
        );
      }
      let Ut = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Vp({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Vp({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = lo),
          (e.NULL = new vp()),
          (e.ɵprov = R({ token: e, providedIn: "any", factory: () => x(mp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function D(e, t = N.Default) {
        const n = v();
        return null === n ? x(e, t) : hh(xe(), n, T(e), t);
      }
      function qp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              gu(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function hs(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[rn] = o),
          (d[j] = 76 | r),
          (null !== c || (e && 1024 & e[j])) && (d[j] |= 1024),
          Uf(d),
          (d[ce] = d[lr] = e),
          (d[fe] = n),
          (d[Vi] = s || (e && e[Vi])),
          (d[B] = a || (e && e[B])),
          (d[su] = u || (e && e[su]) || null),
          (d[Li] = l || (e && e[Li]) || null),
          (d[Le] = i),
          (d[mo] = (function db() {
            return cb++;
          })()),
          (d[xf] = c),
          (d[Ve] = 2 == t.type ? e[Ve] : d),
          d
        );
      }
      function Tr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function ml(e, t, n, r, o) {
            const i = qf(),
              s = du(),
              u = (e.data[t] = (function yM(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function gE() {
              return k.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function vo() {
            const e = k.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return $t(i, !0), i;
      }
      function ko(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function yl(e, t, n) {
        mu(t);
        try {
          const r = e.viewQuery;
          null !== r && Ml(1, r, n);
          const o = e.template;
          null !== o && Zp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && qp(e, t),
            e.staticViewQueries && Ml(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function pM(e, t) {
              for (let n = 0; n < t.length; n++) LM(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[j] &= -5), yu();
        }
      }
      function ps(e, t, n, r) {
        const o = t[j];
        if (128 != (128 & o)) {
          mu(t);
          try {
            Uf(t),
              (function Yf(e) {
                return (k.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Zp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && zi(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Wi(t, l, 0, null), vu(t, 0);
            }
            if (
              ((function PM(e) {
                for (let t = ju(e); null !== t; t = $u(t)) {
                  if (!t[Ff]) continue;
                  const n = t[dr];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[j] || cu(o[ce], 1), (o[j] |= 512);
                  }
                }
              })(t),
              (function OM(e) {
                for (let t = ju(e); null !== t; t = $u(t))
                  for (let n = He; n < t.length; n++) {
                    const r = t[n],
                      o = r[b];
                    Hi(r) && ps(o, r, o.template, r[fe]);
                  }
              })(t),
              null !== e.contentQueries && qp(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && zi(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Wi(t, l, 1), vu(t, 1);
            }
            !(function fM(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Bn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      mE(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Bn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function hM(e, t) {
                for (let n = 0; n < t.length; n++) kM(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Ml(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && zi(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Wi(t, l, 2), vu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[j] &= -41),
              512 & t[j] && ((t[j] &= -513), cu(t[ce], -1));
          } finally {
            yu();
          }
        }
      }
      function Zp(e, t, n, r, o) {
        const i = ze(),
          s = 2 & r;
        try {
          Bn(-1),
            s && t.length > ie && Op(e, t, ie, !1),
            vt(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Bn(i), vt(s ? 3 : 1, o);
        }
      }
      function vl(e, t, n) {
        if (uu(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Dl(e, t, n) {
        Gf() &&
          ((function bM(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            yo(n) &&
              (function NM(e, t, n) {
                const r = at(t, e),
                  o = Yp(n),
                  i = e[Vi],
                  s = gs(
                    e,
                    hs(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || Qi(n, t),
              je(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Un(t, e, a, n);
              je(l, t),
                null !== s && xM(0, a - o, l, u, 0, s),
                It(u) && (Xe(n.index, t)[fe] = Un(t, e, a, n));
            }
          })(e, t, n, at(n, t)),
          64 == (64 & n.flags) && eg(e, t, n));
      }
      function _l(e, t, n = at) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Yp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Cl(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Cl(e, t, n, r, o, i, s, a, u, l) {
        const c = ie + r,
          d = c + o,
          f = (function gM(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : L);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[b] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Kp(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Xp(n, t, o, i)
              : r.hasOwnProperty(o) && Xp(n, t, r[o], i);
          }
        return n;
      }
      function Xp(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function wl(e, t, n, r) {
        if (Gf()) {
          const o = null === r ? null : { "": -1 },
            i = (function MM(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (xp(t, s.selectors, !1))
                    if ((r || (r = []), It(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          El(e, t, a.length);
                      } else r.unshift(s), El(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Jp(e, t, n, s, o, a),
            o &&
              (function IM(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = _o(n.mergedAttrs, n.attrs);
      }
      function Jp(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) bu(Qi(n, t), e, r[l].type);
        !(function TM(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = ko(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = _o(n.mergedAttrs, c.hostAttrs)),
            RM(e, n, t, u, c),
            AM(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function vM(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Kp(d.inputs, c, u, f ? f.inputs : null)),
              (l = Kp(d.outputs, c, l, p));
            const g = null === u || null === s || Np(t) ? null : FM(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function eg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function yE() {
            return k.lFrame.currentDirectiveIndex;
          })();
        try {
          Bn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            hu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                SM(u, l);
          }
        } finally {
          Bn(-1), hu(s);
        }
      }
      function SM(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function El(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function AM(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          It(t) && (n[""] = e);
        }
      }
      function RM(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = $n(o.type)),
          s = new Do(i, It(o), D);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function wM(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function EM(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, ko(e, n, o.hostVars, L), o);
      }
      function xM(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function FM(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function tg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function kM(e, t) {
        const n = Xe(t, e);
        if (Hi(n)) {
          const r = n[b];
          48 & n[j] ? ps(r, n, r.template, n[fe]) : n[jn] > 0 && Sl(n);
        }
      }
      function Sl(e) {
        for (let r = ju(e); null !== r; r = $u(r))
          for (let o = He; o < r.length; o++) {
            const i = r[o];
            if (Hi(i))
              if (512 & i[j]) {
                const s = i[b];
                ps(s, i, s.template, i[fe]);
              } else i[jn] > 0 && Sl(i);
          }
        const n = e[b].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Xe(n[r], e);
            Hi(o) && o[jn] > 0 && Sl(o);
          }
      }
      function LM(e, t) {
        const n = Xe(t, e),
          r = n[b];
        (function VM(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          yl(r, n, n[fe]);
      }
      function gs(e, t) {
        return e[po] ? (e[Nf][St] = t) : (e[po] = t), (e[Nf] = t), t;
      }
      function ms(e) {
        for (; e; ) {
          e[j] |= 32;
          const t = To(e);
          if (Kw(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function ys(e, t, n, r = !0) {
        const o = t[Vi];
        o.begin && o.begin();
        try {
          ps(e, t, e.template, n);
        } catch (s) {
          throw (r && ig(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Ml(e, t, n) {
        gu(0), t(e, n);
      }
      function ng(e) {
        return e[ur] || (e[ur] = []);
      }
      function rg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function ig(e, t) {
        const n = e[Li],
          r = n ? n.get(Mr, null) : null;
        r && r.handleError(t);
      }
      function Il(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function vs(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ka(o, a))
              : 2 == i && (r = Ka(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Ds(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Ne(i)), Mt(i)))
            for (let a = He; a < i.length; a++) {
              const u = i[a],
                l = u[b].firstChild;
              null !== l && Ds(u[b], u, l, r);
            }
          const s = n.type;
          if (8 & s) Ds(e, t, n.child, r);
          else if (32 & s) {
            const a = Vu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Xh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = To(t[Ve]);
              Ds(u[b], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Lo {
        get rootNodes() {
          const t = this._lView,
            n = t[b];
          return Ds(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[fe];
        }
        set context(t) {
          this._lView[fe] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[j]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ce];
            if (Mt(t)) {
              const n = t[$i],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Hu(t, r), Ji(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Hh(this._lView[b], this._lView);
        }
        onDestroy(t) {
          !(function Qp(e, t, n, r) {
            const o = ng(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && rg(e).push(r, o.length - 1));
          })(this._lView[b], this._lView, null, t);
        }
        markForCheck() {
          ms(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[j] &= -65;
        }
        reattach() {
          this._lView[j] |= 64;
        }
        detectChanges() {
          ys(this._lView[b], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Mb(e, t) {
              Ro(e, t, t[B], 2, null, null);
            })(this._lView[b], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class jM extends Lo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          ys(t[b], t, t[fe], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class sg extends Oo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = K(t);
          return new Vo(n, this.ngModule);
        }
      }
      function ag(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class BM {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Oi(r);
          const o = this.injector.get(t, ll, r);
          return o !== ll || n === ll ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Vo extends Sp {
        get inputs() {
          return ag(this.componentDef.inputs);
        }
        get outputs() {
          return ag(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function WS(e) {
              return e.map(zS).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof un ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new BM(t, i) : t,
            a = s.get(Ip, null);
          if (null === a) throw new C(407, !1);
          const u = s.get(SS, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function mM(e, t, n) {
                  return e.selectRootElement(t, n === Vt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Uu(
                  l,
                  c,
                  (function $M(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Cl(0, null, null, 1, 0, null, null, null, null, null),
            p = hs(null, h, null, f, null, null, a, l, u, s, null);
          let g, y;
          mu(p);
          try {
            const _ = this.componentDef;
            let E,
              m = null;
            _.findHostDirectiveDefs
              ? ((E = []),
                (m = new Map()),
                _.findHostDirectiveDefs(_, E, m),
                E.push(_))
              : (E = [_]);
            const M = (function HM(e, t) {
                const n = e[b],
                  r = ie;
                return (e[r] = t), Tr(n, r, 2, "#host", null);
              })(p, d),
              Z = (function GM(e, t, n, r, o, i, s, a) {
                const u = o[b];
                !(function zM(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = _o(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (vs(t, t.mergedAttrs, !0), null !== n && tp(r, n, t));
                })(r, e, t, s);
                const l = i.createRenderer(t, n),
                  c = hs(
                    o,
                    Yp(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && El(u, e, r.length - 1),
                  gs(o, c),
                  (o[e.index] = c)
                );
              })(M, d, _, E, p, a, l);
            (y = Bf(h, ie)),
              d &&
                (function qM(e, t, n, r) {
                  if (r) _u(e, n, ["ng-version", MS.full]);
                  else {
                    const { attrs: o, classes: i } = (function qS(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!At(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && _u(e, n, o),
                      i && i.length > 0 && ep(e, n, i.join(" "));
                  }
                })(l, _, d, r),
              void 0 !== n &&
                (function ZM(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(y, this.ngContentSelectors, n),
              (g = (function WM(e, t, n, r, o, i) {
                const s = xe(),
                  a = o[b],
                  u = at(s, o);
                Jp(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  je(Un(o, a, s.directiveStart + c, s), o);
                eg(a, o, s), u && je(u, o);
                const l = Un(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[fe] = o[fe] = l), null !== i))
                  for (const c of i) c(l, t);
                return vl(a, s, e), l;
              })(Z, _, E, m, p, [YM])),
              yl(h, p, null);
          } finally {
            yu();
          }
          return new UM(this.componentType, g, Sr(y, p), p, y);
        }
      }
      class UM extends DS {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new jM(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Il(i[b], i, o, t, n), ms(Xe(this._tNode.index, i));
          }
        }
        get injector() {
          return new gr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function YM() {
        const e = xe();
        Gi(v()[b], e);
      }
      function X(e) {
        let t = (function ug(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (It(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Al(e.inputs)),
                (s.declaredInputs = Al(e.declaredInputs)),
                (s.outputs = Al(e.outputs));
              const a = o.hostBindings;
              a && JM(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && KM(e, u),
                l && XM(e, l),
                Qa(e.inputs, o.inputs),
                Qa(e.declaredInputs, o.declaredInputs),
                Qa(e.outputs, o.outputs),
                It(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === X && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function QM(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = _o(o.hostAttrs, (n = _o(n, o.hostAttrs))));
          }
        })(r);
      }
      function Al(e) {
        return e === tn ? {} : e === q ? [] : e;
      }
      function KM(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function XM(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function JM(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function _s(e) {
        return (
          !!Tl(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Tl(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function $e(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function qn(e, t, n) {
        const r = v();
        return (
          $e(r, hr(), t) &&
            (function ct(e, t, n, r, o, i, s, a) {
              const u = at(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (Il(e, n, c, r, o),
                  yo(t) &&
                    (function _M(e, t) {
                      const n = Xe(t, e);
                      16 & n[j] || (n[j] |= 32);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function DM(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              W(),
              (function ue() {
                const e = k.lFrame;
                return Bf(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[B],
              n,
              !1
            ),
          qn
        );
      }
      function Rl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Il(e, n, t.inputs[s], s, r);
      }
      function be(e, t, n, r) {
        const o = v(),
          i = W(),
          s = ie + e,
          a = o[B],
          u = i.firstCreatePass
            ? (function fI(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Tr(t, e, 2, r, wn(s, o));
                return (
                  wl(t, n, u, wn(s, i)),
                  null !== u.attrs && vs(u, u.attrs, !1),
                  null !== u.mergedAttrs && vs(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = (o[s] = Uu(
            a,
            t,
            (function SE() {
              return k.lFrame.currentNamespace;
            })()
          )),
          c = Bi(u);
        return (
          $t(u, !0),
          tp(a, l, u),
          32 != (32 & u.flags) && os(i, o, l, u),
          0 ===
            (function lE() {
              return k.lFrame.elementDepthCount;
            })() && je(l, o),
          (function cE() {
            k.lFrame.elementDepthCount++;
          })(),
          c && (Dl(i, o, u), vl(i, u, o)),
          null !== r && _l(o, u),
          be
        );
      }
      function Ae() {
        let e = xe();
        du()
          ? (function fu() {
              k.lFrame.isParent = !1;
            })()
          : ((e = e.parent), $t(e, !1));
        const t = e;
        !(function dE() {
          k.lFrame.elementDepthCount--;
        })();
        const n = W();
        return (
          n.firstCreatePass && (Gi(n, e), uu(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function TE(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Rl(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function RE(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Rl(n, t, v(), t.stylesWithoutHost, !1),
          Ae
        );
      }
      function $o(e, t, n, r) {
        return be(e, t, n, r), Ae(), $o;
      }
      function Bo(e) {
        return !!e && "function" == typeof e.then;
      }
      const Fl = function bg(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Te(e, t, n, r) {
        const o = v(),
          i = W(),
          s = xe();
        return (
          (function Mg(e, t, n, r, o, i, s) {
            const a = Bi(r),
              l = e.firstCreatePass && rg(e),
              c = t[fe],
              d = ng(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = at(r, t),
                y = s ? s(g) : g,
                _ = d.length,
                E = s ? (M) => s(Ne(M[r.index])) : r.index;
              let m = null;
              if (
                (!s &&
                  a &&
                  (m = (function pI(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[ur],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== m)
              )
                ((m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = i),
                  (m.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Ag(r, t, c, i, !1);
                const M = n.listen(y, o, i);
                d.push(i, M), l && l.push(o, E, _, _ + 1);
              }
            } else i = Ag(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const Z = t[p[y]][p[y + 1]].subscribe(i),
                    me = d.length;
                  d.push(i, Z), l && l.push(o, r.index, me, -(me + 1));
                }
            }
          })(i, o, o[B], s, e, t, r),
          Te
        );
      }
      function Ig(e, t, n, r) {
        try {
          return vt(6, t, n), !1 !== n(r);
        } catch (o) {
          return ig(e, o), !1;
        } finally {
          vt(7, t, n);
        }
      }
      function Ag(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          ms(e.componentOffset > -1 ? Xe(e.index, t) : t);
          let u = Ig(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Ig(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function Tg(e = 1) {
        return (function DE(e) {
          return (k.lFrame.contextLView = (function _E(e, t) {
            for (; e > 0; ) (t = t[lr]), e--;
            return t;
          })(e, k.lFrame.contextLView))[fe];
        })(e);
      }
      function ws(e, t) {
        return (e << 17) | (t << 2);
      }
      function bn(e) {
        return (e >> 17) & 32767;
      }
      function Pl(e) {
        return 2 | e;
      }
      function Zn(e) {
        return (131068 & e) >> 2;
      }
      function kl(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Ll(e) {
        return 1 | e;
      }
      function jg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? bn(i) : Zn(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          EI(e[a], t) && ((u = !0), (e[a + 1] = r ? Ll(c) : Pl(c))),
            (a = r ? bn(c) : Zn(c));
        }
        u && (e[n + 1] = r ? Pl(i) : Ll(i));
      }
      function EI(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && _r(e, t) >= 0)
        );
      }
      function Es(e, t) {
        return (
          (function Tt(e, t, n, r) {
            const o = v(),
              i = W(),
              s = (function sn(e) {
                const t = k.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function Zg(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[ze()],
                    s = (function qg(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Xg(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function xI(e, t, n, r) {
                      const o = (function pu(e) {
                        const t = k.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Uo((n = Vl(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = Vl(o, e, t, n, r)), null === i)) {
                            let u = (function FI(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== Zn(r)) return e[bn(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = Vl(null, e, t, u[1], r)),
                              (u = Uo(u, t.attrs, r)),
                              (function OI(e, t, n, r) {
                                e[bn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function PI(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Uo(r, e[i].hostAttrs, n);
                              return Uo(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function CI(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = bn(s),
                        u = Zn(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || _r(n, c) > 0) && (l = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = bn(e[a + 1]);
                          (e[r + 1] = ws(f, a)),
                            0 !== f && (e[f + 1] = kl(e[f + 1], r)),
                            (e[a + 1] = (function DI(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = ws(a, 0)),
                            0 !== a && (e[a + 1] = kl(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = ws(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = kl(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = Pl(e[r + 1])),
                        jg(e, c, r, !0),
                        jg(e, c, r, !1),
                        (function wI(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            _r(i, t) >= 0 &&
                            (n[r + 1] = Ll(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = ws(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== L &&
                $e(o, s, t) &&
                (function Qg(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function _I(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? Kg(u, t, n, o, Zn(l), s)
                      : void 0;
                  bs(c) ||
                    (bs(i) ||
                      ((function vI(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = Kg(u, null, n, o, a, s))),
                    (function kb(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : Je.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= Je.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, Ui(ze(), n), o, i));
                })(
                  i,
                  i.data[ze()],
                  o,
                  o[B],
                  e,
                  (o[s + 1] = (function jI(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e &&
                            (e = te(
                              (function En(e) {
                                return e instanceof sp
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Es
        );
      }
      function Vl(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Uo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Uo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                ut(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Kg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === L && (f = d ? q : void 0);
          let h = d ? Au(f, r) : c === r ? f : void 0;
          if ((l && !bs(h) && (h = Au(u, r)), bs(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? bn(p) : Zn(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Au(u, r));
        }
        return a;
      }
      function bs(e) {
        return void 0 !== e;
      }
      function Ct(e, t = "") {
        const n = v(),
          r = W(),
          o = e + ie,
          i = r.firstCreatePass ? Tr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Bu(e, t) {
            return e.createText(t);
          })(n[B], t));
        os(r, n, s, i), $t(i, !1);
      }
      function Ss(e) {
        return Ho("", e, ""), Ss;
      }
      function Ho(e, t, n) {
        const r = v(),
          o = (function Nr(e, t, n, r) {
            return $e(e, hr(), n) ? t + P(n) + r : L;
          })(r, e, t, n);
        return (
          o !== L &&
            (function fn(e, t, n) {
              const r = Ui(t, e);
              !(function Bh(e, t, n) {
                e.setValue(t, n);
              })(e[B], r, n);
            })(r, ze(), o),
          Ho
        );
      }
      const Br = "en-US";
      let _m = Br;
      function Bl(e, t, n, r, o) {
        if (((e = T(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) Bl(e[i], t, n, r, o);
        else {
          const i = W(),
            s = v();
          let a = zn(e) ? e : T(e.provide),
            u = bp(e);
          const l = xe(),
            c = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20;
          if (zn(e) || !e.multi) {
            const h = new Do(u, o, D),
              p = Hl(a, t, o ? c : c + f, d);
            -1 === p
              ? (bu(Qi(l, s), i, a),
                Ul(i, e, t.length),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Hl(a, t, c + f, d),
              p = Hl(a, t, c, c + f),
              y = p >= 0 && n[p];
            if ((o && !y) || (!o && !(h >= 0 && n[h]))) {
              bu(Qi(l, s), i, a);
              const _ = (function oA(e, t, n, r, o) {
                const i = new Do(e, n, D);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  zm(i, o, r && !n),
                  i
                );
              })(o ? rA : nA, n.length, o, r, u);
              !o && y && (n[p].providerFactory = _),
                Ul(i, e, t.length, 0),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(_),
                s.push(_);
            } else Ul(i, e, h > -1 ? h : p, zm(n[o ? p : h], u, !o && r));
            !o && r && y && n[p].componentProviders++;
          }
        }
      }
      function Ul(e, t, n, r) {
        const o = zn(t),
          i = (function fS(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? T(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(n);
              -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
          }
        }
      }
      function zm(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Hl(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function nA(e, t, n, r) {
        return Gl(this.multi, []);
      }
      function rA(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Un(n, n[b], this.providerFactory.index, r);
          (i = a.slice(0, s)), Gl(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), Gl(o, i);
        return i;
      }
      function Gl(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function se(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function tA(e, t, n) {
              const r = W();
              if (r.firstCreatePass) {
                const o = It(e);
                Bl(n, r.data, r.blueprint, o, !0),
                  Bl(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Ur {}
      class Wm {}
      class qm extends Ur {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new sg(this));
          const r = it(t);
          (this._bootstrapComponents = cn(r.bootstrap)),
            (this._r3Injector = jp(
              t,
              n,
              [
                { provide: Ur, useValue: this },
                { provide: Oo, useValue: this.componentFactoryResolver },
              ],
              te(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class zl extends Wm {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new qm(this.moduleType, t);
        }
      }
      class sA extends Ur {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new sg(this)),
            (this.instance = null);
          const o = new Ep(
            [
              ...t,
              { provide: Ur, useValue: this },
              { provide: Oo, useValue: this.componentFactoryResolver },
            ],
            n || ds(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Rs(e, t, n = null) {
        return new sA(e, t, n).injector;
      }
      let aA = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Dp(0, n.type),
                o =
                  r.length > 0
                    ? Rs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = R({
            token: e,
            providedIn: "environment",
            factory: () => new e(x(un)),
          })),
          e
        );
      })();
      function Zm(e) {
        e.getStandaloneInjector = (t) =>
          t.get(aA).getOrCreateStandaloneInjector(e);
      }
      function ty(e, t, n, r, o) {
        return (function ry(e, t, n, r, o, i, s) {
          const a = t + n;
          return (function Wn(e, t, n, r) {
            const o = $e(e, t, n);
            return $e(e, t + 1, r) || o;
          })(e, a, o, i)
            ? (function Gt(e, t, n) {
                return (e[t] = n);
              })(e, a + 2, s ? r.call(s, o, i) : r(o, i))
            : (function Yo(e, t) {
                const n = e[t];
                return n === L ? void 0 : n;
              })(e, a + 2);
        })(
          v(),
          (function Ge() {
            const e = k.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r,
          o
        );
      }
      function ql(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ae = class xA extends Xt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = ql(i)), o && (o = ql(o)), s && (s = ql(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ht && t.add(a), a;
        }
      };
      let hn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = kA), e;
      })();
      const OA = hn,
        PA = class extends OA {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = hs(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[go] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[jt];
            return (
              null !== s && (o[jt] = s.createEmbeddedView(r)),
              yl(r, o, t),
              new Lo(o)
            );
          }
        };
      function kA() {
        return (function Ns(e, t) {
          return 4 & e.type ? new PA(t, e, Sr(e, t)) : null;
        })(xe(), v());
      }
      let Nt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = LA), e;
      })();
      function LA() {
        return (function ly(e, t) {
          let n;
          const r = t[e.index];
          if (Mt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Ne(r);
            else {
              const i = t[B];
              o = i.createComment("");
              const s = at(e, t);
              Gn(
                i,
                rs(i, s),
                o,
                (function Fb(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = tg(r, t, o, e)), gs(t, n);
          }
          return new ay(n, e, t);
        })(xe(), v());
      }
      const VA = Nt,
        ay = class extends VA {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Sr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new gr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Eu(this._hostTNode, this._hostLView);
            if (ah(t)) {
              const n = Zi(t, this._hostLView),
                r = qi(t);
              return new gr(n[b].data[r + 8], n);
            }
            return new gr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = uy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - He;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function wo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new Vo(K(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(un, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[b];
            if (
              (function uE(e) {
                return Mt(e[ce]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[ce],
                  f = new ay(d, d[Le], d[ce]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Ab(e, t, n, r) {
              const o = He + r,
                i = n.length;
              r > 0 && (n[o - 1][St] = t),
                r < i - He
                  ? ((t[St] = n[o]), Dh(n, He + r, t))
                  : (n.push(t), (t[St] = null)),
                (t[ce] = n);
              const s = t[go];
              null !== s &&
                n !== s &&
                (function Tb(e, t) {
                  const n = e[dr];
                  t[Ve] !== t[ce][ce][Ve] && (e[Ff] = !0),
                    null === n ? (e[dr] = [t]) : n.push(t);
                })(s, t);
              const a = t[jt];
              null !== a && a.insertView(e), (t[j] |= 64);
            })(o, r, s, i);
            const a = Wu(i, s),
              u = r[B],
              l = rs(u, s[ji]);
            return (
              null !== l &&
                (function Sb(e, t, n, r, o, i) {
                  (r[rn] = o), (r[Le] = t), Ro(e, r, n, 1, o, i);
                })(o, s[Le], u, r, l, a),
              t.attachToViewContainerRef(),
              Dh(Yl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = uy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Hu(this._lContainer, n);
            r && (Ji(Yl(this._lContainer), n), Hh(r[b], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Hu(this._lContainer, n);
            return r && null != Ji(Yl(this._lContainer), n) ? new Lo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function uy(e) {
        return e[$i];
      }
      function Yl(e) {
        return e[$i] || (e[$i] = []);
      }
      function Fs(...e) {}
      const Os = new S("Application Initializer");
      let Ps = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Fs),
              (this.reject = Fs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Bo(i)) n.push(i);
                else if (Fl(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(Os, 8));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Xo = new S("AppId", {
        providedIn: "root",
        factory: function Py() {
          return `${sc()}${sc()}${sc()}`;
        },
      });
      function sc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ky = new S("Platform Initializer"),
        Ly = new S("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let fT = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const pn = new S("LocaleId", {
        providedIn: "root",
        factory: () =>
          z(pn, N.Optional | N.SkipSelf) ||
          (function hT() {
            return (typeof $localize < "u" && $localize.locale) || Br;
          })(),
      });
      class gT {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Vy = (() => {
        class e {
          compileModuleSync(n) {
            return new zl(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = cn(it(n).declarations).reduce((s, a) => {
                const u = K(a);
                return u && s.push(new Vo(u)), s;
              }, []);
            return new gT(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const vT = (() => Promise.resolve(0))();
      function ac(e) {
        typeof Zone > "u"
          ? vT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class he {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ae(!1)),
            (this.onMicrotaskEmpty = new ae(!1)),
            (this.onStable = new ae(!1)),
            (this.onError = new ae(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function DT() {
              let e = oe.requestAnimationFrame,
                t = oe.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function wT(e) {
              const t = () => {
                !(function CT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(oe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                lc(e),
                                (e.isCheckStableRunning = !0),
                                uc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    lc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return By(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Uy(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return By(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Uy(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          lc(e),
                          uc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!he.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (he.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, _T, Fs, Fs);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const _T = {};
      function uc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function lc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function By(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Uy(e) {
        e._nesting--, uc(e);
      }
      class ET {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ae()),
            (this.onMicrotaskEmpty = new ae()),
            (this.onStable = new ae()),
            (this.onError = new ae());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Hy = new S(""),
        ks = new S("");
      let fc,
        cc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                fc ||
                  ((function bT(e) {
                    fc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      he.assertNotInAngularZone(),
                        ac(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ac(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(he), x(dc), x(ks));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        dc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return fc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const gn = !1;
      let Sn = null;
      const Gy = new S("AllowMultipleToken"),
        hc = new S("PlatformDestroyListeners"),
        zy = new S("appBootstrapListener");
      class Wy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Zy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new S(r);
        return (i = []) => {
          let s = pc();
          if (!s || s.injector.get(Gy, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function IT(e) {
                  if (Sn && !Sn.get(Gy, !1)) throw new C(400, !1);
                  Sn = e;
                  const t = e.get(Qy);
                  (function qy(e) {
                    const t = e.get(ky, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Yy(e = [], t) {
                    return Ut.create({
                      name: t,
                      providers: [
                        { provide: il, useValue: "platform" },
                        { provide: hc, useValue: new Set([() => (Sn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function TT(e) {
            const t = pc();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function pc() {
        return Sn?.get(Qy) ?? null;
      }
      let Qy = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Xy(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new ET()
                      : ("zone.js" === e ? void 0 : e) || new he(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Ky(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: he, useValue: o }];
            return o.run(() => {
              const s = Ut.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(Mr, null);
              if (!u) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Vs(this._modules, a), l.unsubscribe();
                  });
                }),
                (function Jy(e, t, n) {
                  try {
                    const r = n();
                    return Bo(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(Ps);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Cm(e) {
                          gt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (_m = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(pn, Br) || Br),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = ev({}, r);
            return (function ST(e, t, n) {
              const r = new zl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Ls);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(hc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(Ut));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function ev(e, t) {
        return Array.isArray(t) ? t.reduce(ev, e) : { ...e, ...t };
      }
      let Ls = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new ye((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new ye((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    he.assertNotInAngularZone(),
                      ac(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  he.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function Iw(...e) {
              const t = uo(e),
                n = (function _w(e, t) {
                  return "number" == typeof Za(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? pt(r[0])
                  : or(n)(ve(r, t))
                : kt;
            })(
              i,
              s.pipe(
                (function Aw(e = {}) {
                  const {
                    connector: t = () => new Xt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Ie((g, y) => {
                      l++, !d && !c && f();
                      const _ = (u = u ?? t());
                      y.add(() => {
                        l--, 0 === l && !d && !c && (a = Ya(p, o));
                      }),
                        _.subscribe(y),
                        !s &&
                          l > 0 &&
                          ((s = new ao({
                            next: (E) => _.next(E),
                            error: (E) => {
                              (d = !0), f(), (a = Ya(h, n, E)), _.error(E);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Ya(h, r)), _.complete();
                            },
                          })),
                          pt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof Sp;
            if (!this._injector.get(Ps).done) {
              !o &&
                (function ar(e) {
                  const t = K(e) || ke(e) || Ke(e);
                  return null !== t && t.standalone;
                })(n);
              throw new C(405, gn);
            }
            let s;
            (s = o ? n : this._injector.get(Oo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function MT(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Ur),
              l = s.create(Ut.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(Hy, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Vs(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Vs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(zy, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Vs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(he), x(un), x(Mr));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Vs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let js = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = NT), e;
      })();
      function NT(e) {
        return (function xT(e, t, n) {
          if (yo(e) && !n) {
            const r = Xe(e.index, t);
            return new Lo(r, r);
          }
          return 47 & e.type ? new Lo(t[Ve], t) : null;
        })(xe(), v(), 16 == (16 & e));
      }
      class iv {
        constructor() {}
        supports(t) {
          return _s(t);
        }
        create(t) {
          return new VT(t);
        }
      }
      const LT = (e, t) => t;
      class VT {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || LT);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < av(r, o, i)) ? n : r,
              a = av(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !_s(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function sI(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new jT(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new sv()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new sv()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class jT {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class $T {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class sv {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new $T()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function av(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class uv {
        constructor() {}
        supports(t) {
          return t instanceof Map || Tl(t);
        }
        create() {
          return new BT();
        }
      }
      class BT {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Tl(t))) throw new C(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new UT(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class UT {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function lv() {
        return new Us([new iv()]);
      }
      let Us = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || lv()),
              deps: [[e, new So(), new bo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: lv })), e;
      })();
      function cv() {
        return new Jo([new uv()]);
      }
      let Jo = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || cv()),
              deps: [[e, new So(), new bo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: cv })), e;
      })();
      const zT = Zy(null, "core", []);
      let WT = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(Ls));
          }),
          (e.ɵmod = ot({ type: e })),
          (e.ɵinj = Ye({})),
          e
        );
      })();
      let Dc = null;
      function mn() {
        return Dc;
      }
      class YT {}
      const tt = new S("DocumentToken");
      let _c = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function QT() {
                return x(dv);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const KT = new S("Location Initialized");
      let dv = (() => {
        class e extends _c {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return mn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = mn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = mn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            fv() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            fv()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(tt));
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function XT() {
                return new dv(x(tt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function fv() {
        return !!window.history.pushState;
      }
      function Cc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function hv(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function yn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Kn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return z(gv);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const pv = new S("appBaseHref");
      let gv = (() => {
          class e extends Kn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  z(tt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Cc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  yn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + yn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + yn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(_c), x(pv, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        JT = (() => {
          class e extends Kn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Cc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + yn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + yn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(_c), x(pv, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        wc = (() => {
          class e {
            constructor(n) {
              (this._subject = new ae()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function nR(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(hv(mv(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + yn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function tR(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, mv(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + yn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + yn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = yn),
            (e.joinWithSlash = Cc),
            (e.stripTrailingSlash = hv),
            (e.ɵfac = function (n) {
              return new (n || e)(x(Kn));
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return (function eR() {
                  return new wc(x(Kn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function mv(e) {
        return e.replace(/\/index.html$/, "");
      }
      const xc = /\s+/,
        Sv = [];
      let Mv = (() => {
        class e {
          constructor(n, r, o, i) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this.initialClasses = Sv),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(xc) : Sv;
          }
          set ngClass(n) {
            this.rawClass = "string" == typeof n ? n.trim().split(xc) : n;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set)
              for (const r of n) this._updateState(r, !0);
            else if (null != n)
              for (const r of Object.keys(n))
                this._updateState(r, Boolean(n[r]));
            this._applyStateDiff();
          }
          _updateState(n, r) {
            const o = this.stateMap.get(n);
            void 0 !== o
              ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
                (o.touched = !0))
              : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const r = n[0],
                o = n[1];
              o.changed
                ? (this._toggleClass(r, o.enabled), (o.changed = !1))
                : o.touched ||
                  (o.enabled && this._toggleClass(r, !1),
                  this.stateMap.delete(r)),
                (o.touched = !1);
            }
          }
          _toggleClass(n, r) {
            (n = n.trim()).length > 0 &&
              n.split(xc).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Us), D(Jo), D(lt), D(ln));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class BR {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Tv = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new BR(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Rv(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Rv(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Nt), D(hn), D(Us));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Rv(e, t) {
        e.context.$implicit = t.item;
      }
      let Lc = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = ot({ type: e })),
          (e.ɵinj = Ye({})),
          e
        );
      })();
      let vN = (() => {
        class e {}
        return (
          (e.ɵprov = R({
            token: e,
            providedIn: "root",
            factory: () => new DN(x(tt), window),
          })),
          e
        );
      })();
      class DN {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function _N(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Pv(this.window.history) ||
              Pv(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Pv(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class ZN extends YT {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class $c extends ZN {
        static makeCurrent() {
          !(function ZT(e) {
            Dc || (Dc = e);
          })(new $c());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function YN() {
            return (
              (ri = ri || document.querySelector("base")),
              ri ? ri.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function QN(e) {
                (ea = ea || document.createElement("a")),
                  ea.setAttribute("href", e);
                const t = ea.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          ri = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function jR(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let ea,
        ri = null;
      const $v = new S("TRANSITION_ID"),
        XN = [
          {
            provide: Os,
            useFactory: function KN(e, t, n) {
              return () => {
                n.get(Ps).donePromise.then(() => {
                  const r = mn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [$v, tt, Ut],
            multi: !0,
          },
        ];
      let ex = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ta = new S("EventManagerPlugins");
      let na = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(ta), x(he));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Bv {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = mn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Uv = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        oi = (() => {
          class e extends Uv {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(tt));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Bc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Uc = /%COMP%/g,
        zv = new S("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function Wv(e, t) {
        return t.flat(100).map((n) => n.replace(Uc, e));
      }
      function qv(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Hc = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Gc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Qv
                ? o.applyToHost(n)
                : o instanceof zc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case Vt.Emulated:
                  i = new Qv(s, a, r, this.appId, u);
                  break;
                case Vt.ShadowDom:
                  return new ax(s, a, n, r);
                default:
                  i = new zc(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(na), x(oi), x(Xo), x(zv));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Gc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Bc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Yv(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Yv(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Bc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Bc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Je.DashCase | Je.Important)
            ? t.style.setProperty(n, r, o & Je.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Je.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, qv(r))
            : this.eventManager.addEventListener(t, n, qv(r));
        }
      }
      function Yv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class ax extends Gc {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Wv(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class zc extends Gc {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = Wv(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Qv extends zc {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function ox(e) {
              return "_ngcontent-%COMP%".replace(Uc, e);
            })(s)),
            (this.hostAttr = (function ix(e) {
              return "_nghost-%COMP%".replace(Uc, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let ux = (() => {
        class e extends Bv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(tt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Kv = ["alt", "control", "meta", "shift"],
        lx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        cx = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let dx = (() => {
        class e extends Bv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => mn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Kv.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = lx[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Kv.forEach((s) => {
                  s !== o && (0, cx[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(tt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const gx = Zy(zT, "browser", [
          { provide: Ly, useValue: "browser" },
          {
            provide: ky,
            useValue: function fx() {
              $c.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: tt,
            useFactory: function px() {
              return (
                (function Bb(e) {
                  Qu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        eD = new S(""),
        tD = [
          {
            provide: ks,
            useClass: class JN {
              addToWindow(t) {
                (oe.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (oe.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (oe.getAllAngularRootElements = () => t.getAllRootElements()),
                  oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
                  oe.frameworkStabilizers.push((r) => {
                    const o = oe.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? mn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Hy, useClass: cc, deps: [he, dc, ks] },
          { provide: cc, useClass: cc, deps: [he, dc, ks] },
        ],
        nD = [
          { provide: il, useValue: "root" },
          {
            provide: Mr,
            useFactory: function hx() {
              return new Mr();
            },
            deps: [],
          },
          { provide: ta, useClass: ux, multi: !0, deps: [tt, he, Ly] },
          { provide: ta, useClass: dx, multi: !0, deps: [tt] },
          { provide: Hc, useClass: Hc, deps: [na, oi, Xo, zv] },
          { provide: Ip, useExisting: Hc },
          { provide: Uv, useExisting: oi },
          { provide: oi, useClass: oi, deps: [tt] },
          { provide: na, useClass: na, deps: [ta, he] },
          { provide: class CN {}, useClass: ex, deps: [] },
          [],
        ];
      let mx = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Xo, useValue: n.appId },
                  { provide: $v, useExisting: Xo },
                  XN,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(eD, 12));
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({ providers: [...nD, ...tD], imports: [Lc, WT] })),
            e
          );
        })(),
        rD = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(tt));
            }),
            (e.ɵprov = R({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function vx() {
                        return new rD(x(tt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      let bx = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({})),
            e
          );
        })(),
        Sx = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({ imports: [Lc] })),
            e
          );
        })();
      function A(...e) {
        return ve(e, uo(e));
      }
      class Pt extends Xt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const ra = io(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: Mx } = Array,
        { getPrototypeOf: Ix, prototype: Ax, keys: Tx } = Object;
      function sD(e) {
        if (1 === e.length) {
          const t = e[0];
          if (Mx(t)) return { args: t, keys: null };
          if (
            (function Rx(e) {
              return e && "object" == typeof e && Ix(e) === Ax;
            })(t)
          ) {
            const n = Tx(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: Nx } = Array;
      function aD(e) {
        return G((t) =>
          (function xx(e, t) {
            return Nx(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function uD(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function lD(...e) {
        const t = uo(e),
          n = mf(e),
          { args: r, keys: o } = sD(e);
        if (0 === r.length) return ve([], t);
        const i = new ye(
          (function Fx(e, t, n = Vn) {
            return (r) => {
              cD(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    cD(
                      t,
                      () => {
                        const l = ve(e[u], t);
                        let c = !1;
                        l.subscribe(
                          we(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => uD(o, s) : Vn)
        );
        return n ? i.pipe(aD(n)) : i;
      }
      function cD(e, t, n) {
        e ? Jt(n, e, t) : t();
      }
      function Zc(...e) {
        return (function Ox() {
          return or(1);
        })()(ve(e, uo(e)));
      }
      function dD(e) {
        return new ye((t) => {
          pt(e()).subscribe(t);
        });
      }
      function ii(e, t) {
        const n = ee(e) ? e : () => e,
          r = (o) => o.error(n());
        return new ye(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Yc() {
        return Ie((e, t) => {
          let n = null;
          e._refCount++;
          const r = we(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class fD extends ye {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Jd(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ht();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                we(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ht.EMPTY));
          }
          return t;
        }
        refCount() {
          return Yc()(this);
        }
      }
      function Zt(e, t) {
        return Ie((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            we(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                pt(e(u, c)).subscribe(
                  (o = we(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Wr(e) {
        return e <= 0
          ? () => kt
          : Ie((t, n) => {
              let r = 0;
              t.subscribe(
                we(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function In(e, t) {
        return Ie((n, r) => {
          let o = 0;
          n.subscribe(we(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function oa(e) {
        return Ie((t, n) => {
          let r = !1;
          t.subscribe(
            we(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function hD(e = kx) {
        return Ie((t, n) => {
          let r = !1;
          t.subscribe(
            we(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function kx() {
        return new ra();
      }
      function An(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? In((o, i) => e(o, i, r)) : Vn,
            Wr(1),
            n ? oa(t) : hD(() => new ra())
          );
      }
      function Xn(e, t) {
        return ee(t) ? Re(e, t, 1) : Re(e, 1);
      }
      function Be(e, t, n) {
        const r = ee(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ie((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                we(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Vn;
      }
      function Tn(e) {
        return Ie((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            we(n, void 0, void 0, (s) => {
              (i = pt(e(s, Tn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function pD(e, t) {
        return Ie(
          (function Lx(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                u = t,
                l = 0;
              i.subscribe(
                we(
                  s,
                  (c) => {
                    const d = l++;
                    (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function Qc(e) {
        return e <= 0
          ? () => kt
          : Ie((t, n) => {
              let r = [];
              t.subscribe(
                we(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function gD(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? In((o, i) => e(o, i, r)) : Vn,
            Qc(1),
            n ? oa(t) : hD(() => new ra())
          );
      }
      function Kc(e) {
        return Ie((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const V = "primary",
        si = Symbol("RouteTitle");
      class $x {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function qr(e) {
        return new $x(e);
      }
      function Bx(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Yt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !mD(e[o], t[o]))) return !1;
        return !0;
      }
      function mD(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function yD(e) {
        return Array.prototype.concat.apply([], e);
      }
      function vD(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Oe(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Rn(e) {
        return Fl(e) ? e : Bo(e) ? ve(Promise.resolve(e)) : A(e);
      }
      const ia = !1,
        Hx = {
          exact: function CD(e, t, n) {
            if (
              !Jn(e.segments, t.segments) ||
              !sa(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !CD(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: wD,
        },
        DD = {
          exact: function Gx(e, t) {
            return Yt(e, t);
          },
          subset: function zx(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => mD(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function _D(e, t, n) {
        return (
          Hx[n.paths](e.root, t.root, n.matrixParams) &&
          DD[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function wD(e, t, n) {
        return ED(e, t, t.segments, n);
      }
      function ED(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Jn(o, n) || t.hasChildren() || !sa(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Jn(e.segments, n) || !sa(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !wD(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Jn(e.segments, o) && sa(e.segments, o, r) && e.children[V]) &&
            ED(e.children[V], t, i, r)
          );
        }
      }
      function sa(e, t, n) {
        return t.every((r, o) => DD[n](e[o].parameters, r.parameters));
      }
      class Nn {
        constructor(t = new U([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Zx.serialize(this);
        }
      }
      class U {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Oe(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return aa(this);
        }
      }
      class ai {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = qr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return MD(this);
        }
      }
      function Jn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let ui = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return new Xc();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Xc {
        parse(t) {
          const n = new rF(t);
          return new Nn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${li(t.root, !0)}`,
            r = (function Kx(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${ua(n)}=${ua(o)}`).join("&")
                    : `${ua(n)}=${ua(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function Yx(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const Zx = new Xc();
      function aa(e) {
        return e.segments.map((t) => MD(t)).join("/");
      }
      function li(e, t) {
        if (!e.hasChildren()) return aa(e);
        if (t) {
          const n = e.children[V] ? li(e.children[V], !1) : "",
            r = [];
          return (
            Oe(e.children, (o, i) => {
              i !== V && r.push(`${i}:${li(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function qx(e, t) {
            let n = [];
            return (
              Oe(e.children, (r, o) => {
                o === V && (n = n.concat(t(r, o)));
              }),
              Oe(e.children, (r, o) => {
                o !== V && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === V ? [li(e.children[V], !1)] : [`${o}:${li(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[V]
            ? `${aa(e)}/${n[0]}`
            : `${aa(e)}/(${n.join("//")})`;
        }
      }
      function bD(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function ua(e) {
        return bD(e).replace(/%3B/gi, ";");
      }
      function Jc(e) {
        return bD(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function la(e) {
        return decodeURIComponent(e);
      }
      function SD(e) {
        return la(e.replace(/\+/g, "%20"));
      }
      function MD(e) {
        return `${Jc(e.path)}${(function Qx(e) {
          return Object.keys(e)
            .map((t) => `;${Jc(t)}=${Jc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const Xx = /^[^\/()?;=#]+/;
      function ca(e) {
        const t = e.match(Xx);
        return t ? t[0] : "";
      }
      const Jx = /^[^=?&#]+/,
        tF = /^[^&#]+/;
      class rF {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new U([], {})
              : new U([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[V] = new U(t, n)),
            r
          );
        }
        parseSegment() {
          const t = ca(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new C(4009, ia);
          return this.capture(t), new ai(la(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = ca(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = ca(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[la(n)] = la(r);
        }
        parseQueryParam(t) {
          const n = (function eF(e) {
            const t = e.match(Jx);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function nF(e) {
              const t = e.match(tF);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = SD(n),
            i = SD(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ca(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, ia);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = V);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[V] : new U([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new C(4011, ia);
        }
      }
      function ed(e) {
        return e.segments.length > 0 ? new U([], { [V]: e }) : e;
      }
      function da(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = da(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function oF(e) {
          if (1 === e.numberOfChildren && e.children[V]) {
            const t = e.children[V];
            return new U(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new U(e.segments, t));
      }
      function er(e) {
        return e instanceof Nn;
      }
      const td = !1;
      function iF(e, t, n, r, o) {
        if (0 === n.length) return Zr(t.root, t.root, t.root, r, o);
        const i = (function ND(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new RD(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Oe(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new RD(n, t, r);
        })(n);
        return i.toRoot()
          ? Zr(t.root, t.root, new U([], {}), r, o)
          : (function s(u) {
              const l = (function aF(e, t, n, r) {
                  if (e.isAbsolute) return new Yr(t.root, !0, 0);
                  if (-1 === r) return new Yr(n, n === t.root, 0);
                  return (function xD(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new C(4005, td && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new Yr(r, !1, o - i);
                  })(n, r + (ci(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? Qr(l.segmentGroup, l.index, i.commands)
                  : nd(l.segmentGroup, l.index, i.commands);
              return Zr(t.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function ci(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function di(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Zr(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Oe(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : TD(e, t, n));
        const a = ed(da(s));
        return new Nn(a, i, o);
      }
      function TD(e, t, n) {
        const r = {};
        return (
          Oe(e.children, (o, i) => {
            r[i] = o === t ? n : TD(o, t, n);
          }),
          new U(e.segments, r)
        );
      }
      class RD {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && ci(r[0]))
          )
            throw new C(
              4003,
              td && "Root segment cannot have matrix parameters"
            );
          const o = r.find(di);
          if (o && o !== vD(r))
            throw new C(4004, td && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Yr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function nd(e, t, n) {
        if (
          (e || (e = new U([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Qr(e, t, n);
        const r = (function lF(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (di(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!OD(u, l, s)) return i;
                r += 2;
              } else {
                if (!OD(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new U(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[V] = new U(e.segments.slice(r.pathIndex), e.children)),
            Qr(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new U(e.segments, {})
          : r.match && !e.hasChildren()
          ? rd(e, t, n)
          : r.match
          ? Qr(e, 0, o)
          : rd(e, t, n);
      }
      function Qr(e, t, n) {
        if (0 === n.length) return new U(e.segments, {});
        {
          const r = (function uF(e) {
              return di(e[0]) ? e[0].outlets : { [V]: e };
            })(n),
            o = {};
          if (
            !r[V] &&
            e.children[V] &&
            1 === e.numberOfChildren &&
            0 === e.children[V].segments.length
          ) {
            const i = Qr(e.children[V], t, n);
            return new U(e.segments, i.children);
          }
          return (
            Oe(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = nd(e.children[s], t, i));
            }),
            Oe(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new U(e.segments, o)
          );
        }
      }
      function rd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (di(i)) {
            const u = cF(i.outlets);
            return new U(r, u);
          }
          if (0 === o && ci(n[0])) {
            r.push(new ai(e.segments[t].path, FD(n[0]))), o++;
            continue;
          }
          const s = di(i) ? i.outlets[V] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && ci(a)
            ? (r.push(new ai(s, FD(a))), (o += 2))
            : (r.push(new ai(s, {})), o++);
        }
        return new U(r, {});
      }
      function cF(e) {
        const t = {};
        return (
          Oe(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = rd(new U([], {}), 0, n));
          }),
          t
        );
      }
      function FD(e) {
        const t = {};
        return Oe(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function OD(e, t, n) {
        return e == n.path && Yt(t, n.parameters);
      }
      const fi = "imperative";
      class Qt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class od extends Qt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class tr extends Qt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class fa extends Qt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ha extends Qt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class id extends Qt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class dF extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class fF extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class hF extends Qt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class pF extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gF extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mF {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class yF {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class vF {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class DF {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class _F {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class CF {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class PD {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let bF = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return iF(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        MF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function (t) {
                return bF.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class kD {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = sd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = sd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = ad(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return ad(t, this._root).map((n) => n.value);
        }
      }
      function sd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = sd(e, n);
          if (r) return r;
        }
        return null;
      }
      function ad(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = ad(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Dn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Kr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class LD extends kD {
        constructor(t, n) {
          super(t), (this.snapshot = n), ud(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function VD(e, t) {
        const n = (function IF(e, t) {
            const s = new pa([], {}, {}, "", {}, V, t, null, e.root, -1, {});
            return new $D("", new Dn(s, []));
          })(e, t),
          r = new Pt([new ai("", {})]),
          o = new Pt({}),
          i = new Pt({}),
          s = new Pt({}),
          a = new Pt(""),
          u = new Xr(r, o, s, a, i, V, t, n.root);
        return (u.snapshot = n.root), new LD(new Dn(u, []), n);
      }
      class Xr {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(G((l) => l[si])) ?? A(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(G((t) => qr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(G((t) => qr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function jD(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function AF(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class pa {
        get title() {
          return this.data?.[si];
        }
        constructor(t, n, r, o, i, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = qr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class $D extends kD {
        constructor(t, n) {
          super(n), (this.url = t), ud(this, n);
        }
        toString() {
          return BD(this._root);
        }
      }
      function ud(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => ud(e, n));
      }
      function BD(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(BD).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function ld(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Yt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Yt(t.params, n.params) || e.params.next(n.params),
            (function Ux(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Yt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Yt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function cd(e, t) {
        const n =
          Yt(e.params, t.params) &&
          (function Wx(e, t) {
            return (
              Jn(e, t) && e.every((n, r) => Yt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || cd(e.parent, t.parent))
        );
      }
      function hi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function RF(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return hi(e, r, o);
              return hi(e, r);
            });
          })(e, t, n);
          return new Dn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => hi(e, a))),
                s
              );
            }
          }
          const r = (function NF(e) {
              return new Xr(
                new Pt(e.url),
                new Pt(e.params),
                new Pt(e.queryParams),
                new Pt(e.fragment),
                new Pt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => hi(e, i));
          return new Dn(r, o);
        }
      }
      const dd = "ngNavigationCancelingError";
      function UD(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = er(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = HD(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function HD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[dd] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function GD(e) {
        return zD(e) && er(e.url);
      }
      function zD(e) {
        return e && e[dd];
      }
      class xF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new pi()),
            (this.attachRef = null);
        }
      }
      let pi = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new xF()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ga = !1;
      let WD = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = V),
              (this.activateEvents = new ae()),
              (this.deactivateEvents = new ae()),
              (this.attachEvents = new ae()),
              (this.detachEvents = new ae()),
              (this.parentContexts = z(pi)),
              (this.location = z(Nt)),
              (this.changeDetector = z(js)),
              (this.environmentInjector = z(un));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new C(4012, ga);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new C(4012, ga);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new C(4012, ga);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new C(4013, ga);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new FF(n, a, o.injector);
            if (
              r &&
              (function OF(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [yt],
          })),
          e
        );
      })();
      class FF {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Xr
            ? this.route
            : t === pi
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let fd = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = sr({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Zm],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && $o(0, "router-outlet");
            },
            dependencies: [WD],
            encapsulation: 2,
          })),
          e
        );
      })();
      function qD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Rs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function pd(e) {
        const t = e.children && e.children.map(pd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== V &&
            (n.component = fd),
          n
        );
      }
      function bt(e) {
        return e.outlet || V;
      }
      function ZD(e, t) {
        const n = e.filter((r) => bt(r) === t);
        return n.push(...e.filter((r) => bt(r) !== t)), n;
      }
      function gi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class jF {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            ld(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Kr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Oe(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Kr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Kr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Kr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new CF(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new DF(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((ld(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                ld(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = gi(o.snapshot),
                u = a?.get(Oo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class YD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ma {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function $F(e, t, n) {
        const r = e._root;
        return mi(r, t ? t._root : null, n, [r.value]);
      }
      function Jr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Pw(e) {
              return null !== Ni(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function mi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Kr(t);
        return (
          e.children.forEach((s) => {
            (function UF(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function HF(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Jn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Jn(e.url, t.url) || !Yt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !cd(e, t) || !Yt(e.queryParams, t.queryParams);
                    default:
                      return !cd(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new YD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  mi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ma(a.outlet.component, s));
              } else
                s && yi(t, a, o),
                  o.canActivateChecks.push(new YD(r)),
                  mi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Oe(i, (s, a) => yi(s, n.getContext(a), o)),
          o
        );
      }
      function yi(e, t, n) {
        const r = Kr(e),
          o = e.value;
        Oe(r, (i, s) => {
          yi(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ma(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function vi(e) {
        return "function" == typeof e;
      }
      function gd(e) {
        return e instanceof ra || "EmptyError" === e?.name;
      }
      const ya = Symbol("INITIAL_VALUE");
      function eo() {
        return Zt((e) =>
          lD(
            e.map((t) =>
              t.pipe(
                Wr(1),
                (function Px(...e) {
                  const t = uo(e);
                  return Ie((n, r) => {
                    (t ? Zc(e, n, t) : Zc(e, n)).subscribe(r);
                  });
                })(ya)
              )
            )
          ).pipe(
            G((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === ya) return ya;
                  if (!1 === n || n instanceof Nn) return n;
                }
              return !0;
            }),
            In((t) => t !== ya),
            Wr(1)
          )
        );
      }
      function QD(e) {
        return (function VC(...e) {
          return Qd(e);
        })(
          Be((t) => {
            if (er(t)) throw UD(0, t);
          }),
          G((t) => !0 === t)
        );
      }
      const md = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function KD(e, t, n, r, o) {
        const i = yd(e, t, n);
        return i.matched
          ? (function sO(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? A(
                    o.map((s) => {
                      const a = Jr(s, e);
                      return Rn(
                        (function YF(e) {
                          return e && vi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(eo(), QD())
                : A(!0);
            })((r = qD(t, r)), t, n).pipe(G((s) => (!0 === s ? i : { ...md })))
          : A(i);
      }
      function yd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...md }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || Bx)(n, e, t);
        if (!o) return { ...md };
        const i = {};
        Oe(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function va(e, t, n, r) {
        if (
          n.length > 0 &&
          (function lO(e, t, n) {
            return n.some((r) => Da(e, t, r) && bt(r) !== V);
          })(e, n, r)
        ) {
          const i = new U(
            t,
            (function uO(e, t, n, r) {
              const o = {};
              (o[V] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && bt(i) !== V) {
                  const s = new U([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[bt(i)] = s);
                }
              return o;
            })(e, t, r, new U(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function cO(e, t, n) {
            return n.some((r) => Da(e, t, r));
          })(e, n, r)
        ) {
          const i = new U(
            e.segments,
            (function aO(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (Da(e, n, s) && !o[bt(s)]) {
                  const a = new U([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[bt(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new U(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function Da(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function XD(e, t, n, r) {
        return (
          !!(bt(e) === r || (r !== V && Da(t, n, e))) &&
          ("**" === e.path || yd(t, e, n).matched)
        );
      }
      function JD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const _a = !1;
      class Ca {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class e_ {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Di(e) {
        return ii(new Ca(e));
      }
      function t_(e) {
        return ii(new e_(e));
      }
      class pO {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = va(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new U(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, V)
            .pipe(
              G((i) =>
                this.createUrlTree(
                  da(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Tn((i) => {
                if (i instanceof e_)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Ca ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, V)
            .pipe(
              G((o) => this.createUrlTree(da(o), t.queryParams, t.fragment))
            )
            .pipe(
              Tn((o) => {
                throw o instanceof Ca ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new C(4002, _a);
        }
        createUrlTree(t, n, r) {
          const o = ed(t);
          return new Nn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(G((i) => new U([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return ve(o).pipe(
            Xn((i) => {
              const s = r.children[i],
                a = ZD(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                G((u) => ({ segment: u, outlet: i }))
              );
            }),
            pD((i, s) => ((i[s.outlet] = s.segment), i), {}),
            gD()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return ve(r).pipe(
            Xn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                Tn((l) => {
                  if (l instanceof Ca) return A(null);
                  throw l;
                })
              )
            ),
            An((a) => !!a),
            Tn((a, u) => {
              if (gd(a)) return JD(n, o, i) ? A(new U([], {})) : Di(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return XD(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Di(n)
            : Di(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? t_(i)
            : this.lineralizeSegments(r, i).pipe(
                Re((s) => {
                  const a = new U(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = yd(n, o, i);
          if (!a) return Di(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? t_(d)
            : this.lineralizeSegments(o, d).pipe(
                Re((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = qD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    G(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new U(o, {})
                      )
                    )
                  )
                : A(new U(o, {})))
            : KD(n, r, o, t).pipe(
                Zt(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Re((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = va(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new U(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                G((m) => new U(a, m))
                              );
                            if (0 === f.length && 0 === p.length)
                              return A(new U(a, {}));
                            const y = bt(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              y ? V : i,
                              !0
                            ).pipe(
                              G((E) => new U(a.concat(E.segments), E.children))
                            );
                          })
                        )
                      : Di(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function iO(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? A(!0)
                    : A(
                        o.map((s) => {
                          const a = Jr(s, e);
                          return Rn(
                            (function zF(e) {
                              return e && vi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(eo(), QD());
                })(t, n, r).pipe(
                  Re((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Be((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function fO(e) {
                          return ii(HD(_a, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return A(r);
            if (o.numberOfChildren > 1 || !o.children[V])
              return t.redirectTo, ii(new C(4e3, _a));
            o = o.children[V];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Nn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Oe(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Oe(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new U(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new C(4001, _a);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class mO {}
      class DO {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = va(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            V
          ).pipe(
            G((n) => {
              if (null === n) return null;
              const r = new pa(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  V,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new Dn(r, n),
                i = new $D(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = jD(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return ve(Object.keys(r.children)).pipe(
            Xn((o) => {
              const i = r.children[o],
                s = ZD(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            pD((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function Vx(e, t = !1) {
              return Ie((n, r) => {
                let o = 0;
                n.subscribe(
                  we(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            oa(null),
            gD(),
            G((o) => {
              if (null === o) return null;
              const i = r_(o);
              return (
                (function _O(e) {
                  e.sort((t, n) =>
                    t.value.outlet === V
                      ? -1
                      : n.value.outlet === V
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return ve(n).pipe(
            Xn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            An((s) => !!s),
            Tn((s) => {
              if (gd(s)) return JD(r, o, i) ? A([]) : A(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !XD(n, r, o, i)) return A(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? vD(o).parameters : {},
              u = i_(r) + o.length;
            s = A({
              snapshot: new pa(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                s_(n),
                bt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                o_(r),
                u,
                a_(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = KD(r, n, o, t).pipe(
              G(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = i_(r) + u.length;
                  return {
                    snapshot: new pa(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      s_(n),
                      bt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      o_(r),
                      d,
                      a_(n)
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Zt((a) => {
              if (null === a) return A(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function CO(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = va(
                  r,
                  l,
                  c,
                  f.filter((y) => void 0 === y.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  G((y) => (null === y ? null : [new Dn(u, y)]))
                );
              if (0 === f.length && 0 === p.length) return A([new Dn(u, [])]);
              const g = bt(n) === i;
              return this.processSegment(d, f, h, p, g ? V : i).pipe(
                G((y) => (null === y ? null : [new Dn(u, y)]))
              );
            })
          );
        }
      }
      function wO(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function r_(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!wO(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = r_(r.children);
          t.push(new Dn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function o_(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function i_(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function s_(e) {
        return e.data || {};
      }
      function a_(e) {
        return e.resolve || {};
      }
      function u_(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function vd(e) {
        return Zt((t) => {
          const n = e(t);
          return n ? ve(n).pipe(G(() => t)) : A(t);
        });
      }
      const to = new S("ROUTES");
      let Dd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = z(Vy));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Rn(n.loadComponent()).pipe(
                G(c_),
                Be((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Kc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new fD(r, () => new Xt()).pipe(Yc());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                G((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(n).injector),
                      (l = yD(u.get(to, [], N.Self | N.Optional))));
                  return { routes: l.map(pd), injector: u };
                }),
                Kc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new fD(i, () => new Xt()).pipe(Yc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Rn(n()).pipe(
              G(c_),
              Re((r) =>
                r instanceof Wm || Array.isArray(r)
                  ? A(r)
                  : ve(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function c_(e) {
        return (function RO(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Ea = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Xt()),
              (this.configLoader = z(Dd)),
              (this.environmentInjector = z(un)),
              (this.urlSerializer = z(ui)),
              (this.rootContexts = z(pi)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => A(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new yF(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new mF(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Pt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: fi,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                In((r) => 0 !== r.id),
                G((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Zt((r) => {
                  let o = !1,
                    i = !1;
                  return A(r).pipe(
                    Be((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Zt((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new ha(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          kt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          d_(s.source) && (n.browserUrlTree = s.extractedUrl),
                          A(s).pipe(
                            Zt((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new od(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? kt
                                  : Promise.resolve(c)
                              );
                            }),
                            (function gO(e, t, n, r) {
                              return Zt((o) =>
                                (function hO(e, t, n, r, o) {
                                  return new pO(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  G((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Be((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function bO(e, t, n, r, o) {
                              return Re((i) =>
                                (function vO(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new DO(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Zt((a) =>
                                        null === a
                                          ? (function yO(e) {
                                              return new ye((t) => t.error(e));
                                            })(new mO())
                                          : A(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(G((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Be((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new dF(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new od(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const y = VD(d, this.rootComponentType).snapshot;
                        return A(
                          (r = {
                            ...s,
                            targetSnapshot: y,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new ha(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          kt
                        );
                      }
                    }),
                    Be((s) => {
                      const a = new fF(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    G(
                      (s) =>
                        (r = {
                          ...s,
                          guards: $F(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function KF(e, t) {
                      return Re((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? A({ ...n, guardsResult: !0 })
                          : (function XF(e, t, n, r) {
                              return ve(e).pipe(
                                Re((o) =>
                                  (function oO(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? A(
                                          i.map((a) => {
                                            const u = gi(t) ?? o,
                                              l = Jr(a, u);
                                            return Rn(
                                              (function ZF(e) {
                                                return e && vi(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(An());
                                          })
                                        ).pipe(eo())
                                      : A(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                An((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Re((a) =>
                                a &&
                                (function GF(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function JF(e, t, n, r) {
                                      return ve(t).pipe(
                                        Xn((o) =>
                                          Zc(
                                            (function tO(e, t) {
                                              return (
                                                null !== e && t && t(new vF(e)),
                                                A(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function eO(e, t) {
                                              return (
                                                null !== e && t && t(new _F(e)),
                                                A(!0)
                                              );
                                            })(o.route, r),
                                            (function rO(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function BF(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    dD(() =>
                                                      A(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              gi(s.node) ?? n,
                                                            c = Jr(u, l);
                                                          return Rn(
                                                            (function qF(e) {
                                                              return (
                                                                e &&
                                                                vi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(An());
                                                        })
                                                      ).pipe(eo())
                                                    )
                                                  );
                                              return A(i).pipe(eo());
                                            })(e, o.path, n),
                                            (function nO(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return A(!0);
                                              const o = r.map((i) =>
                                                dD(() => {
                                                  const s = gi(t) ?? n,
                                                    a = Jr(i, s);
                                                  return Rn(
                                                    (function WF(e) {
                                                      return (
                                                        e && vi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(An());
                                                })
                                              );
                                              return A(o).pipe(eo());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        An((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : A(a)
                              ),
                              G((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Be((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), er(s.guardsResult))
                      )
                        throw UD(0, s.guardsResult);
                      const a = new hF(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    In(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    vd((s) => {
                      if (s.guards.canActivateChecks.length)
                        return A(s).pipe(
                          Be((a) => {
                            const u = new pF(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Zt((a) => {
                            let u = !1;
                            return A(a).pipe(
                              (function SO(e, t) {
                                return Re((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return A(n);
                                  let i = 0;
                                  return ve(o).pipe(
                                    Xn((s) =>
                                      (function MO(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !u_(o) &&
                                            (i[si] = o.title),
                                          (function IO(e, t, n, r) {
                                            const o = (function AO(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return A({});
                                            const i = {};
                                            return ve(o).pipe(
                                              Re((s) =>
                                                (function TO(e, t, n, r) {
                                                  const o = gi(t) ?? r,
                                                    i = Jr(e, o);
                                                  return Rn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  An(),
                                                  Be((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              Qc(1),
                                              (function jx(e) {
                                                return G(() => e);
                                              })(i),
                                              Tn((s) => (gd(s) ? kt : ii(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            G(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = jD(e, n).resolve),
                                                o &&
                                                  u_(o) &&
                                                  (e.data[si] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Be(() => i++),
                                    Qc(1),
                                    Re((s) => (i === o.length ? A(n) : kt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Be({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Be((a) => {
                            const u = new gF(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    vd((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              Be((c) => {
                                u.component = c;
                              }),
                              G(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return lD(a(s.targetSnapshot.root)).pipe(oa(), Wr(1));
                    }),
                    vd(() => this.afterPreactivation()),
                    G((s) => {
                      const a = (function TF(e, t, n) {
                        const r = hi(e, t._root, n ? n._root : void 0);
                        return new LD(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Be((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      G(
                        (r) => (
                          new jF(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Wr(1),
                    Be({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new tr(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    Kc(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Tn((s) => {
                      if (((i = !0), zD(s))) {
                        GD(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new fa(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), GD(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || d_(r.source),
                            };
                          n.scheduleNavigation(u, fi, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new id(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return kt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new fa(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function d_(e) {
        return e !== fi;
      }
      let f_ = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === V));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[si];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return z(NO);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        NO = (() => {
          class e extends f_ {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(x(rD));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        xO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return z(OO);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class FO {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let OO = (() => {
        class e extends FO {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = Fe(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ba = new S("", { providedIn: "root", factory: () => ({}) });
      let kO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return z(LO);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        LO = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function VO(e) {
        throw e;
      }
      function jO(e, t, n) {
        return t.parse("/");
      }
      const $O = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        BO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let dt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            if ("computed" === this.canceledNavigationResolution)
              return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = z(fT)),
              (this.isNgZoneEnabled = !1),
              (this.options = z(ba, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || VO),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || jO),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = z(kO)),
              (this.routeReuseStrategy = z(xO)),
              (this.urlCreationStrategy = z(MF)),
              (this.titleStrategy = z(f_)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = yD(z(to, { optional: !0 }) ?? [])),
              (this.navigationTransitions = z(Ea)),
              (this.urlSerializer = z(ui)),
              (this.location = z(wc)),
              (this.isNgZoneEnabled =
                z(he) instanceof he && he.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Nn()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = VD(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = this.browserPageId ?? 0);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), fi, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(pd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = u ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            return (
              null !== c && (c = this.removeEmptyProps(c)),
              this.urlCreationStrategy.createUrlTree(
                o,
                this.routerState,
                this.currentUrlTree,
                n,
                c,
                l ?? null
              )
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = er(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, fi, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function UO(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n) throw new C(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...$O } : !1 === r ? { ...BO } : r), er(n)))
              return _D(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return _D(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l, c;
            return (
              s
                ? ((a = s.resolve), (u = s.reject), (l = s.promise))
                : (l = new Promise((d, f) => {
                    (a = d), (u = f);
                  })),
              (c =
                "computed" === this.canceledNavigationResolution
                  ? o && o.ɵrouterPageId
                    ? o.ɵrouterPageId
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: c,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", s);
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
              this.location.go(o, "", i);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i =
                this.currentPageId - (this.browserPageId ?? this.currentPageId);
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class h_ {}
      let zO = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                In((n) => n instanceof tr),
                Xn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Rs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return ve(o).pipe(or());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const i = o.pipe(
                Re((s) =>
                  null === s
                    ? A(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ve([i, this.loader.loadComponent(r)]).pipe(or())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(dt), x(Vy), x(un), x(h_), x(Dd));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const wd = new S("");
      let p_ = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof od
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof tr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof PD &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new PD(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function Wp() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var ft = (() => (
        ((ft = ft || {})[(ft.COMPLETE = 0)] = "COMPLETE"),
        (ft[(ft.FAILED = 1)] = "FAILED"),
        (ft[(ft.REDIRECTING = 2)] = "REDIRECTING"),
        ft
      ))();
      const no = !1;
      function xn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const Ed = new S("", { providedIn: "root", factory: () => !1 });
      function m_() {
        const e = z(Ut);
        return (t) => {
          const n = e.get(Ls);
          if (t !== n.components[0]) return;
          const r = e.get(dt),
            o = e.get(y_);
          1 === e.get(bd) && r.initialNavigation(),
            e.get(v_, null, N.Optional)?.setUpPreloading(),
            e.get(wd, null, N.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const y_ = new S(no ? "bootstrap done indicator" : "", {
          factory: () => new Xt(),
        }),
        bd = new S(no ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function QO() {
        let e = [];
        return (
          (e = no
            ? [
                {
                  provide: ls,
                  multi: !0,
                  useFactory: () => {
                    const t = z(dt);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function wF(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          xn(1, e)
        );
      }
      const v_ = new S(no ? "router preloader" : "");
      function KO(e) {
        return xn(0, [
          { provide: v_, useExisting: zO },
          { provide: h_, useExisting: e },
        ]);
      }
      const _i = !1,
        D_ = new S(
          _i ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        XO = [
          wc,
          { provide: ui, useClass: Xc },
          dt,
          pi,
          {
            provide: Xr,
            useFactory: function g_(e) {
              return e.routerState.root;
            },
            deps: [dt],
          },
          Dd,
          _i ? { provide: Ed, useValue: !0 } : [],
        ];
      function JO() {
        return new Wy("Router", dt);
      }
      let __ = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                XO,
                _i && r?.enableTracing ? QO().ɵproviders : [],
                { provide: to, multi: !0, useValue: n },
                {
                  provide: D_,
                  useFactory: rP,
                  deps: [[dt, new bo(), new So()]],
                },
                { provide: ba, useValue: r || {} },
                r?.useHash
                  ? { provide: Kn, useClass: JT }
                  : { provide: Kn, useClass: gv },
                {
                  provide: wd,
                  useFactory: () => {
                    const e = z(vN),
                      t = z(he),
                      n = z(ba),
                      r = z(Ea),
                      o = z(ui);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new p_(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? KO(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Wy, multi: !0, useFactory: JO },
                r?.initialNavigation ? oP(r) : [],
                [
                  { provide: C_, useFactory: m_ },
                  { provide: zy, multi: !0, useExisting: C_ },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: to, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(x(D_, 8));
          }),
          (e.ɵmod = ot({ type: e })),
          (e.ɵinj = Ye({ imports: [fd] })),
          e
        );
      })();
      function rP(e) {
        if (_i && e)
          throw new C(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function oP(e) {
        return [
          "disabled" === e.initialNavigation
            ? xn(3, [
                {
                  provide: Os,
                  multi: !0,
                  useFactory: () => {
                    const t = z(dt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: bd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? xn(2, [
                { provide: bd, useValue: 0 },
                {
                  provide: Os,
                  multi: !0,
                  deps: [Ut],
                  useFactory: (t) => {
                    const n = t.get(KT, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(dt),
                              i = t.get(y_);
                            (function WO(e, t) {
                              e.events
                                .pipe(
                                  In(
                                    (n) =>
                                      n instanceof tr ||
                                      n instanceof fa ||
                                      n instanceof id ||
                                      n instanceof ha
                                  ),
                                  G((n) =>
                                    n instanceof tr || n instanceof ha
                                      ? ft.COMPLETE
                                      : n instanceof fa &&
                                        (0 === n.code || 1 === n.code)
                                      ? ft.REDIRECTING
                                      : ft.FAILED
                                  ),
                                  In((n) => n !== ft.REDIRECTING),
                                  Wr(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(Ea).afterPreactivation = () => (
                                r(!0), i.closed ? A(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const C_ = new S(_i ? "Router Initializer" : ""),
        sP = [];
      let aP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({ imports: [__.forRoot(sP), __] })),
            e
          );
        })(),
        w_ = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(ln), D(lt));
            }),
            (e.ɵdir = O({ type: e })),
            e
          );
        })(),
        nr = (() => {
          class e extends w_ {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Fe(e)))(r || e);
              };
            })()),
            (e.ɵdir = O({ type: e, features: [X] })),
            e
          );
        })();
      const Kt = new S("NgValueAccessor"),
        cP = { provide: Kt, useExisting: ne(() => Sa), multi: !0 },
        fP = new S("CompositionEventMode");
      let Sa = (() => {
        class e extends w_ {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function dP() {
                  const e = mn() ? mn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(ln), D(lt), D(fP, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Te("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [se([cP]), X],
          })),
          e
        );
      })();
      const hP = !1,
        Ue = new S("NgValidators"),
        On = new S("NgAsyncValidators");
      function F_(e) {
        return null != e;
      }
      function O_(e) {
        const t = Bo(e) ? ve(e) : e;
        if (hP && !Fl(t)) {
          let n = "Expected async validator to return Promise or Observable.";
          throw (
            ("object" == typeof e &&
              (n +=
                " Are you using a synchronous validator where an async validator is expected?"),
            new C(-1101, n))
          );
        }
        return t;
      }
      function P_(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function k_(e, t) {
        return t.map((n) => n(e));
      }
      function L_(e) {
        return e.map((t) =>
          (function gP(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function Sd(e) {
        return null != e
          ? (function V_(e) {
              if (!e) return null;
              const t = e.filter(F_);
              return 0 == t.length
                ? null
                : function (n) {
                    return P_(k_(n, t));
                  };
            })(L_(e))
          : null;
      }
      function Md(e) {
        return null != e
          ? (function j_(e) {
              if (!e) return null;
              const t = e.filter(F_);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function uP(...e) {
                      const t = mf(e),
                        { args: n, keys: r } = sD(e),
                        o = new ye((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let u = s,
                            l = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            pt(n[c]).subscribe(
                              we(
                                i,
                                (f) => {
                                  d || ((d = !0), l--), (a[c] = f);
                                },
                                () => u--,
                                void 0,
                                () => {
                                  (!u || !d) &&
                                    (l || i.next(r ? uD(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(aD(t)) : o;
                    })(k_(n, t).map(O_)).pipe(G(P_));
                  };
            })(L_(e))
          : null;
      }
      function $_(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Id(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Ia(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function H_(e, t) {
        const n = Id(t);
        return (
          Id(e).forEach((o) => {
            Ia(n, o) || n.push(o);
          }),
          n
        );
      }
      function G_(e, t) {
        return Id(t).filter((n) => !Ia(e, n));
      }
      class z_ {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Sd(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Md(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class Ze extends z_ {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Pn extends z_ {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class W_ {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let q_ = (() => {
          class e extends W_ {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(Pn, 2));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  Es("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [X],
            })),
            e
          );
        })(),
        Z_ = (() => {
          class e extends W_ {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(Ze, 10));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  Es("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [X],
            })),
            e
          );
        })();
      function Y_(e, t) {
        return e ? `with name: '${t}'` : `at index: ${t}`;
      }
      const Rd = !1,
        Ci = "VALID",
        Ta = "INVALID",
        ro = "PENDING",
        wi = "DISABLED";
      function Nd(e) {
        return (Ra(e) ? e.validators : e) || null;
      }
      function xd(e, t) {
        return (Ra(t) ? t.asyncValidators : e) || null;
      }
      function Ra(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class X_ {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Ci;
        }
        get invalid() {
          return this.status === Ta;
        }
        get pending() {
          return this.status == ro;
        }
        get disabled() {
          return this.status === wi;
        }
        get enabled() {
          return this.status !== wi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(H_(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(H_(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(G_(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(G_(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Ia(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Ia(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = ro),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = wi),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Ci),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Ci || this.status === ro) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? wi : Ci;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = ro), (this._hasOwnPendingAsyncValidator = !0);
            const n = O_(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new ae()), (this.statusChanges = new ae());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? wi
            : this.errors
            ? Ta
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(ro)
            ? ro
            : this._anyControlsHaveStatus(Ta)
            ? Ta
            : Ci;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Ra(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function wP(e) {
              return Array.isArray(e) ? Sd(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function EP(e) {
              return Array.isArray(e) ? Md(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class Fd extends X_ {
        constructor(t, n, r) {
          super(Nd(n), xd(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          (function K_(e, t, n) {
            e._forEachChild((r, o) => {
              if (void 0 === n[o])
                throw new C(
                  1002,
                  Rd
                    ? (function CP(e, t) {
                        return `Must supply a value for form control ${Y_(
                          e,
                          t
                        )}`;
                      })(t, o)
                    : ""
                );
            });
          })(this, !0, t),
            Object.keys(t).forEach((r) => {
              (function Q_(e, t, n) {
                const r = e.controls;
                if (!(t ? Object.keys(r) : r).length)
                  throw new C(
                    1e3,
                    Rd
                      ? (function DP(e) {
                          return `\n    There are no form controls registered with this ${
                            e ? "group" : "array"
                          } yet. If you're using ngModel,\n    you may want to check next tick (e.g. use setTimeout).\n  `;
                        })(t)
                      : ""
                  );
                if (!r[n])
                  throw new C(
                    1001,
                    Rd
                      ? (function _P(e, t) {
                          return `Cannot find form control ${Y_(e, t)}`;
                        })(t, n)
                      : ""
                  );
              })(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const oo = new S("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Na,
        }),
        Na = "always";
      function Ei(e, t, n = Na) {
        Od(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function MP(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && J_(e, t);
            });
          })(e, t),
          (function AP(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function IP(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && J_(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function SP(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function Oa(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function Od(e, t) {
        const n = (function B_(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators($_(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = (function U_(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators($_(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        Oa(t._rawValidators, o), Oa(t._rawAsyncValidators, o);
      }
      function J_(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const FP = { provide: Ze, useExisting: ne(() => ka) },
        bi = (() => Promise.resolve())();
      let ka = (() => {
        class e extends Ze {
          constructor(n, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new ae()),
              (this.form = new Fd({}, Sd(n), Md(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            bi.then(() => {
              const r = this._findContainer(n.path);
              (n.control = r.registerControl(n.name, n.control)),
                Ei(n.control, n, this.callSetDisabledState),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            bi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            bi.then(() => {
              const r = this._findContainer(n.path),
                o = new Fd({});
              (function eC(e, t) {
                Od(e, t);
              })(o, n),
                r.registerControl(n.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            bi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            bi.then(() => {
              this.form.get(n.path).setValue(r);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function tC(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Ue, 10), D(On, 10), D(oo, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Te("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [se([FP]), X],
          })),
          e
        );
      })();
      function nC(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function rC(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const oC = class extends X_ {
          constructor(t = null, n, r) {
            super(Nd(n), xd(r, n)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              Ra(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = rC(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            nC(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            nC(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            rC(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        kP = { provide: Pn, useExisting: ne(() => Vd) },
        aC = (() => Promise.resolve())();
      let Vd = (() => {
          class e extends Pn {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new oC()),
                (this._registered = !1),
                (this.update = new ae()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function Ld(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Sa
                        ? (n = i)
                        : (function NP(e) {
                            return Object.getPrototypeOf(e.constructor) === nr;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function kd(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Ei(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              aC.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o =
                  0 !== r &&
                  (function zr(e) {
                    return "boolean" == typeof e
                      ? e
                      : null != e && "false" !== e;
                  })(r);
              aC.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function xa(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                D(Ze, 9),
                D(Ue, 10),
                D(On, 10),
                D(Kt, 10),
                D(js, 8),
                D(oo, 8)
              );
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [se([kP]), X, yt],
            })),
            e
          );
        })(),
        uC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        cC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({})),
            e
          );
        })(),
        s1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({ imports: [cC] })),
            e
          );
        })(),
        u1 = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: oo, useValue: n.callSetDisabledState ?? Na },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({ imports: [s1] })),
            e
          );
        })(),
        l1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e })),
            (e.ɵinj = Ye({ imports: [Lc, u1] })),
            e
          );
        })();
      const AC = {
        randomUUID:
          typeof crypto < "u" &&
          crypto.randomUUID &&
          crypto.randomUUID.bind(crypto),
      };
      let La;
      const c1 = new Uint8Array(16);
      function d1() {
        if (
          !La &&
          ((La =
            typeof crypto < "u" &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)),
          !La)
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return La(c1);
      }
      const Pe = [];
      for (let e = 0; e < 256; ++e) Pe.push((e + 256).toString(16).slice(1));
      const Va = function f1(e, t, n) {
        if (AC.randomUUID && !t && !e) return AC.randomUUID();
        const r = (e = e || {}).random || (e.rng || d1)();
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
          n = n || 0;
          for (let o = 0; o < 16; ++o) t[n + o] = r[o];
          return t;
        }
        return (function TC(e, t = 0) {
          return (
            Pe[e[t + 0]] +
            Pe[e[t + 1]] +
            Pe[e[t + 2]] +
            Pe[e[t + 3]] +
            "-" +
            Pe[e[t + 4]] +
            Pe[e[t + 5]] +
            "-" +
            Pe[e[t + 6]] +
            Pe[e[t + 7]] +
            "-" +
            Pe[e[t + 8]] +
            Pe[e[t + 9]] +
            "-" +
            Pe[e[t + 10]] +
            Pe[e[t + 11]] +
            Pe[e[t + 12]] +
            Pe[e[t + 13]] +
            Pe[e[t + 14]] +
            Pe[e[t + 15]]
          ).toLowerCase();
        })(r);
      };
      let h1 = (() => {
        class e {
          constructor() {
            this.characters = [
              { id: Va(), name: "Krilling", power: 1e3 },
              { id: Va(), name: "Goku", power: 9500 },
              { id: Va(), name: "Vegeta", power: 7500 },
            ];
          }
          onNewCharacter(n) {
            if (!n) return;
            const r = { id: Va(), ...n };
            this.characters.push(r);
          }
          onDeleteCharacter(n) {
            this.characters = this.characters.filter((r) => r.id !== n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const p1 = function (e, t) {
        return { "list-group-item-success": e, "list-group-item-danger": t };
      };
      function g1(e, t) {
        if (1 & e) {
          const n = (function Eg() {
            return v();
          })();
          be(0, "li", 2)(1, "div")(2, "span", 3),
            Ct(3),
            Ae(),
            be(4, "span"),
            Ct(5),
            Ae(),
            Ct(6, " - "),
            be(7, "strong"),
            Ct(8, " Pw:"),
            Ae(),
            be(9, "span"),
            Ct(10),
            Ae()(),
            be(11, "button", 4),
            Te("click", function () {
              const i = (function zf(e) {
                return (k.lFrame.contextLView = e), e[fe];
              })(n).$implicit;
              return (function Wf(e) {
                return (k.lFrame.contextLView = null), e;
              })(Tg().emitDeleteCharacter(i.id));
            }),
            Ct(12, " X "),
            Ae()();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = t.index;
          qn("ngClass", ty(4, p1, t.last, t.first)),
            dn(3),
            Ho("", r + 1, " - "),
            dn(2),
            Ss(n.name),
            dn(5),
            Ho(" ", n.power, "");
        }
      }
      let m1 = (() => {
          class e {
            constructor() {
              (this.characterList = []), (this.onDeleteCharacter = new ae());
            }
            emitDeleteCharacter(n) {
              n && this.onDeleteCharacter.emit(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = sr({
              type: e,
              selectors: [["dbz-list"]],
              inputs: { characterList: "characterList" },
              outputs: { onDeleteCharacter: "onDeleteCharacter" },
              decls: 2,
              vars: 1,
              consts: [
                [1, "list-group"],
                [
                  "class",
                  "list-group-item d-flex justify-content-between align-items-center",
                  3,
                  "ngClass",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [
                  1,
                  "list-group-item",
                  "d-flex",
                  "justify-content-between",
                  "align-items-center",
                  3,
                  "ngClass",
                ],
                [1, "text-primary"],
                [1, "btn", "btn-danger", "btn-sm", 3, "click"],
              ],
              template: function (n, r) {
                1 & n &&
                  (be(0, "ul", 0),
                  (function Cg(e, t, n, r, o, i, s, a) {
                    const u = v(),
                      l = W(),
                      c = e + ie,
                      d = l.firstCreatePass
                        ? (function lI(e, t, n, r, o, i, s, a, u) {
                            const l = t.consts,
                              c = Tr(t, e, 4, s || null, wn(l, a));
                            wl(t, n, c, wn(l, u)), Gi(t, c);
                            const d = (c.tView = Cl(
                              2,
                              c,
                              r,
                              o,
                              i,
                              t.directiveRegistry,
                              t.pipeRegistry,
                              null,
                              t.schemas,
                              l
                            ));
                            return (
                              null !== t.queries &&
                                (t.queries.template(t, c),
                                (d.queries = t.queries.embeddedTView(c))),
                              c
                            );
                          })(c, l, u, t, n, r, o, i, s)
                        : l.data[c];
                    $t(d, !1);
                    const f = u[B].createComment("");
                    os(l, u, f, d),
                      je(f, u),
                      gs(u, (u[c] = tg(f, u, f, d))),
                      Bi(d) && Dl(l, u, d),
                      null != s && _l(u, d, a);
                  })(1, g1, 13, 7, "li", 1),
                  Ae()),
                  2 & n && (dn(1), qn("ngForOf", r.characterList));
              },
              dependencies: [Mv, Tv],
            })),
            e
          );
        })(),
        y1 = (() => {
          class e {
            constructor() {
              (this.onNewCharacter = new ae()),
                (this.character = { name: "", power: 0 });
            }
            emitCharacter() {
              0 === this.character.name.length ||
                this.character.power < 0 ||
                isNaN(this.character.power) ||
                (this.onNewCharacter.emit(this.character),
                (this.character = { name: "", power: 0 }));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = sr({
              type: e,
              selectors: [["dbz-add-character"]],
              outputs: { onNewCharacter: "onNewCharacter" },
              decls: 5,
              vars: 2,
              consts: [
                [1, "row", 3, "ngSubmit"],
                [
                  "type",
                  "text",
                  "placeholder",
                  "Nombre del personaje",
                  "name",
                  "name",
                  1,
                  "form-control",
                  "mb-2",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "type",
                  "text",
                  "placeholder",
                  "Poder",
                  "name",
                  "power",
                  1,
                  "form-control",
                  "mb-2",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                ["type", "submit", 1, "btn", "btn-primary"],
              ],
              template: function (n, r) {
                1 & n &&
                  (be(0, "form", 0),
                  Te("ngSubmit", function () {
                    return r.emitCharacter();
                  }),
                  be(1, "input", 1),
                  Te("ngModelChange", function (i) {
                    return (r.character.name = i);
                  }),
                  Ae(),
                  be(2, "input", 2),
                  Te("ngModelChange", function (i) {
                    return (r.character.power = i);
                  }),
                  Ae(),
                  be(3, "button", 3),
                  Ct(4, "Agregar"),
                  Ae()()),
                  2 & n &&
                    (dn(1),
                    qn("ngModel", r.character.name),
                    dn(1),
                    qn("ngModel", r.character.power));
              },
              dependencies: [uC, Sa, q_, Z_, Vd, ka],
            })),
            e
          );
        })(),
        v1 = (() => {
          class e {
            constructor(n) {
              this.dbzService = n;
            }
            get characters() {
              return [...this.dbzService.characters];
            }
            onDeleteCharacter(n) {
              this.dbzService.onDeleteCharacter(n);
            }
            onNewCharacter(n) {
              this.dbzService.onNewCharacter(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(h1));
            }),
            (e.ɵcmp = sr({
              type: e,
              selectors: [["app-dbz-main-page"]],
              decls: 12,
              vars: 1,
              consts: [
                [1, "row", "mb-5"],
                [1, "col"],
                [3, "characterList", "onDeleteCharacter"],
                [3, "onNewCharacter"],
              ],
              template: function (n, r) {
                1 & n &&
                  (be(0, "h1"),
                  Ct(1, "DBZ Personajes"),
                  Ae(),
                  $o(2, "hr"),
                  be(3, "div", 0)(4, "div", 1)(5, "h4"),
                  Ct(6, "Listado"),
                  Ae(),
                  be(7, "dbz-list", 2),
                  Te("onDeleteCharacter", function (i) {
                    return r.onDeleteCharacter(i);
                  }),
                  Ae()(),
                  be(8, "div", 1)(9, "h4"),
                  Ct(10, "Agregar personaje"),
                  Ae(),
                  be(11, "dbz-add-character", 3),
                  Te("onNewCharacter", function (i) {
                    return r.onNewCharacter(i);
                  }),
                  Ae()()()),
                  2 & n && (dn(7), qn("characterList", r.characters));
              },
              dependencies: [m1, y1],
              encapsulation: 2,
            })),
            e
          );
        })(),
        D1 = (() => {
          class e {
            constructor() {
              this.title = "Mi primera app de angular";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = sr({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 1,
              template: function (n, r) {
                1 & n && (be(0, "h1"), Ct(1), Ae(), $o(2, "app-dbz-main-page")),
                  2 & n && (dn(1), Ss(r.title));
              },
              dependencies: [v1],
            })),
            e
          );
        })(),
        _1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = ot({ type: e, bootstrap: [D1] })),
            (e.ɵinj = Ye({ imports: [mx, aP, bx, Sx, l1] })),
            e
          );
        })();
      gx()
        .bootstrapModule(_1)
        .catch((e) => console.error(e));
    },
  },
  (ee) => {
    ee((ee.s = 833));
  },
]);
