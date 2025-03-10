import { NextResponse } from 'next/server';
import api from '@/utils/api';
import { getToken } from '@/utils/auth';


export async function POST(search: string) {
  try {
    const token = await getToken();
    const res = await api.post('/find-customer', JSON.stringify({ search }), {
      // Add additional headers if needed
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(res.data)
    if (res.status === 200) {
        return res.data;
    }
    return null;
  } catch (error) {
    return null;
  }
} 

