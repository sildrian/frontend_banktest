import { NextResponse } from 'next/server';
import api from '@/utils/api';
import { setToken } from '@/utils/auth';


export async function POST(username: string, password: string) {
  try {
    const res = await api.post('/login', JSON.stringify({ username, password }), {
      // Add additional headers if needed
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    if (res.status === 200) {
      const token = res.data.data.token;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);

      // return NextResponse.json({ token });
      return res.data;
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 

