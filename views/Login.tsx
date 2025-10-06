import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = await login(email, password);
    if (ok) {
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } else {
      setError('تعذر تسجيل الدخول. تحقق من البيانات.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A18] text-white px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>
        <label className="block mb-2">البريد الإلكتروني</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full p-3 rounded bg-black/30 border border-blue-500/50 mb-4" />
        <label className="block mb-2">كلمة المرور</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full p-3 rounded bg-black/30 border border-blue-500/50 mb-6" />
        {error && <div className="mb-4 text-red-400">{error}</div>}
        <button disabled={loading} className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg disabled:opacity-60">{loading ? 'جاري الدخول...' : 'دخول'}</button>
      </form>
    </div>
  );
};

export default Login;
