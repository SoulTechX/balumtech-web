"use client";
import { useState, useEffect } from "react";
import { Plus, Save, Trash2, Edit, LogOut, X, ChevronDown, ChevronUp, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Spec { key: string; value: string; }
interface Producto {
  id: number; slug: string; name: string;
  price: number | null; priceLabel: string; currency: string;
  cuotas?: number; cuotasPrecio?: string;
  badge: string; badgeType: "nuevo"|"stock"|"pedido"|"pro";
  desc: string; image: string; categoria: string;
  envioGratis: boolean; rating: number; reviews: number;
  gradient: string; envio?: string; stock?: string;
  heroSpecs?: Spec[]; incluye?: string[]; terminalSpecs?: Spec[];
  images?: string[];
}

const GRADIENTS = [
  "from-blue-600/20 via-indigo-600/10 to-transparent",
  "from-purple-600/20 via-purple-600/5 to-transparent",
  "from-cyan-600/20 via-blue-600/5 to-transparent",
  "from-green-600/20 via-emerald-600/5 to-transparent",
  "from-yellow-500/15 via-orange-500/5 to-transparent",
  "from-violet-600/20 via-purple-600/5 to-transparent",
  "from-pink-500/15 via-rose-500/5 to-transparent",
  "from-sky-600/20 via-blue-600/5 to-transparent",
  "from-emerald-600/15 via-green-600/5 to-transparent",
  "from-orange-500/15 via-amber-500/5 to-transparent",
  "from-red-500/15 via-rose-500/5 to-transparent",
  "from-slate-500/15 via-gray-500/5 to-transparent",
];

const empty: Partial<Producto> = {
  name:"", slug:"", desc:"", price:null, priceLabel:"Consultar", currency:"ARS",
  categoria:"IA", badge:"Nuevo", badgeType:"nuevo", image:"", envioGratis:false,
  rating:5, reviews:0, gradient: GRADIENTS[0], envio:"", stock:"Disponible",
  heroSpecs:[], incluye:[], terminalSpecs:[], images:[]
};

function GalleryEditor({ items, onChange }: { items: string[]; onChange: (v: string[]) => void }) {
  const [newUrl, setNewUrl] = useState("");
  const add = () => {
    const url = newUrl.trim();
    if (!url || items.includes(url)) return;
    onChange([...items, url]);
    setNewUrl("");
  };
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="https://tu-servidor.com/foto2.jpg"
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
        />
        <button type="button" onClick={add}
          className="px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-xl text-sm font-bold transition-all flex items-center gap-1">
          <Plus size={14}/> Agregar
        </button>
      </div>
      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {items.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <img src={url} alt={`foto ${i+1}`} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center">
                <button type="button" onClick={() => onChange(items.filter((_,j) => j !== i))}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-400 text-white p-1.5 rounded-lg transition-all">
                  <X size={14}/>
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">PRINCIPAL</span>
              )}
            </div>
          ))}
        </div>
      )}
      {items.length === 0 && (
        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center text-zinc-600 text-sm">
          Sin fotos en la galería. Pegá URLs arriba para agregar.
        </div>
      )}
    </div>
  );
}

