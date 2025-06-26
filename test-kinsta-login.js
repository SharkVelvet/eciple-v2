// Quick test script to verify Kinsta login
import fetch from 'node-fetch';

async function testKinstaLogin() {
  try {
    console.log('Testing Kinsta admin login...');
    
    const response = await fetch('https://eciple-kin-05g9p.kinsta.app/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'eciple_admin_2024',
        password: 'EcipleSecure2024Admin!@#$%^&*()_+'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Login successful!');
      console.log('Response:', data);
      
      // Test with the session token
      if (data.sessionToken) {
        const verifyResponse = await fetch('https://eciple-kin-05g9p.kinsta.app/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${data.sessionToken}`
          }
        });
        const verifyData = await verifyResponse.json();
        console.log('Token verification successful!');
        console.log('User:', verifyData);
      }
    } else {
      console.log('Login failed with status:', response.status);
      console.log('Error response:', data);
    }
    
  } catch (error) {
    console.error('Login failed with error:', error.message);
  }
}

testKinstaLogin();