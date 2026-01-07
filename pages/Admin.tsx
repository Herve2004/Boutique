
import React, { useState, useMemo } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Search, 
  TrendingUp,
  Settings,
  Edit2,
  Trash2,
  X,
  Check,
  Eye,
  Download,
  Bell,
  Globe,
  Lock,
  CreditCard,
  Truck,
  AlertTriangle,
  ArrowRight,
  Mail,
  PieChart,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, Segment, ProductType } from '../types';

const motion = motionBase as any;

// Types additionnels
interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'En attente' | 'Expédiée' | 'Livrée' | 'Annulée';
  items: { name: string; quantity: number; price: number }[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
  spent: number;
  orders: number;
  lastOrder: string;
}

interface AdminMessage {
  id: string;
  sender: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'messages' | 'settings'>('dashboard');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Tous');
  
  // États pour les Commandes
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-8492', customer: 'Jean Masson', email: 'j.masson@email.com', date: '2024-05-20', total: 1250, status: 'Livrée', items: [{ name: 'Manteau d\'Hiver Signature', quantity: 1, price: 850 }, { name: 'Oxford Héritage', quantity: 1, price: 400 }] },
    { id: 'ORD-8493', customer: 'Sophie Laurent', email: 'sophie.l@email.com', date: '2024-05-21', total: 3200, status: 'Expédiée', items: [{ name: 'Vanguard Titanium Noir', quantity: 1, price: 3200 }] },
    { id: 'ORD-8494', customer: 'Marc Perrin', email: 'm.perrin@email.com', date: '2024-05-22', total: 1200, status: 'En attente', items: [{ name: 'Robe du Soir Aurora', quantity: 1, price: 1200 }] },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // États pour les Messages Clients
  const [messages, setMessages] = useState<AdminMessage[]>([
    { id: 'MSG-001', sender: 'Lucas Bernard', email: 'lucas.b@test.com', subject: 'Demande de taille', content: "Bonjour, je souhaiterais savoir si le manteau signature sera disponible en XXL prochainement ?", date: '2024-05-23', isRead: false },
    { id: 'MSG-002', sender: 'Emma Petit', email: 'emma@petit.fr', subject: 'Retour produit', content: "Ma commande ORD-8490 est arrivée mais la taille ne convient pas. Comment procéder ?", date: '2024-05-22', isRead: true },
    { id: 'MSG-003', sender: 'Thomas Leroy', email: 't.leroy@mail.com', subject: 'Partenariat', content: "Bonjour, je suis photographe de mode et j'aimerais collaborer avec votre marque.", date: '2024-05-21', isRead: false },
  ]);

  // États pour les Clients
  const [customers] = useState<Customer[]>([
    { id: 'CUST-01', name: 'Jean Masson', email: 'j.masson@email.com', spent: 4500, orders: 3, lastOrder: '2024-05-20' },
    { id: 'CUST-02', name: 'Sophie Laurent', email: 'sophie.l@email.com', spent: 3200, orders: 1, lastOrder: '2024-05-21' },
    { id: 'CUST-03', name: 'Marc Perrin', email: 'm.perrin@email.com', spent: 1200, orders: 1, lastOrder: '2024-05-22' },
  ]);

  const stats = [
    { label: 'Chiffre d\'Affaires', value: '124,500 €', change: '+12.5%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Panier Moyen', value: '450 €', change: '+3.1%', icon: CreditCard, color: 'text-blue-500' },
    { label: 'Taux Conversion', value: '4.2%', change: '+0.8%', icon: BarChart3, color: 'text-purple-500' },
  ];

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleMarkRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'Tous' || p.segment === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [productsList, searchQuery, categoryFilter]);

  // Modal logic for products
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', price: 0, type: 'Habits', segment: 'Homme', season: 'Printemps', description: '', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=90&w=2000'], specs: []
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newProduct: Product = { ...formData as Product, id: `custom-${Date.now()}` };
      setProductsList(prev => [newProduct, ...prev]);
    } else if (modalMode === 'edit' && editingProduct) {
      setProductsList(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    }
    setModalMode(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col md:flex-row font-sans">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-80 bg-white border-r border-black/5 p-10 flex flex-col gap-12 z-20">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-black rounded-[1rem] flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-lg tracking-tighter">É</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-base uppercase">L'Élégance</span>
            <span className="text-[10px] text-[#6e6e73] font-bold uppercase tracking-widest">Dashboard Pro</span>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Inventaire', icon: Package },
            { id: 'orders', label: 'Commandes', icon: ShoppingBag },
            { id: 'customers', label: 'Clients', icon: Users },
            { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
            { id: 'settings', label: 'Paramètres', icon: Settings },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`group flex items-center gap-4 px-6 py-4 rounded-[1.2rem] text-sm font-semibold transition-all duration-300 ${activeTab === item.id ? 'bg-black text-white shadow-2xl translate-x-2' : 'text-[#6e6e73] hover:bg-stone-50 hover:text-black'}`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} /> 
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === item.id ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-8 bg-[#f5f5f7] rounded-[2rem] border border-black/5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6e6e73]">Système</p>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6e6e73]">Stock Total</span>
              <span>2,480 pcs</span>
            </div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
              <div className="w-[75%] h-full bg-black rounded-full" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-14 overflow-y-auto pt-24 md:pt-14">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#6e6e73] mb-3">
              <Calendar size={14} /> 24 Mai 2024
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">
              {activeTab === 'dashboard' ? 'Overview' : 
               activeTab === 'products' ? 'Inventaire' : 
               activeTab === 'orders' ? 'Transactions' : 
               activeTab === 'customers' ? 'Clients' : 
               activeTab === 'messages' ? 'Inbox' : 'Configuration'}
            </h1>
            <p className="text-[#6e6e73] font-medium text-lg">
              Gestion centralisée de votre boutique haut de gamme.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <button className="p-4 bg-white border border-black/5 rounded-2xl text-[#6e6e73] hover:text-black hover:shadow-xl transition-all">
                <Bell size={22} />
              </button>
              {unreadCount > 0 && <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />}
            </div>
            {activeTab === 'products' && (
              <button 
                onClick={() => setModalMode('add')}
                className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-2xl active:scale-95"
              >
                <Plus size={20} /> Nouveau Produit
              </button>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3rem] apple-card-shadow border border-black/5 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className={`p-5 rounded-2xl bg-stone-50 ${stat.color} shadow-sm`}>
                        <stat.icon size={32} strokeWidth={2.5} />
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-black px-4 py-2 rounded-full bg-stone-50 ${stat.color}`}>
                          {stat.change}
                        </span>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6e6e73] mt-3">{stat.label}</p>
                      </div>
                    </div>
                    <h3 className="text-5xl font-black tracking-tighter relative z-10">{stat.value}</h3>
                    <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                      <stat.icon size={200} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Charts & Notifications Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Revenue Chart */}
                <div className="bg-white p-12 rounded-[3rem] apple-card-shadow border border-black/5 flex flex-col">
                  <div className="flex justify-between items-center mb-12">
                    <h3 className="text-2xl font-black tracking-tighter">Évolution Revenus</h3>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#6e6e73]">
                        <span className="w-3 h-3 bg-black rounded-full" /> Boutique
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow flex items-end justify-between gap-6 h-64">
                    {[45, 60, 40, 85, 55, 95, 75, 80, 65, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-grow flex flex-col items-center gap-4 group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                          className="w-full bg-gradient-to-t from-stone-50 to-black rounded-full relative group-hover:shadow-xl transition-all"
                        >
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-black py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {Math.floor(h * 1500)}€
                          </div>
                        </motion.div>
                        <span className="text-[8px] font-black text-[#6e6e73] uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications & Distribution */}
                <div className="space-y-10">
                  {/* Category Distribution (Simple bars) */}
                  <div className="bg-white p-12 rounded-[3rem] apple-card-shadow border border-black/5">
                    <h3 className="text-2xl font-black tracking-tighter mb-10">Performance Segments</h3>
                    <div className="space-y-8">
                      {[
                        { label: 'Homme', value: 45, color: 'bg-black' },
                        { label: 'Femme', value: 35, color: 'bg-stone-400' },
                        { label: 'Enfant', value: 20, color: 'bg-stone-200' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between items-end">
                            <span className="text-sm font-bold">{item.label}</span>
                            <span className="text-xs font-black">{item.value}%</span>
                          </div>
                          <div className="w-full h-4 bg-stone-50 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                              className={`h-full ${item.color} rounded-full`} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stock Alert */}
                  <div className="bg-white p-12 rounded-[3rem] apple-card-shadow border border-black/5 bg-gradient-to-br from-white to-orange-50/30">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
                        <AlertTriangle size={24} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-black tracking-tighter">Réapprovisionnement</h3>
                    </div>
                    <p className="text-sm text-[#6e6e73] font-medium mb-8">4 références sont passées sous le seuil critique cette semaine.</p>
                    <button onClick={() => setActiveTab('products')} className="w-full py-4 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-2xl transition-all">Consulter le stock</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div key="messages" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-[3rem] apple-card-shadow border border-black/5 overflow-hidden">
              <div className="p-10 border-b border-black/5 flex justify-between items-center bg-stone-50/50">
                <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                  <Mail size={24} /> Boîte de Réception
                </h3>
                <div className="flex gap-4">
                   <span className="px-5 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">{unreadCount} Nouveaux</span>
                </div>
              </div>
              <div className="divide-y divide-black/5">
                {messages.length > 0 ? messages.map(msg => (
                  <div key={msg.id} className={`p-10 hover:bg-stone-50 transition-all group relative ${!msg.isRead ? 'bg-blue-50/20' : ''}`}>
                    {!msg.isRead && <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-lg" />}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <p className={`font-black text-lg ${!msg.isRead ? 'text-black' : 'text-[#6e6e73]'}`}>{msg.sender}</p>
                          <span className="text-[10px] font-bold text-[#6e6e73] uppercase bg-stone-100 px-3 py-1 rounded-full">{msg.date}</span>
                        </div>
                        <p className="font-bold text-sm text-black mb-4">{msg.subject}</p>
                        <p className="text-sm text-[#6e6e73] leading-relaxed max-w-3xl">{msg.content}</p>
                      </div>
                      <div className="flex md:flex-col justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!msg.isRead && (
                          <button 
                            onClick={() => handleMarkRead(msg.id)}
                            className="p-4 bg-stone-100 hover:bg-black hover:text-white rounded-2xl transition-all text-[#6e6e73]"
                            title="Marquer comme lu"
                          >
                            <Check size={20} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-4 bg-stone-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all text-[#6e6e73]"
                          title="Supprimer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-32 text-center text-[#6e6e73] italic">Votre boîte de réception est vide.</div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] apple-card-shadow border border-black/5 overflow-hidden">
              <div className="p-10 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6e6e73]" size={20} />
                  <input 
                    type="text" 
                    placeholder="Filtrer les pièces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-[#f5f5f7] rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-black/5 outline-none transition-all"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {['Tous', 'Homme', 'Femme', 'Enfant'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${categoryFilter === cat ? 'bg-black text-white shadow-xl' : 'bg-[#f5f5f7] text-[#6e6e73] hover:bg-stone-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f5f5f7] text-[10px] font-black uppercase tracking-[0.3em] text-[#6e6e73]">
                    <tr>
                      <th className="px-12 py-6">Produit</th>
                      <th className="px-12 py-6">Catégorie</th>
                      <th className="px-12 py-6">Prix</th>
                      <th className="px-12 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="group hover:bg-stone-50 transition-colors">
                        <td className="px-12 py-8">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 p-2 overflow-hidden flex-shrink-0">
                              <img src={p.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                              <p className="font-black text-lg tracking-tighter">{p.name}</p>
                              <p className="text-[10px] text-[#6e6e73] font-bold tracking-widest uppercase">REF: {p.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-8">
                          <span className="text-[11px] font-black uppercase tracking-widest text-[#6e6e73] bg-stone-100 px-4 py-2 rounded-full">{p.type}</span>
                        </td>
                        <td className="px-12 py-8 text-xl font-black">{p.price} €</td>
                        <td className="px-12 py-8 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-4 bg-stone-100 hover:bg-black hover:text-white rounded-2xl transition-all text-[#6e6e73]">
                              <Edit2 size={20} />
                            </button>
                            <button className="p-4 bg-stone-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all text-[#6e6e73]">
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[3rem] apple-card-shadow border border-black/5 overflow-hidden">
               <div className="p-10 border-b border-black/5 bg-stone-50/50">
                  <h3 className="text-2xl font-black tracking-tighter">Historique des Transactions</h3>
               </div>
               <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f5f5f7] text-[10px] font-black uppercase tracking-[0.3em] text-[#6e6e73]">
                    <tr>
                      <th className="px-12 py-6">ID Commande</th>
                      <th className="px-12 py-6">Client</th>
                      <th className="px-12 py-6">Statut</th>
                      <th className="px-12 py-6 text-right">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {orders.map(o => (
                      <tr key={o.id} onClick={() => setSelectedOrder(o)} className="hover:bg-stone-50 transition-colors cursor-pointer">
                        <td className="px-12 py-8 font-black text-lg tracking-tighter">{o.id}</td>
                        <td className="px-12 py-8">
                          <p className="font-bold text-sm">{o.customer}</p>
                          <p className="text-[10px] text-[#6e6e73] font-medium">{o.email}</p>
                        </td>
                        <td className="px-12 py-8">
                          <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            o.status === 'Livrée' ? 'bg-green-50 text-green-600' : 
                            o.status === 'Expédiée' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-12 py-8 text-right font-black text-xl">{o.total} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            </motion.div>
          )}

          {activeTab === 'customers' && (
            <motion.div key="customers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {customers.map(c => (
                <div key={c.id} className="bg-white p-12 rounded-[3.5rem] apple-card-shadow border border-black/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-24 h-24 bg-stone-50 border border-black/5 rounded-[2.5rem] flex items-center justify-center text-black mb-8 group-hover:scale-110 transition-transform">
                    <Users size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter mb-2">{c.name}</h3>
                  <p className="text-sm font-medium text-[#6e6e73] mb-10">{c.email}</p>
                  <div className="grid grid-cols-2 gap-6 w-full mb-10">
                    <div className="p-6 bg-stone-50 rounded-[2rem] border border-black/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#6e6e73] mb-2">Dépenses</p>
                      <p className="font-black text-xl tracking-tighter">{c.spent}€</p>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-[2rem] border border-black/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#6e6e73] mb-2">Orders</p>
                      <p className="font-black text-xl tracking-tighter">{c.orders}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-[0.3em] text-black hover:opacity-50 transition-all flex items-center gap-3">
                    Consulter Dossier <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-10">
              <div className="bg-white p-14 rounded-[3.5rem] apple-card-shadow border border-black/5">
                <h3 className="text-3xl font-black tracking-tighter mb-12 flex items-center gap-4">
                  <Globe size={32} /> Paramètres Généraux
                </h3>
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] ml-2">Enseigne Officielle</label>
                      <input type="text" defaultValue="L'Élégance Moderne" className="w-full bg-[#f5f5f7] py-5 px-8 rounded-[1.5rem] text-sm font-bold outline-none border-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] ml-2">Contact Support</label>
                      <input type="email" defaultValue="conciergerie@elegance.com" className="w-full bg-[#f5f5f7] py-5 px-8 rounded-[1.5rem] text-sm font-bold outline-none border-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal Détails Commande */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setSelectedOrder(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl relative z-10 p-14 overflow-hidden max-h-[90vh] flex flex-col">
              <button onClick={() => setSelectedOrder(null)} className="absolute top-12 right-12 text-[#6e6e73] hover:text-black transition-colors"><X size={32} /></button>
              <h2 className="text-4xl font-black tracking-tighter mb-12">{selectedOrder.id}</h2>
              <div className="flex-grow overflow-y-auto pr-4 space-y-12">
                 <div className="flex justify-between p-8 bg-stone-50 rounded-[2.5rem]">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] mb-2">Client</p>
                      <p className="font-black text-xl">{selectedOrder.customer}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] mb-2">Statut</p>
                       <span className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase">{selectedOrder.status}</span>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] px-2">Récapitulatif Articles</p>
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-6 bg-stone-50/50 rounded-2xl border border-black/5">
                        <p className="font-bold">{item.name}</p>
                        <p className="font-black">{item.price} €</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="mt-12 pt-10 border-t border-black/5 flex justify-between items-end">
                  <p className="text-4xl font-black">{selectedOrder.total} €</p>
                  <button className="bg-black text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-2xl transition-all">Télécharger PDF</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Ajout/Edit Produit */}
      <AnimatePresence>
        {modalMode && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setModalMode(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl relative z-10 p-14 overflow-hidden max-h-[90vh] flex flex-col">
              <button onClick={() => setModalMode(null)} className="absolute top-12 right-12 text-[#6e6e73] hover:text-black transition-colors"><X size={32} /></button>
              <h2 className="text-4xl font-black tracking-tighter mb-12">{modalMode === 'add' ? 'Ajout Référence' : 'Édition Pièce'}</h2>
              <form className="space-y-10 overflow-y-auto pr-2" onSubmit={handleFormSubmit}>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] ml-2">Désignation</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#f5f5f7] py-5 px-8 rounded-[1.5rem] font-bold outline-none border-none" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] ml-2">Prix Public (€)</label>
                    <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-[#f5f5f7] py-5 px-8 rounded-[1.5rem] font-bold outline-none border-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#6e6e73] ml-2">Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as ProductType})} className="w-full bg-[#f5f5f7] py-5 px-8 rounded-[1.5rem] font-bold outline-none border-none appearance-none">
                      <option value="Habits">Habits</option>
                      <option value="Montres">Montres</option>
                      <option value="Chaussures">Chaussures</option>
                      <option value="Pantalons">Pantalons</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                  <Check size={20} /> Valider la Publication
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