function SpecEditor({ label, items, onChange }: { label:string, items:Spec[], onChange:(v:Spec[])=>void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-zinc-400">{label}</label>
        <button type="button" onClick={()=>onChange([...items,{key:"",value:""}])}
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Plus size={12}/> Agregar
        </button>
      </div>
      <div className="space-y-2">
        {items.map((s,i)=>(
          <div key={i} className="flex gap-2 items-center">
            <input value={s.key} onChange={e=>{const n=[...items];n[i]={...n[i],key:e.target.value};onChange(n);}}
              placeholder="Clave" className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"/>
            <input value={s.value} onChange={e=>{const n=[...items];n[i]={...n[i],value:e.target.value};onChange(n);}}
              placeholder="Valor" className="flex-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"/>
            <button type="button" onClick={()=>onChange(items.filter((_,j)=>j!==i))} className="text-red-400 hover:text-red-300 p-1"><X size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListEditor({ label, items, onChange }: { label:string, items:string[], onChange:(v:string[])=>void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-zinc-400">{label}</label>
        <button type="button" onClick={()=>onChange([...items,""])}
          className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
          <Plus size={12}/> Agregar
        </button>
      </div>
      <div className="space-y-2">
        {items.map((it,i)=>(
          <div key={i} className="flex gap-2 items-center">
            <input value={it} onChange={e=>{const n=[...items];n[i]=e.target.value;onChange(n);}}
              placeholder={`Item ${i+1}`} className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"/>
            <button type="button" onClick={()=>onChange(items.filter((_,j)=>j!==i))} className="text-red-400 hover:text-red-300 p-1"><X size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminTiendaPanel() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<Producto>|null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{type:"ok"|"err", text:string}|null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(()=>{
    fetch("/api/productos").then(r=>r.json()).then(d=>{setProductos(d);setLoading(false);}).catch(()=>setLoading(false));
  },[]);

  const showMsg = (type:"ok"|"err", text:string) => { setMsg({type,text}); setTimeout(()=>setMsg(null),3000); };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleSave = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!current) return;
    setSaving(true);
    if(!current.slug && current.name) current.slug = current.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'');
    const method = current.id ? "PUT" : "POST";
    try {
      const res = await fetch("/api/productos",{ method, headers:{"Content-Type":"application/json"}, body:JSON.stringify(current) });
      const result = await res.json();
      if(result.success) {
        if(method==="PUT") setProductos(prev=>prev.map(p=>p.id===result.product.id?result.product:p));
        else setProductos(prev=>[...prev, result.product]);
        setIsEditing(false); setCurrent(null);
        showMsg("ok","✓ Producto guardado correctamente");
      } else showMsg("err","Error: "+result.error);
    } catch { showMsg("err","Error de conexión"); }
    setSaving(false);
  };

  const handleDelete = async (id:number) => {
    if(!confirm("¿Eliminar este producto?")) return;
    const res = await fetch(`/api/productos?id=${id}`,{method:"DELETE"});
    const result = await res.json();
    if(result.success) { setProductos(prev=>prev.filter(p=>p.id!==id)); showMsg("ok","Producto eliminado"); }
  };

  const set = (field:string, val:any) => setCurrent(prev=>({...prev,[field]:val}));

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Fixed BG */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-20%] w-[50vw] h-[50vw] bg-blue-600/8 blur-[150px] rounded-full"/>
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/8 blur-[120px] rounded-full"/>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-xl font-black tracking-tight">BALUM<span className="text-blue-500">Tech</span></div>
            <span className="text-xs text-zinc-600 border border-white/10 px-2 py-0.5 rounded-md font-mono">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/tienda" target="_blank" className="text-xs text-zinc-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors">Ver Tienda ↗</Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-all">
              <LogOut size={14}/> Salir
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {msg && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl font-semibold text-sm shadow-2xl transition-all ${msg.type==="ok"?"bg-green-600 text-white":"bg-red-600 text-white"}`}>
          {msg.text}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-20">
        {/* Header acciones */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Gestión de Productos</h2>
            <p className="text-zinc-500 text-sm mt-1">{productos.length} productos en catálogo</p>
          </div>
          <button onClick={()=>{setCurrent({...empty});setIsEditing(true);setShowAdvanced(false);}}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <Plus size={18}/> Nuevo Producto
          </button>
        </div>

        {isEditing && current ? (
          /* ─── FORMULARIO ─── */
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl mb-10 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold">{current.id ? "Editar Producto" : "Nuevo Producto"}</h3>
              <button onClick={()=>{setIsEditing(false);setCurrent(null);}} className="text-zinc-500 hover:text-white p-2 rounded-lg hover:bg-white/5"><X size={20}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* SECCIÓN: INFO BÁSICA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Nombre del Producto *</label>
                  <input required type="text" value={current.name||""} onChange={e=>set("name",e.target.value)} placeholder="Ej: Kit CCTV Hogar 4 Cámaras"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"/>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Descripción Breve *</label>
                  <textarea required rows={2} value={current.desc||""} onChange={e=>set("desc",e.target.value)} placeholder="Descripción que aparece en la card"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Categoría</label>
                  <select value={current.categoria||"IA"} onChange={e=>set("categoria",e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                    {["IA","Seguridad","Redes","Hardware"].map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Precio (número, 0 = Consultar)</label>
                  <input type="number" value={current.price||""} onChange={e=>set("price", parseFloat(e.target.value)||null)} placeholder="285000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Precio Etiqueta</label>
                  <input type="text" value={current.priceLabel||""} onChange={e=>set("priceLabel",e.target.value)} placeholder="$285.000 o Consultar"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Cuotas (cantidad)</label>
                  <input type="number" value={current.cuotas||""} onChange={e=>set("cuotas",parseInt(e.target.value)||undefined)} placeholder="12"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Precio por cuota</label>
                  <input type="text" value={current.cuotasPrecio||""} onChange={e=>set("cuotasPrecio",e.target.value)} placeholder="$28.420"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Badge (texto)</label>
                  <input type="text" value={current.badge||""} onChange={e=>set("badge",e.target.value)} placeholder="Stock, Nuevo, Pro..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Estilo Badge</label>
                  <select value={current.badgeType||"nuevo"} onChange={e=>set("badgeType",e.target.value as any)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                    <option value="nuevo">🔵 Azul — Nuevo/Especialidad</option>
                    <option value="stock">🟢 Verde — Stock/Instalación</option>
                    <option value="pedido">🟠 Naranja — A pedido/Proyecto</option>
                    <option value="pro">🟣 Púrpura — Pro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Envío / Instalación</label>
                  <input type="text" value={current.envio||""} onChange={e=>set("envio",e.target.value)} placeholder="Envío gratis a Sarmiento..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Stock / Disponibilidad</label>
                  <input type="text" value={current.stock||""} onChange={e=>set("stock",e.target.value)} placeholder="En stock / A pedido — 7 días"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="envioGratis" checked={current.envioGratis||false} onChange={e=>set("envioGratis",e.target.checked)}
                    className="w-5 h-5 rounded accent-blue-500"/>
                  <label htmlFor="envioGratis" className="text-sm font-semibold text-zinc-300">Envío/Instalación Gratis</label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">🖼 URL de la Imagen</label>
                  <input type="text" value={current.image||""} onChange={e=>set("image",e.target.value)} placeholder="https://tu-servidor.com/foto.jpg o /productos/nombre.png"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                  {current.image && (
                    <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-black/40 relative">
                      <img src={current.image} alt="preview" className="object-cover w-full h-full opacity-80"/>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">Gradiente de fondo (card)</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {GRADIENTS.map((g,i)=>(
                      <button key={i} type="button" onClick={()=>set("gradient",g)}
                        className={`h-10 rounded-lg bg-gradient-to-br ${g} border-2 transition-all ${current.gradient===g?"border-blue-400 scale-105":"border-white/10 hover:border-white/30"}`}/>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECCIÓN AVANZADA */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button type="button" onClick={()=>setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <span className="font-semibold text-zinc-300 text-sm">⚙️ Detalles del Producto (página interna)</span>
                  {showAdvanced ? <ChevronUp size={18} className="text-zinc-400"/> : <ChevronDown size={18} className="text-zinc-400"/>}
                </button>

                {showAdvanced && (
                  <div className="p-5 space-y-6 border-t border-white/10">
                    {/* GALERÍA */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-300 mb-1">
                        🖼️ Galería de Imágenes
                      </label>
                      <p className="text-xs text-zinc-500 mb-3">
                        La primera foto marcada como <span className="text-blue-400 font-semibold">PRINCIPAL</span> es la que se muestra en la página de detalle como imagen grande. Podés reordenar eliminando y volviendo a agregar.
                      </p>
                      <GalleryEditor items={current.images||[]} onChange={v=>set("images",v)}/>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <SpecEditor label="Hero Specs (grilla de características principales)"
                        items={current.heroSpecs||[]} onChange={v=>set("heroSpecs",v)}/>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <ListEditor label="¿Qué Incluye? (lista de items del producto)"
                        items={current.incluye||[]} onChange={v=>set("incluye",v)}/>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <SpecEditor label='Terminal Specs (panel "código" de especificaciones técnicas)'
                        items={current.terminalSpecs||[]} onChange={v=>set("terminalSpecs",v)}/>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button type="button" onClick={()=>{setIsEditing(false);setCurrent(null);}}
                  className="px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/5 transition-colors">Cancelar</button>
                <button type="submit" disabled={saving}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Save size={18}/> {saving ? "Guardando..." : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ─── TABLA ─── */
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            {loading ? (
              <div className="p-16 text-center text-zinc-500">Cargando productos...</div>
            ) : productos.length === 0 ? (
              <div className="p-16 text-center">
                <Package size={48} className="text-zinc-700 mx-auto mb-4"/>
                <p className="text-zinc-400">No hay productos. ¡Agregá el primero!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-500 text-xs uppercase tracking-wider">
                      <th className="px-5 py-4">Producto</th>
                      <th className="px-5 py-4">Categoría</th>
                      <th className="px-5 py-4">Precio</th>
                      <th className="px-5 py-4">Cuotas</th>
                      <th className="px-5 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {productos.map(prod=>(
                      <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden relative border border-white/10 flex-shrink-0">
                              {prod.image && <img src={prod.image} alt="" className="w-full h-full object-cover"/>}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm line-clamp-1 max-w-xs">{prod.name}</div>
                              <div className="text-xs text-zinc-600 mt-0.5">{prod.badge} · /{prod.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs font-semibold text-zinc-400">{prod.categoria}</span>
                        </td>
                        <td className="px-5 py-4 font-bold text-blue-400 text-sm">{prod.priceLabel}</td>
                        <td className="px-5 py-4 text-sm text-zinc-500">
                          {prod.cuotas ? `${prod.cuotas}x ${prod.cuotasPrecio}` : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button onClick={()=>{setCurrent({...prod, heroSpecs:prod.heroSpecs||[], incluye:prod.incluye||[], terminalSpecs:prod.terminalSpecs||[]});setIsEditing(true);setShowAdvanced(false);}}
                              className="p-2 rounded-lg hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 transition-colors" title="Editar">
                              <Edit size={17}/>
                            </button>
                            <button onClick={()=>handleDelete(prod.id)}
                              className="p-2 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors" title="Eliminar">
                              <Trash2 size={17}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
