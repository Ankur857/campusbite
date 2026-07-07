"use client";

import { useState, useEffect } from "react";
import AdminLeftPanel from "../../../components/admin/AdminLeftPanel";
import { Search, Eye, X, BookOpen, ShoppingBag, CreditCard, Award } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderHistory {
  id: string;
  dailyOrderId: number | null;
  createdAt: string;
  status: string;
  totalAmount: string;
  items: OrderItem[];
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  bitePoints: number;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
  totalItems: number;
  mostOrderedItem: string;
  orderHistory: OrderHistory[];
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/admin/students");
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          console.error("Failed to fetch students. Status:", res.status);
        }
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

  // Compute directory metrics
  const totalStudents = students.length;
  const totalOrders = students.reduce((sum, s) => sum + s.totalOrders, 0);
  const totalSpendVal = students.reduce((sum, s) => sum + s.totalSpent, 0);
  const avgSpent = totalStudents > 0 ? (totalSpendVal / totalStudents).toFixed(0) : "0";
  
  const topSpender = [...students].sort((a, b) => b.totalSpent - a.totalSpent)[0];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      confirmed: "bg-orange-50 text-orange-700 border-orange-200",
      preparing: "bg-blue-50 text-blue-700 border-blue-200",
      ready: "bg-indigo-50 text-indigo-700 border-indigo-200",
      delivered: "bg-green-50 text-green-700 border-green-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AdminLeftPanel />

      <div className="flex-1 p-8 overflow-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Student Directory</h1>
            <p className="text-gray-500 text-sm mt-1">
              Analyze purchasing habits and student order histories
            </p>
          </div>

          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-5 py-2.5 w-full md:w-80 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition-all">
            <Search size={18} className="text-gray-400" />
            <input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none w-full text-sm text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-semibold animate-pulse">
            Loading student records...
          </div>
        ) : (
          <>
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xl">
                  👥
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Students</p>
                  <h3 className="text-2xl font-black text-gray-800 mt-1">{totalStudents}</h3>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
                  📦
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Orders</p>
                  <h3 className="text-2xl font-black text-gray-800 mt-1">{totalOrders}</h3>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                  💳
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Avg Spent</p>
                  <h3 className="text-2xl font-black text-gray-800 mt-1">₹{avgSpent}</h3>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  👑
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Top Spender</p>
                  <h3 className="text-base font-bold text-gray-800 truncate mt-1">
                    {topSpender ? `${topSpender.name} (₹${topSpender.totalSpent})` : "N/A"}
                  </h3>
                </div>
              </div>
            </div>

            {/* DIRECTORY TABLE */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="text-left p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="text-left p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Orders</th>
                      <th className="text-left p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Items</th>
                      <th className="text-left p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Favorite Item</th>
                      <th className="text-left p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Spent</th>
                      <th className="text-center p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-500">
                          No students match the search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map(student => (
                        <tr key={student.id} className="hover:bg-orange-50/20 transition duration-200">
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 font-bold text-white flex items-center justify-center text-sm shadow">
                                {student.name[0]?.toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{student.name}</h4>
                                <p className="text-xs text-gray-400 mt-0.5">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-5 text-sm text-gray-600">{student.phone || "—"}</td>
                          <td className="p-5 text-sm text-center text-gray-700 font-semibold">{student.totalOrders}</td>
                          <td className="p-5 text-sm text-center text-gray-700">{student.totalItems}</td>
                          <td className="p-5 text-sm text-gray-700">
                            {student.mostOrderedItem !== "None" ? (
                              <span className="inline-flex rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs font-medium border border-orange-100">
                                🍕 {student.mostOrderedItem}
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="p-5 text-sm text-right font-bold text-orange-700">₹{student.totalSpent}</td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => setSelectedStudent(student)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition"
                            >
                              <Eye size={14} /> History
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border animate-slide-up">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white text-orange-600 font-extrabold text-2xl flex items-center justify-center shadow-lg">
                  {selectedStudent.name[0]?.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-black">{selectedStudent.name}</h2>
                  <p className="text-white/80 text-sm mt-0.5">{selectedStudent.email}</p>
                  <p className="text-white/80 text-sm">{selectedStudent.phone || "No phone listed"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-orange-200" />
                  <div>
                    <p className="text-xs text-orange-100 uppercase tracking-wide">Orders</p>
                    <p className="font-extrabold text-lg">{selectedStudent.totalOrders}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-x border-white/10 px-4">
                  <CreditCard size={20} className="text-orange-200" />
                  <div>
                    <p className="text-xs text-orange-100 uppercase tracking-wide">Total Spend</p>
                    <p className="font-extrabold text-lg">₹{selectedStudent.totalSpent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-2">
                  <Award size={20} className="text-orange-200" />
                  <div>
                    <p className="text-xs text-orange-100 uppercase tracking-wide">Bite Points</p>
                    <p className="font-extrabold text-lg">{selectedStudent.bitePoints}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body (Order History Table) */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-orange-600" /> Order History
              </h3>
              
              {selectedStudent.orderHistory.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  This student hasn't placed any orders yet.
                </div>
              ) : (
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-100">
                      <tr>
                        <th className="p-4 text-left">Order ID</th>
                        <th className="p-4 text-left">Date & Time</th>
                        <th className="p-4 text-left">Items Ordered</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedStudent.orderHistory.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition duration-150">
                          <td className="p-4 font-semibold text-gray-800">
                            #{order.dailyOrderId || order.id.slice(0, 8).toUpperCase()}
                          </td>
                          <td className="p-4 text-gray-500">
                            {new Date(order.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="p-4 text-gray-700 max-w-xs">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="truncate">
                                • {item.name} <span className="text-gray-400 text-xs font-semibold">x{item.quantity}</span>
                              </div>
                            ))}
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right font-bold text-gray-900">
                            ₹{parseFloat(order.totalAmount).toFixed(0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
