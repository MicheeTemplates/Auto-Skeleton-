import { useState, useEffect, useRef } from 'react'
import { useSkeleton } from 'skull-dom/react'

interface UserData {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
  location: { city: string; country: string };
}

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Hook automatically manages the skeleton overlay
  useSkeleton(cardRef, loading);

  const fetchUser = async () => {
    setLoading(true);
    try {
      // Simulate a slightly longer delay to see the skeleton
      //await new Promise(r => setTimeout(r, 1500));
      const res = await fetch('https://randomuser.me/api/');
      const data = await res.json();
      setUser(data.results[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h1>💀 SkullDOM React Demo</h1>
      
      <div style={{ marginBottom: 20 }}>
        <button onClick={fetchUser} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch New User'}
        </button>
      </div>

      <div ref={cardRef} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center', minHeight: '150px' }}>
         {/* 
            CRITICAL: We render the structure even if data is null! 
            We use placeholders or empty strings so SkullDOM has something to measure.
         */}
         <img 
            src={user?.picture.large || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} 
            alt="User"
            style={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              objectFit: 'cover',
              background: '#eee' 
            }} 
         />
         
         <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0 0 10px 0', minHeight: '2rem' }}>
              {user ? `${user.name.first} ${user.name.last}` : 'User Name Placeholder'}
            </h2>
            
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Email:</strong> {user?.email || 'user@example.com'}
            </p>
            
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Location:</strong> {user ? `${user.location.city}, ${user.location.country}` : 'City, Country'}
            </p>
         </div>
      </div>

      <p style={{ marginTop: 40, color: '#888', fontSize: '0.9em' }}>
        Notice how we render "Placeholder" text when user is null? <br/>
        This allows <strong>SkullDOM</strong> to measure the layout and create a perfectly matching skeleton.
      </p>
    </div>
  )
}

export default App
