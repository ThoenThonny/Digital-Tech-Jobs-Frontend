import { useState } from 'react';
import { Plus, Trash2, Edit2, Save, LayoutDashboard, ListTodo, CheckCircle2, Clock4, Users, LogOut, X, Menu } from 'lucide-react';

function Modal({ open, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      ></div>
      <div
        className={`bg-gray-900 rounded-lg shadow-lg p-6 z-10 max-w-md w-full transform transition-all duration-300 ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Fix Login Bug', status: 'in-progress', priority: 'high', dueDate: '2025-10-15', assignee: 'John Doe', createdBy: 'Admin' },
    { id: 2, title: 'Design Dashboard UI', status: 'completed', priority: 'medium', dueDate: '2025-10-10', assignee: 'Jane Smith', createdBy: 'Admin' },
    { id: 3, title: 'Update Documentation', status: 'pending', priority: 'low', dueDate: '2025-10-20', assignee: 'Mike Johnson', createdBy: 'User' },
    { id: 4, title: 'Performance Optimization', status: 'in-progress', priority: 'high', dueDate: '2025-10-18', assignee: 'Sarah Williams', createdBy: 'Admin' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', department: 'Management', phone: '+1-234-567-8900', joinDate: '2024-01-15' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', department: 'Development', phone: '+1-234-567-8901', joinDate: '2024-02-20' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', department: 'Design', phone: '+1-234-567-8902', joinDate: '2024-03-10' },
  ]);

  const [currentUser] = useState({ id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', avatar: 'A' });
  const [newJob, setNewJob] = useState('');
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [showJobModal, setShowJobModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [jobFormData, setJobFormData] = useState({ title: '', status: 'pending', priority: 'medium', dueDate: '', assignee: '' });
  const [userFormData, setUserFormData] = useState({ name: '', email: '', role: 'user', department: '', phone: '', joinDate: '' });

  // Job Modal
  const openJobModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setJobFormData({ ...job });
    } else {
      setEditingJob(null);
      setJobFormData({ title: newJob || '', status: 'pending', priority: 'medium', dueDate: '', assignee: '' });
      setNewJob('');
    }
    setShowJobModal(true);
  };

  const saveJob = () => {
    if (!jobFormData.title || !jobFormData.assignee || !jobFormData.dueDate) {
      alert('Please fill all fields');
      return;
    }
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? { ...jobFormData, id: editingJob.id, createdBy: editingJob.createdBy } : j));
    } else {
      setJobs([...jobs, { ...jobFormData, id: Date.now(), createdBy: currentUser.role }]);
    }
    setShowJobModal(false);
  };

  const deleteJob = (id) => setJobs(jobs.filter(job => job.id !== id));

  // User Modal
  const openUserModal = (user = null) => {
    setEditingUser(user);
    setUserFormData(user ? { ...user } : { name: '', email: '', role: 'user', department: '', phone: '', joinDate: new Date().toISOString().split('T')[0] });
    setShowUserModal(true);
  };

  const saveUser = () => {
    if (!userFormData.name || !userFormData.email) return alert('Please fill all fields');
    editingUser ? setUsers(users.map(u => u.id === editingUser.id ? { ...userFormData, id: editingUser.id } : u)) : setUsers([...users, { ...userFormData, id: Date.now() }]);
    setShowUserModal(false);
  };

  const deleteUser = (id) => setUsers(users.filter(user => user.id !== id));

  const handleLogout = () => { setShowLogoutModal(false); alert('Logged out!'); };

  // Stats & Filters
  const filteredJobs = jobs.filter(job => filter === 'all' || job.status === filter);
  const stats = { total: jobs.length, completed: jobs.filter(j => j.status === 'completed').length, inProgress: jobs.filter(j => j.status === 'in-progress').length, pending: jobs.filter(j => j.status === 'pending').length };
  const getStatusColor = s => s === 'completed' ? 'bg-gray-800 text-gray-200 border border-gray-700' : s === 'in-progress' ? 'bg-gray-700 text-gray-100 border border-gray-600' : 'bg-gray-900 text-gray-300 border border-gray-800';
  const getPriorityColor = p => p === 'high' ? 'text-gray-300 font-bold' : p === 'medium' ? 'text-gray-400' : 'text-gray-600';
  const getRoleColor = r => r === 'admin' ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-gray-200';
  const navItems = [{ id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' }, { id: 'all', icon: ListTodo, label: 'All Jobs' }, { id: 'completed', icon: CheckCircle2, label: 'Completed' }, { id: 'in-progress', icon: Clock4, label: 'In Progress' }, ...(currentUser.role === 'admin' ? [{ id: 'users', icon: Users, label: 'Users' }] : [])];

  const renderContent = () => {
    if (activeNav === 'users' && currentUser.role === 'admin') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-100">User Management</h3>
            <button onClick={() => openUserModal()} className="bg-gray-800 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium border border-gray-700"><Plus className="w-4 h-4"/>Add User</button>
          </div>
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"><div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-800 bg-gray-800"><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Name</th><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Email</th><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Role</th><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Dept</th><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Phone</th><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Join Date</th><th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-800">{users.map(u=><tr key={u.id} className="hover:bg-gray-800 transition-colors"><td className="px-6 py-4 text-gray-300">{u.name}</td><td className="px-6 py-4 text-gray-400 text-sm">{u.email}</td><td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(u.role)}`}>{u.role}</span></td><td className="px-6 py-4 text-gray-300">{u.department}</td><td className="px-6 py-4 text-gray-400 text-sm">{u.phone}</td><td className="px-6 py-4 text-gray-400 text-sm">{u.joinDate}</td><td className="px-6 py-4 flex gap-2"><button onClick={()=>openUserModal(u)} className="text-gray-500 hover:text-gray-300 p-2 hover:bg-gray-700 rounded transition-colors"><Edit2 className="w-4 h-4"/></button><button onClick={()=>deleteUser(u.id)} className="text-gray-500 hover:text-gray-300 p-2 hover:bg-gray-700 rounded transition-colors"><Trash2 className="w-4 h-4"/></button></td></tr>)}</tbody>
            </table>
          </div></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Jobs', value: stats.total },
            { label: 'Completed', value: stats.completed },
            { label: 'In Progress', value: stats.inProgress },
            { label: 'Pending', value: stats.pending },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all">
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-100 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                filter === status
                  ? 'bg-gray-800 text-gray-100 border-gray-700'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Jobs Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Assignee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Created By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 text-gray-300 font-medium">{job.title}</td>
                      <td className="px-6 py-4 text-gray-400">{job.assignee}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${getPriorityColor(job.priority)}`}>
                          {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{job.dueDate}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{job.createdBy}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => openJobModal(job)} className="text-gray-500 hover:text-gray-300 p-2 hover:bg-gray-700 rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteJob(job.id)} className="text-gray-500 hover:text-gray-300 p-2 hover:bg-gray-700 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black border-r border-gray-800 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-gray-200">JOB SYSTEM</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-200">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveNav(item.id); if (item.id !== 'dashboard' && item.id !== 'users') setFilter(item.id); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === item.id
                  ? 'bg-gray-800 text-gray-100 border border-gray-700'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-300'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-200">{currentUser.avatar}</div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-200 truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
            )}
          </div>
          <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-gray-300 transition-all border border-gray-800">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black overflow-hidden">
        <div className="border-b border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-100">{activeNav === 'users' ? 'User Management' : 'Wellcome Back !    Admin'}</h2>
          <div className="text-sm text-gray-400">Role: <span className="font-semibold text-gray-200">{currentUser.role.toUpperCase()}</span></div>
        </div>
        <div className="flex-1 overflow-auto p-6">{renderContent()}</div>
      </div>

      {/* Job Modal */}
      <Modal open={showJobModal} onClose={() => setShowJobModal(false)}>
        <h3 className="text-lg font-bold text-gray-100 mb-4">{editingJob ? 'Edit Job' : 'Add Job'}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Job Title"
            value={jobFormData.title}
            onChange={e => setJobFormData({ ...jobFormData, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Assignee"
            value={jobFormData.assignee}
            onChange={e => setJobFormData({ ...jobFormData, assignee: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
          />
          <input
            type="date"
            value={jobFormData.dueDate}
            onChange={e => setJobFormData({ ...jobFormData, dueDate: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
          />
          <select
            value={jobFormData.priority}
            onChange={e => setJobFormData({ ...jobFormData, priority: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={jobFormData.status}
            onChange={e => setJobFormData({ ...jobFormData, status: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setShowJobModal(false)}
            className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveJob}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* User Modal */}
      <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
        <h3 className="text-lg font-bold text-gray-100 mb-4">{editingUser ? 'Edit User' : 'Add User'}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={userFormData.name}
            onChange={e => setUserFormData({ ...userFormData, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700"
          />
          <input
            type="email"
            placeholder="Email"
            value={userFormData.email}
            onChange={e => setUserFormData({ ...userFormData, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700"
          />
          <select
            value={userFormData.role}
            onChange={e => setUserFormData({ ...userFormData, role: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setShowUserModal(false)} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors">Cancel</button>
          <button onClick={saveUser} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">Save</button>
        </div>
      </Modal>
    </div>
  );
}
